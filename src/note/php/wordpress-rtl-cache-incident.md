# WordPress 英文页面被异常缓存为 RTL：诊断与解决方案

> 本文为公开发布版。示例域名、页面路径和服务器目录均已匿名化，不对应真实生产环境。

## 问题现象

某 WordPress 英文站点的页面内容和语言标识均为英文，但缓存版本返回了：

```html
<html dir="rtl" lang="en-US">
```

主题和页面构建器也将请求识别为 RTL：

```js
themeConfig.isRtl = true;
elementorFrontendConfig.is_rtl = true;
```

绕过页面缓存后，同一页面恢复为 LTR：

```html
<html lang="en-US">
```

这说明异常方向不是浏览器动态添加的，而是在服务端生成 HTML 时产生，随后进入了页面缓存和 CDN 边缘缓存。

## 根因

代码扫描在 GTranslate 插件中发现以下逻辑：

```php
if (
    isset( $_SERVER['HTTP_X_GT_LANG'] )
    && in_array( $_SERVER['HTTP_X_GT_LANG'], array( 'ar', 'iw', 'fa' ), true )
) {
    $text_direction = 'rtl';
} elseif ( isset( $_SERVER['HTTP_X_GT_LANG'] ) ) {
    $text_direction = 'ltr';
}
```

GTranslate 的付费翻译服务通过反向代理获取源站内容。请求阿拉伯语、波斯语或希伯来语页面时，代理会向源站发送类似请求头：

```http
X-GT-Lang: ar
```

GTranslate 检测到 RTL 语言后，会故意让 WordPress、主题和插件生成 RTL 布局，以便翻译后的页面具有正确的阅读方向。

WordPress 的 `is_rtl()` 最终读取当前 Locale 的文本方向。因此主题、Elementor 和 `<html dir="rtl">` 都只是使用了 WordPress 的全局方向状态，并不是这些组件主动制造了问题。

真正的故障是：

> 带 `X-GT-Lang` 的翻译代理响应，被页面缓存或 CDN 当成普通英文 URL 的公共响应缓存了。

这属于缓存变体未隔离造成的缓存污染。

## 正确的处理原则

```text
普通英文请求
    → 可以缓存
    → 必须保持 LTR

GTranslate 代理请求（存在 X-GT-Lang）
    → 可以根据目标语言生成 RTL 或 LTR
    → 不得读取或写入普通页面的公共缓存
```

不建议直接删除 GTranslate 中设置 RTL 的代码，否则阿拉伯语等翻译页面可能失去正确的布局，而且插件升级会覆盖修改。

## 解决方案一：让 WP Rocket 跳过翻译代理请求

编辑 WordPress 的 `wp-config.php`，在加载 `wp-settings.php` 之前加入：

```php
/*
 * GTranslate reverse-proxy requests can change WordPress text direction.
 * Never allow these responses to enter the public page cache.
 */
if (
    ! empty( $_SERVER['HTTP_X_GT_LANG'] )
    && ! defined( 'DONOTCACHEPAGE' )
) {
    define( 'DONOTCACHEPAGE', true );
}
```

示意位置：

```php
define( 'WP_CACHE', true );

if (
    ! empty( $_SERVER['HTTP_X_GT_LANG'] )
    && ! defined( 'DONOTCACHEPAGE' )
) {
    define( 'DONOTCACHEPAGE', true );
}

require_once ABSPATH . 'wp-settings.php';
```

必须在 `wp-config.php` 中尽早定义。只写到主题 `functions.php` 或普通插件中可能太晚，因为页面缓存组件通常早于主题执行。

## 解决方案二：Cloudflare 按请求头绕过缓存

在 Cloudflare 的 Cache Rules 中创建一条规则。

匹配表达式：

```text
any(lower(http.request.headers.names[*])[*] eq "x-gt-lang")
```

操作：

```text
Cache eligibility: Bypass cache
```

规则应优先于普通的全站 HTML 缓存规则，并确认后续规则不会再次将同一请求设置为 `Eligible for cache`。

这样所有包含以下请求头的请求都不会读取或写入 Cloudflare 公共缓存：

```http
X-GT-Lang: ar
X-GT-Lang: fa
X-GT-Lang: iw
```

## 解决方案三：源站增加 `no-store` 防护

可以在 Nginx 的 `http {}` 作用域加入：

```nginx
map $http_x_gt_lang $gtranslate_cf_cache_control {
    default "no-store";
    ""      "";
}
```

在站点的 `server {}` 中加入：

```nginx
add_header Cloudflare-CDN-Cache-Control $gtranslate_cf_cache_control always;
```

结果：

| 请求类型 | 响应头 |
|---|---|
| 普通请求 | 不增加该响应头 |
| 包含 `X-GT-Lang` | `Cloudflare-CDN-Cache-Control: no-store` |

修改后检查并重新加载 Nginx：

```bash
nginx -t
nginx -s reload
```

Cloudflare Cache Rule 是第一道保护，源站的 `no-store` 是第二道保护。

## GTranslate URL 模式冲突

GTranslate 支持两种 SEO URL 结构：

```text
语言子域名：https://ar.example.com/page/
语言子目录：https://example.com/ar/page/
```

不应同时启用两种模式。GTranslate URL Addon 中也包含冲突检测逻辑：

```php
if ( isset( $request_headers['X-GT-Lang'] ) ) {
    echo 'Please remove DNS cname records for GTranslate!';
    exit;
}
```

如果使用语言子域名，应：

1. 在 GTranslate 后台只保留 `Sub-domain URL structure`。
2. 删除 Nginx 中针对 `/ar/`、`/es/` 等语言子目录的 Rewrite。
3. 确保 hreflang、语言选择器和站点地图只输出子域名 URL。

如果使用语言子目录，则应停用语言 CNAME 子域名。

## Cloudflare TTL 策略

当 Cloudflare 使用以下模式时：

```text
如果存在，使用缓存控制标头；
如果不存在，使用 Cloudflare 默认 TTL。
```

可以由源站控制 TTL，但必须确保所有动态响应都有明确的缓存头。否则，在 HTML 已被设置为 `Eligible for cache` 的情况下，无缓存头的 200 响应可能使用 Cloudflare 的默认 Edge TTL。

`Age` 响应头只表示对象已经在当前边缘节点缓存多久，不表示完整配置 TTL。

更安全的模式是：

```text
如果存在，使用缓存控制标头；
如果不存在，绕过缓存。
```

一种常见架构是：

| 内容 | 缓存策略 |
|---|---|
| WordPress HTML | 由 WP Rocket 缓存 |
| Cloudflare HTML | 不缓存或使用很短的显式 TTL |
| CSS、JS、图片、字体 | Cloudflare 长时间缓存 |
| GTranslate 代理请求 | 始终绕过公共缓存 |
| 后台、登录用户、API | 始终绕过公共缓存 |

## 缓存清理顺序

部署修复后应按以下顺序处理：

1. 清除 GTranslate 缓存。
2. 清除 WordPress 页面缓存。
3. 清除 CDN 对应 hostname 的边缘缓存。
4. 重新运行页面缓存预加载。
5. 分别验证普通请求和带 `X-GT-Lang` 的请求。

不能只清理 CDN。如果源站页面缓存仍是错误版本，CDN 会再次获取并缓存相同内容。

## 验证方法

以下命令使用保留示例域名 `example.com`，发布或实际执行时应替换为目标站点。

### 验证普通英文动态输出

```bash
curl -s \
  'https://example.com/example-page/?nowprocket=1' \
  | grep -om1 '<html[^>]*>'
```

预期：

```html
<html lang="en-US">
```

或者：

```html
<html lang="en-US" dir="ltr">
```

### 验证 GTranslate 请求绕过缓存

```bash
curl -sSI \
  -H 'X-GT-Lang: ar' \
  'https://example.com/example-page/' \
  | grep -iE 'cf-cache-status|age|cache-control'
```

预期：

```text
CF-Cache-Status: BYPASS
Cloudflare-CDN-Cache-Control: no-store
```

不应存在持续增长的：

```text
Age: ...
```

翻译代理请求的正文仍可能是 RTL，这是正确行为；关键是该响应不能进入普通英文页面的缓存。

### 验证普通英文缓存

连续请求两次普通 URL：

```bash
curl -sSI 'https://example.com/example-page/' \
  | grep -iE 'cf-cache-status|age|cache-control'
```

普通英文页面可以返回：

```text
CF-Cache-Status: HIT
Age: ...
```

但正文必须保持 LTR。

## 结论

| 组件 | 结论 |
|---|---|
| WordPress | 根据当前 Locale 文本方向返回 `is_rtl()` |
| 主题 | 读取 `is_rtl()`，通常不是根因 |
| Elementor | 读取 `is_rtl()`，通常不是根因 |
| GTranslate | 为带 `X-GT-Lang` 的 RTL 语言请求故意启用 RTL |
| 页面缓存 | 未排除翻译代理请求时可能缓存 RTL 响应 |
| Cloudflare | 未按 `X-GT-Lang` 绕过或区分缓存时会放大污染 |
| Nginx | 可通过 `Cloudflare-CDN-Cache-Control: no-store` 提供额外保护 |

最终根治措施是：

> 所有带 `X-GT-Lang` 的 GTranslate 反向代理请求，必须同时绕过 WordPress 页面缓存和 CDN 公共缓存。

无需修改主题或 Elementor，也不建议通过修改 GTranslate 核心文件删除 RTL 支持。

## 相关依据

- [GTranslate 作者关于 RTL 页面被缓存问题的说明](https://wordpress.org/support/topic/compatibility-with-gtranslate-plugin-avoid-caching-page-in-rtl-mode/)
- [WordPress `is_rtl()`](https://developer.wordpress.org/reference/functions/is_rtl/)
- [WordPress `WP_Locale::is_rtl()`](https://developer.wordpress.org/reference/classes/wp_locale/is_rtl/)
- [WordPress `WP_Locale`](https://developer.wordpress.org/reference/classes/wp_locale/)
- [WP Rocket `DONOTCACHEPAGE` 机制](https://docs.wp-rocket.me/article/141-force-page-caching)
- [WP Rocket 页面缓存](https://docs.wp-rocket.me/article/1528-page-caching)
- [WP Rocket 与 Cloudflare](https://docs.wp-rocket.me/article/18-using-wp-rocket-with-cloudflare)
- [Cloudflare Cache Rules 设置](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/)
- [Cloudflare 请求头字段](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers/)
- [Cloudflare 默认缓存行为](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/)
- [Cloudflare CDN-Cache-Control](https://developers.cloudflare.com/cache/concepts/cdn-cache-control/)
- [GTranslate TDN URL 结构](https://gtranslate.io/docs/58-gtranslate-tdn-documentation)


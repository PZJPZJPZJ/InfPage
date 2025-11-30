# WordPress:开源内容管理系统
## 官方地址
- [WordPress官网](https://wordpress.org/)
- [WordPress下载](https://wordpress.org/latest.zip)

## 数据分析
### Google
- [Google Analytics](https://analytics.google.com/):谷歌分析
- [Google Search Console](https://search.google.com/search-console/welcome):谷歌网站控制台
- [Google Ads](https://ads.google.com/):谷歌广告
- [Google Cloud API](https://console.cloud.google.com/):谷歌云接口
- [Google Tag Manager](https://tagmanager.google.com/):谷歌代码跟踪
### Microsoft
- [Bing Webmaster Tools](https://www.bing.com/webmasters/about):必应网站管理员工具
- [Microsoft Clarity](https://clarity.microsoft.com/):微软分析

## 速度优化
### 页面加载速度
- [Google PageSpeed Insights](https://pagespeed.web.dev/):测试页面加载存在问题
- [SpeedVitals](https://speedvitals.com/):测试TTFB时间和CDN生效状态
- [GTmetrix](https://gtmetrix.com/):综合测试页面加载速度
- [Webp2jpg](https://github.com/renzhezhilu/webp2jpg-online)：图片格式转换
  - [Webp2jpg在线版](https://imagestool.com/webp2jpg-online/)
- [WPRocket](https://pan.baidu.com/s/19rJpoDly8yBTM7PirMYDzQ?pwd=znju):综合优化插件
  - [htaccess配置教程](https://docs.wp-rocket.me/article/1788-wp-rocket-rules-in-the-htaccess-file)
### 数据库查询优化
- [Redis](https://wordpress.org/plugins/redis-cache/):缓存数据库插件，建议PHP安装Redis扩展
- [QueryMonitor](https://wordpress.org/plugins/query-monitor/):测试页面加载查询数据插件
### 内容分发网络
- [Cloudflare](https://www.cloudflare.com/):CDN缓存、安全、转发配置

## 搜索引擎优化(SEO)
### RankMath:SEO优化插件
- [RankMath下载](https://www.cheshirex.com/7891.html)

### GTranslate/TranslatePress:多语言页面生成插件
- [TranslatePress下载](https://www.cheshirex.com/7907.html)

### 搜索引擎规则
- [Google Search Status](https://status.search.google.com/):谷歌更新面版
- [Backlinko](https://backlinko.com):SEO教程
- [BlackHatWorld](https://www.blackhatworld.com):黑帽SEO论坛

### 关键词研究
- [Ahrefs](https://ahrefs.com/)
- [Semrush](https://www.semrush.com/)
- [SEO Club](https://dash.seogroup.club/)
- [海外客](https://www.hiwaike.com/)

### 邮件工具
- [FluentSMTP](https://wordpress.org/plugins/fluent-smtp/)

### 外链布局
- [Fiverr](https://www.fiverr.com/)
- [Upwork](https://www.upwork.com/)

## 界面优化
### Elementor:页面编辑器
- [Elementor下载](https://www.cheshirex.com/2979.html)
- [UnlimitedElements](https://www.cheshirex.com/8128.html):无限自定义组件

### 网站检测工具
- [Wappalyzer](https://www.wappalyzer.com/lookup/):框架检测器
- [WPThemeDetector](https://www.wpthemedetector.com/):主题检测器

## 服务器
### 云主机
- [Hostinger](https://www.hostinger.com/)
- [Bandwagonhost](https://bandwagonhost.com/)
- [Amazon Web Services](https://aws.amazon.com/)
- [Oracle](https://www.oracle.com/cloud/free/)
- [CloudCone](https://cloudcone.com/)
- [Vultr](https://www.vultr.com/)
- [RackNerd](https://www.racknerd.com/)
### 管理面板
#### 1Panel安装
1. 访问[1Panel官网](https://1panel.cn/)
2. 打开服务器终端，使用安装脚本
  ```shell
  bash -c "$(curl -sSL https://resource.fit2cloud.com/1panel/package/v2/quick_start.sh)"
  ```
3. 按照[1Panel搭建WordPress网站](https://oyouoo.com/1panel-build-wordpress-for-beginners/)教程进行部署
#### wp-config.php配置文件
```php
/** WordPress内存限制设置 */
define( 'WP_MEMORY_LIMIT', '1024M' );
/** 强制启用HTTPS，防止反向代理时资源访问异常 */
$_SERVER['HTTPS'] = 'on';
define('FORCE_SSL_LOGIN', true);
define('FORCE_SSL_ADMIN', true);
/** 灵活检测HTTP/HTTPS，防止反向代理时资源访问异常，与强制启用HTTPS不能同时使用 */
/** 需添加Nginx配置proxy_set_header X-Forwarded-Proto $scheme; */
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}
/** 以上配置在if ( ! defined( ‘ABSPATH’ ) )前添加，确保在WordPress初始化前生效 */
```
#### .htaccess配置文件
```yaml
# 配置HTML文档缓存，自定义配置在END WP Rocket后添加，避免WP Rocket配置覆盖
# BEGIN Custom Expires Rules
<IfModule mod_expires.c>
ExpiresActive on
ExpiresByType text/html "access plus 1 hour"
</IfModule>
# END Custom Expires Rules

# 配置PHP最大上传文件大小
# BEGIN PHP Value
php_value upload_max_filesize 512M
php_value post_max_size 512M
# END PHP Value
```
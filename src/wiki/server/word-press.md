---
routeMeta:
  itemTitle: WordPress
  itemDesc: 开源建站系统
  itemIcon: wordpress.com
---
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
- [Google PageSpeed Insights-页面加载测试](https://pagespeed.web.dev/)
- [SpeedVitals-TTFB时间测试](https://speedvitals.com/)
- [GTmetrix-页面综合加载速度](https://gtmetrix.com/)
- [Webp2jpg-图片格式转换](https://github.com/renzhezhilu/webp2jpg-online)
  - [Webp2jpg-在线版](https://imagestool.com/webp2jpg-online/)
- [WPRocket-综合优化插件](https://www.cheshirex.com/7119.html)
  - [htaccess配置教程](https://docs.wp-rocket.me/article/1788-wp-rocket-rules-in-the-htaccess-file)
### 数据库优化
- [QueryMonitor-数据库查询诊断](https://wordpress.org/plugins/query-monitor/)

## 搜索引擎优化
- [RankMath-SEO优化插件](https://www.cheshirex.com/7891.html)

### 多语言翻译
- [TranslatePress-多语言页面生成](https://www.cheshirex.com/7907.html)

### 搜索引擎规则
- [Google Search Status-谷歌更新面版](https://status.search.google.com/)
- [Backlinko-SEO教程](https://backlinko.com)
- [BlackHatWorld-SEO论坛](https://www.blackhatworld.com)

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

## 页面编辑
- [Elementor-页面编辑器](https://www.cheshirex.com/2979.html)
- [UnlimitedElements-无限自定义组件](https://www.cheshirex.com/8128.html)

### 检测工具
- [Wappalyzer-框架检测器](https://www.wappalyzer.com/lookup/)
- [WPThemeDetector-主题检测器](https://www.wpthemedetector.com/)

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
/** 灵活检测HTTP/HTTPS，防止反向代理时资源访问异常，与强制启用HTTPS不能同时使用 */
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
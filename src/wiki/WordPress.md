# WordPress:开源内容管理系统
## 官方地址
- [官网](https://wordpress.org/)
- [WordPress下载](https://wordpress.org/latest.zip)

## 数据分析
### Google
- [Google Analytics(谷歌分析)](https://analytics.google.com/)
- [Google Search Console(谷歌网站控制台)](https://search.google.com/search-console/welcome)
- [Google Ads(谷歌广告)](https://ads.google.com/)
- [Google Cloud API(谷歌云接口)](https://console.cloud.google.com/)
- [Google Tag Manager(谷歌代码跟踪)](https://tagmanager.google.com/)
### Microsoft
- [Bing Webmaster Tools(必应网站管理员工具)](https://www.bing.com/webmasters/about)
- [Microsoft Clarity(微软分析)](https://clarity.microsoft.com/)

## 速度优化
### 页面加载速度
- 使用[Google PageSpeed Insights](https://pagespeed.web.dev/)测试页面存在问题
- 使用[Webp2jpg](https://github.com/renzhezhilu/webp2jpg-online)转换格式再进行上传
  - [Webp2jpg-Online](https://imagestool.com/webp2jpg-online/)
- 安装WPRocket插件

### 服务器响应速度
- [SpeedVitals](https://speedvitals.com/)

### 内容分发网络
- [Cloudflare](https://www.cloudflare.com/)
  - 缓存>Cache Rules
    - 缓存所有内容：所有传入请求、缓存资格（符合缓存条件）、边缘 TTL（忽略缓存控制标头，使用此 TTL，1天）
    - 绕过登录状态缓存：自定义筛选表达式`(http.cookie contains "wordpress_logged_in") or (http.request.uri contains "/wp-admin/")`、缓存资格（绕过缓存）、浏览器 TTL（绕过缓存）
  - 安全性>安全规则
    - 后台登录验证：当传入请求匹配时`(http.request.uri contains "/wp-login.php")`、然后采取措施（托管质询）
    - 限制xmlrpc.php：当传入请求匹配时`(http.request.uri.path contains "/xmlrpc.php")`、然后采取措施（托管质询）
  - 规则>页面规则
    - 子域跳转www：URL`https://example.com/*`、则设置将为（转发URL、301永久重定向）、目标URL`https://www.example.com/$1`

## 搜索引擎优化(SEO)
### SEO插件RankMath

### 翻译插件GTranslate/TranslatePress

### 搜索引擎规则
- [Google Search Status谷歌更新面版](https://status.search.google.com/)
- [Backlinko教程](https://backlinko.com)
- [黑帽SEO论坛](https://www.blackhatworld.com)

### 关键词研究
#### [Semrush](https://www.semrush.com/)
- [SEO Club](https://dash.seogroup.club/)
#### [Ahrefs](https://ahrefs.com/)
- [海外客](https://www.hiwaike.com/)
#### 跨境工具
- [M123](https://www.m123.com)

## 界面优化(UI)
### Elementor编辑器
- [Unlimited Elements(无限自定义组件)](https://unlimited-elements.com/)
- [MaiChuGuo(破解插件)](https://maichuguo.com/wordpress-plugins/)

### 网站检测工具
- [Wappalyzer(框架检测器)](https://www.wappalyzer.com/lookup/)
- [WPThemeDetector(主题检测器)](https://www.wpthemedetector.com/)

## 服务器优化
### 云主机
- [Hostinger](https://www.hostinger.com/)
- [Bandwagonhost](https://bandwagonhost.com/)
- [Amazon Web Services](https://aws.amazon.com/)
- [Oracle](https://www.oracle.com/cloud/free/)
- [CloudCone](https://cloudcone.com/)
- [Vultr](https://www.vultr.com/)
- [RackNerd](https://www.racknerd.com/)
### 管理面板
#### [1Panel](https://1panel.cn/)
- 安装脚本
```shell
bash -c "$(curl -sSL https://resource.fit2cloud.com/1panel/package/v2/quick_start.sh)"
```
- [网站部署教程](https://oyouoo.com/1panel-build-wordpress-for-beginners/)
- [Nginx反向代理启用资源HTTPS](https://zahui.fan/posts/990b6b62/)
#### [FastPanel](https://fastpanel.direct/)
- 安装脚本
```shell
wget https://repo.fastpanel.direct/install_fastpanel.sh -O - | bash -
```
#### [Portainer](https://www.portainer.io/)
- DockerCompose部署
```yaml
services:
  database:
    image: mysql:8.0.27
    command: '--default-authentication-plugin=mysql_native_password'
    volumes:
      - ./db_data:/var/lib/mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=somewordpress
      - MYSQL_DATABASE=wordpress
      - MYSQL_USER=wordpress
      - MYSQL_PASSWORD=wordpress
    expose:
      - 3306
      - 33060
  wordpress:
    image: wordpress:latest
    volumes:
      - ./wp_data:/var/www/html
    ports:
      - 80:80
    restart: always
    environment:
      - WORDPRESS_DB_HOST=db
      - WORDPRESS_DB_USER=wordpress
      - WORDPRESS_DB_PASSWORD=wordpress
      - WORDPRESS_DB_NAME=wordpress
```
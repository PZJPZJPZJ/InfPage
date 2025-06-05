# WordPress:建站平台
## DockerCompose部署
```yaml
services:
  database:
    # We use a mariadb image which supports both amd64 & arm64 architecture
    image: mariadb:10.6.4-focal
    # If you really want to use MySQL, uncomment the following line
    #image: mysql:8.0.27
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
## 插件
### [Elementor页面编辑](https://www.miaoroom.com/)
- [Unlimited Elements for Elementor自定义组件](https://maichuguo.com/wordpress-plugins/)
### WooCommerce(上传商品)
- YITH WooCommerce Ajax Product Filter(商品分类筛选)
### YoastSEO(SEO优化)
### WPForms(第三方表单)
### WPRocket(速度优化)
### GTranslate(多语言)

## 搜索引擎优化技巧
### 网站分析
- [Google Analytics谷歌分析](https://analytics.google.com/)
- [Google Search Console谷歌网站控制台](https://search.google.com/search-console/welcome)
- [Google PageSpeed Insights网站测速](https://pagespeed.web.dev/)
- [Google Search Status谷歌更新面版](https://status.search.google.com/)
- [Google Ads谷歌广告](https://ads.google.com/)
- [Google Tag Manager谷歌代码跟踪](https://tagmanager.google.com/)
- [Microsoft Clarity微软分析](https://clarity.microsoft.com/)
- [Hotjar访客录制](https://www.hotjar.com/)
### 相关教程
- [Backlinko教程](https://backlinko.com)
- [黑帽SEO论坛](https://www.blackhatworld.com)
### 相关工具
- [图片格式转换](https://github.com/renzhezhilu/webp2jpg-online)
- [海外客](https://www.hiwaike.com/)
- [SEO Club](https://dash.seogroup.club/)
- [M123](https://www.m123.com)
# WordPress 性能腾飞：从 Apache 迁移到 OpenResty (Nginx) 全指南

本指南旨在帮助您理解从传统的 Apache (`mod_php`) 环境迁移到高性能的 **OpenResty (Nginx) + PHP-FPM** 架构的原理、优势及具体实施步骤。

---

## 第一部分：科普篇 —— PHP 运行模式对比

为了理清迁移的必要性，我们需要对比三种主流的 PHP 运行模式：**CGI**、**Apache (mod_php)** 和 **PHP-FPM**。

| 特性 | **CGI** | **Apache (mod_php)** | **PHP-FPM (FastCGI)** |
| :--- | :--- | :--- | :--- |
| **运行机制** | Fork-and-Execute（每个请求开启一个新进程） | 内嵌模块（PHP 解释器嵌入 Web 服务器进程） | 进程池常驻管理（Master/Worker 模型） |
| **性能** | 极低（高频率创建/销毁进程开销大） | 高（低并发下无通信开销） | **极高**（支持高并发，进程复用） |
| **内存消耗** | 极高且不稳定 | 较高（静态资源请求也加载 PHP 模块） | **受控且高效**（PHP 与静态资源处理分离） |
| **扩展性** | 无 | 差（只能配合 Apache 使用） | **强**（可跨服务器部署，支持 Nginx/Apache 等） |
| **稳定性** | 脚本崩溃不影响其他请求 | PHP 崩溃可能导致 Web 服务器崩溃 | **极佳**（独立进程，支持平滑重启和慢日志） |
| **适用场景** | 已基本淘汰 | 小型个人站点、低并发 Apache 环境 | **现代 Web 开发、高并发、生产环境首选** |

---

## 第二部分：转换篇 —— 规则大变样

在迁移中，最核心的变化是 **`.htaccess` 文件将彻底失效**。Nginx 为了追求效率，设计上就不支持这种实时扫描磁盘配置的文件。

### 核心对比：WordPress 伪静态
这是 `.htaccess` 中最常见的代码段，它的作用是实现美化链接（如 `example.com/hello`）。

**Apache 逻辑 (繁琐)：**
```apache
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
```
*语义：如果文件不存在且目录不存在，就传给 index.php。*

**OpenResty 逻辑 (优雅)：**
```nginx
location / {
    try_files $uri $uri/ /index.php?$args;
}
```
*语义：尝试查找文件($uri)，找不到找目录($uri/)，再找不到就走 index.php。*

---

## 第三部分：教程篇 —— 实战迁移配置

### 1. 修改位置
- **1Panel 用户**：进入 `网站` -> `域名设置` -> `配置` 页面。
- **手动安装用户**：通常修改 `/usr/local/openresty/nginx/conf/vhost/站点域名.conf`。

### 2. 精准浏览器缓存配置 (不同类型不同时间)
将以下代码放入 `server { ... }` 区块中，实现针对性缓存优化：

```nginx
# 1. 图像与多媒体 (缓存 4 个月)
location ~* \.(gif|png|jpe?g|webp|avif|mp4|ogg|webm|ttf|otf|woff|woff2|svg|svgz)$ {
    expires 4M;
    access_log off;
    add_header Cache-Control "public";
}

# 2. 静态脚本文件 (缓存 1 年)
location ~* \.(css|js)$ {
    expires 1y;
    access_log off;
    add_header Cache-Control "public";
}

# 3. 网页与数据格式 (缓存 1 小时)
location ~* \.(html|htm|xml|json)$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

### 3. WP Rocket 静态缓存直达 (极致加速)
如果您使用了 WP Rocket 插件，请添加以下逻辑。它允许访客**完全跳过 PHP**，直接读取磁盘上的缓存文件，速度提升可达 10 倍以上：

```nginx
set $rocket_file "";
set $rocket_cache_extension ".html";

# 检查是否有 Gzip 压缩请求
if ($http_accept_encoding ~* gzip) {
    set $rocket_cache_extension ".html_gzip";
}

# 缓存排除逻辑 (登录用户、非 GET 请求等不缓存)
set $rocket_is_cache "yes";
if ($request_method != GET) { set $rocket_is_cache "no"; }
if ($query_string != "") { set $rocket_is_cache "no"; }
if ($http_cookie ~* "wordpress_logged_in_|wp-postpass_|comment_author_") { set $rocket_is_cache "no"; }

# 路径匹配
if ($rocket_is_cache = "yes") {
    set $rocket_file "/wp-content/cache/wp-rocket/$http_host$request_uri/index$rocket_cache_extension";
}

# 应用核心跳转规则
location / {
    try_files $rocket_file $uri $uri/ /index.php?$args;
}
```

---

## 第四部分：注意事项与避坑指南

1.  **权限分配**：确保 PHP-FPM 的运行用户（如 `www` 或 `1panel`）对站点目录拥有写入权限，否则无法上传图片。
2.  **安全性**：Nginx 不会自动隐藏敏感文件，请手动添加：
    ```nginx
    location ~* ^/(wp-config\.php|xmlrpc\.php|readme\.html) {
        deny all;
    }
    ```
3.  **上传限制**：记得在 Nginx 配置中调大 `client_max_body_size 64M;`，否则上传大图片会报错。
4.  **生效命令**：每次修改完配置后，必须运行 `nginx -t` 检查语法，然后执行 `nginx -s reload` 生效。
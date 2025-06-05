# Alist:开源网盘
## 官方地址
- [官网](https://alist.nn.ci/)
- [GitHub](https://github.com/AlistGo/alist)

## DockerCompose部署
```yaml
services:
    alist:
        image: xhofe/alist:latest
        container_name: alist
        volumes:
            - ./config:/opt/alist/data
        network_mode: host
        restart: always
```
## 运行命令
```shell
# Docker
docker exec -it alist ./alist admin set NEW_PASSWORD
# Windows
.\alist.exe admin set NEW_PASSWORD
# Linux macOS
./alist admin set NEW_PASSWORD
```
## 配置文件
```json
{
  "force": false,
  "site_url": "",
  "cdn": "",
  "jwt_secret": "random_generated",
  "token_expires_in": 48,
  "database": {
    "type": "sqlite3",  //数据库类型
    "host": "",         //数据库地址
    "port": 0,          //数据库端口号
    "user": "",         //数据库账号
    "password": "",     //数据库密码
    "name": "",         //数据库库名
    "db_file": "data\\data.db",     //数据库位置,sqlite3使用的
    "table_prefix": "x_",           //数据库表名前缀
    "ssl_mode": "",     //来控制SSL握手时的加密选项,参数自行搜索，或者查看下方来自ChatGPT的回答
    "dsn": ""           // https://github.com/alist-org/alist/pull/6031
  },

  "meilisearch": {
    "host": "http://localhost:7700",    //使用`meilisearch`的链接，默认使用的是本机
    "api_key": "",                      //请查阅`meilisearch`文档
    "index_prefix": ""                  //请查阅`meilisearch`文档
  },
  "scheme": {
    "address": "0.0.0.0",   // 要监听的 http/https 地址，默认为 0.0.0.0
    "http_port": 5244,      // 监听的 http 端口,默认的 '5244',如果你想禁用 http,将其设置为 '-1'
    "https_port": -1,       // https 端口监听,默认的 '-1',如果你想启用 https,将其设置为非 '-1'
    "force_https": false,   // 是否强制使用 HTTPS 协议,如果设置为 true ,则用户只能通过 HTTPS 访问该网站
    "cert_file": "data\\cert.crt",  // 证书文件路径
    "key_file": "data\\key.key",    // 证书密钥文件路径
    "unix_file": "",         // Unix 监听套接字文件路径,默认的空的,如果你想使用 Unix socket,将其设置为非空
    "unix_file_perm": ""     // Unix 监听套接字文件，设置为合适的权限
  },
  "temp_dir": "data\\temp",
  "bleve_dir": "data\\bleve",
  "dist_dir": "",
  "log": {
    "enable": true,					//开启日志记录功能，默认为开启状态 true
    "name": "data\\log\\log.log",	//日志文件的路径和名称
    "max_size": 10,					//单个日志文件的最大大小，单位为 MB。达到指定大小后会自动切分文件
    "max_backups": 5,				//保留的日志备份数量，超过数量会自动删除旧的备份
    "max_age": 28,					//日志文件保存的最大天数，超过天数的日志文件会被删除
    "compress": false				//是否启用日志文件压缩功能。压缩后可以减小文件大小，但查看时需要解压缩，默认为关闭状态 false
  },
  "delayed_start": 0,
  "max_connections": 0,
  "tls_insecure_skip_verify": true,
  "tasks": {
    "download": {
      "workers": 5,
      "max_retry": 1
    },
    "transfer": {
      "workers": 5,
      "max_retry": 2
    },
    "upload": {
      "workers": 5,
      "max_retry": 0
    },
    "copy": {
      "workers": 5,
      "max_retry": 2
    }
  },
  "cors": {
    "allow_origins": [
      "*"
    ],
    "allow_methods": [
      "*"
    ],
    "allow_headers": [
      "*"
    ]
  }
}
```
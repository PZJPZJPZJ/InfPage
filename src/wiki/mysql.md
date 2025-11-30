# MySQL:数据库服务端
## 下载地址
- [官网](https://dev.mysql.com/downloads/mysql/)
  - [Windows x64](https://dev.mysql.com/get/Downloads/MySQL-8.4/mysql-8.4.4-winx64.zip)
  - [macOS x64](https://dev.mysql.com/get/Downloads/MySQL-8.4/mysql-8.4.4-macos15-x86_64.tar.gz)
  - [macOS arm64](https://dev.mysql.com/get/Downloads/MySQL-8.4/mysql-8.4.4-macos15-arm64.tar.gz)
  - [Linux x64](https://dev.mysql.com/get/Downloads/MySQL-8.4/mysql-8.4.4-linux-glibc2.28-x86_64.tar.xz)
  - [Linux arm64](https://dev.mysql.com/get/Downloads/MySQL-8.4/mysql-8.4.4-linux-glibc2.28-aarch64.tar.xz)

## 服务模式
```shell
# 进入文件夹
cd bin
# 初始化数据库（记住初始密码）
mysqld --initialize --console
# 安装服务（管理员权限）
mysqld --install mysql
# 启动服务（管理员权限）
net start mysql
# 打开数据库控制台（使用初始密码登录）
mysql -u root -p
# 修改数据库密码（示例为password）
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
# 停止服务（管理员权限）
net stop mysql
# 卸载服务（管理员权限）
mysqld --remove
```
## 非服务模式
```shell
# 进入文件夹
cd bin
# 初始化数据库（记住初始密码）
mysqld --initialize --console
# 打开数据库控制台（使用初始密码登录）
mysql -u root -p
# 修改数据库密码（示例为password）
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
# 运行数据库
mysqld --standalone 
```
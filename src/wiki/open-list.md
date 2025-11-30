# OpenList:开源网盘
## 官方地址
- [OpenList](https://oplist.org/)
- [Alist](https://alist.nn.ci/)

## DockerCompose部署
```yaml
services:
  openlist:
    image: 'openlistteam/openlist:latest'
    container_name: openlist
    user: '0:0' # Please replace `0:0` with the actual user ID and group ID you want to use to run OpenList.
    volumes:
      - './data:/opt/openlist/data'
    ports:
      - '5244:5244'
    environment:
      - UMASK=022
    restart: unless-stopped
```
## 查看管理员信息
### 首次运行
可在日志中查看密码
```shell
docker logs openlist
```
### 非首次运行
可以重新生成或手动设置密码
```shell
# 重新随机生成密码
docker exec -it openlist ./openlist admin random
# 手动设置密码为 `NEW_PASSWORD`（替换为您要设置的密码）
docker exec -it openlist ./openlist admin set NEW_PASSWORD
```
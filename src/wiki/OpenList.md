# OpenList:开源网盘
## 官方地址
- [OpenList](https://oplist.org/)
- [Alist](https://alist.nn.ci/)

## DockerCompose部署
```yaml
services:
  openlist:
        image: 'openlistteam/openlist:beta'
        container_name: openlist
        volumes:
            - './config::/opt/openlist/data'
        ports:
          - '5244:5244'
        restart: always
```
## 运行命令
```shell
# 随机生成一个密码
docker exec -it openlist ./openlist admin random
# 手动设置一个密码,`NEW_PASSWORD`是指你需要设置的密码
docker exec -it openlist ./openlist admin set NEW_PASSWORD
```
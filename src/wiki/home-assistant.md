# HomeAssistant:智能家居物联网本地平台
## 网站
- [官网](https://www.home-assistant.io/)
## Docker部署
```yaml
services:
  home-assistant:
    container_name: home-assistant
    image: homeassistant/home-assistant:stable
    environment:
      TZ: Asia/Shanghai
    volumes:
      - ./config:/config
      - /etc/localtime:/etc/localtime:ro
      - /run/dbus:/run/dbus:ro
    restart: always
    privileged: true
    network_mode: host
```
## 教程
1. 使用DockerCompose部署
2. 浏览器访问[8123端口](http://localhost:8123)
## 集成
### [Xiaomi Home](https://github.com/XiaoMi/ha_xiaomi_home)

# Duplicati:定时备份工具
## DockerCompose部署
```yaml
services:
  duplicati:
    image: lscr.io/linuxserver/duplicati:latest
    container_name: duplicati
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
    volumes:
      - ./config:/config
      - ./backups:/backups
      - ./source:/source
    ports:
      - 8200:8200
    restart: unless-stopped
```
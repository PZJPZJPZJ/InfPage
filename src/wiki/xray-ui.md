# Xray UI:代理服务器管理面板
## 仓库地址
- [3x-ui-Github](https://github.com/MHSanaei/3x-ui)

## Docker部署
```yaml title="DockerCompose"
services:
  3x-ui:
    container_name: 3x-ui
    image: ghcr.io/mhsanaei/3x-ui
    network_mode: host
    ports:
      - 2053:2053
    volumes:
      - ./3x-ui:/etc/x-ui
    restart: unless-stopped
```
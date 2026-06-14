---
routeMeta:
  itemTitle: Cloudflare
  itemDesc: 全球内容分发网络
  itemIcon: dash.cloudflare.com
---
# Cloudflare全球内容分发网络
## 地址
- [Cloudflare-官网](https://www.cloudflare.com)
- [Cloudflare-控制台](https://dash.cloudflare.com)

## 隧道部署
1. 登录Cloudflare控制台
2. 进入联网 > Tunnels > 创建隧道
3. 复制提示命令`cloudflared.exe service install your-api-token`的`your-api-token`部分
4. 替换Docker Compose的`your-api-token`进行部署
```yaml title="Docker Compose"
services:
  cloudflare-tunnel:
    image: cloudflare/cloudflared:latest
    container_name: cloudflare
    restart: always
    network_mode: host
    environment:
      - TUNNEL_TOKEN=`your-api-token`
      - TUNNEL_TRANSPORT_PROTOCOL=http2
    command: tunnel run
```
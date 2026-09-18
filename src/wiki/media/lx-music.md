---
routeMeta:
  itemTitle: LX Music
  itemDesc: 洛雪音乐播放器壳子
  itemIcon: www.lxmusic.cn
---
# LX Music
## LX Sync Server
- [LX Sync Server-仓库](https://github.com/XCQ0607/lxserver)
```yml title="docker-compose.yml"
services:
  lx-sync-server:
    image: xcq0607/lxserver:latest
    container_name: lx-sync-server
    restart: unless-stopped
    ports:
      - 9527:9527
    volumes:
      - ./data:/server/data
      - ./logs:/server/logs
      - ./cache:/server/cache
      - ./music:/server/music
    environment:
      - NODE_ENV=production
      # - FRONTEND_PASSWORD=123456
      # - ENABLE_WEBPLAYER_AUTH=true
      # - WEBPLAYER_PASSWORD=yourpassword
      # - ADMIN_PATH=/music
      # - PLAYER_PATH=/
```

## LX Music
- [LX Music-官网](https://www.lxmusic.cn/)

## 音乐源接口
- [洛雪](https://raw.githubusercontent.com/pdone/lx-music-source/main/huibq/latest.js)
- [野花](https://ghproxy.net/https://raw.githubusercontent.com/pdone/lx-music-source/main/flower/latest.js)
- [六音](https://ghproxy.net/https://raw.githubusercontent.com/pdone/lx-music-source/main/sixyin/latest.js)
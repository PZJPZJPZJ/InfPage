---
routeMeta:
  itemTitle: LX Music
  itemDesc: 洛雪音乐播放器壳子
  itemIcon: www.lxmusic.cn
---
# 洛雪音乐播放器壳子
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

## 音乐源
### 本地接口
- [洛雪-论坛](https://pan946.com/thread-702.htm)
- [洛雪-百度](https://pan.baidu.com/s/1He21fGoKJUS8dQ2JhFyf9A?pwd=1024)
### 在线接口
- [洛雪](https://raw.githubusercontent.com/pdone/lx-music-source/main/huibq/latest.js)
- [野花](https://ghproxy.net/https://raw.githubusercontent.com/pdone/lx-music-source/main/flower/latest.js)
---
routeMeta:
  itemTitle: iPerf
  itemDesc: 网络带宽测试工具
  itemIcon: iperf.fr
---
# iPerf:测速工具
## 下载地址
- [官网](https://iperf.fr/)
- [iPerf Win](https://github.com/ar51an/iperf3-win-builds)
- [iPerf Android](https://github.com/davidBar-On/android-iperf3/)

## 容器部署
```yaml title="Docker Compose"
services:
 iperf3-server:
   image: networkstatic/iperf3:latest
   container_name: iperf3-server
   restart: unless-stopped
   network_mode: host
   command: -s
```
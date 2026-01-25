# Clash:代理工具
## 图形客户端
### [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev)
- [Windows x64](https://gh-proxy.com/github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.3.1/Clash.Verge_2.3.1_x64-setup.exe)
- [Windows arm64](https://gh-proxy.com/github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.3.1/Clash.Verge_2.3.1_arm64-setup.exe)
- [macOS x64](https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_x64.dmg)
- [macOS arm64](https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_aarch64.dmg)
- [Linux x64](https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_amd64.deb)
- [Linux arm64](https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_arm64.deb)

### [FlClash](https://github.com/chen08209/FlClash)
- [Android ARMv8](https://gh-proxy.com/github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-android-arm64-v8a.apk)
- [Android ARMv7](https://gh-proxy.com/github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-android-armeabi-v7a.apk)
- [Android x64](https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-android-armeabi-v7a.apk)

### [Hiddify](https://github.com/hiddify/hiddify-app)
- [Android Universal](https://github.com/hiddify/hiddify-next/releases/latest/download/Hiddify-Android-universal.apk)
- [iOS Universal](https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532)

### Android相关客户端
- [Clash Meta for Android](https://github.com/MetaCubeX/ClashMetaForAndroid)

### iOS相关客户端
- [Shadowrocket](https://apps.apple.com/us/app/shadowrocket/id932747118)
- [QuantumultX](https://apps.apple.com/us/app/quantumult-x/id1443988620)
- [Stash](https://apps.apple.com/us/app/stash-rule-based-proxy/id1596063349)
- [Surge](https://apps.apple.com/us/app/surge-5/id1442620678)

### OpenWRT相关插件
- [ShellCrash](https://github.com/juewuy/ShellCrash)
- [OpenClash](https://github.com/vernesong/OpenClash)
- [PassWall](https://github.com/xiaorouji/openwrt-passwall)

## 核心安装教程
### 核心下载
- [Mihomo](https://github.com/MetaCubeX/mihomo)
  - [Windows x64镜像下载](https://gh-proxy.com/github.com/MetaCubeX/mihomo/releases/download/v1.19.13/mihomo-windows-amd64-v2-v1.19.13.zip)
  - [Windows x64网盘下载](https://pzjpzjpzj.lanzoum.com/iukrO36s6wcd)
- [Sing Box](https://github.com/SagerNet/sing-box)
- [Clash Premium](https://hub.docker.com/r/dreamacro/clash-premium)
### 在线面板
- [ZashBoard](https://board.zash.run.place/)
- [MetaCubeXD](https://metacubex.github.io/metacubexd/)
### DockerCompose(代理服务器模式)
```yaml
services:
  mihomo:
    container_name: mihomo
    image: metacubex/mihomo:latest
    restart: always
    volumes:
      - ./config:/root/.config/mihomo #config.yaml配置文件目录
```
### DockerCompose(旁路网关模式)
```yaml
services:
   mihomo:
      container_name: mihomo
      image: metacubex/mihomo:latest
      restart: unless-stopped
      dns:
         - 127.0.0.1 # 启用fake-ip则这里一定要声明为容器本身的dns(避免docker容器dns干扰)
      cap_add:
         - NET_ADMIN
      devices:
         - /dev/net/tun:/dev/net/tun
      volumes:
         - ./config:/root/.config/mihomo #config.yaml配置文件目录
      networks:
         macvlan:
            ipv4_address: 192.168.0.2 #本容器分配地址
      sysctls:
         net.ipv4.ip_forward: 1
networks:
   macvlan:
      driver: macvlan
      driver_opts:
         parent: enp1s0 #本机出口网卡
      ipam:
         config:
            - subnet: 192.168.0.0/24 #局域网子网
              gateway: 192.168.0.1 #局域网关
```
### Windows(本地运行模式)
#### 直接启动
1. 右键以管理员权限运行`mihomo.exe`
2. 修改`%USERPROFILE%\.config\mihomo\config.yaml`默认配置
#### 后台启动
1. 在`mihomo.exe`程序所在目录创建`mihomo.vbs`输入指令保存，右键`mihomo.exe`进入属性>兼容性>勾选以管理员身份运行此程序
    ```vb
    set ws=WScript.CreateObject("WScript.Shell")
    ws.run "mihomo.exe",0
    ```
2. 双击运行或创建快捷方式到启动文件夹开机自动执行
   - 用户开机启动文件夹:`%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`
   - 系统开机启动文件夹:`C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp`
#### 计划任务
1. 右键开始菜单或此电脑，点击管理进入计算机管理
2. 在左侧选择**系统工具>任务计划程序>任务计划程序库**，在右侧选择**创建任务**
3. 在常规选项卡中，点击**更改用户或组**，输入`SYSTEM`检查名称，确认无误后确定
4. 在**触发器**选项卡中，点击**新建**按钮，开始任务选择**登陆时**，完成后确定
5. 在**操作**选项卡中，点击**新建**按钮，操作选择**启动程序**，点击浏览选择`mihomo.exe`，添加参数输入`-d "C:\Users\Admin\.config\mihomo"`（引号内修改为配置文件所在绝对文件夹路径），完成后确定
6. 完成所有配置后按确定保存任务
#### 创建服务
1. 下载[NSSM](/wiki/nssm.md)并解压`nssm.exe`到任意目录
2. 在该目录运行`nssm install`命令，在弹出窗进行服务安装
3. 进入**Application**选项卡
   - **Path**选择`mihomo.exe`
   - **Startup directory**保持自动填写
   - **Arguments**填写`-d .\`
   - **Service name**填写`Mihomo`
4. 点击**Install Service**安装服务
5. 进入任务管理器的服务选项卡找到`Mihomo`右键开始
6. 运行`nssm remove`命令，在弹出窗输入`Mihomo`可卸载服务

## 订阅转换
### SubConverter
1. 下载[SubConverter](https://github.com/tindy2013/subconverter)
    - 推荐使用[SubConverter MetaCubeX](https://github.com/MetaCubeX/subconverter)改版
2. 解压并打开`subconverter.exe`
3. 订阅地址输入本地URL<http://127.0.0.1:25500/sub?target=%TARGET%&url=%URL%>
    - `%TARGET%`替换为`auto`(自动)/`clash`(Clash)/`quanx`(QuantumultX)
    - `%URL%`使用[URLEncode](https://www.urlencoder.org/)编码原订阅地址后替换
> 无法部署可使用[SubConverters](https://subconverters.com/)或[ACL4SSR](https://acl4ssr-sub.github.io/)进行在线转换

### SubStore
1. 下载[SubStore](https://github.com/sub-store-org/Sub-Store/releases/latest/download/sub-store.bundle.js)
2. 下载[Node.js](https://nodejs.org/dist/v18.20.7/node-v18.20.7-win-x64.zip)解压并配置环境变量
3. 进入SubStore目录使用`node sub-store.bundle.js`运行
4. 访问<http://localhost:3000>管理订阅
5. 新增订阅转换保存并复制对应客户端订阅地址

## 配置教程
### 规则仓库
- [BlackMatrix详细规则](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash)
- [SSTap游戏规则](https://github.com/FQrabbit/SSTap-Rule/releases)
- [GeoSite解析](https://github.com/v2fly/domain-list-community/tree/master/data)
- [GeoIP解析](https://github.com/Loyalsoldier/geoip/tree/release/text)

### 配置文件
#### 配置教程
- [Mihomo Wiki](https://wiki.metacubex.one/)
- [Mihomo GitHub](https://github.com/MetaCubeX/mihomo/blob/Alpha/docs/config.yaml)
#### 常用配置
```yaml
port: 7890
socks-port: 7891
mixed-port: 7892
redir-port: 7893
tproxy-port: 7894
ipv6: true
allow-lan: true
lan-allowed-ips:
  - 0.0.0.0/0
lan-disallowed-ips:
  - ::/0
unified-delay: true
tcp-concurrent: true
external-controller: 127.0.0.1:9090 # 监听任意地址修改为0.0.0.0:9090
external-ui-url: "https://github.com/Zephyruso/zashboard/releases/latest/download/dist.zip"

geodata-mode: true
geox-url:
  geoip: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat"
  geosite: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat"
  mmdb: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb"
  asn: "https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb"

find-process-mode: strict
global-client-fingerprint: chrome

profile:
  store-selected: true
  store-fake-ip: true

sniffer:
  enable: true
  sniff:
    HTTP:
      ports: [80, 8080-8880]
      override-destination: true
    TLS:
      ports: [443, 8443]
    QUIC:
      ports: [443, 8443]
  skip-domain:
    - "Mijia Cloud"
    - "+.push.apple.com"

tun:
  enable: true
  stack: gvisor # Windows建议使用gvisor，Linux建议使用mixed，防火墙放行可使用system
  dns-hijack:
    - "any:53"
    - "tcp://any:53"
  auto-route: true
  auto-redirect: true # 旁路网关模式可使用false，即tun接管所有流量
  auto-detect-interface: true

dns:
  enable: true
  ipv6: true
  listen: 0.0.0.0:53
  respect-rules: true
  enhanced-mode: fake-ip
  fake-ip-filter:
    - "*"
    - "+.lan"
    - "+.local"
    - '+.stun.*.*'
    - '+.stun.*.*.*'
    - '+.stun.*.*.*.*'
    - '+.stun.*.*.*.*.*'
  nameserver:
    - "https://223.5.5.5/dns-query"
    - "https://120.53.53.53/dns-query"
  proxy-server-nameserver:
    - "https://dns.alidns.com/dns-query"
    - "https://doh.pub/dns-query"
  nameserver-policy:
    "geosite:cn,private":
      - "https://dns.alidns.com/dns-query"
      - "https://doh.pub/dns-query"
    "geosite:geolocation-!cn":
      - "https://dns.cloudflare.com/dns-query"
      - "https://dns.google/dns-query"

proxy-providers:
  proxy:
    type: http
    url: https://example.com?clash=1 # 修改为节点订阅地址
    interval: 86400
    health-check:
      enable: true
      url: https://www.gstatic.com/generate_204
      interval: 60
      lazy: false
    override: # 建议删除所有节点覆盖项，连接异常可适当调整
      skip-cert-verify: false # 强制跳过证书验证使用true
      udp: true # 强制启用节点UDP使用true

proxy-groups:
  - name: 国际代理
    type: select
    include-all: true
    exclude-filter: "(?i)订阅|官网|网站" # 可修改屏蔽节点
    proxies: [故障转移,DIRECT]

  - name: 人工智能
    type: select
    include-all: true
    exclude-filter: "(?i)订阅|官网|网站" # 可修改屏蔽节点
    proxies: [美国,日本,韩国,DIRECT]

  - name: 国内代理
    type: select
    include-all: true
    exclude-filter: "(?i)订阅|官网|网站" # 可修改屏蔽节点
    proxies: [DIRECT,故障转移]

  - name: 故障转移
    type: fallback
    proxies: [香港,台湾,新加坡,美国,日本,韩国,DIRECT]
    url: https://cp.cloudflare.com/generate_204
    interval: 60
    lazy: false

  - name: 香港
    type: url-test
    include-all: true
    filter: "(?i)香港"
    tolerance: 100

  - name: 台湾
    type: url-test
    include-all: true
    filter: "(?i)台湾"
    tolerance: 100

  - name: 新加坡
    type: url-test
    include-all: true
    filter: "(?i)新加坡"
    tolerance: 100

  - name: 美国
    type: url-test
    include-all: true
    filter: "(?i)美国"
    tolerance: 100

  - name: 日本
    type: url-test
    include-all: true
    filter: "(?i)日本"
    tolerance: 100

  - name: 韩国
    type: url-test
    include-all: true
    filter: "(?i)韩国"
    tolerance: 100

rules:
  - GEOIP,private,DIRECT,no-resolve
  - GEOSITE,category-ai-chat-!cn,人工智能
  - GEOSITE,github,国际代理
  - GEOSITE,google,国际代理
  - GEOSITE,bing,国际代理
  - GEOSITE,cloudflare,国际代理
  - GEOSITE,twitter,国际代理
  - GEOSITE,telegram,国际代理
  - GEOSITE,youtube,国际代理
  - GEOSITE,netflix,国际代理
  - GEOSITE,spotify,国际代理
  - DOMAIN-SUFFIX,steamserver.net,DIRECT
  - GEOSITE,steam@cn,国内代理
  - GEOSITE,steam,国际代理
  - GEOSITE,bilibili,国内代理
  - GEOSITE,CN,国内代理
  - GEOIP,google,国际代理
  - GEOIP,cloudflare,国际代理
  - GEOIP,twitter,国际代理
  - GEOIP,telegram,国际代理
  - GEOIP,netflix,国际代理
  - GEOIP,CN,国内代理
  - MATCH,国际代理
```
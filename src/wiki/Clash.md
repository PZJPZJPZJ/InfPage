# Clash:代理工具
## 客户端推荐
### [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev)
- [Windows x64](https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_x64-setup.exe)
- [Windows arm64](https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_arm64-setup.exe)
- [macOS x64](https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_x64.dmg)
- [macOS arm64](https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_aarch64.dmg)
- [Linux x64](https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_amd64.deb)
- [Linux arm64](https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_arm64.deb)

### [FlClash](https://github.com/chen08209/FlClash)
- [Android ARMv8](https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-android-arm64-v8a.apk)
- [Android ARMv7](https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-android-armeabi-v7a.apk)
- [Android x64](https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-android-armeabi-v7a.apk)

### [Hiddify](https://github.com/hiddify/hiddify-app)
- [Android Universal](https://github.com/hiddify/hiddify-next/releases/latest/download/Hiddify-Android-universal.apk)
- [iOS Universal](https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532)

### Android相关客户端
- [Clash Meta for Android](https://github.com/MetaCubeX/ClashMetaForAndroid)
- [Sing Box](https://github.com/SagerNet/sing-box)

### iOS相关客户端
- [Shadowrocket](https://apps.apple.com/us/app/shadowrocket/id932747118)
- [Quantumult X](https://apps.apple.com/us/app/quantumult-x/id1443988620)
- [Stash](https://apps.apple.com/us/app/stash-rule-based-proxy/id1596063349)
- [Surge](https://apps.apple.com/us/app/surge-5/id1442620678)

### OpenWRT相关插件
- [ShellCrash](https://github.com/juewuy/ShellCrash)
- [OpenClash](https://github.com/vernesong/OpenClash)
- [PassWall](https://github.com/xiaorouji/openwrt-passwall)

## 核心配置
### 下载地址
- [Mihomo(Clash Meta)](https://github.com/MetaCubeX/mihomo)
```yaml
# DockerCompose配置
services:
  mihomo:
    container_name: mihomo
    image: metacubex/mihomo:latest
    network_mode: host
    # privileged权限会创建Tun网卡代理全局(可选)
    privileged: true
    restart: always
    volumes:
      - ./config:/root/.config/mihomo
```
- [Clash Premium](https://hub.docker.com/r/dreamacro/clash-premium)
```yaml
# DockerCompose配置
services:
  clash:
    container_name: clash
    image: dreamacro/clash-premium:latest
    network_mode: host
    restart: always
    volumes:
      - ./config:/root/.config/clash
```

### 配置教程
1. 将[配置文件](#常用配置文件)命名为config.yaml，修改proxy-providers的url为订阅地址
    - Windows放在`C:\Users\Admin\.config\mihomo`目录中
    - Linux放在`/root/.config/mihomo`目录中
2. 运行程序并选择其中一种[连接方式](#连接方式)

## 订阅转换
### SubConverter
1. 下载[SubConverter](https://github.com/tindy2013/subconverter)
    - 推荐使用[SubConverter MetaCubeX](https://github.com/MetaCubeX/subconverter)改版
2. 解压并打开`subconverter.exe`
3. 订阅地址输入本地URL<http://127.0.0.1:25500/sub?target=%TARGET%&url=%URL%>
    - `%TARGET%`替换为`auto`(自动)/`clash`(Clash)/`quanx`(Quantumult X)
    - `%URL%`使用[URLEncode](https://www.urlencoder.org/)编码原订阅地址后替换
> 无法部署可使用[ACL4SSR](https://acl4ssr-sub.github.io/)或[SubConverters](https://subconverters.com/)进行在线转换(不推荐)

### SubStore
1. 下载[SubStore](https://github.com/sub-store-org/Sub-Store/releases/latest/download/sub-store.bundle.js)
2. 下载[Node.js](https://nodejs.org/dist/v18.20.7/node-v18.20.7-win-x64.zip)解压并配置环境变量
3. 进入SubStore目录使用`node sub-store.bundle.js`运行
4. 访问<http://localhost:3000>管理订阅
5. 新增订阅转换保存并复制对应客户端订阅地址

## 规则配置
### 规则仓库
- [BlackMatrix详细规则](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash)
- [SSTap游戏规则](https://github.com/FQrabbit/SSTap-Rule/releases)
- [GeoSite解析](https://github.com/v2fly/domain-list-community/tree/master/data)
- [GeoIP解析](https://github.com/Loyalsoldier/geoip/tree/release/text)

## 连接方式
### HTTP/HTTPS:应用级TCP代理
- 仅遵循HTTP代理应用可用

### Socks:应用级全局代理
- 仅可连接Socks应用可用

### Redir:端口转发模式 TCP
```shell
iptables -t nat -N CLASH
iptables -t nat -A CLASH -d 0.0.0.0/8 -j RETURN
iptables -t nat -A CLASH -d 10.0.0.0/8 -j RETURN
iptables -t nat -A CLASH -d 127.0.0.0/8 -j RETURN
iptables -t nat -A CLASH -d 169.254.0.0/16 -j RETURN
iptables -t nat -A CLASH -d 172.16.0.0/12 -j RETURN
iptables -t nat -A CLASH -d 192.168.0.0/16 -j RETURN
iptables -t nat -A CLASH -d 224.0.0.0/4 -j RETURN
iptables -t nat -A CLASH -d 240.0.0.0/4 -j RETURN

iptables -t nat -A CLASH -p tcp -j REDIRECT --to-ports 7892
iptables -t nat -A PREROUTING -p tcp -j CLASH
```

### Tproxy:透明网关模式 TCP/UDP(仅Linux可用)
- 创建路由规则劫持流量转发
```shell
# 将所有进入本机的 tcp/udp 数据包交给 tproxy
iptables -t mangle -A PREROUTING -p tcp -j TPROXY --on-ip 127.0.0.1 --on-port 7893
iptables -t mangle -A PREROUTING -p udp -j TPROXY --on-ip 127.0.0.1 --on-port 7893

# IPv4 避免内网数据包死循环
# 添加一条路由规则，对于 mark 为 1 的数据包，默认从 lo 设备出去
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100

# 添加一个新的链，用来判断本机出去的数据包是否需要经过代理
iptables -t mangle -N CLASH
iptables -t mangle -A CLASH -d 10.0.0.0/8 -j RETURN
iptables -t mangle -A CLASH -d 127.0.0.0/8 -j RETURN
iptables -t mangle -A CLASH -d 172.16.0.0/12 -j RETURN
iptables -t mangle -A CLASH -d 192.168.0.0/16 -j RETURN
iptables -t mangle -A CLASH -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A CLASH -d 255.255.255.255/32 -j RETURN
iptables -t mangle -A CLASH -p tcp -j MARK --set-mark 1
iptables -t mangle -A CLASH -p udp -j MARK --set-mark 1

# 对于本机非 clash-meta 用户都启用透明代理
iptables -t mangle -A OUTPUT -m owner ! --uid-owner clash-meta -j CLASH

# IPv6 避免内网数据包死循环
# 添加一条路由规则，对于 mark 为 1 的数据包，默认从 lo 设备出去
ip -6 rule add fwmark 1 table 101
ip -6 route add local ::/0 dev lo table 101

# 添加一个新的链，用来判断本机出去的数据包是否需要经过代理
ip6tables -t mangle -N CLASH6
ip6tables -t mangle -A CLASH6 -d ::1/128 -j RETURN
ip6tables -t mangle -A CLASH6 -d fc00::/7 -j RETURN
ip6tables -t mangle -A CLASH6 -d ff00::/8 -j RETURN
ip6tables -t mangle -A CLASH6 -d fe80::/10 -j RETURN
ip6tables -t mangle -A CLASH6 -p tcp -j MARK --set-mark 1
ip6tables -t mangle -A CLASH6 -p udp -j MARK --set-mark 1

# 对于本机非 clash-meta 用户都启用透明代理
ip6tables -t mangle -A OUTPUT -m owner ! --uid-owner clash-meta -j CLASH6
```
- 删除上述规则
```shell
# 删除本机重路由规则
ip rule del fwmark 1 table 100
ip route del local 0.0.0.0/0 dev lo table 100
iptables -t mangle -D OUTPUT -m owner ! --uid-owner clash-meta -j CLASH
iptables -t mangle -F CLASH
iptables -t mangle -X CLASH
ip -6 rule del fwmark 1 table 101
ip -6 route del local ::/0 dev lo table 101
ip6tables -t mangle -D OUTPUT -m owner ! --uid-owner clash-meta -j CLASH6
ip6tables -t mangle -F CLASH6
ip6tables -t mangle -X CLASH6

# 删除劫持到透明代理的规则
iptables -t mangle -D PREROUTING -j CLASH_LAN
iptables -t mangle -F CLASH_LAN
iptables -t mangle -X CLASH_LAN
ip6tables -t mangle -D PREROUTING -j CLASH6_LAN
ip6tables -t mangle -F CLASH6_LAN
ip6tables -t mangle -X CLASH6_LAN
```
### TUN:网卡模式(旁路网关)
#### Linux
- 使用`./mihomo`运行，系统会创建TUN网卡，自动识别出口网卡并拦截流量

#### Windows
##### 直接启动
- 右键以管理员权限运行`mihomo.exe`(系统会创建TUN网卡，自动代理本机所有流量)
##### 后台启动
1. 在`mihomo.exe`程序所在目录创建`mihomo.vbs`输入指令保存，右键`mihomo.exe`进入属性>兼容性>勾选以管理员身份运行此程序
    ```vbs
    set ws=WScript.CreateObject("WScript.Shell")
    ws.run "mihomo.exe",0
    ```
2. 双击运行或创建快捷方式放入`C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp`文件夹开机自动执行
##### 创建计划任务
- 自动创建:在`mihomo.exe`程序所在目录创建`mihomo.bat`输入指令保存并以使用管理员身份运行
    ```shell
    set "DIR=%~dp0"
    set "DIR=%DIR:~0,-1%"
    schtasks /create /tn "Mihomo" /tr "\"%~dp0mihomo.exe\" -d \"%DIR%\"" /sc onlogon /ru system /rl highest /f
    ```
- 手动创建和管理:右键单击开始菜单>计算机管理>计划任务程序>计划任务程序库

## 常用配置文件
- [Mihomo Wiki](https://wiki.metacubex.one/)
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
external-controller: 0.0.0.0:7880
external-ui: ui
external-ui-url: "https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip"

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
  stack: mixed
  dns-hijack:
    - "any:53"
    - "tcp://any:53"
  auto-route: true
  auto-redirect: true
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
    - "+.market.xiaomi.com"
  nameserver:
    - https://120.53.53.53/dns-query
    - https://223.5.5.5/dns-query
  proxy-server-nameserver:
    - https://120.53.53.53/dns-query
    - https://223.5.5.5/dns-query
  nameserver-policy:
    "geosite:cn,private":
      - https://120.53.53.53/dns-query
      - https://223.5.5.5/dns-query
    "geosite:geolocation-!cn":
      - "https://dns.cloudflare.com/dns-query"
      - "https://dns.google/dns-query"

proxy-providers:
  provider:
    url: https://example.com?clash=1
    type: http
    interval: 86400
    health-check:
      enable: true
      url: https://www.gstatic.com/generate_204
      interval: 300

proxy-groups:
  - name: 自动
    type: fallback
    proxies: [香港,台湾,日本,韩国,美国,新加坡,专线,DIRECT]
    url: https://cp.cloudflare.com/generate_204
    interval: 60

  - name: 专线
    type: select
    include-all: true
    filter: "(?i)专线"
    tolerance: 60

  - name: 香港
    type: url-test
    include-all: true
    filter: "(?i)香港"
    exclude-filter: "(?i)专线"
    tolerance: 60

  - name: 台湾
    type: url-test
    include-all: true
    filter: "(?i)台湾"
    exclude-filter: "(?i)专线"
    tolerance: 60

  - name: 日本
    type: url-test
    include-all: true
    filter: "(?i)日本"
    exclude-filter: "(?i)专线"
    tolerance: 60

  - name: 韩国
    type: url-test
    include-all: true
    filter: "(?i)韩国"
    exclude-filter: "(?i)专线"
    tolerance: 60

  - name: 美国
    type: url-test
    include-all: true
    filter: "(?i)美国"
    exclude-filter: "(?i)专线"
    tolerance: 60

  - name: 新加坡
    type: url-test
    include-all: true
    filter: "(?i)新加坡"
    exclude-filter: "(?i)专线"
    tolerance: 60

rules:
  # Lan
  - GEOIP,private,DIRECT,no-resolve
  # AI
  - GEOSITE,category-ai-chat-!cn,美国
  # Bahamut
  - GEOSITE,bahamut,台湾
  # Github
  - GEOSITE,github,自动
  # Twitter
  - GEOSITE,twitter,自动
  - GEOIP,twitter,自动
  # Youtube
  - GEOSITE,youtube,自动
  # Google
  - GEOSITE,google,自动
  - GEOIP,google,自动
  # NETFLIX
  - GEOSITE,netflix,自动
  - GEOIP,netflix,自动
  # Spotify
  - GEOSITE,spotify,自动
  # Telegram
  - GEOSITE,telegram,自动
  - GEOIP,telegram,自动
  # Steam
  - DOMAIN-SUFFIX,steamserver.net,DIRECT
  - GEOSITE,steam@cn,DIRECT
  - GEOSITE,steam,自动
  # Bilibili
  - GEOSITE,bilibili,DIRECT
  # China
  - GEOSITE,CN,DIRECT
  - GEOIP,CN,DIRECT
  # Global
  - MATCH,自动
```
## 配置文件示例
- [Mihomo GitHub](https://github.com/MetaCubeX/mihomo/blob/Alpha/docs/config.yaml)
```yaml
# port: 7890 # HTTP(S) 代理服务器端口
# socks-port: 7891 # SOCKS5 代理端口
mixed-port: 10801 # HTTP(S) 和 SOCKS 代理混合端口
# redir-port: 7892 # 透明代理端口，用于 Linux 和 MacOS

# Transparent proxy server port for Linux (TProxy TCP and TProxy UDP)
# tproxy-port: 7893

allow-lan: true # 允许局域网连接
bind-address: "*" # 绑定 IP 地址，仅作用于 allow-lan 为 true，'*'表示所有地址
authentication: # http,socks入口的验证用户名，密码
  - "username:password"
skip-auth-prefixes: # 设置跳过验证的IP段
  - 127.0.0.1/8
  - ::1/128
lan-allowed-ips: # 允许连接的 IP 地址段，仅作用于 allow-lan 为 true, 默认值为0.0.0.0/0和::/0
  - 0.0.0.0/0
  - ::/0
lan-disallowed-ips: # 禁止连接的 IP 地址段, 黑名单优先级高于白名单, 默认值为空
  - 192.168.0.3/32

#  find-process-mode has 3 values:always, strict, off
#  - always, 开启，强制匹配所有进程
#  - strict, 默认，由 mihomo 判断是否开启
#  - off, 不匹配进程，推荐在路由器上使用此模式
find-process-mode: strict

mode: rule

#自定义 geodata url
geox-url:
  geoip: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat"
  geosite: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat"
  mmdb: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.metadb"

geo-auto-update: false # 是否自动更新 geodata
geo-update-interval: 24 # 更新间隔，单位：小时

# Matcher implementation used by GeoSite, available implementations:
# - succinct (default, same as rule-set)
# - mph (from V2Ray, also `hybrid` in Xray)
# geosite-matcher: succinct

log-level: debug # 日志等级 silent/error/warning/info/debug

ipv6: true # 开启 IPv6 总开关，关闭阻断所有 IPv6 链接和屏蔽 DNS 请求 AAAA 记录

tls:
  certificate: string # 证书 PEM 格式，或者 证书的路径
  private-key: string # 证书对应的私钥 PEM 格式，或者私钥路径
  custom-certifactes:
    - |
      -----BEGIN CERTIFICATE-----
      format/pem...
      -----END CERTIFICATE-----

external-controller: 0.0.0.0:9093 # RESTful API 监听地址
external-controller-tls: 0.0.0.0:9443 # RESTful API HTTPS 监听地址，需要配置 tls 部分配置文件
# secret: "123456" # `Authorization:Bearer ${secret}`

# tcp-concurrent: true # TCP 并发连接所有 IP, 将使用最快握手的 TCP

# 配置 WEB UI 目录，使用 http://{{external-controller}}/ui 访问
# 解压 mihomo-yacd-meta-gh-pages.zip 并配置静态文件目录
external-ui: /path/to/ui/folder/
external-ui-name: xd
external-ui-url: "https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip"

# interface-name: en0 # 设置出口网卡

# 全局 TLS 指纹，优先低于 proxy 内的 client-fingerprint
# 可选： "chrome","firefox","safari","ios","random","none" options.
# Utls is currently support TLS transport in TCP/grpc/WS/HTTP for VLESS/Vmess and trojan.
global-client-fingerprint: chrome

#  TCP keep alive interval
keep-alive-interval: 15

# routing-mark:6666 # 配置 fwmark 仅用于 Linux
experimental:
  # Disable quic-go GSO support. This may result in reduced performance on Linux.
  # This is not recommended for most users.
  # Only users encountering issues with quic-go's internal implementation should enable this,
  # and they should disable it as soon as the issue is resolved.
  # This field will be removed when quic-go fixes all their issues in GSO.
  # This equivalent to the environment variable QUIC_GO_DISABLE_GSO=1.
  #quic-go-disable-gso: true

# 类似于 /etc/hosts, 仅支持配置单个 IP
hosts:
# '*.mihomo.dev': 127.0.0.1
# '.dev': 127.0.0.1
# 'alpha.mihomo.dev': '::1'
# test.com: [1.1.1.1, 2.2.2.2]
# home.lan: lan # lan 为特别字段，将加入本地所有网卡的地址
# baidu.com: google.com # 只允许配置一个别名

profile: # 存储 select 选择记录
  store-selected: false

  # 持久化 fake-ip
  store-fake-ip: true

# Tun 配置
tun:
  enable: false
  stack: system # gvisor/mixed
  dns-hijack:
    - 0.0.0.0:53 # 需要劫持的 DNS
  # auto-detect-interface: true # 自动识别出口网卡
  # auto-route: true # 配置路由表
  # mtu: 9000 # 最大传输单元
  # gso: false # 启用通用分段卸载, 仅支持 Linux
  # gso-max-size: 65536 # 通用分段卸载包的最大大小
  # strict-route: true # 将所有连接路由到tun来防止泄漏，但你的设备将无法其他设备被访问
  inet4-route-address: # 启用 auto-route 时使用自定义路由而不是默认路由
    - 0.0.0.0/1
    - 128.0.0.0/1
  inet6-route-address: # 启用 auto-route 时使用自定义路由而不是默认路由
    - "::/1"
    - "8000::/1"
  # endpoint-independent-nat: false # 启用独立于端点的 NAT
  # include-interface: # 限制被路由的接口。默认不限制, 与 `exclude-interface` 冲突
  #   - "lan0"
  # exclude-interface: # 排除路由的接口, 与 `include-interface` 冲突
  #   - "lan1"
  # include-uid: # UID 规则仅在 Linux 下被支持，并且需要 auto-route
  # - 0
  # include-uid-range: # 限制被路由的的用户范围
  # - 1000:9999
  # exclude-uid: # 排除路由的的用户
  #- 1000
  # exclude-uid-range: # 排除路由的的用户范围
  # - 1000:9999

  # Android 用户和应用规则仅在 Android 下被支持
  # 并且需要 auto-route

  # include-android-user: # 限制被路由的 Android 用户
  # - 0
  # - 10
  # include-package: # 限制被路由的 Android 应用包名
  # - com.android.chrome
  # exclude-package: # 排除被路由的 Android 应用包名
  # - com.android.captiveportallogin

#ebpf配置
ebpf:
  auto-redir: # redirect 模式，仅支持 TCP
    - eth0
  redirect-to-tun: # UDP+TCP 使用该功能请勿启用 auto-route
    - eth0

# 嗅探域名 可选配置
sniffer:
  enable: false
  ## 对 redir-host 类型识别的流量进行强制嗅探
  ## 如：Tun、Redir 和 TProxy 并 DNS 为 redir-host 皆属于
  # force-dns-mapping: false
  ## 对所有未获取到域名的流量进行强制嗅探
  # parse-pure-ip: false
  # 是否使用嗅探结果作为实际访问，默认 true
  # 全局配置，优先级低于 sniffer.sniff 实际配置
  override-destination: false
  sniff: # TLS 和 QUIC 默认如果不配置 ports 默认嗅探 443
    QUIC:
    #  ports: [ 443 ]
    TLS:
    #  ports: [443, 8443]

    # 默认嗅探 80
    HTTP: # 需要嗅探的端口
      ports: [80, 8080-8880]
      # 可覆盖 sniffer.override-destination
      override-destination: true
  force-domain:
    - +.v2ex.com
  ## 对嗅探结果进行跳过
  # skip-domain:
  #   - Mijia Cloud
  # 需要嗅探协议
  # 已废弃，若 sniffer.sniff 配置则此项无效
  sniffing:
    - tls
    - http
  # 强制对此域名进行嗅探

  # 仅对白名单中的端口进行嗅探，默认为 443，80
  # 已废弃，若 sniffer.sniff 配置则此项无效
  port-whitelist:
    - "80"
    - "443"
    # - 8000-9999

tunnels: # one line config
  - tcp/udp,127.0.0.1:6553,114.114.114.114:53,proxy
  - tcp,127.0.0.1:6666,rds.mysql.com:3306,vpn
  # full yaml config
  - network: [tcp, udp]
    address: 127.0.0.1:7777
    target: target.com
    proxy: proxy

# DNS配置
dns:
  cache-algorithm: arc
  enable: false # 关闭将使用系统 DNS
  prefer-h3: true # 开启 DoH 支持 HTTP/3，将并发尝试
  listen: 0.0.0.0:53 # 开启 DNS 服务器监听
  # ipv6: false # false 将返回 AAAA 的空结果
  # ipv6-timeout: 300 # 单位：ms，内部双栈并发时，向上游查询 AAAA 时，等待 AAAA 的时间，默认 100ms
  # 用于解析 nameserver，fallback 以及其他DNS服务器配置的，DNS 服务域名
  # 只能使用纯 IP 地址，可使用加密 DNS
  default-nameserver:
    - 114.114.114.114
    - 8.8.8.8
    - tls://1.12.12.12:853
    - tls://223.5.5.5:853
    - system # append DNS server from system configuration. If not found, it would print an error log and skip.
  enhanced-mode: fake-ip # or redir-host

  fake-ip-range: 198.18.0.1/16 # fake-ip 池设置

  # use-hosts: true # 查询 hosts

  # 配置不使用fake-ip的域名
  # fake-ip-filter:
  #   - '*.lan'
  #   - localhost.ptlogin2.qq.com

  # DNS主要域名配置
  # 支持 UDP，TCP，DoT，DoH，DoQ
  # 这部分为主要 DNS 配置，影响所有直连，确保使用对大陆解析精准的 DNS
  nameserver:
    - 114.114.114.114 # default value
    - 8.8.8.8 # default value
    - tls://223.5.5.5:853 # DNS over TLS
    - https://doh.pub/dns-query # DNS over HTTPS
    - https://dns.alidns.com/dns-query#h3=true # 强制 HTTP/3，与 perfer-h3 无关，强制开启 DoH 的 HTTP/3 支持，若不支持将无法使用
    - https://mozilla.cloudflare-dns.com/dns-query#DNS&h3=true # 指定策略组和使用 HTTP/3
    - dhcp://en0 # dns from dhcp
    - quic://dns.adguard.com:784 # DNS over QUIC
    # - '8.8.8.8#en0' # 兼容指定DNS出口网卡

  # 当配置 fallback 时，会查询 nameserver 中返回的 IP 是否为 CN，非必要配置
  # 当不是 CN，则使用 fallback 中的 DNS 查询结果
  # 确保配置 fallback 时能够正常查询
  # fallback:
  #   - tcp://1.1.1.1
  #   - 'tcp://1.1.1.1#ProxyGroupName' # 指定 DNS 过代理查询，ProxyGroupName 为策略组名或节点名，过代理配置优先于配置出口网卡，当找不到策略组或节点名则设置为出口网卡

  # 专用于节点域名解析的 DNS 服务器，非必要配置项
  # 配置服务器若查询失败将使用 nameserver，非并发查询
  # proxy-server-nameserver:
  # - https://dns.google/dns-query
  # - tls://one.one.one.one

  # 配置 fallback 使用条件
  # fallback-filter:
  #   geoip: true # 配置是否使用 geoip
  #   geoip-code: CN # 当 nameserver 域名的 IP 查询 geoip 库为 CN 时，不使用 fallback 中的 DNS 查询结果
  #   配置强制 fallback，优先于 IP 判断，具体分类自行查看 geosite 库
  #   geosite:
  #     - gfw
  #   如果不匹配 ipcidr 则使用 nameservers 中的结果
  #   ipcidr:
  #     - 240.0.0.0/4
  #   domain:
  #     - '+.google.com'
  #     - '+.facebook.com'
  #     - '+.youtube.com'

  # 配置查询域名使用的 DNS 服务器
  nameserver-policy:
    #   'www.baidu.com': '114.114.114.114'
    #   '+.internal.crop.com': '10.0.0.1'
    "geosite:cn,private,apple":
      - https://doh.pub/dns-query
      - https://dns.alidns.com/dns-query
    "geosite:category-ads-all": rcode://success
    "www.baidu.com,+.google.cn": [223.5.5.5, https://dns.alidns.com/dns-query]
    ## global，dns 为 rule-providers 中的名为 global 和 dns 规则订阅，
    ## 且 behavior 必须为 domain/classical，当为 classical 时仅会生效域名类规则
    # "rule-set:global,dns": 8.8.8.8

proxies: # socks5
  - name: "socks"
    type: socks5
    server: server
    port: 443
    # username: username
    # password: password
    # tls: true
    # fingerprint: xxxx
    # skip-cert-verify: true
    # udp: true
    # ip-version: ipv6

  # http
  - name: "http"
    type: http
    server: server
    port: 443
    # username: username
    # password: password
    # tls: true # https
    # skip-cert-verify: true
    # sni: custom.com
    # fingerprint: xxxx # 同 experimental.fingerprints 使用 sha256 指纹，配置协议独立的指纹，将忽略 experimental.fingerprints
    # ip-version: dual

  # Snell
  # Beware that there's currently no UDP support yet
  - name: "snell"
    type: snell
    server: server
    port: 44046
    psk: yourpsk
    # version: 2
    # obfs-opts:
    # mode: http # or tls
    # host: bing.com

  # Shadowsocks
  # cipher支持:
  #   aes-128-gcm aes-192-gcm aes-256-gcm
  #   aes-128-cfb aes-192-cfb aes-256-cfb
  #   aes-128-ctr aes-192-ctr aes-256-ctr
  #   rc4-md5 chacha20-ietf xchacha20
  #   chacha20-ietf-poly1305 xchacha20-ietf-poly1305
  #   2022-blake3-aes-128-gcm 2022-blake3-aes-256-gcm 2022-blake3-chacha20-poly1305
  - name: "ss1"
    type: ss
    server: server
    port: 443
    cipher: chacha20-ietf-poly1305
    password: "password"
    # udp: true
    # udp-over-tcp: false
    # ip-version: ipv4 # 设置节点使用 IP 版本，可选：dual，ipv4，ipv6，ipv4-prefer，ipv6-prefer。默认使用 dual
    # ipv4：仅使用 IPv4  ipv6：仅使用 IPv6
    # ipv4-prefer：优先使用 IPv4 对于 TCP 会进行双栈解析，并发链接但是优先使用 IPv4 链接,
    # UDP 则为双栈解析，获取结果中的第一个 IPv4
    # ipv6-prefer 同 ipv4-prefer
    # 现有协议都支持此参数，TCP 效果仅在开启 tcp-concurrent 生效
    smux:
      enabled: false
      protocol: smux # smux/yamux/h2mux
      # max-connections: 4 # Maximum connections. Conflict with max-streams.
      # min-streams: 4 # Minimum multiplexed streams in a connection before opening a new connection. Conflict with max-streams.
      # max-streams: 0 # Maximum multiplexed streams in a connection before opening a new connection. Conflict with max-connections and min-streams.
      # padding: false # Enable padding. Requires sing-box server version 1.3-beta9 or later.
      # statistic: false # 控制是否将底层连接显示在面板中，方便打断底层连接
      # only-tcp: false # 如果设置为true, smux的设置将不会对udp生效，udp连接会直接走底层协议

  - name: "ss2"
    type: ss
    server: server
    port: 443
    cipher: chacha20-ietf-poly1305
    password: "password"
    plugin: obfs
    plugin-opts:
      mode: tls # or http
      # host: bing.com

  - name: "ss3"
    type: ss
    server: server
    port: 443
    cipher: chacha20-ietf-poly1305
    password: "password"
    plugin: v2ray-plugin
    plugin-opts:
      mode: websocket # no QUIC now
      # tls: true # wss
      # 可使用 openssl x509 -noout -fingerprint -sha256 -inform pem -in yourcert.pem 获取
      # 配置指纹将实现 SSL Pining 效果
      # fingerprint: xxxx
      # skip-cert-verify: true
      # host: bing.com
      # path: "/"
      # mux: true
      # headers:
      #   custom: value
      # v2ray-http-upgrade: false

  - name: "ss4-shadow-tls"
    type: ss
    server: server
    port: 443
    cipher: chacha20-ietf-poly1305
    password: "password"
    plugin: shadow-tls
    client-fingerprint: chrome
    plugin-opts:
      host: "cloud.tencent.com"
      password: "shadow_tls_password"
      version: 2 # support 1/2/3

  - name: "ss-restls-tls13"
    type: ss
    server: [YOUR_SERVER_IP]
    port: 443
    cipher: chacha20-ietf-poly1305
    password: [YOUR_SS_PASSWORD]
    client-fingerprint:
      chrome # One of: chrome, ios, firefox or safari
      # 可以是chrome, ios, firefox, safari中的一个
    plugin: restls
    plugin-opts:
      host:
        "www.microsoft.com" # Must be a TLS 1.3 server
        # 应当是一个TLS 1.3 服务器
      password: [YOUR_RESTLS_PASSWORD]
      version-hint: "tls13"
      # Control your post-handshake traffic through restls-script
      # Hide proxy behaviors like "tls in tls".
      # see https://github.com/3andne/restls/blob/main/Restls-Script:%20Hide%20Your%20Proxy%20Traffic%20Behavior.md
      # 用restls剧本来控制握手后的行为，隐藏"tls in tls"等特征
      # 详情：https://github.com/3andne/restls/blob/main/Restls-Script:%20%E9%9A%90%E8%97%8F%E4%BD%A0%E7%9A%84%E4%BB%A3%E7%90%86%E8%A1%8C%E4%B8%BA.md
      restls-script: "300?100<1,400~100,350~100,600~100,300~200,300~100"

  - name: "ss-restls-tls12"
    type: ss
    server: [YOUR_SERVER_IP]
    port: 443
    cipher: chacha20-ietf-poly1305
    password: [YOUR_SS_PASSWORD]
    client-fingerprint:
      chrome # One of: chrome, ios, firefox or safari
      # 可以是chrome, ios, firefox, safari中的一个
    plugin: restls
    plugin-opts:
      host:
        "vscode.dev" # Must be a TLS 1.2 server
        # 应当是一个TLS 1.2 服务器
      password: [YOUR_RESTLS_PASSWORD]
      version-hint: "tls12"
      restls-script: "1000?100<1,500~100,350~100,600~100,400~200"

  # vmess
  # cipher支持 auto/aes-128-gcm/chacha20-poly1305/none
  - name: "vmess"
    type: vmess
    server: server
    port: 443
    uuid: uuid
    alterId: 32
    cipher: auto
    # udp: true
    # tls: true
    # fingerprint: xxxx
    # client-fingerprint: chrome    # Available: "chrome","firefox","safari","ios","random", currently only support TLS transport in TCP/GRPC/WS/HTTP for VLESS/Vmess and trojan.
    # skip-cert-verify: true
    # servername: example.com # priority over wss host
    # network: ws
    # ws-opts:
      # path: /path
      # headers:
      #   Host: v2ray.com
      # max-early-data: 2048
      # early-data-header-name: Sec-WebSocket-Protocol
      # v2ray-http-upgrade: false

  - name: "vmess-h2"
    type: vmess
    server: server
    port: 443
    uuid: uuid
    alterId: 32
    cipher: auto
    network: h2
    tls: true
    # fingerprint: xxxx
    h2-opts:
      host:
        - http.example.com
        - http-alt.example.com
      path: /

  - name: "vmess-http"
    type: vmess
    server: server
    port: 443
    uuid: uuid
    alterId: 32
    cipher: auto
    # udp: true
    # network: http
    # http-opts:
    #   method: "GET"
    #   path:
    #     - '/'
    #     - '/video'
    #   headers:
    #     Connection:
    #       - keep-alive
    # ip-version: ipv4 # 设置使用 IP 类型偏好，可选：ipv4，ipv6，dual，默认值：dual

  - name: vmess-grpc
    server: server
    port: 443
    type: vmess
    uuid: uuid
    alterId: 32
    cipher: auto
    network: grpc
    tls: true
    # fingerprint: xxxx
    servername: example.com
    # skip-cert-verify: true
    grpc-opts:
      grpc-service-name: "example"
    # ip-version: ipv4

  # vless
  - name: "vless-tcp"
    type: vless
    server: server
    port: 443
    uuid: uuid
    network: tcp
    servername: example.com # AKA SNI
    # flow: xtls-rprx-direct # xtls-rprx-origin  # enable XTLS
    # skip-cert-verify: true
    # fingerprint: xxxx
    # client-fingerprint: random # Available: "chrome","firefox","safari","random","none"

  - name: "vless-vision"
    type: vless
    server: server
    port: 443
    uuid: uuid
    network: tcp
    tls: true
    udp: true
    flow: xtls-rprx-vision
    client-fingerprint: chrome
    # fingerprint: xxxx
    # skip-cert-verify: true

  - name: "vless-reality-vision"
    type: vless
    server: server
    port: 443
    uuid: uuid
    network: tcp
    tls: true
    udp: true
    flow: xtls-rprx-vision
    servername: www.microsoft.com # REALITY servername
    reality-opts:
      public-key: xxx
      short-id: xxx # optional
    client-fingerprint: chrome # cannot be empty

  - name: "vless-reality-grpc"
    type: vless
    server: server
    port: 443
    uuid: uuid
    network: grpc
    tls: true
    udp: true
    flow:
    # skip-cert-verify: true
    client-fingerprint: chrome
    servername: testingcf.jsdelivr.net
    grpc-opts:
      grpc-service-name: "grpc"
    reality-opts:
      public-key: CrrQSjAG_YkHLwvM2M-7XkKJilgL5upBKCp0od0tLhE
      short-id: 10f897e26c4b9478

  - name: "vless-ws"
    type: vless
    server: server
    port: 443
    uuid: uuid
    udp: true
    tls: true
    network: ws
    # client-fingerprint: random # Available: "chrome","firefox","safari","random","none"
    servername: example.com # priority over wss host
    # skip-cert-verify: true
    # fingerprint: xxxx
    ws-opts:
      path: "/"
      headers:
        Host: example.com
      # v2ray-http-upgrade: false

  # Trojan
  - name: "trojan"
    type: trojan
    server: server
    port: 443
    password: yourpsk
    # client-fingerprint: random # Available: "chrome","firefox","safari","random","none"
    # fingerprint: xxxx
    # udp: true
    # sni: example.com # aka server name
    # alpn:
    #   - h2
    #   - http/1.1
    # skip-cert-verify: true

  - name: trojan-grpc
    server: server
    port: 443
    type: trojan
    password: "example"
    network: grpc
    sni: example.com
    # skip-cert-verify: true
    # fingerprint: xxxx
    udp: true
    grpc-opts:
      grpc-service-name: "example"

  - name: trojan-ws
    server: server
    port: 443
    type: trojan
    password: "example"
    network: ws
    sni: example.com
    # skip-cert-verify: true
    # fingerprint: xxxx
    udp: true
    # ws-opts:
    #   path: /path
    #   headers:
    #     Host: example.com
    #   v2ray-http-upgrade: false

  - name: "trojan-xtls"
    type: trojan
    server: server
    port: 443
    password: yourpsk
    flow: "xtls-rprx-direct" # xtls-rprx-origin xtls-rprx-direct
    flow-show: true
    # udp: true
    # sni: example.com # aka server name
    # skip-cert-verify: true
    # fingerprint: xxxx

  #hysteria
  - name: "hysteria"
    type: hysteria
    server: server.com
    port: 443
    # ports: 1000,2000-3000,5000 # port 不可省略
    auth-str: yourpassword
    # obfs: obfs_str
    # alpn:
    #   - h3
    protocol: udp # 支持 udp/wechat-video/faketcp
    up: "30 Mbps" # 若不写单位，默认为 Mbps
    down: "200 Mbps" # 若不写单位，默认为 Mbps
    # sni: server.com
    # skip-cert-verify: false
    # recv-window-conn: 12582912
    # recv-window: 52428800
    # ca: "./my.ca"
    # ca-str: "xyz"
    # disable-mtu-discovery: false
    # fingerprint: xxxx
    # fast-open: true # 支持 TCP 快速打开，默认为 false

  #hysteria2
  - name: "hysteria2"
    type: hysteria2
    server: server.com
    port: 443
    #  up和down均不写或为0则使用BBR流控
    # up: "30 Mbps" # 若不写单位，默认为 Mbps
    # down: "200 Mbps" # 若不写单位，默认为 Mbps
    password: yourpassword
    # obfs: salamander # 默认为空，如果填写则开启obfs，目前仅支持salamander
    # obfs-password: yourpassword
    # sni: server.com
    # skip-cert-verify: false
    # fingerprint: xxxx
    # alpn:
    #   - h3
    # ca: "./my.ca"
    # ca-str: "xyz"

  # wireguard
  - name: "wg"
    type: wireguard
    server: 162.159.192.1
    port: 2480
    ip: 172.16.0.2
    ipv6: fd01:5ca1:ab1e:80fa:ab85:6eea:213f:f4a5
    public-key: Cr8hWlKvtDt7nrvf+f0brNQQzabAqrjfBvas9pmowjo=
    #    pre-shared-key: 31aIhAPwktDGpH4JDhA8GNvjFXEf/a6+UaQRyOAiyfM=
    private-key: eCtXsJZ27+4PbhDkHnB923tkUn2Gj59wZw5wFA75MnU=
    udp: true
    reserved: "U4An"
    # 数组格式也是合法的
    # reserved: [209,98,59]
    # 一个出站代理的标识。当值不为空时，将使用指定的 proxy 发出连接
    # dialer-proxy: "ss1"
    # remote-dns-resolve: true # 强制dns远程解析，默认值为false
    # dns: [ 1.1.1.1, 8.8.8.8 ] # 仅在remote-dns-resolve为true时生效
    # 如果peers不为空，该段落中的allowed-ips不可为空；前面段落的server,port,ip,ipv6,public-key,pre-shared-key均会被忽略，但private-key会被保留且只能在顶层指定
    # peers:
    #   - server: 162.159.192.1
    #     port: 2480
    #     ip: 172.16.0.2
    #     ipv6: fd01:5ca1:ab1e:80fa:ab85:6eea:213f:f4a5
    #     public-key: Cr8hWlKvtDt7nrvf+f0brNQQzabAqrjfBvas9pmowjo=
    #     # pre-shared-key: 31aIhAPwktDGpH4JDhA8GNvjFXEf/a6+UaQRyOAiyfM=
    #     allowed-ips: ['0.0.0.0/0']
    #     reserved: [209,98,59]

  # tuic
  - name: tuic
    server: www.example.com
    port: 10443
    type: tuic
    # tuicV4必须填写token （不可同时填写uuid和password）
    token: TOKEN
    # tuicV5必须填写uuid和password（不可同时填写token）
    uuid: 00000000-0000-0000-0000-000000000001
    password: PASSWORD_1
    # ip: 127.0.0.1 # for overwriting the DNS lookup result of the server address set in option 'server'
    # heartbeat-interval: 10000
    # alpn: [h3]
    disable-sni: true
    reduce-rtt: true
    request-timeout: 8000
    udp-relay-mode: native # Available: "native", "quic". Default: "native"
    # congestion-controller: bbr # Available: "cubic", "new_reno", "bbr". Default: "cubic"
    # cwnd: 10 # default: 32
    # max-udp-relay-packet-size: 1500
    # fast-open: true
    # skip-cert-verify: true
    # max-open-streams: 20 # default 100, too many open streams may hurt performance
    # sni: example.com
    #
    # meta和sing-box私有扩展，将ss-uot用于udp中继，开启此选项后udp-relay-mode将失效
    # 警告，与原版tuic不兼容！！！
    # udp-over-stream: false
    # udp-over-stream-version: 1

  # ShadowsocksR
  # The supported ciphers (encryption methods): all stream ciphers in ss
  # The supported obfses:
  #   plain http_simple http_post
  #   random_head tls1.2_ticket_auth tls1.2_ticket_fastauth
  # The supported protocols:
  #   origin auth_sha1_v4 auth_aes128_md5
  #   auth_aes128_sha1 auth_chain_a auth_chain_b
  - name: "ssr"
    type: ssr
    server: server
    port: 443
    cipher: chacha20-ietf
    password: "password"
    obfs: tls1.2_ticket_auth
    protocol: auth_sha1_v4
    # obfs-param: domain.tld
    # protocol-param: "#"
    # udp: true

proxy-groups:
  # 代理链，目前relay可以支持udp的只有vmess/vless/trojan/ss/ssr/tuic
  # wireguard目前不支持在relay中使用，请使用proxy中的dialer-proxy配置项
  # Traffic: mihomo <-> http <-> vmess <-> ss1 <-> ss2 <-> Internet
  - name: "relay"
    type: relay
    proxies:
      - http
      - vmess
      - ss1
      - ss2

  # url-test 将按照 url 测试结果使用延迟最低节点
  - name: "auto"
    type: url-test
    proxies:
      - ss1
      - ss2
      - vmess1
    # tolerance: 150
    # lazy: true
    # expected-status: 204 # 当健康检查返回状态码与期望值不符时，认为节点不可用
    url: "https://cp.cloudflare.com/generate_204"
    interval: 300

  # fallback 将按照 url 测试结果按照节点顺序选择
  - name: "fallback-auto"
    type: fallback
    proxies:
      - ss1
      - ss2
      - vmess1
    url: "https://cp.cloudflare.com/generate_204"
    interval: 300

  # load-balance 将按照算法随机选择节点
  - name: "load-balance"
    type: load-balance
    proxies:
      - ss1
      - ss2
      - vmess1
    url: "https://cp.cloudflare.com/generate_204"
    interval: 300
  # strategy: consistent-hashing # 可选 round-robin 和 sticky-sessions

  # select 用户自行选择节点
  - name: Proxy
    type: select
    # disable-udp: true
    proxies:
      - ss1
      - ss2
      - vmess1
      - auto

  # 配置指定 interface-name 和 fwmark 的 DIRECT
  - name: en1
    type: select
    interface-name: en1
    routing-mark: 6667
    proxies:
      - DIRECT

  - name: UseProvider
    type: select
    filter: "HK|TW" # 正则表达式，过滤 provider1 中节点名包含 HK 或 TW
    use:
      - provider1
    proxies:
      - Proxy
      - DIRECT

# Mihomo 格式的节点或支持 *ray 的分享格式
proxy-providers:
  provider1:
    type: http # http 的 path 可空置,默认储存路径为 homedir的proxies文件夹,文件名为url的md5
    url: "url"
    interval: 3600
    path: ./provider1.yaml # 默认只允许存储在 mihomo 的 Home Dir，如果想存储到任意位置，添加环境变量 SKIP_SAFE_PATH_CHECK=1
    health-check:
      enable: true
      interval: 600
      # lazy: true
      url: https://cp.cloudflare.com/generate_204
      # expected-status: 204 # 当健康检查返回状态码与期望值不符时，认为节点不可用
    override: # 覆写节点加载时的一些配置项
      skip-cert-verify: true
      udp: true
      # down: "50 Mbps"
      # up: "10 Mbps"
      # dialer-proxy: proxy
      # interface-name: tailscale0
      # routing-mark: 233
      # ip-version: ipv4-prefer
  test:
    type: file
    path: /test.yaml
    health-check:
      enable: true
      interval: 36000
      url: https://cp.cloudflare.com/generate_204
rule-providers:
  rule1:
    behavior: classical # domain ipcidr
    interval: 259200
    path: /path/to/save/file.yaml # 默认只允许存储在 mihomo 的 Home Dir，如果想存储到任意位置，添加环境变量 SKIP_SAFE_PATH_CHECK=1
    type: http # http 的 path 可空置,默认储存路径为 homedir的rules文件夹,文件名为url的md5
    url: "url"
  rule2:
    behavior: classical
    interval: 259200
    path: /path/to/save/file.yaml
    type: file
rules:
  - RULE-SET,rule1,REJECT
  - DOMAIN-SUFFIX,baidu.com,DIRECT
  - DOMAIN-KEYWORD,google,ss1
  - IP-CIDR,1.1.1.1/32,ss1
  - IP-CIDR6,2409::/64,DIRECT
  # 当满足条件是 TCP 或 UDP 流量时，使用名为 sub-rule-name1 的规则集
  - SUB-RULE,(OR,((NETWORK,TCP),(NETWORK,UDP))),sub-rule-name1
  - SUB-RULE,(AND,((NETWORK,UDP))),sub-rule-name2
# 定义多个子规则集，规则将以分叉匹配，使用 SUB-RULE 使用
#                                               google.com(not match)--> baidu.com(match)
#                                                /                                ｜
#                                               /                                 ｜
#  https://baidu.com  --> rule1 --> rule2 --> sub-rule-name1(match tcp)          使用 DIRECT
#
#
#                                              google.com(not match)--> baidu.com(not match)
#                                                /                            ｜
#                                               /                             ｜
#  dns 1.1.1.1  --> rule1 --> rule2 --> sub-rule-name1(match udp)         sub-rule-name2(match udp)
#                                                                             ｜
#                                                                             ｜
#                                                                 使用 REJECT <-- 1.1.1.1/32(match)
#

sub-rules:
  sub-rule-name1:
    - DOMAIN,google.com,ss1
    - DOMAIN,baidu.com,DIRECT
  sub-rule-name2:
    - IP-CIDR,1.1.1.1/32,REJECT
    - IP-CIDR,8.8.8.8/32,ss1
    - DOMAIN,dns.alidns.com,REJECT

# 流量入站
listeners:
  - name: socks5-in-1
    type: socks
    port: 10808
    #listen: 0.0.0.0 # 默认监听 0.0.0.0
    # rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules
    # proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理
    # udp: false # 默认 true

  - name: http-in-1
    type: http
    port: 10809
    listen: 0.0.0.0
    # rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules
    # proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)

  - name: mixed-in-1
    type: mixed #  HTTP(S) 和 SOCKS 代理混合
    port: 10810
    listen: 0.0.0.0
    # rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules
    # proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)
    # udp: false # 默认 true

  - name: reidr-in-1
    type: redir
    port: 10811
    listen: 0.0.0.0
    # rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules
    # proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)

  - name: tproxy-in-1
    type: tproxy
    port: 10812
    listen: 0.0.0.0
    # rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules
    # proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)
    # udp: false # 默认 true

  - name: shadowsocks-in-1
    type: shadowsocks
    port: 10813
    listen: 0.0.0.0
    # rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules
    # proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)
    password: vlmpIPSyHH6f4S8WVPdRIHIlzmB+GIRfoH3aNJ/t9Gg=
    cipher: 2022-blake3-aes-256-gcm

  - name: vmess-in-1
    type: vmess
    port: 10814
    listen: 0.0.0.0
    # rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules
    # proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)
    users:
      - username: 1
        uuid: 9d0cb9d0-964f-4ef6-897d-6c6b3ccf9e68
        alterId: 1
    # ws-path: "/" # 如果不为空则开启websocket传输层
    # 下面两项如果填写则开启tls（需要同时填写）
    # certificate: ./server.crt
    # private-key: ./server.key

  - name: tuic-in-1
    type: tuic
    port: 10815
    listen: 0.0.0.0
    # rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules
    # proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)
    # token:    # tuicV4填写（可以同时填写users）
    #   - TOKEN
    # users:    # tuicV5填写（可以同时填写token）
    #   00000000-0000-0000-0000-000000000000: PASSWORD_0
    #   00000000-0000-0000-0000-000000000001: PASSWORD_1
    #  certificate: ./server.crt
    #  private-key: ./server.key
    #  congestion-controller: bbr
    #  max-idle-time: 15000
    #  authentication-timeout: 1000
    #  alpn:
    #    - h3
    #  max-udp-relay-packet-size: 1500

  - name: tunnel-in-1
    type: tunnel
    port: 10816
    listen: 0.0.0.0
    # rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules
    # proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)
    network: [tcp, udp]
    target: target.com

  - name: tun-in-1
    type: tun
    # rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules
    # proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)
    stack: system # gvisor / mixed
    dns-hijack:
    - 0.0.0.0:53 # 需要劫持的 DNS
    # auto-detect-interface: false # 自动识别出口网卡
    # auto-route: false # 配置路由表
    # mtu: 9000 # 最大传输单元
    inet4-address: # 必须手动设置ipv4地址段
    - 198.19.0.1/30
    inet6-address: # 必须手动设置ipv6地址段
    - "fdfe:dcba:9877::1/126"
    # strict-route: true # 将所有连接路由到tun来防止泄漏，但你的设备将无法其他设备被访问
    # inet4-route-address: # 启用 auto-route 时使用自定义路由而不是默认路由
    # - 0.0.0.0/1
    # - 128.0.0.0/1
    # inet6-route-address: # 启用 auto-route 时使用自定义路由而不是默认路由
    # - "::/1"
    # - "8000::/1"
    # endpoint-independent-nat: false # 启用独立于端点的 NAT
    # include-uid: # UID 规则仅在 Linux 下被支持，并且需要 auto-route
    # - 0
    # include-uid-range: # 限制被路由的的用户范围
    # - 1000:99999
    # exclude-uid: # 排除路由的的用户
    # - 1000
    # exclude-uid-range: # 排除路由的的用户范围
    # - 1000:99999

    # Android 用户和应用规则仅在 Android 下被支持
    # 并且需要 auto-route

    # include-android-user: # 限制被路由的 Android 用户
    # - 0
    # - 10
    # include-package: # 限制被路由的 Android 应用包名
    # - com.android.chrome
    # exclude-package: # 排除被路由的 Android 应用包名
    # - com.android.captiveportallogin
# 入口配置与 Listener 等价，传入流量将和 socks,mixed 等入口一样按照 mode 所指定的方式进行匹配处理
# shadowsocks,vmess 入口配置（传入流量将和socks,mixed等入口一样按照mode所指定的方式进行匹配处理）
# ss-config: ss://2022-blake3-aes-256-gcm:vlmpIPSyHH6f4S8WVPdRIHIlzmB+GIRfoH3aNJ/t9Gg=@:23456
# vmess-config: vmess://1:9d0cb9d0-964f-4ef6-897d-6c6b3ccf9e68@:12345

# tuic服务器入口（传入流量将和socks,mixed等入口一样按照mode所指定的方式进行匹配处理）
# tuic-server:
#  enable: true
#  listen: 127.0.0.1:10443
#  token:    # tuicV4填写（可以同时填写users）
#    - TOKEN
#  users:    # tuicV5填写（可以同时填写token）
#    00000000-0000-0000-0000-000000000000: PASSWORD_0
#    00000000-0000-0000-0000-000000000001: PASSWORD_1
#  certificate: ./server.crt
#  private-key: ./server.key
#  congestion-controller: bbr
#  max-idle-time: 15000
#  authentication-timeout: 1000
#  alpn:
#    - h3
#  max-udp-relay-packet-size: 1500
```
## 旧版配置文件示例
```yaml
# HTTP(S) 代理服务端口
# port: 7890

# SOCKS5 代理服务端口
# socks-port: 7891

# Linux 和 macOS 的透明代理服务端口 (TCP 和 TProxy UDP 重定向)
# redir-port: 7892

# Linux 的透明代理服务端口 (TProxy TCP 和 TProxy UDP)
# tproxy-port: 7893

# HTTP(S) 和 SOCKS4(A)/SOCKS5 代理服务共用一个端口
mixed-port: 7890

# 本地 SOCKS5/HTTP(S) 代理服务的认证
# authentication:
#  - "user1:pass1"
#  - "user2:pass2"

# 设置为 true 以允许来自其他 LAN IP 地址的连接
allow-lan: true

# 仅当 `allow-lan` 为 `true` 时有效
# '*': 绑定所有 IP 地址
# 192.168.122.11: 绑定单个 IPv4 地址
# "[aaaa::a8aa:ff:fe09:57d8]": 绑定单个 IPv6 地址
# bind-address: '*'

# Clash 路由工作模式
# rule: 基于规则的数据包路由
# global: 所有数据包将被转发到单个节点
# direct: 直接将数据包转发到互联网
mode: rule

# 默认情况下, Clash 将日志打印到 STDOUT
# 日志级别: info / warning / error / debug / silent
log-level: info

# 当设置为 false 时, 解析器不会将主机名解析为 IPv6 地址
ipv6: true

# RESTful Web API 监听地址
external-controller: 0.0.0.0:9090

# 配置目录的相对路径或静态 Web 资源目录的绝对路径. Clash core 将在
# `http://{{external-controller}}/ui` 中提供服务.
# 解压 clash-yacd-gh-pages.zip 并配置静态文件目录
# external-ui: folder

# RESTful API 密钥 (可选)
# 通过指定 HTTP 头 `Authorization: Bearer ${secret}` 进行身份验证
# 如果RESTful API在 0.0.0.0 上监听, 务必设置一个 secret 密钥.
# secret: ""

# 出站接口名称
# interface-name: en0

# fwmark (仅在 Linux 上有效)
# routing-mark: 6666

# 用于DNS服务器和连接建立的静态主机 (如/etc/hosts) .
#
# 支持通配符主机名 (例如 *.clash.dev, *.foo.*.example.com)
# 非通配符域名优先级高于通配符域名
# 例如 foo.example.com > *.example.com > .example.com
# P.S. +.foo.com 等于 .foo.com 和 foo.com
# hosts:
  # '*.clash.dev': 127.0.0.1
  # '.dev': 127.0.0.1
  # 'alpha.clash.dev': '::1'

# profile:
  # 将 `select` 手动选择 结果存储在 $HOME/.config/clash/.cache 中
  # 如果不需要此行为, 请设置为 false
  # 当两个不同的配置具有同名的组时, 将共享所选值
  # store-selected: true

  # 持久化 fakeip
  # store-fake-ip: false

# DNS 服务设置
# 此部分是可选的. 当不存在时, DNS 服务将被禁用.
dns:
  enable: false
  listen: 0.0.0.0:53
  # ipv6: false # 当为 false 时, AAAA 查询的响应将为空

  # 这些 名称服务器(nameservers) 用于解析下列 DNS 名称服务器主机名.
  # 仅指定 IP 地址
  default-nameserver:
    - 114.114.114.114
    - 8.8.8.8
  # enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16 # Fake IP 地址池 CIDR
  # use-hosts: true # 查找 hosts 并返回 IP 记录

  # search-domains: [local] # A/AAAA 记录的搜索域

  # 此列表中的主机名将不会使用 Fake IP 解析
  # 即, 对这些域名的请求将始终使用其真实 IP 地址进行响应
  # fake-ip-filter:
  #   - '*.lan'
  #   - localhost.ptlogin2.qq.com

  # 支持 UDP、TCP、DoT、DoH. 您可以指定要连接的端口.
  # 所有 DNS 查询都直接发送到名称服务器, 无需代理
  # Clash 使用第一个收到的响应作为 DNS 查询的结果.
  nameserver:
    - 114.114.114.114 # 默认值
    - 8.8.8.8 # 默认值
    - tls://dns.rubyfish.cn:853 # DNS over TLS
    - https://1.1.1.1/dns-query # DNS over HTTPS
    - dhcp://en0 # 来自 dhcp 的 dns
    # - '8.8.8.8#en0'

  # 当 `fallback` 存在时, DNS 服务器将向此部分中的服务器
  # 与 `nameservers` 中的服务器发送并发请求
  # 当 GEOIP 国家不是 `CN` 时, 将使用 fallback 服务器的响应
  # fallback:
  #   - tcp://1.1.1.1
  #   - 'tcp://1.1.1.1#en0'

  # 如果使用 `nameservers` 解析的 IP 地址在下面指定的子网中,
  # 则认为它们无效, 并使用 `fallback` 服务器的结果.
  #
  # 当 `fallback-filter.geoip` 为 true 且 IP 地址的 GEOIP 为 `CN` 时,
  # 将使用 `nameservers` 服务器解析的 IP 地址.
  #
  # 如果 `fallback-filter.geoip` 为 false, 且不匹配 `fallback-filter.ipcidr`,
  # 则始终使用 `nameservers` 服务器的结果
  #
  # 这是对抗 DNS 污染攻击的一种措施.
  # fallback-filter:
  #   geoip: true
  #   geoip-code: CN
  #   ipcidr:
  #     - 240.0.0.0/4
  #   domain:
  #     - '+.google.com'
  #     - '+.facebook.com'
  #     - '+.youtube.com'

  # 通过特定的名称服务器查找域名
  # nameserver-policy:
  #   'www.baidu.com': '114.114.114.114'
  #   '+.internal.crop.com': '10.0.0.1'

# proxies:
#   # Shadowsocks
#   # 支持的加密方法:
#   #   aes-128-gcm aes-192-gcm aes-256-gcm
#   #   aes-128-cfb aes-192-cfb aes-256-cfb
#   #   aes-128-ctr aes-192-ctr aes-256-ctr
#   #   rc4-md5 chacha20-ietf xchacha20
#   #   chacha20-ietf-poly1305 xchacha20-ietf-poly1305
#   - name: "ss1"
#     type: ss
#     server: server
#     port: 443
#     cipher: chacha20-ietf-poly1305
#     password: "password"
#     # udp: true

#   - name: "ss2"
#     type: ss
#     server: server
#     port: 443
#     cipher: chacha20-ietf-poly1305
#     password: "password"
#     plugin: obfs
#     plugin-opts:
#       mode: tls # or http
#       # host: bing.com

#   - name: "ss3"
#     type: ss
#     server: server
#     port: 443
#     cipher: chacha20-ietf-poly1305
#     password: "password"
#     plugin: v2ray-plugin
#     plugin-opts:
#       mode: websocket # 暂不支持 QUIC
#       # tls: true # wss
#       # skip-cert-verify: true
#       # host: bing.com
#       # path: "/"
#       # mux: true
#       # headers:
#       #   custom: value

#   # vmess
#   # 支持的加密方法:
#   #  auto/aes-128-gcm/chacha20-poly1305/none
#   - name: "vmess"
#     type: vmess
#     server: server
#     port: 443
#     uuid: uuid
#     alterId: 32
#     cipher: auto
#     # udp: true
#     # tls: true
#     # skip-cert-verify: true
#     # servername: example.com # 优先于 wss 主机
#     # network: ws
#     # ws-opts:
#     #   path: /path
#     #   headers:
#     #     Host: v2ray.com
#     #   max-early-data: 2048
#     #   early-data-header-name: Sec-WebSocket-Protocol

#   - name: "vmess-h2"
#     type: vmess
#     server: server
#     port: 443
#     uuid: uuid
#     alterId: 32
#     cipher: auto
#     network: h2
#     tls: true
#     h2-opts:
#       host:
#         - http.example.com
#         - http-alt.example.com
#       path: /

#   - name: "vmess-http"
#     type: vmess
#     server: server
#     port: 443
#     uuid: uuid
#     alterId: 32
#     cipher: auto
#     # udp: true
#     # network: http
#     # http-opts:
#     #   # method: "GET"
#     #   # path:
#     #   #   - '/'
#     #   #   - '/video'
#     #   # headers:
#     #   #   Connection:
#     #   #     - keep-alive

#   - name: vmess-grpc
#     server: server
#     port: 443
#     type: vmess
#     uuid: uuid
#     alterId: 32
#     cipher: auto
#     network: grpc
#     tls: true
#     servername: example.com
#     # skip-cert-verify: true
#     grpc-opts:
#       grpc-service-name: "example"

#   # socks5
#   - name: "socks"
#     type: socks5
#     server: server
#     port: 443
#     # username: username
#     # password: password
#     # tls: true
#     # skip-cert-verify: true
#     # udp: true

#   # http
#   - name: "http"
#     type: http
#     server: server
#     port: 443
#     # username: username
#     # password: password
#     # tls: true # https
#     # skip-cert-verify: true
#     # sni: custom.com

#   # Snell
#   # 请注意, 目前还没有UDP支持.
#   - name: "snell"
#     type: snell
#     server: server
#     port: 44046
#     psk: yourpsk
#     # version: 2
#     # obfs-opts:
#       # mode: http # or tls
#       # host: bing.com

#   # Trojan
#   - name: "trojan"
#     type: trojan
#     server: server
#     port: 443
#     password: yourpsk
#     # udp: true
#     # sni: example.com # aka 服务器名称
#     # alpn:
#     #   - h2
#     #   - http/1.1
#     # skip-cert-verify: true

#   - name: trojan-grpc
#     server: server
#     port: 443
#     type: trojan
#     password: "example"
#     network: grpc
#     sni: example.com
#     # skip-cert-verify: true
#     udp: true
#     grpc-opts:
#       grpc-service-name: "example"

#   - name: trojan-ws
#     server: server
#     port: 443
#     type: trojan
#     password: "example"
#     network: ws
#     sni: example.com
#     # skip-cert-verify: true
#     udp: true
#     # ws-opts:
#       # path: /path
#       # headers:
#       #   Host: example.com

#   # ShadowsocksR
#   # 支持的加密方法: ss 中的所有流加密方法
#   # 支持的混淆方式:
#   #   plain http_simple http_post
#   #   random_head tls1.2_ticket_auth tls1.2_ticket_fastauth
#   # 支持的协议:
#   #   origin auth_sha1_v4 auth_aes128_md5
#   #   auth_aes128_sha1 auth_chain_a auth_chain_b
#   - name: "ssr"
#     type: ssr
#     server: server
#     port: 443
#     cipher: chacha20-ietf
#     password: "password"
#     obfs: tls1.2_ticket_auth
#     protocol: auth_sha1_v4
#     # obfs-param: domain.tld
#     # protocol-param: "#"
#     # udp: true

proxy-groups:
  # 中继链路代理节点. 节点不应包含中继. 不支持 UDP.
  # 流量节点链路: clash <-> http <-> vmess <-> ss1 <-> ss2 <-> Internet
  # - name: "relay"
  #   type: relay
  #   proxies:
  #     - http
  #     - vmess
  #     - ss1
  #     - ss2

  # url-test 通过对 指定URL 进行基准速度测试来选择将使用哪个代理.
  - name: "auto"
    type: url-test
    use:
      - provider1
    # proxies:
    #   - ss1
    #   - ss2
    #   - vmess1
    # tolerance: 150
    # lazy: true
    url: 'http://www.gstatic.com/generate_204'
    interval: 300

  # fallback-auto 基于优先级选择可用策略. 可用性通过访问 指定URL 来测试, 就像自动 url-test 组一样.
  # - name: "fallback-auto"
  #   type: fallback
  #   proxies:
  #     - ss1
  #     - ss2
  #     - vmess1
  #   url: 'http://www.gstatic.com/generate_204'
  #   interval: 300

  # 负载均衡: 同一 eTLD+1 的请求将拨号到同一代理.
  # - name: "load-balance"
  #   type: load-balance
  #   proxies:
  #     - ss1
  #     - ss2
  #     - vmess1
  #   url: 'http://www.gstatic.com/generate_204'
  #   interval: 300
    # strategy: consistent-hashing # or round-robin

  # select 手动选择, 用于选择代理或策略组
  # 您可以使用 RESTful API 来切换代理, 建议在GUI中切换.
  # - name: Proxy
  #   type: select
    # disable-udp: true
    # filter: 'someregex'
    # proxies:
    #   - ss1
    #   - ss2
    #   - vmess1
    #   - auto

  # 直接连接到另一个接口名称或fwmark
  # - name: en1
  #   type: select
  #   interface-name: en1
  #   routing-mark: 6667
  #   proxies:
  #     - DIRECT

  # 直接连接到另一个代理提供者
  - name: UseProvider
    type: select
    use:
      - provider1
    # proxies:
    #   - Proxy
    #   - DIRECT

proxy-providers:
  provider1:
    type: http
    url: "url"
    interval: 3600
    path: ./provider1.yaml
    health-check:
      enable: true
      interval: 600
      # lazy: true
      url: http://www.gstatic.com/generate_204
  # test:
  #   type: file
  #   path: /test.yaml
  #   health-check:
  #     enable: true
  #     interval: 36000
  #     url: http://www.gstatic.com/generate_204

# tunnels:
  # 单行配置
  # - tcp/udp,127.0.0.1:6553,114.114.114.114:53,proxy
  # - tcp,127.0.0.1:6666,rds.mysql.com:3306,vpn
  # 全 yaml 配置
  # - network: [tcp, udp]
  #   address: 127.0.0.1:7777
  #   target: target.com
  #   proxy: proxy

rules:
  - DOMAIN-SUFFIX,google.com,auto
  - DOMAIN-KEYWORD,google,auto
  - DOMAIN,google.com,auto
  - DOMAIN-SUFFIX,ad.com,REJECT
  - SRC-IP-CIDR,192.168.1.201/32,DIRECT
  # 用于 IP 规则 (GEOIP, IP-CIDR, IP-CIDR6) 的可选参数 "no-resolve"
  - IP-CIDR,127.0.0.0/8,DIRECT
  - GEOIP,CN,DIRECT
  - DST-PORT,80,DIRECT
  - SRC-PORT,7777,DIRECT
  - RULE-SET,apple,REJECT # 仅 Premium 版本支持
  - MATCH,auto
```
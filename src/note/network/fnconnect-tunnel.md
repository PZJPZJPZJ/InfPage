# 基于 fn connect + 3x-ui + mihomo 的完整隧道搭建教程

> 适用目标：
>
> 1. 借用飞牛 `fn connect` 的现成远程访问链路，把 Xray 流量从外网带回家
> 2. 在 3x-ui 上搭建 VLESS/VMess over WebSocket
> 3. 用 mihomo 作为客户端接入
> 4. 通过该隧道访问远端局域网
> 5. 让接入 xui 的客户端继续借服务器上的 mihomo 代理网络

---

## 1. 原理概览

这套玩法的核心不是传统端口映射，而是**复用飞牛系统已有的 `/chromium/` 反向代理入口**。

飞牛帖子中展示了系统自带的 `trim_chromium.conf`，其关键点如下：

- 路径前缀：`/chromium/`
- 反向代理目标：`http://127.0.0.1:3000`
- 启用了 WebSocket 升级相关头
- 转发前会把 `Cookie` 清空
- 客户端外层请求需要带 `Cookie: mode=relay;` 才能通过 `fn connect` 这一层

也就是说，整体链路是：

```text
客户端 -> fn connect 域名:443 -> 飞牛 trim_nginx -> 127.0.0.1:3000 -> Xray/3x-ui 入站
```

这说明：

1. **后端服务必须监听 3000 端口**
2. **必须走 HTTP/WebSocket 语义**
3. **路径必须以 `/chromium/` 开头**
4. **客户端必须在 WebSocket 握手时带 `Cookie: mode=relay;`**
5. **后端 3000 这一跳通常不需要再开 TLS**

---

## 2. 为什么不局限于原帖里的 Shadowsocks

原帖示例使用的是 `shadowsocks + ws`，但本质上可复用的并不是 Shadowsocks 本身，而是：

- 飞牛提供了 `/chromium/ -> 127.0.0.1:3000` 的 HTTP/WS 入口
- Xray 支持多种入站协议
- WebSocket 传输支持自定义 `headers`

因此，只要协议能跑在 **WebSocket** 上，并且客户端支持自定义 WS 请求头，就不必限制为 Shadowsocks。

**可行：**

- VLESS + WS
- VMess + WS
- Shadowsocks + WS

**不建议按本教程思路做：**

- VLESS-REALITY
- VLESS-Vision
- 纯 TCP
- 不走 `/chromium/` 的其他四层协议

原因很简单：这套玩法依赖的是**反向代理 + WebSocket 升级**，不是原始四层穿透。

---

## 3. 环境要求

建议准备：

- 一台飞牛 NAS，已启用 `fn connect`
- 未安装飞牛“浏览器”应用，或者确认 `3000` 端口可被你自己的服务占用
- 3x-ui（宿主机安装或 Docker 均可）
- 客户端使用 mihomo / Meta 系客户端
- 可选：服务器端额外安装 mihomo，用于给接入客户端二次出站到代理节点

---

## 4. 关键原理细节

### 4.1 为什么必须是 3000 端口

因为飞牛系统内置的 `/chromium/` 反代目标就是：

```nginx
proxy_pass http://127.0.0.1:3000;
```

所以你后端的 Xray/3x-ui 入站必须落在 `3000`。

### 4.2 为什么路径必须以 `/chromium/` 开头

因为反代 location 是：

```nginx
location ^~ /chromium/ { ... }
```

不匹配这个前缀，就不会走这条代理链路。

### 4.3 为什么客户端必须带 `Cookie: mode=relay;`

这是帖子验证出来的关键条件。你可以把它理解成：

- 它是进入 `fn connect` 中继的一张“通行证”
- 不是后端 Xray 自己的鉴权手段
- nginx 在转发到本地 `3000` 之前会清空 Cookie，所以这个字段主要作用在外层 `fn connect`

### 4.4 为什么后端 3000 不建议再开 TLS

因为外部已经是：

```text
客户端 -> fn connect 域名:443 -> TLS
```

到了飞牛本机后，`trim_nginx` 再转发给 `127.0.0.1:3000`，这一跳按帖子结构是普通 `http/ws`，不是 `https/wss`。

所以在 3x-ui 的 `3000` 这条入站上：

- 不要开 TLS
- 不要开 REALITY
- 不要开 Vision

---

## 5. 在 3x-ui 中搭建 VLESS + WS

这是最推荐的组合。

### 5.1 推荐的 3x-ui 入站参数

- 协议：`VLESS`
- 端口：`3000`
- 监听：
  - 裸机安装：建议 `127.0.0.1`
  - Docker 安装：容器映射 `3000:3000`，监听可为 `0.0.0.0`
- 传输：`ws`
- Path：`/chromium/xui`
- TLS：关闭
- REALITY：关闭
- flow：留空
- UUID：自行生成

### 5.2 为什么推荐 VLESS 而不是 VMess

- VLESS 配置更简洁
- 不依赖时间同步
- 3x-ui / Xray / mihomo 兼容性很好

当然，**VMess 也能用**，只是没有必要优先选它。

---

## 6. 3x-ui 服务端配置思路

### 6.1 逻辑结构

```text
[客户端]
  |
  | TLS + WS + Cookie: mode=relay;
  v
[fn connect 域名:443]
  |
  v
[/chromium/ 反代]
  |
  v
[127.0.0.1:3000 上的 Xray/3x-ui VLESS WS 入站]
  |
  v
[Xray 默认 direct/freedom 出站]
```

### 6.2 3x-ui 中最容易配错的地方

- 把服务端端口写成 `443`，这是错的，应该是 `3000`
- 把服务端入站开 TLS，这通常也是错的
- WS Path 没有以 `/chromium/` 开头
- 客户端没带 `Cookie: mode=relay;`
- 飞牛浏览器应用还占着 `3000`

---

## 7. mihomo 客户端配置：VLESS 版

下面是一份最小可用的 mihomo 配置示例。

将以下占位符替换掉：

- `你的-fnconnect-域名`
- `你的-UUID`
- `你的-WS路径`

```yaml
mixed-port: 7890
allow-lan: true
mode: global
log-level: info

proxies:
  - name: "FN-VLESS-WS"
    type: vless
    server: 你的-fnconnect-域名
    port: 443
    uuid: 你的-UUID
    udp: true
    tls: true
    servername: 你的-fnconnect-域名
    client-fingerprint: chrome
    skip-cert-verify: false
    network: ws
    packet-encoding: xudp
    encryption: ""
    ws-opts:
      path: /chromium/你的-WS路径
      headers:
        Host: 你的-fnconnect-域名
        Cookie: mode=relay;

proxy-groups:
  - name: Proxy
    type: select
    proxies:
      - FN-VLESS-WS

rules:
  - MATCH,Proxy
```

---

## 8. mihomo 客户端配置：VMess 版

如果你在 3x-ui 上建的是 VMess + WS，也可以这样配：

```yaml
mixed-port: 7890
allow-lan: true
mode: global
log-level: info

proxies:
  - name: "FN-VMESS-WS"
    type: vmess
    server: 你的-fnconnect-域名
    port: 443
    uuid: 你的-UUID
    alterId: 0
    cipher: auto
    udp: true
    tls: true
    servername: 你的-fnconnect-域名
    client-fingerprint: chrome
    skip-cert-verify: false
    network: ws
    packet-encoding: packetaddr
    ws-opts:
      path: /chromium/你的-WS路径
      headers:
        Host: 你的-fnconnect-域名
        Cookie: mode=relay;

proxy-groups:
  - name: Proxy
    type: select
    proxies:
      - FN-VMESS-WS

rules:
  - MATCH,Proxy
```

---

## 9. `xudp` 是什么，为什么前面示例里用了它

前面 VLESS 配置示例里用了：

```yaml
udp: true
packet-encoding: xudp
```

它的作用不是“给 TCP 提速”，而是：

- 当这条节点承载 **UDP 流量** 时
- 指定用 Xray 支持的 UDP 包编码方式去传递

### 9.1 它解决的是什么问题

即使你外层是 TLS + WS，节点里仍然可能要代理 UDP，例如：

- DNS
- 游戏
- 语音
- QUIC / HTTP3

这时 `packet-encoding: xudp` 的意思是：

> 这条 VLESS/VMess 节点上的 UDP 数据，按 Xray 支持的方式编码传输。

### 9.2 是否必须开启

不是必须。

- **想先排错、先确保 TCP 能通**：可以先去掉
- **想兼顾 UDP 场景**：建议开启

### 9.3 什么时候体感明显

- 看普通网页：不一定有明显区别
- 用 DNS / QUIC / 游戏 / 语音：更有价值

### 9.4 最保守的排错方式

先用：

```yaml
udp: true
# packet-encoding: xudp
```

连通后再加回 `xudp`。

---

## 10. 连通后如何访问远端局域网

当你成功连接这条隧道后，**理论上 NAS 所在局域网中可达的 IP，也都能成为你的目标地址**。

也就是说：

- 这不只是“访问一个代理服务器”
- 还可以借这台 NAS 所在网络，去访问它所在 LAN 里的设备

例如远端 LAN 为 `192.168.50.0/24`：

- 路由器：`192.168.50.1`
- 3x-ui 面板：`192.168.50.10:2053`
- NAS 其他 Web 服务：`192.168.50.20:8080`

只要 NAS 自己能访问它们，客户端通常也能通过该隧道访问它们。

---

## 11. 访问远端局域网的正确做法

关键不是再改 3x-ui 协议，而是**改 mihomo 的路由规则**，让你访问远端私网地址时也走代理。

### 11.1 最简单的规则方式

如果远端局域网是 `192.168.50.0/24`，加上：

```yaml
rules:
  - IP-CIDR,192.168.50.0/24,Proxy,no-resolve
  - MATCH,Proxy
```

这样你访问：

```text
http://192.168.50.1
http://192.168.50.10:2053
```

就会强制走你的 fnconnect 隧道，而不是在本机局域网里直连。

---

## 12. 为什么有时访问 `192.168.x.x` 还是不通

因为很多 mihomo 配置里会写：

```yaml
- IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
- IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
- IP-CIDR,172.16.0.0/12,DIRECT,no-resolve
```

如果你的规则顺序是这样，那么你访问远端私网时，可能会先匹配到 `DIRECT`，流量就留在本机了。

### 正确写法

把**远端网段走代理**放在更前面：

```yaml
rules:
  - IP-CIDR,192.168.50.0/24,Proxy,no-resolve
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,172.16.0.0/12,DIRECT,no-resolve
  - MATCH,Proxy
```

---

## 13. 更稳的方式：开启 mihomo TUN

如果你希望不是只靠浏览器代理，而是让整台电脑更自然地访问远端局域网，建议开 TUN。

示例：

```yaml
tun:
  enable: true
  stack: mixed
  auto-route: true
  auto-detect-interface: true
  strict-route: true
  dns-hijack:
    - any:53
```

然后再配远端网段规则：

```yaml
rules:
  - IP-CIDR,192.168.50.0/24,Proxy,no-resolve
  - MATCH,Proxy
```

### 13.1 这样做的好处

- 直接访问 IP 更自然
- 更多程序会自动走代理
- 对 RDP、SSH、SMB 之类更友好
- 更适合“把远端 LAN 当成本地延伸网段”

---

## 14. 访问远端局域网时的常见坑

### 14.1 本地网段和远端网段重复

如果你本地是：

```text
192.168.1.0/24
```

远端也是：

```text
192.168.1.0/24
```

那你访问 `192.168.1.10` 时，系统根本无法优雅区分你想访问本地还是远端。

**最佳解决方法：**

- 修改远端 LAN 为不冲突网段，例如：
  - `192.168.50.0/24`
  - `10.50.0.0/24`

### 14.2 广播/组播发现不一定能穿过去

例如：

- `nas.local`
- Windows 网络发现
- mDNS / Bonjour
- SMB 广播发现

这类往往依赖广播或组播，不如直接访问目标 IP 稳定。

**建议：**

- 优先使用 `IP:端口`
- 或者在本地 `hosts` 静态映射

### 14.3 不是所有应用都走系统代理

如果不开 TUN，只开普通 `mixed-port`/系统代理：

- 浏览器通常正常
- 一些桌面软件可能不走
- 直接连 IP 的程序不一定走
- SMB / RDP / SSH 更可能需要 TUN

---

## 15. 如何远程访问 xui 面板所在的局域网地址

假设 3x-ui 面板运行在远端设备：

```text
192.168.50.10:2053
```

你要做的是：

1. 确保这台设备对 NAS 可达
2. mihomo 加规则

```yaml
rules:
  - IP-CIDR,192.168.50.0/24,Proxy,no-resolve
  - MATCH,Proxy
```

3. 建议开启 TUN
4. 浏览器直接打开：

```text
http://192.168.50.10:2053
```

### 建议

不建议把 3x-ui 面板直接额外暴露成公网入口。  
**通过现有隧道访问远端内网地址更稳妥。**

---

## 16. 如果 xui 服务器本机也装了 mihomo，如何让接入客户端继续访问代理网络

这是更进阶的一层串联。

目标是把链路变成：

```text
客户端 -> xui/Xray 入站 -> 服务器本机 mihomo -> mihomo 的节点 -> 代理网络
```

换句话说，不让 Xray 默认 direct 出去，而是把它的**出站**交给服务器本机的 mihomo。

---

## 17. 推荐架构：Xray 出站指向本地 mihomo SOCKS

### 17.1 先在服务器上的 mihomo 开一个本地 SOCKS 监听

最简单写法：

```yaml
socks-port: 7891
allow-lan: false
```

如果你需要 UDP，也可以改用监听器写法：

```yaml
listeners:
  - name: socks-in
    type: socks
    port: 7891
    listen: 127.0.0.1
    udp: true
```

---

## 18. 在 3x-ui / Xray 中新增一个 SOCKS 出站

你可以把这个出站理解成：

> 把原本应该由 Xray 自己发出的流量，转手交给 `127.0.0.1:7891` 的 mihomo。

示例 JSON：

```json
{
  "protocol": "socks",
  "tag": "to-mihomo",
  "settings": {
    "servers": [
      {
        "address": "127.0.0.1",
        "port": 7891
      }
    ]
  }
}
```

---

## 19. 再添加一条路由规则，把你的客户端入站导向这个出站

假设你的入站 tag 是：

```text
fn-vless
```

则可写：

```json
{
  "type": "field",
  "inboundTag": ["fn-vless"],
  "outboundTag": "to-mihomo"
}
```

这样一来：

- 所有从 `fn-vless` 这条入站进来的流量
- 都不再 direct
- 而是交给服务器本机 mihomo
- 再由 mihomo 按它自己的代理组节点

---

## 20. 只让国外流量走 mihomo，国内流量直连

如果你不想所有流量都交给代理节点，可以保留两个出站：

- `direct`
- `to-mihomo`

然后按域名/IP 分流，例如：

```json
{
  "domainStrategy": "IPIfNonMatch",
  "rules": [
    {
      "type": "field",
      "inboundTag": ["fn-vless"],
      "ip": ["geoip:private", "geoip:cn"],
      "outboundTag": "direct"
    },
    {
      "type": "field",
      "inboundTag": ["fn-vless"],
      "domain": ["geosite:cn"],
      "outboundTag": "direct"
    },
    {
      "type": "field",
      "inboundTag": ["fn-vless"],
      "outboundTag": "to-mihomo"
    }
  ]
}
```

这个逻辑就是：

- 私网和国内地址：直连
- 国内域名：直连
- 其他全部：送给本机 mihomo 代理节点

---

## 21. 这套“xui -> mihomo -> 代理节点”最常见的坑

### 21.1 回环

如果服务器本机 mihomo 当前选中的上游节点，恰好又是：

- 这台服务器自己的 xui
- 或者又绕回这个 fnconnect 节点

就可能形成：

```text
Xray -> mihomo -> 又回 Xray -> mihomo -> ...
```

结果表现为：

- 节点貌似连上
- 但请求转不出去
- 或出现莫名超时

**必须避免 mihomo 的上游节点再次回指自己。**

### 21.2 只装了 mihomo，但没改 Xray 的出站

这是最常见误区。

- 你在服务器上安装了 mihomo
- 但 Xray 仍然走默认 direct
- 结果客户端虽然连接了 xui
- 却没有借服务器 mihomo 翻出去

**重点不是“装了 mihomo”，而是“Xray 出站真的指向 mihomo 了”。**

### 21.3 规则顺序错误

Xray / 3x-ui 的 routing rules 是有顺序的。  
一条更早的直连规则可能把你原本要送往 `to-mihomo` 的流量抢先匹配掉。

---

## 22. 一份最小可用的完整示例

### 22.1 3x-ui 服务端入站

- 协议：VLESS
- 端口：3000
- 传输：WS
- Path：`/chromium/xui`
- TLS：关闭

### 22.2 客户端 mihomo

```yaml
mixed-port: 7890
allow-lan: true
mode: rule
log-level: info

proxies:
  - name: "FN-VLESS-WS"
    type: vless
    server: 你的-fnconnect-域名
    port: 443
    uuid: 你的-UUID
    udp: true
    tls: true
    servername: 你的-fnconnect-域名
    client-fingerprint: chrome
    skip-cert-verify: false
    network: ws
    packet-encoding: xudp
    encryption: ""
    ws-opts:
      path: /chromium/xui
      headers:
        Host: 你的-fnconnect-域名
        Cookie: mode=relay;

proxy-groups:
  - name: Proxy
    type: select
    proxies:
      - FN-VLESS-WS

tun:
  enable: true
  stack: mixed
  auto-route: true
  auto-detect-interface: true
  strict-route: true
  dns-hijack:
    - any:53

rules:
  - IP-CIDR,192.168.50.0/24,Proxy,no-resolve
  - MATCH,Proxy
```

### 22.3 服务器本机 mihomo（用于二次代理）

```yaml
socks-port: 7891
allow-lan: false
```

### 22.4 Xray 新增出站

```json
{
  "protocol": "socks",
  "tag": "to-mihomo",
  "settings": {
    "servers": [
      {
        "address": "127.0.0.1",
        "port": 7891
      }
    ]
  }
}
```

### 22.5 Xray 新增路由

```json
{
  "type": "field",
  "inboundTag": ["fn-vless"],
  "outboundTag": "to-mihomo"
}
```

---

## 23. 排错顺序建议

### 23.1 先确认最基础的接入链路

逐项检查：

1. 飞牛浏览器应用是否占用 `3000`
2. 3x-ui 入站是否真的监听 `3000`
3. Path 是否以 `/chromium/` 开头
4. 客户端地址是否为 `fn connect 域名:443`
5. 客户端是否开启 TLS
6. `Cookie: mode=relay;` 是否真的发出

### 23.2 再确认远端局域网访问

1. NAS 自己能否访问远端目标 IP
2. mihomo 是否有 `IP-CIDR,远端网段,Proxy,no-resolve`
3. 是否被 `DIRECT` 私网规则抢先命中
4. 本地网段和远端网段是否冲突
5. 是否需要开启 TUN

### 23.3 最后确认代理网络二次出站

1. 服务器本机 mihomo 是否正常工作
2. `127.0.0.1:7891` 是否可用
3. Xray 是否新增了 `to-mihomo` 出站
4. 路由是否真的把 `inboundTag` 指向了 `to-mihomo`
5. 服务器上的 mihomo 上游节点是否形成回环

---

## 24. 使用建议

### 24.1 推荐优先级

如果你只是想先稳定跑通：

1. **VLESS + WS**
2. 服务端端口固定 `3000`
3. Path 用 `/chromium/xui`
4. 客户端必须带 `Cookie: mode=relay;`
5. 先让普通 TCP 跑通
6. 再考虑 `xudp`
7. 要访问远端 LAN 时启用 TUN
8. 要借服务器继续翻出去时再串本机 mihomo

### 24.2 关于安全性

这套方案的本质是“借现成入口复用链路”，不是专门为通用隧道设计的官方功能。

因此建议：

- 不要额外把 xui 面板直接暴露到公网
- 不要让服务器上的 mihomo 上游节点再次指回自己
- 保持 UUID、面板密码、管理员密码独立
- 面板尽量只通过内网或隧道访问

---

## 25. 一句话总结

这套方案的本质可以概括为：

> 飞牛用 `/chromium/` 把外部 `443` 的 WebSocket 请求代理到本机 `3000`，  
> 你只需要在 `3000` 上放一个 3x-ui/Xray 的 **VLESS/VMess + WS** 入站，  
> 客户端连接时带上 `Cookie: mode=relay;`，  
> 再用 mihomo 的规则/TUN 来决定是否访问远端局域网，  
> 如有需要，还可以把 Xray 的出站继续串到服务器上的 mihomo 代理节点。

---

## 26. 参考链接

### 原帖
- https://club.fnnas.com/forum.php?mod=viewthread&tid=50086

### 3x-ui
- https://github.com/MHSanaei/3x-ui
- https://github.com/MHSanaei/3x-ui/wiki/Advanced
- https://github.com/MHSanaei/3x-ui/wiki/Configuration

### Xray / Project X 官方文档
- https://xtls.github.io/en/config/
- https://xtls.github.io/en/config/inbound.html
- https://xtls.github.io/en/config/inbounds/vless.html
- https://xtls.github.io/en/config/routing.html
- https://xtls.github.io/en/config/outbound.html
- https://xtls.github.io/en/config/outbounds/socks.html
- https://xtls.github.io/en/config/transport.html
- https://xtls.github.io/en/config/transports/websocket.html

### mihomo 官方文档
- https://wiki.metacubex.one/en/config/proxies/vless/
- https://wiki.metacubex.one/en/config/proxies/vmess/
- https://wiki.metacubex.one/en/config/rules/
- https://wiki.metacubex.one/en/config/inbound/tun/
- https://wiki.metacubex.one/en/config/inbound/listeners/socks/
- https://wiki.metacubex.one/en/config/dns/
# Mihomo 旁路由模式下 Steam 下载误走代理的原因分析与解决方案

如果你在本机上使用的是普通的 TUN 模式（非 TUN + Process 模式），并且配置和旁路由完全一模一样，但本机 Steam 能直连（且有 IPv6），旁路由 Steam 却全部走了代理。

这说明在网络拓扑变化（本机 -> 局域网转发）的过程中，某一个关键的判断条件发生了改变，导致流量走错了分支。

核心原因几乎肯定出在 **DNS 解析（Fake-IP 映射丢失）** 或 **嗅探器（Sniffer）对来源 IP 的处理** 上。

让我们深入分析三个可能导致旁路由 Steam 走代理的技术死角。

---

### 原因 1：Fake-IP 映射（DNS-to-IP Cache）在旁路由下没接上

这是最有可能的原因。

**Fake-IP 的工作原理：**
1. 客户端发 DNS 请求 `csh.steamserver.net` 给 Mihomo 的 53 端口。
2. Mihomo 记录一条映射结构：`198.18.0.5 <-> csh.steamserver.net`，并把 `198.18.0.5` 返回给客户端。
3. 客户端发起 TCP 连接到 `198.18.0.5`。
4. Mihomo 的 TUN/TProxy 截获这个 TCP 连接，**根据目标 IP 查内部映射表**，发现是 `csh.steamserver.net`。
5. Mihomo 拿着这个**域名**去跑规则表（命中 `DOMAIN-SUFFIX,steamserver.net,DIRECT`）。

**本机 TUN 为什么没问题？**
本机应用发出的 DNS 请求和后续的 TCP 连接，延迟极低，且因为是在内核同一台机器内部流转，Mihomo 能非常稳定地捕获到 DNS 请求并建立映射。当 TCP 包到达 TUN 网卡时，Mihomo 百分之百能在缓存里找到 `198.18.0.5` 对应的域名，从而正确匹配域名规则。

**旁路由为什么会出问题（走代理）？**
旁路由环境下，经常发生**“有连接，无 DNS 查询记录”**的情况。为什么会这样？
- **客户端（电脑）系统的 DNS 缓存**：电脑自己有 DNS 缓存。有时候 Steam 发起连接时，并没有真的向旁路由发 DNS 请求，而是直接用了系统缓存里以前残留的真实 IP 或者别的什么 IP。
- **DNS 请求绕过了旁路由的 53 端口**：电脑可能向除了旁路由以外的 DNS（比如默认网关 DHCP 下发的运营商 DNS，或者因为有些程序硬编码了 8.8.8.8）发了查询。
- **多网卡/IPv6 干扰**：电脑启用了 IPv6（而你旁路由的 IPv6 没彻底接管），电脑通过 IPv6 链路用别的 DNS 查到了真实地址。

**当以上情况发生时，Mihomo 收到 TCP 连接（目标 IP 是真实的 `114.x.x.x` 或者别的什么），且它的 Fake-IP 表里没有这个 IP 的记录。**
这时候，Mihomo 怎么处理？
它只能退回**纯 IP 规则匹配**，或者依赖**流量嗅探（Sniffer）**去拆包看域名。
如果嗅探失败（Steam 下载有很多自建协议或 HTTP 非标准头，Mihomo 嗅探不到 SNI/Host），Mihomo 就只能拿着这个**真实目标 IP** 去匹配 `GEOIP` 规则。

这里还有一个致命点：你的配置里有 `GEOSITE,steam@cn,国内代理` 这样的规则。如果在旁路由上，流量没匹配到域名（因为没通过 Fake-IP 建立映射且嗅探失败），它**直接掉到了按 IP 获取地理位置的阶段**。
如果那个 IP 被 GEOIP 判定为不是 `CN`，或者干脆没有匹配到任何 `GEOIP`，它就会落入结尾的：
```yaml
  - MATCH,国际代理
```
于是，本该直连的 Steam 流量，就因为 **域名映射丢失**，被全局兜底塞进了代理节点。

---

### 原因 2：Mihomo Sniffer（嗅探器）的 `override-destination` 产生了副作用

来看看你给出的里的配置：
```yaml
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
    # ...
```

`override-destination: true` 的作用是：当 Mihomo 通过嗅探（比如从 HTTP 的 Host 头里）解析出域名时，**强制覆盖**原本请求的目标。
这本来是为了解决 DNS 污染的，但在旁路由场景下配合 Steam 会有奇效（贬义）：

Steam 下载时大多使用 HTTP（80端口）。
如果 Steam 客户端（电脑）**不走 Mihomo 的 DNS** 查到了一个真实的国内 CDN IP（比如 `58.217.x.x`），然后用这个真实 IP 连旁路由（因为网关指向了旁路由）。
流量进了 Mihomo，Mihomo 的 Sniffer 开始工作，嗅探到了 HTTP Host: `cdn.steamserver.net`。
因为开启了 `override-destination: true`，Mihomo 拿这个嗅探到的域名取代了原本的基于 IP 的请求，然后去跑规则。

这听起来似乎是对的（应该匹配规则直连），**但由于目标被 override 成了域名，Mihomo 需要自己去重新发起 DNS 解析来获取最终的出口 IP。**
Mihomo 使用配置文件中的 `nameserver` 去查 `cdn.steamserver.net`。如果 Mihomo 的 DNS 配置不当，查出来一个**国外的 IP**（或者被策略弄成了国外节点出去查），于是 Steam 就被引导连接到了国外的 Steam 下载服务器，这就是为什么“看起来走了代理（其实是连接了国外的 CDN，流量还是走你的代理出去的）”。

而在本机时，因为所有 DNS 解析都死死锁在 Mihomo 的 Fake-IP 内部循环里，这种异步的 DNS 查询偏差较小。

---

### 原因 3：局域网（LAN）策略与 `auto-redirect` 特性的冲突

在提供的容器配置：
```yaml
tun:
  enable: true
  stack: gvisor # 或 mixed
  dns-hijack:
    - "any:53"
    - "tcp://any:53"
  auto-route: true
  auto-redirect: true # 旁路网关模式可使用false，即tun接管所有流量
```

`auto-redirect: true` 会在 Linux 系统层面添加 iptables 规则，将进来的流量重定向到 Mihomo 内部。
**但是，旁路由接收到的是另一个局域网 IP 发送过来的外部包，而本机 TUN 接收的是本机系统的本地包。**

1. 很多时候，电脑虽然 IPv4 网关指向了旁路由，但也**同时保持着真实的路由器网关**（比如 DHCP 下发的两组网关优先级不同），或者电脑的 IPv6 网关依然指向真实路由器。
2. Steam 客户端由于多线程并发下载，极具侵略性，它会同时尝试多种连接路径（IPv4+IPv6同时发包）。
3. 如果电脑的 IPv6 是通的，Steam 通过 IPv6 发出的 DNS 或连接请求**并没有经过旁路由**（因为你只是改了台电脑的 IPv4 网关）。
4. 这导致旁路由只收到了一部分残缺的报文或者只有 IPv4 的后备流量，它没能完整地还原出“这是一个 Steam 请求应该由于 `steamserver.net` 直连”。

这也就是为什么我在之前的回答中强调：在旁路由模式下，**必须统一整个局域网设备的网络出口（尤其是 DNS 和 IPv6 路径）**。如果你没有禁用电脑设备的 IPv6，也没有让旁路由接管 IPv6 解析和路由，流量就会从两张网卡撕裂。

---

### 总结与验证方案

排除了本机进程嗅探的可能后，旁路由 Steam 下载走代理的根本原因必定是：**在流量抵达旁路由时，Mihomo 未能将其正确识别为 `steamserver.net` 这个域名，或者重新解析域名时拿到了境外的 IP。**

针对网络层面和 Mihomo 配置的解决方案非常明确，你可以逐一验证：

#### 第一招：强制 Steam 流量走真实 IP（绕过 Fake-IP 与嗅探）
这是最立竿见影的解决网络层面 DNS 映射丢失的方法。对于下载类大流量、多 CDN 调度的域名，**绝对不要使用 Fake-IP**。
在旁路由的 `config.yaml` 中，把 Steam 下载专用的域名后缀（主要是 `steamserver.net` 和 `steamcontent.com`）添加到 **`fake-ip-filter`** 列表中。
这样这些域名的请求才会返回真实的服务器 IP（通常是离你最近的国内 CDN），从而正确触发直连或属于中国大陆的 IP 分流规则，完美解决“电脑 Steam 下载莫名走代理”的问题。
```yaml
dns:
  fake-ip-filter:
    - '+.steamserver.net'
    - '+.steamcontent.com'
```

#### 第二招：检查旁路由的嗅探器（Sniffer）
尝试关闭旁路由上的强制目标覆盖，看看是不是嗅探器擅自把国内的 IP 换掉并请求到了国外的 CDN。
```yaml
sniffer:
  enable: true
  sniff:
    HTTP:
      ports: [80, 8080-8880]
      override-destination: false  # 改为 false 甚至彻底关闭 HTTP 嗅探测试
```

#### 第三招：确保电脑端没有 DNS 和 IPv6 泄漏
如果你只想用旁路由接管 IPv4，请在电脑（而不是旁路由配置中）强制执行：
- 清除电脑的 DNS 缓存 (`ipconfig /flushdns` 等)
- 在你想通过旁路由代理下载的电脑上完全禁用掉 IPv6（通过网卡属性取消勾选 Internet 协议版本 6），强制让 Steam 所有的解析和连接全部汇聚到这一个 `192.168.0.2`（也就是只有 IPv4 的配置下）的单行道里。
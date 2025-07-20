import{_ as n,f as a,i as e,o as l}from"./app-BC5-L6qK.js";const p={};function t(i,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="clash-代理工具" tabindex="-1"><a class="header-anchor" href="#clash-代理工具"><span>Clash:代理工具</span></a></h1><h2 id="客户端推荐" tabindex="-1"><a class="header-anchor" href="#客户端推荐"><span>客户端推荐</span></a></h2><h3 id="clash-verge-rev" tabindex="-1"><a class="header-anchor" href="#clash-verge-rev"><span><a href="https://github.com/clash-verge-rev/clash-verge-rev" target="_blank" rel="noopener noreferrer">Clash Verge Rev</a></span></a></h3><ul><li><a href="https://gh-proxy.com/github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.3.1/Clash.Verge_2.3.1_x64-setup.exe" target="_blank" rel="noopener noreferrer">Windows x64</a></li><li><a href="https://gh-proxy.com/github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.3.1/Clash.Verge_2.3.1_arm64-setup.exe" target="_blank" rel="noopener noreferrer">Windows arm64</a></li><li><a href="https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_x64.dmg" target="_blank" rel="noopener noreferrer">macOS x64</a></li><li><a href="https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_aarch64.dmg" target="_blank" rel="noopener noreferrer">macOS arm64</a></li><li><a href="https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_amd64.deb" target="_blank" rel="noopener noreferrer">Linux x64</a></li><li><a href="https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_arm64.deb" target="_blank" rel="noopener noreferrer">Linux arm64</a></li></ul><h3 id="flclash" tabindex="-1"><a class="header-anchor" href="#flclash"><span><a href="https://github.com/chen08209/FlClash" target="_blank" rel="noopener noreferrer">FlClash</a></span></a></h3><ul><li><a href="https://gh-proxy.com/github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-android-arm64-v8a.apk" target="_blank" rel="noopener noreferrer">Android ARMv8</a></li><li><a href="https://gh-proxy.com/github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-android-armeabi-v7a.apk" target="_blank" rel="noopener noreferrer">Android ARMv7</a></li><li><a href="https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-android-armeabi-v7a.apk" target="_blank" rel="noopener noreferrer">Android x64</a></li></ul><h3 id="hiddify" tabindex="-1"><a class="header-anchor" href="#hiddify"><span><a href="https://github.com/hiddify/hiddify-app" target="_blank" rel="noopener noreferrer">Hiddify</a></span></a></h3><ul><li><a href="https://github.com/hiddify/hiddify-next/releases/latest/download/Hiddify-Android-universal.apk" target="_blank" rel="noopener noreferrer">Android Universal</a></li><li><a href="https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532" target="_blank" rel="noopener noreferrer">iOS Universal</a></li></ul><h3 id="android相关客户端" tabindex="-1"><a class="header-anchor" href="#android相关客户端"><span>Android相关客户端</span></a></h3><ul><li><a href="https://github.com/MetaCubeX/ClashMetaForAndroid" target="_blank" rel="noopener noreferrer">Clash Meta for Android</a></li><li><a href="https://github.com/SagerNet/sing-box" target="_blank" rel="noopener noreferrer">Sing Box</a></li></ul><h3 id="ios相关客户端" tabindex="-1"><a class="header-anchor" href="#ios相关客户端"><span>iOS相关客户端</span></a></h3><ul><li><a href="https://apps.apple.com/us/app/shadowrocket/id932747118" target="_blank" rel="noopener noreferrer">Shadowrocket</a></li><li><a href="https://apps.apple.com/us/app/quantumult-x/id1443988620" target="_blank" rel="noopener noreferrer">QuantumultX</a></li><li><a href="https://apps.apple.com/us/app/stash-rule-based-proxy/id1596063349" target="_blank" rel="noopener noreferrer">Stash</a></li><li><a href="https://apps.apple.com/us/app/surge-5/id1442620678" target="_blank" rel="noopener noreferrer">Surge</a></li></ul><h3 id="openwrt相关插件" tabindex="-1"><a class="header-anchor" href="#openwrt相关插件"><span>OpenWRT相关插件</span></a></h3><ul><li><a href="https://github.com/juewuy/ShellCrash" target="_blank" rel="noopener noreferrer">ShellCrash</a></li><li><a href="https://github.com/vernesong/OpenClash" target="_blank" rel="noopener noreferrer">OpenClash</a></li><li><a href="https://github.com/xiaorouji/openwrt-passwall" target="_blank" rel="noopener noreferrer">PassWall</a></li></ul><h2 id="核心配置" tabindex="-1"><a class="header-anchor" href="#核心配置"><span>核心配置</span></a></h2><h3 id="下载地址" tabindex="-1"><a class="header-anchor" href="#下载地址"><span>下载地址</span></a></h3><ul><li><a href="https://github.com/MetaCubeX/mihomo" target="_blank" rel="noopener noreferrer">Mihomo</a></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code><span class="line"><span class="token comment"># DockerCompose配置</span></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">mihomo</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> mihomo</span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> metacubex/mihomo<span class="token punctuation">:</span>latest</span>
<span class="line">    <span class="token key atrule">network_mode</span><span class="token punctuation">:</span> host</span>
<span class="line">    <span class="token comment"># privileged权限会创建Tun网卡代理全局(可选)</span></span>
<span class="line">    <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always</span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> ./config<span class="token punctuation">:</span>/root/.config/mihomo</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><a href="https://hub.docker.com/r/dreamacro/clash-premium" target="_blank" rel="noopener noreferrer">Clash Premium</a></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code><span class="line"><span class="token comment"># DockerCompose配置</span></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">clash</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> clash</span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> dreamacro/clash<span class="token punctuation">-</span>premium<span class="token punctuation">:</span>latest</span>
<span class="line">    <span class="token key atrule">network_mode</span><span class="token punctuation">:</span> host</span>
<span class="line">    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always</span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> ./config<span class="token punctuation">:</span>/root/.config/clash</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置教程" tabindex="-1"><a class="header-anchor" href="#配置教程"><span>配置教程</span></a></h3><ol><li>将<a href="#%E5%B8%B8%E7%94%A8%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6">配置文件</a>命名为config.yaml，修改proxy-providers的url为订阅地址 <ul><li>Windows放在<code>C:\\Users\\Admin\\.config\\mihomo</code>目录中</li><li>Linux放在<code>/root/.config/mihomo</code>目录中</li></ul></li><li>运行程序并选择其中一种<a href="#%E8%BF%9E%E6%8E%A5%E6%96%B9%E5%BC%8F">连接方式</a></li></ol><h2 id="订阅转换" tabindex="-1"><a class="header-anchor" href="#订阅转换"><span>订阅转换</span></a></h2><h3 id="subconverter" tabindex="-1"><a class="header-anchor" href="#subconverter"><span>SubConverter</span></a></h3><ol><li>下载<a href="https://github.com/tindy2013/subconverter" target="_blank" rel="noopener noreferrer">SubConverter</a><ul><li>推荐使用<a href="https://github.com/MetaCubeX/subconverter" target="_blank" rel="noopener noreferrer">SubConverter MetaCubeX</a>改版</li></ul></li><li>解压并打开<code>subconverter.exe</code></li><li>订阅地址输入本地URL<a href="http://127.0.0.1:25500/sub?target=%25TARGET%25&amp;url=%25URL%25" target="_blank" rel="noopener noreferrer">http://127.0.0.1:25500/sub?target=%TARGET%&amp;url=%URL%</a><ul><li><code>%TARGET%</code>替换为<code>auto</code>(自动)/<code>clash</code>(Clash)/<code>quanx</code>(Quantumult X)</li><li><code>%URL%</code>使用<a href="https://www.urlencoder.org/" target="_blank" rel="noopener noreferrer">URLEncode</a>编码原订阅地址后替换</li></ul></li></ol><blockquote><p>无法部署可使用<a href="https://acl4ssr-sub.github.io/" target="_blank" rel="noopener noreferrer">ACL4SSR</a>或<a href="https://subconverters.com/" target="_blank" rel="noopener noreferrer">SubConverters</a>进行在线转换(不推荐)</p></blockquote><h3 id="substore" tabindex="-1"><a class="header-anchor" href="#substore"><span>SubStore</span></a></h3><ol><li>下载<a href="https://github.com/sub-store-org/Sub-Store/releases/latest/download/sub-store.bundle.js" target="_blank" rel="noopener noreferrer">SubStore</a></li><li>下载<a href="https://nodejs.org/dist/v18.20.7/node-v18.20.7-win-x64.zip" target="_blank" rel="noopener noreferrer">Node.js</a>解压并配置环境变量</li><li>进入SubStore目录使用<code>node sub-store.bundle.js</code>运行</li><li>访问<a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">http://localhost:3000</a>管理订阅</li><li>新增订阅转换保存并复制对应客户端订阅地址</li></ol><h2 id="规则配置" tabindex="-1"><a class="header-anchor" href="#规则配置"><span>规则配置</span></a></h2><h3 id="规则仓库" tabindex="-1"><a class="header-anchor" href="#规则仓库"><span>规则仓库</span></a></h3><ul><li><a href="https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash" target="_blank" rel="noopener noreferrer">BlackMatrix详细规则</a></li><li><a href="https://github.com/FQrabbit/SSTap-Rule/releases" target="_blank" rel="noopener noreferrer">SSTap游戏规则</a></li><li><a href="https://github.com/v2fly/domain-list-community/tree/master/data" target="_blank" rel="noopener noreferrer">GeoSite解析</a></li><li><a href="https://github.com/Loyalsoldier/geoip/tree/release/text" target="_blank" rel="noopener noreferrer">GeoIP解析</a></li></ul><h2 id="连接方式" tabindex="-1"><a class="header-anchor" href="#连接方式"><span>连接方式</span></a></h2><h3 id="http-https-应用级tcp代理" tabindex="-1"><a class="header-anchor" href="#http-https-应用级tcp代理"><span>HTTP/HTTPS:应用级TCP代理</span></a></h3><ul><li>仅遵循HTTP代理应用可用</li></ul><h3 id="socks-应用级全局代理" tabindex="-1"><a class="header-anchor" href="#socks-应用级全局代理"><span>Socks:应用级全局代理</span></a></h3><ul><li>仅可连接Socks应用可用</li></ul><h3 id="redir-端口转发模式-tcp" tabindex="-1"><a class="header-anchor" href="#redir-端口转发模式-tcp"><span>Redir:端口转发模式 TCP</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line">iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-N</span> CLASH</span>
<span class="line">iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-d</span> <span class="token number">0.0</span>.0.0/8 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-d</span> <span class="token number">10.0</span>.0.0/8 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-d</span> <span class="token number">127.0</span>.0.0/8 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-d</span> <span class="token number">169.254</span>.0.0/16 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-d</span> <span class="token number">172.16</span>.0.0/12 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.0.0/16 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-d</span> <span class="token number">224.0</span>.0.0/4 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-d</span> <span class="token number">240.0</span>.0.0/4 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line"></span>
<span class="line">iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> REDIRECT --to-ports <span class="token number">7892</span></span>
<span class="line">iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> CLASH</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tproxy-透明网关模式-tcp-udp-仅linux可用" tabindex="-1"><a class="header-anchor" href="#tproxy-透明网关模式-tcp-udp-仅linux可用"><span>Tproxy:透明网关模式 TCP/UDP(仅Linux可用)</span></a></h3><ul><li>创建路由规则劫持流量转发</li></ul><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 将所有进入本机的 tcp/udp 数据包交给 tproxy</span></span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> TPROXY --on-ip <span class="token number">127.0</span>.0.1 --on-port <span class="token number">7893</span></span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-p</span> udp <span class="token parameter variable">-j</span> TPROXY --on-ip <span class="token number">127.0</span>.0.1 --on-port <span class="token number">7893</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># IPv4 避免内网数据包死循环</span></span>
<span class="line"><span class="token comment"># 添加一条路由规则，对于 mark 为 1 的数据包，默认从 lo 设备出去</span></span>
<span class="line"><span class="token function">ip</span> rule <span class="token function">add</span> fwmark <span class="token number">1</span> table <span class="token number">100</span></span>
<span class="line"><span class="token function">ip</span> route <span class="token function">add</span> <span class="token builtin class-name">local</span> <span class="token number">0.0</span>.0.0/0 dev lo table <span class="token number">100</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加一个新的链，用来判断本机出去的数据包是否需要经过代理</span></span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-N</span> CLASH</span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-d</span> <span class="token number">10.0</span>.0.0/8 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-d</span> <span class="token number">127.0</span>.0.0/8 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-d</span> <span class="token number">172.16</span>.0.0/12 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.0.0/16 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-d</span> <span class="token number">224.0</span>.0.0/4 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-d</span> <span class="token number">255.255</span>.255.255/32 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span></span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> CLASH <span class="token parameter variable">-p</span> udp <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 对于本机非 clash-meta 用户都启用透明代理</span></span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> OUTPUT <span class="token parameter variable">-m</span> owner <span class="token operator">!</span> --uid-owner clash-meta <span class="token parameter variable">-j</span> CLASH</span>
<span class="line"></span>
<span class="line"><span class="token comment"># IPv6 避免内网数据包死循环</span></span>
<span class="line"><span class="token comment"># 添加一条路由规则，对于 mark 为 1 的数据包，默认从 lo 设备出去</span></span>
<span class="line"><span class="token function">ip</span> <span class="token parameter variable">-6</span> rule <span class="token function">add</span> fwmark <span class="token number">1</span> table <span class="token number">101</span></span>
<span class="line"><span class="token function">ip</span> <span class="token parameter variable">-6</span> route <span class="token function">add</span> <span class="token builtin class-name">local</span> ::/0 dev lo table <span class="token number">101</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加一个新的链，用来判断本机出去的数据包是否需要经过代理</span></span>
<span class="line">ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-N</span> CLASH6</span>
<span class="line">ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> CLASH6 <span class="token parameter variable">-d</span> ::1/128 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> CLASH6 <span class="token parameter variable">-d</span> fc00::/7 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> CLASH6 <span class="token parameter variable">-d</span> ff00::/8 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> CLASH6 <span class="token parameter variable">-d</span> fe80::/10 <span class="token parameter variable">-j</span> RETURN</span>
<span class="line">ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> CLASH6 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span></span>
<span class="line">ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> CLASH6 <span class="token parameter variable">-p</span> udp <span class="token parameter variable">-j</span> MARK --set-mark <span class="token number">1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 对于本机非 clash-meta 用户都启用透明代理</span></span>
<span class="line">ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-A</span> OUTPUT <span class="token parameter variable">-m</span> owner <span class="token operator">!</span> --uid-owner clash-meta <span class="token parameter variable">-j</span> CLASH6</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>删除上述规则</li></ul><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 删除本机重路由规则</span></span>
<span class="line"><span class="token function">ip</span> rule del fwmark <span class="token number">1</span> table <span class="token number">100</span></span>
<span class="line"><span class="token function">ip</span> route del <span class="token builtin class-name">local</span> <span class="token number">0.0</span>.0.0/0 dev lo table <span class="token number">100</span></span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-D</span> OUTPUT <span class="token parameter variable">-m</span> owner <span class="token operator">!</span> --uid-owner clash-meta <span class="token parameter variable">-j</span> CLASH</span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-F</span> CLASH</span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-X</span> CLASH</span>
<span class="line"><span class="token function">ip</span> <span class="token parameter variable">-6</span> rule del fwmark <span class="token number">1</span> table <span class="token number">101</span></span>
<span class="line"><span class="token function">ip</span> <span class="token parameter variable">-6</span> route del <span class="token builtin class-name">local</span> ::/0 dev lo table <span class="token number">101</span></span>
<span class="line">ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-D</span> OUTPUT <span class="token parameter variable">-m</span> owner <span class="token operator">!</span> --uid-owner clash-meta <span class="token parameter variable">-j</span> CLASH6</span>
<span class="line">ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-F</span> CLASH6</span>
<span class="line">ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-X</span> CLASH6</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除劫持到透明代理的规则</span></span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-D</span> PREROUTING <span class="token parameter variable">-j</span> CLASH_LAN</span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-F</span> CLASH_LAN</span>
<span class="line">iptables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-X</span> CLASH_LAN</span>
<span class="line">ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-D</span> PREROUTING <span class="token parameter variable">-j</span> CLASH6_LAN</span>
<span class="line">ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-F</span> CLASH6_LAN</span>
<span class="line">ip6tables <span class="token parameter variable">-t</span> mangle <span class="token parameter variable">-X</span> CLASH6_LAN</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tun-网卡模式-旁路网关" tabindex="-1"><a class="header-anchor" href="#tun-网卡模式-旁路网关"><span>TUN:网卡模式(旁路网关)</span></a></h3><h4 id="linux" tabindex="-1"><a class="header-anchor" href="#linux"><span>Linux</span></a></h4><ul><li>使用<code>./mihomo</code>运行，系统会创建TUN网卡，自动识别出口网卡并拦截流量</li></ul><h4 id="windows" tabindex="-1"><a class="header-anchor" href="#windows"><span>Windows</span></a></h4><h5 id="直接启动" tabindex="-1"><a class="header-anchor" href="#直接启动"><span>直接启动</span></a></h5><ul><li>右键以管理员权限运行<code>mihomo.exe</code>(系统会创建TUN网卡，自动代理本机所有流量)</li></ul><h5 id="后台启动" tabindex="-1"><a class="header-anchor" href="#后台启动"><span>后台启动</span></a></h5><ol><li>在<code>mihomo.exe</code>程序所在目录创建<code>mihomo.vbs</code>输入指令保存，右键<code>mihomo.exe</code>进入属性&gt;兼容性&gt;勾选以管理员身份运行此程序<div class="language-vbs line-numbers-mode" data-highlighter="prismjs" data-ext="vbs"><pre><code><span class="line">set ws=WScript.CreateObject(&quot;WScript.Shell&quot;)</span>
<span class="line">ws.run &quot;mihomo.exe&quot;,0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li><li>双击运行或创建快捷方式放入<code>C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp</code>文件夹开机自动执行</li></ol><h5 id="创建计划任务" tabindex="-1"><a class="header-anchor" href="#创建计划任务"><span>创建计划任务</span></a></h5><ul><li>自动创建:在<code>mihomo.exe</code>程序所在目录创建<code>mihomo.bat</code>输入指令保存并以使用管理员身份运行<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token builtin class-name">set</span> <span class="token string">&quot;DIR=%~dp0&quot;</span></span>
<span class="line"><span class="token builtin class-name">set</span> <span class="token string">&quot;DIR=%DIR:~0,-1%&quot;</span></span>
<span class="line">schtasks /create /tn <span class="token string">&quot;Mihomo&quot;</span> /tr <span class="token string">&quot;<span class="token entity" title="\\&quot;">\\&quot;</span>%~dp0mihomo.exe<span class="token entity" title="\\&quot;">\\&quot;</span> -d <span class="token entity" title="\\&quot;">\\&quot;</span>%DIR%<span class="token entity" title="\\&quot;">\\&quot;</span>&quot;</span> /sc onlogon /ru system /rl highest /f</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>手动创建和管理:右键单击开始菜单&gt;计算机管理&gt;计划任务程序&gt;计划任务程序库</li></ul><h2 id="常用配置文件" tabindex="-1"><a class="header-anchor" href="#常用配置文件"><span>常用配置文件</span></a></h2><ul><li><a href="https://wiki.metacubex.one/" target="_blank" rel="noopener noreferrer">Mihomo Wiki</a></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code><span class="line"><span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">7890</span></span>
<span class="line"><span class="token key atrule">socks-port</span><span class="token punctuation">:</span> <span class="token number">7891</span></span>
<span class="line"><span class="token key atrule">mixed-port</span><span class="token punctuation">:</span> <span class="token number">7892</span></span>
<span class="line"><span class="token key atrule">redir-port</span><span class="token punctuation">:</span> <span class="token number">7893</span></span>
<span class="line"><span class="token key atrule">tproxy-port</span><span class="token punctuation">:</span> <span class="token number">7894</span></span>
<span class="line"><span class="token key atrule">ipv6</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"><span class="token key atrule">allow-lan</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"><span class="token key atrule">lan-allowed-ips</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> 0.0.0.0/0</span>
<span class="line"><span class="token key atrule">lan-disallowed-ips</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token punctuation">:</span><span class="token punctuation">:</span>/0</span>
<span class="line"><span class="token key atrule">unified-delay</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"><span class="token key atrule">tcp-concurrent</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"><span class="token key atrule">external-controller</span><span class="token punctuation">:</span> 0.0.0.0<span class="token punctuation">:</span><span class="token number">9090</span></span>
<span class="line"><span class="token key atrule">external-ui</span><span class="token punctuation">:</span> ui</span>
<span class="line"><span class="token key atrule">external-ui-url</span><span class="token punctuation">:</span> <span class="token string">&quot;https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">geodata-mode</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"><span class="token key atrule">geox-url</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">geoip</span><span class="token punctuation">:</span> <span class="token string">&quot;https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat&quot;</span></span>
<span class="line">  <span class="token key atrule">geosite</span><span class="token punctuation">:</span> <span class="token string">&quot;https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat&quot;</span></span>
<span class="line">  <span class="token key atrule">mmdb</span><span class="token punctuation">:</span> <span class="token string">&quot;https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb&quot;</span></span>
<span class="line">  <span class="token key atrule">asn</span><span class="token punctuation">:</span> <span class="token string">&quot;https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">find-process-mode</span><span class="token punctuation">:</span> strict</span>
<span class="line"><span class="token key atrule">global-client-fingerprint</span><span class="token punctuation">:</span> chrome</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">profile</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">store-selected</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">store-fake-ip</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">sniffer</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">sniff</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">HTTP</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">80</span><span class="token punctuation">,</span> 8080<span class="token punctuation">-</span><span class="token number">8880</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token key atrule">override-destination</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">TLS</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">443</span><span class="token punctuation">,</span> <span class="token number">8443</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token key atrule">QUIC</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">443</span><span class="token punctuation">,</span> <span class="token number">8443</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">skip-domain</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token string">&quot;Mijia Cloud&quot;</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token string">&quot;+.push.apple.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">tun</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">stack</span><span class="token punctuation">:</span> mixed</span>
<span class="line">  <span class="token key atrule">dns-hijack</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token string">&quot;any:53&quot;</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token string">&quot;tcp://any:53&quot;</span></span>
<span class="line">  <span class="token key atrule">auto-route</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">auto-redirect</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">auto-detect-interface</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">dns</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">ipv6</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">listen</span><span class="token punctuation">:</span> 0.0.0.0<span class="token punctuation">:</span><span class="token number">1053</span></span>
<span class="line">  <span class="token key atrule">respect-rules</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">enhanced-mode</span><span class="token punctuation">:</span> fake<span class="token punctuation">-</span>ip</span>
<span class="line">  <span class="token key atrule">fake-ip-filter</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token string">&quot;*&quot;</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token string">&quot;+.lan&quot;</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token string">&quot;+.local&quot;</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token string">&quot;+.market.xiaomi.com&quot;</span></span>
<span class="line">  <span class="token key atrule">nameserver</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//120.53.53.53/dns<span class="token punctuation">-</span>query</span>
<span class="line">    <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//223.5.5.5/dns<span class="token punctuation">-</span>query</span>
<span class="line">  <span class="token key atrule">proxy-server-nameserver</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//120.53.53.53/dns<span class="token punctuation">-</span>query</span>
<span class="line">    <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//223.5.5.5/dns<span class="token punctuation">-</span>query</span>
<span class="line">  <span class="token key atrule">nameserver-policy</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">&quot;geosite:cn,private&quot;</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//120.53.53.53/dns<span class="token punctuation">-</span>query</span>
<span class="line">      <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//223.5.5.5/dns<span class="token punctuation">-</span>query</span>
<span class="line">    <span class="token key atrule">&quot;geosite:geolocation-!cn&quot;</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;https://dns.cloudflare.com/dns-query&quot;</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;https://dns.google/dns-query&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">proxy-providers</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">provider</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//example.com<span class="token punctuation">?</span>clash=1</span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> http</span>
<span class="line">    <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">86400</span></span>
<span class="line">    <span class="token key atrule">health-check</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//www.gstatic.com/generate_204</span>
<span class="line">      <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">300</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">proxy-groups</span><span class="token punctuation">:</span></span>
<span class="line">   <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 手动选择</span>
<span class="line">     <span class="token key atrule">type</span><span class="token punctuation">:</span> select</span>
<span class="line">     <span class="token key atrule">proxies</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>故障转移<span class="token punctuation">,</span>香港<span class="token punctuation">,</span>台湾<span class="token punctuation">,</span>新加坡<span class="token punctuation">,</span>美国<span class="token punctuation">,</span> 日本<span class="token punctuation">,</span>韩国<span class="token punctuation">,</span>其他<span class="token punctuation">]</span></span>
<span class="line">     <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//cp.cloudflare.com/generate_204</span>
<span class="line"></span>
<span class="line">   <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 故障转移</span>
<span class="line">     <span class="token key atrule">type</span><span class="token punctuation">:</span> fallback</span>
<span class="line">     <span class="token key atrule">proxies</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>香港<span class="token punctuation">,</span>台湾<span class="token punctuation">,</span>新加坡<span class="token punctuation">,</span>美国<span class="token punctuation">,</span> 日本<span class="token punctuation">,</span>韩国<span class="token punctuation">,</span>其他<span class="token punctuation">,</span>直连<span class="token punctuation">]</span></span>
<span class="line">     <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//cp.cloudflare.com/generate_204</span>
<span class="line">     <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">60</span></span>
<span class="line"></span>
<span class="line">   <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 香港</span>
<span class="line">     <span class="token key atrule">type</span><span class="token punctuation">:</span> url<span class="token punctuation">-</span>test</span>
<span class="line">     <span class="token key atrule">include-all</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">     <span class="token key atrule">filter</span><span class="token punctuation">:</span> <span class="token string">&quot;(?i)香港&quot;</span></span>
<span class="line">     <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">60</span></span>
<span class="line">     <span class="token key atrule">tolerance</span><span class="token punctuation">:</span> <span class="token number">100</span></span>
<span class="line"></span>
<span class="line">   <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 台湾</span>
<span class="line">     <span class="token key atrule">type</span><span class="token punctuation">:</span> url<span class="token punctuation">-</span>test</span>
<span class="line">     <span class="token key atrule">include-all</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">     <span class="token key atrule">filter</span><span class="token punctuation">:</span> <span class="token string">&quot;(?i)台湾&quot;</span></span>
<span class="line">     <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">60</span></span>
<span class="line">     <span class="token key atrule">tolerance</span><span class="token punctuation">:</span> <span class="token number">100</span></span>
<span class="line"></span>
<span class="line">   <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 新加坡</span>
<span class="line">     <span class="token key atrule">type</span><span class="token punctuation">:</span> url<span class="token punctuation">-</span>test</span>
<span class="line">     <span class="token key atrule">include-all</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">     <span class="token key atrule">filter</span><span class="token punctuation">:</span> <span class="token string">&quot;(?i)新加坡&quot;</span></span>
<span class="line">     <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">60</span></span>
<span class="line">     <span class="token key atrule">tolerance</span><span class="token punctuation">:</span> <span class="token number">100</span></span>
<span class="line"></span>
<span class="line">   <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 美国</span>
<span class="line">     <span class="token key atrule">type</span><span class="token punctuation">:</span> url<span class="token punctuation">-</span>test</span>
<span class="line">     <span class="token key atrule">include-all</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">     <span class="token key atrule">filter</span><span class="token punctuation">:</span> <span class="token string">&quot;(?i)美国&quot;</span></span>
<span class="line">     <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">60</span></span>
<span class="line">     <span class="token key atrule">tolerance</span><span class="token punctuation">:</span> <span class="token number">100</span></span>
<span class="line"></span>
<span class="line">   <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 日本</span>
<span class="line">     <span class="token key atrule">type</span><span class="token punctuation">:</span> url<span class="token punctuation">-</span>test</span>
<span class="line">     <span class="token key atrule">include-all</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">     <span class="token key atrule">filter</span><span class="token punctuation">:</span> <span class="token string">&quot;(?i)日本&quot;</span></span>
<span class="line">     <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">60</span></span>
<span class="line">     <span class="token key atrule">tolerance</span><span class="token punctuation">:</span> <span class="token number">100</span></span>
<span class="line"></span>
<span class="line">   <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 韩国</span>
<span class="line">     <span class="token key atrule">type</span><span class="token punctuation">:</span> url<span class="token punctuation">-</span>test</span>
<span class="line">     <span class="token key atrule">include-all</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">     <span class="token key atrule">filter</span><span class="token punctuation">:</span> <span class="token string">&quot;(?i)韩国&quot;</span></span>
<span class="line">     <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">60</span></span>
<span class="line">     <span class="token key atrule">tolerance</span><span class="token punctuation">:</span> <span class="token number">100</span></span>
<span class="line"></span>
<span class="line">   <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 其他</span>
<span class="line">     <span class="token key atrule">type</span><span class="token punctuation">:</span> url<span class="token punctuation">-</span>test</span>
<span class="line">     <span class="token key atrule">include-all</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">     <span class="token key atrule">exclude-filter</span><span class="token punctuation">:</span> <span class="token string">&quot;(?i)香港|台湾|新加坡|美国|日本|韩国&quot;</span></span>
<span class="line">     <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">0</span></span>
<span class="line">     <span class="token key atrule">tolerance</span><span class="token punctuation">:</span> <span class="token number">100</span></span>
<span class="line"></span>
<span class="line">   <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 直连</span>
<span class="line">     <span class="token key atrule">type</span><span class="token punctuation">:</span> url<span class="token punctuation">-</span>test</span>
<span class="line">     <span class="token key atrule">proxies</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>DIRECT<span class="token punctuation">]</span></span>
<span class="line">     <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">0</span></span>
<span class="line">     <span class="token key atrule">tolerance</span><span class="token punctuation">:</span> <span class="token number">100</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">   <span class="token comment"># Lan</span></span>
<span class="line">   <span class="token punctuation">-</span> GEOIP<span class="token punctuation">,</span>private<span class="token punctuation">,</span>直连<span class="token punctuation">,</span>no<span class="token punctuation">-</span>resolve</span>
<span class="line">   <span class="token comment"># QUIC</span></span>
<span class="line">   <span class="token comment"># - AND,((DST-PORT,443),(NOT,((GEOIP,CN))),(NETWORK,UDP)),REJECT</span></span>
<span class="line">   <span class="token comment"># - AND,((DST-PORT,443),(NOT,((GEOSITE,CN))),(NETWORK,UDP)),REJECT</span></span>
<span class="line">   <span class="token comment"># AI</span></span>
<span class="line">   <span class="token punctuation">-</span> GEOSITE<span class="token punctuation">,</span>category<span class="token punctuation">-</span>ai<span class="token punctuation">-</span>chat<span class="token punctuation">-</span><span class="token tag">!cn</span><span class="token punctuation">,</span>美国</span>
<span class="line">   <span class="token comment"># Bahamut</span></span>
<span class="line">   <span class="token punctuation">-</span> GEOSITE<span class="token punctuation">,</span>bahamut<span class="token punctuation">,</span>台湾</span>
<span class="line">   <span class="token comment"># Github</span></span>
<span class="line">   <span class="token punctuation">-</span> GEOSITE<span class="token punctuation">,</span>github<span class="token punctuation">,</span>手动选择</span>
<span class="line">   <span class="token comment"># Twitter</span></span>
<span class="line">   <span class="token punctuation">-</span> GEOSITE<span class="token punctuation">,</span>twitter<span class="token punctuation">,</span>手动选择</span>
<span class="line">   <span class="token punctuation">-</span> GEOIP<span class="token punctuation">,</span>twitter<span class="token punctuation">,</span>手动选择</span>
<span class="line">   <span class="token comment"># Youtube</span></span>
<span class="line">   <span class="token punctuation">-</span> GEOSITE<span class="token punctuation">,</span>youtube<span class="token punctuation">,</span>手动选择</span>
<span class="line">   <span class="token comment"># Google</span></span>
<span class="line">   <span class="token punctuation">-</span> GEOSITE<span class="token punctuation">,</span>google<span class="token punctuation">,</span>手动选择</span>
<span class="line">   <span class="token punctuation">-</span> GEOIP<span class="token punctuation">,</span>google<span class="token punctuation">,</span>手动选择</span>
<span class="line">   <span class="token comment"># Bing</span></span>
<span class="line">   <span class="token punctuation">-</span> GEOSITE<span class="token punctuation">,</span>bing<span class="token punctuation">,</span>手动选择</span>
<span class="line">   <span class="token comment"># NETFLIX</span></span>
<span class="line">   <span class="token punctuation">-</span> GEOSITE<span class="token punctuation">,</span>netflix<span class="token punctuation">,</span>手动选择</span>
<span class="line">   <span class="token punctuation">-</span> GEOIP<span class="token punctuation">,</span>netflix<span class="token punctuation">,</span>手动选择</span>
<span class="line">   <span class="token comment"># Spotify</span></span>
<span class="line">   <span class="token punctuation">-</span> GEOSITE<span class="token punctuation">,</span>spotify<span class="token punctuation">,</span>手动选择</span>
<span class="line">   <span class="token comment"># Telegram</span></span>
<span class="line">   <span class="token punctuation">-</span> GEOSITE<span class="token punctuation">,</span>telegram<span class="token punctuation">,</span>手动选择</span>
<span class="line">   <span class="token punctuation">-</span> GEOIP<span class="token punctuation">,</span>telegram<span class="token punctuation">,</span>手动选择</span>
<span class="line">   <span class="token comment"># Steam</span></span>
<span class="line">   <span class="token punctuation">-</span> DOMAIN<span class="token punctuation">-</span>SUFFIX<span class="token punctuation">,</span>steamserver.net<span class="token punctuation">,</span>直连</span>
<span class="line">   <span class="token punctuation">-</span> GEOSITE<span class="token punctuation">,</span>steam@cn<span class="token punctuation">,</span>直连</span>
<span class="line">   <span class="token punctuation">-</span> GEOSITE<span class="token punctuation">,</span>steam<span class="token punctuation">,</span>手动选择</span>
<span class="line">   <span class="token comment"># Bilibili</span></span>
<span class="line">   <span class="token punctuation">-</span> GEOSITE<span class="token punctuation">,</span>bilibili<span class="token punctuation">,</span>直连</span>
<span class="line">   <span class="token comment"># China</span></span>
<span class="line">   <span class="token punctuation">-</span> GEOSITE<span class="token punctuation">,</span>CN<span class="token punctuation">,</span>直连</span>
<span class="line">   <span class="token punctuation">-</span> GEOIP<span class="token punctuation">,</span>CN<span class="token punctuation">,</span>直连</span>
<span class="line">   <span class="token comment"># Others</span></span>
<span class="line">   <span class="token punctuation">-</span> MATCH<span class="token punctuation">,</span>手动选择</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置文件示例" tabindex="-1"><a class="header-anchor" href="#配置文件示例"><span>配置文件示例</span></a></h2><ul><li><a href="https://github.com/MetaCubeX/mihomo/blob/Alpha/docs/config.yaml" target="_blank" rel="noopener noreferrer">Mihomo GitHub</a></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code><span class="line"><span class="token comment"># port: 7890 # HTTP(S) 代理服务器端口</span></span>
<span class="line"><span class="token comment"># socks-port: 7891 # SOCKS5 代理端口</span></span>
<span class="line"><span class="token key atrule">mixed-port</span><span class="token punctuation">:</span> <span class="token number">10801</span> <span class="token comment"># HTTP(S) 和 SOCKS 代理混合端口</span></span>
<span class="line"><span class="token comment"># redir-port: 7892 # 透明代理端口，用于 Linux 和 MacOS</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Transparent proxy server port for Linux (TProxy TCP and TProxy UDP)</span></span>
<span class="line"><span class="token comment"># tproxy-port: 7893</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">allow-lan</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 允许局域网连接</span></span>
<span class="line"><span class="token key atrule">bind-address</span><span class="token punctuation">:</span> <span class="token string">&quot;*&quot;</span> <span class="token comment"># 绑定 IP 地址，仅作用于 allow-lan 为 true，&#39;*&#39;表示所有地址</span></span>
<span class="line"><span class="token key atrule">authentication</span><span class="token punctuation">:</span> <span class="token comment"># http,socks入口的验证用户名，密码</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token string">&quot;username:password&quot;</span></span>
<span class="line"><span class="token key atrule">skip-auth-prefixes</span><span class="token punctuation">:</span> <span class="token comment"># 设置跳过验证的IP段</span></span>
<span class="line">  <span class="token punctuation">-</span> 127.0.0.1/8</span>
<span class="line">  <span class="token punctuation">-</span> <span class="token punctuation">:</span><span class="token punctuation">:</span>1/128</span>
<span class="line"><span class="token key atrule">lan-allowed-ips</span><span class="token punctuation">:</span> <span class="token comment"># 允许连接的 IP 地址段，仅作用于 allow-lan 为 true, 默认值为0.0.0.0/0和::/0</span></span>
<span class="line">  <span class="token punctuation">-</span> 0.0.0.0/0</span>
<span class="line">  <span class="token punctuation">-</span> <span class="token punctuation">:</span><span class="token punctuation">:</span>/0</span>
<span class="line"><span class="token key atrule">lan-disallowed-ips</span><span class="token punctuation">:</span> <span class="token comment"># 禁止连接的 IP 地址段, 黑名单优先级高于白名单, 默认值为空</span></span>
<span class="line">  <span class="token punctuation">-</span> 192.168.0.3/32</span>
<span class="line"></span>
<span class="line"><span class="token comment">#  find-process-mode has 3 values:always, strict, off</span></span>
<span class="line"><span class="token comment">#  - always, 开启，强制匹配所有进程</span></span>
<span class="line"><span class="token comment">#  - strict, 默认，由 mihomo 判断是否开启</span></span>
<span class="line"><span class="token comment">#  - off, 不匹配进程，推荐在路由器上使用此模式</span></span>
<span class="line"><span class="token key atrule">find-process-mode</span><span class="token punctuation">:</span> strict</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">mode</span><span class="token punctuation">:</span> rule</span>
<span class="line"></span>
<span class="line"><span class="token comment">#自定义 geodata url</span></span>
<span class="line"><span class="token key atrule">geox-url</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">geoip</span><span class="token punctuation">:</span> <span class="token string">&quot;https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat&quot;</span></span>
<span class="line">  <span class="token key atrule">geosite</span><span class="token punctuation">:</span> <span class="token string">&quot;https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat&quot;</span></span>
<span class="line">  <span class="token key atrule">mmdb</span><span class="token punctuation">:</span> <span class="token string">&quot;https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.metadb&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">geo-auto-update</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># 是否自动更新 geodata</span></span>
<span class="line"><span class="token key atrule">geo-update-interval</span><span class="token punctuation">:</span> <span class="token number">24</span> <span class="token comment"># 更新间隔，单位：小时</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Matcher implementation used by GeoSite, available implementations:</span></span>
<span class="line"><span class="token comment"># - succinct (default, same as rule-set)</span></span>
<span class="line"><span class="token comment"># - mph (from V2Ray, also \`hybrid\` in Xray)</span></span>
<span class="line"><span class="token comment"># geosite-matcher: succinct</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">log-level</span><span class="token punctuation">:</span> debug <span class="token comment"># 日志等级 silent/error/warning/info/debug</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">ipv6</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 开启 IPv6 总开关，关闭阻断所有 IPv6 链接和屏蔽 DNS 请求 AAAA 记录</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">tls</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">certificate</span><span class="token punctuation">:</span> string <span class="token comment"># 证书 PEM 格式，或者 证书的路径</span></span>
<span class="line">  <span class="token key atrule">private-key</span><span class="token punctuation">:</span> string <span class="token comment"># 证书对应的私钥 PEM 格式，或者私钥路径</span></span>
<span class="line">  <span class="token key atrule">custom-certifactes</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">      -----BEGIN CERTIFICATE-----</span>
<span class="line">      format/pem...</span>
<span class="line">      -----END CERTIFICATE-----</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">external-controller</span><span class="token punctuation">:</span> 0.0.0.0<span class="token punctuation">:</span><span class="token number">9093</span> <span class="token comment"># RESTful API 监听地址</span></span>
<span class="line"><span class="token key atrule">external-controller-tls</span><span class="token punctuation">:</span> 0.0.0.0<span class="token punctuation">:</span><span class="token number">9443</span> <span class="token comment"># RESTful API HTTPS 监听地址，需要配置 tls 部分配置文件</span></span>
<span class="line"><span class="token comment"># secret: &quot;123456&quot; # \`Authorization:Bearer \${secret}\`</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># tcp-concurrent: true # TCP 并发连接所有 IP, 将使用最快握手的 TCP</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置 WEB UI 目录，使用 http://{{external-controller}}/ui 访问</span></span>
<span class="line"><span class="token comment"># 解压 mihomo-yacd-meta-gh-pages.zip 并配置静态文件目录</span></span>
<span class="line"><span class="token key atrule">external-ui</span><span class="token punctuation">:</span> /path/to/ui/folder/</span>
<span class="line"><span class="token key atrule">external-ui-name</span><span class="token punctuation">:</span> xd</span>
<span class="line"><span class="token key atrule">external-ui-url</span><span class="token punctuation">:</span> <span class="token string">&quot;https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># interface-name: en0 # 设置出口网卡</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 全局 TLS 指纹，优先低于 proxy 内的 client-fingerprint</span></span>
<span class="line"><span class="token comment"># 可选： &quot;chrome&quot;,&quot;firefox&quot;,&quot;safari&quot;,&quot;ios&quot;,&quot;random&quot;,&quot;none&quot; options.</span></span>
<span class="line"><span class="token comment"># Utls is currently support TLS transport in TCP/grpc/WS/HTTP for VLESS/Vmess and trojan.</span></span>
<span class="line"><span class="token key atrule">global-client-fingerprint</span><span class="token punctuation">:</span> chrome</span>
<span class="line"></span>
<span class="line"><span class="token comment">#  TCP keep alive interval</span></span>
<span class="line"><span class="token key atrule">keep-alive-interval</span><span class="token punctuation">:</span> <span class="token number">15</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># routing-mark:6666 # 配置 fwmark 仅用于 Linux</span></span>
<span class="line"><span class="token key atrule">experimental</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># Disable quic-go GSO support. This may result in reduced performance on Linux.</span></span>
<span class="line">  <span class="token comment"># This is not recommended for most users.</span></span>
<span class="line">  <span class="token comment"># Only users encountering issues with quic-go&#39;s internal implementation should enable this,</span></span>
<span class="line">  <span class="token comment"># and they should disable it as soon as the issue is resolved.</span></span>
<span class="line">  <span class="token comment"># This field will be removed when quic-go fixes all their issues in GSO.</span></span>
<span class="line">  <span class="token comment"># This equivalent to the environment variable QUIC_GO_DISABLE_GSO=1.</span></span>
<span class="line">  <span class="token comment">#quic-go-disable-gso: true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 类似于 /etc/hosts, 仅支持配置单个 IP</span></span>
<span class="line"><span class="token key atrule">hosts</span><span class="token punctuation">:</span></span>
<span class="line"><span class="token comment"># &#39;*.mihomo.dev&#39;: 127.0.0.1</span></span>
<span class="line"><span class="token comment"># &#39;.dev&#39;: 127.0.0.1</span></span>
<span class="line"><span class="token comment"># &#39;alpha.mihomo.dev&#39;: &#39;::1&#39;</span></span>
<span class="line"><span class="token comment"># test.com: [1.1.1.1, 2.2.2.2]</span></span>
<span class="line"><span class="token comment"># home.lan: lan # lan 为特别字段，将加入本地所有网卡的地址</span></span>
<span class="line"><span class="token comment"># baidu.com: google.com # 只允许配置一个别名</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">profile</span><span class="token punctuation">:</span> <span class="token comment"># 存储 select 选择记录</span></span>
<span class="line">  <span class="token key atrule">store-selected</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 持久化 fake-ip</span></span>
<span class="line">  <span class="token key atrule">store-fake-ip</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Tun 配置</span></span>
<span class="line"><span class="token key atrule">tun</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line">  <span class="token key atrule">stack</span><span class="token punctuation">:</span> system <span class="token comment"># gvisor/mixed</span></span>
<span class="line">  <span class="token key atrule">dns-hijack</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> 0.0.0.0<span class="token punctuation">:</span><span class="token number">53</span> <span class="token comment"># 需要劫持的 DNS</span></span>
<span class="line">  <span class="token comment"># auto-detect-interface: true # 自动识别出口网卡</span></span>
<span class="line">  <span class="token comment"># auto-route: true # 配置路由表</span></span>
<span class="line">  <span class="token comment"># mtu: 9000 # 最大传输单元</span></span>
<span class="line">  <span class="token comment"># gso: false # 启用通用分段卸载, 仅支持 Linux</span></span>
<span class="line">  <span class="token comment"># gso-max-size: 65536 # 通用分段卸载包的最大大小</span></span>
<span class="line">  <span class="token comment"># strict-route: true # 将所有连接路由到tun来防止泄漏，但你的设备将无法其他设备被访问</span></span>
<span class="line">  <span class="token key atrule">inet4-route-address</span><span class="token punctuation">:</span> <span class="token comment"># 启用 auto-route 时使用自定义路由而不是默认路由</span></span>
<span class="line">    <span class="token punctuation">-</span> 0.0.0.0/1</span>
<span class="line">    <span class="token punctuation">-</span> 128.0.0.0/1</span>
<span class="line">  <span class="token key atrule">inet6-route-address</span><span class="token punctuation">:</span> <span class="token comment"># 启用 auto-route 时使用自定义路由而不是默认路由</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token string">&quot;::/1&quot;</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token string">&quot;8000::/1&quot;</span></span>
<span class="line">  <span class="token comment"># endpoint-independent-nat: false # 启用独立于端点的 NAT</span></span>
<span class="line">  <span class="token comment"># include-interface: # 限制被路由的接口。默认不限制, 与 \`exclude-interface\` 冲突</span></span>
<span class="line">  <span class="token comment">#   - &quot;lan0&quot;</span></span>
<span class="line">  <span class="token comment"># exclude-interface: # 排除路由的接口, 与 \`include-interface\` 冲突</span></span>
<span class="line">  <span class="token comment">#   - &quot;lan1&quot;</span></span>
<span class="line">  <span class="token comment"># include-uid: # UID 规则仅在 Linux 下被支持，并且需要 auto-route</span></span>
<span class="line">  <span class="token comment"># - 0</span></span>
<span class="line">  <span class="token comment"># include-uid-range: # 限制被路由的的用户范围</span></span>
<span class="line">  <span class="token comment"># - 1000:9999</span></span>
<span class="line">  <span class="token comment"># exclude-uid: # 排除路由的的用户</span></span>
<span class="line">  <span class="token comment">#- 1000</span></span>
<span class="line">  <span class="token comment"># exclude-uid-range: # 排除路由的的用户范围</span></span>
<span class="line">  <span class="token comment"># - 1000:9999</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># Android 用户和应用规则仅在 Android 下被支持</span></span>
<span class="line">  <span class="token comment"># 并且需要 auto-route</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># include-android-user: # 限制被路由的 Android 用户</span></span>
<span class="line">  <span class="token comment"># - 0</span></span>
<span class="line">  <span class="token comment"># - 10</span></span>
<span class="line">  <span class="token comment"># include-package: # 限制被路由的 Android 应用包名</span></span>
<span class="line">  <span class="token comment"># - com.android.chrome</span></span>
<span class="line">  <span class="token comment"># exclude-package: # 排除被路由的 Android 应用包名</span></span>
<span class="line">  <span class="token comment"># - com.android.captiveportallogin</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#ebpf配置</span></span>
<span class="line"><span class="token key atrule">ebpf</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">auto-redir</span><span class="token punctuation">:</span> <span class="token comment"># redirect 模式，仅支持 TCP</span></span>
<span class="line">    <span class="token punctuation">-</span> eth0</span>
<span class="line">  <span class="token key atrule">redirect-to-tun</span><span class="token punctuation">:</span> <span class="token comment"># UDP+TCP 使用该功能请勿启用 auto-route</span></span>
<span class="line">    <span class="token punctuation">-</span> eth0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 嗅探域名 可选配置</span></span>
<span class="line"><span class="token key atrule">sniffer</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line">  <span class="token comment">## 对 redir-host 类型识别的流量进行强制嗅探</span></span>
<span class="line">  <span class="token comment">## 如：Tun、Redir 和 TProxy 并 DNS 为 redir-host 皆属于</span></span>
<span class="line">  <span class="token comment"># force-dns-mapping: false</span></span>
<span class="line">  <span class="token comment">## 对所有未获取到域名的流量进行强制嗅探</span></span>
<span class="line">  <span class="token comment"># parse-pure-ip: false</span></span>
<span class="line">  <span class="token comment"># 是否使用嗅探结果作为实际访问，默认 true</span></span>
<span class="line">  <span class="token comment"># 全局配置，优先级低于 sniffer.sniff 实际配置</span></span>
<span class="line">  <span class="token key atrule">override-destination</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line">  <span class="token key atrule">sniff</span><span class="token punctuation">:</span> <span class="token comment"># TLS 和 QUIC 默认如果不配置 ports 默认嗅探 443</span></span>
<span class="line">    <span class="token key atrule">QUIC</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment">#  ports: [ 443 ]</span></span>
<span class="line">    <span class="token key atrule">TLS</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment">#  ports: [443, 8443]</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 默认嗅探 80</span></span>
<span class="line">    <span class="token key atrule">HTTP</span><span class="token punctuation">:</span> <span class="token comment"># 需要嗅探的端口</span></span>
<span class="line">      <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">80</span><span class="token punctuation">,</span> 8080<span class="token punctuation">-</span><span class="token number">8880</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token comment"># 可覆盖 sniffer.override-destination</span></span>
<span class="line">      <span class="token key atrule">override-destination</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">force-domain</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> +.v2ex.com</span>
<span class="line">  <span class="token comment">## 对嗅探结果进行跳过</span></span>
<span class="line">  <span class="token comment"># skip-domain:</span></span>
<span class="line">  <span class="token comment">#   - Mijia Cloud</span></span>
<span class="line">  <span class="token comment"># 需要嗅探协议</span></span>
<span class="line">  <span class="token comment"># 已废弃，若 sniffer.sniff 配置则此项无效</span></span>
<span class="line">  <span class="token key atrule">sniffing</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> tls</span>
<span class="line">    <span class="token punctuation">-</span> http</span>
<span class="line">  <span class="token comment"># 强制对此域名进行嗅探</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 仅对白名单中的端口进行嗅探，默认为 443，80</span></span>
<span class="line">  <span class="token comment"># 已废弃，若 sniffer.sniff 配置则此项无效</span></span>
<span class="line">  <span class="token key atrule">port-whitelist</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token string">&quot;80&quot;</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token string">&quot;443&quot;</span></span>
<span class="line">    <span class="token comment"># - 8000-9999</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">tunnels</span><span class="token punctuation">:</span> <span class="token comment"># one line config</span></span>
<span class="line">  <span class="token punctuation">-</span> tcp/udp<span class="token punctuation">,</span>127.0.0.1<span class="token punctuation">:</span><span class="token number">6553</span><span class="token punctuation">,</span>114.114.114.114<span class="token punctuation">:</span><span class="token number">53</span><span class="token punctuation">,</span>proxy</span>
<span class="line">  <span class="token punctuation">-</span> tcp<span class="token punctuation">,</span>127.0.0.1<span class="token punctuation">:</span><span class="token number">6666</span><span class="token punctuation">,</span>rds.mysql.com<span class="token punctuation">:</span><span class="token number">3306</span><span class="token punctuation">,</span>vpn</span>
<span class="line">  <span class="token comment"># full yaml config</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">network</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>tcp<span class="token punctuation">,</span> udp<span class="token punctuation">]</span></span>
<span class="line">    <span class="token key atrule">address</span><span class="token punctuation">:</span> 127.0.0.1<span class="token punctuation">:</span><span class="token number">7777</span></span>
<span class="line">    <span class="token key atrule">target</span><span class="token punctuation">:</span> target.com</span>
<span class="line">    <span class="token key atrule">proxy</span><span class="token punctuation">:</span> proxy</span>
<span class="line"></span>
<span class="line"><span class="token comment"># DNS配置</span></span>
<span class="line"><span class="token key atrule">dns</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">cache-algorithm</span><span class="token punctuation">:</span> arc</span>
<span class="line">  <span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># 关闭将使用系统 DNS</span></span>
<span class="line">  <span class="token key atrule">prefer-h3</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 开启 DoH 支持 HTTP/3，将并发尝试</span></span>
<span class="line">  <span class="token key atrule">listen</span><span class="token punctuation">:</span> 0.0.0.0<span class="token punctuation">:</span><span class="token number">53</span> <span class="token comment"># 开启 DNS 服务器监听</span></span>
<span class="line">  <span class="token comment"># ipv6: false # false 将返回 AAAA 的空结果</span></span>
<span class="line">  <span class="token comment"># ipv6-timeout: 300 # 单位：ms，内部双栈并发时，向上游查询 AAAA 时，等待 AAAA 的时间，默认 100ms</span></span>
<span class="line">  <span class="token comment"># 用于解析 nameserver，fallback 以及其他DNS服务器配置的，DNS 服务域名</span></span>
<span class="line">  <span class="token comment"># 只能使用纯 IP 地址，可使用加密 DNS</span></span>
<span class="line">  <span class="token key atrule">default-nameserver</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> 114.114.114.114</span>
<span class="line">    <span class="token punctuation">-</span> 8.8.8.8</span>
<span class="line">    <span class="token punctuation">-</span> tls<span class="token punctuation">:</span>//1.12.12.12<span class="token punctuation">:</span><span class="token number">853</span></span>
<span class="line">    <span class="token punctuation">-</span> tls<span class="token punctuation">:</span>//223.5.5.5<span class="token punctuation">:</span><span class="token number">853</span></span>
<span class="line">    <span class="token punctuation">-</span> system <span class="token comment"># append DNS server from system configuration. If not found, it would print an error log and skip.</span></span>
<span class="line">  <span class="token key atrule">enhanced-mode</span><span class="token punctuation">:</span> fake<span class="token punctuation">-</span>ip <span class="token comment"># or redir-host</span></span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">fake-ip-range</span><span class="token punctuation">:</span> 198.18.0.1/16 <span class="token comment"># fake-ip 池设置</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># use-hosts: true # 查询 hosts</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 配置不使用fake-ip的域名</span></span>
<span class="line">  <span class="token comment"># fake-ip-filter:</span></span>
<span class="line">  <span class="token comment">#   - &#39;*.lan&#39;</span></span>
<span class="line">  <span class="token comment">#   - localhost.ptlogin2.qq.com</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># DNS主要域名配置</span></span>
<span class="line">  <span class="token comment"># 支持 UDP，TCP，DoT，DoH，DoQ</span></span>
<span class="line">  <span class="token comment"># 这部分为主要 DNS 配置，影响所有直连，确保使用对大陆解析精准的 DNS</span></span>
<span class="line">  <span class="token key atrule">nameserver</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> 114.114.114.114 <span class="token comment"># default value</span></span>
<span class="line">    <span class="token punctuation">-</span> 8.8.8.8 <span class="token comment"># default value</span></span>
<span class="line">    <span class="token punctuation">-</span> tls<span class="token punctuation">:</span>//223.5.5.5<span class="token punctuation">:</span><span class="token number">853</span> <span class="token comment"># DNS over TLS</span></span>
<span class="line">    <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//doh.pub/dns<span class="token punctuation">-</span>query <span class="token comment"># DNS over HTTPS</span></span>
<span class="line">    <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//dns.alidns.com/dns<span class="token punctuation">-</span>query<span class="token comment">#h3=true # 强制 HTTP/3，与 perfer-h3 无关，强制开启 DoH 的 HTTP/3 支持，若不支持将无法使用</span></span>
<span class="line">    <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//mozilla.cloudflare<span class="token punctuation">-</span>dns.com/dns<span class="token punctuation">-</span>query<span class="token comment">#DNS&amp;h3=true # 指定策略组和使用 HTTP/3</span></span>
<span class="line">    <span class="token punctuation">-</span> dhcp<span class="token punctuation">:</span>//en0 <span class="token comment"># dns from dhcp</span></span>
<span class="line">    <span class="token punctuation">-</span> quic<span class="token punctuation">:</span>//dns.adguard.com<span class="token punctuation">:</span><span class="token number">784</span> <span class="token comment"># DNS over QUIC</span></span>
<span class="line">    <span class="token comment"># - &#39;8.8.8.8#en0&#39; # 兼容指定DNS出口网卡</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 当配置 fallback 时，会查询 nameserver 中返回的 IP 是否为 CN，非必要配置</span></span>
<span class="line">  <span class="token comment"># 当不是 CN，则使用 fallback 中的 DNS 查询结果</span></span>
<span class="line">  <span class="token comment"># 确保配置 fallback 时能够正常查询</span></span>
<span class="line">  <span class="token comment"># fallback:</span></span>
<span class="line">  <span class="token comment">#   - tcp://1.1.1.1</span></span>
<span class="line">  <span class="token comment">#   - &#39;tcp://1.1.1.1#ProxyGroupName&#39; # 指定 DNS 过代理查询，ProxyGroupName 为策略组名或节点名，过代理配置优先于配置出口网卡，当找不到策略组或节点名则设置为出口网卡</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 专用于节点域名解析的 DNS 服务器，非必要配置项</span></span>
<span class="line">  <span class="token comment"># 配置服务器若查询失败将使用 nameserver，非并发查询</span></span>
<span class="line">  <span class="token comment"># proxy-server-nameserver:</span></span>
<span class="line">  <span class="token comment"># - https://dns.google/dns-query</span></span>
<span class="line">  <span class="token comment"># - tls://one.one.one.one</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 配置 fallback 使用条件</span></span>
<span class="line">  <span class="token comment"># fallback-filter:</span></span>
<span class="line">  <span class="token comment">#   geoip: true # 配置是否使用 geoip</span></span>
<span class="line">  <span class="token comment">#   geoip-code: CN # 当 nameserver 域名的 IP 查询 geoip 库为 CN 时，不使用 fallback 中的 DNS 查询结果</span></span>
<span class="line">  <span class="token comment">#   配置强制 fallback，优先于 IP 判断，具体分类自行查看 geosite 库</span></span>
<span class="line">  <span class="token comment">#   geosite:</span></span>
<span class="line">  <span class="token comment">#     - gfw</span></span>
<span class="line">  <span class="token comment">#   如果不匹配 ipcidr 则使用 nameservers 中的结果</span></span>
<span class="line">  <span class="token comment">#   ipcidr:</span></span>
<span class="line">  <span class="token comment">#     - 240.0.0.0/4</span></span>
<span class="line">  <span class="token comment">#   domain:</span></span>
<span class="line">  <span class="token comment">#     - &#39;+.google.com&#39;</span></span>
<span class="line">  <span class="token comment">#     - &#39;+.facebook.com&#39;</span></span>
<span class="line">  <span class="token comment">#     - &#39;+.youtube.com&#39;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 配置查询域名使用的 DNS 服务器</span></span>
<span class="line">  <span class="token key atrule">nameserver-policy</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment">#   &#39;www.baidu.com&#39;: &#39;114.114.114.114&#39;</span></span>
<span class="line">    <span class="token comment">#   &#39;+.internal.crop.com&#39;: &#39;10.0.0.1&#39;</span></span>
<span class="line">    <span class="token key atrule">&quot;geosite:cn,private,apple&quot;</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//doh.pub/dns<span class="token punctuation">-</span>query</span>
<span class="line">      <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//dns.alidns.com/dns<span class="token punctuation">-</span>query</span>
<span class="line">    <span class="token key atrule">&quot;geosite:category-ads-all&quot;</span><span class="token punctuation">:</span> rcode<span class="token punctuation">:</span>//success</span>
<span class="line">    <span class="token key atrule">&quot;www.baidu.com,+.google.cn&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>223.5.5.5<span class="token punctuation">,</span> https<span class="token punctuation">:</span>//dns.alidns.com/dns<span class="token punctuation">-</span>query<span class="token punctuation">]</span></span>
<span class="line">    <span class="token comment">## global，dns 为 rule-providers 中的名为 global 和 dns 规则订阅，</span></span>
<span class="line">    <span class="token comment">## 且 behavior 必须为 domain/classical，当为 classical 时仅会生效域名类规则</span></span>
<span class="line">    <span class="token comment"># &quot;rule-set:global,dns&quot;: 8.8.8.8</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">proxies</span><span class="token punctuation">:</span> <span class="token comment"># socks5</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;socks&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> socks5</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token comment"># username: username</span></span>
<span class="line">    <span class="token comment"># password: password</span></span>
<span class="line">    <span class="token comment"># tls: true</span></span>
<span class="line">    <span class="token comment"># fingerprint: xxxx</span></span>
<span class="line">    <span class="token comment"># skip-cert-verify: true</span></span>
<span class="line">    <span class="token comment"># udp: true</span></span>
<span class="line">    <span class="token comment"># ip-version: ipv6</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># http</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;http&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> http</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token comment"># username: username</span></span>
<span class="line">    <span class="token comment"># password: password</span></span>
<span class="line">    <span class="token comment"># tls: true # https</span></span>
<span class="line">    <span class="token comment"># skip-cert-verify: true</span></span>
<span class="line">    <span class="token comment"># sni: custom.com</span></span>
<span class="line">    <span class="token comment"># fingerprint: xxxx # 同 experimental.fingerprints 使用 sha256 指纹，配置协议独立的指纹，将忽略 experimental.fingerprints</span></span>
<span class="line">    <span class="token comment"># ip-version: dual</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># Snell</span></span>
<span class="line">  <span class="token comment"># Beware that there&#39;s currently no UDP support yet</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;snell&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> snell</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">44046</span></span>
<span class="line">    <span class="token key atrule">psk</span><span class="token punctuation">:</span> yourpsk</span>
<span class="line">    <span class="token comment"># version: 2</span></span>
<span class="line">    <span class="token comment"># obfs-opts:</span></span>
<span class="line">    <span class="token comment"># mode: http # or tls</span></span>
<span class="line">    <span class="token comment"># host: bing.com</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># Shadowsocks</span></span>
<span class="line">  <span class="token comment"># cipher支持:</span></span>
<span class="line">  <span class="token comment">#   aes-128-gcm aes-192-gcm aes-256-gcm</span></span>
<span class="line">  <span class="token comment">#   aes-128-cfb aes-192-cfb aes-256-cfb</span></span>
<span class="line">  <span class="token comment">#   aes-128-ctr aes-192-ctr aes-256-ctr</span></span>
<span class="line">  <span class="token comment">#   rc4-md5 chacha20-ietf xchacha20</span></span>
<span class="line">  <span class="token comment">#   chacha20-ietf-poly1305 xchacha20-ietf-poly1305</span></span>
<span class="line">  <span class="token comment">#   2022-blake3-aes-128-gcm 2022-blake3-aes-256-gcm 2022-blake3-chacha20-poly1305</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;ss1&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> ss</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">cipher</span><span class="token punctuation">:</span> chacha20<span class="token punctuation">-</span>ietf<span class="token punctuation">-</span>poly1305</span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;password&quot;</span></span>
<span class="line">    <span class="token comment"># udp: true</span></span>
<span class="line">    <span class="token comment"># udp-over-tcp: false</span></span>
<span class="line">    <span class="token comment"># ip-version: ipv4 # 设置节点使用 IP 版本，可选：dual，ipv4，ipv6，ipv4-prefer，ipv6-prefer。默认使用 dual</span></span>
<span class="line">    <span class="token comment"># ipv4：仅使用 IPv4  ipv6：仅使用 IPv6</span></span>
<span class="line">    <span class="token comment"># ipv4-prefer：优先使用 IPv4 对于 TCP 会进行双栈解析，并发链接但是优先使用 IPv4 链接,</span></span>
<span class="line">    <span class="token comment"># UDP 则为双栈解析，获取结果中的第一个 IPv4</span></span>
<span class="line">    <span class="token comment"># ipv6-prefer 同 ipv4-prefer</span></span>
<span class="line">    <span class="token comment"># 现有协议都支持此参数，TCP 效果仅在开启 tcp-concurrent 生效</span></span>
<span class="line">    <span class="token key atrule">smux</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line">      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> smux <span class="token comment"># smux/yamux/h2mux</span></span>
<span class="line">      <span class="token comment"># max-connections: 4 # Maximum connections. Conflict with max-streams.</span></span>
<span class="line">      <span class="token comment"># min-streams: 4 # Minimum multiplexed streams in a connection before opening a new connection. Conflict with max-streams.</span></span>
<span class="line">      <span class="token comment"># max-streams: 0 # Maximum multiplexed streams in a connection before opening a new connection. Conflict with max-connections and min-streams.</span></span>
<span class="line">      <span class="token comment"># padding: false # Enable padding. Requires sing-box server version 1.3-beta9 or later.</span></span>
<span class="line">      <span class="token comment"># statistic: false # 控制是否将底层连接显示在面板中，方便打断底层连接</span></span>
<span class="line">      <span class="token comment"># only-tcp: false # 如果设置为true, smux的设置将不会对udp生效，udp连接会直接走底层协议</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;ss2&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> ss</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">cipher</span><span class="token punctuation">:</span> chacha20<span class="token punctuation">-</span>ietf<span class="token punctuation">-</span>poly1305</span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;password&quot;</span></span>
<span class="line">    <span class="token key atrule">plugin</span><span class="token punctuation">:</span> obfs</span>
<span class="line">    <span class="token key atrule">plugin-opts</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">mode</span><span class="token punctuation">:</span> tls <span class="token comment"># or http</span></span>
<span class="line">      <span class="token comment"># host: bing.com</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;ss3&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> ss</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">cipher</span><span class="token punctuation">:</span> chacha20<span class="token punctuation">-</span>ietf<span class="token punctuation">-</span>poly1305</span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;password&quot;</span></span>
<span class="line">    <span class="token key atrule">plugin</span><span class="token punctuation">:</span> v2ray<span class="token punctuation">-</span>plugin</span>
<span class="line">    <span class="token key atrule">plugin-opts</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">mode</span><span class="token punctuation">:</span> websocket <span class="token comment"># no QUIC now</span></span>
<span class="line">      <span class="token comment"># tls: true # wss</span></span>
<span class="line">      <span class="token comment"># 可使用 openssl x509 -noout -fingerprint -sha256 -inform pem -in yourcert.pem 获取</span></span>
<span class="line">      <span class="token comment"># 配置指纹将实现 SSL Pining 效果</span></span>
<span class="line">      <span class="token comment"># fingerprint: xxxx</span></span>
<span class="line">      <span class="token comment"># skip-cert-verify: true</span></span>
<span class="line">      <span class="token comment"># host: bing.com</span></span>
<span class="line">      <span class="token comment"># path: &quot;/&quot;</span></span>
<span class="line">      <span class="token comment"># mux: true</span></span>
<span class="line">      <span class="token comment"># headers:</span></span>
<span class="line">      <span class="token comment">#   custom: value</span></span>
<span class="line">      <span class="token comment"># v2ray-http-upgrade: false</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;ss4-shadow-tls&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> ss</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">cipher</span><span class="token punctuation">:</span> chacha20<span class="token punctuation">-</span>ietf<span class="token punctuation">-</span>poly1305</span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;password&quot;</span></span>
<span class="line">    <span class="token key atrule">plugin</span><span class="token punctuation">:</span> shadow<span class="token punctuation">-</span>tls</span>
<span class="line">    <span class="token key atrule">client-fingerprint</span><span class="token punctuation">:</span> chrome</span>
<span class="line">    <span class="token key atrule">plugin-opts</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">host</span><span class="token punctuation">:</span> <span class="token string">&quot;cloud.tencent.com&quot;</span></span>
<span class="line">      <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;shadow_tls_password&quot;</span></span>
<span class="line">      <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">2</span> <span class="token comment"># support 1/2/3</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;ss-restls-tls13&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> ss</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>YOUR_SERVER_IP<span class="token punctuation">]</span></span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">cipher</span><span class="token punctuation">:</span> chacha20<span class="token punctuation">-</span>ietf<span class="token punctuation">-</span>poly1305</span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>YOUR_SS_PASSWORD<span class="token punctuation">]</span></span>
<span class="line">    <span class="token key atrule">client-fingerprint</span><span class="token punctuation">:</span></span>
<span class="line">      chrome <span class="token comment"># One of: chrome, ios, firefox or safari</span></span>
<span class="line">      <span class="token comment"># 可以是chrome, ios, firefox, safari中的一个</span></span>
<span class="line">    <span class="token key atrule">plugin</span><span class="token punctuation">:</span> restls</span>
<span class="line">    <span class="token key atrule">plugin-opts</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">host</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token string">&quot;www.microsoft.com&quot;</span> <span class="token comment"># Must be a TLS 1.3 server</span></span>
<span class="line">        <span class="token comment"># 应当是一个TLS 1.3 服务器</span></span>
<span class="line">      <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>YOUR_RESTLS_PASSWORD<span class="token punctuation">]</span></span>
<span class="line">      <span class="token key atrule">version-hint</span><span class="token punctuation">:</span> <span class="token string">&quot;tls13&quot;</span></span>
<span class="line">      <span class="token comment"># Control your post-handshake traffic through restls-script</span></span>
<span class="line">      <span class="token comment"># Hide proxy behaviors like &quot;tls in tls&quot;.</span></span>
<span class="line">      <span class="token comment"># see https://github.com/3andne/restls/blob/main/Restls-Script:%20Hide%20Your%20Proxy%20Traffic%20Behavior.md</span></span>
<span class="line">      <span class="token comment"># 用restls剧本来控制握手后的行为，隐藏&quot;tls in tls&quot;等特征</span></span>
<span class="line">      <span class="token comment"># 详情：https://github.com/3andne/restls/blob/main/Restls-Script:%20%E9%9A%90%E8%97%8F%E4%BD%A0%E7%9A%84%E4%BB%A3%E7%90%86%E8%A1%8C%E4%B8%BA.md</span></span>
<span class="line">      <span class="token key atrule">restls-script</span><span class="token punctuation">:</span> <span class="token string">&quot;300?100&lt;1,400~100,350~100,600~100,300~200,300~100&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;ss-restls-tls12&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> ss</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>YOUR_SERVER_IP<span class="token punctuation">]</span></span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">cipher</span><span class="token punctuation">:</span> chacha20<span class="token punctuation">-</span>ietf<span class="token punctuation">-</span>poly1305</span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>YOUR_SS_PASSWORD<span class="token punctuation">]</span></span>
<span class="line">    <span class="token key atrule">client-fingerprint</span><span class="token punctuation">:</span></span>
<span class="line">      chrome <span class="token comment"># One of: chrome, ios, firefox or safari</span></span>
<span class="line">      <span class="token comment"># 可以是chrome, ios, firefox, safari中的一个</span></span>
<span class="line">    <span class="token key atrule">plugin</span><span class="token punctuation">:</span> restls</span>
<span class="line">    <span class="token key atrule">plugin-opts</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">host</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token string">&quot;vscode.dev&quot;</span> <span class="token comment"># Must be a TLS 1.2 server</span></span>
<span class="line">        <span class="token comment"># 应当是一个TLS 1.2 服务器</span></span>
<span class="line">      <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>YOUR_RESTLS_PASSWORD<span class="token punctuation">]</span></span>
<span class="line">      <span class="token key atrule">version-hint</span><span class="token punctuation">:</span> <span class="token string">&quot;tls12&quot;</span></span>
<span class="line">      <span class="token key atrule">restls-script</span><span class="token punctuation">:</span> <span class="token string">&quot;1000?100&lt;1,500~100,350~100,600~100,400~200&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># vmess</span></span>
<span class="line">  <span class="token comment"># cipher支持 auto/aes-128-gcm/chacha20-poly1305/none</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;vmess&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> vmess</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">uuid</span><span class="token punctuation">:</span> uuid</span>
<span class="line">    <span class="token key atrule">alterId</span><span class="token punctuation">:</span> <span class="token number">32</span></span>
<span class="line">    <span class="token key atrule">cipher</span><span class="token punctuation">:</span> auto</span>
<span class="line">    <span class="token comment"># udp: true</span></span>
<span class="line">    <span class="token comment"># tls: true</span></span>
<span class="line">    <span class="token comment"># fingerprint: xxxx</span></span>
<span class="line">    <span class="token comment"># client-fingerprint: chrome    # Available: &quot;chrome&quot;,&quot;firefox&quot;,&quot;safari&quot;,&quot;ios&quot;,&quot;random&quot;, currently only support TLS transport in TCP/GRPC/WS/HTTP for VLESS/Vmess and trojan.</span></span>
<span class="line">    <span class="token comment"># skip-cert-verify: true</span></span>
<span class="line">    <span class="token comment"># servername: example.com # priority over wss host</span></span>
<span class="line">    <span class="token comment"># network: ws</span></span>
<span class="line">    <span class="token comment"># ws-opts:</span></span>
<span class="line">      <span class="token comment"># path: /path</span></span>
<span class="line">      <span class="token comment"># headers:</span></span>
<span class="line">      <span class="token comment">#   Host: v2ray.com</span></span>
<span class="line">      <span class="token comment"># max-early-data: 2048</span></span>
<span class="line">      <span class="token comment"># early-data-header-name: Sec-WebSocket-Protocol</span></span>
<span class="line">      <span class="token comment"># v2ray-http-upgrade: false</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;vmess-h2&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> vmess</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">uuid</span><span class="token punctuation">:</span> uuid</span>
<span class="line">    <span class="token key atrule">alterId</span><span class="token punctuation">:</span> <span class="token number">32</span></span>
<span class="line">    <span class="token key atrule">cipher</span><span class="token punctuation">:</span> auto</span>
<span class="line">    <span class="token key atrule">network</span><span class="token punctuation">:</span> h2</span>
<span class="line">    <span class="token key atrule">tls</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token comment"># fingerprint: xxxx</span></span>
<span class="line">    <span class="token key atrule">h2-opts</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">host</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token punctuation">-</span> http.example.com</span>
<span class="line">        <span class="token punctuation">-</span> http<span class="token punctuation">-</span>alt.example.com</span>
<span class="line">      <span class="token key atrule">path</span><span class="token punctuation">:</span> /</span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;vmess-http&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> vmess</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">uuid</span><span class="token punctuation">:</span> uuid</span>
<span class="line">    <span class="token key atrule">alterId</span><span class="token punctuation">:</span> <span class="token number">32</span></span>
<span class="line">    <span class="token key atrule">cipher</span><span class="token punctuation">:</span> auto</span>
<span class="line">    <span class="token comment"># udp: true</span></span>
<span class="line">    <span class="token comment"># network: http</span></span>
<span class="line">    <span class="token comment"># http-opts:</span></span>
<span class="line">    <span class="token comment">#   method: &quot;GET&quot;</span></span>
<span class="line">    <span class="token comment">#   path:</span></span>
<span class="line">    <span class="token comment">#     - &#39;/&#39;</span></span>
<span class="line">    <span class="token comment">#     - &#39;/video&#39;</span></span>
<span class="line">    <span class="token comment">#   headers:</span></span>
<span class="line">    <span class="token comment">#     Connection:</span></span>
<span class="line">    <span class="token comment">#       - keep-alive</span></span>
<span class="line">    <span class="token comment"># ip-version: ipv4 # 设置使用 IP 类型偏好，可选：ipv4，ipv6，dual，默认值：dual</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vmess<span class="token punctuation">-</span>grpc</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> vmess</span>
<span class="line">    <span class="token key atrule">uuid</span><span class="token punctuation">:</span> uuid</span>
<span class="line">    <span class="token key atrule">alterId</span><span class="token punctuation">:</span> <span class="token number">32</span></span>
<span class="line">    <span class="token key atrule">cipher</span><span class="token punctuation">:</span> auto</span>
<span class="line">    <span class="token key atrule">network</span><span class="token punctuation">:</span> grpc</span>
<span class="line">    <span class="token key atrule">tls</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token comment"># fingerprint: xxxx</span></span>
<span class="line">    <span class="token key atrule">servername</span><span class="token punctuation">:</span> example.com</span>
<span class="line">    <span class="token comment"># skip-cert-verify: true</span></span>
<span class="line">    <span class="token key atrule">grpc-opts</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">grpc-service-name</span><span class="token punctuation">:</span> <span class="token string">&quot;example&quot;</span></span>
<span class="line">    <span class="token comment"># ip-version: ipv4</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># vless</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;vless-tcp&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> vless</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">uuid</span><span class="token punctuation">:</span> uuid</span>
<span class="line">    <span class="token key atrule">network</span><span class="token punctuation">:</span> tcp</span>
<span class="line">    <span class="token key atrule">servername</span><span class="token punctuation">:</span> example.com <span class="token comment"># AKA SNI</span></span>
<span class="line">    <span class="token comment"># flow: xtls-rprx-direct # xtls-rprx-origin  # enable XTLS</span></span>
<span class="line">    <span class="token comment"># skip-cert-verify: true</span></span>
<span class="line">    <span class="token comment"># fingerprint: xxxx</span></span>
<span class="line">    <span class="token comment"># client-fingerprint: random # Available: &quot;chrome&quot;,&quot;firefox&quot;,&quot;safari&quot;,&quot;random&quot;,&quot;none&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;vless-vision&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> vless</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">uuid</span><span class="token punctuation">:</span> uuid</span>
<span class="line">    <span class="token key atrule">network</span><span class="token punctuation">:</span> tcp</span>
<span class="line">    <span class="token key atrule">tls</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">udp</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">flow</span><span class="token punctuation">:</span> xtls<span class="token punctuation">-</span>rprx<span class="token punctuation">-</span>vision</span>
<span class="line">    <span class="token key atrule">client-fingerprint</span><span class="token punctuation">:</span> chrome</span>
<span class="line">    <span class="token comment"># fingerprint: xxxx</span></span>
<span class="line">    <span class="token comment"># skip-cert-verify: true</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;vless-reality-vision&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> vless</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">uuid</span><span class="token punctuation">:</span> uuid</span>
<span class="line">    <span class="token key atrule">network</span><span class="token punctuation">:</span> tcp</span>
<span class="line">    <span class="token key atrule">tls</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">udp</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">flow</span><span class="token punctuation">:</span> xtls<span class="token punctuation">-</span>rprx<span class="token punctuation">-</span>vision</span>
<span class="line">    <span class="token key atrule">servername</span><span class="token punctuation">:</span> www.microsoft.com <span class="token comment"># REALITY servername</span></span>
<span class="line">    <span class="token key atrule">reality-opts</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">public-key</span><span class="token punctuation">:</span> xxx</span>
<span class="line">      <span class="token key atrule">short-id</span><span class="token punctuation">:</span> xxx <span class="token comment"># optional</span></span>
<span class="line">    <span class="token key atrule">client-fingerprint</span><span class="token punctuation">:</span> chrome <span class="token comment"># cannot be empty</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;vless-reality-grpc&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> vless</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">uuid</span><span class="token punctuation">:</span> uuid</span>
<span class="line">    <span class="token key atrule">network</span><span class="token punctuation">:</span> grpc</span>
<span class="line">    <span class="token key atrule">tls</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">udp</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">flow</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment"># skip-cert-verify: true</span></span>
<span class="line">    <span class="token key atrule">client-fingerprint</span><span class="token punctuation">:</span> chrome</span>
<span class="line">    <span class="token key atrule">servername</span><span class="token punctuation">:</span> testingcf.jsdelivr.net</span>
<span class="line">    <span class="token key atrule">grpc-opts</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">grpc-service-name</span><span class="token punctuation">:</span> <span class="token string">&quot;grpc&quot;</span></span>
<span class="line">    <span class="token key atrule">reality-opts</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">public-key</span><span class="token punctuation">:</span> CrrQSjAG_YkHLwvM2M<span class="token punctuation">-</span>7XkKJilgL5upBKCp0od0tLhE</span>
<span class="line">      <span class="token key atrule">short-id</span><span class="token punctuation">:</span> 10f897e26c4b9478</span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;vless-ws&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> vless</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">uuid</span><span class="token punctuation">:</span> uuid</span>
<span class="line">    <span class="token key atrule">udp</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">tls</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">network</span><span class="token punctuation">:</span> ws</span>
<span class="line">    <span class="token comment"># client-fingerprint: random # Available: &quot;chrome&quot;,&quot;firefox&quot;,&quot;safari&quot;,&quot;random&quot;,&quot;none&quot;</span></span>
<span class="line">    <span class="token key atrule">servername</span><span class="token punctuation">:</span> example.com <span class="token comment"># priority over wss host</span></span>
<span class="line">    <span class="token comment"># skip-cert-verify: true</span></span>
<span class="line">    <span class="token comment"># fingerprint: xxxx</span></span>
<span class="line">    <span class="token key atrule">ws-opts</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">&quot;/&quot;</span></span>
<span class="line">      <span class="token key atrule">headers</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">Host</span><span class="token punctuation">:</span> example.com</span>
<span class="line">      <span class="token comment"># v2ray-http-upgrade: false</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># Trojan</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;trojan&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> trojan</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> yourpsk</span>
<span class="line">    <span class="token comment"># client-fingerprint: random # Available: &quot;chrome&quot;,&quot;firefox&quot;,&quot;safari&quot;,&quot;random&quot;,&quot;none&quot;</span></span>
<span class="line">    <span class="token comment"># fingerprint: xxxx</span></span>
<span class="line">    <span class="token comment"># udp: true</span></span>
<span class="line">    <span class="token comment"># sni: example.com # aka server name</span></span>
<span class="line">    <span class="token comment"># alpn:</span></span>
<span class="line">    <span class="token comment">#   - h2</span></span>
<span class="line">    <span class="token comment">#   - http/1.1</span></span>
<span class="line">    <span class="token comment"># skip-cert-verify: true</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> trojan<span class="token punctuation">-</span>grpc</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> trojan</span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;example&quot;</span></span>
<span class="line">    <span class="token key atrule">network</span><span class="token punctuation">:</span> grpc</span>
<span class="line">    <span class="token key atrule">sni</span><span class="token punctuation">:</span> example.com</span>
<span class="line">    <span class="token comment"># skip-cert-verify: true</span></span>
<span class="line">    <span class="token comment"># fingerprint: xxxx</span></span>
<span class="line">    <span class="token key atrule">udp</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">grpc-opts</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">grpc-service-name</span><span class="token punctuation">:</span> <span class="token string">&quot;example&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> trojan<span class="token punctuation">-</span>ws</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> trojan</span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;example&quot;</span></span>
<span class="line">    <span class="token key atrule">network</span><span class="token punctuation">:</span> ws</span>
<span class="line">    <span class="token key atrule">sni</span><span class="token punctuation">:</span> example.com</span>
<span class="line">    <span class="token comment"># skip-cert-verify: true</span></span>
<span class="line">    <span class="token comment"># fingerprint: xxxx</span></span>
<span class="line">    <span class="token key atrule">udp</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token comment"># ws-opts:</span></span>
<span class="line">    <span class="token comment">#   path: /path</span></span>
<span class="line">    <span class="token comment">#   headers:</span></span>
<span class="line">    <span class="token comment">#     Host: example.com</span></span>
<span class="line">    <span class="token comment">#   v2ray-http-upgrade: false</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;trojan-xtls&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> trojan</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> yourpsk</span>
<span class="line">    <span class="token key atrule">flow</span><span class="token punctuation">:</span> <span class="token string">&quot;xtls-rprx-direct&quot;</span> <span class="token comment"># xtls-rprx-origin xtls-rprx-direct</span></span>
<span class="line">    <span class="token key atrule">flow-show</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token comment"># udp: true</span></span>
<span class="line">    <span class="token comment"># sni: example.com # aka server name</span></span>
<span class="line">    <span class="token comment"># skip-cert-verify: true</span></span>
<span class="line">    <span class="token comment"># fingerprint: xxxx</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">#hysteria</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;hysteria&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> hysteria</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server.com</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token comment"># ports: 1000,2000-3000,5000 # port 不可省略</span></span>
<span class="line">    <span class="token key atrule">auth-str</span><span class="token punctuation">:</span> yourpassword</span>
<span class="line">    <span class="token comment"># obfs: obfs_str</span></span>
<span class="line">    <span class="token comment"># alpn:</span></span>
<span class="line">    <span class="token comment">#   - h3</span></span>
<span class="line">    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> udp <span class="token comment"># 支持 udp/wechat-video/faketcp</span></span>
<span class="line">    <span class="token key atrule">up</span><span class="token punctuation">:</span> <span class="token string">&quot;30 Mbps&quot;</span> <span class="token comment"># 若不写单位，默认为 Mbps</span></span>
<span class="line">    <span class="token key atrule">down</span><span class="token punctuation">:</span> <span class="token string">&quot;200 Mbps&quot;</span> <span class="token comment"># 若不写单位，默认为 Mbps</span></span>
<span class="line">    <span class="token comment"># sni: server.com</span></span>
<span class="line">    <span class="token comment"># skip-cert-verify: false</span></span>
<span class="line">    <span class="token comment"># recv-window-conn: 12582912</span></span>
<span class="line">    <span class="token comment"># recv-window: 52428800</span></span>
<span class="line">    <span class="token comment"># ca: &quot;./my.ca&quot;</span></span>
<span class="line">    <span class="token comment"># ca-str: &quot;xyz&quot;</span></span>
<span class="line">    <span class="token comment"># disable-mtu-discovery: false</span></span>
<span class="line">    <span class="token comment"># fingerprint: xxxx</span></span>
<span class="line">    <span class="token comment"># fast-open: true # 支持 TCP 快速打开，默认为 false</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">#hysteria2</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;hysteria2&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> hysteria2</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server.com</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token comment">#  up和down均不写或为0则使用BBR流控</span></span>
<span class="line">    <span class="token comment"># up: &quot;30 Mbps&quot; # 若不写单位，默认为 Mbps</span></span>
<span class="line">    <span class="token comment"># down: &quot;200 Mbps&quot; # 若不写单位，默认为 Mbps</span></span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> yourpassword</span>
<span class="line">    <span class="token comment"># obfs: salamander # 默认为空，如果填写则开启obfs，目前仅支持salamander</span></span>
<span class="line">    <span class="token comment"># obfs-password: yourpassword</span></span>
<span class="line">    <span class="token comment"># sni: server.com</span></span>
<span class="line">    <span class="token comment"># skip-cert-verify: false</span></span>
<span class="line">    <span class="token comment"># fingerprint: xxxx</span></span>
<span class="line">    <span class="token comment"># alpn:</span></span>
<span class="line">    <span class="token comment">#   - h3</span></span>
<span class="line">    <span class="token comment"># ca: &quot;./my.ca&quot;</span></span>
<span class="line">    <span class="token comment"># ca-str: &quot;xyz&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># wireguard</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;wg&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> wireguard</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> 162.159.192.1</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">2480</span></span>
<span class="line">    <span class="token key atrule">ip</span><span class="token punctuation">:</span> 172.16.0.2</span>
<span class="line">    <span class="token key atrule">ipv6</span><span class="token punctuation">:</span> fd01<span class="token punctuation">:</span>5ca1<span class="token punctuation">:</span>ab1e<span class="token punctuation">:</span>80fa<span class="token punctuation">:</span>ab85<span class="token punctuation">:</span>6eea<span class="token punctuation">:</span>213f<span class="token punctuation">:</span>f4a5</span>
<span class="line">    <span class="token key atrule">public-key</span><span class="token punctuation">:</span> Cr8hWlKvtDt7nrvf+f0brNQQzabAqrjfBvas9pmowjo=</span>
<span class="line">    <span class="token comment">#    pre-shared-key: 31aIhAPwktDGpH4JDhA8GNvjFXEf/a6+UaQRyOAiyfM=</span></span>
<span class="line">    <span class="token key atrule">private-key</span><span class="token punctuation">:</span> eCtXsJZ27+4PbhDkHnB923tkUn2Gj59wZw5wFA75MnU=</span>
<span class="line">    <span class="token key atrule">udp</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">reserved</span><span class="token punctuation">:</span> <span class="token string">&quot;U4An&quot;</span></span>
<span class="line">    <span class="token comment"># 数组格式也是合法的</span></span>
<span class="line">    <span class="token comment"># reserved: [209,98,59]</span></span>
<span class="line">    <span class="token comment"># 一个出站代理的标识。当值不为空时，将使用指定的 proxy 发出连接</span></span>
<span class="line">    <span class="token comment"># dialer-proxy: &quot;ss1&quot;</span></span>
<span class="line">    <span class="token comment"># remote-dns-resolve: true # 强制dns远程解析，默认值为false</span></span>
<span class="line">    <span class="token comment"># dns: [ 1.1.1.1, 8.8.8.8 ] # 仅在remote-dns-resolve为true时生效</span></span>
<span class="line">    <span class="token comment"># 如果peers不为空，该段落中的allowed-ips不可为空；前面段落的server,port,ip,ipv6,public-key,pre-shared-key均会被忽略，但private-key会被保留且只能在顶层指定</span></span>
<span class="line">    <span class="token comment"># peers:</span></span>
<span class="line">    <span class="token comment">#   - server: 162.159.192.1</span></span>
<span class="line">    <span class="token comment">#     port: 2480</span></span>
<span class="line">    <span class="token comment">#     ip: 172.16.0.2</span></span>
<span class="line">    <span class="token comment">#     ipv6: fd01:5ca1:ab1e:80fa:ab85:6eea:213f:f4a5</span></span>
<span class="line">    <span class="token comment">#     public-key: Cr8hWlKvtDt7nrvf+f0brNQQzabAqrjfBvas9pmowjo=</span></span>
<span class="line">    <span class="token comment">#     # pre-shared-key: 31aIhAPwktDGpH4JDhA8GNvjFXEf/a6+UaQRyOAiyfM=</span></span>
<span class="line">    <span class="token comment">#     allowed-ips: [&#39;0.0.0.0/0&#39;]</span></span>
<span class="line">    <span class="token comment">#     reserved: [209,98,59]</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># tuic</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tuic</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> www.example.com</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">10443</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> tuic</span>
<span class="line">    <span class="token comment"># tuicV4必须填写token （不可同时填写uuid和password）</span></span>
<span class="line">    <span class="token key atrule">token</span><span class="token punctuation">:</span> TOKEN</span>
<span class="line">    <span class="token comment"># tuicV5必须填写uuid和password（不可同时填写token）</span></span>
<span class="line">    <span class="token key atrule">uuid</span><span class="token punctuation">:</span> 00000000<span class="token punctuation">-</span>0000<span class="token punctuation">-</span>0000<span class="token punctuation">-</span>0000<span class="token punctuation">-</span><span class="token number">000000000001</span></span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> PASSWORD_1</span>
<span class="line">    <span class="token comment"># ip: 127.0.0.1 # for overwriting the DNS lookup result of the server address set in option &#39;server&#39;</span></span>
<span class="line">    <span class="token comment"># heartbeat-interval: 10000</span></span>
<span class="line">    <span class="token comment"># alpn: [h3]</span></span>
<span class="line">    <span class="token key atrule">disable-sni</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">reduce-rtt</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">request-timeout</span><span class="token punctuation">:</span> <span class="token number">8000</span></span>
<span class="line">    <span class="token key atrule">udp-relay-mode</span><span class="token punctuation">:</span> native <span class="token comment"># Available: &quot;native&quot;, &quot;quic&quot;. Default: &quot;native&quot;</span></span>
<span class="line">    <span class="token comment"># congestion-controller: bbr # Available: &quot;cubic&quot;, &quot;new_reno&quot;, &quot;bbr&quot;. Default: &quot;cubic&quot;</span></span>
<span class="line">    <span class="token comment"># cwnd: 10 # default: 32</span></span>
<span class="line">    <span class="token comment"># max-udp-relay-packet-size: 1500</span></span>
<span class="line">    <span class="token comment"># fast-open: true</span></span>
<span class="line">    <span class="token comment"># skip-cert-verify: true</span></span>
<span class="line">    <span class="token comment"># max-open-streams: 20 # default 100, too many open streams may hurt performance</span></span>
<span class="line">    <span class="token comment"># sni: example.com</span></span>
<span class="line">    <span class="token comment">#</span></span>
<span class="line">    <span class="token comment"># meta和sing-box私有扩展，将ss-uot用于udp中继，开启此选项后udp-relay-mode将失效</span></span>
<span class="line">    <span class="token comment"># 警告，与原版tuic不兼容！！！</span></span>
<span class="line">    <span class="token comment"># udp-over-stream: false</span></span>
<span class="line">    <span class="token comment"># udp-over-stream-version: 1</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># ShadowsocksR</span></span>
<span class="line">  <span class="token comment"># The supported ciphers (encryption methods): all stream ciphers in ss</span></span>
<span class="line">  <span class="token comment"># The supported obfses:</span></span>
<span class="line">  <span class="token comment">#   plain http_simple http_post</span></span>
<span class="line">  <span class="token comment">#   random_head tls1.2_ticket_auth tls1.2_ticket_fastauth</span></span>
<span class="line">  <span class="token comment"># The supported protocols:</span></span>
<span class="line">  <span class="token comment">#   origin auth_sha1_v4 auth_aes128_md5</span></span>
<span class="line">  <span class="token comment">#   auth_aes128_sha1 auth_chain_a auth_chain_b</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;ssr&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> ssr</span>
<span class="line">    <span class="token key atrule">server</span><span class="token punctuation">:</span> server</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span></span>
<span class="line">    <span class="token key atrule">cipher</span><span class="token punctuation">:</span> chacha20<span class="token punctuation">-</span>ietf</span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;password&quot;</span></span>
<span class="line">    <span class="token key atrule">obfs</span><span class="token punctuation">:</span> tls1.2_ticket_auth</span>
<span class="line">    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> auth_sha1_v4</span>
<span class="line">    <span class="token comment"># obfs-param: domain.tld</span></span>
<span class="line">    <span class="token comment"># protocol-param: &quot;#&quot;</span></span>
<span class="line">    <span class="token comment"># udp: true</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">proxy-groups</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 代理链，目前relay可以支持udp的只有vmess/vless/trojan/ss/ssr/tuic</span></span>
<span class="line">  <span class="token comment"># wireguard目前不支持在relay中使用，请使用proxy中的dialer-proxy配置项</span></span>
<span class="line">  <span class="token comment"># Traffic: mihomo &lt;-&gt; http &lt;-&gt; vmess &lt;-&gt; ss1 &lt;-&gt; ss2 &lt;-&gt; Internet</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;relay&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> relay</span>
<span class="line">    <span class="token key atrule">proxies</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> http</span>
<span class="line">      <span class="token punctuation">-</span> vmess</span>
<span class="line">      <span class="token punctuation">-</span> ss1</span>
<span class="line">      <span class="token punctuation">-</span> ss2</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># url-test 将按照 url 测试结果使用延迟最低节点</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;auto&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> url<span class="token punctuation">-</span>test</span>
<span class="line">    <span class="token key atrule">proxies</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> ss1</span>
<span class="line">      <span class="token punctuation">-</span> ss2</span>
<span class="line">      <span class="token punctuation">-</span> vmess1</span>
<span class="line">    <span class="token comment"># tolerance: 150</span></span>
<span class="line">    <span class="token comment"># lazy: true</span></span>
<span class="line">    <span class="token comment"># expected-status: 204 # 当健康检查返回状态码与期望值不符时，认为节点不可用</span></span>
<span class="line">    <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">&quot;https://cp.cloudflare.com/generate_204&quot;</span></span>
<span class="line">    <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">300</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># fallback 将按照 url 测试结果按照节点顺序选择</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;fallback-auto&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> fallback</span>
<span class="line">    <span class="token key atrule">proxies</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> ss1</span>
<span class="line">      <span class="token punctuation">-</span> ss2</span>
<span class="line">      <span class="token punctuation">-</span> vmess1</span>
<span class="line">    <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">&quot;https://cp.cloudflare.com/generate_204&quot;</span></span>
<span class="line">    <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">300</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># load-balance 将按照算法随机选择节点</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;load-balance&quot;</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> load<span class="token punctuation">-</span>balance</span>
<span class="line">    <span class="token key atrule">proxies</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> ss1</span>
<span class="line">      <span class="token punctuation">-</span> ss2</span>
<span class="line">      <span class="token punctuation">-</span> vmess1</span>
<span class="line">    <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">&quot;https://cp.cloudflare.com/generate_204&quot;</span></span>
<span class="line">    <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">300</span></span>
<span class="line">  <span class="token comment"># strategy: consistent-hashing # 可选 round-robin 和 sticky-sessions</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># select 用户自行选择节点</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Proxy</span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> select</span>
<span class="line">    <span class="token comment"># disable-udp: true</span></span>
<span class="line">    <span class="token key atrule">proxies</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> ss1</span>
<span class="line">      <span class="token punctuation">-</span> ss2</span>
<span class="line">      <span class="token punctuation">-</span> vmess1</span>
<span class="line">      <span class="token punctuation">-</span> auto</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 配置指定 interface-name 和 fwmark 的 DIRECT</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> en1</span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> select</span>
<span class="line">    <span class="token key atrule">interface-name</span><span class="token punctuation">:</span> en1</span>
<span class="line">    <span class="token key atrule">routing-mark</span><span class="token punctuation">:</span> <span class="token number">6667</span></span>
<span class="line">    <span class="token key atrule">proxies</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> DIRECT</span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> UseProvider</span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> select</span>
<span class="line">    <span class="token key atrule">filter</span><span class="token punctuation">:</span> <span class="token string">&quot;HK|TW&quot;</span> <span class="token comment"># 正则表达式，过滤 provider1 中节点名包含 HK 或 TW</span></span>
<span class="line">    <span class="token key atrule">use</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> provider1</span>
<span class="line">    <span class="token key atrule">proxies</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> Proxy</span>
<span class="line">      <span class="token punctuation">-</span> DIRECT</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Mihomo 格式的节点或支持 *ray 的分享格式</span></span>
<span class="line"><span class="token key atrule">proxy-providers</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">provider1</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> http <span class="token comment"># http 的 path 可空置,默认储存路径为 homedir的proxies文件夹,文件名为url的md5</span></span>
<span class="line">    <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">&quot;url&quot;</span></span>
<span class="line">    <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">3600</span></span>
<span class="line">    <span class="token key atrule">path</span><span class="token punctuation">:</span> ./provider1.yaml <span class="token comment"># 默认只允许存储在 mihomo 的 Home Dir，如果想存储到任意位置，添加环境变量 SKIP_SAFE_PATH_CHECK=1</span></span>
<span class="line">    <span class="token key atrule">health-check</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">      <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">600</span></span>
<span class="line">      <span class="token comment"># lazy: true</span></span>
<span class="line">      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//cp.cloudflare.com/generate_204</span>
<span class="line">      <span class="token comment"># expected-status: 204 # 当健康检查返回状态码与期望值不符时，认为节点不可用</span></span>
<span class="line">    <span class="token key atrule">override</span><span class="token punctuation">:</span> <span class="token comment"># 覆写节点加载时的一些配置项</span></span>
<span class="line">      <span class="token key atrule">skip-cert-verify</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">      <span class="token key atrule">udp</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">      <span class="token comment"># down: &quot;50 Mbps&quot;</span></span>
<span class="line">      <span class="token comment"># up: &quot;10 Mbps&quot;</span></span>
<span class="line">      <span class="token comment"># dialer-proxy: proxy</span></span>
<span class="line">      <span class="token comment"># interface-name: tailscale0</span></span>
<span class="line">      <span class="token comment"># routing-mark: 233</span></span>
<span class="line">      <span class="token comment"># ip-version: ipv4-prefer</span></span>
<span class="line">  <span class="token key atrule">test</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> file</span>
<span class="line">    <span class="token key atrule">path</span><span class="token punctuation">:</span> /test.yaml</span>
<span class="line">    <span class="token key atrule">health-check</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">      <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">36000</span></span>
<span class="line">      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//cp.cloudflare.com/generate_204</span>
<span class="line"><span class="token key atrule">rule-providers</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">rule1</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">behavior</span><span class="token punctuation">:</span> classical <span class="token comment"># domain ipcidr</span></span>
<span class="line">    <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">259200</span></span>
<span class="line">    <span class="token key atrule">path</span><span class="token punctuation">:</span> /path/to/save/file.yaml <span class="token comment"># 默认只允许存储在 mihomo 的 Home Dir，如果想存储到任意位置，添加环境变量 SKIP_SAFE_PATH_CHECK=1</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> http <span class="token comment"># http 的 path 可空置,默认储存路径为 homedir的rules文件夹,文件名为url的md5</span></span>
<span class="line">    <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">&quot;url&quot;</span></span>
<span class="line">  <span class="token key atrule">rule2</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">behavior</span><span class="token punctuation">:</span> classical</span>
<span class="line">    <span class="token key atrule">interval</span><span class="token punctuation">:</span> <span class="token number">259200</span></span>
<span class="line">    <span class="token key atrule">path</span><span class="token punctuation">:</span> /path/to/save/file.yaml</span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> file</span>
<span class="line"><span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> RULE<span class="token punctuation">-</span>SET<span class="token punctuation">,</span>rule1<span class="token punctuation">,</span>REJECT</span>
<span class="line">  <span class="token punctuation">-</span> DOMAIN<span class="token punctuation">-</span>SUFFIX<span class="token punctuation">,</span>baidu.com<span class="token punctuation">,</span>DIRECT</span>
<span class="line">  <span class="token punctuation">-</span> DOMAIN<span class="token punctuation">-</span>KEYWORD<span class="token punctuation">,</span>google<span class="token punctuation">,</span>ss1</span>
<span class="line">  <span class="token punctuation">-</span> IP<span class="token punctuation">-</span>CIDR<span class="token punctuation">,</span>1.1.1.1/32<span class="token punctuation">,</span>ss1</span>
<span class="line">  <span class="token punctuation">-</span> IP<span class="token punctuation">-</span>CIDR6<span class="token punctuation">,</span>2409<span class="token punctuation">:</span><span class="token punctuation">:</span>/64<span class="token punctuation">,</span>DIRECT</span>
<span class="line">  <span class="token comment"># 当满足条件是 TCP 或 UDP 流量时，使用名为 sub-rule-name1 的规则集</span></span>
<span class="line">  <span class="token punctuation">-</span> SUB<span class="token punctuation">-</span>RULE<span class="token punctuation">,</span>(OR<span class="token punctuation">,</span>((NETWORK<span class="token punctuation">,</span>TCP)<span class="token punctuation">,</span>(NETWORK<span class="token punctuation">,</span>UDP)))<span class="token punctuation">,</span>sub<span class="token punctuation">-</span>rule<span class="token punctuation">-</span>name1</span>
<span class="line">  <span class="token punctuation">-</span> SUB<span class="token punctuation">-</span>RULE<span class="token punctuation">,</span>(AND<span class="token punctuation">,</span>((NETWORK<span class="token punctuation">,</span>UDP)))<span class="token punctuation">,</span>sub<span class="token punctuation">-</span>rule<span class="token punctuation">-</span>name2</span>
<span class="line"><span class="token comment"># 定义多个子规则集，规则将以分叉匹配，使用 SUB-RULE 使用</span></span>
<span class="line"><span class="token comment">#                                               google.com(not match)--&gt; baidu.com(match)</span></span>
<span class="line"><span class="token comment">#                                                /                                ｜</span></span>
<span class="line"><span class="token comment">#                                               /                                 ｜</span></span>
<span class="line"><span class="token comment">#  https://baidu.com  --&gt; rule1 --&gt; rule2 --&gt; sub-rule-name1(match tcp)          使用 DIRECT</span></span>
<span class="line"><span class="token comment">#</span></span>
<span class="line"><span class="token comment">#</span></span>
<span class="line"><span class="token comment">#                                              google.com(not match)--&gt; baidu.com(not match)</span></span>
<span class="line"><span class="token comment">#                                                /                            ｜</span></span>
<span class="line"><span class="token comment">#                                               /                             ｜</span></span>
<span class="line"><span class="token comment">#  dns 1.1.1.1  --&gt; rule1 --&gt; rule2 --&gt; sub-rule-name1(match udp)         sub-rule-name2(match udp)</span></span>
<span class="line"><span class="token comment">#                                                                             ｜</span></span>
<span class="line"><span class="token comment">#                                                                             ｜</span></span>
<span class="line"><span class="token comment">#                                                                 使用 REJECT &lt;-- 1.1.1.1/32(match)</span></span>
<span class="line"><span class="token comment">#</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">sub-rules</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">sub-rule-name1</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> DOMAIN<span class="token punctuation">,</span>google.com<span class="token punctuation">,</span>ss1</span>
<span class="line">    <span class="token punctuation">-</span> DOMAIN<span class="token punctuation">,</span>baidu.com<span class="token punctuation">,</span>DIRECT</span>
<span class="line">  <span class="token key atrule">sub-rule-name2</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> IP<span class="token punctuation">-</span>CIDR<span class="token punctuation">,</span>1.1.1.1/32<span class="token punctuation">,</span>REJECT</span>
<span class="line">    <span class="token punctuation">-</span> IP<span class="token punctuation">-</span>CIDR<span class="token punctuation">,</span>8.8.8.8/32<span class="token punctuation">,</span>ss1</span>
<span class="line">    <span class="token punctuation">-</span> DOMAIN<span class="token punctuation">,</span>dns.alidns.com<span class="token punctuation">,</span>REJECT</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 流量入站</span></span>
<span class="line"><span class="token key atrule">listeners</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> socks5<span class="token punctuation">-</span>in<span class="token punctuation">-</span><span class="token number">1</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> socks</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">10808</span></span>
<span class="line">    <span class="token comment">#listen: 0.0.0.0 # 默认监听 0.0.0.0</span></span>
<span class="line">    <span class="token comment"># rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules</span></span>
<span class="line">    <span class="token comment"># proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理</span></span>
<span class="line">    <span class="token comment"># udp: false # 默认 true</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http<span class="token punctuation">-</span>in<span class="token punctuation">-</span><span class="token number">1</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> http</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">10809</span></span>
<span class="line">    <span class="token key atrule">listen</span><span class="token punctuation">:</span> 0.0.0.0</span>
<span class="line">    <span class="token comment"># rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules</span></span>
<span class="line">    <span class="token comment"># proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mixed<span class="token punctuation">-</span>in<span class="token punctuation">-</span><span class="token number">1</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> mixed <span class="token comment">#  HTTP(S) 和 SOCKS 代理混合</span></span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">10810</span></span>
<span class="line">    <span class="token key atrule">listen</span><span class="token punctuation">:</span> 0.0.0.0</span>
<span class="line">    <span class="token comment"># rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules</span></span>
<span class="line">    <span class="token comment"># proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)</span></span>
<span class="line">    <span class="token comment"># udp: false # 默认 true</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> reidr<span class="token punctuation">-</span>in<span class="token punctuation">-</span><span class="token number">1</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> redir</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">10811</span></span>
<span class="line">    <span class="token key atrule">listen</span><span class="token punctuation">:</span> 0.0.0.0</span>
<span class="line">    <span class="token comment"># rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules</span></span>
<span class="line">    <span class="token comment"># proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tproxy<span class="token punctuation">-</span>in<span class="token punctuation">-</span><span class="token number">1</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> tproxy</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">10812</span></span>
<span class="line">    <span class="token key atrule">listen</span><span class="token punctuation">:</span> 0.0.0.0</span>
<span class="line">    <span class="token comment"># rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules</span></span>
<span class="line">    <span class="token comment"># proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)</span></span>
<span class="line">    <span class="token comment"># udp: false # 默认 true</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> shadowsocks<span class="token punctuation">-</span>in<span class="token punctuation">-</span><span class="token number">1</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> shadowsocks</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">10813</span></span>
<span class="line">    <span class="token key atrule">listen</span><span class="token punctuation">:</span> 0.0.0.0</span>
<span class="line">    <span class="token comment"># rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules</span></span>
<span class="line">    <span class="token comment"># proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)</span></span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> vlmpIPSyHH6f4S8WVPdRIHIlzmB+GIRfoH3aNJ/t9Gg=</span>
<span class="line">    <span class="token key atrule">cipher</span><span class="token punctuation">:</span> 2022<span class="token punctuation">-</span>blake3<span class="token punctuation">-</span>aes<span class="token punctuation">-</span>256<span class="token punctuation">-</span>gcm</span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vmess<span class="token punctuation">-</span>in<span class="token punctuation">-</span><span class="token number">1</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> vmess</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">10814</span></span>
<span class="line">    <span class="token key atrule">listen</span><span class="token punctuation">:</span> 0.0.0.0</span>
<span class="line">    <span class="token comment"># rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules</span></span>
<span class="line">    <span class="token comment"># proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)</span></span>
<span class="line">    <span class="token key atrule">users</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">username</span><span class="token punctuation">:</span> <span class="token number">1</span></span>
<span class="line">        <span class="token key atrule">uuid</span><span class="token punctuation">:</span> 9d0cb9d0<span class="token punctuation">-</span>964f<span class="token punctuation">-</span>4ef6<span class="token punctuation">-</span>897d<span class="token punctuation">-</span>6c6b3ccf9e68</span>
<span class="line">        <span class="token key atrule">alterId</span><span class="token punctuation">:</span> <span class="token number">1</span></span>
<span class="line">    <span class="token comment"># ws-path: &quot;/&quot; # 如果不为空则开启websocket传输层</span></span>
<span class="line">    <span class="token comment"># 下面两项如果填写则开启tls（需要同时填写）</span></span>
<span class="line">    <span class="token comment"># certificate: ./server.crt</span></span>
<span class="line">    <span class="token comment"># private-key: ./server.key</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tuic<span class="token punctuation">-</span>in<span class="token punctuation">-</span><span class="token number">1</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> tuic</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">10815</span></span>
<span class="line">    <span class="token key atrule">listen</span><span class="token punctuation">:</span> 0.0.0.0</span>
<span class="line">    <span class="token comment"># rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules</span></span>
<span class="line">    <span class="token comment"># proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)</span></span>
<span class="line">    <span class="token comment"># token:    # tuicV4填写（可以同时填写users）</span></span>
<span class="line">    <span class="token comment">#   - TOKEN</span></span>
<span class="line">    <span class="token comment"># users:    # tuicV5填写（可以同时填写token）</span></span>
<span class="line">    <span class="token comment">#   00000000-0000-0000-0000-000000000000: PASSWORD_0</span></span>
<span class="line">    <span class="token comment">#   00000000-0000-0000-0000-000000000001: PASSWORD_1</span></span>
<span class="line">    <span class="token comment">#  certificate: ./server.crt</span></span>
<span class="line">    <span class="token comment">#  private-key: ./server.key</span></span>
<span class="line">    <span class="token comment">#  congestion-controller: bbr</span></span>
<span class="line">    <span class="token comment">#  max-idle-time: 15000</span></span>
<span class="line">    <span class="token comment">#  authentication-timeout: 1000</span></span>
<span class="line">    <span class="token comment">#  alpn:</span></span>
<span class="line">    <span class="token comment">#    - h3</span></span>
<span class="line">    <span class="token comment">#  max-udp-relay-packet-size: 1500</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tunnel<span class="token punctuation">-</span>in<span class="token punctuation">-</span><span class="token number">1</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> tunnel</span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">10816</span></span>
<span class="line">    <span class="token key atrule">listen</span><span class="token punctuation">:</span> 0.0.0.0</span>
<span class="line">    <span class="token comment"># rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules</span></span>
<span class="line">    <span class="token comment"># proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)</span></span>
<span class="line">    <span class="token key atrule">network</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>tcp<span class="token punctuation">,</span> udp<span class="token punctuation">]</span></span>
<span class="line">    <span class="token key atrule">target</span><span class="token punctuation">:</span> target.com</span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tun<span class="token punctuation">-</span>in<span class="token punctuation">-</span><span class="token number">1</span></span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> tun</span>
<span class="line">    <span class="token comment"># rule: sub-rule-name1 # 默认使用 rules，如果未找到 sub-rule 则直接使用 rules</span></span>
<span class="line">    <span class="token comment"># proxy: proxy # 如果不为空则直接将该入站流量交由指定proxy处理(当proxy不为空时，这里的proxy名称必须合法，否则会出错)</span></span>
<span class="line">    <span class="token key atrule">stack</span><span class="token punctuation">:</span> system <span class="token comment"># gvisor / mixed</span></span>
<span class="line">    <span class="token key atrule">dns-hijack</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> 0.0.0.0<span class="token punctuation">:</span><span class="token number">53</span> <span class="token comment"># 需要劫持的 DNS</span></span>
<span class="line">    <span class="token comment"># auto-detect-interface: false # 自动识别出口网卡</span></span>
<span class="line">    <span class="token comment"># auto-route: false # 配置路由表</span></span>
<span class="line">    <span class="token comment"># mtu: 9000 # 最大传输单元</span></span>
<span class="line">    <span class="token key atrule">inet4-address</span><span class="token punctuation">:</span> <span class="token comment"># 必须手动设置ipv4地址段</span></span>
<span class="line">    <span class="token punctuation">-</span> 198.19.0.1/30</span>
<span class="line">    <span class="token key atrule">inet6-address</span><span class="token punctuation">:</span> <span class="token comment"># 必须手动设置ipv6地址段</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token string">&quot;fdfe:dcba:9877::1/126&quot;</span></span>
<span class="line">    <span class="token comment"># strict-route: true # 将所有连接路由到tun来防止泄漏，但你的设备将无法其他设备被访问</span></span>
<span class="line">    <span class="token comment"># inet4-route-address: # 启用 auto-route 时使用自定义路由而不是默认路由</span></span>
<span class="line">    <span class="token comment"># - 0.0.0.0/1</span></span>
<span class="line">    <span class="token comment"># - 128.0.0.0/1</span></span>
<span class="line">    <span class="token comment"># inet6-route-address: # 启用 auto-route 时使用自定义路由而不是默认路由</span></span>
<span class="line">    <span class="token comment"># - &quot;::/1&quot;</span></span>
<span class="line">    <span class="token comment"># - &quot;8000::/1&quot;</span></span>
<span class="line">    <span class="token comment"># endpoint-independent-nat: false # 启用独立于端点的 NAT</span></span>
<span class="line">    <span class="token comment"># include-uid: # UID 规则仅在 Linux 下被支持，并且需要 auto-route</span></span>
<span class="line">    <span class="token comment"># - 0</span></span>
<span class="line">    <span class="token comment"># include-uid-range: # 限制被路由的的用户范围</span></span>
<span class="line">    <span class="token comment"># - 1000:99999</span></span>
<span class="line">    <span class="token comment"># exclude-uid: # 排除路由的的用户</span></span>
<span class="line">    <span class="token comment"># - 1000</span></span>
<span class="line">    <span class="token comment"># exclude-uid-range: # 排除路由的的用户范围</span></span>
<span class="line">    <span class="token comment"># - 1000:99999</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># Android 用户和应用规则仅在 Android 下被支持</span></span>
<span class="line">    <span class="token comment"># 并且需要 auto-route</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># include-android-user: # 限制被路由的 Android 用户</span></span>
<span class="line">    <span class="token comment"># - 0</span></span>
<span class="line">    <span class="token comment"># - 10</span></span>
<span class="line">    <span class="token comment"># include-package: # 限制被路由的 Android 应用包名</span></span>
<span class="line">    <span class="token comment"># - com.android.chrome</span></span>
<span class="line">    <span class="token comment"># exclude-package: # 排除被路由的 Android 应用包名</span></span>
<span class="line">    <span class="token comment"># - com.android.captiveportallogin</span></span>
<span class="line"><span class="token comment"># 入口配置与 Listener 等价，传入流量将和 socks,mixed 等入口一样按照 mode 所指定的方式进行匹配处理</span></span>
<span class="line"><span class="token comment"># shadowsocks,vmess 入口配置（传入流量将和socks,mixed等入口一样按照mode所指定的方式进行匹配处理）</span></span>
<span class="line"><span class="token comment"># ss-config: ss://2022-blake3-aes-256-gcm:vlmpIPSyHH6f4S8WVPdRIHIlzmB+GIRfoH3aNJ/t9Gg=@:23456</span></span>
<span class="line"><span class="token comment"># vmess-config: vmess://1:9d0cb9d0-964f-4ef6-897d-6c6b3ccf9e68@:12345</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># tuic服务器入口（传入流量将和socks,mixed等入口一样按照mode所指定的方式进行匹配处理）</span></span>
<span class="line"><span class="token comment"># tuic-server:</span></span>
<span class="line"><span class="token comment">#  enable: true</span></span>
<span class="line"><span class="token comment">#  listen: 127.0.0.1:10443</span></span>
<span class="line"><span class="token comment">#  token:    # tuicV4填写（可以同时填写users）</span></span>
<span class="line"><span class="token comment">#    - TOKEN</span></span>
<span class="line"><span class="token comment">#  users:    # tuicV5填写（可以同时填写token）</span></span>
<span class="line"><span class="token comment">#    00000000-0000-0000-0000-000000000000: PASSWORD_0</span></span>
<span class="line"><span class="token comment">#    00000000-0000-0000-0000-000000000001: PASSWORD_1</span></span>
<span class="line"><span class="token comment">#  certificate: ./server.crt</span></span>
<span class="line"><span class="token comment">#  private-key: ./server.key</span></span>
<span class="line"><span class="token comment">#  congestion-controller: bbr</span></span>
<span class="line"><span class="token comment">#  max-idle-time: 15000</span></span>
<span class="line"><span class="token comment">#  authentication-timeout: 1000</span></span>
<span class="line"><span class="token comment">#  alpn:</span></span>
<span class="line"><span class="token comment">#    - h3</span></span>
<span class="line"><span class="token comment">#  max-udp-relay-packet-size: 1500</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,59)]))}const o=n(p,[["render",t],["__file","Clash.html.vue"]]),u=JSON.parse('{"path":"/wiki/Clash.html","title":"Clash:代理工具","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"客户端推荐","slug":"客户端推荐","link":"#客户端推荐","children":[{"level":3,"title":"Clash Verge Rev","slug":"clash-verge-rev","link":"#clash-verge-rev","children":[]},{"level":3,"title":"FlClash","slug":"flclash","link":"#flclash","children":[]},{"level":3,"title":"Hiddify","slug":"hiddify","link":"#hiddify","children":[]},{"level":3,"title":"Android相关客户端","slug":"android相关客户端","link":"#android相关客户端","children":[]},{"level":3,"title":"iOS相关客户端","slug":"ios相关客户端","link":"#ios相关客户端","children":[]},{"level":3,"title":"OpenWRT相关插件","slug":"openwrt相关插件","link":"#openwrt相关插件","children":[]}]},{"level":2,"title":"核心配置","slug":"核心配置","link":"#核心配置","children":[{"level":3,"title":"下载地址","slug":"下载地址","link":"#下载地址","children":[]},{"level":3,"title":"配置教程","slug":"配置教程","link":"#配置教程","children":[]}]},{"level":2,"title":"订阅转换","slug":"订阅转换","link":"#订阅转换","children":[{"level":3,"title":"SubConverter","slug":"subconverter","link":"#subconverter","children":[]},{"level":3,"title":"SubStore","slug":"substore","link":"#substore","children":[]}]},{"level":2,"title":"规则配置","slug":"规则配置","link":"#规则配置","children":[{"level":3,"title":"规则仓库","slug":"规则仓库","link":"#规则仓库","children":[]}]},{"level":2,"title":"连接方式","slug":"连接方式","link":"#连接方式","children":[{"level":3,"title":"HTTP/HTTPS:应用级TCP代理","slug":"http-https-应用级tcp代理","link":"#http-https-应用级tcp代理","children":[]},{"level":3,"title":"Socks:应用级全局代理","slug":"socks-应用级全局代理","link":"#socks-应用级全局代理","children":[]},{"level":3,"title":"Redir:端口转发模式 TCP","slug":"redir-端口转发模式-tcp","link":"#redir-端口转发模式-tcp","children":[]},{"level":3,"title":"Tproxy:透明网关模式 TCP/UDP(仅Linux可用)","slug":"tproxy-透明网关模式-tcp-udp-仅linux可用","link":"#tproxy-透明网关模式-tcp-udp-仅linux可用","children":[]},{"level":3,"title":"TUN:网卡模式(旁路网关)","slug":"tun-网卡模式-旁路网关","link":"#tun-网卡模式-旁路网关","children":[]}]},{"level":2,"title":"常用配置文件","slug":"常用配置文件","link":"#常用配置文件","children":[]},{"level":2,"title":"配置文件示例","slug":"配置文件示例","link":"#配置文件示例","children":[]}],"git":{"updatedTime":1752161270000,"contributors":[{"name":"PZJPZJPZJ","username":"PZJPZJPZJ","email":"68857304+PZJPZJPZJ@users.noreply.github.com","commits":2,"url":"https://github.com/PZJPZJPZJ"}],"changelog":[{"hash":"87223ff5148d93646601fbf8c8e4ed6bf70f2cc9","time":1752161270000,"email":"68857304+PZJPZJPZJ@users.noreply.github.com","author":"PZJ","message":"Changes"},{"hash":"64277ff5708ba0a6a27e5352d4ca9d24a71628b3","time":1749130937000,"email":"68857304+PZJPZJPZJ@users.noreply.github.com","author":"PZJ","message":"Initial commit"}]},"filePathRelative":"wiki/Clash.md"}');export{o as comp,u as data};

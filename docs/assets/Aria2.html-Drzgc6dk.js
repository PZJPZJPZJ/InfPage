import{_ as n,f as a,i as l,o as i}from"./app-BC5-L6qK.js";const e={};function c(d,s){return i(),a("div",null,s[0]||(s[0]=[l(`<h1 id="aria2-开源下载工具" tabindex="-1"><a class="header-anchor" href="#aria2-开源下载工具"><span>Aria2:开源下载工具</span></a></h1><h2 id="仓库地址" tabindex="-1"><a class="header-anchor" href="#仓库地址"><span>仓库地址</span></a></h2><ul><li><a href="https://github.com/aria2/aria2" target="_blank" rel="noopener noreferrer">Aira2</a></li><li><a href="https://github.com/mayswind/AriaNg" target="_blank" rel="noopener noreferrer">AriaNg</a></li></ul><h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法"><span>使用方法</span></a></h2><ol><li>在软件根目录创建并配置aria2.conf文件</li><li>在软件根目录创建空白aria2.session文件</li><li>使用命令运行该程序</li><li>打开AriaNg运行浏览器图形界面</li></ol><h2 id="运行命令" tabindex="-1"><a class="header-anchor" href="#运行命令"><span>运行命令</span></a></h2><div class="language-bat line-numbers-mode" data-highlighter="prismjs" data-ext="bat"><pre><code><span class="line">aria2c.exe --conf-path=aria2.conf</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h2><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf"><pre><code><span class="line">## &#39;#&#39;开头为注释内容, 选项都有相应的注释说明, 根据需要修改 ##</span>
<span class="line">## 被注释的选项填写的是默认值, 建议在需要修改时再取消注释  ##</span>
<span class="line"></span>
<span class="line">## 文件保存相关 ##</span>
<span class="line"></span>
<span class="line"># 文件的保存路径(可使用绝对路径或相对路径), 默认: 当前启动位置</span>
<span class="line">dir=Download</span>
<span class="line"># 启用磁盘缓存, 0为禁用缓存, 需1.16以上版本, 默认:16M</span>
<span class="line">disk-cache=32M</span>
<span class="line"># 文件预分配方式, 能有效降低磁盘碎片, 默认:prealloc</span>
<span class="line"># 预分配所需时间: none &lt; falloc &lt; trunc &lt; prealloc</span>
<span class="line"># NTFS建议使用falloc</span>
<span class="line">file-allocation=none</span>
<span class="line"># 断点续传</span>
<span class="line">continue=true</span>
<span class="line"></span>
<span class="line">## 下载连接相关 ##</span>
<span class="line"></span>
<span class="line"># 最大同时下载任务数, 运行时可修改, 默认:5</span>
<span class="line">max-concurrent-downloads=10</span>
<span class="line"># 同一服务器连接数, 添加时可指定, 默认:1</span>
<span class="line">max-connection-per-server=5</span>
<span class="line"># 最小文件分片大小, 添加时可指定, 取值范围1M -1024M, 默认:20M</span>
<span class="line"># 假定size=10M, 文件为20MiB 则使用两个来源下载; 文件为15MiB 则使用一个来源下载</span>
<span class="line">min-split-size=10M</span>
<span class="line"># 单个任务最大线程数, 添加时可指定, 默认:5</span>
<span class="line">split=20</span>
<span class="line"># 整体下载速度限制, 运行时可修改, 默认:0</span>
<span class="line">#max-overall-download-limit=0</span>
<span class="line"># 单个任务下载速度限制, 默认:0</span>
<span class="line">#max-download-limit=0</span>
<span class="line"># 整体上传速度限制, 运行时可修改, 默认:0</span>
<span class="line">max-overall-upload-limit=1M</span>
<span class="line"># 单个任务上传速度限制, 默认:0</span>
<span class="line">#max-upload-limit=1000</span>
<span class="line"># 禁用IPv6, 默认:false</span>
<span class="line">disable-ipv6=false</span>
<span class="line"></span>
<span class="line">## 进度保存相关 ##</span>
<span class="line"></span>
<span class="line"># 从会话文件中读取下载任务</span>
<span class="line">input-file=aria2.session</span>
<span class="line"># 在Aria2退出时保存\`错误/未完成\`的下载任务到会话文件</span>
<span class="line">save-session=aria2.session</span>
<span class="line"># 定时保存会话, 0为退出时才保存, 需1.16.1以上版本, 默认:0</span>
<span class="line">#save-session-interval=60</span>
<span class="line"></span>
<span class="line">## RPC相关设置 ##</span>
<span class="line"></span>
<span class="line"># 启用RPC, 默认:false</span>
<span class="line">enable-rpc=true</span>
<span class="line"># 允许所有来源, 默认:false</span>
<span class="line">rpc-allow-origin-all=true</span>
<span class="line"># 允许非外部访问, 默认:false</span>
<span class="line">rpc-listen-all=true</span>
<span class="line"># 事件轮询方式, 取值:[epoll, kqueue, port, poll, select], 不同系统默认值不同</span>
<span class="line">#event-poll=select</span>
<span class="line"># RPC监听端口, 端口被占用时可以修改, 默认:6800</span>
<span class="line">#rpc-listen-port=6800</span>
<span class="line"># 设置的RPC授权令牌, v1.18.4新增功能, 取代 --rpc-user 和 --rpc-passwd 选项</span>
<span class="line">#rpc-secret=mivm.cn</span>
<span class="line"># 设置的RPC访问用户名, 此选项新版已废弃, 建议改用 --rpc-secret 选项</span>
<span class="line">#rpc-user=&lt;USER&gt;</span>
<span class="line"># 设置的RPC访问密码, 此选项新版已废弃, 建议改用 --rpc-secret 选项</span>
<span class="line">#rpc-passwd=&lt;PASSWD&gt;</span>
<span class="line"></span>
<span class="line">## BT/PT下载相关 ##</span>
<span class="line"></span>
<span class="line"># 当下载的是一个种子(以.torrent结尾)时, 自动开始BT任务, 默认:true</span>
<span class="line">follow-torrent=true</span>
<span class="line"># BT监听端口, 当端口被屏蔽时使用, 默认:6881-6999</span>
<span class="line">listen-port=51413</span>
<span class="line"># 单个种子最大连接数, 默认:55</span>
<span class="line">#bt-max-peers=55</span>
<span class="line"># 打开DHT功能, PT需要禁用, 默认:true</span>
<span class="line">enable-dht=true</span>
<span class="line"># 打开IPv6 DHT功能, PT需要禁用</span>
<span class="line">enable-dht6=true</span>
<span class="line"># DHT网络监听端口, 默认:6881-6999</span>
<span class="line">dht-listen-port=6881-6999</span>
<span class="line"># 本地节点查找, PT需要禁用, 默认:false</span>
<span class="line">bt-enable-lpd=true</span>
<span class="line"># 种子交换, PT需要禁用, 默认:true</span>
<span class="line">enable-peer-exchange=true</span>
<span class="line"># 每个种子限速, 对少种的PT很有用, 默认:50K</span>
<span class="line">#bt-request-peer-speed-limit=50K</span>
<span class="line"># 客户端伪装, PT需要</span>
<span class="line">peer-id-prefix=-TR2770-</span>
<span class="line">user-agent=Transmission/2.77</span>
<span class="line"># 当种子的分享率达到这个数时, 自动停止做种, 0为一直做种, 默认:1.0</span>
<span class="line">seed-ratio=0.1</span>
<span class="line"># 强制保存会话, 即使任务已经完成, 默认:false</span>
<span class="line"># 较新的版本开启后会在任务完成后依然保留.aria2文件</span>
<span class="line">#force-save=false</span>
<span class="line"># BT校验相关, 默认:true</span>
<span class="line">#bt-hash-check-seed=true</span>
<span class="line"># 继续之前的BT任务时, 无需再次校验, 默认:false</span>
<span class="line">bt-seed-unverified=true</span>
<span class="line"># 保存磁力链接元数据为种子文件(.torrent文件), 默认:false</span>
<span class="line">#bt-save-metadata=true</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9)]))}const r=n(e,[["render",c],["__file","Aria2.html.vue"]]),v=JSON.parse('{"path":"/wiki/Aria2.html","title":"Aria2:开源下载工具","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"仓库地址","slug":"仓库地址","link":"#仓库地址","children":[]},{"level":2,"title":"使用方法","slug":"使用方法","link":"#使用方法","children":[]},{"level":2,"title":"运行命令","slug":"运行命令","link":"#运行命令","children":[]},{"level":2,"title":"配置文件","slug":"配置文件","link":"#配置文件","children":[]}],"git":{"updatedTime":1749130937000,"contributors":[{"name":"PZJPZJPZJ","username":"PZJPZJPZJ","email":"68857304+PZJPZJPZJ@users.noreply.github.com","commits":1,"url":"https://github.com/PZJPZJPZJ"}],"changelog":[{"hash":"64277ff5708ba0a6a27e5352d4ca9d24a71628b3","time":1749130937000,"email":"68857304+PZJPZJPZJ@users.noreply.github.com","author":"PZJ","message":"Initial commit"}]},"filePathRelative":"wiki/Aria2.md"}');export{r as comp,v as data};

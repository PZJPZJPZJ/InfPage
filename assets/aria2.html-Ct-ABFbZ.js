import{_ as n,c as a,e as i,o as l}from"./app-DALiN-ry.js";const e={};function p(c,s){return l(),a("div",null,[...s[0]||(s[0]=[i(`<h1 id="aria2-开源下载工具" tabindex="-1"><a class="header-anchor" href="#aria2-开源下载工具"><span>Aria2:开源下载工具</span></a></h1><h2 id="仓库地址" tabindex="-1"><a class="header-anchor" href="#仓库地址"><span>仓库地址</span></a></h2><ul><li><a href="https://github.com/aria2/aria2" target="_blank" rel="noopener noreferrer">Aira2</a></li><li><a href="https://github.com/mayswind/AriaNg" target="_blank" rel="noopener noreferrer">AriaNg</a></li></ul><h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法"><span>使用方法</span></a></h2><ol><li>在软件根目录创建并配置aria2.conf文件</li><li>在软件根目录创建空白aria2.session文件</li><li>使用命令运行该程序</li><li>打开AriaNg运行浏览器图形界面</li></ol><h2 id="运行命令" tabindex="-1"><a class="header-anchor" href="#运行命令"><span>运行命令</span></a></h2><div class="language-bat line-numbers-mode" data-highlighter="shiki" data-ext="bat" style="--shiki-light:#000000;--shiki-dark:#D4D4D4;--shiki-light-bg:#FFFFFF;--shiki-dark-bg:#1E1E1E;"><pre class="shiki shiki-themes light-plus dark-plus vp-code"><code class="language-bat"><span class="line"><span style="--shiki-light:#000000;--shiki-dark:#D4D4D4;">aria2c.exe --conf-path=aria2.conf</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h2><div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" style="--shiki-light:#000000;--shiki-dark:#D4D4D4;--shiki-light-bg:#FFFFFF;--shiki-dark-bg:#1E1E1E;"><pre class="shiki shiki-themes light-plus dark-plus vp-code"><code class="language-conf"><span class="line"><span>## &#39;#&#39;开头为注释内容, 选项都有相应的注释说明, 根据需要修改 ##</span></span>
<span class="line"><span>## 被注释的选项填写的是默认值, 建议在需要修改时再取消注释  ##</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 文件保存相关 ##</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 文件的保存路径(可使用绝对路径或相对路径), 默认: 当前启动位置</span></span>
<span class="line"><span>dir=Download</span></span>
<span class="line"><span># 启用磁盘缓存, 0为禁用缓存, 需1.16以上版本, 默认:16M</span></span>
<span class="line"><span>disk-cache=32M</span></span>
<span class="line"><span># 文件预分配方式, 能有效降低磁盘碎片, 默认:prealloc</span></span>
<span class="line"><span># 预分配所需时间: none &lt; falloc &lt; trunc &lt; prealloc</span></span>
<span class="line"><span># NTFS建议使用falloc</span></span>
<span class="line"><span>file-allocation=none</span></span>
<span class="line"><span># 断点续传</span></span>
<span class="line"><span>continue=true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 下载连接相关 ##</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 最大同时下载任务数, 运行时可修改, 默认:5</span></span>
<span class="line"><span>max-concurrent-downloads=10</span></span>
<span class="line"><span># 同一服务器连接数, 添加时可指定, 默认:1</span></span>
<span class="line"><span>max-connection-per-server=5</span></span>
<span class="line"><span># 最小文件分片大小, 添加时可指定, 取值范围1M -1024M, 默认:20M</span></span>
<span class="line"><span># 假定size=10M, 文件为20MiB 则使用两个来源下载; 文件为15MiB 则使用一个来源下载</span></span>
<span class="line"><span>min-split-size=10M</span></span>
<span class="line"><span># 单个任务最大线程数, 添加时可指定, 默认:5</span></span>
<span class="line"><span>split=20</span></span>
<span class="line"><span># 整体下载速度限制, 运行时可修改, 默认:0</span></span>
<span class="line"><span>#max-overall-download-limit=0</span></span>
<span class="line"><span># 单个任务下载速度限制, 默认:0</span></span>
<span class="line"><span>#max-download-limit=0</span></span>
<span class="line"><span># 整体上传速度限制, 运行时可修改, 默认:0</span></span>
<span class="line"><span>max-overall-upload-limit=1M</span></span>
<span class="line"><span># 单个任务上传速度限制, 默认:0</span></span>
<span class="line"><span>#max-upload-limit=1000</span></span>
<span class="line"><span># 禁用IPv6, 默认:false</span></span>
<span class="line"><span>disable-ipv6=false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 进度保存相关 ##</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 从会话文件中读取下载任务</span></span>
<span class="line"><span>input-file=aria2.session</span></span>
<span class="line"><span># 在Aria2退出时保存\`错误/未完成\`的下载任务到会话文件</span></span>
<span class="line"><span>save-session=aria2.session</span></span>
<span class="line"><span># 定时保存会话, 0为退出时才保存, 需1.16.1以上版本, 默认:0</span></span>
<span class="line"><span>#save-session-interval=60</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## RPC相关设置 ##</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 启用RPC, 默认:false</span></span>
<span class="line"><span>enable-rpc=true</span></span>
<span class="line"><span># 允许所有来源, 默认:false</span></span>
<span class="line"><span>rpc-allow-origin-all=true</span></span>
<span class="line"><span># 允许非外部访问, 默认:false</span></span>
<span class="line"><span>rpc-listen-all=true</span></span>
<span class="line"><span># 事件轮询方式, 取值:[epoll, kqueue, port, poll, select], 不同系统默认值不同</span></span>
<span class="line"><span>#event-poll=select</span></span>
<span class="line"><span># RPC监听端口, 端口被占用时可以修改, 默认:6800</span></span>
<span class="line"><span>#rpc-listen-port=6800</span></span>
<span class="line"><span># 设置的RPC授权令牌, v1.18.4新增功能, 取代 --rpc-user 和 --rpc-passwd 选项</span></span>
<span class="line"><span>#rpc-secret=mivm.cn</span></span>
<span class="line"><span># 设置的RPC访问用户名, 此选项新版已废弃, 建议改用 --rpc-secret 选项</span></span>
<span class="line"><span>#rpc-user=&lt;USER&gt;</span></span>
<span class="line"><span># 设置的RPC访问密码, 此选项新版已废弃, 建议改用 --rpc-secret 选项</span></span>
<span class="line"><span>#rpc-passwd=&lt;PASSWD&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## BT/PT下载相关 ##</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 当下载的是一个种子(以.torrent结尾)时, 自动开始BT任务, 默认:true</span></span>
<span class="line"><span>follow-torrent=true</span></span>
<span class="line"><span># BT监听端口, 当端口被屏蔽时使用, 默认:6881-6999</span></span>
<span class="line"><span>listen-port=51413</span></span>
<span class="line"><span># 单个种子最大连接数, 默认:55</span></span>
<span class="line"><span>#bt-max-peers=55</span></span>
<span class="line"><span># 打开DHT功能, PT需要禁用, 默认:true</span></span>
<span class="line"><span>enable-dht=true</span></span>
<span class="line"><span># 打开IPv6 DHT功能, PT需要禁用</span></span>
<span class="line"><span>enable-dht6=true</span></span>
<span class="line"><span># DHT网络监听端口, 默认:6881-6999</span></span>
<span class="line"><span>dht-listen-port=6881-6999</span></span>
<span class="line"><span># 本地节点查找, PT需要禁用, 默认:false</span></span>
<span class="line"><span>bt-enable-lpd=true</span></span>
<span class="line"><span># 种子交换, PT需要禁用, 默认:true</span></span>
<span class="line"><span>enable-peer-exchange=true</span></span>
<span class="line"><span># 每个种子限速, 对少种的PT很有用, 默认:50K</span></span>
<span class="line"><span>#bt-request-peer-speed-limit=50K</span></span>
<span class="line"><span># 客户端伪装, PT需要</span></span>
<span class="line"><span>peer-id-prefix=-TR2770-</span></span>
<span class="line"><span>user-agent=Transmission/2.77</span></span>
<span class="line"><span># 当种子的分享率达到这个数时, 自动停止做种, 0为一直做种, 默认:1.0</span></span>
<span class="line"><span>seed-ratio=0.1</span></span>
<span class="line"><span># 强制保存会话, 即使任务已经完成, 默认:false</span></span>
<span class="line"><span># 较新的版本开启后会在任务完成后依然保留.aria2文件</span></span>
<span class="line"><span>#force-save=false</span></span>
<span class="line"><span># BT校验相关, 默认:true</span></span>
<span class="line"><span>#bt-hash-check-seed=true</span></span>
<span class="line"><span># 继续之前的BT任务时, 无需再次校验, 默认:false</span></span>
<span class="line"><span>bt-seed-unverified=true</span></span>
<span class="line"><span># 保存磁力链接元数据为种子文件(.torrent文件), 默认:false</span></span>
<span class="line"><span>#bt-save-metadata=true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9)])])}const r=n(e,[["render",p]]),v=JSON.parse('{"path":"/wiki/aria2.html","title":"Aria2:开源下载工具","lang":"zh-CN","frontmatter":{},"git":{"updatedTime":1764519244000,"contributors":[{"name":"PZJPZJPZJ","username":"PZJPZJPZJ","email":"68857304+PZJPZJPZJ@users.noreply.github.com","commits":1,"url":"https://github.com/PZJPZJPZJ"}],"changelog":[{"hash":"3f1e50736073018cf391697913367d2c3e21dbba","time":1764519244000,"email":"68857304+PZJPZJPZJ@users.noreply.github.com","author":"PZJ","message":"first commit"}]},"filePathRelative":"wiki/aria2.md"}');export{r as comp,v as data};

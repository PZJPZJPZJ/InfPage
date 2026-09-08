# ROG 幻 X 2023 与 JHL9480 / MINISFORUM DEG2 雷电兼容性研究总结

## 1. 研究对象与故障现象

- 笔记本：ROG 幻 X 2023，RTX 2050 版本，对应型号 `GZ301VF`。
- 主机接口：Thunderbolt 4 / USB4，标称最高 40Gbps。
- 对照设备：采用 JHL7540 控制器的雷电 3 显卡坞。
- 目标设备：采用 Intel JHL9480 控制器的 MINISFORUM DEG2 显卡扩展坞。
- 现象：
  - 使用雷电 3 数据线连接 JHL7540 显卡坞，工作正常。
  - 使用雷电 3 数据线连接 JHL9480 / DEG2，也可以被识别并使用。
  - 换用官方雷电 5 数据线后完全没有反应。
  - 更换数条雷电 5 数据线仍然没有反应，因此不像单根线材损坏。

华硕官方规格确认 GZ301VF-I9R2050 配有一个 Thunderbolt 4 Type-C 接口；该接口的物理能力仍是最高 40Gbps，不会因为连接 JHL9480 或安装兼容性固件而升级成 Thunderbolt 5。[ROG Flow Z13 2023 GZ301VF 官方规格](https://rog.asus.com/jp/laptops/rog-flow/rog-flow-z13-2023-series/spec/)

## 2. 网上高度一致的案例与最终原因

ROG 官方论坛中存在高度一致的案例：ROG Flow Z13 2023 使用雷电 3/4 线可以连接设备，但多根雷电 5 线均无法建立连接。后续用户确认，安装华硕发布的专用 PD 固件后，雷电 5 线连接问题得到解决。

- 原始问题：[ROG Flow Z13 (2023) and Thunderbolt 5 Cable](https://rog-forum.asus.com/t5/rog-flow-series/rog-flow-z13-2023-and-thunderbolt-5-cable/td-p/1051310)
- 解决结果：[ROG Flow Z13 (2023) and Thunderbolt 5 Cable — Update Solved](https://rog-forum.asus.com/t5/rog-flow-series/rog-flow-z13-2023-and-thunderbolt-5-cable-update-solved/m-p/1124935/highlight/true)

对应固件为：

- 名称：`PD Firmware Update`
- 版本：`V2.13.0.001`
- 安装包相关名称：`PDFWupdateforTBT5_ASUS_Z_V2.13.0.001_17020`
- 发布日期：2025-09-26
- 大小：8.58MB
- 最低系统要求：Windows 11 64-bit 22H2
- SHA-256：`3D88BCA6C978183A7C8B789CC8BFA4B224C3836C7415AEB9906447A8079C39D9`
- 华硕说明：增加对 Thunderbolt 5 设备的正式支持并增强系统兼容性。

固件位于 GZ301VF 支持页面的“BIOS & Firmware”栏目底部：[GZ301VF BIOS 与固件下载页](https://www.asus.com/us/supportonly/gz301vf/helpdesk_bios/)

综合现象和相同案例，主要原因不是雷电 5 线带宽过高，也不是 Thunderbolt 4 主机不能使用 Thunderbolt 5 线，而是旧版 Type-C/PD 控制器固件在识别雷电 5 线的 E-Marker、线缆能力以及高速模式协商时存在兼容性问题。升级后，雷电 5 线应当向下兼容并以主机的共同最高能力，即 Thunderbolt 4 / USB4 40Gbps 模式工作。

安装固件时应连接可靠电源，不关闭更新器、不合盖、不关机，等待更新器明确完成。

## 3. “识别为 USB4 Version 2.0”不等于已经运行在 80Gbps

JHL9480 本身是支持 USB4 Version 2.0 的 Thunderbolt 5 accessory controller。Windows 可以正确显示设备的 USB4 协议版本，但这只是设备/路由器的能力标识，不代表当前主机到设备的物理链路已经运行到 80Gbps。

这类似于 PCIe 4.0 SSD 插在 PCIe 3.0 插槽中：设备仍可报告自己支持 PCIe 4.0，但当前链路只能按 PCIe 3.0 运行。

USB-IF 明确说明，USB4 连接会按照主机、设备和线材三者的共同最高能力运行。[USB4 官方架构说明](https://www.usb.org/usb4)

对 GZ301VF 来说，正常的理想结果应当是：

```text
USB4 Version: 2.0
Current Bandwidth (down/up): 40Gbps/40Gbps (Gen 3, dual lane)
```

这表示 JHL9480 被识别为 USB4 v2 路由器，但实际链路受 GZ301VF 的 Thunderbolt 4 主机限制，以 40Gbps 工作。

### 3.1 Windows 中查看实际协商带宽

Windows 11 路径：

```text
设置 → 蓝牙和设备 → USB → USB4 集线器和设备 → 展开 JHL9480/DEG2
```

点击“复制详细信息”，重点查看 `Current bandwidth (down/up)` 或“当前带宽（下行/上行）”。Windows 11 build 22621.1778 起提供这一页面。[Microsoft USB4 设置说明](https://learn.microsoft.com/en-us/windows-hardware/design/component-guidelines/usb4-settings-enablement)

常见结果：

| 显示结果 | 含义 |
|---|---|
| `20/20Gbps (Gen 2, dual lane)` | USB4 20Gbps |
| `40/40Gbps (Gen 3, dual lane)` | USB4 40Gbps / Thunderbolt 4 级别 |
| `80/80Gbps` | USB4 80Gbps / Thunderbolt 5 级别 |
| `120/40Gbps` 或 `40/120Gbps` | USB4 v2 / Thunderbolt 5 非对称 Bandwidth Boost 模式 |

这里显示的是协商后的链路容量，不是实时利用率。40/40 表示两个方向各有最高 40Gbps 的链路能力，市场命名仍然是 40Gbps，而不是将两个方向相加称为 80Gbps。

如需判断 eGPU 的实际 PCIe 有效吞吐，可使用 3DMark PCI Express Feature Test 等负载测试。实际有效吞吐一定低于 USB4/雷电的物理线速；GPU-Z 显示的显卡插槽 `x4` 也不能直接代表雷电主干的实时吞吐。

## 4. USB4、USB4 v2、Thunderbolt 4 与 Thunderbolt 5

| 标准或认证 | 链路能力 | 非对称模式 | PCIe 要求 |
|---|---:|---:|---|
| USB4 v1 | 主机支持 20Gbps，40Gbps 可选 | 无 | PCIe 隧道可选 |
| Thunderbolt 4 | 40Gbps | 无 | PC 最低 32Gbps PCIe 数据能力 |
| USB4 v2 | 最高 80Gbps，也可按 20/40Gbps 运行 | 可支持 120/40Gbps | 取决于具体产品实现 |
| Thunderbolt 5 | 80Gbps | Bandwidth Boost 120/40Gbps | PC 最低 64Gbps PCIe 数据能力 |

USB4 v2 是协议规范；Thunderbolt 5 是建立在 USB4 v2 之上的 Intel 认证能力集合，要求更加完整的带宽、PCIe、DisplayPort、供电、唤醒、DMA 防护、线材测试和互操作能力。[USB4 v2 官方说明](https://www.usb.org/sites/default/files/2022-09/USB%20PG%20USB4%20Version%202.0%2080Gbps%20Announcement_FINAL.pdf) [Intel Thunderbolt 5 技术对比](https://www.intel.com/content/www/us/en/architecture-and-technology/thunderbolt/overview.html) [Thunderbolt 5 Technology Brief](https://www.thunderbolttechnology.net/sites/default/files/Thunderbolt_5_TechBrief_2023_09_12.pdf)

Thunderbolt 5 的 120Gbps 是把原本 80/80Gbps 的链路动态调整成一个方向 120Gbps、另一个方向 40Gbps，主要用于高带宽显示场景。它不代表 eGPU 可以获得 120Gbps PCIe 带宽。

## 5. PD 固件是什么，写在哪里

PD 固件不是 Windows 常驻程序，也不是 GZ301VF 主 BIOS/UEFI 镜像本身。它属于主板硬件固件，目标是 USB Type-C Port Controller / USB-PD 控制器相关的非易失存储。

更新过程可概括为：

```text
Windows 更新 EXE
    ↓
EC 提供的 SMBus/I²C 通信通道
    ↓
主板上的 Type-C / PD 控制器
    ↓
控制器片内或旁挂的非易失 Flash
```

对华硕官方安装包的组成进行检查后，可见 `CSPDFWUpdateTool`、`fw.zip`、`ROG_PDFWUpdate_LIB` 等组件；更新库包含 `ITE_get_device_fw_version`、`ITE_get_pdic_info`、`ITE_main_update_task` 以及 `SPI_Erase`、`SPI_Program`、`SPI_Read` 等相关符号，并通过 EC 的 SMBus/I²C 通道访问 PD IC。这说明 Windows 程序只是刷写工具，EC 是通信桥梁，最终目标是 PD 控制器相关 Flash。

华硕未公开 GZ301VF 的确切 PD 芯片型号，也未公开该 Flash 是控制器片内存储还是外置 SPI Flash，因此不能进一步硬断言具体物理芯片。

PD/TCPC 固件独立存在并可经 EC 更新，是常见的硬件架构。[Chromium USB Type-C PD Firmware 架构说明](https://www.chromium.org/chromium-os/developer-library/guides/firmware/pd-firmware-update/)

更新完成后：

- 格式化或重装 Windows：不会丢失。
- 更换 SSD：不会丢失。
- 系统恢复出厂：不会丢失。
- 普通断电或清 CMOS：通常不会丢失。
- 再次刷写、降级相关固件或更换主板：可能改变。

PD 不仅负责充电功率，还参与 Type-C 插入检测、正反方向、供受电角色、线缆 E-Marker、Alt Mode 和高速模式建立，所以“可以充电”并不能排除 PD 固件导致雷电数据链路失败。

## 6. 主动雷电线与被动雷电线

### 6.1 基本区别

被动线主要包含高速导线和 E-Marker，不主动补偿高速信号。主动线在接头中加入 Redriver 或 Retimer，用来补偿长距离传输产生的信号衰减，并需要 VCONN 供电。

| 项目 | 被动线 | 主动线 |
|---|---|---|
| 适用距离 | 短距离 | 较长距离 |
| 高速信号芯片 | 无重定时芯片 | 有 Redriver/Retimer |
| 兼容性变量 | 较少 | 与主动芯片和固件相关 |
| 功耗和发热 | 较低 | 稍高 |
| 同为合格认证线时的速度 | 相同 | 相同 |
| 主要价值 | 简单、低成本、短距离稳定 | 长距离保持信号完整性 |

主动线不会让 80cm 的连接更快，它的核心价值是延长距离。现代认证 Thunderbolt 5 主动线能够完整支持 Thunderbolt 3/4/5、USB4、USB3 和 DP；但部分老式长距离主动 Thunderbolt 3 线只完整支持 Thunderbolt 和 USB2，在原生 USB3、USB4 或 DP Alt Mode 场景中可能有限制。

USB-IF 对 Thunderbolt 3 兼容拓扑的说明指出，一旦建立 Thunderbolt 3 compatibility link，其下游链路不得再建立为原生 USB4 link；USB4 Dock 若要在这种模式下向下游提供原生 USB3，需要在 Dock 内置 USB3 Host Controller，并通过 PCIe tunnel 连接主机。[USB4 与 Thunderbolt 3 兼容模式说明，第 69—73 页](https://www.usb.org/sites/default/files/D2T1-3%20-%20USB4%20Time%20Sync%20-%20Host%20Interface%20-%20CM%20-%20TBT3.pdf)

这提供了一个合理解释：使用老式主动 Thunderbolt 3 线时，GPU 的 PCIe tunnel 可以工作，但下游 USB3 功能可能因设备实现和 legacy TBT3 模式而不能正常工作。

### 6.2 80cm以内的线材建议

刷好华硕 PD 固件后，优先顺序为：

1. DEG2 随机附带的官方 Thunderbolt 5 线。
2. 0.8—1米、Intel Thunderbolt 5 认证、被动式、240W EPR 线。
3. 一条短的认证 Thunderbolt 4 被动线，用作 GZ301VF 40Gbps 兼容性对照测试。

已经存在 Intel 认证的 1米被动 Thunderbolt 5 EPR 线，支持 80/120Gbps、Thunderbolt 3/4、USB4、USB3、DisplayPort 2.1、PCIe 和最高 240W供电。[Thunderbolt 5 1m Passive EPR Cable 认证记录](https://www.thunderbolttechnology.net/product/thunderbolt-5-80120gbps-1m-passive-epr240w-cable)

如希望使用 DEG2 对主机最高 140W 的供电能力，应选择支持 USB PD 3.1 EPR、5A、最高 240W 的线。仅标注“240W”不能证明数据能力，需同时确认 Thunderbolt 5 认证和 80/120Gbps 标识。

## 7. MINISFORUM DEG2 的上下行接口

用户最终确认目标设备为 MINISFORUM DEG2。

MINISFORUM 当前官方页面列出的接口为：

- JHL9480 平台。
- Thunderbolt 5 / USB4 v2 上行口：最高 80Gbps、最高 140W 对主机供电。
- Thunderbolt 5 / USB4 v2 下行口：最高 80Gbps、最高 30W 对外供电。
- USB-A：一个 USB 3.2 10Gbps、一个 USB 3.2 5Gbps。
- 一个 M.2 2280 插槽。
- 一个 2.5GbE 网口。
- 一个 PCIe x16 物理显卡插槽。
- OCuLink：PCIe 4.0 x4，标称 64Gbps。

[MINISFORUM DEG2 官方规格](https://store.minisforum.com/en-os/products/minisforum-deg2-oculink-egpu-dock)

此前依据“140W上行、15W下行”的描述，检索到高度匹配的另一款产品 AOOSTAR AG03。AOOSTAR 官方资料明确说明其左侧 15W Thunderbolt 5 输出口可以连接外设和外置硬盘，右侧电脑图标口为上行口；该项研究结论适用于 AG03，不应与最终确认的 DEG2 混淆。[AOOSTAR AG03 官方规格](https://aoostar.com/en-au/products/aoostar-ag03-egpu-dock) [AOOSTAR AG03 下游扩展说明](https://aoostar.com/blogs/news/the-aoostar-ag03-egpu-dock-is-dropping-soon-dual-tb5-oculink-ports-included-800w-power-supply-for-unbeatable-support)

如果 DEG2 实物或某一批次说明书写的是 15W，而当前官网写的是 30W，应以对应批次的实物说明书和厂商确认为准。

DEG2 下行口支持数据、DP Alt Mode 音视频、Thunderbolt Ethernet 和外部供电，可以连接：

- Thunderbolt 3/4/5 设备。
- USB4 设备。
- USB-C SSD。
- 普通 USB-C Hub 或扩展坞。
- USB-C/DisplayPort 显示设备。

连接另一台 Thunderbolt/USB4 Hub 或 Dock 时，可视为 Thunderbolt/USB4 菊花链；连接普通 USB Hub 时，严格来说只是 USB 下游树形扩展。Thunderbolt 支持数据和视频信号沿链路继续连接多个配件。[Intel Thunderbolt 菊花链说明](https://www.intel.com/content/www/us/en/architecture-and-technology/thunderbolt/overview.html)

`PD` 是 Power Delivery 供电协议，`DP` 才是 DisplayPort 视频协议。“PD视频协议”通常是商家将 DP 写错或翻译错误。

## 8. DEG2 下行口不工作的判断方法

下行口不工作不能仅凭 USB-C 空载电压判断。USB-C Source 通常在 CC 引脚检测到 Sink 的 Rd 后才打开 VBUS，应使用手机、USB-C SSD 或能够正确呈现 Rd 的测试设备。

排查顺序：

1. 安装 GZ301VF 的 PD Firmware V2.13.0.001。
2. 确认 DEG2 已切换到 Thunderbolt 5 模式。
3. 主机连接 DEG2 的上行口，而不是下行口。
4. 使用 DEG2 原装 Thunderbolt 5 线，或短的认证 Thunderbolt 4/5 被动线。
5. 在 Windows 中确认 `Current Bandwidth`。对 GZ301VF 来说应为 40/40Gbps Gen 3 dual lane。
6. 下行口直接测试手机，再测试 USB-C SSD，最后测试 USB Hub，不要一开始串接多级设备。
7. 如果手机、SSD、Hub 均既不供电也不枚举，再考虑 DEG2 下游 PD 控制、电源轨、固件或端口硬件故障。

若只有老式主动 Thunderbolt 3 线下的下游口失效，而更新固件后使用 Thunderbolt 4/5 线正常，则更符合 legacy TBT3 模式或线材兼容问题，不应判断为硬件损坏。

外接显示器最好直接连接外置显卡本身的 HDMI/DisplayPort。通过下行 USB-C/DP 输出时，视频通常来自主机的 DP tunnel，并且会占用 USB4/雷电主干带宽；使用笔记本内屏显示 eGPU 渲染结果还会产生显卡到主机的帧回传流量。

## 9. USB、PCIe、DisplayPort 为什么会共享雷电带宽

USB4 中的 USB3、PCIe、DisplayPort 是不同的协议适配器和逻辑隧道，但不是三组独立的物理高速导线。

```text
                           ┌─ PCIe Tunnel ─→ JHL9480 PCIe x4 ─→ 外置显卡
GZ301VF ─ 40Gbps USB4主干 ┼─ USB3 Tunnel ─→ USB Hub ─→ USB口/网卡/NVMe
                           └─ DP Tunnel   ─→ 下行显示设备
```

USB4 把不同协议封装成 USB4 数据包，在同一条物理高速链路上进行复用和调度。所谓“独立通路”是逻辑上的虚拟线路，不是独占铜线。[USB4 System Overview](https://www.usb.org/sites/default/files/D1T1-3%20-%20USB4%20System%20Overview.pdf)

Windows USB4 Connection Manager 负责路由检测、路径建立、lane bonding 和各 tunnel 之间的带宽管理。[Microsoft USB4 Connection Manager](https://learn.microsoft.com/en-us/windows-hardware/design/component-guidelines/usb4-intro-to-connection-manager)

USB-IF 的带宽说明显示：

- DisplayPort 主链路属于需要保证的等时流量，建立 DP tunnel 时可能预留带宽。
- USB3 带宽动态分配。
- PCIe 属于非等时流量。
- USB 与 PCIe 通过优先级及 Weighted Round Robin 等方式参与仲裁。
- 多种协议最终共享同一 USB4 link 的可用带宽。

[USB4 带宽仲裁与管理说明，第 61—64 页](https://www.usb.org/sites/default/files/D2T1-3%20-%20USB4%20Time%20Sync%20-%20Host%20Interface%20-%20CM%20-%20TBT3.pdf)

因此：

- 设备仅仅插入但空闲，不会固定占满其标称带宽。
- USB 10Gbps 端口不会因为插入设备就永久扣除 10Gbps。
- USB SSD、M.2或2.5G网卡产生持续流量时，会与同方向的 PCIe tunnel 争用 USB4 主干的时间片。
- 这通常不会让显卡从 PCIe x4 静态变成 x2，而是降低实际有效吞吐并增加延迟。
- 40Gbps 是每个方向的链路能力，只有同一方向、同一时刻的流量直接竞争；但 eGPU 的命令、资源上传、结果和画面回传本身可能同时涉及两个方向。

若 10Gbps USB 分支接近满载，可粗略理解为其占用了 40Gbps 主干同方向约四分之一的传输机会，但实际不能简单精确地按 `40-10=30` 计算，因为还存在 USB4 封包开销、协议优先级和方向差异。

## 10. DEG2 的 USB 与 M.2 内部结构

拆解确认 DEG2 使用以下主要芯片：

- Intel JHL9480：Thunderbolt 5 accessory controller。
- Realtek RTS5420：USB 3.2 Gen2 Hub。
- Realtek RTL8156BG：USB 2.5GbE 控制器。
- JMicron JMS583：USB 3.2 Gen2 转 PCIe/NVMe 桥。
- Parade FL5801：USB2 Hub 控制器。

[DEG2 拆解及性能测试](https://pc.watch.impress.co.jp/docs/column/yajiuma-mini-review/2078571.html)

Intel 对 JHL9480 的公开规格包括 Quad port configuration、PCIe Gen4 x4，以及 DisplayPort 2.1 tunnel/re-drive 能力。[Intel JHL9480 官方规格](https://www.intel.com/content/www/us/en/products/sku/225919/intel-jhl9480-thunderbolt-5-accessory-controller/specifications.html)

DEG2 的显卡和 M.2 路径可概括为：

```text
显卡：JHL9480 PCIe adapter → PCIe Gen4 x4 → GPU

M.2：USB3 tunnel → RTS5420/USB分支 → JMS583 → NVMe SSD
```

因此 DEG2 的 M.2 不会静态拆走显卡的 PCIe lane，不会因为安装 M.2 就把显卡从 x4 变成 x2。M.2 经 JMS583 工作在 USB 3.2 Gen2 10Gbps 路径中，性能属于 10Gbps 移动 NVMe 盒级别，而不是主板原生 NVMe 插槽级别。

USB-A 10Gbps、USB-A 5Gbps、2.5GbE 和 M.2 很可能共同受 USB Hub 的单条 10Gbps 级上行分支约束，各接口的标称速率不能简单相加并同时跑满。

相关实测中，DEG2 配合不同主机时，3DMark PCI Express Feature Test 得到约 2.0GB/s 或 2.92GB/s 的 USB4 v1 结果，而 USB4 v2 主机约为 5.06GB/s；实际图形基准中的差距没有 PCIe 纯传输测试那么大，因为纹理和模型进入显存后，许多计算在 GPU 本地完成。[DEG2 性能测试](https://pc.watch.impress.co.jp/docs/column/yajiuma-mini-review/2078571.html)

## 11. DEG2 的 NVMe 是否是优解

对显卡 lane 分配来说，DEG2 的 NVMe 设计是合理的，因为它没有静态分割 GPU 的 PCIe x4；对存储性能来说，它不是最优解，因为 JMS583 将其限制在 USB 10Gbps 级别。

适合的用途：

- 减少外置硬盘盒和线材。
- 随显卡坞携带游戏库、模型、素材或普通工作数据。
- 对约 10Gbps 级存储性能可以接受。

不适合的用途：

- 追求主板原生 PCIe 4.0 NVMe 的数 GB/s 性能。
- 游戏或 GPU 计算期间长期进行大容量满速拷贝。
- 为该插槽专门购买昂贵、高发热的旗舰 Gen4/Gen5 SSD。

M.2 插槽留空时不会占用带宽；安装 SSD 但处于空闲状态时，只有极少量管理流量；只有实际持续读写时才会明显占用 USB 分支和 USB4 主干。

如果以后需要更高性能的外置 NVMe，可以通过 DEG2 下行 Thunderbolt/USB4 口连接 USB4 NVMe 盒；其速度可能高于 DEG2 内置 10Gbps M.2，但依然会与 eGPU 共享 GZ301VF 的 40Gbps 主干。

## 12. 选择 DEG2 集成 USB，还是简单显卡坞加外置 USB Hub

在“需要 USB、NVMe 不是刚需”的条件下，推荐优先选择 DEG2，先使用其集成 USB，M.2 留空。

理由：

- M.2 留空不会消耗带宽。
- 已集成一个 10Gbps USB-A、一个 5Gbps USB-A 和 2.5GbE。
- 可以少购买一个 Hub，减少一级拓扑、一个设备和一组线材。
- 集成 USB 与外接普通 USB-C Hub 最终都要经过 USB3 tunnel 和同一条雷电主干；外接 Hub 不会获得一条绕开显卡的独立物理链路。
- 少一级外接 Hub 通常能减少供电、线材和兼容性变量。

如果两个 USB-A 已足够连接键鼠或少量设备，就没有必要为了“节省显卡带宽”另买 Hub。只有端口数量、接口类型或独立供电能力不够时，才需要在下行口继续扩展。

如果需要多个高速 SSD、读卡器、采集卡、音频接口或三个以上 USB 外设，仍可能需要外置 Hub。这时不应把 DEG2 的 M.2 当作决定性卖点，而应综合比较显卡兼容性、端口数量、供电、总价和售后。

## 13. 下行雷电口连接普通 Type-C Hub 的要求

DEG2 下行口可以连接普通 USB-C Hub，不要求 Hub 本身必须是 Thunderbolt 设备。普通 Hub 会按其自身能力运行在 USB 3.2 Gen1 5Gbps、Gen2 10Gbps或 USB2 模式。

选择和连接时应注意：

- 需要高速存储时，选择 USB 3.2 Gen2 10Gbps Hub。
- 只连接键鼠时，普通 USB 3.x Hub 已足够。
- 必须是具有数据功能的 Hub，不能是只有充电功能的 Type-C 转接器。
- 使用 Hub 的上行 Host 接口或固定主机线连接 DEG2，不能把 DEG2 接到 Hub 的 `PD-IN` 充电输入口。
- 若 Hub 使用可拆 C-C 线，应选择支持相应数据速率的全功能数据线，不能使用纯充电线。
- 多个移动硬盘、机械硬盘、采集卡等高功耗设备同时使用时，优先选择带独立供电的 Hub。
- 仅连接键鼠、手柄、U盘时，无源 Hub 一般即可。
- 显示器最好直接连接外置显卡，不通过普通 USB-C Hub 的 HDMI/DP 输出。

外接普通 USB Hub 不需要使用 Thunderbolt 5 线；线材达到 Hub 的 USB 5Gbps/10Gbps 要求即可。只有连接真正的 Thunderbolt/USB4 下游设备并希望获得对应性能时，才需要 Thunderbolt/USB4 线。

## 14. DEG2 在 Thunderbolt 与 OCuLink 模式下的扩展功能

DEG2 的模式开关用于在 Thunderbolt 5 controller 与 OCuLink 之间切换显卡的 PCIe 路径。USB、M.2、网卡等扩展功能依赖 USB4/Thunderbolt 上行连接。

在 OCuLink 模式下，如果只连接 OCuLink，主要工作的只是显卡路径；若还要使用 DEG2 的 USB、M.2、网卡和下行扩展功能，需要再用 Type-C/USB4 线连接主机与 DEG2 的 USB4 v2 上行口。[DEG2 官方支持入口与用户手册](https://www.minisforum.com/pages/product-info) [DEG2 模式说明讨论及官方手册链接](https://egpu.io/forums/thunderbolt-enclosures/2025-minisforum-deg2-egpu-dock-with-thunderbolt-5-oculink-io-ports-and-140w-30w-pd-discussion/paged/2/)

这时 OCuLink 的 GPU PCIe 数据与额外 Type-C 线承载的 USB扩展数据是两条物理连接，不再共同争用同一条雷电 eGPU 主干；但 GZ301VF 当前讨论的主要使用方式是单根 Thunderbolt 4/5 线连接 DEG2。

## 15. 键盘和鼠标插在 USB 3.2 口是否占用大量带宽

不会。USB 3.2 是 DEG2 端口的最高能力，不是插入设备后固定预留的带宽。

普通键盘和鼠标大多是：

- USB 2.0 Low Speed：1.5Mbps。
- USB 2.0 Full Speed：12Mbps。
- 少数高回报率设备可能使用 USB 2.0 High Speed：能力上限 480Mbps，但实际业务数据远低于此值。

设备插入 USB 3.2 端口后仍按自身 USB2 能力协商，不会自动升级成 USB 3.2，也不会固定占用 5Gbps 或 10Gbps。键鼠只在轮询、移动和按键时产生少量数据，通常是 KB/s 到很低的 MB/s 级别，相对于 40Gbps 主干可以忽略。

USB2 在 Type-C/Thunderbolt 线中通常使用独立的 D+/D− 信号线，不直接占用 USB4 高速 lane；即便 DEG2 内部存在 Hub 和控制器转发，其数据量也不足以对 eGPU 性能造成可测影响。

| 外设 | 对 eGPU 带宽的影响 |
|---|---|
| 键盘、鼠标、手柄 | 基本为零 |
| USB声卡、麦克风 | 通常可忽略 |
| U盘偶尔复制文件 | 复制时轻微占用 |
| 2.5G网卡跑满 | 有一定占用 |
| 10Gbps移动SSD持续传输 | 会与 PCIe tunnel 共享带宽 |
| DEG2 内置 M.2 持续传输 | 会与 PCIe tunnel 共享带宽 |

## 16. 推荐的最终连接方式

```text
ROG 幻X 2023 GZ301VF
 └─ 0.8—1米 Intel认证被动Thunderbolt 5 EPR线
     └─ MINISFORUM DEG2（Thunderbolt模式）
         ├─ PCIe插槽 → 外置显卡
         │              └─ HDMI/DisplayPort → 显示器
         ├─ USB-A → 键盘、鼠标、声卡或U盘
         ├─ 2.5GbE → 网络
         ├─ M.2 → 暂时留空
         └─ 下行Thunderbolt 5
             └─ 仅在端口不足时连接普通10Gbps USB-C Hub
```

这套方案中：

- GZ301VF 到 DEG2 的预期实际链路是 40/40Gbps Gen 3 dual lane。
- JHL9480 显示 USB4 Version 2.0 属于正常的设备能力识别。
- 键鼠不会明显占用 eGPU 带宽。
- 空闲 M.2 不会占用带宽。
- 只有 SSD、M.2、网卡或显示 tunnel 产生持续大流量时，才会与 PCIe eGPU 流量动态共享主干。
- 华硕 PD Firmware V2.13.0.001 是解决 Thunderbolt 5 线完全无反应问题的关键更新。

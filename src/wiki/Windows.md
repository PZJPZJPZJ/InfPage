# Windows:微软系统安装流程
## 安装步骤
### 1. 下载镜像
- 推荐使用浏览器直接从[微软官网](https://www.microsoft.com/zh-cn/software-download)直链下载
- 推荐使用[qBittorrent](https://www.fosshub.com/qBittorrent.html)从[MSDN](https://next.itellyou.cn/)或[旧MSDN](https://msdn.itellyou.cn/)磁力链下载
### 2. 写入镜像到存储设备
> 若需要无损使用存储设备或单次安装使用以下方式写入(不进行格式化可不清空设备)
#### 使用Windows写入(无损写入直接进行第三步)
1. 使用DiskGenius检查U盘(8G及以上)分区方案
   - 推荐转换为MBR分区
       - 仅支持Legacy启动的电脑（约2010年前）
       - 支持UEFI启动的电脑
   - 转换为GPT分区
       - 支持UEFI启动的电脑
       - 有多于4个分区或多EFI启动的需求
2. 检查分区格式(可尝试跳过避免格式化清空)
    - 格式化为FAT32格式
        - 仅支持Legacy启动的电脑（约2010年前）
        - 仅支持FAT32分区UEFI启动的电脑（约2015年前）
        - U盘有其他特殊设备用途（旧版安卓或传统设备使用）
    - 推荐格式化为ExFAT
        - 写入设备为U盘
        - 支持从任意格式分区UEFI启动的电脑
        - 镜像内单文件超过4G
    - 格式化为NTFS
        - 写入设备为硬盘
3. 使用解压软件或自带文件管理解压ISO到U盘根目录
    - 确保EFI文件夹位于U盘根目录
#### 使用Android写入(无损写入直接进行第三步)
1. 使用OTG转接头将U盘(8G及以上)插入手机
2. 检查分区格式(可尝试跳过避免格式化清空)
    - FAT32为默认安卓格式化格式
        - 适用于所有支持UEFI启动的电脑
    - ExFAT或NTFS
        - 不适用于仅支持从FAT32分区UEFI启动的电脑
    - FAT16
        - 仅适用于特殊情况的UEFI启动
3. 使用解压软件或自带文件管理解压ISO到U盘根目录
    - 确保EFI文件夹位于U盘根目录
    - 安卓设备写入会使用缓存，确保解压完成后下拉状态栏进行安全弹出
> 若此存储设备需要专用于系统维护使用以下方式写入
#### 使用WinPE辅助维护和安装
1. 下载[微PE](https://www.wepe.com.cn/download.html)或[FirPE](https://www.firpe.cn/)运行并插入存储设备
2. 制作启动盘
   - 清空存储设备制作:根据工具指引直接制作
   - 保留存储设备文件手动制作:生成ISO镜像，参考Bootice工具写入教程
   - 制作完成后可使用[QEMU](https://pzjpzjpzj.lanzoum.com/ii13M2uhan3g)测试启动盘
3. 将ISO文件放入非启动分区内(通常为ExFAT格式或最大分区)

### 3. 进入BIOS引导存储设备启动


### 4. 执行安装

## 下载链接
### Windows 11
- [x64 BT](magnet:?xt=urn:btih:2fc6fc24f7d56d1def32ae0334d2df0cd3b855ea&dn=zh-cn_windows_11_consumer_editions_version_24h2_x64_dvd_bfc0d79b.iso&xl=5829044224)
- [arm64 BT](magnet:?xt=urn:btih:7aa30070e35c2e38491a7f7addb014623818f2e5&dn=zh-cn_windows_11_consumer_editions_version_24h2_arm64_dvd_4b5c8070.iso&xl=5674188800)
### Windows 10
- [x86 BT](magnet:?xt=urn:btih:9aa435b8c71fa2a85a3df83d5b33e385727ae5d5&dn=zh-cn_windows_10_consumer_editions_version_22h2_updated_oct_2024_x86_dvd_d0cfb2e9.iso&xl=5049681920)
- [x64 BT](magnet:?xt=urn:btih:f5001d461ae74a2833b0cbe6d768b06f436443bc&dn=zh-cn_windows_10_consumer_editions_version_22h2_updated_oct_2024_x64_dvd_d0cfb2e9.iso&xl=7167156224)
- [arm64 BT](magnet:?xt=urn:btih:1254374ee4000b9e8fed508fe2fdcdd8f49c2161&dn=SW_DVD9_Win_Pro_10_22H2.3_64ARM_ChnSimp_Pro_Ent_EDU_N_MLF_X23-36949.ISO&xl=5333610496)
### Windows 8.1
- [x86 ED2K](ed2k://|file|cn_windows_8.1_enterprise_with_update_x86_dvd_6050645.iso|3199901696|0209A1FDE82A5AC7A248B4CA3F860F2B|/)
- [x64 ED2K](ed2k://|file|cn_windows_8.1_enterprise_with_update_x64_dvd_6050374.iso|4317065216|AC8215A13817CC0EC4EA42E5C92E88B7|/)
### Windows 8
- [x86 ED2K](ed2k://|file|cn_windows_8_enterprise_x86_dvd_917682.iso|2597502976|7B6541942A16EB54BC81E84558DF09DF|/)
- [x64 ED2K](ed2k://|file|cn_windows_8_enterprise_x64_dvd_917570.iso|3560837120|8CAE8064C4B8F9CD84941B4FF4A34722|/)
### Windows 7
- [x86 BT](magnet:?xt=urn:btih:585DF592DE43A067C75CFE5A639B41FC3F24DA6F&dn=cn_windows_7_ultimate_with_sp1_x86_dvd_u_677486.iso&xl=2653276160)
- [x64 BT](magnet:?xt=urn:btih:E86414F638E11104248108B155BE9408A8362509&dn=cn_windows_7_ultimate_with_sp1_x64_dvd_u_677408.iso&xl=34205573124)
### Windows Vista
- [x86 ED2K](ed2k://|file|cn_windows_vista_enterprise_with_sp2_x86_dvd_x15-40257.iso|2348410880|A567A6C970038233C0B2B7F130ADEF23|/)
- [x64 ED2K](ed2k://|file|cn_windows_vista_enterprise_with_sp2_x64_dvd_x15-40402.iso|3104415744|D0CF708192BF9596CC603DF53ABDB76D|/)
### Windows XP
- [x86 ED2K](ed2k://|file|zh-hans_windows_xp_professional_with_service_pack_3_x86_cd_x14-80404.iso|630239232|CD0900AFA058ACB6345761969CBCBFF4|/)
### Windows 2000
- [x86 ED2K](ed2k://|file|ZRMPSEL_CN.iso|402690048|00D1BDA0F057EDB8DA0B29CF5E188788|/)

## 激活系统
### Microsoft Activation Scripts
#### 官方地址
- <https://github.com/massgravel/Microsoft-Activation-Scripts>
#### PowerShell命令获取
```shell
irm https://get.activated.win | iex
```
### HEU KMS Activator
#### 官方地址
- <https://github.com/zbezj/HEU_KMS_Activator/releases>

## 驱动安装
### Intel显卡驱动
- [Arc和Xe显卡驱动](https://www.intel.cn/content/www/cn/zh/download/785597/intel-arc-iris-xe-graphics-windows.html)
- [7-10代核芯显卡驱动](https://www.intel.cn/content/www/cn/zh/download/776137/intel-7th-10th-gen-processor-graphics-windows.html)
### NVIDIA显卡驱动
- [NVIDIA App](https://www.nvidia.cn/software/nvidia-app/)
- [显卡驱动](https://www.nvidia.cn/geforce/drivers/)
### AMD显卡驱动
- [AMD Software](https://www.amd.com/zh-cn/products/software/adrenalin.html)
- [显卡驱动](https://www.amd.com/zh-cn/support/download/drivers.html)
### Intel网卡驱动
- [WiFi驱动](https://www.intel.cn/content/www/cn/zh/download/19351/windows-10-and-windows-11-wi-fi-drivers-for-intel-wireless-adapters.html)
- [Bluetooth驱动](https://www.intel.cn/content/www/cn/zh/download/18649/intel-wireless-bluetooth-drivers-for-windows-10-and-windows-11.html)
### Realtek声卡驱动
- [High Definition Audio](https://www.realtek.com/Download/List?cate_id=593&menu_id=298)
### Realtek网卡驱动
- [Network Interface Controllers](https://www.realtek.com/Download/Index?cate_id=194&menu_id=368)
### 驱动工具
- [360驱动大师](https://www.lanzouu.com/iP2mQ1k0yrra)
- [360驱动大师网卡版Part1](https://www.lanzouu.com/iZ1tI1k0ue9a)[360驱动大师网卡版Part2](https://www.lanzouu.com/iyvls1k0uhji)
### 调节工具
- [Intel XTU](https://www.intel.cn/content/www/cn/zh/download/17881/intel-extreme-tuning-utility-intel-xtu.html)
- [Razer Synapse雷云](https://cn.razerzone.com/synapse-4)

## 运行库安装
### [Visual C++](https://learn.microsoft.com/zh-cn/cpp/windows/latest-supported-vc-redist?view=msvc-170)
- [Microsoft Visual C++2015-2022 X64](https://aka.ms/vs/17/release/vc_redist.x64.exe)
- [Microsoft Visual C++2015-2022 X86](https://aka.ms/vs/17/release/vc_redist.x86.exe)
- [Microsoft Visual C++2015-2022 ARM64](https://aka.ms/vs/17/release/vc_redist.arm64.exe)
- [Microsoft Visual C++2013 X64](https://aka.ms/highdpimfc2013x64enu)
- [Microsoft Visual C++2013 X86](https://aka.ms/highdpimfc2013x86enu)
- [Microsoft Visual C++2012 UP4 X64](https://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F9AE/VSU_4/vcredist_x64.exe)
- [Microsoft Visual C++2012 UP4 X86](https://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F9AE/VSU_4/vcredist_x86.exe)
- [Microsoft Visual C++2010 SP1 X64](https://download.microsoft.com/download/1/6/5/165255E7-1014-4D0A-B094-B6A430A6BFFC/vcredist_x64.exe)
- [Microsoft Visual C++2010 SP1 X86](https://download.microsoft.com/download/1/6/5/165255E7-1014-4D0A-B094-B6A430A6BFFC/vcredist_x86.exe)
- [Microsoft Visual C++2008 SP1 X64](https://download.microsoft.com/download/5/D/8/5D8C65CB-C849-4025-8E95-C3966CAFD8AE/vcredist_x64.exe)
- [Microsoft Visual C++2008 SP1 X86](https://download.microsoft.com/download/5/D/8/5D8C65CB-C849-4025-8E95-C3966CAFD8AE/vcredist_x86.exe)
- [Microsoft Visual C++2005 SP1 X64](https://download.microsoft.com/download/4/A/2/4A22001F-FA3B-4C13-BF4E-42EC249D51C4/vcredist_x64.EXE)
- [Microsoft Visual C++2005 SP1 X86](https://download.microsoft.com/download/4/A/2/4A22001F-FA3B-4C13-BF4E-42EC249D51C4/vcredist_x86.EXE)

### [.NET Framework](https://dotnet.microsoft.com/zh-cn/download/dotnet-framework)
- [.NET 7.0 Runtime x64](https://dotnet.microsoft.com/zh-cn/download/dotnet/thank-you/runtime-desktop-7.0.20-windows-x64-installer)
- [.NET 6.0 Runtime x64](https://dotnet.microsoft.com/zh-cn/download/dotnet/thank-you/runtime-desktop-6.0.36-windows-x64-installer)
- [.NET 5.0 Runtime x64](https://dotnet.microsoft.com/zh-cn/download/dotnet/thank-you/runtime-desktop-5.0.17-windows-x64-installer)
- [.NET Framework 4.8.1](https://dotnet.microsoft.com/zh-cn/download/dotnet-framework/net481)
- [.NET Framework 4.7.2](https://dotnet.microsoft.com/zh-cn/download/dotnet-framework/net472)
- [.NET Framework 3.5 SP1](https://dotnet.microsoft.com/zh-cn/download/dotnet-framework/net35-sp1)

## 优化脚本
> 脚本推荐使用PowerShell管理员权限执行
### 修改右键菜单风格
```shell
# 新样式(Win11)
reg delete "HKEY_CURRENT_USER\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /va /f
# 旧样式(Win10)
reg add "HKEY_CURRENT_USER\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
# 修改结束后重启资源管理器
tskill explorer
```
### 恢复睡眠功能
```shell
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Power" /v AwayModeEnabled /t REG_DWORD /d 0 /f
```
### 删除WindowsDefender记录
```shell
# 使用SYSTEM权限或PE执行
rd /s /Q "C:\ProgramData\Microsoft\Windows Defender\Scans\History\Service\DetectionHistory"
```
### 删除聚焦桌面图标
```shell
# 关闭图标
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\HideDesktopIcons\NewStartPanel" /v {2CC5CA98-6485-489A-920E-B3E88A6CCCE3} /t REG_DWORD /d 1 /f
# 开启图标
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\HideDesktopIcons\NewStartPanel" /v {2CC5CA98-6485-489A-920E-B3E88A6CCCE3} /t REG_DWORD /d 0 /f
# 修改结束后重启资源管理器
tskill explorer
```
### 删除图标缓存
```shell
taskkill /f /im explorer.exe
attrib -h -s -r "%userprofile%\AppData\Local\IconCache.db"
del /f "%userprofile%\AppData\Local\IconCache.db"
start explorer.exe
```
### 生成电池报告
```shell
powercfg /batteryreport /output BatteryReport.html
```
### 修改WebDAV安全设置
```shell
# 使用HTTP
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters" /v BasicAuthLevel /t REG_DWORD /d 2 /f
# 仅使用HTTPS
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters" /v BasicAuthLevel /t REG_DWORD /d 1 /f
```
### 修改错误报告服务
```shell
# 开启Windows错误报告
reg delete "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\Windows Error Reporting" /v Disabled /f
# 关闭Windows错误报告
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\Windows Error Reporting" /v Disabled /t REG_DWORD /d 1 /f
```
### 修改任务栏时间格式
```shell
# 短时间格式
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v ShowSecondsInSystemClock /t REG_DWORD /d 0 /f
# 长时间格式(显示秒数)
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v ShowSecondsInSystemClock /t REG_DWORD /d 1 /f
```
### 卸载Win11小组件
```shell
winget uninstall "Widgets Platform Runtime"
winget uninstall "Windows Web Experience Pack"
```
### 卸载Windows自带程序
```shell
# 列出WinApp列表
Get-AppxPackage -allusers | Select Name,PackageFullName
# 卸载手机连接
Get-AppxPackage Microsoft.YourPhone -AllUsers | Remove-AppxPackage
# 卸载移动设备
Get-AppxPackage MicrosoftWindows.CrossDevice -AllUsers | Remove-AppxPackage
```
### 禁用Win11多平面叠加
```shell
# 禁用MPO
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\Dwm" /v OverlayTestMode /t REG_DWORD /d 5 /f
# 恢复MPO(可能导致显示残留问题)
reg delete "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\Dwm" /v OverlayTestMode /f
```
### 允许PowerShell运行未签名脚本
```shell
# 获取当前状态
get-executionpolicy
# 关闭安全策略(选择Y确认)
set-executionpolicy remotesigned
# 恢复默认安全策略(选择Y确认)
set-executionpolicy restricted
```
### 关机时等待未响应程序
```shell
# 开启等待(默认)
reg delete "HKEY_CURRENT_USER\Control Panel\Desktop" /v AutoEndTasks /f
# 关闭等待
reg add "HKEY_CURRENT_USER\Control Panel\Desktop" /v AutoEndTasks /t REG_DWORD /d 1 /f
```
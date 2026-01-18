# Windows:微软操作系统
## 安装教程
### Windows安装程序直接安装
1. 从[微软官网](https://www.microsoft.com/zh-cn/software-download)下载系统ISO
2. 插入存储设备并使用[DiskGenius](/wiki/disk-genius.md)检查以下设置
   - UEFI启动:建议分区方案为MBR(GPT仅可用于UEFI启动)
     - 新版UEFI:建议文件系统为exFAT(可使用NTFS等格式)
     - 传统UEFI:建议文件系统为FAT32(仅支持单文件小于4G)
     - 旧版UEFI:建议文件系统为FAT(不支持启动分区位于128G后的位置)
   - Legacy启动:仅限分区方案为MBR，启动分区引导记录使用BOOTMGR，并激活该启动文件所在分区
     - 新版Legacy:建议文件系统为FAT32，主引导记录为WindowsNT6.x
     - 旧版Legacy:建议文件系统为FAT，主引导记录为WindowsNT5.x
3. 解压ISO到存储设备根目录
   - UEFI启动:确保`EFI`文件夹、`bootmgr.efi`文件(非必须)，位于设备根目录
   - Legacy启动:确保`BOOT`文件夹、`bootmgr`文件，位于设备根目录
4. 启动电脑在初始BIOS画面不断按下DEL/F1~F12/ESC等键盘按键，尝试选择从存储设备启动
5. 根据提示进行分区和系统安装

### WindowsPE辅助安装
1. 下载[微PE](https://www.wepe.com.cn/download.html)或[FirPE](https://www.firpe.cn/)运行
2. 插入存储设备制作启动盘
   - 清空存储设备制作:根据工具指引直接制作
   - 保留存储设备文件手动制作:生成ISO镜像，参考[Bootice](/wiki/bootice.md)工具写入教程
   - 制作完成后可使用[QEMU](https://pzjpzjpzj.lanzoum.com/ii13M2uhan3g)测试启动盘
3. 从[微软官网](https://www.microsoft.com/zh-cn/software-download)将系统ISO文件放入非启动分区内
4. 启动电脑在初始BIOS画面不断按下DEL/F1~F12/ESC等键盘按键，尝试选择从存储设备启动
5. 进入存储设备中选择ISO镜像挂载，打开挂载虚拟光盘
6. 选择`setup.exe`运行安装程序
   - 全新安装推荐选择`/sources/setup.exe`进行安装
   - 全新安装或升级现有系统可使用`/setup.exe`进行安装
7. 根据提示进行分区和系统安装

### 视频教程
- [硬件茶谈-系统安装教程](https://www.bilibili.com/video/BV1DJ411D79y)
- [硬件茶谈-硬件组装教程](https://www.bilibili.com/video/BV1BG4y137mG)

## 下载链接
[Win11-25H2-x64]: magnet:?xt=urn:btih:afcf7cd029be077521db30cf5ef66fa6d0daad9e&dn=zh-cn_windows_11_consumer_editions_version_25h2_updated_nov_2025_x64_dvd_4ace2901.iso&xl=7863162880
[Win11-24H2-x64]: magnet:?xt=urn:btih:bc18d66c6105ef2e81ae8e253bdbc5467aca79e1&dn=zh-cn_windows_11_consumer_editions_version_24h2_updated_july_2025_x64_dvd_a1f0681d.iso&xl=7204851712
[Win11-24H2-arm64]: magnet:?xt=urn:btih:7aa30070e35c2e38491a7f7addb014623818f2e5&dn=zh-cn_windows_11_consumer_editions_version_24h2_arm64_dvd_4b5c8070.iso&xl=5674188800
[Win11-23H2-x64]: magnet:?xt=urn:btih:c0dbf0b64fd2f16c9fbca08e123edf75eff5582e&dn=zh-cn_windows_11_consumer_editions_version_23h2_updated_sep_2024_x64_dvd_edcefbe4.iso&xl=7183915008
[Win11-23H2-arm64]: magnet:?xt=urn:btih:64fb7c011f407628471432d8cd52b2b5c6c52673&dn=SW_DVD9_Win_Pro_11_23H2_Arm64_ChnSimp_Pro_Ent_EDU_N_MLF_X23-59518.ISO&xl=7142125568
[Win10-22H2-x64]: magnet:?xt=urn:btih:d5146f69f1bb6b9d95c8270769ebca7f82c2936a&dn=zh-cn_windows_10_consumer_editions_version_22h2_updated_oct_2025_x64_dvd_38efd00d.iso&xl=7168839680
[Win10-22H2-arm64]: magnet:?xt=urn:btih:1254374ee4000b9e8fed508fe2fdcdd8f49c2161&dn=SW_DVD9_Win_Pro_10_22H2.3_64ARM_ChnSimp_Pro_Ent_EDU_N_MLF_X23-36949.ISO&xl=5333610496
[Win10-22H2-x86]: magnet:?xt=urn:btih:fc99857d981056d5e97566b78f06d0f2ca9d70c1&dn=zh-cn_windows_10_consumer_editions_version_22h2_updated_oct_2025_x86_dvd_38efd00d.iso&xl=5006340096
[Win8.1-Update-x64]: ed2k://%7Cfile%7Ccn_windows_8.1_enterprise_with_update_x64_dvd_6050374.iso%7C4317065216%7CAC8215A13817CC0EC4EA42E5C92E88B7%7C/
[Win8.1-Update-x86]: ed2k://%7Cfile%7Ccn_windows_8.1_enterprise_with_update_x86_dvd_6050645.iso%7C3199901696%7C0209A1FDE82A5AC7A248B4CA3F860F2B%7C/
[Win8-RTM-x64]: ed2k://%7Cfile%7Ccn_windows_8_enterprise_x64_dvd_917570.iso%7C3560837120%7C8CAE8064C4B8F9CD84941B4FF4A34722%7C/
[Win8-RTM-x86]: ed2k://%7Cfile%7Ccn_windows_8_enterprise_x86_dvd_917682.iso%7C2597502976%7C7B6541942A16EB54BC81E84558DF09DF%7C/
[Win7-SP1-x64]: magnet:?xt=urn:btih:E86414F638E11104248108B155BE9408A8362509&dn=cn_windows_7_ultimate_with_sp1_x64_dvd_u_677408.iso&xl=34205573124
[Win7-SP1-x86]: magnet:?xt=urn:btih:585DF592DE43A067C75CFE5A639B41FC3F24DA6F&dn=cn_windows_7_ultimate_with_sp1_x86_dvd_u_677486.iso&xl=2653276160
[WinVista-SP2-x64]: ed2k://%7Cfile%7Ccn_windows_vista_enterprise_with_sp2_x64_dvd_x15-40402.iso%7C3104415744%7CD0CF708192BF9596CC603DF53ABDB76D%7C/
[WinVista-SP2-x86]: ed2k://%7Cfile%7Ccn_windows_vista_enterprise_with_sp2_x86_dvd_x15-40257.iso%7C2348410880%7CA567A6C970038233C0B2B7F130ADEF23%7C/
[WinXP-SP3-x86]: ed2k://%7Cfile%7Czh-hans_windows_xp_professional_with_service_pack_3_x86_cd_x14-80404.iso%7C630239232%7CCD0900AFA058ACB6345761969CBCBFF4%7C/
[Win2000-SP4-x86]: ed2k://%7Cfile%7CZRMPSEL_CN.iso%7C402690048%7C00D1BDA0F057EDB8DA0B29CF5E188788%7C/

| 系统          | 版本   | x64                       | arm64                  | x86                       |
| ------------- | ------ | ------------------------- | ---------------------- | ------------------------- |
| Windows 11    | 25H2   | [BT][Win11-25H2-x64]      |                        |                           |
| Windows 11    | 24H2   | [BT][Win11-24H2-x64]      | [BT][Win11-24H2-arm64] |                           |
| Windows 11    | 23H2   | [BT][Win11-23H2-x64]      | [BT][Win11-23H2-arm64] |                           |
| Windows 10    | 22H2   | [BT][Win10-22H2-x64]      | [BT][Win10-22H2-arm64] | [BT][Win10-22H2-x86]      |
| Windows 8.1   | Update | [ED2K][Win8.1-Update-x64] |                        | [ED2K][Win8.1-Update-x86] |
| Windows 8     | RTM    | [ED2K][Win8-RTM-x64]      |                        | [ED2K][Win8-RTM-x86]      |
| Windows 7     | SP1    | [BT][Win7-SP1-x64]        |                        | [BT][Win7-SP1-x86]        |
| Windows Vista | SP2    | [ED2K][WinVista-SP2-x64]  |                        | [ED2K][WinVista-SP2-x86]  |
| Windows XP    | SP3    |                           |                        | [ED2K][WinXP-SP3-x86]     |
| Windows 2000  | SP4    |                           |                        | [ED2K][Win2000-SP4-x86]   |

- BT:需要使用[qBittorrent](/wiki/qbittorrent.md)或类似软件从[MSDN](https://next.itellyou.cn/)下载
- ED2K:需要使用[eMule](https://www.emule-project.com/)或类似软件从[旧MSDN](https://msdn.itellyou.cn/)下载

## 激活系统
### Microsoft Activation Scripts
1. 获取激活脚本
   - **Windows8及更高**：打开PowerShell（Win+X选择终端），粘贴下列代码，按`Enter`执行
      ```shell
      irm https://get.activated.win | iex
      ```
   - **WindowsVista及更高**：使用浏览器访问下列链接下载，解压`master.zip`文件，打开`All-In-One-Version`文件夹，运行`MAS_AIO.cmd`脚本
     - [官网](https://massgrave.dev/)
     - [Github](https://github.com/massgravel/Microsoft-Activation-Scripts)
     - [仓库直链](https://github.com/massgravel/Microsoft-Activation-Scripts/archive/refs/heads/master.zip)
     - [官网直链](https://git.activated.win/massgrave/Microsoft-Activation-Scripts/archive/master.zip)
   
2. 按照终端说明进行激活
   - Windows激活输入`1`，等待图示激活完成
   - Office激活输入`2`，等待图示激活完成
   - 若无法激活输入`4`进行KMS38激活（激活有效期至2038年）

### HEU KMS Activator
1. 访问[Github](https://github.com/zbezj/HEU_KMS_Activator/releases)下载激活工具
2. 按照工具提示进行激活

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

## 调节工具
### 系统调节
- [ViVeTool系统功能开关工具](https://github.com/thebookisclosed/ViVe)
- [IntelXTU英特尔调节工具](https://www.intel.cn/content/www/cn/zh/download/17881/intel-extreme-tuning-utility-intel-xtu.html)
### 外设调节
- [G-Helper华硕开源工具](https://github.com/seerge/g-helper)
- [RazerSynapse雷蛇雷云](https://cn.razerzone.com/synapse-4)

## 运行库安装
### [Visual C++](https://learn.microsoft.com/zh-cn/cpp/windows/latest-supported-vc-redist?view=msvc-170)
- Microsoft Visual C++2015-2022
  - [x64](https://aka.ms/vs/17/release/vc_redist.x64.exe)
  - [x86](https://aka.ms/vs/17/release/vc_redist.x86.exe)
  - [arm64](https://aka.ms/vs/17/release/vc_redist.arm64.exe)
- Microsoft Visual C++2013
  - [x64](https://aka.ms/highdpimfc2013x64enu)
  - [x86](https://aka.ms/highdpimfc2013x86enu)
- Microsoft Visual C++2012 UP4
  - [x64](https://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F9AE/VSU_4/vcredist_x64.exe)
  - [x86](https://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F9AE/VSU_4/vcredist_x86.exe)
- Microsoft Visual C++2010 SP1
  - [x64](https://download.microsoft.com/download/1/6/5/165255E7-1014-4D0A-B094-B6A430A6BFFC/vcredist_x64.exe)
  - [x86](https://download.microsoft.com/download/1/6/5/165255E7-1014-4D0A-B094-B6A430A6BFFC/vcredist_x86.exe)
- Microsoft Visual C++2008 SP1
  - [x64](https://download.microsoft.com/download/5/D/8/5D8C65CB-C849-4025-8E95-C3966CAFD8AE/vcredist_x64.exe)
  - [x86](https://download.microsoft.com/download/5/D/8/5D8C65CB-C849-4025-8E95-C3966CAFD8AE/vcredist_x86.exe)
- Microsoft Visual C++2005 SP1
  - [x64](https://download.microsoft.com/download/4/A/2/4A22001F-FA3B-4C13-BF4E-42EC249D51C4/vcredist_x64.EXE)
  - [x86](https://download.microsoft.com/download/4/A/2/4A22001F-FA3B-4C13-BF4E-42EC249D51C4/vcredist_x86.EXE)

### [.NET Framework](https://dotnet.microsoft.com/zh-cn/download/dotnet-framework)
- [.NET Framework 4.8.1](https://download.microsoft.com/download/4/b/2/cd00d4ed-ebdd-49ee-8a33-eabc3d1030e3/NDP481-x86-x64-AllOS-ENU.exe)
- [.NET Framework 4.7.2](https://download.microsoft.com/download/6/E/4/6E48E8AB-DC00-419E-9700-19FFC7A0CAFE/NDP472-KB4054530-x86-x64-AllOS-ENU.exe)
- [.NET Framework 4.6.2](https://download.microsoft.com/download/F/9/4/F942F07D-F26F-4F30-B4E3-EBD54FABA377/NDP462-KB3151800-x86-x64-AllOS-ENU.exe)
- [.NET Framework 4.5.2](https://download.microsoft.com/download/E/2/1/E21644B5-2DF2-47C2-91BD-63C560427900/NDP452-KB2901907-x86-x64-AllOS-ENU.exe)
- [.NET Framework 3.5.1](https://download.microsoft.com/download/2/0/E/20E90413-712F-438C-988E-FDAA79A8AC3D/dotnetfx35.exe)

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
# 使用SYSTEM权限或PE系统执行
rd /s /Q "C:\ProgramData\Microsoft\Windows Defender\Scans\History\Service\DetectionHistory"
```
### 修改Windows更新可暂停天数
```shell
# 修改可暂停天数365天（可更改），修改完成进入（设置>Windows更新）选择暂停
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings" /v FlightSettingsMaxPauseDays /t REG_DWORD /d 365 /f
# 恢复默认可暂停天数
reg delete "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings" /v FlightSettingsMaxPauseDays /f
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
### 跳过Win11联网激活
```shell
# 联网界面按Shift+F10
start ms-cxh:localonly
```

## 常见问题
### BitLocker驱动器加密
当 BitLocker 无法在 Windows 中自动解锁加密驱动器时，需要 BitLocker 恢复密钥。 此密钥是一个 48 位数字，用于重新获得对驱动器的访问权限。
![输入恢复密钥提示](https://support.microsoft.com/images/zh-cn/70d2ab07-0b73-4c82-b439-15c6f4235f96)
- 如果 BitLocker 恢复密钥已备份到 Microsoft 帐户：访问[微软账户-设备](https://aka.ms/myrecoverykey)，根据ID找到对应密钥
   ![帐户存储密钥](https://support.microsoft.com/images/zh-cn/6ef3ec86-2ab8-49fb-95cd-bb1e5a64af2d)
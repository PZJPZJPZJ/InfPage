---
routeMeta:
  itemTitle: macOS
  itemDesc: 黑苹果安装教程与工具
  itemIcon: apple.com
---
# macOS:苹果系统
## 安装教程
### 创建启动程序
#### EFI启动文件
访问[OpCore-Simplify](https://github.com/lzhoang2801/OpCore-Simplify)自动生成工具，下载[OpCore-Simplify-ZIP](https://github.com/lzhoang2801/OpCore-Simplify/archive/refs/heads/main.zip)，按照`README.md`文档进行操作

推荐EFI下载：
- [MacHyperVSupport](https://github.com/acidanthera/MacHyperVSupport)
- [OSX-Hyper-V](https://github.com/Qonfused/OSX-Hyper-V)
- [macOS_On_Hyper-V](https://github.com/balopez83/macOS_On_Hyper-V)
- [KVM-Opencore](https://github.com/thenickdude/KVM-Opencore)

> 可使用[OCAuxiliaryTools](https://github.com/ic005k/OCAuxiliaryTools)编辑EFI文件配置细节

#### macOS恢复镜像
##### 恢复程序在线安装（安装时需要有可用网络）
首先下载[OpenCore](https://github.com/acidanthera/OpenCorePkg)，进入`/Utilities/macrecovery`文件夹内启动`cmd`

![进入回复程序下载工具](https://dortania.github.io/OpenCore-Install-Guide/assets/img/open-cmd-current-folder.906148d4.gif)

选择其中之一的macOS版本，运行python命令（依赖于Python3）

```shell
# Lion (10.7):
py macrecovery.py -b Mac-2E6FAB96566FE58C -m 00000000000F25Y00 download
py macrecovery.py -b Mac-C3EC7CD22292981F -m 00000000000F0HM00 download
# Mountain Lion (10.8):
py macrecovery.py -b Mac-7DF2A3B5E5D671ED -m 00000000000F65100 download
# Mavericks (10.9):
py macrecovery.py -b Mac-F60DEB81FF30ACF6 -m 00000000000FNN100 download
# Yosemite (10.10):
py macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000GDVW00 download
# El Capitan (10.11):
py macrecovery.py -b Mac-FFE5EF870D7BA81A -m 00000000000GQRX00 download
# Sierra (10.12):
py macrecovery.py -b Mac-77F17D7DA9285301 -m 00000000000J0DX00 download
# High Sierra (10.13)
py macrecovery.py -b Mac-7BA5B2D9E42DDD94 -m 00000000000J80300 download
py macrecovery.py -b Mac-BE088AF8C5EB4FA2 -m 00000000000J80300 download
# Mojave (10.14)
py macrecovery.py -b Mac-7BA5B2DFE22DDD8C -m 00000000000KXPG00 download
# Catalina (10.15)
py macrecovery.py -b Mac-00BE6ED71E35EB86 -m 00000000000000000 download
# Big Sur (11)
py macrecovery.py -b Mac-42FD25EABCABB274 -m 00000000000000000 download
# Monterey (12)
py macrecovery.py -b Mac-FFE5EF870D7BA81A -m 00000000000000000 download
# Ventura (13)
py macrecovery.py -b Mac-4B682C642B45593E -m 00000000000000000 download
# Sonoma (14)
py macrecovery.py -b Mac-226CB3C6A851A671 -m 00000000000000000 download
# Sequoia (15)
py macrecovery.py -b Mac-937A206F2EE63C01 -m 00000000000000000 download
```
![下载macOS恢复程序命令行](https://dortania.github.io/OpenCore-Install-Guide/assets/img/macrecovery-done.1b0960bc.png)

打开磁盘管理，在任意磁盘设备创建`FAT32`分区（约1GB空间）

> 单硬盘可使用[DiskGenius](/wiki/disk-genius.md)继续创建一个`HFS+`分区，启动系统后使用macOS磁盘工具抹掉该分区为`APFS`格式，即可在安装程序中选择该分区进行安装

复制`com.apple.recovery.boot`和`EFI`文件夹到该分区根目录

![下载macOS恢复程序命令行](https://dortania.github.io/OpenCore-Install-Guide/assets/img/com-efi-done.a6fb730e.png)

##### 离线写入恢复镜像（需提前下载完整系统镜像）
- macOS系统：访问[Apple官方下载支持](https://support.apple.com/zh-cn/102662)，使用macOS系统命令制作系统镜像磁盘
- Windows系统：运行镜像下载工具[gibMacOS](https://github.com/corpnewt/gibMacOS)，使用[TransMac](https://pzjpzjpzj.lanzoum.com/i44Ry2rpxr3i)或[BalenaEtcher](/wiki/balena-etcher.md)将完整系统镜像写入磁盘

## 驱动编辑
### Itlwm(Intel无线网卡驱动)
编辑`/EFI/OC/Kexts/itlwm.kext/Contents/Info.plist`文件，找到`WiFiConfig`相关配置进行修改

```xml
<key>WiFiConfig</key>
<dict>
  <key>WiFi_1</key>
  <dict>
    <key>password</key>
    <string>修改成WiFi密码</string>
    <key>ssid</key>
    <string>修改成WiFi名称</string>
  </dict>
</dict>
```

## 其他教程
- [OpenCore Install Guide](https://dortania.github.io/OpenCore-Install-Guide/)
---
routeMeta:
  itemTitle: Android
  itemDesc: 安卓设备
  itemIcon: developer.android.google.cn
---
# Android:安卓设备
## 系统资讯
- [HyperOS(小米)更新资源-Telegram](https://t.me/VoyagerMIUIUpdate)
- [OneUI(三星)更新资讯-Telegram](https://t.me/samsungoneuiglobal)

## 系统工具
### 软件包安装器
- [InstallerX](https://github.com/wxxsfxyzm/InstallerX-Revived)
### 功耗检测工具
- [Scene-官网](http://vtools.omarea.com)
  - [Scene-Github](https://github.com/helloklf/vtools)
### 运行库检测工具
- [LibChecker-Github](https://github.com/LibChecker/LibChecker)
### 终端模拟器
- [Termux-官网](https://termux.dev/cn/)
  - [Termux-Github](https://github.com/termux/termux-app)
### 文件管理器
- [MT Manager-官网](https://mt2.cn/)

## ADB管理工具
### Shizuku
- [Shizuku-官网](https://shizuku.rikka.app/)
  - [Shizuku-Github](https://github.com/RikkaApps/Shizuku)

## ROOT管理工具
### 系统框架工具
- [Magisk](https://github.com/topjohnwu/Magisk)

## 安卓调试桥
- [AndroidDebugBridge(ADB)-Windows](https://googledownloads.cn/android/repository/platform-tools-latest-windows.zip)
- [AndroidDebugBridge(ADB)-macOS](https://googledownloads.cn/android/repository/platform-tools-latest-darwin.zip)
- [AndroidDebugBridge(ADB)-Linux](https://googledownloads.cn/android/repository/platform-tools-latest-linux.zip)
### 使用命令
``` bash
# 启动adb服务
adb start-server
# 结束adb服务
adb kill-server
#####
# 授权配对
adb pair 网络地址:端口
# 建立连接
adb connect 网络地址:端口
# 断开连接
adb disconnect 网络地址:端口
# 已连接设备列表
adb devices
#####
# 安装程序
adb install 安装包目录
#####
# 卸载小米电视桌面
adb shell pm uninstall --user 0 com.mitv.tvhome
# 卸载小米电视应用商店
adb shell pm uninstall --user 0 com.xiaomi.mitv.appstore
# 卸载小米电视系统升级
adb shell pm uninstall --user 0 com.xiaomi.mitv.upgrade
# 卸载小米电视广告插件
adb shell pm uninstall --user 0 com.miui.systemAdSolution
```
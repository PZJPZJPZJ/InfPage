---
routeMeta:
  itemTitle: Android
  itemDesc: 安卓工具与资讯
  itemIcon: developer.android.google.cn
---
# Android:安卓工具与资讯
## 系统资讯
- [HyperOS(小米)更新资源-Telegram](https://t.me/VoyagerMIUIUpdate)
- [OneUI(三星)更新资讯-Telegram](https://t.me/samsungoneuiglobal)

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
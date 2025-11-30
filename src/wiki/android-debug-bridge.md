# Android Debug Bridge:安卓调试桥
## 下载地址
- [ADB Windows](https://googledownloads.cn/android/repository/platform-tools-latest-windows.zip)
- [ADB Mac](https://googledownloads.cn/android/repository/platform-tools-latest-darwin.zip)
- [ADB Linux](https://googledownloads.cn/android/repository/platform-tools-latest-linux.zip)
## 服务状态
``` bash
# 启动adb服务
adb start-server
# 结束adb服务
adb kill-server
```
## 无线连接
``` bash
# 授权配对
adb pair 网络地址:端口
# 建立连接
adb connect 网络地址:端口
# 断开连接
adb disconnect 网络地址:端口
# 已连接设备列表
adb devices
```
## 安装程序
``` bash
# 通用安装
adb install 安装包目录
```
## 卸载程序
``` bash
# 小米电视桌面
adb shell pm uninstall --user 0 com.mitv.tvhome
# 小米电视应用商店
adb shell pm uninstall --user 0 com.xiaomi.mitv.appstore
# 小米电视系统升级
adb shell pm uninstall --user 0 com.xiaomi.mitv.upgrade
# 小米电视广告插件
adb shell pm uninstall --user 0 com.miui.systemAdSolution
```
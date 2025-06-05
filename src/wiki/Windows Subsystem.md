# Windows Subsystem:Windows子系统
## Windows Subsystem for Linux
### 安装步骤
1. 访问[微软商店历史版本](https://store.rg-adguard.net/)输入<https://apps.microsoft.com/detail/9P9TQF7MRM4R>链接搜索
2. 选择`WindowsSubsystemForLinux.msixbundle`文件下载
3. 打开安装包进行安装
## Windows Subsystem for Android
### 安装步骤
1. 访问[微软商店历史版本](https://store.rg-adguard.net/)输入<https://apps.microsoft.com/detail/9P3395VX91NR>链接搜索
2. 选择`WindowsSubsystemForAndroid.msixbundle`文件下载
3. 打开安装包进行安装
### WSABuilds工具
#### 安装
1. 访问[WSABuilds GitHub](https://github.com/MustardChef/WSABuilds)选择对应版本下载(推荐使用NoGApps-RemovedAmazon)
    - [Win10 X64 Stable](https://github.com/MustardChef/WSABuilds/releases/tag/Windows_10_2407.40000.4.0)
    - [Win11 X64 Stable](https://github.com/MustardChef/WSABuilds/releases/tag/Windows_11_2407.40000.4.0)
    - [Win11 ARM64 Stable](https://github.com/MustardChef/WSABuilds/releases/tag/Windows_11_2407.40000.4.0_arm64)
2. 解压7Z文件并以管理员身份运行`Run.bat`
#### 卸载
1. 确保 Windows Subsystem For Android 未运行
2. 通过添加和删除程序卸载Windows Subsystem For Android
#### 备份与恢复
1. 复制`%LOCALAPPDATA%\Packages\MicrosoftCorporationII.WindowsSubsystemForAndroid_8wekyb3d8bbwe\LocalCache`目录到安全位置
2. 将复制出来目录内`userdata.vhdx`和`metadata.vhdx`重命名并覆盖软件安装根目录的同名文件
3. 完成卸载后或其他设备使用时完整移动软件目录并以管理员身份运行`Run.bat`即可恢复数据
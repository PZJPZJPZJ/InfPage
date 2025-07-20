# Parsec Virtual Display:开源虚拟显示器
## 安装教程
1. 访问[Github](https://github.com/nomi-san/parsec-vdd/releases)下载最新安装程序
    - [便携版-网盘下载](https://pzjpzjpzj.lanzoum.com/izDH02t7z5va)
2. 打开`parsec-vdd.exe`安装虚拟屏幕驱动程序
3. 运行`ParsecVDisplay.exe`控制面板工具
4. 使用`ADD DISPLAY`添加虚拟屏幕并设置分辨率
   - 可通过右键任务栏图标设置开机启动
<img src="https://i1.hdslb.com/bfs/article/92a68d67d6d0d8e5dde1679a60d7bc9e3546643083299814.jpg" alt="添加虚拟屏幕" referrerPolicy="no-referrer">
## 实现串流无屏幕或副屏
1. 下载[Sunshine](https://github.com/LizardByte/Sunshine)串流服务端并安装
2. 测试控制端[Moonlight-Android](https://github.com/moonlight-stream/moonlight-android)连接状况
3. 在Sunshine工具tools目录，使用命令行运行`dxgi-info.exe`查看虚拟屏幕输出名
<img src="https://i1.hdslb.com/bfs/article/52ce772be38fbb646f8c017dcf06b1a53546643083299814.jpg" alt="查看虚拟屏幕输出名" referrerPolicy="no-referrer">
4. 在Sunshine界面进入Configuration的Output Name项填写虚拟屏幕输出名
<img src="https://i1.hdslb.com/bfs/article/35b48e44b8064241db50397a27926c1d3546643083299814.jpg" alt="配置输出屏幕" referrerPolicy="no-referrer">
## 设置虚拟屏幕父级显卡
1. 访问注册表`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\WUDF\Services\ParsecVDA\Parameters`
2. 修改`DisablePreferredRenderAdapterChange`参数为`0`，否则功能不生效
3. 新建`DWORD(32位)值`，名称`PreferredRenderAdapterVendorId`，数值数据选择16进制填写`GPU Vendor ID`（可通过`dxgi-info.exe`获取）
    - Intel显卡填写`8086`
    - NVIDIA显卡填写`10DE`
    - AMD显卡填写`1002`
4. 重启显卡适配器，启动虚拟显示屏
# OpenCore:黑苹果引导程序
## 官方地址
- <https://github.com/acidanthera/OpenCorePkg>

## 配置下载地址
- HyperV
  - <https://github.com/acidanthera/MacHyperVSupport>
  - <https://github.com/Qonfused/OSX-Hyper-V>
  - <https://github.com/balopez83/macOS_On_Hyper-V>
- [KVM](https://github.com/thenickdude/KVM-Opencore)

## 文件目录说明
* Docs：官方文档
* HyperV：HyperV虚拟机引导
* IA32：32位原版引导
* KVM：Proxmox或QEMU引导
* Utilities:原版工具
* X64:64位原版引导

## 引导使用方法
1. 创建FAT32分区并在根目录放入对应EFI文件夹
2. 在分区根目录创建com.apple.recovery.boot文件夹，并放入BaseSystem.dmg和BaseSystem.chunklist文件
3. 使用UEFI引导启动，无法启动时先运行CleanNvram，然后再运行安装程序

## 配置文件修改教程
- [OCAuxiliaryTools跨平台工具](https://github.com/ic005k/OCAuxiliaryTools)

## macOS下载
- [gibMacOS下载工具](https://github.com/corpnewt/gibMacOS)
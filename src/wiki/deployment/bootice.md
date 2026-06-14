---
routeMeta:
  itemTitle: Bootice
  itemDesc: 引导扇区维护与编辑工具
  itemIcon: terabyteunlimited.com
---
# Bootice:启动引导编辑工具
## 下载地址
- [Bootice](https://lon-01.dlo4d.com/files/bootice/BOOTICE_2016.06.17_v1.3.4.0.zip)
  - [网盘下载](https://pzjpzjpzj.lanzoum.com/ieLXx327lfze)

## 提取启动文件
- boot
  - bcd (启动配置文件)
  - boot.sdi (虚拟磁盘文件,使用RamDisk必须)
- efi
  - boot
    - bootia32.efi (x86通用EFI引导)
    - bootx64.efi (x64通用EFI引导)
    - bootaa64.efi (arm64通用EFI引导)
  - microsoft
    - boot
      - bcd (启动配置文件,与boot>bcd一致)
- sources
    - boot.wim (RamDisk启动镜像)
    - boot.vhdx (VHD/VHDX启动虚拟磁盘)
- bootmgr (Legacy专用Windows引导)
- bootmgr.efi (EFI专用Windows引导)

## 配置教程
### 物理磁盘
#### 主引导记录
1. 选择目标磁盘，点击主引导记录修改磁盘开始扇区
2. 点击安装配置，选择`Windows NT 6.x MBR`类型
3. 提示已成功更新主引导记录即可

#### 分区引导记录
1. 点击分区引导记录，选择目标分区修改分区开始的区域
2. 选择`BOOTMGR引导记录`类型，点击安装配置
3. 提示成功更新该分区的PBR即可

#### 分区管理
1. 进入重新分区选择USB-HDD模式
2. 建议将第一个分区选择ExFAT(闪存盘)或NTFS(机械硬盘和固态硬盘),分配最大存储空间，留下合适的给第二个分区
3. 建议将第二个分区选择FAT32(推荐)或FAT16(旧机型)，分配300MB(仅存放引导配置时建议分配)或1GB及以上(存放PE系统wim镜像时建议分配)
    - 若使用FAT16分区格式，当第一个分区超过128G时，后面分区常出现无法引导情况
4. 建议选择MBR分区表类型以兼容所有启动类型
   - Legacy启动：从MBR磁盘的活动分区（BIOS启动兼容的文件系统，通常为FAT32）启动
   - UEFI启动：从MBR或GPT磁盘的任意包含EFI文件夹与efi启动文件的文件系统启动
5. 成功分区后，选择第二个分区(FAT32或FAT)点击激活按钮，设置为活动分区

### BCD编辑
- Legacy启动:选择`boot/bcd`文件进行配置
- UEFI启动:选择`efi/microsoft/boot/bcd`文件进行配置
#### 分区启动
1. 选择BCD文件后，进入智能编辑模式
2. 窗口左侧选择添加`新建Windows启动项`
3. 窗口右侧在默认设置基础上修改启动磁盘和启动分区
    - 启用Win8Metro启动界面:建议开启
    - NX:建议选择`OptIn`
4. 保存全局设置，并保存当前系统设置
5. 离开编辑并重新启动，进入开机启动菜单，选择当前磁盘启动

#### RamDisk启动
1. 选择BCD文件后，进入智能编辑模式
2. 窗口左侧选择添加`新建WIM启动项`
3. 窗口右侧在默认设置基础上修改
   - 启动磁盘:可选择其他分区上的启动镜像
   - 设备文件:通常选择`\sources\boot.wim`启动镜像
   - SDI文件:通常选择`\boot\boot.sdi`文件
   - PAE:建议选择`Force Enable`
   - NX:建议选择`OptIn`
4. 保存全局设置，并保存当前系统设置
5. 进入高级编辑模式
6. 选择`BcdStore>Application objects`下刚刚创建的启动项
7. 右键空白区域新建参数，选择`GraphicsForceHighestMode`,参数值选择`True`，确定创建(确保系统识别到原生屏幕分辨率)
8. 离开编辑并重新启动，进入开机启动菜单，选择当前磁盘启动

#### VHD(X)启动
1. 选择BCD文件后，进入智能编辑模式
2. 窗口左侧选择添加`新建VHD启动项`
3. 窗口右侧在默认设置基础上修改
    - 启动磁盘:可选择其他分区上的虚拟磁盘文件
    - 设备文件:选择分区内`.vhd`或`.vhdx`虚拟磁盘
4. 保存全局设置，并保存当前系统设置
5. 进入高级编辑模式
6. 选择`BcdStore>Application objects`下刚刚创建的启动项
7. 右键空白区域新建参数，选择`GraphicsForceHighestMode`,参数值选择`True`，确定创建(确保系统识别到原生屏幕分辨率)
8. 离开编辑并重新启动，进入开机启动菜单，选择当前磁盘启动
   - 若使用`vhdx`格式，出现`VHD_BOOT_HOST_VOLUME_NOT_ENOUGH_SPACE`错误时
       - 使用Dism++，进入`控制面板>系统优化>其他>VHD启动时不要将VHD动态文件扩展到最大`并打开
   - 若为新安装系统，则安装过程出现出错提示后
       1. 按`Shift+F10`打开命令提示符
       2. 输入regedit打开注册表编辑器，修改`HKEY_LOCAL_MACHINE/SYSTEM/setup`下的所有`REG_DWORD`的值为`0`
       3. 继续输入`net user administrator /active:yes`命令开启默认管理员账户
       4. 完成后`shutdown -r -t 0`重启跳过OOBE流程直接进入系统
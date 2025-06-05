# Bootice:启动引导编辑工具
## 下载地址
- [Bootice](https://lon-01.dlo4d.com/files/bootice/BOOTICE_2016.06.17_v1.3.4.0.zip)

## 提取启动文件
1. 打开任意Windows`.iso`镜像
2. 按照目录提取必要文件
   - boot
     - bcd
     - boot.sdi
   - efi
     - boot
       - bootia32.efi
       - bootx64.efi
     - microsoft
       - boot
         - bcd
   - bootmgr
   - bootmgr.efi
3. 使用Bootice分别配置两个`bcd`文件

## 配置教程
### 物理磁盘
#### 主引导记录MBR
> 磁盘开始的512个字节

#### 分区引导记录PBR
> 分区开始的区域

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

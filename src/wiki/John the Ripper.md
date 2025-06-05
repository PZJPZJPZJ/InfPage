# John the Ripper:文件哈希获取工具
## 官方地址
- <https://www.openwall.com/john/>

## 使用教程
```shell
#获取ZIP文件哈希并破解
zip2john 文件路径 > zip.hash
john --format=PKZIP > zip.hash
#获取RAR件哈希并破解
rar2john 文件路径 > rar.hash
john --format=RAR5 rar.hash
#获取7Z文件哈希并破解
7z2john 文件路径 > 7z.hash
john --format=7z 7z.hash
```
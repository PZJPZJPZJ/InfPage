# Hashcat:哈希密码破解工具
## 官方地址
- [官网](https://hashcat.net/)
- [Hashcat Binaries](https://hashcat.net/files/hashcat-6.2.6.7z)

## 使用教程
> 文件哈希通过[John the Ripper](https://www.openwall.com/john/)获取
```shell
#使用ZIP哈希破解
zip2john 文件路径
hashcat -m 17225 -w 4 -a 3 '文件哈希'
#使用RAR哈希破解
rar2john 文件路径
hashcat -m 13000 -w 4 -a 3 '文件哈希'
#使用7Z哈希破解
7z2john 文件路径
hashcat -m 11600 -w 4 -a 3 '文件哈希'
```
# NextTrace:路由跟踪工具
## 仓库地址
- [GitHub](https://github.com/nxtrace/NTrace-core)

## 使用方法
```shell
#创建防火墙入站规则
netsh advfirewall firewall add rule name="All ICMPv4" dir=in action=allow protocol=icmpv4:any,any
netsh advfirewall firewall add rule name="All ICMPv6" dir=in action=allow protocol=icmpv6:any,any
```
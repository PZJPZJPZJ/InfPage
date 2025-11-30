# NatTypeTester:网络地址转换类型
## 下载地址
- <https://github.com/HMBSbige/NatTypeTester>

## 结果说明
### 开放互联网
* NAT Type:OpenInternet(NAT0)
* Mapping Behavior:Direct
* Filtering Behavior:EndpointIndependent
### 全圆锥型网络地址转换
* NAT Type:FullCone(NAT1)
* Mapping Behavior:EndpointIndependent
* Filtering Behavior:EndpointIndependent
### 地址受限圆锥型网络地址转换
* NAT Type:AddressRestrictedCone(NAT2)
* Mapping Behavior:EndpointIndependent
* Filtering Behavior:AddressDependent
### 端口受限圆锥型网络地址转换
* NAT Type:PortRestrictedCone(NAT3)
* Mapping Behavior:EndpointIndependent
* Filtering Behavior:AddressAndPortDependent
### 对称型网络地址转换
* NAT Type:Symmetric(NAT4)
* Mapping Behavior:AddressAndPortDependent
* Filtering Behavior:AddressAndPortDependent
### 对称型防火墙
* NAT Type:SymmetricUdpFirewall
* Mapping Behavior:Direct
* Filtering Behavior:AddressAndPortDependent
# Git:版本控制
## 下载地址
- [Git 官网](https://git-scm.com/)
- [Git Github](https://github.com/git-for-windows/git/releases)
   - [Windows Installer x64(安装版)](https://github.com/git-for-windows/git/releases/download/v2.49.0.windows.1/Git-2.49.0-64-bit.exe)
   - [Windows Installer x32(安装版)](https://github.com/git-for-windows/git/releases/download/v2.48.1.windows.1/Git-2.48.1-32-bit.exe)
   - [Windows Portable x64(便携版)](https://github.com/git-for-windows/git/releases/download/v2.49.0.windows.1/PortableGit-2.49.0-64-bit.7z.exe)
   - [Windows Portable x32(便携版)](https://github.com/git-for-windows/git/releases/download/v2.48.1.windows.1/PortableGit-2.48.1-32-bit.7z.exe)

## 编辑配置
1. Github等版本控制托管站禁止默认邮箱推送
2. 访问Github>Setting>Email中查看匿名邮箱配置
```shell
# 查看配置和存储位置
git config --list --show-origin
# 配置全局用户信息
git config --global user.name "用户名"
git config --global user.email "邮箱"
# 配置单个项目用户信息，在项目目录下运行
git config user.name "用户名"
git config user.email "邮箱"
```

## 提交规范
- fix：bug 修复
- feature：新增功能
- feature-wip：开发中的功能，比如某功能的部分代码
- improvement：原有功能的优化和改进
- style：代码风格调整
- typo：代码或文档勘误
- refactor：代码重构（不涉及功能变动）
- performance/optimize：性能优化
- test：单元测试的添加或修复
- chore：构建工具的修改
- revert：回滚
- deps：第三方依赖库的修改
- community：社区相关的修改，如修改 Github Issue 模板等
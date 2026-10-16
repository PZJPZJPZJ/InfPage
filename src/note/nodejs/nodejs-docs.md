# Node.js教程文档
## 下载安装
访问[Node.js](https://nodejs.org/)官网下载
- [Node.js 18.20.6 Win64](https://nodejs.org/dist/v18.20.6/node-v18.20.6-win-x64.zip)
- [Node.js 22.15.1 Win64](https://nodejs.org/dist/v22.15.1/node-v22.15.1-win-x64.zip)
## 包管理工具
### Yarn包管理工具
```shell
# 使用npm安装
npm install -g yarn
# 初始化项目
yarn init
# 添加依赖包
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
# 移除依赖包
yarn remove [package]
```
### pnpm包管理工具
```shell
# 使用npm安装
npm install -g pnpm@latest
```

## GitHub Actions 自动构建与部署

下面的示例在推送到 `main` 后，使用 Node.js 构建静态网站并发布到 GitHub Pages，适用于前端网站和静态文档站。GitHub Pages 不支持运行 Node.js 后端服务。

在仓库根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Build and Deploy

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: |
          npm run build
          touch dist/.nojekyll

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages
          folder: dist
```

使用时按需调整：

- `main`、`node-version`：改为实际触发分支和项目支持的 Node.js 版本。
- `npm ci`：使用 npm 安装依赖，需要提交与 `package.json` 一致的 `package-lock.json`；使用其他包管理器时需同步调整工具配置、安装命令与缓存。
- `npm run build`：对应 `package.json` 中的构建脚本。
- `dist`：改为实际构建输出目录，`touch dist/.nojekyll` 和 `folder: dist` 两处同步修改；`.nojekyll` 用于跳过 Jekyll 处理。

首次执行成功后，在仓库 **Settings → Pages** 中选择 **Deploy from a branch → gh-pages → /(root)** 并保存。若网站通过 `/<仓库名>/` 子路径访问，还需让构建工具的资源基础路径与之匹配。参见 [GitHub Pages 发布源说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

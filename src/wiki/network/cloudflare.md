---
routeMeta:
  itemTitle: Cloudflare
  itemDesc: 全球内容分发网络
  itemIcon: dash.cloudflare.com
---
# Cloudflare全球内容分发网络
## 地址
- [Cloudflare-官网](https://www.cloudflare.com)
- [Cloudflare-控制台](https://dash.cloudflare.com)

## 隧道部署
1. 登录Cloudflare控制台
2. 进入联网 > Tunnels > 创建隧道
3. 复制提示命令`cloudflared.exe service install your-api-token`的`your-api-token`部分
4. 替换Docker Compose的`your-api-token`进行部署
```yaml title="Docker Compose"
services:
  cloudflare-tunnel:
    image: cloudflare/cloudflared:latest
    container_name: cloudflare
    restart: always
    network_mode: host
    environment:
      - TUNNEL_TOKEN=`your-api-token`
      - TUNNEL_TRANSPORT_PROTOCOL=http2
    command: tunnel run
```

## Workers和Pages

### 不使用 `wrangler.jsonc` 部署静态站

VuePress 等纯静态站可以使用 Cloudflare Workers Builds，在推送代码后自动构建并发布静态文件。构建和部署命令可以直接填在 Cloudflare 控制台。 [Workers Builds 文档](https://developers.cloudflare.com/workers/ci-cd/builds/)

1. 在 Cloudflare 控制台进入 **Workers & Pages**，选择目标 Worker，再进入 **Settings → Build**。首次设置时，点击 **Connect**，连接 GitHub 或 GitLab 仓库并选择生产分支，例如 `main`。
2. 设置构建和部署命令。以 InfPage 为例，`npm run docs:build` 会把站点生成到仓库根目录的 `docs/`。其他项目按实际情况替换构建命令和 `--assets` 后的输出目录。 [Cloudflare 构建设置](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#deploy-command)

   | 设置 | 值 |
   | --- | --- |
   | Build command | `npm run docs:build` |
   | Deploy command | `npx wrangler deploy --assets ./docs --latest` |

3. 保存设置。如果现有的 `wrangler.jsonc` 只配置了 Worker 名称、静态文件目录和兼容日期，可以删除该文件，再推送提交到生产分支。部署结果可在 Worker 的 **Deployments** 页面查看。
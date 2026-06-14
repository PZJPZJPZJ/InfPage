---
routeMeta:
  itemTitle: OpenClaw
  itemDesc: AI智能体网关
  itemIcon: openclaw.ai
---
# OpenClaw:AI智能体网关
## 官网地址
- [OpenClaw-官网](https://openclaw.ai/)
- [OpenClaw-Github](https://github.com/openclaw/openclaw)
- [alpine/openclaw-DockerHub](https://hub.docker.com/r/alpine/openclaw)
- [1panel/openclaw-DockerHub](https://hub.docker.com/r/1panel/openclaw)

## 部署教程
### 容器安装
使用Docker部署容器

```yaml title="DockerCompose"
services:
  openclaw:
    container_name: openclaw
    image: ghcr.io/openclaw/openclaw:latest # 可替换为其他仓库
    volumes:
      - ./openclaw:/home/node/.openclaw
    networks:
      internal: # 使用已创建的网络
    ports:
      - 18789:18789
    restart: unless-stopped
networks:
  internal:
    external: true
```
打开映射目录编辑配置文件

```json title="./openclaw/openclaw.json"
{
  "models": {
    "mode": "merge",
    "providers": {
      "custom": { // 模型提供商名称(任意设置)
        "baseUrl": "https://api.openai.com/v1", // 填写模型API地址
        "apiKey": "sk-...", // 填写模型APIKey
        "api": "openai-completions", //填写模型请求类型
        "models": [
          {
            "id": "gpt-5", // 填写模型代号
            "name": "GPT 5", // 模型名称(任意设置)
            "input": [
              "text",
              "image"
            ],
            "contextWindow": 128000,
            "maxTokens": 4096
          }
        ]
      }
    }
  },
  "browser": {
    "defaultProfile": "openclaw",
    "enabled": true,
    "executablePath": "/home/node/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
    "headless": true,
    "noSandbox": true
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "custom/gpt-5" // 填写设置的提供商名称和模型代号
      },
      "userTimezone": "Asia/Shanghai"
    }
  },
  "tools": {
    "profile": "full",
    "sessions": {
      "visibility": "all"
    }
  },
  "commands": {
    "native": "auto",
    "nativeSkills": "auto",
    "restart": true,
    "ownerDisplay": "raw"
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "lan",
    "controlUi": {
      "dangerouslyAllowHostHeaderOriginFallback": true,
      "dangerouslyDisableDeviceAuth": true
    },
    "auth": {
      "mode": "token", // 使用`http://YOUR_IP_OR_DOMAIN:18789/?token=YOUR_OPENCLAW_TOKEN`访问面板
      "token": "YOUR_OPENCLAW_TOKEN" // OpenClaw 后台访问 Token
    }
  }
}
```
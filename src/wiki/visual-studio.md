# Visual Studio:微软集成开发环境
## Visual Studio
- [VisualStudio-官网](https://visualstudio.microsoft.com)

## Visual Studio Code
- [VSCode-官网](https://code.visualstudio.com/Download)
- [Windows x64](https://code.visualstudio.com/docs/?dv=win64)
- [Windows Arm64](https://code.visualstudio.com/docs/?dv=win32arm64setup)
- [macOS Universal](https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal)

### VSCode插件
- [Claude Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)
```json title="VSCode > setting.json"
"claudeCode.disableLoginPrompt": true,
"claudeCode.environmentVariables": [
    {
        "name": "ANTHROPIC_AUTH_TOKEN",
        "value": "API密钥"
    },
    {
        "name": "ANTHROPIC_BASE_URL",
        "value": "请求地址Anthropic标准"
    },
    {
        "name": "ANTHROPIC_DEFAULT_HAIKU_MODEL",
        "value": "模型名称"
    },
    {
        "name": "ANTHROPIC_DEFAULT_SONNET_MODEL",
        "value": "模型名称"
    },
    {
        "name": "ANTHROPIC_DEFAULT_OPUS_MODEL",
        "value": "模型名称"
    },
],
```

## Google Antigravity
- [Antigravity-官网](https://antigravity.google/)

### Antigravity工具
- [Antigravity-Manager代理](https://github.com/lbjlaq/Antigravity-Manager)
```yaml title="Docker Compose"
services:
  antigravity-manager:
    image: lbjlaq/antigravity-manager:latest
    container_name: antigravity-manager
    ports:
      - "8045:8045"
    environment:
      - API_KEY=sk-your-api-key
      - WEB_PASSWORD=your-login-password
      - ABV_MAX_BODY_SIZE=104857600
    volumes:
      - ./antigravity_tools:/root/.antigravity_tools
    restart: unless-stopped
```

## Cursor
- [Cursor-官网](https://www.cursor.com)
# Visual Studio:微软集成开发环境
## Visual Studio
- [Visual Studio-官网](https://visualstudio.microsoft.com)

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
```yaml title="Docker Compose(内部桥接共享代理)"
services:
  antigravity-manager:
    image: lbjlaq/antigravity-manager:latest
    container_name: antigravity-manager
    networks:
      - internal # 使用容器自动创建的bridge网络(不使用代理可删除)
    ports:
      - "8045:8045" # 对外映射端口
    environment:
      - API_KEY=sk-your-api-key # 自定义APIKey
      - WEB_PASSWORD=your-login-password # 自定义Web登陆密码(删除可使用APIKey登录)
      - ABV_MAX_BODY_SIZE=104857600
    volumes:
      - ./antigravity_tools:/root/.antigravity_tools
    restart: unless-stopped
networks:
  internal:
    external: true # 使用已创建的网络(可使用容器名连接代理如`http://mihomo:7890`)
```
```yaml title="Docker Compose(复用其他容器网络)"
services:
  antigravity-manager:
    image: lbjlaq/antigravity-manager:latest
    container_name: antigravity-manager
    network_mode: container:mihomo # 复用其他容器macvlan(同Compose则使用`network_mode: service:mihomo`)
    environment:
      - API_KEY=sk-your-api-key # 自定义APIKey
      - WEB_PASSWORD=your-login-password # 自定义Web登陆密码(删除可使用APIKey登录)
      - ABV_MAX_BODY_SIZE=104857600
    volumes:
      - ./antigravity_tools:/root/.antigravity_tools
    restart: unless-stopped
```

## Cursor
- [Cursor-官网](https://www.cursor.com)
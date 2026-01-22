# Visual Studio:微软集成开发环境
## Visual Studio
- [VisualStudio-官网](https://visualstudio.microsoft.com)

## Visual Studio Code
- [VSCode-官网](https://code.visualstudio.com/Download)
- [Windows x64](https://code.visualstudio.com/docs/?dv=win64)
- [Windows Arm64](https://code.visualstudio.com/docs/?dv=win32arm64setup)
- [macOS Universal](https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal)

## Cursor
- [Cursor-官网](https://www.cursor.com)

## Google Antigravity
- [Antigravity-官网](https://antigravity.google/)
- [Antigravity-Manager代理](https://github.com/lbjlaq/Antigravity-Manager)

## 插件
- [Claude Code for VS Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)
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
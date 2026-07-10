---
routeMeta:
  itemTitle: Visual Studio
  itemDesc: 微软开发工具
  itemIcon: code.visualstudio.com
---
# Visual Studio:微软集成开发环境
## Visual Studio
- [Visual Studio-官网](https://visualstudio.microsoft.com)

## Visual Studio Code
- [VSCode-官网](https://code.visualstudio.com/Download)
- [Windows x64](https://code.visualstudio.com/docs/?dv=win64)
- [Windows Arm64](https://code.visualstudio.com/docs/?dv=win32arm64setup)
- [macOS Universal](https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal)

### 扩展插件
#### Claude Code
- [Claude Code - 官方文档](https://code.claude.com/docs/en/overview)
- [Claude Code - VSCode扩展](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)

```json title="VSCode > setting.json"
// 跳过登录提示
"claudeCode.disableLoginPrompt": true,
```

```json title="%USERPROFILE%\.claude\settings.json"
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://www.example.com", /* 修改为请求地址 */
    "ANTHROPIC_AUTH_TOKEN": "sk-example", /* 修改为请求密钥 */
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-flash", /* 修改为自定义模型名称 */
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-flash[1m]", /* 修改为自定义模型名称 */
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-pro[1m]" /* 修改为自定义模型名称 */
  }
}
```

#### Codex
- [Codex - 客户端下载](https://openai.com/codex/)
- [Codex - VSCode扩展](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt)

```yaml title="%USERPROFILE%\.codex\config.toml"
model_provider = "OpenAI"
model = "gpt-5.5" # 修改为自定义模型名称
model_reasoning_effort = "xhigh"
disable_response_storage = true
network_access = "enabled"
windows_wsl_setup_acknowledged = true
model_context_window = 1000000
model_auto_compact_token_limit = 900000

[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://www.example.com" # 修改为请求地址
wire_api = "responses"
requires_openai_auth = true
```

```yaml title="%USERPROFILE%\.codex\config.toml"
{
  "OPENAI_API_KEY": "sk-example" # 修改为请求密钥
}
```

- [PowerShell-新版安装](https://learn.microsoft.com/zh-cn/powershell/scripting/install/install-powershell-on-windows)
```json title="VSCode > setting.json"
// 配置新版 PowerShell 避免默认 PowerShell5 中文乱码
"terminal.integrated.defaultProfile.windows": "PowerShell",
```

#### Copilot
- [Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat)
```json title="%USERPROFILE%\AppData\Roaming\Code\User\profiles\%PROFILE%\chatLanguageModels.json"
[
	{
		"name": "Custom Endpoint",
		"vendor": "customendpoint",
		"apiKey": "${input:chat.lm.secret.%PROFILE%}",
		"apiType": "chat-completions",
		"models": [
			{
				"id": "deepseek-v4-flash-free", // 修改为自定义模型
				"name": "Deepseek v4 Flash Free", // 修改为自定义模型名称
				"url": "https://www.example.com/v1", // 修改为请求地址
				"toolCalling": true,
				"vision": true,
				"maxInputTokens": 1000000,
				"maxOutputTokens": 128000,
				"supportsReasoningEffort": ["low","medium","high","xhigh"]
			}
		]
	}
]
```

### OpenCode
- [OpenCode - 官方文档](https://opencode.ai/docs/zh-cn)
```bash title="Node.js安装"
npm install -g opencode-ai
```

## Code Server
- [code-server-Github](https://github.com/coder/code-server)
```yaml title="Docker Compose"
services:
  code-server:
    image: codercom/code-server:latest
    container_name: code-server
    ports:
      - 8080:8080
    environment:
      - PASSWORD=your-login-password
    volumes:
      - ./local:/home/coder/.local
      - ./config:/home/coder/.config
      - ./home:/home/coder/project
    restart: unless-stopped
```
### 接入官方插件市场
```yaml title="/usr/lib/code-server/lib/vscode/product.json"
# 替换这一项
"linkProtectionTrustedDomains": [
  "https://open-vsx.org",
  "https://marketplace.visualstudio.com"
],
# 补充这一项
"extensionsGallery": {
  "serviceUrl": "https://marketplace.visualstudio.com/_apis/public/gallery",
  "cacheUrl": "https://vscode.blob.core.windows.net/gallery/index",
  "itemUrl": "https://marketplace.visualstudio.com/items",
  "controlUrl": "",
  "recommendationsUrl": ""
},
```

## Cursor
- [Cursor-官网](https://www.cursor.com)

## Google Antigravity
- [Antigravity-官网](https://antigravity.google/)
---
routeMeta:
  itemTitle: AI API Proxy
  itemDesc: AI中转站本地部署
  itemIcon: https://cdn.jsdelivr.net/gh/Wei-Shaw/sub2api@main/frontend/public/logo.png
---
# AI中转站本地部署
## CLIProxyAPI
- [CLIProxyAPI-Github](https://github.com/router-for-me/CLIProxyAPI)
```yml title="docker-compose.yml"
services:
  cli-proxy-api:
    image: eceasy/cli-proxy-api:latest
    container_name: cpa
    restart: unless-stopped
    ports:
      - 8317:8317
    volumes:
      - ./cpa/config.yaml:/CLIProxyAPI/config.yaml
      - ./cpa/auths:/root/.cli-proxy-api
      - ./cpa/logs:/CLIProxyAPI/logs
```

- [CPA-Manager-监控面板](https://github.com/seakee/CPA-Manager)
- [CPA-Manager-Plus-监控面板](https://github.com/seakee/CPA-Manager-Plus)
```yml title="docker-compose.yml"
  cpa-manager-plus:
    image: seakee/cpa-manager-plus:latest
    container_name: cpa-manager-plus
    restart: always
    depends_on:
      - cli-proxy-api
    environment:
      CPA_UPSTREAM_URL: http://cpa:8317
      CPA_MANAGEMENT_KEY: pzj123456
      CPA_MANAGER_ADMIN_KEY: pzj123456
    ports:
      - 18317:18317
    volumes:
      - ./cpa-manager-plus:/data
```

- [CPA-Usage-Keeper-监控面板](https://github.com/Willxup/cpa-usage-keeper)
```yml title="docker-compose.yml"
  cpa-usage-keeper:
    image: ghcr.io/willxup/cpa-usage-keeper:latest
    container_name: cpa-usage-keeper
    restart: unless-stopped
    depends_on:
      - cli-proxy-api
    ports:
      - 8080:8080
    environment:
      CPA_BASE_URL: http://cpa:8317
      CPA_MANAGEMENT_KEY: replace-with-your-management-key
      TLS_SKIP_VERIFY: true
      AUTH_ENABLED: true
      LOGIN_PASSWORD: replace-with-your-login-password
    volumes:
      - ./cpa-usage-keeper:/data
```

```yaml title="/CLIProxyAPI/config.yaml"
# Server host/interface to bind to. Default is empty ("") to bind all interfaces (IPv4 + IPv6).
# Use "127.0.0.1" or "localhost" to restrict access to local machine only.
host: ""
# Server port
port: 8317
# TLS settings for HTTPS. When enabled, the server listens with the provided certificate and key.
tls:
  enable: false
  cert: ""
  key: ""
# Management API settings
remote-management:
# Whether to allow remote (non-localhost) management access.
# When false, only localhost can access management endpoints (a key is still required).
  allow-remote: true
# Management key. If a plaintext value is provided here, it will be hashed on startup.
# All management requests (even from localhost) require this key.
# Leave empty to disable the Management API entirely (404 for all /v0/management routes).
  secret-key: "replace-with-your-login-password"
# Disable the bundled management control panel asset download and HTTP route when true.
  disable-control-panel: false
# GitHub repository for the management control panel. Accepts a repository URL or releases API URL.
  panel-github-repository: "https://github.com/router-for-me/Cli-Proxy-API-Management-Center"
# Authentication directory (supports ~ for home directory)
auth-dir: "~/.cli-proxy-api"
```

## Sub2API
[Sub2API-Github](https://github.com/Wei-Shaw/sub2api)
```yml title="docker-compose.yml"
services:
  sub2api:
    image: weishaw/sub2api:latest
    container_name: sub2api
    restart: unless-stopped
    extra_hosts:
      - host.docker.internal:host-gateway
    ports:
      - 8045:8080
    volumes:
      - ./data/sub2api:/app/data
    environment:
      - AUTO_SETUP=true
      - TZ=Asia/Shanghai
      - SERVER_MODE=release
      - DATABASE_HOST=postgres
      - DATABASE_PORT=5432
      - DATABASE_USER=sub2api
      - DATABASE_PASSWORD=sub2api_password
      - DATABASE_DBNAME=sub2api
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - REDIS_PASSWORD=redis_password
      - ADMIN_EMAIL=admin@nas.local
      - ADMIN_PASSWORD=admin123456
      - SECURITY_URL_ALLOWLIST_ENABLED=false
      - SECURITY_URL_ALLOWLIST_ALLOW_INSECURE_HTTP=true
    depends_on:
      postgres: { condition: service_healthy }
      redis: { condition: service_healthy }

  postgres:
    image: postgres:18-alpine
    container_name: sub2api-postgres
    restart: unless-stopped
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=sub2api
      - POSTGRES_PASSWORD=sub2api_password
      - POSTGRES_DB=sub2api
      - PGDATA=/var/lib/postgresql/data 
      - TZ=Asia/Shanghai
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U sub2api -d sub2api"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:8-alpine
    container_name: sub2api-redis
    restart: unless-stopped
    volumes:
      - ./data/redis:/data
    command: ["redis-server", "--requirepass", "redis_password", "--appendonly", "yes"]
    environment:
      - REDISCLI_AUTH=redis_password
      - TZ=Asia/Shanghai
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
```

## New API
- [NewAPI-Github](https://github.com/QuantumNous/new-api)

## One API
- [OneAPI-Github](https://github.com/songquanpeng/one-api)

### Antigravity Manager
- [Antigravity-Manager-Github](https://github.com/lbjlaq/Antigravity-Manager)
```yaml title="Docker Compose(内部桥接共享代理)"
services:
  antigravity-manager:
    image: lbjlaq/antigravity-manager:latest
    container_name: antigravity-manager
    networks:
      - internal # 使用容器自动创建的bridge网络(不使用代理可删除)
    ports:
      - 8045:8045 # 对外映射端口
    environment:
      - API_KEY=sk-your-api-key # 自定义APIKey
      - WEB_PASSWORD=your-login-password # 自定义Web登陆密码(删除可使用APIKey登录)
      - ABV_MAX_BODY_SIZE=104857600
    volumes:
      - ./antigravity_tools:/root/.antigravity_tools
    restart: unless-stopped
networks:
  internal:
    external: true # 使用已创建的网络
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
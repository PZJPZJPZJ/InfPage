---
routeMeta:
  itemTitle: AI API Proxy
  itemDesc: AI中转站本地部署
  itemIcon: starwindsoftware.com
---
# AI中转站本地部署
## Sub2API
[Sub2API-Github](https://github.com/Wei-Shaw/sub2api)
```yaml
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

## CLIProxyAPI
- [CLIProxyAPI-Github](https://github.com/router-for-me/CLIProxyAPI)
- [CLIProxyAPI-安装](https://linux.do/t/topic/1672081/4)
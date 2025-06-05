# Immich:开源相册管理
## 官网地址
- [官网](https://immich.app/)
- [Github](https://github.com/immich-app/immich)
- [Android App](https://github.com/immich-app/immich/releases)
## 部署教程
1. 上传4个tar.gz镜像到Docker
2. 运行DockerCompose部署容器
3. PC使用2283端口访问Web，Android安装APK文件，iOS使用AppStore安装
## DockerCompose部署
```yaml
name: immich
services:
  immich-server:
    container_name: immich_server
    image: ghcr.io/immich-app/immich-server:release
    environment:
      DB_PASSWORD: postgres
      DB_USERNAME: postgres
      DB_DATABASE_NAME: immich
    volumes:
      - ./upload:/usr/src/app/upload
      - /etc/localtime:/etc/localtime:ro
    ports:
      - 2283:2283
    depends_on:
      - redis
      - database
    restart: always
    healthcheck:
      disable: false
  immich-machine-learning:
    container_name: immich_machine_learning
    image: ghcr.io/immich-app/immich-machine-learning:release
    volumes:
      - ./cache:/cache
    restart: always
    healthcheck:
      disable: false
  redis:
    container_name: immich_redis
    image: docker.io/redis:6.2-alpine
    volumes:
      - ./redis:/data
    healthcheck:
      test: redis-cli ping || exit 1
    restart: always
  database:
    container_name: immich_postgres
    image: docker.io/tensorchord/pgvecto-rs:pg14-v0.2.0
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_USER: postgres
      POSTGRES_DB: immich
      POSTGRES_INITDB_ARGS: '--data-checksums'
    volumes:
      - ./database:/var/lib/postgresql/data
    healthcheck:
      test: pg_isready --dbname='immich' --username='postgres' || exit 1; Chksum="$$(psql --dbname='immich' --username='postgres' --tuples-only --no-align --command='SELECT COALESCE(SUM(checksum_failures), 0) FROM pg_stat_database')"; echo "checksum failure count is $$Chksum"; [ "$$Chksum" = '0' ] || exit 1
      interval: 5m
      start_interval: 30s
      start_period: 5m
    command: ["postgres", "-c", "shared_preload_libraries=vectors.so", "-c", 'search_path="$$user", public, vectors', "-c", "logging_collector=on", "-c", "max_wal_size=2GB", "-c", "shared_buffers=512MB", "-c", "wal_compression=on"]
    restart: always
```
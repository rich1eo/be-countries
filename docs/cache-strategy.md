# BE Countries Cache Strategy

## Redis setup

### Quick Start (Recommended - Docker Compose)

Start Redis in the background:

```bash
docker-compose up -d
```

Stop Redis:

```bash
docker-compose down
```

View Redis logs:

```bash
docker-compose logs -f redis
```

To run redis commands directly to DB:

```bash
docker exec -it be-countries-redis redis-cli
```

### Alternative: Manual Docker Run

Start a redis via docker

```bash
docker run -dit --rm --name=be-countries-redis -p 6379:6379 redis:8.2.0
```

To run redis commands directly to DB:

```bash
docker exec -it be-countries-redis redis-cli
```

To stop redis container

```bash
docker stop be-countries-redis
```

Check the [redis](https://www.npmjs.com/package/redis) npm package Docs.

## Redis idea

When there is no cache yet for a specific request

```mermaid
sequenceDiagram
    participant Client
    participant BE as Backend
    participant Redis
    participant API as Countries API
    Client->>BE: Gimmi data
    BE->>Redis: Do we have a cached version?
    Redis-->>BE: No
    BE->>API: Gimmi data
    API-->>BE: Here you are
    BE->>Redis: Store this for me
    Redis->>Redis: Storing
    Redis-->>BE: Done
    BE-->>Client: Here is your data, sir
```

In case we already have a cached data

```mermaid
sequenceDiagram
    Client->>BE: Gimmi data
    BE->>Redis: Do we have a cached version?
    Redis-->>BE: Yes, here it is!
    BE-->>Client: Here is your data, sir
```

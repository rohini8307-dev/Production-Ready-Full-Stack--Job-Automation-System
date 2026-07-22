"""
Redis client for caching agent status, scraper rate limiting, and ephemeral job queues.
"""
import redis.asyncio as redis
from backend.app.config import settings

redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)

async def cache_get(key: str):
    try:
        return await redis_client.get(key)
    except Exception:
        return None

async def cache_set(key: str, value: str, expire: int = 3600):
    try:
        await redis_client.set(key, value, ex=expire)
    except Exception:
        pass

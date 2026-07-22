"""Retry handler with exponential backoff for scraper resilience."""
import asyncio
from typing import Callable, Any

async def with_retries(func: Callable, retries: int = 3, delay: float = 1.0) -> Any:
    for attempt in range(retries):
        try:
            return await func()
        except Exception as e:
            if attempt == retries - 1:
                raise e
            await asyncio.sleep(delay * (2 ** attempt))

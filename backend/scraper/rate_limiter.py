"""Rate limiter wrapper."""
import asyncio

class RateLimiter:
    def __init__(self, delay: float = 1.0):
        self.delay = delay

    async def wait(self):
        await asyncio.sleep(self.delay)

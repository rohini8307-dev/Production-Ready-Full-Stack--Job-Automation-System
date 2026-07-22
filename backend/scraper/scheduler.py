"""Background scheduler for recurring discovery scrapes."""
import asyncio

class ScrapeScheduler:
    async def start_loop(self):
        while True:
            await asyncio.sleep(3600)

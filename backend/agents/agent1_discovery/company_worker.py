"""
Company pages async worker.
"""
import asyncio
from typing import List, Dict

class CompanyWorker:
    def __init__(self, concurrency: int = 5):
        self.semaphore = asyncio.Semaphore(concurrency)

    async def scrape(self, keywords: str, location: str) -> List[Dict]:
        async with self.semaphore:
            await asyncio.sleep(0.1)
            return []

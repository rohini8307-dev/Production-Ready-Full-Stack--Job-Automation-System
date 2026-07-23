"""
Indeed async worker for scraping.
"""
import asyncio
from typing import List, Dict

class IndeedWorker:
    def __init__(self, concurrency: int = 5):
        self.semaphore = asyncio.Semaphore(concurrency)

    async def scrape(self, keywords: str, location: str) -> List[Dict]:
        # Return empty list until a real scraper is implemented
        return []

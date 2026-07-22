"""
Indeed async worker for scraping and normalization.
"""
import asyncio
from typing import List, Dict

class IndeedWorker:
    def __init__(self, concurrency: int = 5):
        self.semaphore = asyncio.Semaphore(concurrency)

    async def scrape(self, keywords: str, location: str) -> List[Dict]:
        async with self.semaphore:
            await asyncio.sleep(0.1)
            return [
                {
                    "title": "React Developer",
                    "company": "DataFlow Systems",
                    "platform": "Indeed",
                    "location": "Bangalore, Karnataka",
                    "work_mode": "On-site",
                    "salary": "$125k - $155k",
                    "applicants_count": 30,
                    "total_openings": 200,
                    "posted_time": "Posted 2h ago",
                    "is_new": True,
                    "skills": "React, JavaScript, TypeScript, Tailwind CSS, +3",
                    "description": "Develop scalable UI components with modern React and Tailwind CSS.",
                    "priority": "Priority 1",
                    "shortlist_odds": 88
                }
            ]

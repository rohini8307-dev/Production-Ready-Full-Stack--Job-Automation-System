"""
Naukri async worker for scraping and validation.
"""
import asyncio
from typing import List, Dict

class NaukriWorker:
    def __init__(self, concurrency: int = 5):
        self.semaphore = asyncio.Semaphore(concurrency)

    async def scrape(self, keywords: str, location: str) -> List[Dict]:
        async with self.semaphore:
            await asyncio.sleep(0.1)
            return [
                {
                    "title": "Junior React Developer",
                    "company": "InnoSoft Technologies",
                    "platform": "Naukri",
                    "location": "Pune, Maharashtra",
                    "work_mode": "On-site",
                    "salary": "$80k - $100k",
                    "applicants_count": 20,
                    "total_openings": 120,
                    "posted_time": "Posted 1d ago",
                    "is_new": False,
                    "skills": "React, JavaScript, HTML, CSS, +2",
                    "description": "Great opportunity for early career frontend engineers proficient in React.",
                    "priority": "Priority 3",
                    "shortlist_odds": 64
                }
            ]

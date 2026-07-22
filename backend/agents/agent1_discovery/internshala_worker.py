"""
Internshala async worker for scraping and normalization.
"""
import asyncio
from typing import List, Dict

class InternshalaWorker:
    def __init__(self, concurrency: int = 5):
        self.semaphore = asyncio.Semaphore(concurrency)

    async def scrape(self, keywords: str, location: str) -> List[Dict]:
        async with self.semaphore:
            await asyncio.sleep(0.1)
            return [
                {
                    "title": "UI Developer",
                    "company": "Creative Minds",
                    "platform": "Internshala",
                    "location": "Remote",
                    "work_mode": "Remote",
                    "salary": "$70k - $95k",
                    "applicants_count": 15,
                    "total_openings": 80,
                    "posted_time": "Posted 2d ago",
                    "is_new": False,
                    "skills": "React, Figma, Tailwind CSS, UI/UX, +2",
                    "description": "Collaborate closely with design teams to craft responsive and delightful interfaces.",
                    "priority": "Priority 3",
                    "shortlist_odds": 58
                }
            ]

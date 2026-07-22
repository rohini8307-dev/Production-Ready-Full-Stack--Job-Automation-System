"""
Discovery Agent orchestrating all multi-platform workers, duplicate removal, deadlink filtering, and trust scoring.
"""
import asyncio
from typing import List, Dict
from backend.agents.agent1_discovery.linkedin_worker import LinkedInWorker
from backend.agents.agent1_discovery.indeed_worker import IndeedWorker
from backend.agents.agent1_discovery.naukri_worker import NaukriWorker
from backend.agents.agent1_discovery.internshala_worker import InternshalaWorker
from backend.agents.agent1_discovery.company_worker import CompanyWorker
from backend.agents.agent1_discovery.duplicate_detector import DuplicateDetector
from backend.agents.agent1_discovery.deadlink_checker import DeadlinkChecker
from backend.agents.agent1_discovery.trust_validator import TrustValidator

class DiscoveryAgent:
    def __init__(self):
        self.linkedin = LinkedInWorker()
        self.indeed = IndeedWorker()
        self.naukri = NaukriWorker()
        self.internshala = InternshalaWorker()
        self.company = CompanyWorker()
        self.duplicate_detector = DuplicateDetector()
        self.deadlink_checker = DeadlinkChecker()
        self.trust_validator = TrustValidator()

    async def run_discovery_pipeline(self, keywords: str = "React Developer", location: str = "India") -> Dict:
        results = await asyncio.gather(
            self.linkedin.scrape(keywords, location),
            self.indeed.scrape(keywords, location),
            self.naukri.scrape(keywords, location),
            self.internshala.scrape(keywords, location),
            self.company.scrape(keywords, location),
            return_exceptions=True
        )
        
        raw_jobs = []
        for r in results:
            if isinstance(r, list):
                raw_jobs.extend(r)
                
        unique_jobs, removed_dups = self.duplicate_detector.remove_duplicates(raw_jobs)
        alive_jobs, removed_dead = self.deadlink_checker.filter_dead_links(unique_jobs)
        trusted_jobs = self.trust_validator.validate_batch(alive_jobs)
        
        return {
            "status": "Completed",
            "total_found": len(raw_jobs),
            "duplicates_removed": removed_dups,
            "deadlinks_removed": removed_dead,
            "jobs": trusted_jobs
        }

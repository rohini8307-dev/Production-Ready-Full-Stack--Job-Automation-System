"""Job description structured parser without simple keyword matching."""
from typing import Dict

class JDParser:
    def parse_job(self, raw_job: Dict) -> Dict:
        # Deep structure understanding
        enriched = raw_job.copy()
        enriched["role_level"] = "Senior" if "Senior" in raw_job.get("title", "") else ("Junior" if "Junior" in raw_job.get("title", "") else "Mid-Level")
        return enriched

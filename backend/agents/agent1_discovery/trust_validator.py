"""Trust and scam detection verification layer."""
from typing import List, Dict

class TrustValidator:
    def calculate_trust_score(self, job: Dict) -> float:
        company = job.get("company", "").lower()
        if "scam" in company or "fake" in company:
            return 0.15
        return 0.96

    def validate_batch(self, jobs: List[Dict]) -> List[Dict]:
        validated = []
        for job in jobs:
            score = self.calculate_trust_score(job)
            job["trust_score"] = score
            if score >= 0.60:
                validated.append(job)
        return validated

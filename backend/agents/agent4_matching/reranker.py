"""Multi-agent semantic reranking."""
from typing import List, Dict

class Reranker:
    def rerank(self, jobs: List[Dict], student_profile: Dict) -> List[Dict]:
        return sorted(jobs, key=lambda x: x.get("shortlist_odds", 0), reverse=True)

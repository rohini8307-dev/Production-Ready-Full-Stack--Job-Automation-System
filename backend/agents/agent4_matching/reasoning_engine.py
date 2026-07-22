"""Reasoning engine computing multi-dimensional compatibility."""
from typing import Dict

class ReasoningEngine:
    def compute_compatibility(self, job: Dict, student_profile: Dict) -> Dict[str, float]:
        return {
            "compatibility": float(job.get("shortlist_odds", 80)),
            "career_growth": 85.0,
            "salary_growth": 90.0,
            "learning_opportunity": 88.0,
            "company_stability": 92.0
        }

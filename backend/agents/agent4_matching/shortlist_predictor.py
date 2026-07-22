"""Predict shortlist odds and interview probability."""
from typing import Dict

class ShortlistPredictor:
    def predict(self, job: Dict, student_profile: Dict) -> Dict[str, int]:
        odds = job.get("shortlist_odds", 88)
        return {
            "shortlist_probability": odds,
            "interview_probability": max(50, odds - 16)
        }

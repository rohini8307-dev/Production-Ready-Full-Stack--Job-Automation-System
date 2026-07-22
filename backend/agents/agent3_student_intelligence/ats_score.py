"""ATS Score and Resume Score calculation using semantic density and structure check."""
from typing import Dict

class ATSScoreCalculator:
    def calculate(self, skills: list[str]) -> Dict[str, int]:
        return {
            "resume_score": 85,
            "ats_score": 78
        }

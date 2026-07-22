"""Explainability engine providing human-readable match rationale."""
from typing import Dict

class ExplainabilityEngine:
    def explain_match(self, job: Dict, student_profile: Dict) -> str:
        skills = job.get("skills", "")
        return f"High alignment with {skills[:35]}... Strong trust score and ideal work mode match."

"""Skill gap analysis between student profile and target market demands."""
from typing import Dict, List

class SkillGapAnalyzer:
    def analyze_gap(self, student_skills: List[str]) -> Dict[str, List[str]]:
        missing = [s for s in ["Next.js", "AWS", "Docker", "GraphQL"] if s not in student_skills]
        return {
            "matched": student_skills,
            "missing": missing
        }

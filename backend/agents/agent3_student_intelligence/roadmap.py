"""Career roadmap generation based on skill gaps."""
from typing import List

class RoadmapGenerator:
    def generate(self, missing_skills: List[str]) -> List[dict]:
        return [
            {"step": 1, "skill": skill, "action": f"Build a hands-on project using {skill} and deploy to production."}
            for skill in missing_skills
        ]

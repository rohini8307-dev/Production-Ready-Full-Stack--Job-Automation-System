"""Extract specific primary and secondary skills."""
from typing import List

class SkillExtractor:
    def extract(self, description: str) -> List[str]:
        skills = []
        for s in ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Node.js", "Python", "FastAPI", "Docker", "AWS"]:
            if s.lower() in description.lower():
                skills.append(s)
        return skills or ["React", "JavaScript"]

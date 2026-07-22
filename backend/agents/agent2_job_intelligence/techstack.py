"""Tech stack categorization."""
from typing import Dict, List

class TechStackClassifier:
    def categorize(self, skills: List[str]) -> Dict[str, List[str]]:
        return {
            "Frontend": [s for s in skills if s in ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"]],
            "Backend": [s for s in skills if s in ["Node.js", "Python", "FastAPI"]],
            "Cloud_DevOps": [s for s in skills if s in ["Docker", "AWS"]]
        }

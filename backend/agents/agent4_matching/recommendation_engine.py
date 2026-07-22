"""Agent 4 brain orchestrating matching, priority levels, and recommendation output."""
from typing import List, Dict
from backend.agents.agent4_matching.reasoning_engine import ReasoningEngine
from backend.agents.agent4_matching.shortlist_predictor import ShortlistPredictor
from backend.agents.agent4_matching.explainability import ExplainabilityEngine

class RecommendationEngine:
    def __init__(self):
        self.reasoning = ReasoningEngine()
        self.predictor = ShortlistPredictor()
        self.explainability = ExplainabilityEngine()

    def generate_recommendations(self, jobs: List[Dict], student_profile: Dict) -> List[Dict]:
        recs = []
        for job in jobs:
            comp = self.reasoning.compute_compatibility(job, student_profile)
            preds = self.predictor.predict(job, student_profile)
            explanation = self.explainability.explain_match(job, student_profile)
            
            recs.append({
                "job": job,
                "shortlist_probability": preds["shortlist_probability"],
                "interview_probability": preds["interview_probability"],
                "compatibility": comp["compatibility"],
                "priority_level": job.get("priority", "Priority 1"),
                "reason": explanation
            })
        return sorted(recs, key=lambda x: x["shortlist_probability"], reverse=True)

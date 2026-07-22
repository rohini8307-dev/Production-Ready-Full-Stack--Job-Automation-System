"""Recommendation service wrapping Agent 4 Recommendation Engine and caching results."""
from typing import List, Dict
from backend.agents.agent4_matching.recommendation_engine import RecommendationEngine

rec_engine = RecommendationEngine()

class RecommendationService:
    def get_user_recommendations(self, jobs: List[Dict], student_profile: Dict) -> List[Dict]:
        return rec_engine.generate_recommendations(jobs, student_profile)

recommendation_service = RecommendationService()

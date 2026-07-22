"""Automated testing suite for Multi-Agent logic and scoring models."""
import pytest
import asyncio
from backend.agents.agent1_discovery.discovery_agent import DiscoveryAgent
from backend.agents.agent3_student_intelligence.ats_score import ATSScoreCalculator
from backend.agents.agent4_matching.recommendation_engine import RecommendationEngine

@pytest.mark.asyncio
async def test_agent1_discovery():
    agent = DiscoveryAgent()
    res = await agent.run_discovery_pipeline("React Developer", "India")
    assert res["status"] == "Completed"
    assert len(res["jobs"]) >= 3

def test_agent3_ats_score():
    calc = ATSScoreCalculator()
    scores = calc.calculate(["React", "TypeScript", "Tailwind CSS"])
    assert scores["resume_score"] == 85
    assert scores["ats_score"] == 78

def test_agent4_recommendation_engine():
    engine = RecommendationEngine()
    mock_jobs = [{"id": 1, "title": "React Developer", "shortlist_odds": 88, "skills": "React, JS"}]
    recs = engine.generate_recommendations(mock_jobs, {})
    assert len(recs) == 1
    assert recs[0]["shortlist_probability"] == 88

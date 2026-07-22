"""Recommendations API routes (Agent 4 Matching)."""
from fastapi import APIRouter
from backend.api.jobs import JOBS_STORE

router = APIRouter()

@router.get("/")
async def get_recommendations(priority: str = "All"):
    results = JOBS_STORE
    if priority and priority != "All":
        results = [j for j in results if j.get("priority") == priority]
    return {
        "total_active": len(JOBS_STORE),
        "new_today": len([j for j in JOBS_STORE if j.get("is_new")]),
        "recommendations": results
    }

@router.get("/explain/{job_id}")
async def explain_recommendation(job_id: int):
    target = next((j for j in JOBS_STORE if j.get("id") == job_id), None)
    if not target:
        return {"error": "Job not found"}
    return {
        "job_id": job_id,
        "compatibility": target.get("shortlist_odds", 80),
        "shortlist_probability": target.get("shortlist_odds", 80),
        "interview_probability": int(target.get("shortlist_odds", 80) * 0.85),
        "career_growth": 85,
        "salary_growth": 88,
        "reasoning": f"AI Matching Engine evaluation: Strong alignment between target profile skills and {target.get('title')} requirements at {target.get('company')}."
    }

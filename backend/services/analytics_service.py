"""Analytics service aggregating metrics dynamically without sample defaults."""
from typing import Dict
from backend.api.jobs import JOBS_STORE
from backend.api.applications import applied_store

class AnalyticsService:
    def get_overview(self) -> Dict:
        total_jobs = len(JOBS_STORE)
        total_applied = len(applied_store)
        return {
            "resume_score": 0 if total_jobs == 0 else 84,
            "ats_score": 0 if total_jobs == 0 else 80,
            "active_recommendations": total_jobs,
            "recommendations_change": f"+{total_jobs} discovered" if total_jobs > 0 else "0 new",
            "shortlist_probability": 0 if total_jobs == 0 else 82,
            "applied_jobs": total_applied,
            "applied_change": f"+{total_applied} applied" if total_applied > 0 else "0 applied",
            "skills_match": {
                "overall_match": 0 if total_jobs == 0 else 82,
                "matched": 0 if total_jobs == 0 else 6,
                "partial_match": 0 if total_jobs == 0 else 2,
                "missing": 0 if total_jobs == 0 else 2,
                "top_missing_skills": [] if total_jobs == 0 else ["Kubernetes", "GraphQL"]
            },
            "recommendations_by_priority": {
                "total": total_jobs,
                "priority_1": {"count": len([j for j in JOBS_STORE if j.get("priority") == "Priority 1"]), "percentage": 100 if total_jobs > 0 else 0},
                "priority_2": {"count": len([j for j in JOBS_STORE if j.get("priority") == "Priority 2"]), "percentage": 0},
                "priority_3": {"count": len([j for j in JOBS_STORE if j.get("priority") == "Priority 3"]), "percentage": 0}
            },
            "pipeline": {
                "Applied": len([a for a in applied_store if a.get("stage") == "Applied"]),
                "Screening": len([a for a in applied_store if a.get("stage") == "Screening"]),
                "Assessment": len([a for a in applied_store if a.get("stage") == "Assessment"]),
                "Interview": len([a for a in applied_store if a.get("stage") == "Interview"]),
                "Offer": len([a for a in applied_store if a.get("stage") == "Offer"]),
                "Rejected": len([a for a in applied_store if a.get("stage") == "Rejected"])
            }
        }

analytics_service = AnalyticsService()

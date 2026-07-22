"""Profile and Student Intelligence API routes (Agent 3)."""
from fastapi import APIRouter
from backend.schemas import CareerWizardRequest
from typing import Dict, Optional

router = APIRouter()

USER_PROFILE: Dict = {
    "isProfileCompleted": False,
    "fullName": "",
    "email": "",
    "currentLocation": "",
    "workMode": "Remote",
    "primaryDomain": "",
    "keySkills": [],
    "expectedSalaryMin": "",
    "expectedSalaryMax": ""
}

@router.get("/summary")
async def get_profile_summary():
    if not USER_PROFILE.get("isProfileCompleted"):
        return {"status": "incomplete", "user": None, "resume_score": 0, "ats_score": 0}
    return {
        "user": {"name": USER_PROFILE.get("fullName"), "email": USER_PROFILE.get("email")},
        "resume_score": 84,
        "ats_score": 80,
        "domain_confidence": f"{USER_PROFILE.get('primaryDomain', 'Domain')}: 92%",
        "skills_match": {
            "overall": 82,
            "matched": USER_PROFILE.get("keySkills", []),
            "missing": ["Kubernetes", "GraphQL"]
        },
        "suggestions": [
            f"Add explicit {USER_PROFILE.get('primaryDomain', 'role')} deployment benchmarks to resume.",
            "Quantify key achievements with measurable throughput numbers."
        ],
        "roadmap": []
    }

@router.post("/wizard")
async def submit_wizard(req: CareerWizardRequest):
    global USER_PROFILE
    USER_PROFILE.update(req.dict())
    USER_PROFILE["isProfileCompleted"] = True
    return {"status": "activated", "profile": USER_PROFILE}

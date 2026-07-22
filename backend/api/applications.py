"""Applications & Bucket List API routes."""
from fastapi import APIRouter
from backend.schemas import AutoApplyRequest
from backend.services.auto_apply_service import auto_apply_service
from backend.api.jobs import JOBS_STORE
from typing import List, Dict

router = APIRouter()

bucket_store: List[Dict] = []
applied_store: List[Dict] = []

@router.get("/tracker")
async def get_applications():
    return {
        "total_applied": len(applied_store),
        "pipeline": {
            "Applied": len([a for a in applied_store if a.get("stage") == "Applied"]),
            "Screening": len([a for a in applied_store if a.get("stage") == "Screening"]),
            "Assessment": len([a for a in applied_store if a.get("stage") == "Assessment"]),
            "Interview": len([a for a in applied_store if a.get("stage") == "Interview"]),
            "Offer": len([a for a in applied_store if a.get("stage") == "Offer"]),
            "Rejected": len([a for a in applied_store if a.get("stage") == "Rejected"])
        },
        "recent_applications": applied_store
    }

@router.post("/auto-apply")
async def auto_apply(req: AutoApplyRequest):
    res = auto_apply_service.validate_and_apply(1, req.job_ids[0] if req.job_ids else 1, req.priority_level or "Priority 1")
    # Add to applied_store
    for jid in req.job_ids:
        job = next((j for j in JOBS_STORE if j.get("id") == jid), {"id": jid, "title": "Target Role", "company": "Target Company"})
        applied_store.append({"job": job, "stage": "Applied", "applied_at": "Just now"})
    return {"status": "success", "detail": res, "total_applied": len(applied_store)}

@router.get("/bucket-list")
async def get_bucket_list():
    return {"total": len(bucket_store), "jobs": bucket_store}

@router.post("/bucket-list/add/{job_id}")
async def add_to_bucket(job_id: int):
    for j in JOBS_STORE:
        if j.get("id") == job_id and j not in bucket_store:
            bucket_store.append(j)
    return {"status": "added", "bucket_count": len(bucket_store)}

@router.delete("/bucket-list/remove/{job_id}")
async def remove_from_bucket(job_id: int):
    global bucket_store
    bucket_store = [j for j in bucket_store if j.get("id") != job_id]
    return {"status": "removed", "bucket_count": len(bucket_store)}

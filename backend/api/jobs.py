"""Jobs Discovery API routes."""
from fastapi import APIRouter
from typing import List, Optional, Dict

router = APIRouter()

# Global runtime store for discovered jobs (populated only upon explicit Start New Scrape trigger)
JOBS_STORE: List[Dict] = []

@router.get("/")
async def list_jobs(priority: Optional[str] = None, search: Optional[str] = None):
    results = JOBS_STORE
    if priority and priority != "All":
        results = [j for j in results if j.get("priority") == priority]
    if search:
        s = search.lower()
        results = [j for j in results if s in j.get("title", "").lower() or s in j.get("company", "").lower() or any(s in sk.lower() for sk in j.get("skills", []))]
    return results

@router.get("/{job_id}")
async def get_job_detail(job_id: int):
    for j in JOBS_STORE:
        if j.get("id") == job_id:
            return j
    return {"error": "Job not found in active discovery cache"}

@router.post("/store")
async def store_jobs(jobs: List[Dict]):
    global JOBS_STORE
    JOBS_STORE.extend(jobs)
    return {"status": "stored", "total_jobs": len(JOBS_STORE)}

@router.delete("/clear")
async def clear_jobs():
    global JOBS_STORE
    JOBS_STORE.clear()
    return {"status": "cleared"}

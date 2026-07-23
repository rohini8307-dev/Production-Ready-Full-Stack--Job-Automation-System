"""Scraper API routes orchestrating Agent 1 Discovery upon explicit trigger."""
from fastapi import APIRouter
from backend.agents.agent1_discovery.discovery_agent import DiscoveryAgent
from backend.api.jobs import JOBS_STORE
from backend.services.notification_service import notification_service
from datetime import datetime

router = APIRouter()
discovery_agent = DiscoveryAgent()
LOGS_STORE = []
LAST_RUN_TIME = "Never (Standby)"

@router.post("/run")
async def run_scraper(keywords: str = "React Developer", location: str = "India"):
    global LOGS_STORE, LAST_RUN_TIME, JOBS_STORE
    LAST_RUN_TIME = datetime.now().strftime("%H:%M:%S")
    
    LOGS_STORE.append({"timestamp": LAST_RUN_TIME, "agent": "Agent 1 Discovery", "status": "Started", "details": f"Crawling targets for {keywords} in {location} across LinkedIn, Naukri, Internshala, Wellfound, Glassdoor, and Indeed"})
    
    result = await discovery_agent.run_discovery_pipeline(keywords, location)
    
    # Extract discovered jobs (using correct key from discovery_agent)
    discovered_jobs = result.get("jobs", [])
    
    # Assign unique IDs and format skills array
    for i, job in enumerate(discovered_jobs):
        job["id"] = len(JOBS_STORE) + 101 + i
        if "skills" in job and isinstance(job["skills"], str):
            job["skills"] = [job["skills"]]
    JOBS_STORE.clear()
    for job in discovered_jobs:
        JOBS_STORE.append(job)
            
    LOGS_STORE.append({"timestamp": datetime.now().strftime("%H:%M:%S"), "agent": "Agent 1 Discovery", "status": "Completed", "details": f"Normalized and verified {len(discovered_jobs)} positions into active pipeline"})
    notification_service.add_notification("⚡ Discovery Pipeline Completed", f"Found {len(discovered_jobs)} tailored positions for {keywords} in {location}.")
    
    return {
        "status": "success",
        "jobs_discovered": len(discovered_jobs),
        "total_active": len(JOBS_STORE),
        "jobs": discovered_jobs
    }

@router.get("/status")
async def get_scraper_status():
    is_active = len(JOBS_STORE) > 0
    return {
        "Agent 1 Discovery": "Running" if is_active else "Standby (Awaiting Scrape Trigger)",
        "Agent 2 Intelligence": "Running" if is_active else "Standby",
        "Agent 3 Student Intel": "Active" if is_active else "Awaiting Profile",
        "Agent 4 Matching": "Active" if is_active else "Standby",
        "last_run": LAST_RUN_TIME,
        "jobs_in_pipeline": len(JOBS_STORE)
    }

@router.get("/logs")
async def get_scraper_logs():
    return LOGS_STORE

"""Admin & System Controls API routes."""
from fastapi import APIRouter

router = APIRouter()

@router.get("/system-health")
async def get_system_health():
    return {
        "status": "Operational",
        "active_workers": 4,
        "database_pool": "Connected",
        "redis_cache": "Active",
        "vector_db": "Ready"
    }

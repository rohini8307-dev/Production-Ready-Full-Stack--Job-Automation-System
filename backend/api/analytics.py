"""Analytics and Notifications API routes."""
from fastapi import APIRouter
from backend.services.analytics_service import analytics_service
from backend.services.notification_service import notification_service

router = APIRouter()

@router.get("/overview")
async def get_dashboard_overview():
    return analytics_service.get_overview()

@router.get("/notifications")
async def get_notifications():
    return notification_service.get_notifications()

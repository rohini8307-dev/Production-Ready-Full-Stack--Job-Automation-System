"""
FastAPI application entry point. Sets up CORS, API routes, middleware, and startup events.
"""
import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.config import settings
from backend.database.postgres import init_db
from backend.api import auth, profile, scraper, jobs, recommendations, applications, analytics, admin

app = FastAPI(
    title=settings.APP_NAME,
    description="Enterprise Multi-Agent AI Career Intelligence Platform predicting shortlist odds & automating career workflows.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(profile.router, prefix="/api/profile", tags=["Profile & Student Intel"])
app.include_router(scraper.router, prefix="/api/scraper", tags=["Multi-Agent Scraper"])
app.include_router(jobs.router, prefix="/api/jobs", tags=["Jobs & Discover"])
app.include_router(recommendations.router, prefix="/api/recommendations", tags=["Agent 4 Recommendations"])
app.include_router(applications.router, prefix="/api/applications", tags=["Applications & Bucket List"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics & Activity Logs"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin & System Controls"])

@app.on_event("startup")
async def startup_event():
    await init_db()

@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "environment": settings.ENV,
        "agents": {
            "Agent 1 Discovery": "Running",
            "Agent 2 Intelligence": "Running",
            "Agent 3 Student Intel": "Idle",
            "Agent 4 Matching": "Running"
        }
    }

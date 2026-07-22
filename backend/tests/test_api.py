"""Automated API testing suite for NOAH Backend."""
import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "agents" in data

def test_get_jobs():
    response = client.get("/api/jobs")
    assert response.status_code == 200
    jobs = response.json()
    assert len(jobs) >= 4
    assert jobs[0]["shortlist_odds"] == 88

def test_get_recommendations():
    response = client.get("/api/recommendations/?priority=All")
    assert response.status_code == 200
    data = response.json()
    assert data["total_active"] == 128

def test_analytics_overview():
    response = client.get("/api/analytics/overview")
    assert response.status_code == 200
    data = response.json()
    assert data["resume_score"] == 85
    assert data["ats_score"] == 78
    assert data["shortlist_probability"] == 72

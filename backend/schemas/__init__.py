"""Schemas package init and core Pydantic request/response models."""
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class CareerWizardRequest(BaseModel):
    preferred_domain: str
    preferred_work_mode: str
    expected_salary: str
    preferred_cities: str
    primary_skills: List[str]

class JobCardResponse(BaseModel):
    id: int
    title: str
    company: str
    platform: str
    location: str
    work_mode: str
    salary: str
    applicants_count: int
    total_openings: int
    posted_time: str
    is_new: bool
    trust_score: float
    skills: List[str]
    description: str
    priority: str
    shortlist_odds: int

class AutoApplyRequest(BaseModel):
    job_ids: Optional[List[int]] = None
    priority_level: Optional[str] = None

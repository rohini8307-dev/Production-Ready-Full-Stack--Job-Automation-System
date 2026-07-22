from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text
from datetime import datetime
from backend.database.postgres import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    company = Column(String, index=True)
    platform = Column(String) # Indeed, LinkedIn, Naukri, Internshala
    location = Column(String)
    work_mode = Column(String) # On-site, Remote, Hybrid
    salary = Column(String)
    applicants_count = Column(Integer, default=30)
    total_openings = Column(Integer, default=200)
    posted_time = Column(String, default="2h ago")
    is_new = Column(Boolean, default=True)
    trust_score = Column(Float, default=0.96)
    skills = Column(String) # comma-separated
    description = Column(Text)
    priority = Column(String, default="Priority 1")
    shortlist_odds = Column(Integer, default=88)
    created_at = Column(DateTime, default=datetime.utcnow)

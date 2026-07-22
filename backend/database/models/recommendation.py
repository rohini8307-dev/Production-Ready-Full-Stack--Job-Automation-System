from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from datetime import datetime
from backend.database.postgres import Base

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))
    match_score = Column(Float, default=88.0)
    shortlist_probability = Column(Float, default=88.0)
    interview_probability = Column(Float, default=72.0)
    priority_level = Column(String, default="Priority 1")
    explanation = Column(String, default="High alignment with React, TypeScript, and modern state management skills.")
    created_at = Column(DateTime, default=datetime.utcnow)

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from datetime import datetime
from backend.database.postgres import Base

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))
    stage = Column(String, default="Applied") # Applied, Screening, Assessment, Interview, Offer, Rejected
    is_bucket = Column(Boolean, default=False)
    applied_at = Column(DateTime, default=datetime.utcnow)
    notes = Column(String, default="Auto-applied via NOAH Agent 4 compatibility match.")

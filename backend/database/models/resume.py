from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text
from datetime import datetime
from backend.database.postgres import Base

class ResumeProfile(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    resume_score = Column(Integer, default=85)
    ats_score = Column(Integer, default=78)
    github_url = Column(String, default="https://github.com/aditya-dev")
    linkedin_url = Column(String, default="https://linkedin.com/in/aditya-dev")
    extracted_skills = Column(String, default="React, JavaScript, TypeScript, Tailwind CSS, Node.js, Python, FastAPI")
    missing_skills = Column(String, default="Next.js, AWS, Docker, GraphQL")
    domain_confidence = Column(String, default="Backend: 91%, Full Stack: 88%, ML: 74%, Cloud: 61%")
    suggestions = Column(Text, default="Add quantifiers to project impacts; include Docker deployment experience.")
    created_at = Column(DateTime, default=datetime.utcnow)

from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from backend.database.postgres import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, default="Aditya Kumar")
    email = Column(String, unique=True, index=True, default="aditya@example.com")
    hashed_password = Column(String, default="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW") # 'password'
    preferred_domain = Column(String, default="Full Stack Engineering")
    preferred_work_mode = Column(String, default="Hybrid")
    expected_salary = Column(String, default="$120k - $150k")
    preferred_cities = Column(String, default="Bangalore, Hyderabad, Remote")
    created_at = Column(DateTime, default=datetime.utcnow)

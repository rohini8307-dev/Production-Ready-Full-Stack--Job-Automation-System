from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from backend.database.postgres import Base

class AgentLog(Base):
    __tablename__ = "agent_logs"

    id = Column(Integer, primary_key=True, index=True)
    agent_name = Column(String) # Agent 1 (Discovery), Agent 2 (Intelligence), Agent 3 (Student Intel), Agent 4 (Matching)
    message = Column(String)
    status = Column(String, default="Completed")
    timestamp_label = Column(String, default="2m ago")
    created_at = Column(DateTime, default=datetime.utcnow)

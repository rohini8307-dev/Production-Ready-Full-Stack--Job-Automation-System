"""Student embedding generator for Agent 3."""
from backend.agents.agent2_job_intelligence.embeddings import generate_embedding

def generate_student_embedding(student_data: str) -> list[float]:
    return generate_embedding(student_data)

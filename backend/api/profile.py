"""Profile and Student Intelligence API routes (Agent 3)."""
import os
import json
import httpx
import re
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from typing import Dict, Optional, List
import tempfile
try:
    from pypdf import PdfReader
except ImportError:
    PdfReader = None

router = APIRouter()

USER_PROFILE: Dict = {
    "isProfileCompleted": False,
    "fullName": "",
    "email": "",
    "currentLocation": "",
    "workMode": "Remote",
    "primaryDomain": "",
    "keySkills": [],
    "expectedSalaryMin": "",
    "expectedSalaryMax": "",
    # New dynamic ATS state
    "ats_score": 80,
    "resume_score": 84,
    "suggestions": [
        "Add explicit deployment benchmarks to resume.",
        "Quantify key achievements with measurable throughput numbers."
    ]
}

class CareerWizardRequest(BaseModel):
    fullName: str
    email: str
    currentLocation: str
    workMode: str
    primaryDomain: str
    keySkills: List[str]
    expectedSalaryMin: str
    expectedSalaryMax: str

@router.get("/summary")
async def get_profile_summary():
    if not USER_PROFILE.get("isProfileCompleted"):
        return {"status": "incomplete", "user": None, "resume_score": 0, "ats_score": 0}
    return {
        "user": {"name": USER_PROFILE.get("fullName"), "email": USER_PROFILE.get("email")},
        "resume_score": USER_PROFILE.get("resume_score", 84),
        "ats_score": USER_PROFILE.get("ats_score", 80),
        "domain_confidence": f"{USER_PROFILE.get('primaryDomain', 'Domain')}: 92%",
        "skills_match": {
            "overall": 82,
            "matched": USER_PROFILE.get("keySkills", []),
            "missing": ["Kubernetes", "GraphQL"]
        },
        "suggestions": USER_PROFILE.get("suggestions", []),
        "roadmap": []
    }

@router.post("/wizard")
async def submit_wizard(req: CareerWizardRequest):
    global USER_PROFILE
    USER_PROFILE.update(req.dict())
    USER_PROFILE["isProfileCompleted"] = True
    return {"status": "activated", "profile": USER_PROFILE}

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "deepseek-r1:7b"

async def extract_text_from_upload(file: UploadFile, fallback_text: str) -> str:
    if file and file.filename:
        if not PdfReader:
            raise HTTPException(status_code=500, detail="pypdf is not installed. Please run 'pip install pypdf'")
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
                content = await file.read()
                temp_file.write(content)
                temp_path = temp_file.name
            
            reader = PdfReader(temp_path)
            extracted = ""
            for page in reader.pages:
                extracted += page.extract_text() + "\n"
            return extracted.strip()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to read PDF: {str(e)}")
    return fallback_text if fallback_text else "A Full Stack Developer resume with React, Python, Docker and AWS experience."

async def query_ollama(prompt: str) -> str:
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                OLLAMA_URL,
                json={
                    "model": MODEL_NAME,
                    "prompt": prompt,
                    "stream": False
                },
                timeout=120.0
            )
            response.raise_for_status()
            data = response.json()
            raw_text = data.get("response", "")
            
            # DeepSeek R1 puts thinking process in <think> tags, we need to strip them
            clean_text = re.sub(r'<think>.*?</think>', '', raw_text, flags=re.DOTALL).strip()
            return clean_text
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Ollama local model error: {str(e)}. Make sure Ollama is running.")

@router.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(None), resume_text: str = Form(None)):
    resume_content = ""
    temp_path = None
    
    # Custom extraction to keep the file path for the scraper
    if file and file.filename:
        if not PdfReader:
            raise HTTPException(status_code=500, detail="pypdf is not installed. Please run 'pip install pypdf'")
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
                content = await file.read()
                temp_file.write(content)
                temp_path = temp_file.name
            
            reader = PdfReader(temp_path)
            for page in reader.pages:
                resume_content += page.extract_text() + "\n"
            resume_content = resume_content.strip()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to read PDF: {str(e)}")
    else:
        resume_content = resume_text if resume_text else "A Full Stack Developer resume with React, Python, Docker and AWS experience."
    
    prompt = f"""Analyze this resume and provide exactly 3 bullet points on how to improve its ATS compatibility. Use short 1-sentence bullet points without markdown bolding.\n\nResume:\n{resume_content}"""
    
    clean_text = await query_ollama(prompt)
    text_out = clean_text.strip().split('\n')
    
    # Parse suggestions
    suggestions = []
    for line in text_out:
        line = line.strip()
        if not line: continue
        if line.startswith('-') or line.startswith('*') or line.startswith('•'):
            suggestions.append(line.lstrip('-*• ').strip())
    
    if not suggestions:
        suggestions = [s for s in text_out if s and len(s) > 10][:3]
        
    # Get the ATS score from AutoApplyMax using Playwright
    score = 80
    if temp_path:
        from backend.services.autoapplymax_scraper import get_ats_score_from_autoapplymax
        score = await get_ats_score_from_autoapplymax(temp_path)
        
        # Clean up the temp file
        import os
        try:
            os.remove(temp_path)
        except:
            pass
        
    global USER_PROFILE
    USER_PROFILE["ats_score"] = score
    USER_PROFILE["suggestions"] = suggestions[:3]
    
    return {"ats_score": score, "suggestions": suggestions[:3]}

@router.post("/enhance-ats")
async def enhance_ats(file: UploadFile = File(None), resume_text: str = Form(None)):
    resume_content = await extract_text_from_upload(file, resume_text)
    
    prompt = f"""Rewrite this resume strictly focusing on ATS compatibility and metrics. Make it professional and quantifiable. Output ONLY the rewritten resume text, nothing else.\n\nResume:\n{resume_content}"""
    
    clean_text = await query_ollama(prompt)
    return {"enhanced_resume": clean_text}


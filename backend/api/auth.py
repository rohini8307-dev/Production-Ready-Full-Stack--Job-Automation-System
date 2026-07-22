"""Authentication API routes."""
from fastapi import APIRouter, HTTPException, Depends
from backend.schemas import LoginRequest, TokenResponse
from backend.services.auth_service import auth_service

router = APIRouter()

@router.post("/login", response_model=TokenResponse)
async def login(req: LoginRequest):
    if not req.email or not req.password:
        raise HTTPException(status_code=400, detail="Email and password required")
    token = auth_service.create_access_token({"sub": req.email})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/register")
async def register(req: LoginRequest):
    return {"status": "User registered successfully", "email": req.email}

@router.post("/logout")
async def logout():
    return {"status": "Logged out successfully"}

"""
Configuration settings loaded from environment variables or defaults.
"""
import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "NOAH NexusAI Platform"
    ENV: str = "production"
    PORT: int = 8000
    SECRET_KEY: str = "supersecretkey_for_jwt_tokens_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./nexusai.db")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    QDRANT_URL: str = os.getenv("QDRANT_URL", "http://localhost:6333")

    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    QWEN_API_KEY: str = os.getenv("QWEN_API_KEY", "")
    KIMI_API_KEY: str = os.getenv("KIMI_API_KEY", "")

    SCRAPER_CONCURRENCY: int = int(os.getenv("SCRAPER_CONCURRENCY", "5"))
    SCRAPER_RATE_LIMIT_DELAY: float = float(os.getenv("SCRAPER_RATE_LIMIT_DELAY", "1.5"))

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()

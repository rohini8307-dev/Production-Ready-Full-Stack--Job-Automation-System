"""
Dependencies injection module for FastAPI handlers (database sessions, current user, agent clients).
"""
from typing import AsyncGenerator
from backend.database.postgres import async_session_maker

async def get_db() -> AsyncGenerator:
    async with async_session_maker() as session:
        try:
            yield session
        finally:
            await session.close()

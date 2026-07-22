"""
Async SQLAlchemy PostgreSQL connection and base ORM model declaration.
Uses SQLite fallback if DATABASE_URL is set to sqlite for seamless zero-config local runs.
"""
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from backend.app.config import settings

engine = create_async_engine(settings.DATABASE_URL, echo=False)
async_session_maker = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

async def init_db():
    async with engine.begin() as conn:
        from backend.database.models import user, job, resume, recommendation, application, agent_log
        await conn.run_sync(Base.metadata.create_all)

"""Async httpx client for scraping."""
import httpx

async def get_page(url: str) -> str:
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(url)
        return resp.text

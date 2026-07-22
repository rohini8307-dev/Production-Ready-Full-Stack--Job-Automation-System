# NOAH / NexusAI Platform - Production Multi-Agent AI Career Intelligence Platform

Enterprise-grade AI Career Intelligence Platform designed to predict shortlist probabilities, analyze ATS compatibility, orchestrate 4 autonomous discovery/intelligence/matching agents, and provide seamless automated application workflows.

## Directory Structure
```
job_automation/
├── backend/            # FastAPI Async Multi-Agent Backend
│   ├── app/            # Core app configuration & initialization
│   ├── api/            # REST API Routes
│   ├── agents/         # 4 Autonomous AI Agents (Discovery, Job Intel, Student Intel, Matching)
│   ├── database/       # PostgreSQL, Redis & Qdrant/VectorDB
│   ├── llm/            # Multi-LLM Router & Reasoning engine
│   ├── scraper/        # Async Playwright & httpx scraping infrastructure
│   ├── services/       # Core Business Logic Services
│   └── tests/          # Automated verification tests
└── frontend/           # Vite + React Modern Dark Dashboard
    └── src/
        ├── app/        # Pages matching exact UI requirements
        ├── components/ # Modular UI components (Cards, Gauges, Tables, Feed)
        ├── hooks/      # State & data hooks
        ├── services/   # API connectors
        └── store/      # State stores
```

## Running the Application
### Using Docker
```bash
docker-compose up --build
```

### Local Development
1. Backend:
```bash
pip install -r requirements.txt
python -m uvicorn backend.app.main:app --reload --port 8000
```
2. Frontend:
```bash
cd frontend
npm install
npm run dev
```

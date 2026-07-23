# NOAH: NexusAI Platform (Job Automation System)

NOAH is a highly modular, Production-Ready Full-Stack Job Automation System powered by an intelligent multi-agent architecture. It autonomously discovers jobs, analyzes and extracts skills, optimizes candidate resumes for ATS (Applicant Tracking Systems), and leverages deep semantic matching to recommend the best job opportunities.

This document provides a comprehensive architectural overview of the system, detailing the distinct roles of each AI Agent, data flows, and infrastructure decisions.

---

## Architecture Overview: The 4 Agents

The core of NOAH revolves around four highly specialized agents. This separation of concerns ensures that the system is modular, scalable, and easy to maintain.

### 🤖 Agent 1: Job Discovery & Scraping
**Role:** Responsible for finding, extracting, and validating job postings from various portals across the web.

**How it works:**
- **Modular Workers:** Every job portal (LinkedIn, Indeed, Glassdoor, Naukri, Internshala, Google Jobs, Company Careers) has its own dedicated worker module.
- **Scraping Tools:**
  - **Dynamic Websites (JS-rendered):** Uses **Playwright** (or Selenium) for headless browser automation.
  - **Static Pages:** Uses `httpx`, `aiohttp`, and `asyncio` for high-speed asynchronous requests, paired with `BeautifulSoup`, `lxml`, `XPath`, and `Regex` for parsing.
- **Anti-Bot & Rate Limiting:** Implements random user agents, proxy rotation, exponential backoff, human-like delays, and session cookies to prevent getting blocked.
- **Pipeline:** `Orchestrator -> Scheduler -> Rate Limiter -> Proxy Manager -> Deduplicator -> Trust Validator -> Parser -> Exporter`.

### 🧠 Agent 2: Job Intelligence
**Role:** Understands and extracts semantic meaning from raw job descriptions.

**How it works:**
- Takes raw parsed data from Agent 1 and normalizes it.
- Uses NLP (e.g., `spaCy`) and NER (Named Entity Recognition) to extract required skills, qualifications, and experience.
- Converts the job description into dense vector embeddings using **Sentence Transformers**.
- Stores the semantic data and embeddings into a Vector Database (like **Qdrant** or **FAISS**) to build a Knowledge Graph.

### 📄 Agent 3: Resume Analyzer & ATS Enhancer
**Role:** Analyzes the candidate's resume, extracts data, evaluates ATS compatibility, and rewrites it for maximum impact.

**How it works:**
- **Pipeline:** `Resume PDF -> PyMuPDF (Text Extraction) -> spaCy (NER) -> Skill Extraction -> Sentence Transformer (Embedding) -> LLM (Resume Analysis)`.
- **ATS Checker Integration:** Agent 3 utilizes an automated **Playwright** scraper to navigate to third-party ATS checkers (e.g., `autoapplymax.com`). It uploads the resume, pastes a target job description, triggers the analysis, and scrapes the live ATS score and keyword gap suggestions back into the dashboard.
- **Output:** Extracts Skills, Projects, Education, Experience, and computes an initial Resume Score and ATS Score.

### 🎯 Agent 4: Matching Engine
**Role:** Acts as the brain of the operation by computing the final match score between a candidate's resume and thousands of jobs.

**How it works (Multi-Stage Pipeline):**
1. **Stage 1: Vector Search (Embedding Similarity)** 
   - Uses **Qdrant** to compute Cosine Similarity between the Resume's 768-dimensional vector and Job Description vectors. Filters down to the Top 100 Jobs.
2. **Stage 2: Rule Engine**
   - Applies strict business rules: Location, Salary, Remote/On-site, Visa sponsorship, Freshness, and Company Trust.
3. **Stage 3: AI Reasoning (LLM Re-ranking)**
   - Passes the top candidates to an LLM to evaluate nuanced factors that simple similarity misses (Strengths, Weaknesses, Skill Gaps, Interview Readiness), filtering down to the Top 20 Jobs.
4. **Stage 4: Final Score Calculation**
   - A weighted aggregate score (e.g., Embedding 35%, Skills 20%, Experience 15%, Projects 10%, ATS Compatibility 10%, Company Preference 5%, Location 5%).
- **Outputs:** Overall Match Score, Shortlist Odds, Interview Probability, and Priority Ranking.

---

## End-to-End Data Flow

```text
                User Login
                     │
                     ▼
             Resume Upload
                     │
                     ▼
          Agent 3 Resume Analyzer
                     │
      Resume Score / ATS Score / Skills
                     │
                     ▼
        Agent 1 Job Discovery & Scraping
                     │
        Playwright / Selenium / HTTPX
                     │
                     ▼
          Validation & Deduplication
                     │
                     ▼
           SQLAlchemy → PostgreSQL
                     │
                     ▼
         Agent 2 Job Intelligence
       (Parsing, Skills, Embeddings)
                     │
                     ▼
       Vector DB (Qdrant / FAISS)
                     │
                     ▼
            Agent 4 Matching Engine
    (Vector Search → Rules → LLM Re-rank)
                     │
                     ▼
       Match Score / Shortlist Odds /
 Interview Probability / Offer Probability
                     │
                     ▼
              React Dashboard
```

---

## Database Schema & Interaction

### Ownership by Agent
Each agent owns and interacts with specific tables in the database to prevent direct coupling:
- **Agent 1:** `Jobs`, `Companies`, `Scrape Logs`
- **Agent 2:** `Skills`, `Embeddings`, `Knowledge Graph`
- **Agent 3:** `Resume`, `Resume Scores`, `ATS Scores`, `Skill Gap`
- **Agent 4:** `Recommendations`, `Match Scores`, `Priority Jobs`

### How the Scraper Interacts with the Database
The scraper **never writes directly into PostgreSQL using raw SQL**.
Instead, it follows a rigorous normalization pipeline:
`Worker -> Normalize Data -> Validation -> Deduplication -> Trust Checker -> Repository Layer -> SQLAlchemy ORM -> PostgreSQL`

*Example (LinkedIn Worker):*
Creates a `Job Object` -> Passes to `JobRepository.create()` -> Uses `session.add(job)` and `session.commit()` in SQLAlchemy. This abstracts the database layer entirely, making future database migrations seamless.

---

## Rate Limiting Architecture

NOAH implements two distinct layers of rate limiting:

### A. User API Rate Limiting
Prevents users from flooding the backend API (e.g., max 100 requests/minute).
- **Implementation:** FastAPI integrates with **Redis** using tools like `slowapi` or `fastapi-limiter`.
- **Active User Sessions:** Each logged-in user receives a JWT Token linked to a Redis Session. Redis isolates users in distinct rate-limit buckets (`user123: count=18, expire=60sec`).

### B. Scraper Rate Limiting
Protects the job scrapers (Agent 1) from being IP-banned by portals like LinkedIn or Indeed.
- **Implementation:** Uses Async Queues and Semaphores. Instead of blasting 1000 requests instantly, it performs micro-batches (e.g., 5 requests -> random human delay -> 5 requests -> wait).
- Incorporates exponential backoff and retry logic.

---

## Infrastructure: Docker's Role

Docker packages every microservice with its dependencies so the application runs exactly the same way in development, staging, and production environments.

### Services:
- **Frontend:** React (Vite) container
- **Backend:** FastAPI (Python) container
- **Database:** PostgreSQL container
- **Cache / Sessions:** Redis container
- **Vector DB:** Qdrant container
- **Monitoring:** Prometheus & Grafana containers

A single `docker compose up --build` command seamlessly orchestrates the startup, networking, and volume mounting for the entire platform.

---

## Getting Started (Local Development)

### Prerequisites
- Node.js & npm
- Python 3.9+
- Redis (optional, local or via Docker)
- Ollama (for running local `deepseek-r1` models)
- Playwright browsers (`playwright install chromium`)

### 1. Backend Setup
```bash
pip install -r requirements.txt
playwright install chromium
python -m uvicorn backend.app.main:app --reload --port 8000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

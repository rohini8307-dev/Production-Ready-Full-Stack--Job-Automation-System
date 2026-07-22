const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const scraperService = {
  async runScrape(keywords = "React Developer", location = "India") {
    const res = await fetch(
      `${BASE_URL}/api/scraper/run?keywords=${encodeURIComponent(keywords)}&location=${encodeURIComponent(location)}`,
      { method: "POST" }
    );
    if (!res.ok) throw new Error(`Scrape failed: ${res.status}`);
    return await res.json();
  },
  async getStatus() {
    try {
      const res = await fetch(`${BASE_URL}/api/scraper/status`);
      return await res.json();
    } catch (e) {
      return {
        "Agent 1 Discovery": "Standby",
        "Agent 2 Intelligence": "Standby",
        "Agent 3 Student Intel": "Standby",
        "Agent 4 Matching": "Standby",
        "last_run": "Never",
        "jobs_in_pipeline": 0
      };
    }
  },
  async getLogs() {
    try {
      const res = await fetch(`${BASE_URL}/api/scraper/logs`);
      return await res.json();
    } catch (e) {
      return [];
    }
  }
};

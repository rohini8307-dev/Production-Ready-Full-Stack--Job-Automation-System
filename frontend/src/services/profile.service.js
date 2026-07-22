const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const profileService = {
  async getSummary() {
    try {
      const res = await fetch(`${BASE_URL}/api/profile/summary`);
      return await res.json();
    } catch (e) {
      return {
        resume_score: 85,
        ats_score: 78,
        domain_confidence: "Backend: 91%, Full Stack: 88%, ML: 74%, Cloud: 61%",
        skills_match: {
          overall_match: 72,
          matched: 16,
          partial_match: 8,
          missing: 7,
          top_missing_skills: ["Next.js", "AWS", "Docker", "GraphQL"]
        }
      };
    }
  }
};

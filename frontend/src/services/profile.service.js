const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const profileService = {
  async getSummary() {
    try {
      const res = await fetch(`${BASE_URL}/api/profile/summary`);
      return await res.json();
    } catch (e) {
      return {
        resume_score: 0,
        ats_score: 0,
        domain_confidence: "",
        skills_match: { overall: 0, matched: [], missing: [] }
      };
    }
  }
};

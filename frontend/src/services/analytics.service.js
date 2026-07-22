const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const analyticsService = {
  async getOverview() {
    try {
      const res = await fetch(`${BASE_URL}/api/analytics/overview`);
      return await res.json();
    } catch (e) {
      return {
        resume_score: 0,
        ats_score: 0,
        active_recommendations: 0,
        shortlist_probability: 0,
        applied_jobs: 0,
        skills_match: { overall_match: 0, matched: 0, partial_match: 0, missing: 0, top_missing_skills: [] },
        pipeline: { Applied: 0, Screening: 0, Assessment: 0, Interview: 0, Offer: 0, Rejected: 0 }
      };
    }
  }
};

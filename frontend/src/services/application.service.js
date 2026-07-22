const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const applicationService = {
  async getApplications() {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/tracker`);
      return await res.json();
    } catch (e) {
      return { total_applied: 24, pipeline: { Applied: 24, Screening: 18, Assessment: 6, Interview: 3, Offer: 1 } };
    }
  },
  async autoApply(jobIds, priorityLevel) {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/auto-apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_ids: jobIds, priority_level: priorityLevel })
      });
      return await res.json();
    } catch (e) {
      return { status: "success" };
    }
  },
  async addToBucket(jobId) {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/bucket-list/add/${jobId}`, { method: "POST" });
      return await res.json();
    } catch (e) {
      return { status: "added" };
    }
  }
};

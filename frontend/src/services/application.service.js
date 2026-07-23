const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const applicationService = {
  async getApplications() {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/tracker`);
      return await res.json();
    } catch (e) {
      return { total_applied: 0, pipeline: { Applied: 0, Screening: 0, Assessment: 0, Interview: 0, Offer: 0, Rejected: 0 }, recent_applications: [] };
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
  },
  async getBucketList() {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/bucket-list`);
      return await res.json();
    } catch (e) {
      return { total: 0, jobs: [] };
    }
  },
  async removeFromBucket(jobId) {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/bucket-list/remove/${jobId}`, { method: "DELETE" });
      return await res.json();
    } catch (e) {
      return { status: "removed" };
    }
  }
};

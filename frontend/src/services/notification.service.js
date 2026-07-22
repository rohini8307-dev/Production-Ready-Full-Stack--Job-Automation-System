const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const notificationService = {
  async getNotifications() {
    try {
      const res = await fetch(`${BASE_URL}/api/analytics/notifications`);
      return await res.json();
    } catch (e) {
      return [];
    }
  }
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const authService = {
  async login(email, password) {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  }
};

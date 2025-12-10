// src/lib/api.ts
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8787";

// Helper to auto-add JWT from localStorage
async function fetchWithAuth(input: string, init?: RequestInit): Promise<Response> {
  const token = localStorage.getItem("token");
  const headers = new Headers(init?.headers || {});
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Content-Type", "application/json");

  return fetch(`${API_BASE}${input}`, { ...init, headers });
}

export const api = {
  // === AUTH ===
  async register(email: string, password: string) {
    const res = await fetchWithAuth("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  async login(email: string, password: string) {
    const res = await fetchWithAuth("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // === ONBOARDING ===
  async onboardingStep1(data: any) {
    const res = await fetchWithAuth("/api/onboarding/step1", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // === BILLING ===
  async createSubscription(priceId: string) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const res = await fetchWithAuth("/api/billing/subscribe", {
      method: "POST",
      body: JSON.stringify({ priceId, userId: user.id }),
    });
    return res.json();
  },
};

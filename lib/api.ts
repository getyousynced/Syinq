// 🌐 Base URL for your mock backend
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  "https://690cd83da6d92d83e84fa5a5.mockapi.io/api/v1";

/**
 * ⏱️ Universal fetch wrapper with timeout & error handling
 */
export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = 30_000
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(input, { ...init, signal: controller.signal });
    clearTimeout(id);

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }

    return res;
  } catch (err) {
    clearTimeout(id);
    console.error("❌ Fetch error:", err);
    throw err;
  }
}

/**
 * 🧠 Admin API service
 * Works with MockAPI.io now, can be swapped for real SYINQ backend later
 */
export const AdminAPI = {
  // 🔐 Temporary mock login (for now, until real backend auth)
  async login(email: string, password: string) {
    // For now, just a client-side check
    await new Promise((r) => setTimeout(r, 600));

    if (!process.env.NEXT_PUBLIC_ADMIN_ID || !process.env.NEXT_PUBLIC_ADMIN_PASS) {
      throw new Error("Admin credentials not configured");
    }

    if (email === process.env.NEXT_PUBLIC_ADMIN_ID && password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      return { token: "mock-jwt-token" };
    }
    throw new Error("Invalid credentials");
  },

  // 🏫 Fetch all universities from MockAPI
  async listUniversities() {
    const res = await fetchWithTimeout(`${API_BASE}/universities`, {
      cache: "no-store",
    });
    const data = await res.json();
    console.log(data)
    // ensure consistent structure for dashboard
    return Array.isArray(data) ? data : [];
  },

  // ✅ Accept a university
  async accept(id: string) {
    const res = await fetchWithTimeout(`${API_BASE}/universities/${String(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "accepted" }),
    });
    const updated = await res.json();
    console.log("✅ Accepted:", updated);
    return updated;
  },

  // ❌ Reject a university
  async reject(id: string) {
    const res = await fetchWithTimeout(`${API_BASE}/universities/${String(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "rejected" }),
    });
    const updated = await res.json();
    console.log("❌ Rejected:", updated);
    return updated;
  },
};

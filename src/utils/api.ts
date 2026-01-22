const BASE_URL = "http://localhost:8080/api/v1";

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: HeadersInit;
};


export async function api(endpoint: string, options: ApiOptions = {}) {
  const { method = "GET", body, headers } = options;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    credentials: "include",   // 👈 THIS IS THE KEY
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}
import type { ApiResponse, AuthResponse, SectionGetResponse, SectionPutRequest } from "../../../shared/types/api";
import type { PortfolioData, SectionKey } from "../../../shared/types/portfolio";
import { getToken, clearSession } from "./auth";

const BASE = "/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const res = await fetch(`${BASE}${path}`, { ...options, headers, credentials: "include" });
    if (res.status === 401) {
      clearSession();
      window.location.href = "/admin/login";
      return { ok: false, error: "Session expired" };
    }
    return (await res.json()) as ApiResponse<T>;
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}

export const authApi = {
  login: (password: string) =>
    request<AuthResponse>("/admin/auth", { method: "POST", body: JSON.stringify({ password }) }),
  refresh: () =>
    request<AuthResponse>("/admin/auth", { method: "GET" }),
  logout: () =>
    request("/admin/auth", { method: "DELETE" }),
};

export const sectionApi = {
  get: <K extends SectionKey>(id: K) =>
    request<SectionGetResponse<K>>(`/admin/section?id=${id}`),
  put: <K extends SectionKey>(id: K, data: PortfolioData[K]) =>
    request<SectionGetResponse<K>>("/admin/section", {
      method: "PUT",
      body: JSON.stringify({ id, data } satisfies SectionPutRequest<K>),
    }),
};

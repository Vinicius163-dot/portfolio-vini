import { authApi } from "./api";

interface Session {
  token: string;
  expiresAt: number;
}

let session: Session | null = null;
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

export function getToken(): string | null {
  return session?.token ?? null;
}

export function isAuthenticated(): boolean {
  return session !== null && Date.now() < session.expiresAt;
}

export function setSession(token: string, expiresAt: number): void {
  session = { token, expiresAt };
  scheduleRefresh(expiresAt);
}

export function clearSession(): void {
  session = null;
  if (refreshTimer) clearTimeout(refreshTimer);
  refreshTimer = null;
}

function scheduleRefresh(expiresAt: number): void {
  if (refreshTimer) clearTimeout(refreshTimer);
  const delay = Math.max(0, expiresAt - Date.now() - 60_000);
  refreshTimer = setTimeout(async () => {
    const res = await authApi.refresh();
    if (res.ok) {
      setSession(res.data.token, res.data.expiresAt);
    } else {
      clearSession();
      window.location.href = "/admin/login";
    }
  }, delay);
}

export async function tryRestoreSession(): Promise<boolean> {
  const res = await authApi.refresh();
  if (res.ok) {
    setSession(res.data.token, res.data.expiresAt);
    return true;
  }
  return false;
}

export async function login(password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const res = await authApi.login(password);
  if (!res.ok) return { ok: false, error: res.error };
  setSession(res.data.token, res.data.expiresAt);
  return { ok: true };
}

export async function logout(): Promise<void> {
  await authApi.logout();
  clearSession();
}

import { useState, useEffect, useCallback } from "react";
import { isAuthenticated, tryRestoreSession, login as doLogin, logout as doLogout } from "../lib/auth";

type AuthState = "loading" | "authenticated" | "unauthenticated";

export function useAuth() {
  const [state, setState] = useState<AuthState>("loading");

  useEffect(() => {
    if (isAuthenticated()) { setState("authenticated"); return; }
    tryRestoreSession().then((ok) => setState(ok ? "authenticated" : "unauthenticated"));
  }, []);

  const login = useCallback(async (password: string) => {
    const result = await doLogin(password);
    if (result.ok) setState("authenticated");
    return result;
  }, []);

  const logout = useCallback(async () => {
    await doLogout();
    setState("unauthenticated");
  }, []);

  return { state, login, logout, isAuthenticated: state === "authenticated" };
}

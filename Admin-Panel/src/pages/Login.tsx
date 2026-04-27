import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login, state } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state === "authenticated") navigate("/admin", { replace: true });
  }, [state, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await login(password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      setPassword("");
    } else {
      navigate("/admin", { replace: true });
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__header">
          <div className="login-logo">vp</div>
          <h1>Portfolio Admin</h1>
          <p>Enter your password to continue</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="password" className="field__label">Password</label>
            <input
              id="password"
              type="password"
              className="field__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoFocus
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button
            type="submit"
            className="btn btn--primary btn--full"
            disabled={loading || !password}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

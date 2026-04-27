import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login, state } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ accessKeyId: "", secretAccessKey: "" });
  const [showSecret, setShowSecret] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state === "authenticated") navigate("/admin", { replace: true });
  }, [state, navigate]);

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await login({ accessKeyId: form.accessKeyId.trim(), secretAccessKey: form.secretAccessKey.trim() });
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      setForm((f) => ({ ...f, secretAccessKey: "" }));
    } else {
      navigate("/admin", { replace: true });
    }
  }

  const canSubmit = form.accessKeyId.startsWith("AKIA") && form.secretAccessKey.length >= 16;

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__header">
          <div className="login-logo">vp</div>
          <h1>Portfolio Admin</h1>
          <p>Sign in with your AWS IAM credentials</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="accessKeyId" className="field__label">
              Access Key ID
            </label>
            <input
              id="accessKeyId"
              type="text"
              className="field__input"
              value={form.accessKeyId}
              onChange={(e) => set("accessKeyId", e.target.value)}
              placeholder="AKIAIOSFODNN7EXAMPLE"
              autoFocus
              autoComplete="username"
              spellCheck={false}
              disabled={loading}
            />
          </div>

          <div className="field">
            <label htmlFor="secretAccessKey" className="field__label">
              Secret Access Key
            </label>
            <div className="field__input-wrap">
              <input
                id="secretAccessKey"
                type={showSecret ? "text" : "password"}
                className="field__input field__input--with-toggle"
                value={form.secretAccessKey}
                onChange={(e) => set("secretAccessKey", e.target.value)}
                placeholder="••••••••••••••••••••••••••••••••••••••••"
                autoComplete="current-password"
                spellCheck={false}
                disabled={loading}
              />
              <button
                type="button"
                className="field__toggle"
                onClick={() => setShowSecret((s) => !s)}
                aria-label={showSecret ? "Hide secret" : "Show secret"}
              >
                {showSecret ? (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button
            type="submit"
            className="btn btn--primary btn--full"
            disabled={loading || !canSubmit}
          >
            {loading ? (
              <>
                <span className="btn-spinner" /> Verifying…
              </>
            ) : (
              "Sign in with AWS"
            )}
          </button>
        </form>

        <p className="login-hint">
          Use the Access Key of your <code>portfolio-api</code> IAM user.
        </p>
      </div>
    </div>
  );
}

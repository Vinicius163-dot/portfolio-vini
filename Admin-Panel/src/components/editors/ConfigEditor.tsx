import { useState, useEffect } from "react";
import { useSection, useSaveSection } from "../../hooks/useSection";
import TopBar from "../layout/TopBar";
import type { SiteConfig, SocialLink } from "../../../../shared/types/portfolio";

export default function ConfigEditor() {
  const { data: config, isLoading: configLoading } = useSection("config");
  const { data: social = [], isLoading: socialLoading } = useSection("social");
  const { mutate: saveConfig, isPending: savingConfig, isSuccess: configSaved, isError: configError } = useSaveSection("config");
  const { mutate: saveSocial, isPending: savingSocial, isSuccess: socialSaved, isError: socialError } = useSaveSection("social");

  const [form, setForm] = useState<SiteConfig | null>(null);
  const [socialForm, setSocialForm] = useState<SocialLink[] | null>(null);

  useEffect(() => { if (config) setForm({ ...config }); }, [config]);
  useEffect(() => { if (social) setSocialForm([...social]); }, [social]);

  const set = (key: keyof SiteConfig, val: string) =>
    setForm((f) => f ? { ...f, [key]: val } : f);

  const setStatValue = (i: number, val: string) =>
    setForm((f) => {
      if (!f) return f;
      const next = [...f.statValues] as [string, string, string];
      next[i] = val;
      return { ...f, statValues: next };
    });

  const setSocialUrl = (id: string, url: string) =>
    setSocialForm((s) => s ? s.map((l) => l.id === id ? { ...l, url } : l) : s);

  const isLoading = configLoading || socialLoading;
  const isPending = savingConfig || savingSocial;

  return (
    <div className="editor-page">
      <TopBar title="Site Config" />
      <div className="editor-content">
        <div className="editor-toolbar">
          <StatusBadge loading={isLoading} pending={isPending} success={configSaved || socialSaved} error={configError || socialError} />
          <button
            className="btn btn--primary btn--sm"
            disabled={!form || isPending}
            onClick={() => { if (form) saveConfig(form); if (socialForm) saveSocial(socialForm); }}
          >
            {isPending ? "Saving…" : "Save all"}
          </button>
        </div>

        {isLoading ? (
          <div className="skeleton-list">{[1,2,3].map((i) => <div key={i} className="skeleton-item" />)}</div>
        ) : form ? (
          <div className="config-sections">

            <div className="editor-section">
              <h3 className="editor-section__title">Identity</h3>
              <div className="field-row">
                <div className="field">
                  <label className="field__label">Email</label>
                  <input className="field__input" value={form.email} onChange={(e) => set("email", e.target.value)} />
                </div>
                <div className="field">
                  <label className="field__label">CV URL</label>
                  <input className="field__input" value={form.cvUrl} onChange={(e) => set("cvUrl", e.target.value)} placeholder="https://..." />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label className="field__label">GitHub username</label>
                  <input className="field__input" value={form.githubUsername} onChange={(e) => set("githubUsername", e.target.value)} />
                </div>
                <div className="field">
                  <label className="field__label">GitHub repo (for last-commit)</label>
                  <input className="field__input" value={form.githubRepo} onChange={(e) => set("githubRepo", e.target.value)} />
                </div>
              </div>
            </div>

            <div className="editor-section">
              <h3 className="editor-section__title">Availability</h3>
              <div className="availability-options">
                {(["available", "busy", "unavailable"] as const).map((s) => (
                  <label key={s} className={`availability-option${form.availability === s ? " availability-option--active" : ""}`}>
                    <input type="radio" name="availability" value={s} checked={form.availability === s} onChange={() => set("availability", s)} />
                    <span className={`avail-dot avail-dot--${s}`} />
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div className="editor-section">
              <h3 className="editor-section__title">About stats</h3>
              <div className="field-row">
                {form.statValues.map((val, i) => (
                  <div key={i} className="field">
                    <label className="field__label">Stat {i + 1}</label>
                    <input className="field__input" value={val} onChange={(e) => setStatValue(i, e.target.value)} placeholder="05+" />
                  </div>
                ))}
              </div>
            </div>

            <div className="editor-section">
              <h3 className="editor-section__title">Social links</h3>
              {socialForm?.map((link) => (
                <div key={link.id} className="field-row">
                  <div className="field field--label-only">
                    <label className="field__label">{link.label}</label>
                    <input className="field__input" value={link.url} onChange={(e) => setSocialUrl(link.id, e.target.value)} placeholder="https://..." />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StatusBadge({ loading, pending, success, error }: { loading: boolean; pending: boolean; success: boolean; error: boolean }) {
  if (loading || pending) return <span className="status-badge status-badge--loading">Syncing…</span>;
  if (error) return <span className="status-badge status-badge--error">Save failed</span>;
  if (success) return <span className="status-badge status-badge--ok">Saved</span>;
  return null;
}

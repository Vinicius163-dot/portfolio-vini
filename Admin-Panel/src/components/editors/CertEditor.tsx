import { useState } from "react";
import { useSection, useSaveSection } from "../../hooks/useSection";
import TopBar from "../layout/TopBar";
import type { Cert } from "../../../../shared/types/portfolio";

const BLANK_CERT: Omit<Cert, "id"> = {
  name: "", issuer: "", year: "", status: "planned", credentialUrl: "", badge: "",
};

function CertForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Omit<Cert, "id">;
  onSave: (c: Omit<Cert, "id">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const set = (key: keyof typeof form, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="editor-form">
      <div className="field-row">
        <div className="field">
          <label className="field__label">Name</label>
          <input className="field__input" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="AWS Certified..." />
        </div>
        <div className="field">
          <label className="field__label">Issuer</label>
          <input className="field__input" value={form.issuer} onChange={(e) => set("issuer", e.target.value)} placeholder="Amazon Web Services" />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label className="field__label">Year (optional)</label>
          <input className="field__input" value={form.year ?? ""} onChange={(e) => set("year", e.target.value)} placeholder="2024" />
        </div>
        <div className="field">
          <label className="field__label">Status</label>
          <select className="field__input" value={form.status} onChange={(e) => set("status", e.target.value as Cert["status"])}>
            <option value="active">Active</option>
            <option value="planned">Planned</option>
          </select>
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label className="field__label">Credential URL (optional)</label>
          <input className="field__input" value={form.credentialUrl ?? ""} onChange={(e) => set("credentialUrl", e.target.value)} placeholder="https://..." />
        </div>
        <div className="field">
          <label className="field__label">Badge key (optional)</label>
          <input className="field__input" value={form.badge ?? ""} onChange={(e) => set("badge", e.target.value)} placeholder="developer-associate" />
        </div>
      </div>
      <div className="editor-form__actions">
        <button className="btn btn--ghost" onClick={onCancel}>Cancel</button>
        <button className="btn btn--primary" onClick={() => onSave(form)} disabled={!form.name || !form.issuer}>
          Save
        </button>
      </div>
    </div>
  );
}

export default function CertEditor() {
  const { data: certs = [], isLoading } = useSection("certs");
  const { mutate: save, isPending, isSuccess, isError } = useSaveSection("certs");
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  function handleAdd(form: Omit<Cert, "id">) {
    const id = `cert-${Date.now()}`;
    save([...certs, { id, ...form }]);
    setAdding(false);
  }

  function handleUpdate(id: string, form: Omit<Cert, "id">) {
    save(certs.map((c: Cert) => (c.id === id ? { id, ...form } : c)));
    setEditing(null);
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this certification?")) return;
    save(certs.filter((c: Cert) => c.id !== id));
  }

  function moveUp(i: number) {
    if (i === 0) return;
    const next = [...certs];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    save(next);
  }

  function moveDown(i: number) {
    if (i === certs.length - 1) return;
    const next = [...certs];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    save(next);
  }

  return (
    <div className="editor-page">
      <TopBar title="Certifications" />
      <div className="editor-content">
        <div className="editor-toolbar">
          <StatusBadge loading={isLoading} pending={isPending} success={isSuccess} error={isError} />
          <button className="btn btn--primary btn--sm" onClick={() => setAdding(true)} disabled={adding}>
            + Add certification
          </button>
        </div>

        {adding && (
          <div className="editor-section">
            <h3 className="editor-section__title">New certification</h3>
            <CertForm initial={BLANK_CERT} onSave={handleAdd} onCancel={() => setAdding(false)} />
          </div>
        )}

        {isLoading ? (
          <div className="skeleton-list">
            {[1, 2, 3].map((i) => <div key={i} className="skeleton-item" />)}
          </div>
        ) : (
          <div className="item-list">
            {certs.map((cert: Cert, i: number) => (
              <div key={cert.id} className="item-card">
                {editing === cert.id ? (
                  <CertForm
                    initial={{ name: cert.name, issuer: cert.issuer, year: cert.year, status: cert.status, credentialUrl: cert.credentialUrl, badge: cert.badge }}
                    onSave={(form) => handleUpdate(cert.id, form)}
                    onCancel={() => setEditing(null)}
                  />
                ) : (
                  <div className="item-card__row">
                    <div className="item-card__info">
                      <span className={`badge badge--${cert.status}`}>{cert.status}</span>
                      <strong>{cert.name}</strong>
                      <span className="muted">{cert.issuer}{cert.year ? ` · ${cert.year}` : ""}</span>
                    </div>
                    <div className="item-card__actions">
                      <button className="icon-btn" title="Move up" onClick={() => moveUp(i)}>↑</button>
                      <button className="icon-btn" title="Move down" onClick={() => moveDown(i)}>↓</button>
                      <button className="btn btn--ghost btn--sm" onClick={() => setEditing(cert.id)}>Edit</button>
                      <button className="btn btn--danger btn--sm" onClick={() => handleDelete(cert.id)}>Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
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

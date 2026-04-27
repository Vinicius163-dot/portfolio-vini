import { useState } from "react";
import { useSection, useSaveSection } from "../../hooks/useSection";
import TopBar from "../layout/TopBar";
import type { WorkItem } from "../../../../shared/types/portfolio";

const BLANK: Omit<WorkItem, "id" | "order"> = { company: "", periodMain: "", stack: "" };

function WorkForm({ initial, onSave, onCancel }: { initial: Omit<WorkItem, "id" | "order">; onSave: (v: Omit<WorkItem, "id" | "order">) => void; onCancel: () => void }) {
  const [form, setForm] = useState(initial);
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="editor-form">
      <div className="field-row">
        <div className="field">
          <label className="field__label">Company</label>
          <input className="field__input" value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Alest" />
        </div>
        <div className="field">
          <label className="field__label">Period</label>
          <input className="field__input" value={form.periodMain} onChange={(e) => set("periodMain", e.target.value)} placeholder="2023 — atual" />
        </div>
      </div>
      <div className="field">
        <label className="field__label">Stack</label>
        <input className="field__input" value={form.stack} onChange={(e) => set("stack", e.target.value)} placeholder="AWS · Java · React" />
      </div>
      <div className="editor-form__actions">
        <button className="btn btn--ghost" onClick={onCancel}>Cancel</button>
        <button className="btn btn--primary" onClick={() => onSave(form)} disabled={!form.company || !form.periodMain}>Save</button>
      </div>
    </div>
  );
}

export default function WorkEditor() {
  const { data: items = [], isLoading } = useSection("work");
  const { mutate: save, isPending, isSuccess, isError } = useSaveSection("work");
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const sorted = [...items].sort((a, b) => a.order - b.order);

  function handleAdd(form: Omit<WorkItem, "id" | "order">) {
    const id = `work-${Date.now()}`;
    save([...items, { id, order: items.length, ...form }]);
    setAdding(false);
  }

  function handleUpdate(id: string, form: Omit<WorkItem, "id" | "order">) {
    save(items.map((w: WorkItem) => (w.id === id ? { ...w, ...form } : w)));
    setEditing(null);
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this work entry?")) return;
    save(items.filter((w: WorkItem) => w.id !== id).map((w: WorkItem, i: number) => ({ ...w, order: i })));
  }

  function move(id: string, dir: -1 | 1) {
    const next = [...sorted];
    const idx = next.findIndex((w) => w.id === id);
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    save(next.map((w, i) => ({ ...w, order: i })));
  }

  return (
    <div className="editor-page">
      <TopBar title="Work Experience" />
      <div className="editor-content">
        <div className="editor-toolbar">
          <StatusBadge loading={isLoading} pending={isPending} success={isSuccess} error={isError} />
          <button className="btn btn--primary btn--sm" onClick={() => setAdding(true)} disabled={adding}>+ Add position</button>
        </div>

        {adding && (
          <div className="editor-section">
            <h3 className="editor-section__title">New position</h3>
            <WorkForm initial={BLANK} onSave={handleAdd} onCancel={() => setAdding(false)} />
          </div>
        )}

        {isLoading ? (
          <div className="skeleton-list">{[1,2,3,4].map((i) => <div key={i} className="skeleton-item" />)}</div>
        ) : (
          <div className="item-list">
            {sorted.map((item, i) => (
              <div key={item.id} className="item-card">
                {editing === item.id ? (
                  <WorkForm initial={{ company: item.company, periodMain: item.periodMain, stack: item.stack }} onSave={(f) => handleUpdate(item.id, f)} onCancel={() => setEditing(null)} />
                ) : (
                  <div className="item-card__row">
                    <div className="item-card__info">
                      <strong>{item.company}</strong>
                      <span className="muted">{item.periodMain}</span>
                      <span className="chip">{item.stack}</span>
                    </div>
                    <div className="item-card__actions">
                      <button className="icon-btn" onClick={() => move(item.id, -1)} disabled={i === 0}>↑</button>
                      <button className="icon-btn" onClick={() => move(item.id, 1)} disabled={i === sorted.length - 1}>↓</button>
                      <button className="btn btn--ghost btn--sm" onClick={() => setEditing(item.id)}>Edit</button>
                      <button className="btn btn--danger btn--sm" onClick={() => handleDelete(item.id)}>Delete</button>
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

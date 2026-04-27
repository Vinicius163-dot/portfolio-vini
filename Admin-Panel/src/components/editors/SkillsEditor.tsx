import { useState } from "react";
import { useSection, useSaveSection } from "../../hooks/useSection";
import TopBar from "../layout/TopBar";
import type { SkillGroup } from "../../../../shared/types/portfolio";

function TagList({ items, onChange }: { items: string[]; onChange: (next: string[]) => void }) {
  const [draft, setDraft] = useState("");

  function add() {
    const val = draft.trim();
    if (!val || items.includes(val)) return;
    onChange([...items, val]);
    setDraft("");
  }

  function remove(item: string) {
    onChange(items.filter((i) => i !== item));
  }

  return (
    <div className="tag-list">
      <div className="tag-list__tags">
        {items.map((item) => (
          <span key={item} className="tag">
            {item}
            <button className="tag__remove" onClick={() => remove(item)} aria-label={`Remove ${item}`}>×</button>
          </span>
        ))}
      </div>
      <div className="tag-list__input-row">
        <input
          className="field__input field__input--sm"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="Add skill…"
        />
        <button className="btn btn--ghost btn--sm" onClick={add} disabled={!draft.trim()}>Add</button>
      </div>
    </div>
  );
}

export default function SkillsEditor() {
  const { data: groups = [], isLoading } = useSection("skills");
  const { mutate: save, isPending, isSuccess, isError } = useSaveSection("skills");
  const [localGroups, setLocalGroups] = useState<SkillGroup[] | null>(null);

  const active = localGroups ?? groups;

  function updateGroup(i: number, patch: Partial<SkillGroup>) {
    const next = active.map((g: SkillGroup, idx: number) => (idx === i ? { ...g, ...patch } : g));
    setLocalGroups(next);
  }

  function handleSave() {
    save(active, { onSuccess: () => setLocalGroups(null) });
  }

  const isDirty = localGroups !== null;

  return (
    <div className="editor-page">
      <TopBar title="Skills" />
      <div className="editor-content">
        <div className="editor-toolbar">
          <StatusBadge loading={isLoading} pending={isPending} success={isSuccess} error={isError} />
          <button className="btn btn--primary btn--sm" onClick={handleSave} disabled={!isDirty || isPending}>
            {isPending ? "Saving…" : "Save changes"}
          </button>
        </div>

        {isLoading ? (
          <div className="skeleton-list">{[1,2,3,4].map((i) => <div key={i} className="skeleton-item skeleton-item--tall" />)}</div>
        ) : (
          <div className="skills-grid">
            {active.map((group: SkillGroup, i: number) => (
              <div key={i} className="editor-section">
                <div className="editor-section__header">
                  <input
                    className="field__input field__input--title"
                    value={group.title}
                    onChange={(e) => updateGroup(i, { title: e.target.value })}
                  />
                  <span className="muted">{group.items.length} items</span>
                </div>
                <TagList
                  items={group.items}
                  onChange={(items) => updateGroup(i, { items })}
                />
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

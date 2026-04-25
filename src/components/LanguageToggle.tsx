import { useEffect, useRef, useState } from "react";
import { LANGUAGES } from "../i18n/translations";
import { useI18n } from "../i18n/I18nContext";

export default function LanguageToggle() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div className="lang-toggle" ref={wrapRef}>
      <button
        type="button"
        className="lang-toggle__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.header.langAria}
        onClick={() => setOpen((p) => !p)}
      >
        <span>{current.label}</span>
        <svg viewBox="0 0 12 8" width="9" height="6" fill="none" stroke="currentColor" strokeWidth="1.6">
          <polyline points="1 1 6 6 11 1" />
        </svg>
      </button>
      {open && (
        <ul className="lang-toggle__menu" role="listbox">
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                className={`lang-toggle__option ${l.code === lang ? "is-active" : ""}`}
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

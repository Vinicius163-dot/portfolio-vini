import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { siteData } from "../data/siteData";
import { useI18n } from "../i18n/I18nContext";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandMenu({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");
  const { t } = useI18n();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const go = (href: string) => {
    onOpenChange(false);
    if (href.startsWith("http") || href.startsWith("mailto:")) {
      window.open(href, href.startsWith("mailto:") ? "_self" : "_blank");
    } else {
      window.location.hash = href;
    }
  };

  if (!open) return null;

  return (
    <div className="cmdk-overlay" onClick={() => onOpenChange(false)}>
      <div className="cmdk-wrapper" onClick={(e) => e.stopPropagation()}>
        <Command label="Command menu" className="cmdk-root">
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder={t.cmdk.placeholder}
            className="cmdk-input"
            autoFocus
          />
          <Command.List className="cmdk-list">
            <Command.Empty className="cmdk-empty">
              {t.cmdk.empty}
            </Command.Empty>

            <Command.Group heading={t.cmdk.navigate} className="cmdk-group">
              {siteData.nav.map((n) => (
                <Command.Item
                  key={n.href}
                  className="cmdk-item"
                  onSelect={() => go(n.href)}
                >
                  <span className="cmdk-item__icon">→</span>
                  {t.nav[n.key]}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading={t.cmdk.actions} className="cmdk-group">
              <Command.Item
                className="cmdk-item"
                onSelect={() => go(`mailto:${siteData.email}`)}
              >
                <span className="cmdk-item__icon">✉</span>
                {t.cmdk.sendEmail}
              </Command.Item>
              <Command.Item
                className="cmdk-item"
                onSelect={() => go(siteData.cvUrl)}
              >
                <span className="cmdk-item__icon">↓</span>
                {t.cmdk.downloadCv}
              </Command.Item>
              <Command.Item
                className="cmdk-item"
                onSelect={() =>
                  navigator.clipboard?.writeText(siteData.email).then(() => {
                    onOpenChange(false);
                  })
                }
              >
                <span className="cmdk-item__icon">⎘</span>
                {t.cmdk.copyEmail}
              </Command.Item>
            </Command.Group>

            <Command.Group heading={t.cmdk.links} className="cmdk-group">
              {siteData.social.map((s) => (
                <Command.Item
                  key={s.url}
                  className="cmdk-item"
                  onSelect={() => go(s.url)}
                >
                  <span className="cmdk-item__icon">↗</span>
                  {s.label}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
          <footer className="cmdk-footer">
            <span>{t.cmdk.navHelp}</span>
            <span>{t.cmdk.selectHelp}</span>
            <span>{t.cmdk.closeHelp}</span>
          </footer>
        </Command>
      </div>
    </div>
  );
}

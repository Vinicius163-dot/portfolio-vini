import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { translations, DEFAULT_LANG, type Lang } from "./translations";

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof translations)[Lang];
};

const Ctx = createContext<I18nCtx | null>(null);
const STORAGE_KEY = "portfolio.lang";

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored && stored in translations) return stored;
  const browser = navigator.language.slice(0, 2).toLowerCase();
  if (browser in translations) return browser as Lang;
  return DEFAULT_LANG;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  return (
    <Ctx.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </Ctx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

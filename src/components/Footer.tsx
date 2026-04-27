import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "../i18n/I18nContext";
import { siteData } from "../data/siteData";

function useLastCommit() {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    const url = import.meta.env.DEV
      ? `https://api.github.com/repos/${siteData.github.username}/${siteData.github.repo}/commits?per_page=1`
      : `/api/last-commit?username=${siteData.github.username}&repo=${siteData.github.repo}`;

    fetch(url, import.meta.env.DEV ? { headers: { Accept: "application/vnd.github+json" } } : {})
      .then((r) => r.json())
      .then((data) => {
        const raw = import.meta.env.DEV ? data[0]?.commit?.committer?.date : data?.date;
        if (raw) setDate(raw);
      })
      .catch(() => {});
  }, []);

  return date;
}

export default function Footer() {
  const { t, lang } = useI18n();
  const lastCommit = useLastCommit();

  const formattedDate = lastCommit
    ? new Date(lastCommit).toLocaleDateString(
        lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : lang === "fr" ? "fr-FR" : lang === "it" ? "it-IT" : "en-US",
        { month: "short", year: "numeric" }
      )
    : null;

  return (
    <motion.footer
      className="site-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p>{t.footer.copyright}</p>
      <div className="footer__right">
        {formattedDate && (
          <span className="footer__last-updated">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {formattedDate}
          </span>
        )}
        <a className="text-link" href="#home">
          {t.footer.backToTop}
        </a>
      </div>
    </motion.footer>
  );
}

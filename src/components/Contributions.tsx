import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { siteData } from "../data/siteData";
import { useI18n } from "../i18n/I18nContext";

type Contribution = {
  id: number;
  title: string;
  url: string;
  repo: string;
  repoUrl: string;
  created_at: string;
};

const rowVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
  }),
};

export default function Contributions() {
  const { ref, isInView } = useScrollReveal(0.1);
  const { t } = useI18n();
  const [items, setItems] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = import.meta.env.DEV
      ? `https://api.github.com/search/issues?q=author:${siteData.github.username}+type:pr+is:merged+-user:${siteData.github.username}&sort=updated&order=desc&per_page=6`
      : `/api/github-contributions?username=${siteData.github.username}`;

    fetch(endpoint, import.meta.env.DEV ? {
      headers: { Accept: "application/vnd.github+json" }
    } : {})
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.items ?? []);
        setItems(list.map((item: Record<string, unknown>) => ({
          id: item.id as number,
          title: item.title as string,
          url: item.html_url as string,
          repo: (item.repository_url as string)?.replace("https://api.github.com/repos/", "") ?? (item.repo as string) ?? "",
          repoUrl: (item.html_url as string)?.split("/pull/")[0] ?? (item.repoUrl as string) ?? "",
          created_at: item.created_at as string,
        })));
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="contributions" id="contributions" ref={ref}>
      <motion.header
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        <span className="section-header__annotation">{t.contributions.annotation}</span>
        <div className="section-header__text">
          <h2>{t.contributions.title}</h2>
        </div>
      </motion.header>

      {loading && (
        <div className="contributions__list">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="contrib-row contrib-row--skeleton" />
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <p className="contributions__empty">{t.contributions.empty}</p>
      )}

      {!loading && items.length > 0 && (
        <div className="contributions__list">
          {items.map((item, i) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="contrib-row"
              variants={rowVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={i}
            >
              <span className="contrib-row__badge">{t.contributions.mergedPr}</span>
              <span className="contrib-row__title">{item.title}</span>
              <a
                href={item.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="contrib-row__repo"
                onClick={(e) => e.stopPropagation()}
              >
                {item.repo}
              </a>
              <span className="contrib-row__date">
                {new Date(item.created_at).toLocaleDateString("pt-BR", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}

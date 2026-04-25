import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  useGithubRepos,
  LANGUAGE_COLORS,
  languageIconUrl,
  type GithubRepo,
} from "../hooks/useGithubRepos";
import { siteData } from "../data/siteData";
import { useI18n } from "../i18n/I18nContext";
import type { Lang } from "../i18n/translations";
import ReposGraph from "./ReposGraph";

const cardPop = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: "easeOut" },
  }),
};

const DATE_LOCALES: Record<Lang, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  it: "it-IT",
};

function formatDate(iso: string, lang: Lang) {
  const date = new Date(iso);
  return date.toLocaleDateString(DATE_LOCALES[lang], {
    month: "short",
    year: "numeric",
  });
}

export default function Projects() {
  const { ref, isInView } = useScrollReveal(0.1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { t, lang } = useI18n();
  const { repos, loading, error } = useGithubRepos({
    username: siteData.github.username,
    featured: siteData.github.featured,
    max: siteData.github.maxRepos,
  });

  return (
    <section className="projects" id="projects" ref={ref}>
      <motion.header
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        <span className="section-header__annotation">
          {t.projects.annotation}
        </span>
        <div className="section-header__text">
          <h2>{t.projects.title}</h2>
          <p>
            {t.projects.syncedWith}{" "}
            <a
              href={`https://github.com/${siteData.github.username}`}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              @{siteData.github.username}
            </a>
          </p>
        </div>
      </motion.header>

      {loading && (
        <div className="projects__layout">
          <div className="projects__cards">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="project-card project-card--skeleton" />
            ))}
          </div>
          <aside className="projects__graph-wrap">
            <div className="project-card project-card--skeleton projects__graph-skeleton" />
          </aside>
        </div>
      )}

      {!loading && error && (
        <div className="projects__state">
          <p>
            {t.projects.errorPrefix}
            {error}
            {t.projects.errorSuffix}
          </p>
        </div>
      )}

      {!loading && !error && repos.length === 0 && (
        <div className="projects__state">
          <p>{t.projects.empty}</p>
        </div>
      )}

      {!loading && !error && repos.length > 0 && (
        <div className="projects__layout">
          <div className="projects__cards">
            {repos.map((repo, i) => (
              <RepoCard
                key={repo.id}
                repo={repo}
                index={i}
                inView={isInView}
                isHovered={hoveredId === repo.id}
                isDim={hoveredId !== null && hoveredId !== repo.id}
                onHover={setHoveredId}
                lang={lang}
                strings={{
                  noDescription: t.projects.noDescription,
                  updatedPrefix: t.projects.updatedPrefix,
                  starsTitle: t.projects.starsTitle,
                  forksTitle: t.projects.forksTitle,
                }}
              />
            ))}
          </div>
          <aside className="projects__graph-wrap">
            <ReposGraph
              repos={repos}
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          </aside>
        </div>
      )}
    </section>
  );
}

interface CardProps {
  repo: GithubRepo;
  index: number;
  inView: boolean;
  isHovered: boolean;
  isDim: boolean;
  onHover: (id: number | null) => void;
  lang: Lang;
  strings: {
    noDescription: string;
    updatedPrefix: string;
    starsTitle: string;
    forksTitle: string;
  };
}

function RepoCard({
  repo,
  index,
  inView,
  isHovered,
  isDim,
  onHover,
  lang,
  strings,
}: CardProps) {
  const color = repo.language ? LANGUAGE_COLORS[repo.language] : undefined;
  const iconUrl = languageIconUrl(repo.language);

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className={`project-card project-card--repo ${
        isHovered ? "project-card--active" : ""
      } ${isDim ? "project-card--dim" : ""}`}
      variants={cardPop}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index}
      onMouseEnter={() => onHover(repo.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className="project-card__accent"
        style={{ background: color ?? "#555" }}
      />
      <div className="project-card__meta">
        <img
          className="project-card__lang-icon"
          src={iconUrl}
          alt={repo.language ?? "Repository"}
          title={repo.language ?? "Repository"}
          loading="lazy"
          width={28}
          height={28}
        />
        <h3>{repo.name}</h3>
        <p>{repo.description ?? strings.noDescription}</p>
      </div>

      {repo.topics && repo.topics.length > 0 && (
        <ul className="chip-list">
          {repo.topics.slice(0, 4).map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      )}

      <footer className="project-card__footer">
        <span title={strings.starsTitle}>★ {repo.stargazers_count}</span>
        <span title={strings.forksTitle}>⑂ {repo.forks_count}</span>
        <span>
          {strings.updatedPrefix} {formatDate(repo.updated_at, lang)}
        </span>
      </footer>
    </motion.a>
  );
}

import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { siteData } from "../data/siteData";
import { useI18n } from "../i18n/I18nContext";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" },
  }),
};

export default function Articles() {
  const { ref, isInView } = useScrollReveal(0.1);
  const { t } = useI18n();
  const { articles } = siteData;

  if (articles.length === 0) return null;

  return (
    <section className="articles" id="articles" ref={ref}>
      <motion.header
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        <span className="section-header__annotation">{t.articles.annotation}</span>
        <div className="section-header__text">
          <h2>{t.articles.title}</h2>
        </div>
      </motion.header>

      <div className="articles__grid">
        {articles.map((article, i) => (
          <motion.a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="article-card"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={i}
          >
            <div className="article-card__meta">
              <span className="article-card__source">{article.source}</span>
              <span className="article-card__date">
                {new Date(article.date).toLocaleDateString("pt-BR", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <h3 className="article-card__title">{article.title}</h3>
            {article.description && (
              <p className="article-card__desc">{article.description}</p>
            )}
            <span className="article-card__read">{t.articles.readMore}</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

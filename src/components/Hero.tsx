import { motion } from "framer-motion";
import { siteData } from "../data/siteData";
import { useI18n } from "../i18n/I18nContext";
import heroBanner from "../assets/banner_portfolio.gif";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Hero() {
  const { social } = siteData;
  const { t } = useI18n();

  return (
    <section className="hero" id="home">
      <motion.div
        className="hero__banner"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img src={heroBanner} alt="" aria-hidden="true" />
      </motion.div>

      <motion.h1
        className="hero__title"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        {t.hero.titleLines.map((line, i) => (
          <span key={i} className="hero__title-line">
            {line}
          </span>
        ))}
      </motion.h1>

      <div className="hero__grid">
        <motion.div
          className="hero__left"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <p
            className="hero__desc"
            dangerouslySetInnerHTML={{ __html: t.hero.eyebrow }}
          />
        </motion.div>

        <motion.div
          className="hero__right"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <a className="pill-btn" href="#projects">
            {t.hero.projectsBtn}
          </a>
          <a
            className="pill-icon"
            href="#projects"
            aria-label={t.hero.projectsAria}
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero__socials"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        {social.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="hero__social-pill"
          >
            {s.icon === "linkedin" ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.67H9.32V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.38-1.86 3.61 0 4.28 2.38 4.28 5.47v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.54-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.39 1.24-3.23-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.62-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.28 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
              </svg>
            )}
            {s.label}
          </a>
        ))}
        <a
          href={`mailto:${siteData.email}`}
          className="hero__social-pill"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect x="2.5" y="5" width="19" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          Email
        </a>
        <a className="hero__social-pill" href={siteData.cvUrl}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 3v13" />
            <polyline points="7 11 12 16 17 11" />
            <path d="M4 20h16" />
          </svg>
          CV
        </a>
      </motion.div>
    </section>
  );
}

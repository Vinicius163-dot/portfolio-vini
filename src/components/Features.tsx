import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n/I18nContext";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const SERVICE_ICONS = [
  // Backend Engineering
  <svg key="backend" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2" y="3" width="20" height="5" rx="1.5" />
    <rect x="2" y="10" width="20" height="5" rx="1.5" />
    <rect x="2" y="17" width="20" height="5" rx="1.5" />
    <circle cx="6" cy="5.5" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="6" cy="12.5" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="6" cy="19.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>,
  // Frontend Development
  <svg key="frontend" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2" y="3" width="20" height="15" rx="2" />
    <path d="M8 21h8M12 18v3" />
    <polyline points="8 11 11 14 16 9" />
  </svg>,
  // Performance & Scale
  <svg key="perf" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>,
  // Cloud & DevOps
  <svg key="cloud" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M18 10a6 6 0 0 0-11.56-2A4 4 0 1 0 6 16h12a4 4 0 0 0 0-8z" />
  </svg>,
];

export default function Features() {
  const { ref, isInView } = useScrollReveal(0.12);
  const { t } = useI18n();
  const services = t.services;

  return (
    <section className="services" id="services" ref={ref}>
      <motion.header
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        <span className="section-header__annotation">
          {services.annotation}
        </span>
        <div className="section-header__text">
          <h2>{services.subtitle}</h2>
        </div>
      </motion.header>

      <div className="services__grid">
        {services.items.map((item, i) => (
          <motion.article
            key={item.title}
            className="service-card"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={i}
          >
            <div className="service-card__icon">{SERVICE_ICONS[i]}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="chip-list-inline">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

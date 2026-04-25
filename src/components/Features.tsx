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

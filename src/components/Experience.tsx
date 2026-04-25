import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { siteData } from "../data/siteData";
import { useI18n } from "../i18n/I18nContext";

export default function Experience() {
  const { ref, isInView } = useScrollReveal(0.1);
  const { hero, about } = siteData;
  const { t } = useI18n();

  return (
    <section className="about" id="about" ref={ref}>
      <motion.header
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        <span className="section-header__annotation">{t.about.annotation}</span>
        <div className="section-header__text">
          <h2 dangerouslySetInnerHTML={{ __html: t.about.title }} />
        </div>
      </motion.header>

      <div className="about__grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="about__intro">{t.about.description}</p>
        </motion.div>

        <motion.div
          className="about__photo"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="media-frame">
            <img src={hero.photo} alt={siteData.name} />
          </div>
        </motion.div>
      </div>

      <div className="about__stats">
        {about.statValues.map((value, i) => (
          <motion.div
            key={t.about.statLabels[i]}
            className="about-stat"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
          >
            <span className="about-stat__value">{value}</span>
            <span className="about-stat__label">{t.about.statLabels[i]}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

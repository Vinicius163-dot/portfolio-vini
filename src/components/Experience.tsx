import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { siteData } from "../data/siteData";

export default function Experience() {
  const { ref, isInView } = useScrollReveal(0.1);
  const { about, hero } = siteData;

  return (
    <section className="about" id="about" ref={ref}>
      <motion.header
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        <span className="section-header__annotation">{about.annotation}</span>
        <div className="section-header__text">
          <h2 dangerouslySetInnerHTML={{ __html: about.title }} />
        </div>
      </motion.header>

      <div className="about__grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="about__intro">{about.description}</p>
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
        {about.stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="about-stat"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
          >
            <span className="about-stat__value">{s.value}</span>
            <span className="about-stat__label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { siteData } from "../data/siteData";
import { useI18n } from "../i18n/I18nContext";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: "easeOut" },
  }),
};

export default function Stack() {
  const { ref, isInView } = useScrollReveal(0.12);
  const { t } = useI18n();
  const { skills } = siteData;
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  const visibleGroups = activeGroup === null
    ? skills.groups.map((items, i) => ({ items, i }))
    : [{ items: skills.groups[activeGroup], i: activeGroup }];

  return (
    <section className="skills" id="skills" ref={ref}>
      <motion.header
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        <span className="section-header__annotation">{t.skills.annotation}</span>
        <div className="section-header__text">
          <h2>{t.skills.title}</h2>
        </div>
      </motion.header>

      <div className="skills__filter">
        <button
          className={`skills__filter-btn${activeGroup === null ? " skills__filter-btn--active" : ""}`}
          onClick={() => setActiveGroup(null)}
        >
          All
        </button>
        {t.skills.groupTitles.map((title, i) => (
          <button
            key={title}
            className={`skills__filter-btn${activeGroup === i ? " skills__filter-btn--active" : ""}`}
            onClick={() => setActiveGroup(activeGroup === i ? null : i)}
          >
            {title}
          </button>
        ))}
      </div>

      <div className="about__grid">
        <div>
          {visibleGroups.map(({ items, i }) => (
            <motion.article
              key={t.skills.groupTitles[i]}
              className="skill-card"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={i}
            >
              <h3>{t.skills.groupTitles[i]}</h3>
              <div className="chip-list-inline">
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          className="skill-card__tail"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          dangerouslySetInnerHTML={{ __html: t.skills.tail }}
        />
      </div>
    </section>
  );
}

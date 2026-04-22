import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { siteData } from "../data/siteData";

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
  const { skills } = siteData;

  return (
    <section className="skills" id="skills" ref={ref}>
      <motion.header
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        <span className="section-header__annotation">{skills.annotation}</span>
        <div className="section-header__text">
          <h2>{skills.title}</h2>
        </div>
      </motion.header>

      <div className="about__grid">
        <div>
          {skills.groups.map((group, i) => (
            <motion.article
              key={group.title}
              className="skill-card"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={i}
            >
              <h3>{group.title}</h3>
              <div className="chip-list-inline">
                {group.items.map((item) => (
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
          dangerouslySetInnerHTML={{ __html: skills.tail }}
        />
      </div>
    </section>
  );
}

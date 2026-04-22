import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { siteData } from "../data/siteData";

const rowVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: "easeOut" },
  }),
};

export default function Work() {
  const { ref, isInView } = useScrollReveal(0.1);
  const { work } = siteData;

  return (
    <section className="work" id="work" ref={ref}>
      <motion.header
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        <span className="section-header__annotation">{work.annotation}</span>
        <div className="work__head">
          <h2 className="work__title">{work.title}</h2>
        </div>
      </motion.header>

      <div className="work__table">
        {work.items.map((item, i) => (
          <motion.div
            key={`${item.company}-${item.periodMain}`}
            className="work__row"
            variants={rowVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={i}
          >
            <div className="work__period">
              <span className="work__period-main">{item.periodMain}</span>
              <span className="work__period-sub">{item.periodSub}</span>
            </div>
            <div className="work__company">{item.company}</div>
            <div className="work__role">{item.role}</div>
            <div className="work__stack">{item.stack}</div>
          </motion.div>
        ))}

        <motion.div
          className="work__summary"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span>Total</span>
          <span className="work__summary-value">{work.total}</span>
        </motion.div>
      </div>
    </section>
  );
}

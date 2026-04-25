import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { siteData } from "../data/siteData";
import { useI18n } from "../i18n/I18nContext";

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
  const { t } = useI18n();

  return (
    <section className="work" id="work" ref={ref}>
      <motion.header
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        <span className="section-header__annotation">{t.work.annotation}</span>
        <div className="work__head">
          <h2 className="work__title">{t.work.title}</h2>
        </div>
      </motion.header>

      <div className="work__table">
        {work.items.map((item, i) => {
          const extra = t.work.itemsExtras[i];
          return (
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
                <span className="work__period-sub">{extra?.periodSub}</span>
              </div>
              <div className="work__company">{item.company}</div>
              <div className="work__role">{extra?.role}</div>
              <div className="work__stack">{item.stack}</div>
            </motion.div>
          );
        })}

        <motion.div
          className="work__summary"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span>{t.work.totalLabel}</span>
          <span className="work__summary-value">{t.work.totalValue}</span>
        </motion.div>
      </div>
    </section>
  );
}

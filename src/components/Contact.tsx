import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { siteData } from "../data/siteData";

export default function Contact() {
  const { ref, isInView } = useScrollReveal(0.15);

  return (
    <section className="cta" id="contact" ref={ref}>
      <motion.header
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        <span className="section-header__annotation">
          {siteData.contact.annotation}
        </span>
        <div className="section-header__text">
          <h2>
            Let's <em>build something</em> together.
          </h2>
          <p>
            Open to full-time roles and strategic consulting. Drop a line and
            let's map the next product.
          </p>
        </div>
      </motion.header>

      <motion.div
        className="cta__actions"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a className="pill-btn" href={`mailto:${siteData.email}`}>
          {siteData.email}
        </a>
      </motion.div>
    </section>
  );
}

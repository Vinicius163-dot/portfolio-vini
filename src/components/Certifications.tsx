import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { siteData } from "../data/siteData";
import { useI18n } from "../i18n/I18nContext";
import developerAssociateBadge from "../assets/logos/developer-associate.webp";
import devopsProfessionalBadge from "../assets/logos/certified-devops-engineer-professional-logo-w160-e09dc28b.webp";
import mlSpecialtyBadge from "../assets/logos/machine-learning.png";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const BADGES: Record<string, string> = {
  "developer-associate": developerAssociateBadge,
  "devops-professional": devopsProfessionalBadge,
  "ml-specialty": mlSpecialtyBadge,
};

export default function Certifications() {
  const { ref, isInView } = useScrollReveal(0.12);
  const { t } = useI18n();
  const { certifications } = siteData;

  return (
    <section className="certs" id="certifications" ref={ref}>
      <motion.header
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        <span className="section-header__annotation">{t.certs.annotation}</span>
        <div className="section-header__text">
          <h2>{t.certs.title}</h2>
        </div>
      </motion.header>

      <div className="certs__grid">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.id}
            className={`cert-card cert-card--${cert.status}`}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={i}
          >
            <div className="cert-card__header">
              <span className="cert-card__issuer">{cert.issuer}</span>
              <span className={`cert-card__badge cert-card__badge--${cert.status}`}>
                {t.certs.statuses[cert.status]}
              </span>
            </div>
            {cert.badge && BADGES[cert.badge] && (
              <img
                src={BADGES[cert.badge]}
                alt={cert.name}
                className="cert-card__img"
                width={72}
                height={72}
              />
            )}
            <p className="cert-card__name">{cert.name}</p>
            {cert.year && (
              <p className="cert-card__year">{cert.year}</p>
            )}
            {cert.status === "active" && cert.credentialUrl && cert.credentialUrl !== "#" && (
              <a
                className="cert-card__link"
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
              >
                Ver credencial ↗
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

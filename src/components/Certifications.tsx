import { useState } from "react";
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

type Cert = (typeof siteData.certifications)[number];

function ActiveCard({ cert, index, isInView }: { cert: Cert; index: number; isInView: boolean }) {
  const { t } = useI18n();
  const [flipped, setFlipped] = useState(false);
  const badgeSrc = cert.badge ? BADGES[cert.badge] : null;

  return (
    <motion.div
      className="cert-card cert-card--active cert-card--flippable"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className={`cert-card__inner ${flipped ? "is-flipped" : ""}`}>
        <div className="cert-card__face cert-card__front">
          <div className="cert-card__header">
            <span className="cert-card__issuer">{cert.issuer}</span>
            <span className="cert-card__badge cert-card__badge--active">
              {t.certs.statuses.active}
            </span>
          </div>
          {badgeSrc && (
            <img src={badgeSrc} alt={cert.name} className="cert-card__img" width={72} height={72} />
          )}
          <p className="cert-card__name">{cert.name}</p>
          {cert.year && <p className="cert-card__year">{cert.year}</p>}
        </div>

        <div className="cert-card__face cert-card__back">
          <div className="cert-card__back-content">
            {badgeSrc && (
              <img src={badgeSrc} alt={cert.name} className="cert-card__img cert-card__img--sm" width={52} height={52} />
            )}
            <p className="cert-card__back-name">{cert.name}</p>
            {cert.year && (
              <p className="cert-card__back-year">{cert.issuer} · {cert.year}</p>
            )}
            {cert.credentialUrl && cert.credentialUrl !== "#" ? (
              <a
                className="pill-btn cert-card__back-link"
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {t.certs.viewCredential}
              </a>
            ) : (
              <span className="cert-card__back-verified">
                <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="#22c55e" strokeWidth="2.2">
                  <polyline points="4 10 8 14 16 6" />
                </svg>
                {t.certs.statuses.active}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PlannedCard({
  cert,
  index,
  isInView,
  plannedIndex,
}: {
  cert: Cert;
  index: number;
  isInView: boolean;
  plannedIndex: number;
}) {
  const { t } = useI18n();
  const [tooltip, setTooltip] = useState(false);
  const badgeSrc = cert.badge ? BADGES[cert.badge] : null;
  const orderLabel = t.certs.plannedOrder.replace("{n}", String(plannedIndex));

  return (
    <motion.div
      className="cert-card cert-card--planned"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
      <div className="cert-card__header">
        <span className="cert-card__issuer">{cert.issuer}</span>
        <span className="cert-card__badge cert-card__badge--planned">
          {t.certs.statuses.planned}
        </span>
      </div>
      {badgeSrc && (
        <img src={badgeSrc} alt={cert.name} className="cert-card__img" width={72} height={72} />
      )}
      <p className="cert-card__name">{cert.name}</p>

      {tooltip && (
        <div className="cert-tooltip">
          <span className="cert-tooltip__dot" />
          {orderLabel}
        </div>
      )}
    </motion.div>
  );
}

export default function Certifications() {
  const { ref, isInView } = useScrollReveal(0.12);
  const { t } = useI18n();
  const { certifications } = siteData;
  let plannedIdx = 0;

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
        {certifications.map((cert, i) => {
          if (cert.status === "active") {
            return <ActiveCard key={cert.id} cert={cert} index={i} isInView={isInView} />;
          }
          plannedIdx += 1;
          return (
            <PlannedCard
              key={cert.id}
              cert={cert}
              index={i}
              isInView={isInView}
              plannedIndex={plannedIdx}
            />
          );
        })}
      </div>
    </section>
  );
}

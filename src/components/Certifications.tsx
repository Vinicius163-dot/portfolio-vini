import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { siteData } from "../data/siteData";
import { useI18n } from "../i18n/I18nContext";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

function AWSIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.064.056.128.056.184 0 .08-.048.16-.152.24l-.504.336a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.232-.112a2.39 2.39 0 0 1-.28-.368 6.059 6.059 0 0 1-.24-.496c-.608.712-1.368 1.068-2.28 1.068-.648 0-1.168-.184-1.544-.552-.376-.368-.568-.864-.568-1.48 0-.656.232-1.184.704-1.576.472-.392 1.1-.588 1.9-.588.264 0 .536.024.824.064.288.04.584.104.896.176v-.568c0-.592-.124-1.004-.368-1.244-.248-.24-.672-.356-1.276-.356-.272 0-.552.032-.84.104a6.2 6.2 0 0 0-.84.272 2.24 2.24 0 0 1-.272.104.48.48 0 0 1-.128.024c-.112 0-.168-.08-.168-.248v-.392c0-.128.016-.224.056-.28a.6.6 0 0 1 .224-.168 5.4 5.4 0 0 1 .944-.344 4.53 4.53 0 0 1 1.168-.144c.888 0 1.536.2 1.952.6.408.4.616.992.616 1.784v2.352zm-3.144 1.18c.256 0 .52-.048.8-.144.28-.096.528-.272.736-.512.12-.144.208-.304.256-.488.048-.184.08-.408.08-.672v-.32a6.573 6.573 0 0 0-.712-.128 5.75 5.75 0 0 0-.728-.048c-.52 0-.896.1-1.152.308-.256.2-.38.488-.38.864 0 .352.088.616.272.8.176.176.432.34.828.34zm6.248.872c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.312L8.2 7.076a1.39 1.39 0 0 1-.072-.32c0-.128.064-.2.192-.2h.784c.152 0 .256.024.312.08.064.048.112.16.16.312l1.568 6.176 1.456-6.176c.04-.16.088-.264.152-.312.064-.048.176-.08.32-.08h.64c.152 0 .256.024.32.08.064.048.12.16.152.312l1.472 6.248 1.616-6.248c.048-.16.104-.264.16-.312.064-.048.16-.08.304-.08h.744c.128 0 .2.064.2.2 0 .04-.008.08-.016.128a1.125 1.125 0 0 1-.056.2l-2.264 5.62c-.048.16-.104.264-.168.312-.064.048-.168.08-.304.08h-.688c-.152 0-.256-.024-.32-.08-.064-.056-.12-.16-.152-.32L13.4 8.044l-1.448 5.664c-.04.16-.088.264-.152.32-.064.056-.176.08-.32.08h-.616zm12.048.248a5.93 5.93 0 0 1-1.384-.16 4.07 4.07 0 0 1-1.032-.392.632.632 0 0 1-.224-.208.528.528 0 0 1-.048-.224v-.408c0-.168.064-.248.184-.248.048 0 .096.008.144.024l.2.096c.272.12.568.216.88.28.32.064.632.096.952.096.504 0 .896-.088 1.168-.264a.86.86 0 0 0 .408-.76.78.78 0 0 0-.216-.56c-.144-.152-.416-.288-.808-.416l-1.16-.36c-.584-.184-1.016-.456-1.284-.816a1.94 1.94 0 0 1-.404-1.192c0-.344.072-.648.216-.912.144-.264.336-.496.584-.68.248-.192.528-.336.848-.432.32-.096.664-.144 1.024-.144.18 0 .368.008.548.032.188.024.36.056.528.096.16.04.312.088.456.144.144.056.256.112.336.168a.69.69 0 0 1 .24.2.458.458 0 0 1 .072.272v.376c0 .168-.064.256-.184.256a.847.847 0 0 1-.312-.104 3.744 3.744 0 0 0-1.568-.32c-.456 0-.816.072-1.064.224-.248.152-.376.384-.376.712 0 .224.08.416.24.568.16.152.456.304.88.44l1.136.36c.576.184.992.44 1.24.768.248.328.368.704.368 1.12 0 .352-.072.672-.208.952-.144.28-.336.528-.592.728-.256.208-.56.36-.912.464a3.9 3.9 0 0 1-1.168.168z" />
    </svg>
  );
}

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
              <span className="cert-card__issuer">
                <AWSIcon />
                {cert.issuer}
              </span>
              <span className={`cert-card__badge cert-card__badge--${cert.status}`}>
                {t.certs.statuses[cert.status]}
              </span>
            </div>
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

import { motion } from "framer-motion";
import { useI18n } from "../i18n/I18nContext";

export default function Footer() {
  const { t } = useI18n();

  return (
    <motion.footer
      className="site-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p>{t.footer.copyright}</p>
      <a className="text-link" href="#home">
        {t.footer.backToTop}
      </a>
    </motion.footer>
  );
}

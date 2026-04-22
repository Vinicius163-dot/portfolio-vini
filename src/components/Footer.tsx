import { motion } from "framer-motion";
import { siteData } from "../data/siteData";

export default function Footer() {
  return (
    <motion.footer
      className="site-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p>© 2026 {siteData.name}. Built with care.</p>
      <a className="text-link" href="#home">
        Back to top ↑
      </a>
    </motion.footer>
  );
}

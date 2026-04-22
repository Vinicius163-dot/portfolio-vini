import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "../data/siteData";
import AvailabilityBadge from "./AvailabilityBadge";

interface Props {
  onOpenCommand: () => void;
}

export default function Header({ onOpenCommand }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad|iPod/.test(navigator.platform);

  return (
    <motion.header
      className="site-header"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="site-header__left">
        <a className="logo" href="#home" aria-label="Início">
          <span>{siteData.firstName}</span>
          <span>{siteData.lastName}</span>
        </a>
      </div>

      <nav className={`site-nav ${menuOpen ? "open" : ""}`}>
        {siteData.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-cta">
        <AvailabilityBadge />
        <button
          type="button"
          className="cmdk-trigger"
          onClick={onOpenCommand}
          aria-label="Abrir command palette"
        >
          <kbd>{isMac ? "⌘" : "Ctrl"}</kbd>
          <kbd>K</kbd>
        </button>
      </div>

      <button
        className="menu-toggle"
        aria-label="Abrir navegação"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}

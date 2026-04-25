import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "../i18n/I18nContext";

type Status = "idle" | "sending" | "success" | "error";

export default function ChatWidget() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && status === "idle") nameRef.current?.focus();
  }, [open, status]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim() || status === "sending") return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  function handleClose() {
    setOpen(false);
    if (status === "success") {
      setName("");
      setMessage("");
      setStatus("idle");
    }
  }

  return (
    <div className="chat-widget">
      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-panel"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="chat-panel__header">
              <div>
                <p className="chat-panel__title">{t.chat.title}</p>
                <p className="chat-panel__subtitle">{t.chat.subtitle}</p>
              </div>
              <button
                type="button"
                className="chat-panel__close"
                aria-label={t.chat.close}
                onClick={handleClose}
              >
                <svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <line x1="1" y1="1" x2="13" y2="13" />
                  <line x1="13" y1="1" x2="1" y2="13" />
                </svg>
              </button>
            </div>

            <div className="chat-panel__body">
              {status === "success" ? (
                <div className="chat-panel__success">
                  <p className="chat-panel__success-title">{t.chat.successTitle}</p>
                  <p className="chat-panel__success-body">{t.chat.successBody}</p>
                </div>
              ) : (
                <form className="chat-panel__form" onSubmit={handleSubmit}>
                  <input
                    ref={nameRef}
                    className="chat-input"
                    type="text"
                    placeholder={t.chat.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={80}
                    required
                    disabled={status === "sending"}
                  />
                  <textarea
                    className="chat-input chat-input--textarea"
                    placeholder={t.chat.messagePlaceholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={1000}
                    rows={4}
                    required
                    disabled={status === "sending"}
                  />
                  {status === "error" && (
                    <p className="chat-panel__error">{t.chat.errorBody}</p>
                  )}
                  <button
                    type="submit"
                    className="pill-btn chat-panel__submit"
                    disabled={status === "sending" || !name.trim() || !message.trim()}
                  >
                    {status === "sending" ? t.chat.sending : t.chat.send}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        className={`chat-trigger ${open ? "chat-trigger--active" : ""}`}
        onClick={() => setOpen((p) => !p)}
        aria-label={t.chat.trigger}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span>{t.chat.trigger}</span>
      </button>
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const API = `${import.meta.env.VITE_BACKEND_URL || ""}/api`;

const inputCls =
  "w-full border border-hairline bg-[#09090B] px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/40 transition-colors duration-300 focus:border-accent focus:outline-none";

const DemoModal = ({ open, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", company: "", company_size: "1-200", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      window.__lenis?.start();
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/demo-requests`, form);
      setDone(true);
    } catch (err) {
      toast.error("Could not submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const close = () => {
    onClose();
    setTimeout(() => {
      setDone(false);
      setForm({ name: "", email: "", company: "", company_size: "1-200", message: "" });
    }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md"
          onClick={close}
          data-testid="demo-modal-overlay"
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg border border-hairline bg-surface shadow-[0_0_80px_rgba(0,229,168,0.1)]"
            onClick={(e) => e.stopPropagation()}
            data-testid="demo-modal"
          >
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                // Request Enterprise Demo
              </span>
              <button onClick={close} data-testid="demo-modal-close" aria-label="Close" className="text-text-secondary transition-colors hover:text-accent">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {done ? (
              <div className="flex flex-col items-center px-8 py-16 text-center" data-testid="demo-modal-success">
                <CheckCircle2 size={44} strokeWidth={1.25} className="text-accent" />
                <h3 className="mt-6 text-xl font-medium tracking-tight text-text-primary">Request received.</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
                  Our solutions team will reach out within one business day to
                  schedule your executive walkthrough.
                </p>
                <button
                  onClick={close}
                  data-testid="demo-modal-done-button"
                  className="mt-8 border border-accent bg-accent px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-transparent hover:text-accent"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4 px-6 py-6" data-testid="demo-request-form">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input required placeholder="Full name" value={form.name} onChange={set("name")} className={inputCls} data-testid="demo-form-name" />
                  <input required type="email" placeholder="Work email" value={form.email} onChange={set("email")} className={inputCls} data-testid="demo-form-email" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input required placeholder="Company" value={form.company} onChange={set("company")} className={inputCls} data-testid="demo-form-company" />
                  <select value={form.company_size} onChange={set("company_size")} className={inputCls} data-testid="demo-form-company-size">
                    <option value="1-200">1 – 200 employees</option>
                    <option value="201-1000">201 – 1,000 employees</option>
                    <option value="1001-5000">1,001 – 5,000 employees</option>
                    <option value="5000+">5,000+ employees</option>
                  </select>
                </div>
                <textarea
                  rows={3}
                  placeholder="What does your AI estate look like today? (optional)"
                  value={form.message}
                  onChange={set("message")}
                  className={`${inputCls} resize-none`}
                  data-testid="demo-form-message"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="demo-form-submit"
                  className="flex w-full items-center justify-center gap-2 border border-accent bg-accent px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-transparent hover:text-accent disabled:opacity-60"
                >
                  {submitting ? <Loader2 size={15} className="animate-spin" /> : null}
                  {submitting ? "Transmitting..." : "Request Demo"}
                </button>
                <p className="text-center font-mono text-[9px] tracking-[0.15em] text-text-secondary/50">
                  SOC 2 READY // YOUR DATA NEVER TRAINS A MODEL
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoModal;

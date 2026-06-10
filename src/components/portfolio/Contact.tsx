import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Download, Send } from "lucide-react";
import { SectionLabel } from "./About";

// Paper-plane silhouette clip-path. Designed for a tall rectangle (form area).
// Coordinates kept conservative so inputs/text stay within the visible polygon.
const PLANE_CLIP =
  "polygon(100% 0, 75% 80%, 48% 64%, 34% 84%, 29% 58%, 0 45%)";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div>
          <SectionLabel n="05" label="Contact" />
          <h2 className="mt-8 font-display text-4xl md:text-5xl font-bold leading-tight">
            Send me a <span className="text-coral">paper plane</span>.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
            I'm always happy to talk about new builds, collaborations or
            interesting open source problems.
          </p>

          <div className="mt-10 space-y-3">
            <Social icon={<Mail size={16} />} label="hello@ashif.dev" href="mailto:hello@ashif.dev" />
            <Social icon={<Github size={16} />} label="github.com/ashif" href="#" />
            <Social icon={<Linkedin size={16} />} label="linkedin.com/in/ashif" href="#" />
            <Social icon={<Twitter size={16} />} label="@ashif" href="#" />
          </div>

          <a
            href="#"
            className="mt-10 inline-flex items-center gap-2 px-5 py-3 border border-foreground/20 hover:border-coral hover:text-coral transition-all text-sm"
            style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
          >
            <Download size={16} /> Download resume
          </a>
        </div>

        <div className="relative">
          {/* Plane shadow */}
          <div
            aria-hidden
            className="absolute inset-0 translate-y-3 translate-x-2 bg-foreground/10 blur-xl"
            style={{ clipPath: PLANE_CLIP }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-lime/10 blur-xl"
            style={{ clipPath: PLANE_CLIP }}
          />
          
          <motion.form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="relative bg-transparent border border-foreground/10 px-14 py-16 min-h-[520px]"

            initial={{ opacity: 0, y: 30, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            animate={sent ? { x: 600, y: -300, rotate: 25, opacity: 0 } : {}}
          >
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div key="form" exit={{ opacity: 0 }}>
                  <Field label="Name" id="n"><input id="n" required className="field" /></Field>
                  <Field label="Email" id="e"><input id="e" type="email" required className="field" /></Field>
                  <Field label="Message" id="m"><textarea id="m" rows={4} required className="field resize-none" /></Field>
                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-medium hover:bg-coral transition-colors"
                    style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
                  >
                    Fold &amp; send <Send size={16} />
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <style>{`
              .field {
                width: 100%;
                background: transparent;
                border: 0;
                border-bottom: 1px solid color-mix(in oklab, var(--foreground) 15%, transparent);
                padding: 10px 0;
                font-size: 0.95rem;
                color: var(--foreground);
                outline: none;
                transition: border-color 200ms;
              }
              .field:focus { border-color: var(--coral); }
            `}</style>
          </motion.form>
          

          <AnimatePresence>
            {sent && (
              <motion.div
                key="sent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                <h3 className="font-display text-2xl font-bold">Folded &amp; flying.</h3>
                <p className="mt-2 text-sm text-muted-foreground">I'll write back within a day or two.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function Social({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <a href={href} className="flex items-center gap-3 group">
      <span className="w-9 h-9 grid place-items-center border border-foreground/15 group-hover:border-coral group-hover:text-coral transition-all">
        {icon}
      </span>
      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
    </a>
  );
}
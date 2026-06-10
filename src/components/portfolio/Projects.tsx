import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { SectionLabel } from "./About";

type Cat = "All" | "Web" | "Systems" | "Cloud" | "Games" | "OSS";

const cats: Cat[] = ["All", "Web", "Systems", "Cloud", "Games", "OSS"];

const projects: { title: string; desc: string; tech: string[]; cat: Exclude<Cat, "All">; color: string; featured?: boolean }[] = [
  {
    title: "Paperboat",
    desc: "Realtime collaborative editor with CRDTs and origami-style document folding.",
    tech: ["Next.js", "Yjs", "Rust", "WebSockets"],
    cat: "Web",
    color: "var(--coral)",
    featured: true,
  },
  {
    title: "Foldscale",
    desc: "Multi-region IaC platform that turns a YAML manifest into a working cloud stack.",
    tech: ["Terraform", "AWS", "Go"],
    cat: "Cloud",
    color: "var(--aqua)",
    featured: true,
  },
  {
    title: "Crease CLI",
    desc: "A blazing fast project scaffolder written in Rust. Single binary, no deps.",
    tech: ["Rust", "TOML"],
    cat: "Systems",
    color: "var(--lime)",
  },
  {
    title: "Origami Arena",
    desc: "Low-latency multiplayer game where folded creatures battle in 3D.",
    tech: ["Unity", "C#", "Mirror"],
    cat: "Games",
    color: "var(--yellow-paper)",
  },
  {
    title: "lazy-fold",
    desc: "Open source TS utility for streaming, foldable async pipelines.",
    tech: ["TypeScript"],
    cat: "OSS",
    color: "var(--coral)",
  },
  {
    title: "kite",
    desc: "Tiny edge-deployed analytics that ships under 4kb of JS.",
    tech: ["Cloudflare", "SQLite"],
    cat: "Cloud",
    color: "var(--aqua)",
  },
];

export function Projects() {
  const [active, setActive] = useState<Cat>("All");
  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.cat === active)),
    [active],
  );

  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel n="04" label="Projects" />
        <div className="mt-8 flex items-end justify-between flex-wrap gap-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
            Things I've <span className="text-coral">folded</span> into existence.
          </h2>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                  active === c
                    ? "bg-foreground text-background border-foreground"
                    : "border-foreground/15 hover:border-coral hover:text-coral"
                }`}
                style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                className={`paper-card p-7 group flex flex-col ${p.featured ? "lg:col-span-2" : ""}`}
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div
                    className="w-12 h-12 transition-transform duration-500 group-hover:rotate-90"
                    style={{
                      background: `linear-gradient(135deg, ${p.color}, color-mix(in oklab, ${p.color} 50%, transparent))`,
                      clipPath: "polygon(50% 0, 100% 38%, 82% 100%, 18% 100%, 0 38%)",
                    }}
                  />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground border border-foreground/15 px-2 py-1">
                    {p.cat}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl leading-tight">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2 py-1 bg-foreground/5">{t}</span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-4 text-sm">
                  <a href="#" className="inline-flex items-center gap-1.5 hover:text-coral transition-colors">
                    <Github size={14} /> Code
                  </a>
                  <a href="#" className="inline-flex items-center gap-1.5 hover:text-coral transition-colors">
                    Live <ArrowUpRight size={14} />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
import { motion } from "framer-motion";
import { SectionLabel } from "./About";

const groups = [
  { title: "Frontend", color: "var(--coral)", skills: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { title: "Backend", color: "var(--aqua)", skills: ["Node.js", "Express", "GraphQL", "REST APIs", "PostgreSQL"] },
  { title: "Cloud & DevOps", color: "var(--lime)", skills: ["AWS", "Docker", "Terraform", "CI/CD", "Kubernetes"] },
  { title: "Systems", color: "var(--yellow-paper)", skills: ["Rust", "C++", "Linux", "WASM", "Networking"] },
  { title: "Game Dev", color: "var(--coral)", skills: ["Unity", "C#", "Multiplayer", "Shaders", "Procedural"] },
  { title: "Tooling", color: "var(--aqua)", skills: ["Vite", "Bun", "GitHub Actions", "Vim", "Figma"] },
];

const FOLD = 72; // px, size of folded corner on hover

export function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel n="03" label="Skills" />
        <h2 className="mt-8 font-display text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
          Tools I <span className="text-coral">fold</span> with — sharp creases, soft edges.
        </h2>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="skill-card group relative p-6 bg-card border border-foreground/10"
              style={{
                ["--fold" as string]: `${FOLD}px`,
                ["--accent" as string]: g.color,
              }}
            >
              {/* Colored backing that shows through the folded corner */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100"
                style={{
                  width: "var(--fold)",
                  height: "var(--fold)",
                  background: g.color,
                  clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                }}
              />
              {/* Folded flap (the underside of the paper) */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 transition-all duration-500 ease-out scale-0 group-hover:scale-100 origin-top-right"
                style={{
                  width: "var(--fold)",
                  height: "var(--fold)",
                  background: `linear-gradient(135deg, color-mix(in oklab, ${g.color} 35%, var(--card)) 0%, color-mix(in oklab, ${g.color} 10%, var(--card)) 100%)`,
                  clipPath: "polygon(0 0, 100% 100%, 0 100%)",
                  boxShadow: "-2px 2px 6px rgba(0,0,0,0.12)",
                }}
              />
              <div className="flex items-center gap-3 relative">
                <span className="w-3 h-3" style={{ background: g.color, clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
                <h3 className="font-display font-bold text-xl">{g.title}</h3>
              </div>
              <ul className="mt-5 space-y-2 relative">
                {g.skills.map((s) => (
                  <li key={s} className="flex items-center justify-between text-sm border-b border-dashed border-foreground/10 pb-2 last:border-0">
                    <span>{s}</span>
                    <span className="font-mono text-xs text-muted-foreground">·····</span>
                  </li>
                ))}
              </ul>

              <style>{`
                .skill-card {
                  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                  transition: clip-path 500ms cubic-bezier(.2,.8,.2,1), box-shadow 500ms, transform 500ms;
                  box-shadow: 0 1px 0 color-mix(in oklab, white 60%, transparent) inset,
                              0 10px 30px -10px var(--paper-shadow);
                }
                .skill-card:hover {
                  clip-path: polygon(0 0, calc(100% - var(--fold)) 0, 100% var(--fold), 100% 100%, 0 100%);
                  box-shadow: 0 1px 0 color-mix(in oklab, white 60%, transparent) inset,
                              0 20px 40px -15px var(--paper-shadow),
                              0 0 0 1px color-mix(in oklab, var(--accent) 30%, transparent);
                }
              `}</style>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
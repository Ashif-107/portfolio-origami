import { motion } from "framer-motion";

const facets = [
  { color: "var(--coral)", title: "Full Stack", body: "React, Next, TypeScript, Node. End‑to‑end product builders." },
  { color: "var(--aqua)", title: "Cloud", body: "AWS, Docker, Terraform, CI/CD pipelines that don't break at 3am." },
  { color: "var(--lime)", title: "Systems", body: "Rust, C++, Linux. Tools that run quietly and never get in the way." },
  { color: "var(--yellow-paper)", title: "Games", body: "Unity, C#, multiplayer netcode and small interactive worlds." },
];

export function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel n="01" label="About" />
        <div className="grid md:grid-cols-12 gap-12 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              An <span className="text-coral">engineer</span><br />
              and a <span className="text-aqua">paper folder</span>.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              I treat code the way a paper artist treats a square sheet — every fold deliberate,
              every crease earning its place. I love the craft of turning gnarly problems into
              calm, elegant systems people enjoy using.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Outside of shipping, I contribute to open source, write about systems, and
              prototype tiny games on weekends.
            </p>
          </motion.div>

          <div className="md:col-span-7 grid sm:grid-cols-2 gap-5">
            {facets.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="paper-card p-6 group"
              >
                <div
                  className="w-10 h-10 mb-4 transition-transform group-hover:rotate-45 duration-500"
                  style={{
                    background: f.color,
                    clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
                  }}
                />
                <h3 className="font-display font-bold text-xl mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
      <span className="font-mono text-coral">{n}</span>
      <span className="w-8 h-px bg-current" />
      <span>{label}</span>
    </div>
  );
}
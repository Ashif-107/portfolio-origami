import { motion } from "framer-motion";

const facets = [
  {
    color: "var(--coral)",
    title: "Academic Excellence with 9.4 CGPA",
    body: "Consistently maintaining strong academic performance while balancing projects, internships, and technical exploration."
  },
  {
    color: "var(--aqua)",
    title: "Project Driven Learning",
    body: "I learn by building. From cloud gaming platforms to autonomous vehicle simulations, every project starts with curiosity and ends with practical experience."
  },
  {
    color: "var(--lime)",
    title: "Leadership & Community",
    body: "Actively involved in technical communities, collaborating with peers, sharing knowledge, and contributing to team-driven initiatives."
  },
  {
    color: "var(--lime)",
    title: "Hackathons & Innovation",
    body: "Participated in programs and competitions including Smart India Hackathon (SIH) and Google's Devshouse, collaborating with teams to solve real-world challenges."
  },
];

export function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel n="01" label="About" />
        <div className="grid md:grid-cols-12 gap-12 mt-8">

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
            <p className="mt-6 text-muted-foreground leading-relaxed text-justify">
              I treat code the way a paper artist treats a square sheet, every fold deliberate,
              every crease earning its place. I love the craft of turning gnarly problems into
              calm, elegant systems people enjoy using.
              
            </p>
            <p className="mt-6 text-muted-foreground leading-relaxed text-justify">
              I am the <span className="text-coral">Lead of  Web Dev Department</span> of IEEE RAS , and <span className="text-aqua">Game Dev Department</span> of OSPC.
              Worked on the production level Projects of my university and my clubs. 
              Organized and conducted <span className="text-lime">workshops and Competitions</span> on Web and Game development. 
              And A passionated Gamer and An Artist.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-justify">
              Outside of shipping, I Participated in many <span className="text-coral">Hackathons</span>. I <span className="text-aqua">contribute to open source</span>, write about systems, and
              prototype <span className="text-yellow-paper"> tiny games</span> on weekends.
            </p>
          </motion.div>

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
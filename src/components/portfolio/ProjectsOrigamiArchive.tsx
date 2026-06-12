import { useMemo, useState } from "react";

type Category = "All" | "Web" | "Systems" | "Cloud" | "Games" | "Open Source";

type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  highlights: string[];
  categories: Category[];
  github?: string;
  demo?: string;
  accent: string;
  hero?: boolean;
};

const PROJECTS: Project[] = [
  {
    id: "pocketstream",
    name: "PocketStream",
    tagline: "Cloud Gaming Platform",
    description:
      "A low-latency cloud gaming platform that streams console-grade play to any device. Built around a custom realtime pipeline, adaptive bitrate, and edge-aware session orchestration.",
    tech: ["WebRTC", "Unity", "React", "Node.js", "Typescript", "REST APIs"],
    highlights: [
      "~38 ms median glass-to-glass latency",
      "Adaptive 1080p60 streaming over flaky networks",
      "Edge-aware session matchmaker across 6 regions",
    ],
    categories: ["Systems", "Cloud", "Games"],
    github: "https://github.com/Ashif-107/PocketStream--Cloud-Gaming",
    demo: "#",
    accent: "#ff7a3d",
    hero: true,
  },
  {
    id: "aws-infra",
    name: "AWS Cloud Gaming Infrastructure",
    tagline: "Full Stack Cloud Architecture",
    description:
      "Multi-region infrastructure powering elastic game servers — autoscaling fleets, spot orchestration, and a control plane that heals itself.",
    tech: ["AWS", "EC2", "S3", "CloudFront", "Lambda", "Terraform", "API Gateways", "PM2"],
    highlights: [
      "Scales 0 → 4k concurrent sessions in < 90s",
      "Daemonized game server lifecycle management using PM2",
      "Self-healing control plane",
    ],
    categories: ["Cloud", "Systems"],
    github: "https://github.com/Ashif-107/PocketStream--Cloud-Gaming",
    accent: "#7aa2ff",
  },
  {
    id: "music-assistant",
    name: "AshDJ Music Assistant",
    tagline: "Voice Controlled Spotify App",
    description:
      "A playful music companion that learns taste from listening loops and recommends paths through your library — not playlists, journeys.",
    tech: ["TypeScript", "Next.js", "Python", "Embeddings", "Postgres"],
    highlights: [
      "Embedding-based 'mood paths'",
      "Realtime crossfade recommendations",
      "Offline-first PWA",
    ],
    categories: ["Systems"],
    github: "https://github.com/Ashif-107/ASHDJ-Personal-Smart-Spotify-DJ-",
    demo: "#",
    accent: "#c084fc",
  },
  {
    id: "deskflow",
    name: "DeskFlow",
    tagline: "Desktop Productivity Intelligence System",
    description:
      "A lightweight Windows productivity tracker that runs as an always-on-screen HUD, automatically categorizing desktop activity and generating productivity insights, streaks, and daily performance metrics.",
    tech: ["C#", ".NET", "Windows APIs", "SQLite"],
    highlights: [
      "Automatic activity categorization",
      "Daily productivity scoring system",
      "Calendar streak tracking and analytics"
    ],
    categories: ["Systems"],
    github: "https://github.com/Ashif-107/DeskFlow-Desktop-Hud",
    accent: "#22c55e"
  },
  {
    id: "medscope-ar",
    name: "MedScope 3D AR",
    tagline: "Interactive AR Medical Learning Platform",
    description:
      "A web-based augmented reality platform that enables students to visualize and interact with 3D anatomical models directly from the browser. Built during DevHouse'25 to make medical education more immersive and accessible.",
    tech: ["Three.js", "WebXR", "React", "TypeScript", "3D Modeling"],
    highlights: [
      "Interactive 3D anatomical visualization",
      "Browser-based AR experience without native installation",
      "Built as a hackathon project for educational accessibility"
    ],
    categories: ["Web", "Systems"],
    github: "https://github.com/Ashif-107/MedScope-3D",
    accent: "#ef4444"
  },
 
  {
    id: "nushell",
    name: "Nushell Contributions",
    tagline: "Open Source Shell Development",
    description:
      "Contributed to Nushell, a modern data-oriented shell written in Rust, by improving functionality, fixing issues, and collaborating with maintainers in a large-scale open-source ecosystem.",
    tech: ["Rust", "Git", "Open Source"],
    highlights: [
      "Merged contributions into production codebase",
      "Worked within a large open-source community",
      "Improved developer tooling and usability"
    ],
    categories: ["Open Source", "Systems"],
    github: "https://github.com/nushell/nushell/pull/18364",
    accent: "#f59e0b",
    hero: true,
  },
   {
    id: "cloud-scheduler",
    name: "Cloud OS Scheduler",
    tagline: "Fair Resource Allocation in Containerized Systems",
    description:
      "A Linux-based cloud scheduler that detects CPU starvation in containerized workloads and automatically restores fairness using dynamic cgroup weight adjustment and Jain's Fairness Index.",
    tech: ["Linux", "Docker", "C", "cgroups", "Systems Programming"],
    highlights: [
      "Real-time CPU utilization monitoring",
      "Jain's Fairness Index implementation",
      "Automatic starvation detection and recovery"
    ],
    categories: ["Systems", "Cloud"],
    github: "https://github.com/Ashif-107/Cloud-OS-Scheduler",
    accent: "#3b82f6"
  },
  {
    id: "vibrance25",
    name: "Vibrance'25 Festival Platform",
    tagline: "Large-Scale Event Website Development",
    description:
      "Contributed to the official web platform for VIT's flagship cultural festival, collaborating in a multi-developer environment to build performant and engaging experiences for thousands of attendees.",
    tech: [
      "React",
      "Next.js",
      "Three.js",
      "TypeScript",
      "Git"
    ],
    highlights: [
      "Built and optimized high-traffic event pages",
      "Developed immersive 3D landing page experiences using Three.js",
      "Collaborated through production-grade Git workflows and deployments"
    ],
    categories: ["Web", "Open Source"],
    github:"https://github.com/Vibrance-25/site/pull/24",
    accent: "#ec4899"
  },
];

const CATEGORIES: Category[] = ["All", "Web", "Systems", "Cloud", "Games", "Open Source"];

/* ── decorative paper grain / crease helpers ── */

const paperTexture =
  "repeating-linear-gradient(45deg, rgba(255,244,224,0.02) 0 2px, transparent 2px 6px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.02) 0 2px, transparent 2px 6px)";

function FoldedTag({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative px-5 py-2 text-[11px] uppercase tracking-[0.28em] transition-all duration-300 ${active ? "text-[#1a1410]" : "text-[#a89880] hover:text-[#fff4e0]"
        }`}
      style={{
        clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)",
        background: active
          ? "linear-gradient(135deg, #ffd9b3, #ffb37a)"
          : "rgba(255,244,224,0.04)",
        border: "1px solid rgba(255,244,224,0.14)",
        boxShadow: active
          ? "0 6px 18px -8px rgba(255,140,80,0.6), inset 0 1px 0 rgba(255,255,255,0.4)"
          : "inset 0 1px 0 rgba(255,244,224,0.05)",
      }}
    >
      <span className="relative z-10">{label}</span>
    </button>
  );
}

/* ── A single origami project sheet ── */
function PaperSheet({
  project,
  hero,
}: {
  project: Project;
  hero?: boolean;
}) {
  return (
    <div
      className={`group relative ${hero ? "md:col-span-2" : ""}`}
      style={{ perspective: "1400px" }}
    >
      {/* glow */}
      <div
        aria-hidden
        className="absolute -inset-2 -z-10 opacity-60 transition-opacity duration-500 group-hover:opacity-90"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${project.accent}22, transparent 60%)`,
          filter: "blur(20px)",
        }}
      />

      {/* back layer */}
      <div
        aria-hidden
        className="
          absolute inset-0
          translate-x-2 translate-y-3 rotate-[1.2deg]
          transition-transform duration-500
          group-hover:translate-x-3
          group-hover:translate-y-4
          group-hover:rotate-[1.8deg]
          will-change-transform
        "
        style={{
          background:
            "linear-gradient(160deg, rgba(255,244,224,0.06), rgba(255,244,224,0.02))",
          border: "1px solid rgba(255,244,224,0.08)",
          clipPath: "polygon(0 0, 100% 0, 100% 86%, 90% 100%, 0 100%)",
          boxShadow: "0 18px 30px -20px rgba(0,0,0,0.6)",
        }}
      />

      {/* middle layer */}
      <div
        aria-hidden
        className="
          absolute inset-0
          translate-x-1 translate-y-1.5 rotate-[-0.6deg]
          transition-transform duration-500
          group-hover:translate-x-1.5
          group-hover:translate-y-2
          will-change-transform
        "
        style={{
          background:
            "linear-gradient(150deg, rgba(255,244,224,0.09), rgba(255,244,224,0.03))",
          border: "1px solid rgba(255,244,224,0.1)",
          clipPath: "polygon(0 0, 100% 0, 100% 86%, 90% 100%, 0 100%)",
        }}
      />

      <article
        className="
          relative overflow-hidden
          p-7 md:p-9
          transition-transform duration-500
          group-hover:-translate-y-2
          will-change-transform
        "
        style={{
          contain: "layout paint",
          background:
            "linear-gradient(140deg, rgba(255,244,224,0.11), rgba(255,244,224,0.04) 60%, rgba(255,244,224,0.02))",
          backgroundImage: paperTexture,
          border: "1px solid rgba(255,244,224,0.18)",
          clipPath: "polygon(0 0, 100% 0, 100% 86%, 90% 100%, 0 100%)",
          boxShadow:
            "0 12px 28px -16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,244,224,0.08)",
        }}
      >
        {/* dog ear */}
        <div
          aria-hidden
          className="
            pointer-events-none
            absolute bottom-0 right-0
            transition-transform duration-500
            group-hover:scale-110
          "
          style={{
            width: hero ? "84px" : "56px",
            height: hero ? "84px" : "56px",
            background: `linear-gradient(135deg, transparent 50%, ${project.accent}55 50%, ${project.accent}aa)`,
            clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          }}
        />

        {/* crease lines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-[34%] w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,244,224,0.22) 20%, rgba(0,0,0,0.18) 50%, rgba(255,244,224,0.22) 80%, transparent)",
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[44%] h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,244,224,0.12), transparent)",
          }}
        />

        {/* ribbon */}
        <div
          aria-hidden
          className="
            absolute left-0 top-6 h-px w-16
            origin-left
            transition-transform duration-500
            group-hover:scale-x-[1.75]
          "
          style={{ background: project.accent }}
        />

        <header className="flex items-start justify-between gap-6">
          <div>
            <p
              className="text-[12px] uppercase tracking-[0.4em] font-bold font-display"
              style={{ color: project.accent }}
            >
              {project.tagline}
            </p>

            <h3
              className={`mt-3 font-serif leading-tight text-forground ${
                hero ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"
              }`}
            >
              {project.name}
            </h3>
          </div>
        </header>

        <p
          className={`mt-5 leading-relaxed text-forground/70 ${
            hero ? "max-w-2xl text-[15px]" : "text-sm"
          }`}
        >
          {project.description}
        </p>

        {/* highlights */}
        <div
          className="
            overflow-hidden
            max-h-0
            opacity-0
            transition-all
            duration-500
            group-hover:max-h-40
            group-hover:opacity-100
          "
        >
          <div className="mt-5 space-y-1.5 border-l border-dashed border-[#3a2f24] pl-4">
            {project.highlights.map((h) => (
              <p
                key={h}
                className="text-xs leading-relaxed text-foreground/70"
              >
                — {h}
              </p>
            ))}
          </div>
        </div>

        {/* tech */}
        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5">
          {project.tech.map((t, i) => (
            <span
              key={t}
              className="
                text-[12px]
                uppercase
                tracking-[0.2em]
                text-foreground
                font-bold
                transition-transform
                duration-300
                group-hover:translate-y-0
              "
              style={{
                transform: `translateY(${i % 2 ? 1 : -1}px)`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <footer className="mt-7 flex items-center gap-5 text-[12px] uppercase tracking-[0.3em] font-bold">
          {project.github && (
            <a
              href={project.github}
              className="text-aqua transition-colors hover:text-[#fff4e0]"
            >
              Source ↗
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              className="text-coral transition-colors hover:text-[#fff4e0]"
            >
              Demo ↗
            </a>
          )}

          <span className="ml-auto text-[10px] tracking-[0.25em] text-[#6b6053]">
            {project.categories.join(" · ")}
          </span>
        </footer>
      </article>
    </div>
  );
}

/* ── Decorative floating paper scraps in the background ── */

function PaperScraps() {
  const scraps = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        top: `${(i * 53) % 95}%`,
        left: `${(i * 37) % 95}%`,
        size: 30 + ((i * 17) % 60),
        rot: (i * 47) % 360,
        delay: (i % 7) * 0.6,
        opacity: 0.04 + ((i % 5) * 0.015),
      })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {scraps.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            transform: `rotate(${s.rot}deg)`,
            opacity: s.opacity,
            background:
              "linear-gradient(135deg, #fff4e0 0%, #fff4e0 50%, transparent 50%)",
            clipPath:
              "polygon(0 0, 100% 0, 100% 70%, 80% 100%, 0 100%)",
            animation: `paper-drift ${14 + s.delay * 2}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes paper-drift {
          from { transform: translateY(-10px) rotate(0deg); }
          to   { transform: translateY(14px)  rotate(8deg); }
        }
      `}</style>
    </div>
  );
}

export default function ProjectsOrigamiArchive() {
  const [category, setCategory] = useState<Category>("All");

  const filtered = useMemo(
    () =>
      category === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.categories.includes(category)),
    [category],
  );

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden py-24 md:py-32"
    >
      <PaperScraps />

     

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Heading */}
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-3">
            <span
              className="h-px w-12"
              style={{ background: "#d4a574" }}
              aria-hidden
            />
            <p className="text-[11px] uppercase tracking-[0.4em] text-coral">
              Projects
            </p>
          </div>
          <h2 className="max-w-3xl text-4xl font-light font-display leading-[1.05] text-forground md:text-6xl">
            Things I have<em className="font-serif not-italic text-[#ffb37a]"> Folded </em> Into Existence.
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/80 md:text-base">
            A workshop of paper artifacts - systems, experiments, small worlds
            folded from late nights and quiet curiosity. Hover a sheet to
            unfold its blueprint.
          </p>
        </div>

        {/* Category tags */}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((c) => (
            <FoldedTag
              key={c}
              label={c}
              active={category === c}
              onClick={() => setCategory(c)}
            />
          ))}
        </div>

        {/* Artifact grid */}
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {filtered.map((p) => (
            <PaperSheet key={p.id} project={p} hero={p.hero} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-foreground/80">
            No artifacts in this fold yet.
          </p>
        )}

        {/* closing crease */}
        <div
          aria-hidden
          className="mx-auto mt-24 h-px max-w-md"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,244,224,0.2), transparent)",
          }}
        />
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "./About";

const items = [
  {
    year: "2024",
    title: "Senior Full Stack Engineer",
    org: "Independent",
    desc: "Building a SaaS platform for indie game developers, focused on seamless multiplayer integration and cloud hosting.",
    tag: "Work",
    color: "var(--coral)",
  },
  {
    year: "2023",
    title: "Cloud Platform Internship",
    org: "Stealth Startup",
    tag: "Internship",
    color: "var(--aqua)",
  },
  {
    year: "2023",
    title: "Open Source — Rust CLI Tools",
    org: "Community",
    tag: "OSS",
    color: "var(--lime)",
  },
  {
    year: "2022",
    title: "Game Jam: Folded Worlds",
    org: "Indie",
    tag: "Game",
    color: "var(--yellow-paper)",
  },
  {
    year: "2022",
    title: "Engineering Lead",
    org: "University Hackclub",
    tag: "Leadership",
    color: "var(--coral)",
  },
  {
    year: "2021",
    title: "B.Sc. Computer Science",
    org: "University",
    tag: "Education",
    color: "var(--aqua)",
  },
];

export function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const maxScroll =
        container.scrollWidth - container.clientWidth;

      const current = container.scrollLeft;

      const atStart = current <= 0;
      const atEnd = current >= maxScroll - 5;

      // scrolling down
      if (e.deltaY > 0) {
        if (!atEnd) {
          e.preventDefault();

          container.scrollTo({
            left: current + e.deltaY * 1.5,
            behavior: "smooth",
          });
        }
      }

      // scrolling up
      if (e.deltaY < 0) {
        if (!atStart) {
          e.preventDefault();

          container.scrollTo({
            left: current + e.deltaY * 1.5,
            behavior: "smooth",
          });
        }
      }
    };

    container.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () =>
      container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section
      id="journey"
      className="overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel n="02" label="Journey" />

        <div className="mt-6 flex items-end justify-between flex-wrap gap-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight max-w-xl">
            A <span className="text-coral">folded ribbon</span> of
            work, study and play.
          </h2>

          <p className="text-sm text-muted-foreground max-w-sm">
            Scroll to unfold the timeline.
          </p>
        </div>
      </div>

      <div className="relative mt-20">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-foreground/15" />

        <div
          ref={scrollRef}
          className="
            overflow-x-auto
            overflow-y-hidden
            scrollbar-hide
            scroll-smooth
          "
        >
          <div className="flex gap-10 px-[15vw] w-max pb-28">
            {items.map((it, i) => (
              <motion.div
                key={i}
                className="shrink-0"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                }}
              >
                <div className="paper-card w-[300px] p-6 relative "
                  style={
                    {
                      "--glow-color": it.color,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="absolute -top-3 -left-3 w-7 h-7"
                    style={{
                      background: it.color,
                      clipPath:
                        "polygon(50% 0, 100% 100%, 0 100%)",
                    }}
                  />

                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {it.year}
                  </div>

                  <h3 className="mt-2 font-display font-bold text-xl leading-tight">
                    {it.title}
                  </h3>

                  <div className="mt-1 text-sm text-muted-foreground font-extrabold">
                    {it.org}
                  </div>

                  <div className="mt-1 text-sm text-muted-foreground">
                    {it.desc}
                  </div>

                  <div className="mt-4 inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-1 border border-foreground/15">
                    {it.tag}
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <div
                    className="w-3 h-3 rotate-45"
                    style={{
                      background: it.color,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
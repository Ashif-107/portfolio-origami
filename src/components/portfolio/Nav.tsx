import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav({ theme, onToggleTheme }: { theme: "light" | "dark"; onToggleTheme: () => void }) {
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-md"
        style={{ background: "color-mix(in oklab, var(--background) 70%, transparent)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <svg width="28" height="28" viewBox="0 0 32 32" className="transition-transform group-hover:rotate-26">
              <polygon points="2,16 16,2 30,16 16,30" fill="var(--coral)" />
              <polygon points="16,2 30,16 16,16" fill="var(--aqua)" />
              <polygon points="2,16 16,30 16,16" fill="var(--foreground)" opacity="0.15" />
            </svg>
            <span className="font-display font-bold text-lg tracking-tight">Ashif<span className="text-coral">.</span></span>
          </a>
          <nav
            className="hidden md:flex items-center gap-8 relative"
            onMouseLeave={() => setHoverLabel(null)}
            onMouseMove={(event) => {
              if (hoverLabel) {
                setCursorPos({ x: event.clientX, y: event.clientY });
              }
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                onMouseEnter={() => setHoverLabel(l.label)}
                onMouseMove={(event) => setCursorPos({ x: event.clientX, y: event.clientY })}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-coral transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="relative w-10 h-10 grid place-items-center rounded-full border border-border hover:border-coral hover:text-coral transition-all hover:rotate-45"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </motion.header>

      <motion.div
        initial={false}
        animate={{
          opacity: hoverLabel ? 1 : 0,
          scale: hoverLabel ? 1 : 0.8,
          left: hoverLabel ? cursorPos.x - 10 : cursorPos.x,
          top: hoverLabel ? cursorPos.y - 10 : cursorPos.y,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
        className="font-display pointer-events-none fixed z-50 flex w-24 h-24 items-center justify-center rounded-full border border-black bg-aqua/90 text-center text-xs font-semibold text-foreground shadow-lg shadow-black/10 backdrop-blur-2xl"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {hoverLabel}
      </motion.div>
    </>
  );
}
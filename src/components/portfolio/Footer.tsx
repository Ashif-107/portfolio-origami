import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-12 border-t border-foreground/10">
      {/* origami border */}
      <div
        aria-hidden
        className="h-3 w-full"
        style={{
          background: `repeating-linear-gradient(135deg,
            var(--coral) 0 12px,
            var(--aqua) 12px 24px,
            var(--lime) 24px 36px,
            var(--yellow-paper) 36px 48px)`,
          opacity: 0.7,
          clipPath: "polygon(0 100%, 100% 100%, 100% 0, 95% 100%, 90% 0, 85% 100%, 80% 0, 75% 100%, 70% 0, 65% 100%, 60% 0, 55% 100%, 50% 0, 45% 100%, 40% 0, 35% 100%, 30% 0, 25% 100%, 20% 0, 15% 100%, 10% 0, 5% 100%, 0 0)",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 32 32">
            <polygon points="2,16 16,2 30,16 16,30" fill="var(--coral)" />
            <polygon points="16,2 30,16 16,16" fill="var(--aqua)" />
          </svg>
          <span className="text-sm">© {new Date().getFullYear()} Ashif. Folded with care.</span>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="https://github.com/Ashif-107" aria-label="GitHub" className="hover:text-coral transition-colors"><Github size={18} /></a>
          <a href="https://www.linkedin.com/in/mohamed-ashif-k-m/" aria-label="LinkedIn" className="hover:text-coral transition-colors"><Linkedin size={18} /></a>
          <a href="https://instagram.com/ash_if_107" aria-label="Instagram" className="hover:text-coral transition-colors"><Instagram size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
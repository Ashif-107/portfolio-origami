import { motion } from "framer-motion";
import { ArrowRight, Mail, File} from "lucide-react";
import crane from "@/assets/origami-crane.png";
import { useState } from "react";

export function Hero() {
 
   return (
    <section id="top" className="relative pt-32 pb-24 md:pt-24 md:pb-32 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            <span className="w-8 h-px bg-coral" /> Folded with care
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
            Hi, I'm <span className="highlight-underline">Ashif</span>.
            <br />
            <span className="text-muted-foreground">I craft software like</span>
            <br />
            <span className="italic font-serif">Origami</span>
            <span className="text-coral">.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Full Stack Developer • Game Developer • Systems Enthusiast •
            Building full-stack applications, cloud-powered systems, and immersive gaming experiences.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background font-medium hover:bg-coral transition-all duration-300"
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
            >
              View Projects
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-6 py-3.5 border border-foreground/20 hover:border-coral hover:text-coral transition-all duration-300"
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
            >
              <Mail size={18} />
              Contact Me
            </a>
            <a
              href="https://drive.google.com/file/d/1tbFmFTOguktyMU02vPt0RuVFRAntEEPg/view?usp=sharing"
              className="group inline-flex items-center gap-2 px-6 py-3.5 border border-foreground/20 hover:border-coral hover:text-coral transition-all duration-300"
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
            >
              <File size={18} />
              View Resume
            </a>
          </div>
          
          <div className="mt-14 flex items-center gap-8 text-sm">
            <Stat n="40+" l="Projects" />
            <Stat n="3yrs" l="Building software" />
            <Stat n="∞" l="Folds made" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-square"
        >
          {/* layered paper backdrop */}
          <motion.div className="absolute inset-8 bg-aqua/30 -rotate-6"
            style={{ clipPath: "polygon(0 8%, 92% 0, 100% 92%, 8% 100%)" }}
            animate={{ rotate: [-6, -3, -6], y: [0, -10, 0], }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", }} />
          <motion.div className="absolute inset-12 bg-yellow-paper/40 rotate-3"
            style={{ clipPath: "polygon(6% 0, 100% 6%, 94% 100%, 0 94%)" }}
            animate={{ rotate: [3, 6, 3], y: [0, 8, 0], }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", }} />
          <motion.div className="absolute inset-16 bg-coral/30 -rotate-2"
            style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 96%)" }}
            animate={{ rotate: [-2, 2, -2], y: [0, -6, 0], }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", }} />

          <motion.img
            src={crane}
            alt="Origami paper crane in coral, aqua and white folds"
            width={1280}
            height={1280}
            className="relative w-full h-full object-contain drop-shadow-2xl"
            animate={{ y: [0, -26, 0], rotate: [0, 2, -1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* corner tags */}
          <div className="absolute top right-4 paper-card px-3 py-2 text-xs font-mono">
            <span className="text-coral">▲</span> crane.fold
          </div>
          <div className="absolute bottom left-2 paper-card px-3 py-2 text-xs font-mono">
            <span className="text-aqua">●</span> 1024 folds
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold">{n}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{l}</div>
    </div>
  );
}
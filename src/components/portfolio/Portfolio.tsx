import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { About } from "./About";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { FloatingPaper } from "./FloatingPaper";
import { CustomCursor } from "../actions/CustomCursor";
import OrigamiJourney from "./OrigamiJourney";
import SkillsOrigamiWorld from "./SkillsOrigamiWorld";
import ProjectsOrigamiArchive from "./ProjectsOrigamiArchive";

export function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as "light" | "dark" | null;
    const prefersDark = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try { localStorage.setItem("theme", next); } catch { /* empty */ }
  };

  return (
    <div className="relative min-h-screen">
      <CustomCursor/>
      <FloatingPaper />
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <OrigamiJourney />
        <SkillsOrigamiWorld />
        <ProjectsOrigamiArchive />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
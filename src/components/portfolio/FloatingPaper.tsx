import { motion } from "framer-motion";

const shapes = [
  { top: "12%", left: "6%", size: 60, color: "var(--coral)", delay: 0 },
  { top: "30%", left: "85%", size: 90, color: "var(--aqua)", delay: 1.2 },
  { top: "65%", left: "10%", size: 110, color: "var(--lime)", delay: 0.6 },
  { top: "78%", left: "78%", size: 70, color: "var(--yellow-paper)", delay: 1.8 },
  { top: "45%", left: "50%", size: 50, color: "var(--coral)", delay: 2.4 },
];

export function FloatingPaper() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {shapes.map((s, i) => (
        <motion.svg
          key={i}
          width={s.size}
          height={s.size}
          viewBox="0 0 100 100"
          className="absolute opacity-[0.18]"
          style={{ top: s.top, left: s.left }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 12, -8, 0],
          }}
          transition={{ duration: 14 + i * 2, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        >
          <polygon points="50,5 95,40 75,95 25,95 5,40" fill={s.color} />
          <polygon points="50,5 95,40 50,50" fill={s.color} opacity="0.5" />
          <polygon points="50,5 5,40 50,50" fill={s.color} opacity="0.3" />
        </motion.svg>
      ))}
    </div>
  );
}
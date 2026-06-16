import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const words = [
  "Hello",
  "வணக்கம்",
  "やあ",
  "Hola",
  "Olà",
  "Bonjour",
  "안녕하세요",
];

const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.75,
    transition: {
      duration: 1,
      delay: 0.2,
    },
  },
};

const slideUp = {
  initial: {
    y: 0,
  },
  exit: {
    y: "-100vh",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.2,
    },
  },
};

interface OrigamiPreloaderProps {
  onComplete: () => void;
}

export default function OrigamiPreloader({
  onComplete,
}: OrigamiPreloaderProps) {
  const [index, setIndex] = useState(0);

  const [dimension, setDimension] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(
      () => {
        setIndex((prev) => prev + 1);
      },
      index === 0 ? 1000 : 150
    );

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${
    dimension.height + 300
  } 0 ${dimension.height} L0 0`;

  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${
    dimension.height
  } 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      d: targetPath,
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="preloader"
      variants={slideUp}
      initial="initial"
      exit="exit"
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            className="preloader-text"
            variants={opacity}
            initial="initial"
            animate="enter"
          >
            <span className="preloader-dot" />
            {words[index]}
          </motion.p>

          <svg className="preloader-svg">
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}
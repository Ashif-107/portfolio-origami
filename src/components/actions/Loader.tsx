import { motion } from 'framer-motion';

interface LoaderProps {
  progress: number;
}

export function Loader({ progress }: LoaderProps) {
  return (
    <div className="loader">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold mb-2 tracking-tight">A</h1>
        <p className="text-sm text-[#8892b0] mb-8">Loading experience...</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="loader-progress"
      >
        <motion.div
          className="loader-progress-bar"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="block mt-4 text-xs text-[#8892b0] font-mono"
      >
        {Math.round(progress)}%
      </motion.span>
    </div>
  );
}

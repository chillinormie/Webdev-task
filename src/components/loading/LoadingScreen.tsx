"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const LoadingCanvas = dynamic(
  () =>
    import("@/components/three/NeuralNetwork").then((m) => ({
      default: m.LoadingCanvas,
    })),
  { ssr: false }
);

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1.5;
      });
    }, 40);

    const phaseInterval = setInterval(() => {
      setPhase((p) => (p < 3 ? p + 1 : p));
    }, 1200);

    return () => {
      clearInterval(interval);
      clearInterval(phaseInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 h-full w-full">
          <LoadingCanvas />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <h1 className="font-orbitron text-4xl font-black tracking-[0.3em] text-highlight md:text-6xl">
              <span className="gradient-text">TECHFEST&apos;26</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              className="font-space-grotesk text-sm uppercase tracking-[0.4em] text-muted md:text-base"
            >
              30 Years of Innovation
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 2 ? 1 : 0 }}
              className="font-inter text-xs uppercase tracking-[0.3em] text-primary/70"
            >
              Loading Collective Intelligence...
            </motion.p>
          </motion.div>

          <div className="mt-8 w-64">
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-surface">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <p className="mt-3 font-mono text-xs text-muted">
              {Math.round(progress)}%
            </p>
          </div>
        </div>

        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
}

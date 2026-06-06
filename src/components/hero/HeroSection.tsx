"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { Countdown } from "@/components/ui/Countdown";

const NeuralNetworkCanvas = dynamic(
  () =>
    import("@/components/three/NeuralNetwork").then((m) => ({
      default: m.NeuralNetworkCanvas,
    })),
  { ssr: false }
);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      <NeuralNetworkCanvas showCore />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80 pointer-events-none" />

      <div className="relative z-10 flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mb-6"
        >
          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-primary/5 blur-3xl" />
            <h1 className="relative font-orbitron text-5xl font-black tracking-[0.2em] md:text-8xl lg:text-9xl">
              <span className="gradient-text text-glow">TECHFEST&apos;26</span>
            </h1>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-space-grotesk text-sm font-medium uppercase tracking-[0.3em] text-highlight md:text-lg"
        >
          30 Years of Human Imagination.
          <br />
          <span className="text-primary">One Emerging Intelligence.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-6 max-w-2xl font-inter text-sm leading-relaxed text-muted md:text-base"
        >
          Three decades of innovation converge into a future shaped by human
          creativity, artificial intelligence, and limitless possibilities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button id="join-network-btn" onClick={() => scrollTo("participation")}>
            Join the Network
          </Button>
          <Button variant="secondary" onClick={() => scrollTo("domains")}>
            Explore the Future
          </Button>
        </motion.div>

        <div className="mt-12">
          <Countdown />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-inter text-[10px] uppercase tracking-[0.3em] text-muted">
          Scroll to Awaken
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-primary/30 p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>

      <EnergyRings />
    </section>
  );
}

function EnergyRings() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/10"
          style={{
            width: `${200 + i * 120}px`,
            height: `${200 + i * 120}px`,
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

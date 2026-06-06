"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";

const NeuralNetworkCanvas = dynamic(
  () =>
    import("@/components/three/NeuralNetwork").then((m) => ({
      default: m.NeuralNetworkCanvas,
    })),
  { ssr: false }
);

export function FinalEvolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      id="evolution"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      <NeuralNetworkCanvas showCore={false} convergence={isInView ? 1 : 0} />

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/80 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.div
            className="mx-auto mb-12 h-32 w-32 md:h-48 md:w-48"
            animate={
              isInView
                ? {
                    boxShadow: [
                      "0 0 30px rgba(0,229,255,0.2)",
                      "0 0 80px rgba(139,92,246,0.4)",
                      "0 0 30px rgba(0,255,179,0.2)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="relative flex h-full w-full items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/30"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border border-secondary/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-8 rounded-full border border-accent/30"
                animate={{ rotate: 360, scale: [1, 0.9, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary via-secondary to-accent blur-sm md:h-12 md:w-12" />
            </div>
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-orbitron text-2xl font-bold leading-tight text-highlight md:text-4xl lg:text-5xl"
        >
          The Future Was Never Built by Machines.
          <br />
          <span className="gradient-text">It Was Built by Minds.</span>
          <br />
          <span className="text-primary">Connected.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto mt-8 max-w-xl font-inter text-base text-muted"
        >
          Thirty years of human imagination converge into this moment. The
          collective intelligence awakens. The emergence is complete.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="accent" className="text-base">
            Enter TECHFEST&apos;26
          </Button>
          <Button variant="primary" className="text-base">
            Register Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

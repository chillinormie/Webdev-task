"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { memoryNodes } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function MemoryArchive() {
  const [activeYear, setActiveYear] = useState<number | null>(null);

  return (
    <section id="memory" className="section-padding relative neural-grid">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Memory Archive"
          title="30 Years of Collective Memory"
          description="Each year exists as a glowing neural cluster — a capsule of innovation, achievement, and human imagination."
        />

        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 hidden h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent md:block" />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7 md:gap-6">
            {memoryNodes.map((node, index) => (
              <motion.button
                key={node.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() =>
                  setActiveYear(activeYear === node.year ? null : node.year)
                }
                className="group relative flex flex-col items-center"
              >
                <motion.div
                  className={`relative flex h-20 w-20 items-center justify-center rounded-full border transition-all duration-500 md:h-24 md:w-24 ${
                    activeYear === node.year
                      ? "border-primary bg-primary/20 shadow-[0_0_40px_rgba(0,229,255,0.4)]"
                      : "border-primary/20 bg-surface/50 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  animate={
                    activeYear === node.year
                      ? { boxShadow: ["0 0 20px rgba(0,229,255,0.3)", "0 0 40px rgba(0,229,255,0.5)", "0 0 20px rgba(0,229,255,0.3)"] }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="font-orbitron text-lg font-bold text-primary md:text-xl">
                    {node.year}
                  </span>
                  <motion.div
                    className="absolute inset-0 rounded-full border border-secondary/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
                <span className="mt-3 font-space-grotesk text-xs uppercase tracking-wider text-muted group-hover:text-text">
                  {node.title}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeYear !== null && (
            <MemoryCapsule
              key={activeYear}
              node={memoryNodes.find((n) => n.year === activeYear)!}
              onClose={() => setActiveYear(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function MemoryCapsule({
  node,
  onClose,
}: {
  node: (typeof memoryNodes)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="mt-12"
    >
      <div className="glass-panel relative overflow-hidden p-8 md:p-12">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 font-inter text-sm text-muted transition-colors hover:text-primary"
        >
          ✕ Close
        </button>

        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="md:w-1/3">
            <span className="font-orbitron text-6xl font-black text-primary/20">
              {node.year}
            </span>
            <h3 className="mt-2 font-orbitron text-2xl font-bold text-highlight">
              {node.title}
            </h3>
          </div>

          <div className="grid flex-1 gap-6 md:grid-cols-3">
            <CapsuleColumn title="Achievements" items={node.achievements} color="primary" />
            <CapsuleColumn title="Events" items={node.events} color="secondary" />
            <CapsuleColumn title="Milestones" items={node.milestones} color="accent" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CapsuleColumn({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: string;
}) {
  const colorMap: Record<string, string> = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
  };

  return (
    <div>
      <h4 className={`mb-3 font-space-grotesk text-xs uppercase tracking-[0.2em] ${colorMap[color]}`}>
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="font-inter text-sm text-muted"
          >
            <span className={`mr-2 ${colorMap[color]}`}>◆</span>
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { speakers } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function SpeakersSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="speakers" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-surface/20 to-background pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          label="Knowledge Nodes"
          title="Speakers"
          description="Visionaries represented as knowledge nodes in the network — each carrying decades of expertise and insight."
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(speaker.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative flex flex-col items-center"
            >
              <motion.div
                className="relative mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className="flex h-28 w-28 items-center justify-center rounded-full border-2 font-orbitron text-2xl font-bold"
                  style={{
                    borderColor: `${speaker.color}60`,
                    color: speaker.color,
                    background: `radial-gradient(circle, ${speaker.color}15 0%, transparent 70%)`,
                  }}
                >
                  {speaker.initials}
                </div>

                <motion.div
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: `${speaker.color}30` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {hoveredId === speaker.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -right-4 top-0 z-20 w-56 glass-panel p-4"
                  >
                    <p className="font-inter text-[10px] uppercase tracking-wider text-muted">
                      Session
                    </p>
                    <p className="mt-1 font-space-grotesk text-sm text-highlight">
                      {speaker.session}
                    </p>
                  </motion.div>
                )}
              </motion.div>

              <h3 className="font-space-grotesk text-lg font-semibold text-highlight">
                {speaker.name}
              </h3>
              <p className="mt-1 font-inter text-sm" style={{ color: speaker.color }}>
                {speaker.expertise}
              </p>

              <motion.div
                className="mt-3 h-[1px] w-12"
                style={{ background: speaker.color }}
                animate={{
                  width: hoveredId === speaker.id ? 48 : 24,
                  opacity: hoveredId === speaker.id ? 1 : 0.3,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

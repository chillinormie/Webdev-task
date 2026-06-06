"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { intelligenceDomains } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function IntelligenceDomains() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="domains" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          label="Intelligence Domains"
          title="Neural Modules of Innovation"
          description="Eight domains of knowledge, each a floating energy sphere connected to the central network of collective intelligence."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {intelligenceDomains.map((domain, index) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              onMouseEnter={() => setHoveredId(domain.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              <motion.div
                className="glass-panel relative cursor-pointer overflow-hidden p-6 transition-all duration-500"
                whileHover={{ scale: 1.03 }}
                animate={
                  hoveredId === domain.id
                    ? {
                        boxShadow: `0 0 40px ${domain.color}33`,
                        borderColor: `${domain.color}66`,
                      }
                    : { boxShadow: "0 0 0px transparent" }
                }
              >
                {hoveredId === domain.id && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      background: `radial-gradient(circle at center, ${domain.color}10 0%, transparent 70%)`,
                    }}
                  />
                )}

                <div className="relative z-10">
                  <motion.div
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border"
                    style={{ borderColor: `${domain.color}40` }}
                    animate={
                      hoveredId === domain.id
                        ? { scale: [1, 1.15, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span
                      className="text-2xl"
                      style={{ color: domain.color }}
                    >
                      {domain.icon}
                    </span>
                  </motion.div>

                  <h3 className="font-space-grotesk text-lg font-semibold text-highlight">
                    {domain.name}
                  </h3>

                  <motion.p
                    className="mt-2 font-inter text-sm text-muted"
                    animate={{
                      opacity: hoveredId === domain.id ? 1 : 0.7,
                    }}
                  >
                    {domain.description}
                  </motion.p>

                  {hoveredId === domain.id && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="mt-4 h-[2px] origin-left"
                      style={{
                        background: `linear-gradient(90deg, ${domain.color}, transparent)`,
                      }}
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

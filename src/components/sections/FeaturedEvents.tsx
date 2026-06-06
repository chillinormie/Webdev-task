"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { featuredEvents } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function FeaturedEvents() {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);

  return (
    <section id="events" className="section-padding relative neural-grid">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Mission Nodes"
          title="Featured Events"
          description="Each event is a mission within the larger intelligence system — a node of challenge, creativity, and competition."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featuredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              onMouseEnter={() => setActiveEvent(event.id)}
              onMouseLeave={() => setActiveEvent(null)}
              className="group relative"
            >
              <motion.div
                className="glass-panel relative h-full overflow-hidden p-6"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute right-4 top-4">
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-inter text-[10px] uppercase tracking-wider text-accent">
                    {event.status}
                  </span>
                </div>

                <div className="mb-4 flex items-center gap-3">
                  <motion.div
                    className="h-3 w-3 rounded-full bg-primary"
                    animate={
                      activeEvent === event.id
                        ? {
                            boxShadow: [
                              "0 0 5px #00E5FF",
                              "0 0 20px #00E5FF",
                              "0 0 5px #00E5FF",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-muted">
                    Mission Node
                  </span>
                </div>

                <h3 className="font-orbitron text-xl font-bold text-highlight">
                  {event.name}
                </h3>
                <p className="mt-1 font-space-grotesk text-sm text-primary">
                  {event.tagline}
                </p>
                <p className="mt-3 font-inter text-sm leading-relaxed text-muted">
                  {event.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="font-inter text-xs text-muted">Prize</span>
                  <span className="font-orbitron text-sm font-bold text-accent">
                    {event.prize}
                  </span>
                </div>

                {activeEvent === event.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent"
                    layoutId="event-highlight"
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

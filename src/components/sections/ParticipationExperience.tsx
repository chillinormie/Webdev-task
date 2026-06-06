"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ParticipationExperience() {
  const [joined, setJoined] = useState(false);
  const [nodes, setNodes] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleJoin = () => {
    setJoined(true);
    const newNode = {
      id: Date.now(),
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
    };
    setNodes((prev) => [...prev, newNode]);
  };

  return (
    <section id="participation" className="section-padding relative">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          label="Participation"
          title="Join the Collective"
          description="When you join the network, nearby particles gather. Energy accumulates. You become part of the emerging intelligence."
        />

        <motion.div
          className="relative mx-auto aspect-[16/9] max-w-3xl overflow-hidden rounded-2xl border border-primary/10 bg-surface/50"
          whileHover={{ borderColor: "rgba(0,229,255,0.3)" }}
        >
          <NetworkVisualization nodes={nodes} joined={joined} />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
            <AnimatePresence mode="wait">
              {!joined ? (
                <motion.div
                  key="invite"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-6 text-center"
                >
                  <p className="font-inter text-sm text-muted md:text-base">
                    Hover to feel the network respond. Click to connect.
                  </p>
                  <Button
                    id="join-collective-btn"
                    onClick={handleJoin}
                    className="text-base"
                  >
                    Join the Network
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="joined"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <motion.div
                    className="h-4 w-4 rounded-full bg-accent"
                    animate={{
                      boxShadow: [
                        "0 0 10px #00FFB3",
                        "0 0 40px #00FFB3",
                        "0 0 10px #00FFB3",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <p className="font-space-grotesk text-lg text-accent text-glow-accent">
                    You are now part of the collective.
                  </p>
                  <p className="font-inter text-sm text-muted">
                    Your node has connected to the network. Welcome to TECHFEST&apos;26.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NetworkVisualization({
  nodes,
  joined,
}: {
  nodes: { id: number; x: number; y: number }[];
  joined: boolean;
}) {
  const baseNodes = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
      })),
    []
  );

  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
      {baseNodes.map((node, i) =>
        baseNodes.slice(i + 1).map((other, j) => {
          const dist = Math.sqrt(
            (node.x - other.x) ** 2 + (node.y - other.y) ** 2
          );
          if (dist > 30) return null;
          return (
            <motion.line
              key={`${i}-${j}`}
              x1={node.x}
              y1={node.y}
              x2={other.x}
              y2={other.y}
              stroke="rgba(0,229,255,0.1)"
              strokeWidth="0.1"
              animate={
                joined
                  ? { strokeOpacity: [0.1, 0.4, 0.1] }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            />
          );
        })
      )}

      {baseNodes.map((node) => (
        <circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r="0.8"
          fill="rgba(0,229,255,0.4)"
        />
      ))}

      {nodes.map((node) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="0"
            fill="none"
            stroke="#00FFB3"
            strokeWidth="0.2"
            animate={{ r: [0, 15, 20], opacity: [0.8, 0.3, 0] }}
            transition={{ duration: 2 }}
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="1.2"
            fill="#00FFB3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          {baseNodes.map((base) => (
            <motion.line
              key={`conn-${node.id}-${base.id}`}
              x1={node.x}
              y1={node.y}
              x2={base.x}
              y2={base.y}
              stroke="rgba(0,255,179,0.3)"
              strokeWidth="0.15"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

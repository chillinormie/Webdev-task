"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { liveMetrics } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2000,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-orbitron text-3xl font-bold text-primary md:text-5xl">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function LiveData() {
  return (
    <section id="data" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <DataStreams />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          label="Live Intelligence"
          title="The Network by Numbers"
          description="Real-time metrics flowing through the collective intelligence — three decades quantified."
        />

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:gap-8">
          {liveMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel relative overflow-hidden p-6 text-center md:p-8"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              />

              <div className="relative z-10">
                <AnimatedCounter
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
                <p className="mt-2 font-space-grotesk text-xs uppercase tracking-[0.2em] text-muted md:text-sm">
                  {metric.label}
                </p>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: index * 0.15 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DataStreams() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{
            top: `${10 + i * 12}%`,
            width: "200%",
            left: "-50%",
          }}
          animate={{ x: ["0%", "50%"] }}
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

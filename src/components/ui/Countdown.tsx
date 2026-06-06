"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EVENT_DATE } from "@/data/content";
import { formatCountdown } from "@/lib/utils";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState(formatCountdown(0));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const diff = EVENT_DATE.getTime() - Date.now();
      setTimeLeft(formatCountdown(Math.max(0, diff)));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="flex gap-3 md:gap-4"
    >
      {units.map((unit, i) => (
        <div key={unit.label} className="flex flex-col items-center">
          <motion.div
            className="glass-panel flex h-14 w-14 items-center justify-center md:h-16 md:w-16"
            animate={{ boxShadow: ["0 0 10px rgba(0,229,255,0.1)", "0 0 20px rgba(0,229,255,0.3)", "0 0 10px rgba(0,229,255,0.1)"] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          >
            <span className="font-orbitron text-lg font-bold text-primary md:text-xl">
              {String(unit.value).padStart(2, "0")}
            </span>
          </motion.div>
          <span className="mt-1 font-inter text-[10px] uppercase tracking-wider text-muted">
            {unit.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

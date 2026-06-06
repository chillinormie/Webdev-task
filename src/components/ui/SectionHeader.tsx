"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`mb-16 flex flex-col gap-4 ${alignClass}`}
    >
      <span className="font-space-grotesk text-xs uppercase tracking-[0.4em] text-primary">
        {label}
      </span>
      <h2 className="font-orbitron text-3xl font-bold text-highlight md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl font-inter text-base text-muted md:text-lg">
          {description}
        </p>
      )}
      <div className="mt-2 h-[1px] w-24 bg-gradient-to-r from-primary via-secondary to-transparent" />
    </motion.div>
  );
}

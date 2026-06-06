"use client";

import { ReactNode, useState, useRef } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent";
  onClick?: () => void;
  className?: string;
  magnetic?: boolean;
  id?: string;
}

export function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  magnetic = true,
  id,
}: ButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const variantClasses = {
    primary: "energy-button",
    secondary: "energy-button-secondary",
    accent:
      "relative overflow-hidden rounded-full border border-accent/30 bg-surface/50 px-8 py-3 font-space-grotesk text-sm font-medium uppercase tracking-widest text-accent backdrop-blur-sm transition-all duration-500 hover:border-accent/60 hover:bg-accent/10 hover:text-highlight hover:shadow-[0_0_30px_rgba(0,255,179,0.3)]",
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.15, y: y * 0.15 });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rippleId = Date.now();
    setRipples((prev) => [...prev, { x, y, id: rippleId }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippleId));
    }, 1500);
    onClick?.();
  };

  return (
    <motion.button
      ref={btnRef}
      id={id}
      className={`${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileTap={{ scale: 0.95 }}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-primary/30 animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5,
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

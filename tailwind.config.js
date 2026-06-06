/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020203",
        surface: "#090B10",
        primary: "#00E5FF",
        secondary: "#8B5CF6",
        accent: "#00FFB3",
        highlight: "#FFFFFF",
        text: "#D1D5DB",
        muted: "#94A3B8",
        success: "#22C55E",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        "space-grotesk": ["var(--font-space-grotesk)", "sans-serif"],
        sora: ["var(--font-sora)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        ripple: "ripple 1.5s ease-out forwards",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.8" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(ellipse at center, rgba(0,229,255,0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

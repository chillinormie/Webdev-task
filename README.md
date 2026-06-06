# TECHFEST'26 — The Emergence

> 30 Years of Human Imagination. One Emerging Intelligence.

An immersive digital experience representing 30 years of collective innovation — built as a living neural network that evolves as you scroll.

**Designed & Developed by HASH**

## Experience

- **Loading Sequence** — Nodes emerge, connections form, collective intelligence loads
- **Hero** — Three.js neural particle field with Intelligence Core
- **Memory Archive** — Interactive year nodes (1996–2026) as memory capsules
- **Intelligence Domains** — 8 neural modules with hover pulse effects
- **Featured Events** — Mission nodes with live status indicators
- **Speakers** — Knowledge nodes with holographic panels
- **Live Data** — Animated metric counters with data streams
- **Participation** — "Join the Network" creates your node in the collective
- **Final Evolution** — Particle convergence into unified intelligence

## Tech Stack

- Next.js 15
- React 19 + TypeScript
- Tailwind CSS
- Framer Motion
- GSAP + ScrollTrigger
- Three.js + React Three Fiber
- Lenis Smooth Scroll

## Getting Started

```bash
cd techfest-26
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build
npm start
```

Deploy to Vercel:

```bash
npx vercel
```

## Color System

| Token     | Value     |
|-----------|-----------|
| Background| `#020203` |
| Surface   | `#090B10` |
| Primary   | `#00E5FF` |
| Secondary | `#8B5CF6` |
| Accent    | `#00FFB3` |

## Performance

- Dynamic imports for Three.js (no SSR)
- Optimized particle count (~1200)
- `dpr` capped at 1.5
- Lazy-loaded canvas components
- Lenis smooth scroll with RAF loop

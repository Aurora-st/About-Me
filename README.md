# Abhinav Singh — Cyber-Glass Portfolio (Next.js)

A futuristic, high-performance personal portfolio built with **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, and an interactive **Three.js** starfield background. The UI is designed as a "cyber HUD" experience with glassmorphism panels and an interactive mascot.


## Tech Stack

- **Next.js** (App Router)
- **React** / **TypeScript**
- **Tailwind CSS** + custom theme variables
- **Framer Motion** (animations, layout effects)
- **Three.js** (space particle background)
- **canvas-confetti** (mascot celebration)
- **lucide-react** (icons)

## What’s Implemented

### Page & Layout
- `src/app/layout.tsx`: global fonts and metadata for the portfolio (title/description/OpenGraph/Twitter).
- `src/app/page.tsx`: orchestrates the full single-page flow:
  - **Hero** (`src/sections/Hero.tsx`)
  - **About** (`src/sections/About.tsx`)
  - **Experience** (`src/sections/Experience.tsx`)
  - **Skills subsystem** (`src/sections/Skills.tsx`)
  - **Projects catalog** (`src/sections/Projects.tsx`)
  - **Achievements HUD** (`src/sections/Achievements.tsx`)
  - **Resume card** (`src/sections/Resume.tsx`)
  - **Contact console** (`src/sections/Contact.tsx`)

### Interactive Space Background
- `src/components/SpaceCanvas.tsx`
  - WebGL starfield (neon-cyan/violet/white additive points)
  - slow orbital motion + mouse parallax camera
  - floating glass wireframe geometries
  - auto-adjusts particle opacity when the theme toggles
  - clean disposal of Three.js resources on unmount

### Mascot Assistant (CyberTeddy)
- `src/components/CyberTeddy.tsx`
  - States: `idle`, `wave`, `sleep`, `celebrate`, `point`
  - Auto-sleeps after inactivity and wakes on interaction (mouse/scroll)
  - Celebration triggers confetti
  - “Point/scan” mode uses parallax look-at calculations
  - Floating speech bubble with dismiss option

### Navigation & Theme
- `src/components/Navbar.tsx`
  - Fixed glass navigation with active-section tracking
  - Smooth scrolling for anchor links
  - Mobile menu overlay
- `src/components/ThemeToggle.tsx`
  - Toggles a `light-theme` body class (updates CSS variables)

### Glass UI Primitives
- `src/components/GlassCard.tsx`
  - Glassmorphism styling
  - Optional 3D tilt + mouse glow highlight
  - Hover lift/scale + spring animations

- `src/components/Magnetic.tsx`
  - “Magnetic” hover attraction effect for links/buttons

## Sections Overview

- **Hero**: typewriter role titles + CTA buttons (projects, resume download, contact)
- **Skills**: interactive category selector with animated progress bars and floating tech “cloud”
- **Projects**: curated project cards with futuristic HUD preview frames and action links
- **Contact**: email copy card + social links + a simulated transmission form
  - Contact section triggers mascot reactions via intersection observer

## Getting Started

### Requirements
- Node.js (recommended LTS)

### Install
```bash
npm install
```

### Run (dev)
```bash
npm run dev
```

Open: **http://localhost:3000**

### Build & Production
```bash
npm run build
npm run start
```

### Lint
```bash
npm run lint
```


## Deployment

Deploy using any Next.js-friendly platform. The project is compatible with **Vercel** deployment conventions.

## Notes

- This is a UI/portfolio experience: some actions (e.g., contact submission) are intentionally simulated for the front-end demo.
- The theme system uses CSS variables and a `light-theme` class on `body`.


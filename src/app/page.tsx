"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SpaceCanvas from "@/components/SpaceCanvas";
import CyberTeddy, { TeddyState } from "@/components/CyberTeddy";
import ColorLabPanel from "@/components/ColorLabPanel";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Achievements from "@/sections/Achievements";
import Resume from "@/sections/Resume";
import Contact from "@/sections/Contact";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

function HomeContent() {
  // Shared state to orchestrate mascot reactions globally
  const [mascotState, setMascotState] = useState<TeddyState>("idle");

  const { isColorLabOpen, setIsColorLabOpen, primaryHue, glowIntensity } = useTheme();

  const teddyRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  React.useEffect(() => {
    if (!isColorLabOpen) {
      setCoords(null);
      return;
    }

    let active = true;
    const update = () => {
      if (!active) return;
      if (panelRef.current && teddyRef.current) {
        const panelRect = panelRef.current.getBoundingClientRect();
        const teddyRect = teddyRef.current.getBoundingClientRect();

        const x1 = panelRect.left + panelRect.width / 2;
        const y1 = panelRect.bottom;

        const x2 = teddyRect.left + teddyRect.width / 2;
        const y2 = teddyRect.top + 25;

        setCoords({ x1, y1, x2, y2 });
      }
      requestAnimationFrame(update);
    };

    update();
    return () => {
      active = false;
    };
  }, [isColorLabOpen]);

  const triggerMascotState = (state: TeddyState) => {
    setMascotState(state);
    // Automatically reset forceState to idle shortly after trigger 
    // to allow subsequent actions of same state to activate.
    if (state !== "idle" && state !== "sleep") {
      setTimeout(() => setMascotState("idle"), 100);
    }
  };

  return (
    <div className="relative min-h-screen w-full select-none overflow-hidden">
      {/* 3D Space Particle Background Canvas */}
      <SpaceCanvas />

      {/* Floating capsule navigation menu */}
      <Navbar />

      {/* Main Sections flow wrapper */}
      <main className="relative z-10 w-full flex flex-col">
        {/* 1. Hero Section (Anti-Gravity Landing) */}
        <Hero onTriggerMascot={triggerMascotState} />

        {/* 2. About Section (Profile logs) */}
        <About />

        {/* 3. Experience Timeline Section */}
        <Experience />

        {/* 4. Skills Subsystem Panel */}
        <Skills />

        {/* 5. Projects Showcase catalog */}
        <Projects />

        {/* 6. Coding Achievements Gamer stats */}
        <Achievements />

        {/* 7. Resume Action Card */}
        <Resume onTriggerMascot={triggerMascotState} />

        {/* 8. Contact Transmission console */}
        <Contact onTriggerMascot={triggerMascotState} />
      </main>

      {/* Interactive CyberTeddy Mascot Floating Assistant */}
      <CyberTeddy
        ref={teddyRef}
        forceState={mascotState}
        onStateChange={(state) => {
          if (state === "idle" && mascotState !== "idle") {
            setMascotState("idle");
          }
        }}
        isColorLabActive={isColorLabOpen}
        onMascotClick={() => setIsColorLabOpen(!isColorLabOpen)}
        primaryHue={primaryHue}
        glowIntensity={glowIntensity}
      />

      {/* Futuristic draggable AI Color Laboratory HUD Panel */}
      <ColorLabPanel
        ref={panelRef}
        isOpen={isColorLabOpen}
        onClose={() => setIsColorLabOpen(false)}
      />

      {/* Holographic Laser Connector Tether */}
      {coords && (
        <svg 
          className="fixed inset-0 w-full h-full pointer-events-none z-30" 
          style={{ mixBlendMode: "screen" }}
        >
          {/* Laser Glow Path Underneath */}
          <line
            x1={coords.x1}
            y1={coords.y1}
            x2={coords.x2}
            y2={coords.y2}
            stroke="var(--neon-cyan)"
            strokeWidth="5"
            opacity="0.15"
            className="blur-[2px]"
          />
          {/* Active Dashed Laser beam */}
          <line
            x1={coords.x1}
            y1={coords.y1}
            x2={coords.x2}
            y2={coords.y2}
            stroke="var(--neon-cyan)"
            strokeWidth="1.25"
            strokeDasharray="4,4"
            className="laser-tether-flow"
            opacity="0.65"
          />
          
          {/* Sockets/Points Anchors */}
          <circle cx={coords.x1} cy={coords.y1} r="2.5" fill="var(--neon-cyan)" className="animate-pulse" />
          <circle cx={coords.x2} cy={coords.y2} r="2.5" fill="var(--neon-cyan)" className="animate-pulse" />
        </svg>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}

"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SpaceCanvas from "@/components/SpaceCanvas";
import CyberTeddy, { TeddyState } from "@/components/CyberTeddy";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Achievements from "@/sections/Achievements";
import Resume from "@/sections/Resume";
import Contact from "@/sections/Contact";

export default function Home() {
  // Shared state to orchestrate mascot reactions globally
  const [mascotState, setMascotState] = useState<TeddyState>("idle");

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
        forceState={mascotState}
        onStateChange={(state) => {
          if (state === "idle" && mascotState !== "idle") {
            setMascotState("idle");
          }
        }}
      />
    </div>
  );
}

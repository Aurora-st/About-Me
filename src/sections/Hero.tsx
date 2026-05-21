"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Sparkles, Terminal } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import GlassCard from "@/components/GlassCard";

interface HeroProps {
  onTriggerMascot: (state: "idle" | "wave" | "sleep" | "celebrate" | "point") => void;
}

const titles = [
  "AI & Full Stack Developer",
  "Building Real-Time AI Systems",
  "MERN • FastAPI • Whisper • LangChain",
];

export default function Hero({ onTriggerMascot }: HeroProps) {
  const [currentTitleIdx, setCurrentTitleIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter Effect Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = titles[currentTitleIdx];
    const typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && typedText === fullText) {
      // Pause at full text
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setCurrentTitleIdx((prev) => (prev + 1) % titles.length);
    } else {
      timer = setTimeout(() => {
        setTypedText(
          isDeleting
            ? fullText.substring(0, typedText.length - 1)
            : fullText.substring(0, typedText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentTitleIdx]);

  // Command CyberTeddy to wave when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      onTriggerMascot("wave");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleResumeClick = () => {
    onTriggerMascot("celebrate");
  };

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-24 overflow-hidden pt-20"
    >
      {/* Sci-Fi Decorative Grid Backgrounds */}
      <div className="absolute inset-0 cyber-grid opacity-30 -z-10" />
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-neon-cyan/5 blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-neon-violet/5 blur-[150px] -z-10" />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 w-full max-w-7xl mx-auto">
        {/* Core Introductory Information */}
        <div className="lg:col-span-8 flex flex-col gap-6 text-left">
          {/* Active Cyber System Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 border border-neon-cyan/20 px-3 py-1 rounded-full w-fit bg-neon-cyan/5 select-none"
          >
            <Terminal className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase font-mono text-neon-cyan glow-text-cyan">
              SYSTEM_ACTIVE: IN_ORBIT
            </span>
          </motion.div>

          {/* Heading */}
          <div className="flex flex-col gap-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-400 font-display text-sm uppercase tracking-widest font-bold"
            >
              Creative Web Spaces
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-none"
            >
              Hi, I’m <span className="bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta bg-clip-text text-transparent glow-text-cyan">Abhinav Singh</span> 👋
            </motion.h1>
          </div>

          {/* Subtitle (Typewriter) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-8 flex items-center"
          >
            <span className="text-xl sm:text-2xl font-mono text-neon-cyan font-semibold flex items-center gap-2 glow-text-cyan">
              <Code className="w-5 h-5 text-neon-cyan" />
              {typedText}
              <span className="w-1.5 h-6 bg-neon-cyan animate-pulse inline-block" />
            </span>
          </motion.div>

          {/* Introduction paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-400 text-sm sm:text-lg max-w-xl leading-relaxed"
          >
            Computer Science student at BML Munjal University focused on AI systems, full-stack development, and futuristic UI experiences.
          </motion.p>

          {/* CTA Buttons Layout */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <Magnetic range={40} strength={0.3}>
              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, "#projects")}
                className="animated-border px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-xs pointer-events-auto cursor-pointer text-white flex items-center gap-2 glass-panel hover:shadow-[0_0_25px_rgba(0,242,254,0.3)] transition-all duration-300"
              >
                View Projects
                <ArrowRight className="w-4 h-4 text-neon-cyan" />
              </a>
            </Magnetic>

            <Magnetic range={40} strength={0.3}>
              <button
                onClick={handleResumeClick}
                className="px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-xs pointer-events-auto cursor-pointer text-black bg-white hover:bg-slate-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center gap-2"
              >
                Download Resume
                <Sparkles className="w-4 h-4 text-neon-violet animate-pulse" />
              </button>
            </Magnetic>

            <Magnetic range={35} strength={0.25}>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors duration-300"
              >
                Contact Me
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Immersive Anti-Gravity Visuals & HUD Dashboard Panel */}
        <div className="hidden lg:col-span-4 lg:flex flex-col gap-6 relative">
          {/* Floating glass micro-card 1 */}
          <GlassCard className="p-5 flex flex-col gap-1.5" delay={0.3} tiltEnabled glowEnabled>
            <span className="text-[10px] font-mono text-neon-cyan tracking-wider">ENGINEERING_MODULE</span>
            <h3 className="text-sm font-bold text-white uppercase font-display">MERN Stack Powerhouse</h3>
            <p className="text-xs text-slate-400 leading-normal">
              Highly scalable Node/Express microservices & highly reactive React/Next frontends.
            </p>
          </GlassCard>

          {/* Floating glass micro-card 2 (Levitating slightly offset) */}
          <GlassCard className="p-5 flex flex-col gap-1.5 translate-x-6" delay={0.5} tiltEnabled glowEnabled>
            <span className="text-[10px] font-mono text-neon-violet tracking-wider">CREATIVE_SYSTEMS</span>
            <h3 className="text-sm font-bold text-white uppercase font-display">Award-Winning Interfaces</h3>
            <p className="text-xs text-slate-400 leading-normal">
              Framer Motion and direct Three.js/WebGL assets rendering smooth 60fps animations.
            </p>
          </GlassCard>

          {/* Floating glass micro-card 3 */}
          <GlassCard className="p-5 flex flex-col gap-1.5" delay={0.7} tiltEnabled glowEnabled>
            <span className="text-[10px] font-mono text-neon-magenta tracking-wider">CORE_METRICS</span>
            <div className="grid grid-cols-2 gap-4 mt-1">
              <div>
                <span className="text-xl font-display font-extrabold text-white">4+ Years</span>
                <p className="text-[10px] text-slate-400">Experience</p>
              </div>
              <div>
                <span className="text-xl font-display font-extrabold text-white">99%</span>
                <p className="text-[10px] text-slate-400">Commit Accuracy</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Floating Scroll Indicator arrow */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 select-none pointer-events-none"
      >
        <span className="text-[9px] font-mono tracking-widest uppercase text-slate-500">Scroll Orbit</span>
        <div className="w-1 h-3 rounded-full bg-gradient-to-b from-neon-cyan to-neon-violet animate-pulse" />
      </motion.div>
    </section>
  );
}

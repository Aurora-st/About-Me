"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Sparkles, Terminal, Activity, Disc, Cpu } from "lucide-react";
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
    const typingSpeed = isDeleting ? 25 : 55;

    if (!isDeleting && typedText === fullText) {
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
      {/* Volumetric ambient background lighting overlay */}
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-neon-cyan/5 blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-neon-violet/5 blur-[150px] -z-10" />

      {/* Massive Hollow Background Typography Watermark */}
      <div className="absolute top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden -z-20 opacity-[0.025] dark:opacity-[0.045] w-full text-center">
        <h1 className="font-display font-black text-[22vw] leading-none uppercase tracking-[0.1em] text-transparent [-webkit-text-stroke:1px_#ffffff] select-none">
          ABHINAV
        </h1>
      </div>

      {/* Futuristic Floating Screen-Edge Diagnostic HUD Labels */}
      <div className="absolute top-28 left-6 sm:left-12 pointer-events-none select-none font-mono text-[7px] text-slate-500 uppercase tracking-[0.3em] flex flex-col gap-1 z-20">
        <span>COORD // 28.4595° N, 77.0266° E</span>
        <span className="text-neon-cyan">LOC // GURUGRAM, INDIA</span>
      </div>

      <div className="absolute top-28 right-6 sm:right-12 pointer-events-none select-none font-mono text-[7px] text-slate-500 uppercase tracking-[0.3em] flex flex-col items-end gap-1 z-20">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
          SYS_STAT // ACTIVE_STABLE
        </span>
        <span>CORE // MULTITHREAD_WEBGL</span>
      </div>

      <div className="absolute bottom-10 left-6 sm:left-12 pointer-events-none select-none font-mono text-[7px] text-slate-500 uppercase tracking-[0.3em] flex flex-col gap-1 z-20">
        <span>DEV_REV // V5.1_SENTIENT</span>
        <span>ENV // WINDOWS_D_DRIVE</span>
      </div>

      <div className="absolute bottom-10 right-6 sm:right-12 pointer-events-none select-none font-mono text-[7px] text-slate-500 uppercase tracking-[0.3em] flex flex-col items-end gap-1 z-20">
        <span>LIGHTHOUSE_AUDIT // 100%_SECURE</span>
        <span>KERNEL // 4.19_OS</span>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 w-full max-w-7xl mx-auto mt-6">
        {/* Core Introductory Information */}
        <div className="lg:col-span-8 flex flex-col gap-7 text-left">
          {/* Active Cyber System Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 border border-white/5 px-4 py-1.5 rounded bg-black/40 w-fit select-none font-mono text-[9px] tracking-[0.25em] text-slate-400"
          >
            <Cpu className="w-3 h-3 text-neon-cyan animate-pulse" />
            SYSTEM_ACTIVE // <span className="text-neon-cyan font-bold glow-text-cyan">IN_ORBIT</span>
          </motion.div>

          {/* Heading */}
          <div className="flex flex-col gap-3">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.35em] font-bold"
            >
              Creative Cyber Spaces
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-none uppercase"
            >
              Hi, I’m <span className="bg-gradient-to-r from-neon-cyan via-white to-neon-violet bg-clip-text text-transparent glow-text-cyan">Abhinav Singh</span>
            </motion.h1>
          </div>

          {/* Subtitle (Typewriter) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-8 flex items-center"
          >
            <span className="text-sm sm:text-base font-mono text-neon-cyan font-semibold flex items-center gap-2.5 glow-text-cyan tracking-widest uppercase">
              <Terminal className="w-4 h-4 text-neon-cyan" />
              {typedText}
              <span className="w-1.5 h-4.5 bg-neon-cyan animate-pulse inline-block" />
            </span>
          </motion.div>

          {/* Introduction paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-slate-400 text-xs sm:text-sm max-w-lg leading-relaxed font-mono uppercase tracking-wider"
          >
            Computer Science student at BML Munjal University focused on AI systems, full-stack development, and futuristic UI experiences.
          </motion.p>

          {/* CTA Buttons Layout */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <Magnetic range={30} strength={0.25}>
              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, "#projects")}
                className="cyber-button px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 pointer-events-auto cursor-pointer"
              >
                View Projects
                <ArrowRight className="w-3.5 h-3.5 text-neon-cyan" />
              </a>
            </Magnetic>

            <Magnetic range={30} strength={0.25}>
              <a
                href="https://drive.google.com/file/d/1T7PUkv_y5VZnCdTaOWExRzYxFpGSMZ7t/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeClick}
                className="cyber-button px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 pointer-events-auto cursor-pointer bg-white text-black hover:text-white"
              >
                View Resume
                <Sparkles className="w-3.5 h-3.5 text-neon-violet animate-pulse" />
              </a>
            </Magnetic>

            <Magnetic range={25} strength={0.2}>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="px-6 py-3.5 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500 hover:text-white flex items-center gap-1.5 transition-colors duration-500"
              >
                Contact Me
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Immersive Anti-Gravity Visuals & HUD Dashboard Panel */}
        <div className="hidden lg:col-span-4 lg:flex flex-col gap-6 relative">
          {/* Floating glass micro-card 1 */}
          <GlassCard className="p-6 flex flex-col gap-2 bg-black/40" delay={0.3} tiltEnabled glowEnabled>
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono text-neon-cyan tracking-[0.2em]">ENGINEERING_MODULE</span>
              <Disc className="w-3 h-3 text-neon-cyan animate-spin" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest font-display">MERN Stack Powerhouse</h3>
            <p className="text-[10px] text-slate-500 leading-relaxed font-mono uppercase">
              Highly scalable Node/Express microservices & highly reactive React/Next frontends.
            </p>
          </GlassCard>

          {/* Floating glass micro-card 2 (Levitating slightly offset) */}
          <GlassCard className="p-6 flex flex-col gap-2 translate-x-5 bg-black/40" delay={0.5} tiltEnabled glowEnabled>
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono text-neon-violet tracking-[0.2em]">CREATIVE_SYSTEMS</span>
              <Activity className="w-3 h-3 text-neon-violet animate-pulse" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest font-display">Award-Winning Interfaces</h3>
            <p className="text-[10px] text-slate-500 leading-relaxed font-mono uppercase">
              Framer Motion and direct Three.js/WebGL assets rendering smooth 60fps animations.
            </p>
          </GlassCard>

          {/* Floating glass micro-card 3 */}
          <GlassCard className="p-6 flex flex-col gap-2 bg-black/40" delay={0.7} tiltEnabled glowEnabled>
            <span className="text-[8px] font-mono text-neon-magenta tracking-[0.2em]">CORE_METRICS</span>
            <div className="grid grid-cols-2 gap-4 mt-1">
              <div>
                <span className="text-lg font-display font-black text-white tracking-widest">4+ Years</span>
                <p className="text-[8px] text-slate-500 font-mono uppercase">Experience</p>
              </div>
              <div>
                <span className="text-lg font-display font-black text-white tracking-widest">99%</span>
                <p className="text-[8px] text-slate-500 font-mono uppercase">Accuracy</p>
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 select-none pointer-events-none"
      >
        <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-slate-600">Scroll Orbit</span>
        <div className="w-[1px] h-4 bg-gradient-to-b from-neon-cyan to-neon-violet animate-pulse" />
      </motion.div>
    </section>
  );
}

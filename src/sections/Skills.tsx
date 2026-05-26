"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Code, Layout, Server, Database, Wrench, BookOpen, Layers } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface SkillItem {
  name: string;
  level: number; // percentage
  color: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  colorClass: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: <Code className="w-4 h-4" />,
    colorClass: "text-neon-cyan border-neon-cyan/20 bg-neon-cyan/5",
    skills: [
      { name: "C++", level: 85, color: "var(--neon-cyan)" },
      { name: "JavaScript", level: 92, color: "var(--neon-cyan)" },
      { name: "Python", level: 88, color: "var(--neon-cyan)" },
    ],
  },
  {
    title: "Frontend",
    icon: <Layout className="w-4 h-4" />,
    colorClass: "text-neon-violet border-neon-violet/20 bg-neon-violet/5",
    skills: [
      { name: "React", level: 94, color: "var(--neon-violet)" },
      { name: "HTML", level: 95, color: "var(--neon-violet)" },
      { name: "CSS", level: 90, color: "var(--neon-violet)" },
      { name: "TailwindCSS", level: 92, color: "var(--neon-violet)" },
    ],
  },
  {
    title: "Backend",
    icon: <Server className="w-4 h-4" />,
    colorClass: "text-neon-magenta border-neon-magenta/20 bg-neon-magenta/5",
    skills: [
      { name: "Node.js", level: 88, color: "var(--neon-magenta)" },
      { name: "Express.js", level: 88, color: "var(--neon-magenta)" },
      { name: "FastAPI", level: 85, color: "var(--neon-magenta)" },
    ],
  },
  {
    title: "Databases",
    icon: <Database className="w-4 h-4" />,
    colorClass: "text-neon-amber border-neon-amber/20 bg-neon-amber/5",
    skills: [
      { name: "MongoDB", level: 88, color: "var(--neon-amber)" },
      { name: "MySQL", level: 84, color: "var(--neon-amber)" },
      { name: "Pinecone", level: 82, color: "var(--neon-amber)" },
    ],
  },
  {
    title: "Tools",
    icon: <Wrench className="w-4 h-4" />,
    colorClass: "text-neon-cyan border-neon-cyan/20 bg-neon-cyan/5",
    skills: [
      { name: "Git", level: 92, color: "var(--neon-cyan)" },
      { name: "Firebase", level: 85, color: "var(--neon-cyan)" },
      { name: "Google OAuth", level: 86, color: "var(--neon-cyan)" },
    ],
  },
  {
    title: "Libraries",
    icon: <BookOpen className="w-4 h-4" />,
    colorClass: "text-neon-violet border-neon-violet/20 bg-neon-violet/5",
    skills: [
      { name: "LangChain", level: 86, color: "var(--neon-violet)" },
      { name: "NumPy", level: 80, color: "var(--neon-violet)" },
      { name: "Pandas", level: 82, color: "var(--neon-violet)" },
    ],
  },
  {
    title: "Coursework",
    icon: <Layers className="w-4 h-4" />,
    colorClass: "text-neon-magenta border-neon-magenta/20 bg-neon-magenta/5",
    skills: [
      { name: "DSA", level: 90, color: "var(--neon-magenta)" },
      { name: "DBMS", level: 86, color: "var(--neon-magenta)" },
      { name: "OS", level: 82, color: "var(--neon-magenta)" },
      { name: "OOPs", level: 88, color: "var(--neon-magenta)" },
      { name: "System Design", level: 84, color: "var(--neon-magenta)" },
    ],
  },
];

// Flat list for floating 3D tech icons clouds
const cloudSkills = [
  { name: "React", x: "10%", y: "15%", color: "var(--neon-cyan)", delay: 0.1 },
  { name: "FastAPI", x: "75%", y: "10%", color: "var(--neon-violet)", delay: 0.3 },
  { name: "MongoDB", x: "20%", y: "70%", color: "var(--neon-magenta)", delay: 0.2 },
  { name: "Python", x: "65%", y: "60%", color: "var(--neon-cyan)", delay: 0.4 },
  { name: "Whisper", x: "45%", y: "30%", color: "var(--neon-amber)", delay: 0.5 },
  { name: "Firebase", x: "15%", y: "45%", color: "var(--neon-amber)", delay: 0.25 },
  { name: "LangChain", x: "80%", y: "40%", color: "var(--neon-cyan)", delay: 0.35 },
  { name: "Pinecone", x: "50%", y: "80%", color: "var(--neon-magenta)", delay: 0.15 },
  { name: "Node.js", x: "82%", y: "82%", color: "var(--neon-violet)", delay: 0.45 },
  { name: "C++", x: "40%", y: "5%", color: "var(--neon-cyan)", delay: 0.2 },
];

export default function Skills() {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);

  const activeCategory = skillCategories[activeCategoryIdx];

  return (
    <section id="skills" className="relative min-h-screen py-24 px-6 sm:px-12 md:px-24 flex flex-col justify-center overflow-hidden">
      {/* HUD styling backing grids */}
      <div className="absolute inset-0 cyber-dots opacity-15 -z-10" />
      <div className="absolute top-[40%] right-[-5%] w-[450px] h-[450px] rounded-full bg-neon-cyan/5 blur-[150px] -z-10 animate-pulse" />
      <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-neon-violet/5 blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-neon-cyan"
          >
            <Cpu className="w-5 h-5 glow-text-cyan animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">TECH_CORE</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-extrabold text-white"
          >
            System Capabilities & <span className="bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta bg-clip-text text-transparent glow-text-cyan">Tech Arsenal</span>
          </motion.h2>
        </div>

        {/* Inventory System Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Category Selector Tabs (Left column) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest px-2 mb-1">
              Select Subsystem
            </span>
            {skillCategories.map((cat, idx) => {
              const isActive = idx === activeCategoryIdx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategoryIdx(idx)}
                  className={`pointer-events-auto cursor-pointer p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 ${
                    isActive
                      ? "glass-panel text-white font-bold"
                      : "border-white/5 bg-transparent text-slate-400 hover:text-white hover:border-white/10"
                  }`}
                  style={{
                    borderColor: isActive ? "rgba(0, 242, 254, 0.3)" : "",
                    boxShadow: isActive ? "0 0 15px rgba(0, 242, 254, 0.05)" : "",
                  }}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${
                        isActive ? "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/5" : "border-white/10 text-slate-500"
                      }`}
                    >
                      {cat.icon}
                    </div>
                    <span className="text-xs sm:text-sm tracking-wide uppercase font-semibold font-display">
                      {cat.title}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryDot"
                      className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Category Display Detail Panel (Middle Column) */}
          <GlassCard className="p-8 lg:col-span-4 flex flex-col justify-between min-h-[400px]">
            <div className="flex flex-col gap-6 w-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] font-mono text-neon-cyan tracking-widest font-bold">
                  DIAGNOSTICS: LOADED
                </span>
              </div>

              {/* Dynamic progress bars list */}
              <div className="flex flex-col gap-6 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategoryIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-5 w-full"
                  >
                    {activeCategory.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="flex flex-col gap-2 w-full">
                        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold tracking-wide font-mono text-slate-300">
                          <span className="text-white">{skill.name}</span>
                          <span style={{ color: skill.color }}>{skill.level}%</span>
                        </div>
                        {/* Progress track */}
                        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: sIdx * 0.05 }}
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(to right, ${skill.color}, var(--neon-violet))`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Custom cyber badge */}
            <div className="mt-6 border border-neon-cyan/10 bg-neon-cyan/5 p-4 rounded-xl flex items-start gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-neon-cyan shrink-0 mt-1 animate-ping" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-mono font-bold tracking-widest text-neon-cyan uppercase">
                  Principal Competence
                </span>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Constantly learning. Exploring system performance optimization algorithms & low-latency API handlers.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Interactive Anti-Gravity Tech Badge Cloud (Right Column) */}
          <GlassCard className="p-6 lg:col-span-4 min-h-[400px] flex flex-col justify-between relative overflow-hidden" tiltEnabled={false}>
            {/* Hologram aesthetic header */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Floating Tech Cloud
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            </div>

            {/* Interactive floating box area */}
            <div className="relative w-full h-[280px] bg-black/15 rounded-xl border border-white/5 flex items-center justify-center">
              {cloudSkills.map((tech, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    y: [0, -12, 0],
                    x: [0, 8, 0],
                  }}
                  transition={{
                    duration: 4 + idx * 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: tech.delay,
                  }}
                  style={{
                    position: "absolute",
                    left: tech.x,
                    top: tech.y,
                  }}
                  className="pointer-events-auto select-none"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.15,
                      boxShadow: `0 0 18px ${tech.color}45`,
                      borderColor: tech.color,
                      color: "#ffffff",
                    }}
                    style={{
                      borderColor: "rgba(255, 255, 255, 0.08)",
                      background: "rgba(10, 10, 30, 0.75)",
                    }}
                    className="cursor-pointer px-3 py-1.5 rounded-lg border text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest whitespace-nowrap transition-colors duration-300"
                  >
                    {tech.name}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Cyber instruction */}
            <span className="text-[9px] font-mono text-slate-500 text-center uppercase tracking-widest mt-4">
              Hover items to audit sub-system physics
            </span>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Shield, Zap, Sparkles, Terminal, Swords, ChevronRight, Activity } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface Achievement {
  title: string;
  metric: string;
  desc: string;
  icon: React.ReactNode;
  rarity: "LEGENDARY" | "EPIC" | "RARE" | "COMMON";
  color: string;
}

const achievements: Achievement[] = [
  {
    title: "Algorithm Knight",
    metric: "500+ Solved",
    desc: "Solved complex data structures & algorithm puzzles on LeetCode. Knight rating Top 3%.",
    icon: <Swords className="w-5 h-5" />,
    rarity: "LEGENDARY",
    color: "var(--neon-cyan)",
  },
  {
    title: "Git Grandmaster",
    metric: "2,500+ Commits",
    desc: "Maintained massive annual contribution logs. Handled version systems flawlessly.",
    icon: <Activity className="w-5 h-5" />,
    rarity: "EPIC",
    color: "var(--neon-violet)",
  },
  {
    title: "Clean Code Crusade",
    metric: "100% Audited",
    desc: "Rigorous ESLint, static types, and test integrations achieving 100% production ratings.",
    icon: <Shield className="w-5 h-5" />,
    rarity: "RARE",
    color: "var(--neon-magenta)",
  },
  {
    title: "Cosmic Deployer",
    metric: "15+ Launches",
    desc: "Pushed robust, highly-scaling next-gen products live to AWS, Vercel, and Kubernetes.",
    icon: <Zap className="w-5 h-5" />,
    rarity: "LEGENDARY",
    color: "var(--neon-amber)",
  },
];

// Interactive mock contribution grids definitions
const rows = 7;
const cols = 28;
const contributionGrid = Array.from({ length: rows * cols }, (_, i) => {
  // Use a deterministic seeded pseudorandom value to solve Next.js hydration mismatch
  const seed = i + 12345;
  const sinVal = Math.sin(seed) * 10000;
  const randVal = sinVal - Math.floor(sinVal);

  let color = "rgba(255, 255, 255, 0.03)"; // empty
  let level = 0;
  if (randVal > 0.85) {
    color = "rgba(0, 242, 254, 0.8)"; // bright cyan
    level = 4;
  } else if (randVal > 0.65) {
    color = "rgba(138, 43, 226, 0.6)"; // medium violet
    level = 3;
  } else if (randVal > 0.4) {
    color = "rgba(138, 43, 226, 0.35)"; // low violet
    level = 2;
  } else if (randVal > 0.2) {
    color = "rgba(0, 242, 254, 0.2)"; // low cyan
    level = 1;
  }
  return { color, level };
});

const commitLogMessages = [
  "Optimized React render tree cycles for 3D R3F space loaders.",
  "Configured Redis cache middleware parameters, boosting search queries.",
  "Engineered custom responsive SVG layers for CyberTeddy mascot structures.",
  "Integrated smart contract auth middleware hooks in Next.js controllers.",
  "Wrote exhaustive unit tests for system-design express.js endpoints.",
  "Patched JWT cookie transmission security in API gateway files.",
  "Refactored tailwind v4 theme variables to allow light theme adjustments.",
];

export default function Achievements() {
  const [selectedBadgeIdx, setSelectedBadgeIdx] = useState(0);
  const [selectedCommitIdx, setSelectedCommitIdx] = useState<number | null>(null);

  const activeBadge = achievements[selectedBadgeIdx];

  const handleCellHover = (index: number) => {
    // Select a semi-random commit message based on the coordinates
    setSelectedCommitIdx(index % commitLogMessages.length);
  };

  return (
    <section id="achievements" className="relative min-h-screen py-24 px-6 sm:px-12 md:px-24 overflow-hidden">
      {/* Sci-fi HUD backing overlays */}
      <div className="absolute inset-0 cyber-grid opacity-15 -z-10" />
      <div className="absolute top-[20%] left-[-5%] w-[450px] h-[450px] rounded-full bg-neon-violet/5 blur-[150px] -z-10 animate-pulse" />

      <div className="max-w-6xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-neon-magenta"
          >
            <Trophy className="w-5 h-5 glow-text-magenta animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">QUESTS_HUD</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-extrabold text-white"
          >
            Coding Achievements & <span className="bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta bg-clip-text text-transparent glow-text-magenta">Gamer Dashboard</span>
          </motion.h2>
        </div>

        {/* RPG Character Hub Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Character Profile Summary Card (Left Column) */}
          <GlassCard className="p-8 lg:col-span-4 flex flex-col justify-between min-h-[420px]" delay={0.1}>
            <div className="flex flex-col gap-6">
              {/* Profile HUD header */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-neon-cyan to-neon-violet opacity-30" />
                  <Terminal className="w-6 h-6 text-neon-cyan" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-display font-black text-lg text-white tracking-wider">ABHINAV SINGH</h3>
                  <span className="text-[10px] font-mono font-bold text-neon-cyan tracking-widest uppercase">
                    Level 99 MERN Overlord
                  </span>
                </div>
              </div>

              {/* RPG Stats table */}
              <div className="flex flex-col gap-3 font-mono text-xs border-y border-white/5 py-5 text-slate-400">
                <div className="flex justify-between">
                  <span>CLASS:</span>
                  <strong className="text-white">SYSTEMS_ENGINEER</strong>
                </div>
                <div className="flex justify-between">
                  <span>LEETCODE RATING:</span>
                  <strong className="text-neon-cyan font-bold">1985 (KNIGHT)</strong>
                </div>
                <div className="flex justify-between">
                  <span>GITHUB STREAK:</span>
                  <strong className="text-neon-violet">120+ DAYS ACTIVE</strong>
                </div>
                <div className="flex justify-between">
                  <span>COMPLETED PROJECTS:</span>
                  <strong className="text-neon-magenta">15 INVENTORY ITEMS</strong>
                </div>
              </div>

              {/* Progress bar towards next title */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                  <span>XP: Principal Architect</span>
                  <span>95% Completed</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5 border border-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "95%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta"
                  />
                </div>
              </div>
            </div>

            {/* RPG gaming style action button */}
            <a
              href="#contact"
              className="gaming-btn mt-6 w-full text-center py-3.5 bg-gradient-to-r from-neon-cyan to-neon-violet font-bold text-xs uppercase tracking-wider text-black transition-all hover:scale-105 pointer-events-auto cursor-pointer"
            >
              Initiate Contact Quest
            </a>
          </GlassCard>

          {/* Quest Badges Grid Selector (Middle Column) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest px-2">
              Unlocked Achievements
            </span>
            <div className="grid grid-cols-2 gap-4 flex-1">
              {achievements.map((badge, idx) => {
                const isSelected = idx === selectedBadgeIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedBadgeIdx(idx)}
                    className={`pointer-events-auto cursor-pointer p-5 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 ${
                      isSelected
                        ? "glass-panel text-white font-bold"
                        : "border-white/5 bg-black/25 text-slate-400 hover:text-slate-200 hover:border-white/10"
                    }`}
                    style={{
                      borderColor: isSelected ? badge.color : "",
                      boxShadow: isSelected ? `0 0 15px ${badge.color}15` : "",
                    }}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div
                        className="w-9 h-9 rounded-lg border flex items-center justify-center"
                        style={{
                          borderColor: isSelected ? `${badge.color}40` : "rgba(255,255,255,0.08)",
                          background: isSelected ? `${badge.color}10` : "rgba(255,255,255,0.02)",
                          color: isSelected ? badge.color : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {badge.icon}
                      </div>
                      <span
                        className="text-[8px] font-mono font-black px-2 py-0.5 rounded"
                        style={{
                          background: `${badge.color}15`,
                          color: badge.color,
                        }}
                      >
                        {badge.rarity}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 mt-4">
                      <span className="text-base font-extrabold font-display text-white">
                        {badge.metric}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider font-display">
                        {badge.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive GitHub Grid Simulator (Right Column) */}
          <GlassCard className="p-6 lg:col-span-4 flex flex-col justify-between min-h-[420px]" delay={0.3} tiltEnabled={false}>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Contribution Grid Simulator
                </span>
                <div className="flex items-center gap-1.5 text-[8px] font-mono text-slate-500 uppercase">
                  <div className="w-2 h-2 rounded bg-neon-cyan/20" />
                  <span>Low</span>
                  <div className="w-2 h-2 rounded bg-neon-cyan" />
                  <span>Max</span>
                </div>
              </div>

              {/* Compact grid cells */}
              <div
                className="grid gap-[2.5px] border border-white/5 bg-black/20 p-3 rounded-xl justify-center"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                }}
              >
                {contributionGrid.map((cell, idx) => (
                  <motion.div
                    key={idx}
                    className="w-[7px] h-[7px] sm:w-[9px] sm:h-[9px] rounded-[1.5px] cursor-crosshair transition-all pointer-events-auto"
                    style={{ backgroundColor: cell.color }}
                    whileHover={{
                      scale: 1.4,
                      boxShadow: "0 0 8px #ffffff80",
                      backgroundColor: "#ffffff",
                    }}
                    onMouseEnter={() => handleCellHover(idx)}
                  />
                ))}
              </div>
            </div>

            {/* Commit Log Display console */}
            <div className="border border-white/5 bg-black/40 rounded-xl p-4 mt-4 font-mono text-[10px] text-slate-400 min-h-[90px] flex flex-col gap-1.5 shadow-inner">
              <div className="flex items-center gap-1.5 text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping" />
                <span className="text-[8px] uppercase tracking-widest font-bold">SYSTEM_LOGS_CONSOLE</span>
              </div>
              <AnimatePresence mode="wait">
                {selectedCommitIdx !== null ? (
                  <motion.div
                    key={selectedCommitIdx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col gap-1 text-slate-300"
                  >
                    <span className="text-neon-cyan font-bold">commit @master:</span>
                    <p className="leading-relaxed">"{commitLogMessages[selectedCommitIdx]}"</p>
                  </motion.div>
                ) : (
                  <div className="text-slate-500 italic">
                    Hover contribution cells to view system commit logs...
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Details panel for the active badge */}
            <div className="mt-4 border-t border-white/5 pt-3.5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-neon-cyan/5 border border-neon-cyan/10 flex items-center justify-center shrink-0 mt-0.5 text-neon-cyan">
                {activeBadge.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                  Achievement Details ({activeBadge.title})
                </span>
                <p className="text-[10px] text-slate-400 leading-normal">
                  {activeBadge.desc}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

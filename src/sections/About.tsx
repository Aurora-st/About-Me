"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Terminal, Shield, BrainCircuit, Layers } from "lucide-react";
import GlassCard from "@/components/GlassCard";

export default function About() {
  return (
    <section id="about" className="relative min-h-screen py-24 px-6 sm:px-12 md:px-24 flex flex-col justify-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 cyber-dots opacity-20 -z-10" />
      <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-neon-magenta/5 blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto w-full z-10">
        {/* Section Title */}
        <div className="flex flex-col gap-2 mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-neon-cyan"
          >
            <User className="w-5 h-5 glow-text-cyan animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">ABOUT_AGENT</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-extrabold text-white"
          >
            Decoding The <span className="bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta bg-clip-text text-transparent glow-text-cyan">Developer Journey</span>
          </motion.h2>
        </div>

        {/* Bio Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Biography Card */}
          <GlassCard className="p-8 md:col-span-8 flex flex-col gap-5 justify-between min-h-[300px]" delay={0.1}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-neon-cyan" />
                </div>
                <h3 className="text-lg font-bold font-display uppercase text-white">Full-Stack Architect & Innovator</h3>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Computer Science student at BML Munjal University focused on AI systems, full-stack development, and futuristic UI experiences. Passionate about building real-time AI applications using Whisper, FastAPI, LangChain, and MERN stack technologies.
              </p>
            </div>
            
            {/* Terminal decorative output info */}
            <div className="border border-white/5 bg-black/40 rounded-xl p-4 mt-2 font-mono text-[11px] text-slate-400 flex flex-col gap-1.5 shadow-inner">
              <div className="flex items-center gap-1.5 text-slate-500">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <span className="w-2 h-2 rounded-full bg-green-500/80" />
                <span className="ml-1 text-[9px] uppercase tracking-wider">diagnostics.sh</span>
              </div>
              <p className="text-emerald-400">$ fetch developer --attributes</p>
              <p>{"{ name: 'Abhinav Singh', focus: 'AI & Full Stack', status: 'BMU CSE Student' }"}</p>
              <p className="text-neon-cyan">$ status --agent-mascot</p>
              <p className="text-neon-cyan">{"{ mascot: 'CyberTeddy 🧸', state: 'ONLINE', coordinates: 'D:\\portfolio' }"}</p>
            </div>
          </GlassCard>

          {/* Quick Metrics Card (Right Column) */}
          <GlassCard className="p-8 md:col-span-4 flex flex-col gap-6 justify-center bg-gradient-to-br from-neon-violet/5 to-transparent" delay={0.2}>
            <div className="flex flex-col items-center text-center gap-2">
              <span className="text-4xl font-extrabold font-display bg-gradient-to-r from-neon-cyan to-neon-violet bg-clip-text text-transparent glow-text-cyan">2023-27</span>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">B.Tech CSE Tenure</span>
            </div>
            <div className="w-full h-px bg-white/5" />
            <div className="flex flex-col items-center text-center gap-2">
              <span className="text-4xl font-extrabold font-display bg-gradient-to-r from-neon-violet to-neon-magenta bg-clip-text text-transparent glow-text-violet">5+</span>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">AI & Web Apps Built</span>
            </div>
            <div className="w-full h-px bg-white/5" />
            <div className="flex flex-col items-center text-center gap-2">
              <span className="text-4xl font-extrabold font-display bg-gradient-to-r from-neon-magenta to-neon-amber bg-clip-text text-transparent glow-text-magenta">1</span>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">ML Internship completed</span>
            </div>
          </GlassCard>

          {/* Technology Vision Panel */}
          <GlassCard className="p-6 md:col-span-4 flex flex-col gap-4" delay={0.3}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neon-violet/10 border border-neon-violet/20 flex items-center justify-center">
                <BrainCircuit className="w-4 h-4 text-neon-violet" />
              </div>
              <h3 className="text-base font-bold font-display uppercase text-white">AI + Intelligent Web</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pioneering intelligent websites. Integrating OpenAI, Gemini, and custom LLM API architectures into production-ready responsive dashboards.
            </p>
          </GlassCard>

          {/* Web3 & Crypto Panel */}
          <GlassCard className="p-6 md:col-span-4 flex flex-col gap-4" delay={0.4}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neon-magenta/10 border border-neon-magenta/20 flex items-center justify-center">
                <Layers className="w-4 h-4 text-neon-magenta" />
              </div>
              <h3 className="text-base font-bold font-display uppercase text-white">System Design Architecture</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designing modular microservices, REST & GraphQL APIs, Redis caching schemas, and robust schema constraints in MongoDB/PostgreSQL.
            </p>
          </GlassCard>

          {/* Security & Efficiency Panel */}
          <GlassCard className="p-6 md:col-span-4 flex flex-col gap-4" delay={0.5}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-neon-cyan" />
              </div>
              <h3 className="text-base font-bold font-display uppercase text-white">Robust Performance</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero tolerance for lag. Lighthouse auditing, lazy-loading optimizations, next-gen bundling configurations, and secure auth methods.
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { FolderGit2, ExternalLink, Cpu, LineChart, Globe, Terminal, ShieldAlert } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Magnetic from "@/components/Magnetic";

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  previewType: "ai" | "web3" | "meta"; // Determines what abstract vector HUD graphic to draw
  color: string;
}

const projects: Project[] = [
  {
    title: "StreamSpeech",
    category: "Real-time AI Platform",
    description: "Developing low-latency speech recognition pipeline using Whisper, FastAPI and WebSockets. Built live captioning, transcript storage and REST APIs for streaming.",
    tags: ["Python", "FastAPI", "Whisper", "WebSockets", "JavaScript"],
    github: "upcoming",
    live: "upcoming",
    previewType: "ai",
    color: "var(--neon-cyan)",
  },
  {
    title: "Kavin Sports Management Platform",
    category: "Full Stack MERN",
    description: "Built MERN sports management platform with role-based dashboards. Implemented Google OAuth authentication and analytics dashboard.",
    tags: ["React", "Node.js", "MongoDB", "Express", "Firebase Auth"],
    github: "https://github.com/Aurora-st/KSM-SPORTS-WEBSITE-kanvin",
    live: "upcoming",
    previewType: "web3",
    color: "var(--neon-magenta)",
  },
  {
    title: "TED Bus",
    category: "Travel & Community",
    description: "Production-ready travel platform with Google Maps route planner. Implemented multilingual support, dark mode and review system.",
    tags: ["MERN Stack", "Google Maps API"],
    github: "https://github.com/Aurora-st/ted-bus",
    live: "https://ted-bus-frontend.onrender.com/",
    previewType: "meta",
    color: "var(--neon-violet)",
  },
  {
    title: "MediBot AI",
    category: "Medical Chatbot (RAG)",
    description: "Built RAG chatbot using LangChain and Pinecone vector database. Implemented PDF parsing and semantic search pipeline.",
    tags: ["LangChain", "Pinecone", "FastAPI", "OpenAI"],
    github: "https://github.com/Aurora-st/Medical-Chatbot",
    live: "upcoming",
    previewType: "ai",
    color: "var(--neon-cyan)",
  },
  {
    title: "Nexify",
    category: "Android Service Booking",
    description: "Android home services booking app with Firebase backend. Implemented authentication and realtime booking workflow.",
    tags: ["Java", "XML", "Firebase"],
    github: "https://github.com/Aurora-st/Nexify",
    live: "upcoming",
    previewType: "web3",
    color: "var(--neon-magenta)",
  },
];

export default function Projects() {
  // Renders beautiful, futuristic HUD vector schemas instead of placeholders
  const renderPreviewFrame = (type: "ai" | "web3" | "meta", color: string) => {
    if (type === "ai") {
      return (
        <div className="relative w-full h-[180px] bg-black/45 border border-white/5 rounded flex items-center justify-center overflow-hidden font-mono text-[8px] text-slate-500">
          <div className="absolute inset-0 cyber-grid opacity-5" />
          {/* Animated AI Brain Node Schema */}
          <svg className="w-full h-full p-6" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="14" stroke={color} strokeWidth="0.8" fill="none" className="animate-pulse" />
            <circle cx="50" cy="50" r="3" fill="#ffffff" />
            <line x1="50" y1="36" x2="50" y2="18" stroke={color} strokeWidth="0.5" strokeDasharray="3" />
            <line x1="50" y1="64" x2="50" y2="82" stroke={color} strokeWidth="0.5" strokeDasharray="3" />
            <line x1="36" y1="50" x2="18" y2="50" stroke={color} strokeWidth="0.5" strokeDasharray="3" />
            <line x1="64" y1="50" x2="82" y2="50" stroke={color} strokeWidth="0.5" strokeDasharray="3" />
            <circle cx="50" cy="18" r="2" fill="var(--neon-violet)" />
            <circle cx="50" cy="82" r="2" fill="var(--neon-violet)" />
            <circle cx="18" cy="50" r="2" fill="var(--neon-violet)" />
            <circle cx="82" cy="50" r="2" fill="var(--neon-violet)" />
          </svg>
          <div className="absolute top-3 left-4 flex items-center gap-1.5 uppercase tracking-[0.2em] text-[6px] text-neon-cyan font-bold select-none">
            <Cpu className="w-2.5 h-2.5 text-neon-cyan" />
            AI_AGENT_METRICS // STATUS_OK
          </div>
        </div>
      );
    }
    if (type === "web3") {
      return (
        <div className="relative w-full h-[180px] bg-black/45 border border-white/5 rounded flex items-center justify-center overflow-hidden font-mono text-[8px] text-slate-500">
          <div className="absolute inset-0 cyber-dots opacity-10" />
          {/* Animated ledger candles charts */}
          <svg className="w-full h-full p-6" viewBox="0 0 100 100">
            <line x1="10" y1="70" x2="90" y2="70" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
            <rect x="22" y="35" width="8" height="35" fill="none" stroke={color} strokeWidth="0.8" />
            <line x1="26" y1="20" x2="26" y2="80" stroke={color} strokeWidth="0.8" />
            <rect x="46" y="20" width="8" height="50" fill="white" opacity="0.1" stroke={color} strokeWidth="0.8" />
            <line x1="50" y1="10" x2="50" y2="85" stroke={color} strokeWidth="0.8" />
            <rect x="70" y="45" width="8" height="25" fill="none" stroke={color} strokeWidth="0.8" />
            <line x1="74" y1="30" x2="74" y2="75" stroke={color} strokeWidth="0.8" />
          </svg>
          <div className="absolute top-3 left-4 flex items-center gap-1.5 uppercase tracking-[0.2em] text-[6px] text-neon-magenta font-bold select-none">
            <LineChart className="w-2.5 h-2.5 text-neon-magenta" />
            DB_FLOW // CONNECT_ESTABLISHED
          </div>
        </div>
      );
    }
    // Meta (3D spaces)
    return (
      <div className="relative w-full h-[180px] bg-black/45 border border-white/5 rounded flex items-center justify-center overflow-hidden font-mono text-[8px] text-slate-500">
        <div className="absolute inset-0 cyber-grid opacity-5" />
        {/* Animated concentric geometric systems */}
        <svg className="w-full h-full p-6" viewBox="0 0 100 100">
          <polygon points="50,15 80,75 20,75" stroke={color} strokeWidth="0.8" fill="none" />
          <polygon points="50,35 68,70 32,70" stroke="#ffffff" strokeWidth="0.5" fill="none" opacity="0.3" />
          <circle cx="50" cy="55" r="10" stroke={color} strokeWidth="0.8" fill="none" strokeDasharray="3" />
        </svg>
        <div className="absolute top-3 left-4 flex items-center gap-1.5 uppercase tracking-[0.2em] text-[6px] text-neon-violet font-bold select-none">
          <Globe className="w-2.5 h-2.5 text-neon-violet" />
          SPATIAL_HUD // ROTATION_ACTIVE
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="relative min-h-screen py-24 px-6 sm:px-12 md:px-24 overflow-hidden">
      {/* Visual cyber coordinate background anchors */}
      <div className="absolute inset-0 cyber-dots opacity-10 -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-neon-magenta/5 blur-[160px] -z-10 animate-pulse" />

      <div className="max-w-6xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-20 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-neon-cyan"
          >
            <FolderGit2 className="w-4 h-4 glow-text-cyan" />
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase">SYSTEM_ARCHIVE_LOGS</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight"
          >
            Selected <span className="bg-gradient-to-r from-neon-cyan via-white to-neon-violet bg-clip-text text-transparent glow-text-cyan">Creative Engineering</span>
          </motion.h2>
        </div>

        {/* Projects Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <GlassCard key={idx} className="p-6 flex flex-col justify-between h-full bg-black/35 relative" delay={idx * 0.12}>
              {/* Hollow Background Watermark of Project Index */}
              <div className="absolute bottom-4 right-4 pointer-events-none select-none font-display font-black text-7xl text-white/[0.015] dark:text-white/[0.025] leading-none">
                {`0${idx + 1}`}
              </div>

              <div className="flex flex-col gap-6">
                {/* Visual preview framework */}
                {renderPreviewFrame(proj.previewType, proj.color)}

                {/* Info and Titles */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono font-bold tracking-[0.2em] text-slate-500 uppercase">
                      {proj.category}
                    </span>
                    <span className="text-[7px] font-mono text-slate-600">ID // {`PRJ_${idx + 1}`}</span>
                  </div>
                  <h3 className="text-base font-extrabold font-display text-white uppercase tracking-wide">
                    {proj.title}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 leading-relaxed uppercase tracking-wider">
                    {proj.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-5 mt-6 relative z-10">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-[8px] font-bold font-mono uppercase bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:border-neon-cyan/40 hover:bg-neon-cyan/5 transition-all duration-300 tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions Row */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  {proj.github === "upcoming" ? (
                    <button
                      disabled
                      className="flex-1 py-2 px-4 rounded border border-white/5 text-slate-600 bg-white/[0.02] text-[9px] font-bold uppercase tracking-[0.18em] font-mono flex items-center justify-center gap-1.5 opacity-40 cursor-not-allowed select-none"
                    >
                      <Terminal className="w-3 h-3 text-slate-600" />
                      UPCOMING
                    </button>
                  ) : (
                    <Magnetic range={25} strength={0.2}>
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cyber-button flex-1 py-2 px-4 text-[9px] font-bold uppercase tracking-[0.18em] font-mono text-slate-300 hover:text-white flex items-center justify-center gap-1.5 pointer-events-auto cursor-pointer"
                      >
                        <Terminal className="w-3 h-3 text-neon-cyan" />
                        Codebase
                      </a>
                    </Magnetic>
                  )}

                  {proj.live === "upcoming" ? (
                    <button
                      disabled
                      className="flex-1 py-2 px-4 rounded border border-white/5 text-slate-600 bg-white/[0.02] text-[9px] font-bold uppercase tracking-[0.18em] font-mono flex items-center justify-center gap-1.5 opacity-40 cursor-not-allowed select-none"
                    >
                      <ExternalLink className="w-3 h-3" />
                      UPCOMING
                    </button>
                  ) : (
                    proj.live && (
                      <Magnetic range={25} strength={0.2}>
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cyber-button flex-1 py-2 px-4 bg-white text-black hover:text-white text-[9px] font-bold uppercase tracking-[0.18em] font-mono flex items-center justify-center gap-1.5 pointer-events-auto cursor-pointer"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Live Launch
                        </a>
                      </Magnetic>
                    )
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

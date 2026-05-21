"use client";

import React from "react";
import { motion } from "framer-motion";
import { FolderGit2, ExternalLink, Cpu, LineChart, Globe } from "lucide-react";
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
        <div className="relative w-full h-[180px] bg-black/30 border border-white/5 rounded-xl flex items-center justify-center overflow-hidden font-mono text-[8px] text-slate-500">
          <div className="absolute inset-0 cyber-grid opacity-10" />
          {/* Animated AI Brain Node Schema */}
          <svg className="w-full h-full p-4" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="12" stroke={color} strokeWidth="1" fill="none" className="animate-pulse" />
            <circle cx="50" cy="50" r="3" fill={color} />
            <line x1="50" y1="38" x2="50" y2="20" stroke={color} strokeWidth="0.5" strokeDasharray="2" />
            <line x1="50" y1="62" x2="50" y2="80" stroke={color} strokeWidth="0.5" strokeDasharray="2" />
            <line x1="38" y1="50" x2="20" y2="50" stroke={color} strokeWidth="0.5" strokeDasharray="2" />
            <line x1="62" y1="50" x2="80" y2="50" stroke={color} strokeWidth="0.5" strokeDasharray="2" />
            <circle cx="50" cy="20" r="2.5" fill="var(--neon-violet)" />
            <circle cx="50" cy="80" r="2.5" fill="var(--neon-violet)" />
            <circle cx="20" cy="50" r="2.5" fill="var(--neon-violet)" />
            <circle cx="80" cy="50" r="2.5" fill="var(--neon-violet)" />
          </svg>
          <div className="absolute top-2 left-3 flex items-center gap-1.5 uppercase tracking-widest text-[7px] text-neon-cyan font-bold select-none">
            <Cpu className="w-2.5 h-2.5 text-neon-cyan" />
            AGENT_COORDINATES: OK
          </div>
        </div>
      );
    }
    if (type === "web3") {
      return (
        <div className="relative w-full h-[180px] bg-black/30 border border-white/5 rounded-xl flex items-center justify-center overflow-hidden font-mono text-[8px] text-slate-500">
          <div className="absolute inset-0 cyber-dots opacity-15" />
          {/* Animated ledger candles charts */}
          <svg className="w-full h-full p-4" viewBox="0 0 100 100">
            <line x1="10" y1="70" x2="90" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="0.7" />
            <rect x="22" y="35" width="8" height="35" fill="none" stroke={color} strokeWidth="0.8" />
            <line x1="26" y1="20" x2="26" y2="80" stroke={color} strokeWidth="0.8" />
            <rect x="46" y="20" width="8" height="50" fill={color} opacity="0.35" stroke={color} strokeWidth="0.8" />
            <line x1="50" y1="10" x2="50" y2="85" stroke={color} strokeWidth="0.8" />
            <rect x="70" y="45" width="8" height="25" fill="none" stroke={color} strokeWidth="0.8" />
            <line x1="74" y1="30" x2="74" y2="75" stroke={color} strokeWidth="0.8" />
          </svg>
          <div className="absolute top-2 left-3 flex items-center gap-1.5 uppercase tracking-widest text-[7px] text-neon-magenta font-bold select-none">
            <LineChart className="w-2.5 h-2.5 text-neon-magenta" />
            LEDGER_FLOW: STREAMING
          </div>
        </div>
      );
    }
    // Meta (3D spaces)
    return (
      <div className="relative w-full h-[180px] bg-black/30 border border-white/5 rounded-xl flex items-center justify-center overflow-hidden font-mono text-[8px] text-slate-500">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        {/* Animated concentric geometric systems */}
        <svg className="w-full h-full p-4" viewBox="0 0 100 100">
          <polygon points="50,15 80,75 20,75" stroke={color} strokeWidth="0.8" fill="none" />
          <polygon points="50,35 68,70 32,70" stroke="var(--neon-cyan)" strokeWidth="0.5" fill="none" opacity="0.6" />
          <circle cx="50" cy="55" r="10" stroke={color} strokeWidth="0.8" fill="none" strokeDasharray="3" />
        </svg>
        <div className="absolute top-2 left-3 flex items-center gap-1.5 uppercase tracking-widest text-[7px] text-neon-violet font-bold select-none">
          <Globe className="w-2.5 h-2.5 text-neon-violet" />
          SPATIAL_ORBIT: ACTIVE
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="relative min-h-screen py-24 px-6 sm:px-12 md:px-24 overflow-hidden">
      {/* Visual cyber glow anchors */}
      <div className="absolute inset-0 cyber-dots opacity-15 -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-neon-magenta/5 blur-[160px] -z-10 animate-pulse" />

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
            <FolderGit2 className="w-5 h-5 glow-text-cyan animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">CATALOG_ARCHIVE</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-extrabold text-white"
          >
            Premium Selected <span className="bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta bg-clip-text text-transparent glow-text-cyan">Creative Engineering</span>
          </motion.h2>
        </div>

        {/* Projects Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <GlassCard key={idx} className="p-6 flex flex-col justify-between h-full" delay={idx * 0.15}>
              <div className="flex flex-col gap-5">
                {/* Visual preview framework */}
                {renderPreviewFrame(proj.previewType, proj.color)}

                {/* Info and Titles */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                    {proj.category}
                  </span>
                  <h3 className="text-lg font-bold font-display text-white">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase bg-white/5 border border-white/5 text-slate-300"
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
                      className="flex-1 py-2 px-4 rounded-lg text-slate-500 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider font-mono flex items-center justify-center gap-1.5 opacity-40 cursor-not-allowed select-none"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      UPCOMING
                    </button>
                  ) : (
                    <Magnetic range={30} strength={0.25}>
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 rounded-lg border border-white/10 hover:border-white/20 text-[10px] font-bold uppercase tracking-wider font-mono text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors pointer-events-auto cursor-pointer"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        Codebase
                      </a>
                    </Magnetic>
                  )}

                  {proj.live === "upcoming" ? (
                    <button
                      disabled
                      className="flex-1 py-2 px-4 rounded-lg text-slate-500 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider font-mono flex items-center justify-center gap-1.5 opacity-40 cursor-not-allowed select-none"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      UPCOMING
                    </button>
                  ) : (
                    proj.live && (
                      <Magnetic range={30} strength={0.25}>
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-4 rounded-lg text-black bg-white hover:bg-slate-200 text-[10px] font-bold uppercase tracking-wider font-mono flex items-center justify-center gap-1.5 transition-colors pointer-events-auto cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
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

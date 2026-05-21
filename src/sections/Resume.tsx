"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, Sparkles } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Magnetic from "@/components/Magnetic";

interface ResumeProps {
  onTriggerMascot: (state: "idle" | "wave" | "sleep" | "celebrate" | "point") => void;
}

export default function Resume({ onTriggerMascot }: ResumeProps) {
  const handleDownload = () => {
    // Command CyberTeddy to celebrate
    onTriggerMascot("celebrate");

    // Proactively mock download trigger
    console.log("Resume download initiated.");
  };

  return (
    <section id="resume" className="relative py-24 px-6 sm:px-12 md:px-24 overflow-hidden flex items-center justify-center">
      {/* Background neon glows */}
      <div className="absolute inset-0 cyber-dots opacity-10 -z-10" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-neon-cyan/5 blur-[130px] -z-10" />

      <div className="max-w-4xl mx-auto w-full z-10">
        <GlassCard className="p-8 sm:p-12 relative overflow-hidden" delay={0.1}>
          {/* Animated background concentric rings */}
          <div className="absolute right-[-100px] bottom-[-100px] w-[350px] h-[350px] rounded-full border border-white/5 pointer-events-none -z-10 animate-orbit" />
          <div className="absolute right-[-50px] bottom-[-50px] w-[200px] h-[200px] rounded-full border border-white/5 pointer-events-none -z-10 animate-orbit" style={{ animationDirection: "reverse" }} />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Context/Bio text */}
            <div className="md:col-span-8 flex flex-col gap-5 text-left">
              <div className="flex items-center gap-2 text-neon-cyan">
                <FileText className="w-5 h-5 glow-text-cyan animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-widest uppercase">CV_ARCHIVE_AUDIT</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white leading-tight">
                Want to know more about <span className="bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta bg-clip-text text-transparent glow-text-cyan">my experience?</span>
              </h2>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg">
                Download my complete professional CV to inspect my system engineering logs, AI systems workflows, Whisper speech-to-text models, and full-stack engineering credentials. 
                Let's launch premium scalable projects together!
              </p>
            </div>

            {/* CTA Trigger Button (Right column) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center">
              <Magnetic range={45} strength={0.3}>
                <button
                  onClick={handleDownload}
                  className="pointer-events-auto cursor-pointer p-8 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 flex flex-col items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,242,254,0.25)] hover:border-neon-cyan/40 transition-all duration-300 relative group"
                  style={{
                    width: "160px",
                    height: "160px",
                  }}
                >
                  {/* Hologram loading lines */}
                  <div className="absolute inset-2 rounded-full border border-white/5 border-dashed animate-spin duration-[10s]" />
                  <div className="absolute inset-4 rounded-full border border-neon-violet/10 border-dotted animate-spin duration-[6s]" style={{ animationDirection: "reverse" }} />

                  <Download className="w-8 h-8 text-neon-cyan group-hover:scale-110 group-hover:translate-y-0.5 transition-transform duration-300" />
                  <span className="text-[10px] font-bold tracking-widest uppercase font-mono text-white mt-1 select-none">
                    Download CV
                  </span>
                  
                  {/* Tiny sparkles floating */}
                  <Sparkles className="absolute top-4 right-4 w-4 h-4 text-neon-magenta animate-pulse" />
                </button>
              </Magnetic>
              
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-4 select-none">
                Mascot celebration awaits 🎉
              </span>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

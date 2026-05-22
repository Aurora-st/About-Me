"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Copy, Check, Terminal } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Magnetic from "@/components/Magnetic";

interface ContactProps {
  onTriggerMascot: (state: "idle" | "wave" | "sleep" | "celebrate" | "point") => void;
}

export default function Contact({ onTriggerMascot }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const emailAddress = "abhinavsingh.official05@gmail.com";

  // Trigger mascot waving goodbye when contact section comes fully into viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onTriggerMascot("wave");
        }
      },
      { threshold: 0.5 }
    );

    const el = document.querySelector("#contact");
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    onTriggerMascot("celebrate");
    setTimeout(() => setCopied(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate API transmission lag
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      onTriggerMascot("celebrate");

      // Reset success prompt
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1800);
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 px-6 sm:px-12 md:px-24 flex flex-col justify-center overflow-hidden">
      {/* Sci-fi HUD and particle backgrounds */}
      <div className="absolute inset-0 cyber-grid opacity-15 -z-10" />
      <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-neon-cyan/5 blur-[160px] -z-10" />
      <div className="absolute top-[10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-neon-violet/5 blur-[120px] -z-10 animate-pulse" />

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
            <Mail className="w-5 h-5 glow-text-cyan animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">TRANSMISSION_NODE</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-extrabold text-white"
          >
            Establish Contact & <span className="bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta bg-clip-text text-transparent glow-text-cyan">Initiate Orbit</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Direct Channels (Left column) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest px-1">
                Direct Subsystems
              </span>

              {/* Email Copy Card */}
              <GlassCard className="p-6 flex flex-col gap-4">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  Audible Address
                </span>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-neon-cyan/5 border border-neon-cyan/15 flex items-center justify-center text-neon-cyan">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wide select-all">
                      {emailAddress}
                    </span>
                  </div>

                  <Magnetic range={30} strength={0.25}>
                    <button
                      onClick={handleCopyEmail}
                      className="pointer-events-auto cursor-pointer p-2.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15 text-slate-400 hover:text-white transition-colors"
                      aria-label="Copy Email address"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </Magnetic>
                </div>
              </GlassCard>

              {/* GitHub Link Card */}
              <GlassCard className="p-6 flex flex-col gap-4">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  Version Terminal
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-neon-violet/5 border border-neon-violet/15 flex items-center justify-center text-neon-violet">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wide uppercase">
                      github.com/Aurora-st
                    </span>
                  </div>

                  <Magnetic range={30} strength={0.25}>
                    <a
                      href="https://github.com/Aurora-st"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto cursor-pointer px-4 py-2 rounded-lg border border-neon-violet/20 bg-neon-violet/5 text-[10px] font-bold font-mono text-neon-violet uppercase tracking-widest hover:bg-neon-violet/10 transition-all duration-300"
                      onMouseEnter={() => onTriggerMascot("point")}
                    >
                      Browse
                    </a>
                  </Magnetic>
                </div>
              </GlassCard>

              {/* LinkedIn Link Card */}
              <GlassCard className="p-6 flex flex-col gap-4">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  Synergy Node
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-neon-magenta/5 border border-neon-magenta/15 flex items-center justify-center text-neon-magenta">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wide uppercase">
                      linkedin/in/abhinav
                    </span>
                  </div>

                  <Magnetic range={30} strength={0.25}>
                    <a
                      href="https://www.linkedin.com/in/abhinav-singh-cs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto cursor-pointer px-4 py-2 rounded-lg border border-neon-magenta/20 bg-neon-magenta/5 text-[10px] font-bold font-mono text-neon-magenta uppercase tracking-widest hover:bg-neon-magenta/10 transition-all duration-300"
                      onMouseEnter={() => onTriggerMascot("point")}
                    >
                      Connect
                    </a>
                  </Magnetic>
                </div>
              </GlassCard>
            </div>

            {/* Direct console quote log */}
            <div className="border border-white/5 bg-black/40 rounded-xl p-5 font-mono text-[10px] text-slate-400 flex flex-col gap-1.5 shadow-inner">
              <div className="flex items-center gap-1.5 text-slate-500">
                <span className="w-2 h-2 rounded bg-neon-violet" />
                <span className="text-[8px] uppercase tracking-widest font-black">MESSENGER_OUTPUT.log</span>
              </div>
              <p className="text-slate-300">"Thank you for visiting! I am always open for remote leadership briefs, full-time engineering sprints, or next-generation web consults. Let's conquer the anti-gravity digital frontier together!"</p>
              <span className="text-slate-500 text-[8px] tracking-wider mt-2">© 2026 ABHINAV SINGH. ALL RIGHTS SECURED.</span>
            </div>
          </div>

          {/* Contact Form Console (Right column) */}
          <GlassCard className="p-8 lg:col-span-7 flex flex-col justify-between min-h-[500px]" delay={0.2}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-neon-cyan tracking-widest font-bold">
                  TRANSMISSION_INPUTS
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
              </div>

              {/* Name field */}
              <div className="flex flex-col gap-1.5 relative w-full">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                  Identify Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Elon Musk"
                  className="w-full bg-black/35 border border-white/5 focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,242,254,0.15)] rounded-xl py-3 px-4 text-xs sm:text-sm text-white placeholder-slate-600 outline-none transition-all duration-300"
                  onFocus={() => onTriggerMascot("point")}
                />
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-1.5 relative w-full">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                  Comm Channel Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. client@enterprise.com"
                  className="w-full bg-black/35 border border-white/5 focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,242,254,0.15)] rounded-xl py-3 px-4 text-xs sm:text-sm text-white placeholder-slate-600 outline-none transition-all duration-300"
                  onFocus={() => onTriggerMascot("point")}
                />
              </div>

              {/* Subject field */}
              <div className="flex flex-col gap-1.5 relative w-full">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                  Transmission Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="e.g. Elite System Collaboration"
                  className="w-full bg-black/35 border border-white/5 focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,242,254,0.15)] rounded-xl py-3 px-4 text-xs sm:text-sm text-white placeholder-slate-600 outline-none transition-all duration-300"
                  onFocus={() => onTriggerMascot("point")}
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-1.5 relative w-full">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                  Message Payload *
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Type your transmission parameters..."
                  className="w-full bg-black/35 border border-white/5 focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,242,254,0.15)] rounded-xl py-3 px-4 text-xs sm:text-sm text-white placeholder-slate-600 outline-none transition-all duration-300 resize-none"
                  onFocus={() => onTriggerMascot("point")}
                />
              </div>

              {/* Status Alert logs */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 border border-emerald-500/20 bg-emerald-500/5 rounded-xl flex items-center gap-2.5 text-xs font-mono font-bold text-emerald-400"
                  >
                    <Terminal className="w-4 h-4 animate-pulse" />
                    <span>SUCCESS: MESSAGE TRANSMITTED TO ORBITAL GRID ⚡</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button wrapper */}
              <div className="flex justify-end mt-4">
                <Magnetic range={35} strength={0.25}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="pointer-events-auto cursor-pointer flex items-center gap-2 px-8 py-3.5 bg-white text-black hover:bg-slate-200 font-bold uppercase tracking-wider text-xs rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        Transmitting...
                        <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      </>
                    ) : (
                      <>
                        Transmit Payload
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

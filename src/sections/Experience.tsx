"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2, Star } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface Job {
  role: string;
  company: string;
  duration: string;
  description: string[];
  skills: string[];
  glowColor: string; // Tailwind glow class helper
}

const experiences: Job[] = [
  {
    role: "B.Tech in Computer Science and Engineering",
    company: "BML Munjal University",
    duration: "2023 - 2027",
    description: [
      "Pioneering coursework in Data Structures & Algorithms (DSA), Database Management Systems (DBMS), Operating Systems (OS), Object-Oriented Programming (OOPs), and System Design.",
      "Developing advanced web applications and AI tools in an elite academic environment focused on cutting-edge research.",
    ],
    skills: ["DSA", "DBMS", "OS", "OOPs", "System Design", "C++", "Python"],
    glowColor: "var(--neon-cyan)",
  },
  {
    role: "Machine Learning Intern",
    company: "Prodigy Infotech",
    duration: "Jul 2024 - Aug 2024",
    description: [
      "Built ML models for price prediction, gesture recognition and segmentation.",
      "Developed a calorie detection application utilizing computer vision methodologies.",
    ],
    skills: ["Machine Learning", "Computer Vision", "Python", "Gesture Recognition", "Segmentation"],
    glowColor: "var(--neon-violet)",
  },
  {
    role: "Team Lead",
    company: "EIS Conference",
    duration: "2024",
    description: [
      "Led comprehensive event execution, volunteer coordination, and precise event scheduling for attendees and speakers.",
    ],
    skills: ["Leadership", "Event Execution", "Coordination", "Scheduling"],
    glowColor: "var(--neon-magenta)",
  },
  {
    role: "Event Organizer",
    company: "PitchFest",
    duration: "2024",
    description: [
      "Organized startup-themed competition with prominent speakers, sponsor coordination, and stage operations management.",
    ],
    skills: ["Event Organization", "Startup Outreach", "Sponsorship Coordination", "Public Speaking"],
    glowColor: "var(--neon-amber)",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative min-h-screen py-24 px-6 sm:px-12 md:px-24 overflow-hidden">
      {/* Visual cyber mesh backings */}
      <div className="absolute inset-0 cyber-grid opacity-15 -z-10" />
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-neon-cyan/5 blur-[150px] -z-10 animate-pulse" />

      <div className="max-w-5xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-20 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-neon-violet"
          >
            <Briefcase className="w-5 h-5 glow-text-violet animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">TIMELINE_TRACKER</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-extrabold text-white"
          >
            Professional <span className="bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta bg-clip-text text-transparent glow-text-violet">Milestone Log</span>
          </motion.h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-8 sm:pl-12 flex flex-col gap-16">
          {/* Main glowing track line */}
          <div className="absolute top-0 left-[-1.5px] bottom-0 w-[3px] bg-gradient-to-b from-neon-cyan via-neon-violet to-neon-magenta" />

          {experiences.map((job, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Bullet Node */}
              <div
                className="absolute left-[-42px] sm:left-[-58px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 bg-[#030014] z-20 flex items-center justify-center transition-all duration-500 group-hover:scale-125"
                style={{
                  borderColor: job.glowColor,
                  boxShadow: `0 0 15px ${job.glowColor}50`,
                }}
              >
                <Star
                  className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5"
                  style={{
                    color: job.glowColor,
                    filter: `drop-shadow(0 0 5px ${job.glowColor})`,
                  }}
                />
              </div>

              {/* Job Details Card */}
              <GlassCard className="p-6 sm:p-8" delay={idx * 0.15}>
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
                      {job.company}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                      {job.role}
                    </h3>
                  </div>

                  <div
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-semibold font-mono"
                    style={{
                      borderColor: `${job.glowColor}30`,
                      color: job.glowColor,
                      background: `${job.glowColor}05`,
                    }}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    {job.duration}
                  </div>
                </div>

                {/* Key Accomplishments bullets */}
                <ul className="flex flex-col gap-3.5 text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
                  {job.description.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: job.glowColor }}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Skills Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wider font-mono bg-white/5 border border-white/10 text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

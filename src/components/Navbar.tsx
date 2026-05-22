"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Magnetic from "./Magnetic";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track active section and navbar blur backgrounds on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section tracking logic
      const sections = navItems.map((item) => {
        const el = document.querySelector(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          return {
            id: item.href.substring(1),
            // Check if section is closest to top viewport boundary
            offset: Math.abs(rect.top),
          };
        }
        return null;
      });

      const validSections = sections.filter(Boolean) as { id: string; offset: number }[];
      if (validSections.length > 0) {
        // Sort to find minimum offset
        const closest = validSections.sort((a, b) => a.offset - b.offset)[0];
        setActiveSection(closest.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 flex items-center justify-between px-6 md:px-12 py-5 ${
          scrolled
            ? "backdrop-blur-xl bg-background/60 border-b border-white/5 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent"
        }`}
      >
        {/* Cinematic Technical Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 select-none"
        >
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="font-display text-base font-black tracking-widest bg-gradient-to-r from-neon-cyan via-white to-neon-violet bg-clip-text text-transparent glow-text-cyan hover:tracking-[0.25em] transition-all duration-500 uppercase"
          >
            Abhinav.OS
          </a>
        </motion.div>

        {/* Desktop Navbar Links */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-1 glass-panel px-3 py-1 rounded border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] bg-[rgba(10,10,12,0.65)]"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <Magnetic key={item.href} range={25} strength={0.2}>
                <a
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative px-4 py-2 text-[10px] font-bold tracking-[0.15em] uppercase transition-colors duration-500 select-none ${
                    isActive ? "text-white" : "text-slate-500 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavScanner"
                      className="absolute inset-0 border-l border-r border-neon-cyan/50 flex flex-col justify-between"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    >
                      {/* Top Horizontal Laser Line */}
                      <span className="w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />
                      {/* Bottom Horizontal Laser Line */}
                      <span className="w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />
                    </motion.div>
                  )}
                  {item.label}
                </a>
              </Magnetic>
            );
          })}
        </motion.nav>

        {/* Actions Menu (Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-center gap-5"
        >
          <ThemeToggle />
          <Magnetic range={30} strength={0.25}>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="cyber-button px-6 py-2 text-[9px] font-black uppercase tracking-[0.2em] pointer-events-auto cursor-pointer flex items-center gap-2"
            >
              Initialize Quest
              <ArrowUpRight className="w-3 h-3 text-neon-cyan" />
            </a>
          </Magnetic>
        </motion.div>

        {/* Mobile controls & Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="glass-panel p-2.5 rounded border border-white/5 text-white pointer-events-auto cursor-pointer"
            aria-label="Toggle Mobile navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop & Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-3xl md:hidden pt-28 pb-8 px-8 flex flex-col justify-between"
          >
            {/* Tech cyber grid backing */}
            <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none -z-10" />

            <div className="flex flex-col gap-6 mt-4">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.a
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`font-display text-lg font-black tracking-widest py-2 flex items-center justify-between border-b border-white/5 uppercase transition-colors duration-300 ${
                      isActive ? "text-neon-cyan glow-text-cyan" : "text-slate-500"
                    }`}
                  >
                    {item.label}
                    <ArrowUpRight className={`w-5 h-5 opacity-20 ${isActive ? "opacity-100 text-neon-cyan" : ""}`} />
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-4 mt-8"
            >
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="cyber-button w-full text-center py-4 text-[10px] font-black uppercase tracking-[0.2em]"
              >
                Hire Abhinav
              </a>
              <p className="text-center text-[8px] text-slate-600 font-mono tracking-widest uppercase">
                Silicon Valley Grade Systems Engineer ⚡
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

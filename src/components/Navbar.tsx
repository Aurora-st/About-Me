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
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 flex items-center justify-between px-6 md:px-12 py-4 ${
          scrolled ? "backdrop-blur-md bg-background/50 border-b border-white/5 py-3" : ""
        }`}
      >
        {/* Glowing Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 select-none"
        >
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta bg-clip-text text-transparent glow-text-cyan hover:scale-105 transition-transform duration-300"
          >
            ABHINAV.DEV
          </a>
        </motion.div>

        {/* Desktop Navbar Links */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-1.5 glass-panel px-4 py-1.5 rounded-full border border-white/5 shadow-inner"
          style={{
            background: "rgba(10, 10, 30, 0.3)",
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <Magnetic key={item.href} range={35} strength={0.25}>
                <a
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300 select-none ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-violet/20 border border-neon-cyan/20 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
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
          className="hidden md:flex items-center gap-4"
        >
          <ThemeToggle />
          <Magnetic range={40} strength={0.3}>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="relative px-5 py-2.5 rounded-full overflow-hidden text-xs font-bold uppercase tracking-wider text-black bg-white group flex items-center gap-1 border border-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] pointer-events-auto cursor-pointer"
            >
              Contact
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Magnetic>
        </motion.div>

        {/* Mobile controls & Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="glass-panel p-2.5 rounded-full border border-white/5 text-white pointer-events-auto cursor-pointer"
            aria-label="Toggle Mobile navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-24 pb-8 px-6 flex flex-col justify-between"
          >
            {/* Tech cyber grid backing */}
            <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none -z-10" />

            <div className="flex flex-col gap-5 mt-6">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.a
                    key={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`font-display text-2xl font-bold tracking-tight py-1 flex items-center justify-between border-b border-white/5 transition-colors ${
                      isActive ? "text-neon-cyan" : "text-slate-400"
                    }`}
                  >
                    {item.label}
                    <ArrowUpRight className={`w-6 h-6 opacity-30 ${isActive ? "opacity-100 text-neon-cyan" : ""}`} />
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4 mt-8"
            >
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="w-full text-center py-4 rounded-xl font-bold uppercase tracking-wider text-black bg-white hover:bg-slate-200 transition-colors pointer-events-auto cursor-pointer"
              >
                Hire Abhinav
              </a>
              <p className="text-center text-[10px] text-slate-500 font-mono">
                Silicon Valley Grade Systems Engineer ⚡
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

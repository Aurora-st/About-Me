"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Check local storage or document class list
    const hasLightClass = document.body.classList.contains("light-theme");
    setIsLight(hasLightClass);
  }, []);

  const toggleTheme = () => {
    const body = document.body;
    if (isLight) {
      body.classList.remove("light-theme");
      setIsLight(false);
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      body.classList.add("light-theme");
      setIsLight(true);
      localStorage.setItem("portfolio-theme", "light");
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.95 }}
      className="glass-panel border border-neon-cyan/20 p-3 rounded-full pointer-events-auto cursor-pointer flex items-center justify-center relative overflow-hidden group shadow-lg"
      style={{
        background: "rgba(10, 10, 30, 0.45)",
      }}
      aria-label="Toggle Vibe Theme"
    >
      {/* Light sweep animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

      <motion.div
        initial={false}
        animate={{ rotate: isLight ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
      >
        {isLight ? (
          <Moon className="w-5 h-5 text-neon-violet glow-text-violet" />
        ) : (
          <Sun className="w-5 h-5 text-neon-cyan glow-text-cyan" />
        )}
      </motion.div>
    </motion.button>
  );
}

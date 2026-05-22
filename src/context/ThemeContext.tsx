"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Convert HSL to Hex
export function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export interface ThemePreset {
  name: string;
  id: string;
  primaryHue: number;
  secondaryHue: number;
  glow: number;
  noise: number;
  scanline: number;
  description: string;
}

export const PRESETS: ThemePreset[] = [
  {
    name: "CYBER HOLOGRAM",
    id: "cyber",
    primaryHue: 180, // Cyan
    secondaryHue: 270, // Violet
    glow: 1.0,
    noise: 0.04,
    scanline: 1.0,
    description: "Default holographic operation system",
  },
  {
    name: "UNREAL GRAPHITE",
    id: "unreal",
    primaryHue: 200, // Silver Blue
    secondaryHue: 35, // Amber
    glow: 0.6,
    noise: 0.02,
    scanline: 0.3,
    description: "Raw matte-dark studio rendering viewport",
  },
  {
    name: "CRIMSON REACTOR",
    id: "crimson",
    primaryHue: 350, // Crimson Red
    secondaryHue: 285, // Purple
    glow: 1.5,
    noise: 0.08,
    scanline: 1.5,
    description: "High-voltage nuclear generator display",
  },
  {
    name: "EMERALD MATRIX",
    id: "matrix",
    primaryHue: 135, // Matrix Green
    secondaryHue: 180, // Cyan
    glow: 1.2,
    noise: 0.05,
    scanline: 1.8,
    description: "Cascading digital rain grid terminal",
  },
  {
    name: "SPECTRAL OBSIDIAN",
    id: "obsidian",
    primaryHue: 285, // Spectral Purple
    secondaryHue: 335, // Hot Magenta
    glow: 1.3,
    noise: 0.03,
    scanline: 0.8,
    description: "Luxury dark iridescence refraction",
  },
];

interface ThemeContextType {
  primaryHue: number;
  secondaryHue: number;
  glowIntensity: number;
  noiseOpacity: number;
  scanlineOpacity: number;
  isColorLabOpen: boolean;
  setIsColorLabOpen: (open: boolean) => void;
  setThemeValues: (values: {
    primaryHue?: number;
    secondaryHue?: number;
    glowIntensity?: number;
    noiseOpacity?: number;
    scanlineOpacity?: number;
  }) => void;
  applyPreset: (preset: ThemePreset) => void;
  resetToDefault: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [primaryHue, setPrimaryHue] = useState(180);
  const [secondaryHue, setSecondaryHue] = useState(270);
  const [glowIntensity, setGlowIntensity] = useState(1.0);
  const [noiseOpacity, setNoiseOpacity] = useState(0.04);
  const [scanlineOpacity, setScanlineOpacity] = useState(1.0);
  const [isColorLabOpen, setIsColorLabOpen] = useState(false);

  // Sync variables to root DOM stylesheet variables instantly on change
  useEffect(() => {
    const root = document.documentElement;

    // Primitives
    root.style.setProperty("--accent-h", primaryHue.toString());
    root.style.setProperty("--secondary-h", secondaryHue.toString());
    root.style.setProperty("--glow-intensity", glowIntensity.toString());
    root.style.setProperty("--noise-opacity", noiseOpacity.toString());
    root.style.setProperty("--scanline-opacity", scanlineOpacity.toString());

    // Generate HEX colors
    const primaryHex = hslToHex(primaryHue, 100, 50);
    const secondaryHex = hslToHex(secondaryHue, 100, 50);

    // Dynamic root colors for Tailwind & CSS mapping
    root.style.setProperty("--neon-cyan", primaryHex);
    root.style.setProperty("--neon-violet", secondaryHex);

    // Compound Semantic Theme System Variables
    root.style.setProperty("--glow-color", `hsla(${primaryHue}, 100%, 50%, ${glowIntensity * 0.15})`);
    root.style.setProperty("--border-color", `hsla(${primaryHue}, 100%, 50%, 0.2)`);
    root.style.setProperty("--particle-color", primaryHex);
    root.style.setProperty("--grid-color", `hsla(${primaryHue}, 100%, 50%, 0.015)`);
    root.style.setProperty("--prism-color", `hsla(${primaryHue}, 100%, 50%, 0.22)`);
    root.style.setProperty("--hud-color", `hsla(${primaryHue}, 100%, 50%, 0.4)`);

    // Broadcast changes to Three.js environment
    const eventDetail = {
      primaryColor: primaryHex,
      secondaryColor: secondaryHex,
      glowIntensity,
      noiseOpacity,
      scanlineOpacity,
      primaryHue,
    };
    window.dispatchEvent(new CustomEvent("theme-color-change", { detail: eventDetail }));
  }, [primaryHue, secondaryHue, glowIntensity, noiseOpacity, scanlineOpacity]);

  const setThemeValues = (values: {
    primaryHue?: number;
    secondaryHue?: number;
    glowIntensity?: number;
    noiseOpacity?: number;
    scanlineOpacity?: number;
  }) => {
    if (values.primaryHue !== undefined) setPrimaryHue(values.primaryHue);
    if (values.secondaryHue !== undefined) setSecondaryHue(values.secondaryHue);
    if (values.glowIntensity !== undefined) setGlowIntensity(values.glowIntensity);
    if (values.noiseOpacity !== undefined) setNoiseOpacity(values.noiseOpacity);
    if (values.scanlineOpacity !== undefined) setScanlineOpacity(values.scanlineOpacity);
  };

  const applyPreset = (preset: ThemePreset) => {
    setPrimaryHue(preset.primaryHue);
    setSecondaryHue(preset.secondaryHue);
    setGlowIntensity(preset.glow);
    setNoiseOpacity(preset.noise);
    setScanlineOpacity(preset.scanline);
  };

  const resetToDefault = () => {
    applyPreset(PRESETS[0]);
  };

  return (
    <ThemeContext.Provider
      value={{
        primaryHue,
        secondaryHue,
        glowIntensity,
        noiseOpacity,
        scanlineOpacity,
        isColorLabOpen,
        setIsColorLabOpen,
        setThemeValues,
        applyPreset,
        resetToDefault,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

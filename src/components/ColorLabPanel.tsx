"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { Sliders, X, Eye, RefreshCw, Palette, Settings, BarChart2, ShieldAlert } from "lucide-react";

import { useTheme, PRESETS, hslToHex, ThemePreset } from "@/context/ThemeContext";

interface ColorLabPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onColorChange?: (data: {
    primaryColor: string;
    secondaryColor: string;
    glowIntensity: number;
    scanlineOpacity: number;
    primaryHue: number;
  }) => void;
}

// Convert HSL to RGB
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return { r: f(0), g: f(8), b: f(4) };
}

const ColorLabPanel = React.forwardRef<HTMLDivElement, ColorLabPanelProps>(({ isOpen, onClose }, ref) => {
  const dragControls = useDragControls();

  const {
    primaryHue,
    secondaryHue,
    glowIntensity,
    noiseOpacity,
    scanlineOpacity,
    setThemeValues,
    applyPreset,
    resetToDefault,
  } = useTheme();

  // Panel state
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<"spectral" | "shaders" | "presets">("spectral");
  const [position, setPosition] = useState({ x: 40, y: 120 });
  const [isDragging, setIsDragging] = useState(false);

  // Live diagnostic variables for engine display
  const [fps, setFps] = useState(60);
  const [gpuLoad, setGpuLoad] = useState(14);
  const containerRef = useRef<HTMLDivElement>(null);
  
  React.useImperativeHandle(ref, () => containerRef.current!);

  // Listen for Escape key to close the lab
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Listen for pointerdown clicks outside to close the lab
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        const isMascotClick = (e.target as HTMLElement).closest(".cyberteddy-container");
        if (isMascotClick) return;
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  // Compute hex/rgb values
  const primaryHex = hslToHex(primaryHue, 100, 50);
  const secondaryHex = hslToHex(secondaryHue, 100, 50);
  const primaryRgb = hslToRgb(primaryHue, 100, 50);
  const secondaryRgb = hslToRgb(secondaryHue, 100, 50);

  // Generate a mock diagnostic oscilloscope wave
  const [waveSeed, setWaveSeed] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveSeed((s) => (s + 1) % 100);
      setFps(Math.round(58 + Math.random() * 3));
      setGpuLoad(Math.round(12 + Math.random() * 4 + (glowIntensity * 5)));
    }, 100);
    return () => clearInterval(interval);
  }, [glowIntensity]);

  // Draw diagnostic path
  const getOscilloscopePath = () => {
    let points = [];
    const amplitude = 12 * glowIntensity;
    for (let x = 0; x <= 180; x += 5) {
      const angle = (x / 180) * Math.PI * 4 + (waveSeed * 0.15);
      const y = 20 + Math.sin(angle) * amplitude * (0.5 + 0.5 * Math.sin(x / 60));
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
        drag
        dragControls={dragControls}
        dragListener={false}
        dragElastic={0.05}
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.3, y: 120, x: 80, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0, x: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.3, y: 120, x: 80, rotateX: 20 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className={`fixed bottom-36 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-40 z-50 w-auto sm:w-[380px] rounded-sm glass-panel border border-neon-cyan/20 pointer-events-auto backdrop-blur-xl select-none flex flex-col shadow-2xl ${
          isMinimized ? "h-auto" : "h-[500px]"
        }`}
        style={{
          background: "rgba(8, 8, 10, 0.93)",
          boxShadow: `0 0 35px color-mix(in srgb, ${primaryHex} 12%, transparent)`,
        }}
      >
        {/* Iridescent shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-sm" />
        
        {/* Technical Corner Brackets */}
        <div className="corner-accent-tl" />
        <div className="corner-accent-tr" />
        <div className="corner-accent-bl" />
        <div className="corner-accent-br" />

        {/* Drag handle header / Titlebar */}
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="flex items-center justify-between px-3 py-2 bg-zinc-900/60 border-b border-zinc-800 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" style={{ backgroundColor: primaryHex }} />
            <span className="text-[10px] font-mono tracking-widest text-zinc-300 font-bold">
              AI_COLOR_LAB // SPECTRAL.v1
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-zinc-800 rounded transition-colors text-zinc-400 hover:text-white"
              title={isMinimized ? "Maximize Window" : "Minimize Window"}
            >
              <motion.div animate={{ rotate: isMinimized ? 180 : 0 }} className="text-[10px] font-mono font-bold w-4 h-4 flex items-center justify-center">
                {isMinimized ? "SYS+" : "SYS-"}
              </motion.div>
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-red-950/60 rounded transition-colors text-zinc-400 hover:text-red-400"
              title="Close System HUD"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Subheader / Coordinates bar */}
        <div className="px-3 py-1 bg-zinc-950/50 border-b border-zinc-850 flex items-center justify-between text-[8px] font-mono text-zinc-500">
          <span>PORT: 0x88F2 // ENG_CORE_ACTIVE</span>
          <span className="animate-pulse">FPS: {fps} // GPU: {gpuLoad}%</span>
        </div>

        {!isMinimized && (
          <>
            {/* System Mode Selection Tabs */}
            <div className="flex border-b border-zinc-800 text-[10px] font-mono">
              <button
                onClick={() => setActiveTab("spectral")}
                className={`flex-1 py-2 flex items-center justify-center gap-1.5 border-r border-zinc-800 transition-colors ${
                  activeTab === "spectral" ? "bg-zinc-900/40 text-neon-cyan font-bold" : "text-zinc-400 hover:bg-zinc-900/20"
                }`}
                style={{ color: activeTab === "spectral" ? primaryHex : undefined }}
              >
                <Palette className="w-3 h-3" />
                SPECTRAL
              </button>
              <button
                onClick={() => setActiveTab("shaders")}
                className={`flex-1 py-2 flex items-center justify-center gap-1.5 border-r border-zinc-800 transition-colors ${
                  activeTab === "shaders" ? "bg-zinc-900/40 text-neon-cyan font-bold" : "text-zinc-400 hover:bg-zinc-900/20"
                }`}
                style={{ color: activeTab === "shaders" ? primaryHex : undefined }}
              >
                <Settings className="w-3 h-3" />
                SHADERS
              </button>
              <button
                onClick={() => setActiveTab("presets")}
                className={`flex-1 py-2 flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === "presets" ? "bg-zinc-900/40 text-neon-cyan font-bold" : "text-zinc-400 hover:bg-zinc-900/20"
                }`}
                style={{ color: activeTab === "presets" ? primaryHex : undefined }}
              >
                <Sliders className="w-3 h-3" />
                PRESETS
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
              
              {/* Tab 1: Spectral (Accent Hues) */}
              {activeTab === "spectral" && (
                <div className="flex flex-col gap-4">
                  {/* Primary Hue Picker */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-zinc-400 tracking-wider">PRIMARY ACCENT (GLOW VISOR)</span>
                      <span className="font-bold text-neon-cyan" style={{ color: primaryHex }}>
                        {primaryHue}° // {primaryHex.toUpperCase()}
                      </span>
                    </div>
                    
                    {/* Hue Gradient Spectrum Bar */}
                    <div className="relative h-6 rounded border border-zinc-800 overflow-hidden flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={primaryHue}
                        onChange={(e) => setThemeValues({ primaryHue: parseInt(e.target.value) })}
                        className="w-full h-full cursor-pointer opacity-0 absolute inset-0 z-10"
                      />
                      <div 
                        className="w-full h-3 rounded-sm opacity-90 pointer-events-none"
                        style={{
                          background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                        }}
                      />
                      {/* Interactive Cursor Indicator */}
                      <div
                        className="absolute top-0 bottom-0 w-2 bg-white border border-zinc-950 shadow-md pointer-events-none"
                        style={{
                          left: `calc(${(primaryHue / 360) * 100}% - 4px)`,
                          boxShadow: `0 0 10px ${primaryHex}`,
                        }}
                      />
                    </div>
                    
                    {/* Live RGB Readouts */}
                    <div className="grid grid-cols-3 gap-1.5 mt-1 text-[8px] font-mono text-zinc-500">
                      <div className="bg-zinc-950/70 p-1 border border-zinc-900 rounded">
                        R: <span className="text-red-400 font-bold">{primaryRgb.r}</span>
                      </div>
                      <div className="bg-zinc-950/70 p-1 border border-zinc-900 rounded">
                        G: <span className="text-green-400 font-bold">{primaryRgb.g}</span>
                      </div>
                      <div className="bg-zinc-950/70 p-1 border border-zinc-900 rounded">
                        B: <span className="text-blue-400 font-bold">{primaryRgb.b}</span>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Hue Picker */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-zinc-400 tracking-wider">SECONDARY ACCENT (AMBIENT GRIDS)</span>
                      <span className="font-bold text-neon-violet" style={{ color: secondaryHex }}>
                        {secondaryHue}° // {secondaryHex.toUpperCase()}
                      </span>
                    </div>

                    {/* Hue Gradient Spectrum Bar */}
                    <div className="relative h-6 rounded border border-zinc-800 overflow-hidden flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={secondaryHue}
                        onChange={(e) => setThemeValues({ secondaryHue: parseInt(e.target.value) })}
                        className="w-full h-full cursor-pointer opacity-0 absolute inset-0 z-10"
                      />
                      <div 
                        className="w-full h-3 rounded-sm opacity-90 pointer-events-none"
                        style={{
                          background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                        }}
                      />
                      {/* Interactive Cursor Indicator */}
                      <div
                        className="absolute top-0 bottom-0 w-2 bg-white border border-zinc-950 shadow-md pointer-events-none"
                        style={{
                          left: `calc(${(secondaryHue / 360) * 100}% - 4px)`,
                          boxShadow: `0 0 10px ${secondaryHex}`,
                        }}
                      />
                    </div>

                    {/* Live RGB Readouts */}
                    <div className="grid grid-cols-3 gap-1.5 mt-1 text-[8px] font-mono text-zinc-500">
                      <div className="bg-zinc-950/70 p-1 border border-zinc-900 rounded">
                        R: <span className="text-red-400 font-bold">{secondaryRgb.r}</span>
                      </div>
                      <div className="bg-zinc-950/70 p-1 border border-zinc-900 rounded">
                        G: <span className="text-green-400 font-bold">{secondaryRgb.g}</span>
                      </div>
                      <div className="bg-zinc-950/70 p-1 border border-zinc-900 rounded">
                        B: <span className="text-blue-400 font-bold">{secondaryRgb.b}</span>
                      </div>
                    </div>
                  </div>

                  {/* Diagnostic Oscilloscope feed */}
                  <div className="mt-2 bg-zinc-950/80 p-2.5 border border-zinc-850 rounded flex flex-col gap-1.5">
                    <span className="text-[8px] font-mono text-zinc-500 tracking-wider">
                      WAVEFORM_RESONANCE // CHROMATIC_OSC
                    </span>
                    <div className="h-10 w-full relative overflow-hidden bg-black/40 rounded border border-zinc-900 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 180 40">
                        {/* Static technical background grid lines */}
                        <line x1="0" y1="10" x2="180" y2="10" stroke="#18181b" strokeWidth="0.5" strokeDasharray="2,2" />
                        <line x1="0" y1="20" x2="180" y2="20" stroke="#18181b" strokeWidth="0.75" />
                        <line x1="0" y1="30" x2="180" y2="30" stroke="#18181b" strokeWidth="0.5" strokeDasharray="2,2" />
                        <line x1="60" y1="0" x2="60" y2="40" stroke="#18181b" strokeWidth="0.5" strokeDasharray="2,2" />
                        <line x1="120" y1="0" x2="120" y2="40" stroke="#18181b" strokeWidth="0.5" strokeDasharray="2,2" />

                        {/* Animated waveform path */}
                        <path
                          d={getOscilloscopePath()}
                          fill="none"
                          stroke={primaryHex}
                          strokeWidth="1.25"
                          opacity="0.85"
                          className="transition-colors duration-200"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Shader Controls */}
              {activeTab === "shaders" && (
                <div className="flex flex-col gap-4">
                  {/* Glow Bloom Multiplier */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-zinc-400 tracking-wider">GLOW BLOOM AMPLITUDE</span>
                      <span className="font-bold text-white">{Math.round(glowIntensity * 100)}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0.2"
                        max="2.0"
                        step="0.05"
                        value={glowIntensity}
                        onChange={(e) => setThemeValues({ glowIntensity: parseFloat(e.target.value) })}
                        className="flex-1 accent-white bg-zinc-800 rounded-lg cursor-pointer h-1.5"
                      />
                      <span className="text-[9px] font-mono w-8 text-right bg-zinc-950 px-1 py-0.5 rounded border border-zinc-900 text-zinc-400">
                        {glowIntensity.toFixed(2)}x
                      </span>
                    </div>
                    <p className="text-[8px] font-mono text-zinc-500 leading-normal">
                      Controls volumetric text glowing depth filters and active CRT dropshadow multipliers.
                    </p>
                  </div>

                  {/* Noise Opacity Control */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-zinc-400 tracking-wider">GRAIN DUST GAIN</span>
                      <span className="font-bold text-white">{Math.round((noiseOpacity / 0.15) * 100)}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0.0"
                        max="0.15"
                        step="0.005"
                        value={noiseOpacity}
                        onChange={(e) => setThemeValues({ noiseOpacity: parseFloat(e.target.value) })}
                        className="flex-1 accent-white bg-zinc-800 rounded-lg cursor-pointer h-1.5"
                      />
                      <span className="text-[9px] font-mono w-8 text-right bg-zinc-950 px-1 py-0.5 rounded border border-zinc-900 text-zinc-400">
                        {noiseOpacity.toFixed(3)}
                      </span>
                    </div>
                    <p className="text-[8px] font-mono text-zinc-500 leading-normal">
                      Regulates physical digital grain density vector layers laid across page viewports.
                    </p>
                  </div>

                  {/* Scanline Opacity Control */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-zinc-400 tracking-wider">CRT INTERLACE SCANLINES</span>
                      <span className="font-bold text-white">{Math.round(scanlineOpacity * 50)}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0.0"
                        max="2.0"
                        step="0.05"
                        value={scanlineOpacity}
                        onChange={(e) => setThemeValues({ scanlineOpacity: parseFloat(e.target.value) })}
                        className="flex-1 accent-white bg-zinc-800 rounded-lg cursor-pointer h-1.5"
                      />
                      <span className="text-[9px] font-mono w-8 text-right bg-zinc-950 px-1 py-0.5 rounded border border-zinc-900 text-zinc-400">
                        {scanlineOpacity.toFixed(2)}x
                      </span>
                    </div>
                    <p className="text-[8px] font-mono text-zinc-500 leading-normal">
                      Varies interlace line thickness and dark-horizontal grids simulating retro cathode ray tubes.
                    </p>
                  </div>

                  {/* Color Bleeding Warning */}
                  <div className="bg-zinc-950/80 p-2.5 rounded border border-zinc-900/60 flex gap-2 items-start mt-2">
                    <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5 text-[8px] font-mono leading-normal text-zinc-400">
                      <span className="font-bold text-zinc-300 uppercase">GPU Acceleration Synced</span>
                      <span>Changes are executed directly inside CSS values, leveraging graphics hardware layout rendering threads. Zero page reflows computed.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Presets */}
              {activeTab === "presets" && (
                <div className="flex flex-col gap-3">
                  <span className="text-[8px] font-mono text-zinc-500 tracking-widest uppercase mb-1">
                    Select a Pre-engineered UI Blueprint
                  </span>
                  
                  {PRESETS.map((preset) => {
                    const active = 
                      Math.abs(primaryHue - preset.primaryHue) < 5 &&
                      Math.abs(secondaryHue - preset.secondaryHue) < 5 &&
                      Math.abs(glowIntensity - preset.glow) < 0.1 &&
                      Math.abs(scanlineOpacity - preset.scanline) < 0.1;
                    
                    const presetPrimaryColor = hslToHex(preset.primaryHue, 100, 50);
                    const presetSecondaryColor = hslToHex(preset.secondaryHue, 100, 50);

                    return (
                      <button
                        key={preset.id}
                        onClick={() => applyPreset(preset)}
                        className={`w-full p-2.5 border rounded flex flex-col gap-1 transition-all text-left pointer-events-auto cursor-pointer relative overflow-hidden group ${
                          active
                            ? "bg-zinc-900/60 border-zinc-650"
                            : "bg-zinc-950/40 border-zinc-900 hover:border-zinc-850 hover:bg-zinc-900/20"
                        }`}
                      >
                        {/* Accent gradient indicators */}
                        <div 
                          className="absolute right-0 top-0 bottom-0 w-2.5" 
                          style={{
                            background: `linear-gradient(to bottom, ${presetPrimaryColor}, ${presetSecondaryColor})`
                          }}
                        />

                        <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                          <span className={`${active ? "text-white" : "text-zinc-300"}`}>
                            {preset.name}
                          </span>
                          {active && (
                            <span className="text-[8px] px-1 border border-neon-cyan/40 text-neon-cyan" style={{ color: presetPrimaryColor, borderColor: presetPrimaryColor }}>
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[8px] font-mono text-zinc-500 leading-relaxed pr-4">
                          {preset.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer console controller buttons */}
            <div className="p-3 bg-zinc-950/80 border-t border-zinc-900 flex justify-between gap-3">
              <button
                onClick={resetToDefault}
                className="px-3 py-1.5 bg-transparent border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 font-mono text-[9px] rounded-sm transition-all flex items-center gap-1.5 pointer-events-auto cursor-pointer"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                RESET TO DEFAULT
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 font-bold font-mono text-[9px] rounded-sm transition-all pointer-events-auto cursor-pointer"
                style={{
                  backgroundColor: primaryHex,
                  color: "#08080a",
                  boxShadow: `0 0 10px ${primaryHex}`,
                }}
              >
                CLOSE DIAGNOSTIC
              </button>
            </div>
          </>
        )}
      </motion.div>
      )}
    </AnimatePresence>
  );
});

ColorLabPanel.displayName = "ColorLabPanel";
export default ColorLabPanel;

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export type TeddyState = "idle" | "wave" | "sleep" | "celebrate" | "point";

interface CyberTeddyProps {
  forceState?: TeddyState;
  onStateChange?: (state: TeddyState) => void;
  isColorLabActive?: boolean;
  onMascotClick?: () => void;
  primaryHue?: number;
  glowIntensity?: number;
}

const CyberTeddy = React.forwardRef<HTMLDivElement, CyberTeddyProps>(({
  forceState,
  onStateChange,
  isColorLabActive,
  onMascotClick,
  primaryHue,
  glowIntensity,
}, ref) => {
  const [currentState, setCurrentState] = useState<TeddyState>("idle");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [teddyPos, setTeddyPos] = useState({ x: 0, y: 0 });
  const [bubbleText, setBubbleText] = useState("Greetings, visitor! Ready to explore Abhinav's cosmic dev space? 🚀");
  const [showBubble, setShowBubble] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [floatingTexts, setFloatingTexts] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const prevActiveRef = useRef(isColorLabActive);

  React.useImperativeHandle(ref, () => containerRef.current!);

  useEffect(() => {
    if (isColorLabActive && !prevActiveRef.current) {
      const diagnostics = ["CALIBRATING...", "HSL_ACTIVE", "SYS_LINK: 100%", "GPU_ACCEL", "SPECTRAL_ON"];
      const newTexts = diagnostics.map((text, index) => ({
        id: Date.now() + index,
        text,
        x: Math.random() * 80 - 40,
        y: -20 - index * 18,
      }));
      setFloatingTexts(newTexts);
      setTimeout(() => {
        setFloatingTexts([]);
      }, 3000);
    }
    prevActiveRef.current = isColorLabActive;
  }, [isColorLabActive]);

  // Sync forced states (e.g. when resume download is clicked)
  useEffect(() => {
    if (forceState) {
      setCurrentState(forceState);
      if (onStateChange) onStateChange(forceState);

      // Trigger dialogue and visual actions
      if (forceState === "celebrate") {
        setBubbleText("WOOHOO! Let's celebrate! Accessing systems... CONFETTI DEPLOYED! 🎉✨");
        setShowBubble(true);
        triggerConfetti();
        // Return to idle after a few seconds
        setTimeout(() => {
          setCurrentState("idle");
          setBubbleText("What should we look at next? Abhinav is open for elite projects! 🦾");
        }, 5000);
      } else if (forceState === "wave") {
        setBubbleText("Hi there! I am the brand assistant. Nice meeting you! 👋");
        setShowBubble(true);
        setTimeout(() => setCurrentState("idle"), 4000);
      }
    }
  }, [forceState]);

  // Synchronize bubble dialogue with active Color Lab parameter updates
  useEffect(() => {
    if (isColorLabActive) {
      setBubbleText(`COLOR LAB SYSTEM ACTIVE // HUE: ${primaryHue || 180}° // BLOOM: ${(glowIntensity || 1).toFixed(2)}x // READY TO SPECTRAL MORPH 🦾`);
      setShowBubble(true);
    }
  }, [isColorLabActive, primaryHue, glowIntensity]);

  // Handle Mascot Dialogues based on States
  useEffect(() => {
    if (currentState === "sleep") {
      setBubbleText("Zzz... powering down to standby mode... cosmic dreams loading... 💤");
      setShowBubble(true);
    } else if (currentState === "point") {
      setBubbleText("Look right there! Abhinav's engineering accomplishments are legendary! 👇");
      setShowBubble(true);
    }
  }, [currentState]);

  // Track Mouse Movement for Head/Eyes Parallax & Reset Sleep Timer
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Wake up if sleeping
      if (currentState === "sleep") {
        setCurrentState("idle");
        setBubbleText("System active! I am fully awake and scanning coordinates! 👁️🤖");
        setShowBubble(true);
        setTimeout(() => setShowBubble(false), 5000);
      }

      resetIdleTimer();
    };

    const handleScroll = () => {
      // Small chance to wave or wake up on scroll
      if (currentState === "sleep") {
        setCurrentState("idle");
        setBubbleText("Waking up! Detecting kinetic scroll movement! 🏃‍♂️⚡");
        setShowBubble(true);
      }
      resetIdleTimer();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    resetIdleTimer();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [currentState]);

  // Calculate Teddy Container Center for Parallax Look-At
  useEffect(() => {
    const updateTeddyCoords = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setTeddyPos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    updateTeddyCoords();
    window.addEventListener("resize", updateTeddyCoords);
    return () => window.removeEventListener("resize", updateTeddyCoords);
  }, []);

  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (currentState === "sleep" || currentState === "celebrate" || currentState === "wave") return;

    idleTimerRef.current = setTimeout(() => {
      setCurrentState("sleep");
    }, 15000); // 15 seconds of inactivity triggers sleep mode
  };

  // Parallax Calculation
  const getLookAtStyle = () => {
    if (currentState === "sleep") return { rotateX: 10, rotateY: 0, x: 0, y: 0 };

    const dx = mousePos.x - teddyPos.x;
    const dy = mousePos.y - teddyPos.y;
    const distance = Math.hypot(dx, dy);
    
    if (distance === 0) return { rotateX: 0, rotateY: 0, x: 0, y: 0 };

    // Limit head rotation angles
    const maxAngle = 18; 
    const angleX = Math.max(Math.min((-dy / window.innerHeight) * maxAngle, maxAngle), -maxAngle);
    const angleY = Math.max(Math.min((dx / window.innerWidth) * maxAngle, maxAngle), -maxAngle);

    return {
      rotateX: angleX,
      rotateY: angleY,
      x: angleY * 0.4,
      y: angleX * 0.4,
    };
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#00f2fe", "#8a2be2", "#ff007f"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#00f2fe", "#8a2be2", "#ff007f"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleMascotClick = () => {
    if (onMascotClick) {
      onMascotClick();
      return;
    }

    // Jump-celebrate or say a funny quote
    if (currentState === "sleep") {
      setCurrentState("idle");
      setBubbleText("Boop! Core systems activated! Let's build something elite! 🛠️");
      setShowBubble(true);
    } else {
      setCurrentState("celebrate");
      triggerConfetti();
    }
  };

  const lookAt = getLookAtStyle();

  // Floating animation settings based on state
  const bobbingTransition = {
    y: {
      duration: currentState === "sleep" ? 4 : 2.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  };

  const bobbingY = currentState === "sleep" ? [0, 8, 0] : [0, -12, 0];

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none select-none max-w-[280px] sm:max-w-[320px] cyberteddy-container"
    >
      {/* Floating Sci-Fi diagnostics */}
      <AnimatePresence>
        {floatingTexts.map((item) => (
          <motion.span
            key={item.id}
            initial={{ opacity: 0, y: 0, x: item.x, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], y: -80 - Math.random() * 40, x: item.x + (Math.random() * 20 - 10), scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute text-[9px] font-mono text-neon-cyan select-none pointer-events-none drop-shadow-[0_0_8px_var(--neon-cyan)]"
            style={{ 
              bottom: "80px", 
              right: "40px",
              color: "var(--neon-cyan)"
            }}
          >
            {item.text}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="pointer-events-auto cursor-pointer glass-panel border border-neon-cyan/20 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium mb-3 shadow-xl backdrop-blur-lg flex flex-col gap-1 relative overflow-hidden"
            onClick={() => setShowBubble(false)}
            style={{
              background: "rgba(8, 8, 10, 0.9)",
              color: "#f8fafc",
              maxWidth: "240px",
            }}
          >
            {/* Hologram glowing top-line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta animate-pulse" />
            <p className="leading-relaxed font-sans">{bubbleText}</p>
            <span className="text-[10px] opacity-40 self-end font-mono mt-1">Tap to dismiss</span>
            {/* Bubble Tail */}
            <div className="absolute bottom-[-6px] right-8 w-3 h-3 rotate-45 border-r border-b border-neon-cyan/20 bg-[rgba(8,8,10,0.9)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Teddy Container */}
      <motion.div
        animate={{ y: bobbingY }}
        transition={bobbingTransition}
        className="pointer-events-auto cursor-pointer flex flex-col items-center relative"
        onClick={handleMascotClick}
        style={{ perspective: 1000 }}
      >
        {/* Sleeping "Zzz" Particles */}
        <AnimatePresence>
          {currentState === "sleep" && (
            <>
              <motion.span
                initial={{ opacity: 0, y: 0, x: -10, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0], y: -50, x: -20, scale: 1.1 }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                className="absolute text-cyan-300 font-display font-semibold text-lg left-4 top-[-20px]"
              >
                Z
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 0, x: -5, scale: 0.5 }}
                animate={{ opacity: [0, 0.8, 0], y: -40, x: -10, scale: 0.9 }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.8 }}
                className="absolute text-violet-300 font-display font-semibold text-sm left-10 top-[-10px]"
              >
                z
              </motion.span>
            </>
          )}
        </AnimatePresence>

        {/* Mascot Robot Base platform projection */}
        <div className="absolute bottom-[-15px] w-24 h-4 bg-neon-cyan/10 rounded-full blur-md animate-pulse border border-neon-cyan/5 -z-10" />

        {/* Teddy Bear SVG Frame */}
        <motion.div
          animate={
            currentState === "celebrate"
              ? { rotate: 360, scale: [1, 1.15, 1] }
              : { rotate: 0 }
          }
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${lookAt.rotateX}deg) rotateY(${lookAt.rotateY}deg) translate3d(${lookAt.x}px, ${lookAt.y}px, 0px)`,
            transition: "transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_0_15px_var(--glow-color)] relative"
        >
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Robot Body Shadow / Glow Base */}
            <circle cx="100" cy="115" r="45" fill="url(#bodyGlow)" opacity="0.15" />

            {/* Left Ear */}
            <motion.path
              d="M 55 50 C 35 50, 35 80, 55 80 C 65 80, 70 70, 68 62"
              stroke="var(--neon-cyan)"
              strokeWidth="5"
              fill="rgba(15,15,18,0.9)"
              className="glass-panel"
            />
            <circle cx="53" cy="65" r="8" fill="var(--neon-cyan)" opacity="0.7" />

            {/* Right Ear */}
            <motion.path
              d="M 145 50 C 165 50, 165 80, 145 80 C 135 80, 130 70, 132 62"
              stroke="var(--neon-cyan)"
              strokeWidth="5"
              fill="rgba(15,15,18,0.9)"
            />
            <circle cx="147" cy="65" r="8" fill="var(--neon-cyan)" opacity="0.7" />

            {/* Arms - Left (Static resting/floating) */}
            <motion.rect
              x="30"
              y="110"
              width="22"
              height="45"
              rx="11"
              transform="rotate(25 41 132)"
              fill="rgba(15,15,18,0.9)"
              stroke="var(--card-border)"
              strokeWidth="2"
            />
            <circle cx="28" cy="145" r="6" fill="var(--neon-violet)" />

            {/* Arms - Right (Dynamic greeting paw) */}
            <motion.rect
              x="148"
              y="110"
              width="22"
              height="45"
              rx="11"
              style={{ transformOrigin: "159px 120px" }}
              animate={
                currentState === "wave"
                  ? { rotate: [-10, -50, -10, -50, -10], y: [0, -10, 0, -10, 0] }
                  : currentState === "celebrate"
                  ? { rotate: -65 }
                  : currentState === "point"
                  ? { rotate: -110, x: -10 }
                  : { rotate: -25 }
              }
              transition={{ duration: 2, ease: "easeInOut" }}
              fill="rgba(15,15,18,0.9)"
              stroke="var(--card-border)"
              strokeWidth="2"
            />
            <circle
              cx="165"
              cy="142"
              r="6"
              fill={currentState === "point" ? "var(--neon-cyan)" : "var(--neon-violet)"}
            />

            {/* Mechanical Legs */}
            {/* Left Leg */}
            <rect
              x="62"
              y="152"
              width="24"
              height="35"
              rx="12"
              fill="rgba(10,10,12,0.95)"
              stroke="var(--card-border)"
              strokeWidth="2"
            />
            <circle cx="74" cy="178" r="7" fill="var(--neon-cyan)" opacity="0.5" />

            {/* Right Leg */}
            <rect
              x="114"
              y="152"
              width="24"
              height="35"
              rx="12"
              fill="rgba(10,10,12,0.95)"
              stroke="var(--card-border)"
              strokeWidth="2"
            />
            <circle cx="126" cy="178" r="7" fill="var(--neon-cyan)" opacity="0.5" />

            {/* Robot Torso / Body */}
            <rect
              x="52"
              y="95"
              width="96"
              height="65"
              rx="30"
              fill="rgba(18,18,22,0.9)"
              stroke="var(--card-border)"
              strokeWidth="3"
            />
            
            {/* Glowing Chest Reactor (Hologram circle) */}
            <circle cx="100" cy="128" r="16" fill="rgba(8,8,10,0.9)" stroke="var(--neon-violet)" strokeWidth="2" />
            <motion.circle
              cx="100"
              cy="128"
              r="6"
              animate={
                currentState === "sleep"
                  ? { r: [6, 8, 6], fill: "#4b0082" }
                  : currentState === "celebrate"
                  ? { r: [6, 12, 6], fill: "#ff007f" }
                  : { r: [6, 10, 6], fill: "#00f2fe" }
              }
              transition={{ repeat: Infinity, duration: 2 }}
            />

            {/* Robot Head Segment */}
            <rect
              x="45"
              y="42"
              width="110"
              height="70"
              rx="35"
              fill="rgba(20,20,24,0.95)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="3.5"
            />

            {/* Chrome Side Antenna Connectors */}
            <circle cx="45" cy="77" r="5" fill="var(--neon-magenta)" />
            <circle cx="155" cy="77" r="5" fill="var(--neon-magenta)" />

            {/* Holographic Glowing Cyber Glasses (Expressive Visor) */}
            <motion.rect
              x="58"
              y="58"
              width="84"
              height="28"
              rx="14"
              fill="rgba(5,5,7,0.98)"
              stroke="var(--neon-cyan)"
              strokeWidth="2.5"
              animate={
                isColorLabActive
                  ? {
                      stroke: "var(--neon-cyan)",
                      strokeWidth: [2.5, 4.5, 2.5],
                      fill: ["rgba(5,5,7,0.98)", "rgba(0, 242, 254, 0.15)", "rgba(5,5,7,0.98)"],
                    }
                  : currentState === "sleep"
                  ? { stroke: "var(--neon-violet)", strokeWidth: 2.5 }
                  : { stroke: "var(--neon-cyan)", strokeWidth: 2.5 }
              }
              transition={isColorLabActive ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : undefined}
            />

            {/* Visor Expressions / LED Eyes */}
            <AnimatePresence mode="wait">
              {currentState === "sleep" ? (
                // Zzz Eyes (Flat low-light bars)
                <motion.g
                  key="sleep-eyes"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                >
                  <line x1="72" y1="72" x2="86" y2="72" stroke="var(--neon-violet)" strokeWidth="4" strokeLinecap="round" />
                  <line x1="114" y1="72" x2="128" y2="72" stroke="var(--neon-violet)" strokeWidth="4" strokeLinecap="round" />
                </motion.g>
              ) : currentState === "celebrate" ? (
                // Happy Curvy Arcs
                <motion.g
                  key="happy-eyes"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <path d="M 70 75 Q 79 64 88 75" stroke="var(--neon-magenta)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                  <path d="M 112 75 Q 121 64 130 75" stroke="var(--neon-magenta)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                </motion.g>
              ) : currentState === "wave" ? (
                // Wink
                <motion.g
                  key="wink-eyes"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Left normal eye */}
                  <circle cx="79" cy="72" r="5" fill="var(--neon-cyan)" />
                  {/* Right winking arch */}
                  <path d="M 113 74 Q 121 67 129 74" stroke="var(--neon-cyan)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                </motion.g>
              ) : (
                // Normal Scanning Eyes
                <motion.g
                  key="normal-eyes"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Left glowing circle with inner pupil */}
                  <motion.circle 
                    cx="79" 
                    cy="72" 
                    r={isColorLabActive ? 6.5 : 5.5} 
                    fill="var(--neon-cyan)" 
                    animate={isColorLabActive ? { r: [6.5, 8.5, 6.5] } : undefined}
                    transition={isColorLabActive ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : undefined}
                  />
                  <motion.circle
                    cx={79 + (mousePos.x - teddyPos.x) * 0.005}
                    cy={72 + (mousePos.y - teddyPos.y) * 0.005}
                    r="2"
                    fill="#ffffff"
                  />

                  {/* Right glowing circle with inner pupil */}
                  <motion.circle 
                    cx="121" 
                    cy="72" 
                    r={isColorLabActive ? 6.5 : 5.5} 
                    fill="var(--neon-cyan)" 
                    animate={isColorLabActive ? { r: [6.5, 8.5, 6.5] } : undefined}
                    transition={isColorLabActive ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : undefined}
                  />
                  <motion.circle
                    cx={121 + (mousePos.x - teddyPos.x) * 0.005}
                    cy={72 + (mousePos.y - teddyPos.y) * 0.005}
                    r="2"
                    fill="#ffffff"
                  />
                </motion.g>
              )}
            </AnimatePresence>

            {/* Cute robot snout nose & cyber whiskers */}
            <circle cx="100" cy="88" r="4" fill="var(--neon-magenta)" />
            <line x1="97" y1="94" x2="103" y2="94" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

            {/* Definitions */}
            <defs>
              <radialGradient id="bodyGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--neon-cyan)" />
                <stop offset="100%" stopColor="var(--neon-violet)" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
});

CyberTeddy.displayName = "CyberTeddy";
export default CyberTeddy;

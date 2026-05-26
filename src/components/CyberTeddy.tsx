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

  // Rotating Diagnostics for Minimalist HUD
  const [diagIdx, setDiagIdx] = useState(0);
  const idleDiagnostics = [
    "AI CORE READY",
    "GPU ACTIVE",
    "SPECTRAL LINKED",
    "COLOR ENGINE ONLINE",
    "SYSTEM IDLE",
  ];
  const activeDiagnostics = [
    "HSL ACTIVE",
    "SYS LINK: 100%",
    "CALIBRATING...",
    "GPU ACCEL",
    "SPECTRAL ON",
  ];

  const currentDiagnostics = isColorLabActive ? activeDiagnostics : idleDiagnostics;

  useEffect(() => {
    setDiagIdx(0); // Reset index on transition
    const interval = setInterval(() => {
      setDiagIdx((idx) => (idx + 1) % currentDiagnostics.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isColorLabActive, currentDiagnostics.length]);

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
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none select-none cyberteddy-container"
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

      {/* Tiny rotating/fading HUD diagnostics overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${isColorLabActive ? "active" : "idle"}-${diagIdx}`}
          initial={{ opacity: 0, y: 5, filter: "blur(2px)" }}
          animate={{ opacity: 0.75, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -5, filter: "blur(2px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-[7.5px] font-mono tracking-widest mb-3 uppercase select-none pointer-events-none drop-shadow-[0_0_5px_var(--neon-cyan)] flex items-center gap-1.5 mr-6"
          style={{
            color: `hsla(${primaryHue || 180}, 100%, 70%, 0.85)`,
          }}
        >
          <span 
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: `hsla(${primaryHue || 180}, 100%, 50%, 0.8)` }}
          />
          {currentDiagnostics[diagIdx]}
        </motion.div>
      </AnimatePresence>

      {/* Floating Teddy Container */}
      <motion.div
        animate={{ y: bobbingY }}
        transition={bobbingTransition}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
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

        {/* Animated MP4 Holographic AI Assistant */}
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
          className="w-28 h-28 sm:w-32 sm:h-32 relative group"
        >
          {/* Animated concentric energy rings */}
          <motion.div
            className="absolute inset-[-14px] rounded-full border border-dashed pointer-events-none"
            animate={{
              scale: isColorLabActive ? 1.25 : 1.0,
              borderColor: `hsla(${primaryHue || 180}, 100%, 50%, ${isColorLabActive ? 0.55 : 0.2})`,
            }}
            whileHover={{
              scale: 1.35,
              borderColor: `hsla(${primaryHue || 180}, 100%, 50%, 0.7)`,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            style={{
              borderStyle: "dashed",
              animation: "spin 12s linear infinite",
            }}
          />
          <motion.div
            className="absolute inset-[-8px] rounded-full border border-dotted pointer-events-none"
            animate={{
              scale: isColorLabActive ? 1.15 : 1.0,
              borderColor: `hsla(${(primaryHue || 180) + 60}, 100%, 50%, ${isColorLabActive ? 0.4 : 0.15})`,
            }}
            whileHover={{
              scale: 1.22,
              borderColor: `hsla(${(primaryHue || 180) + 60}, 100%, 50%, 0.5)`,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            style={{
              borderStyle: "dotted",
              animation: "spin 8s linear infinite reverse",
            }}
          />

          {/* Futuristic Holographic Glow Backdrop Aura */}
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-75 animate-pulse pointer-events-none -z-10"
            style={{
              background: `radial-gradient(circle, hsla(${primaryHue || 180}, 100%, 50%, 0.4) 0%, transparent 70%)`,
              boxShadow: `0 0 50px ${isColorLabActive ? "25px" : "15px"} hsla(${primaryHue || 180}, 100%, 50%, ${isColorLabActive ? 0.5 : 0.25} * (glowIntensity || 1))`,
              transition: "box-shadow 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* Chromatic Edge Reflection ring */}
          <div
            className="absolute inset-0 rounded-full border border-white/10 opacity-30 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, hsla(${primaryHue || 180}, 100%, 50%, 0.15), transparent 40%, hsla(${(primaryHue || 180) + 120}, 100%, 50%, 0.15))`,
              boxShadow: `inset 0 0 20px hsla(${primaryHue || 180}, 100%, 50%, 0.3)`,
            }}
          />

          {/* Laser-cut Hologram Shell Container */}
          <motion.div
            className="w-full h-full rounded-full overflow-hidden relative border bg-black/40 backdrop-blur-sm shadow-2xl"
            animate={{
              borderColor: isColorLabActive
                ? `hsla(${primaryHue || 180}, 100%, 50%, 0.5)`
                : `hsla(${primaryHue || 180}, 100%, 50%, 0.25)`,
              scale: isColorLabActive ? 1.08 : 1.0,
            }}
            whileHover={{
              scale: 1.06,
              borderColor: `hsla(${primaryHue || 180}, 100%, 50%, 0.65)`,
              boxShadow: `0 0 45px 8px hsla(${primaryHue || 180}, 100%, 50%, 0.75), inset 0 0 30px hsla(${primaryHue || 180}, 100%, 50%, 0.4)`,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            style={{
              mixBlendMode: "screen", // Seamlessly masks solid black video backgrounds
              boxShadow: `0 0 35px 5px hsla(${primaryHue || 180}, 100%, 50%, ${isColorLabActive ? 0.65 : 0.4} * (glowIntensity || 1)), inset 0 0 25px hsla(${primaryHue || 180}, 100%, 50%, 0.25)`,
            }}
          >
            {/* The Futuristic AI video assistant */}
            <motion.video
              src="/assistant.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover scale-110 pointer-events-none"
              animate={isColorLabActive ? {
                filter: [
                  `hue-rotate(${(primaryHue || 180) - 180}deg) brightness(1.2) contrast(1.15)`,
                  `hue-rotate(${(primaryHue || 180) - 180}deg) brightness(1.9) contrast(1.4)`,
                  `hue-rotate(${(primaryHue || 180) - 180}deg) brightness(1.2) contrast(1.15)`,
                ]
              } : {
                filter: `hue-rotate(${(primaryHue || 180) - 180}deg) brightness(1.2) contrast(1.15)`
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Spectral scanline burst overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent opacity-0 pointer-events-none"
              animate={
                isColorLabActive
                  ? {
                      opacity: [0, 0.7, 0.7, 0],
                      y: ["-100%", "200%"],
                    }
                  : { opacity: 0 }
              }
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: isColorLabActive ? Infinity : 0,
                repeatDelay: 5,
              }}
              style={{
                mixBlendMode: "overlay",
              }}
            />
          </motion.div>

          {/* Holographic coordinate overlays */}
          <div className="absolute top-1 left-2 text-[6px] font-mono text-neon-cyan opacity-40 uppercase select-none tracking-widest pointer-events-none" style={{ color: `hsla(${primaryHue || 180}, 100%, 60%, 0.6)` }}>
            AI_CORE: {isColorLabActive ? "EXPANDED" : "OK"}
          </div>
          <div className="absolute bottom-1 right-2 text-[6px] font-mono text-neon-cyan opacity-40 uppercase select-none tracking-widest pointer-events-none" style={{ color: `hsla(${primaryHue || 180}, 100%, 60%, 0.6)` }}>
            HSL_{primaryHue || 180}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
});

CyberTeddy.displayName = "CyberTeddy";
export default CyberTeddy;

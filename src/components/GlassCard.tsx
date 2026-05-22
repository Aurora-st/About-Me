"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  tiltEnabled?: boolean;
  glowEnabled?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className = "",
  tiltEnabled = true,
  glowEnabled = true,
  delay = 0,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Coordinates for background glowing effect
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    if (tiltEnabled) {
      // 3D Card Tilt Calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6; // Smooth 6 degrees max tilt for elite feel
      const rotateY = ((x - centerX) / centerX) * 6;
      setRotate({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const styleVariables = {
    "--mouse-x": `${coords.x}px`,
    "--mouse-y": `${coords.y}px`,
  } as React.CSSProperties;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...styleVariables,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        scale: isHovered ? 1.012 : 1,
        z: isHovered ? 15 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 24,
        mass: 0.1,
        opacity: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
        y: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
      }}
      className={`glass-card mouse-glow-card tech-border-glow relative z-10 transition-shadow duration-300 ${
        glowEnabled ? "before:opacity-100" : ""
      } ${className}`}
    >
      {/* Iridescent Metallic Reflection Overlay */}
      <div className="iridescent-overlay" />

      {/* Cybernetic active scanning HUD laser beam */}
      {isHovered && <div className="scanner-overlay" />}

      {/* Elegant Technical Corner Brackets */}
      <div className="corner-accent-tl" />
      <div className="corner-accent-tr" />
      <div className="corner-accent-bl" />
      <div className="corner-accent-br" />

      {/* Internal Content (positioned above mouse-glow base) */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </motion.div>
  );
}

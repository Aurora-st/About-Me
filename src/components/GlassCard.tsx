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
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees tilt
      const rotateY = ((x - centerX) / centerX) * 10;
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
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
        scale: isHovered ? 1.015 : 1,
        z: isHovered ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 22,
        mass: 0.1,
        opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
        y: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
      }}
      className={`glass-card mouse-glow-card relative z-10 transition-shadow duration-300 ${
        glowEnabled ? "before:opacity-100" : ""
      } ${className}`}
    >
      {/* Decorative cybernetic corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neon-cyan/30 rounded-tl" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-neon-cyan/30 rounded-tr" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-neon-cyan/30 rounded-bl" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neon-cyan/30 rounded-br" />

      {/* Internal Content (positioned above mouse-glow base) */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </motion.div>
  );
}

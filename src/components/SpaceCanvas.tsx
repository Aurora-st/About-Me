"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SpaceCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Detect if theme is light or dark to adapt particle opacity
    const isLightTheme = document.body.classList.contains("light-theme");

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // --- Particle System (Starfield) ---
    const starCount = 1500;
    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const cyanColor = new THREE.Color("#00f2fe");
    const violetColor = new THREE.Color("#8a2be2");
    const whiteColor = new THREE.Color("#ffffff");

    for (let i = 0; i < starCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 20; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // z

      // Interpolate colors between neon-cyan, neon-violet, and white
      const randomVal = Math.random();
      let starColor = whiteColor;
      if (randomVal < 0.35) {
        starColor = cyanColor;
      } else if (randomVal < 0.7) {
        starColor = violetColor;
      }

      colors[i * 3] = starColor.r;
      colors[i * 3 + 1] = starColor.g;
      colors[i * 3 + 2] = starColor.b;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Circle texture for smooth particles
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const starMaterial = new THREE.PointsMaterial({
      size: 0.05,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      opacity: isLightTheme ? 0.35 : 0.65,
    });

    const starParticles = new THREE.Points(starGeometry, starMaterial);
    scene.add(starParticles);

    // --- Floating Geometries (Interactive Planets/Shapes) ---
    // 1. Core Glass Sphere
    const sphereGeometry = new THREE.SphereGeometry(1.8, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x8a2be2,
      wireframe: true,
      transparent: true,
      opacity: isLightTheme ? 0.03 : 0.08,
    });
    const coreSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    coreSphere.position.set(3, 1, -2);
    scene.add(coreSphere);

    // 2. Icosahedron Ring (Orbiting Planet Effect)
    const icosaGeometry = new THREE.IcosahedronGeometry(0.8, 1);
    const icosaMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: isLightTheme ? 0.06 : 0.15,
    });
    const subPlanet = new THREE.Mesh(icosaGeometry, icosaMaterial);
    subPlanet.position.set(-4, -2, 1);
    scene.add(subPlanet);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // --- Interaction Physics ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- Responsive Canvas ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- Render Loop ---
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) / 1000;

      // Slow orbital drifts
      starParticles.rotation.y = elapsedTime * 0.02;
      starParticles.rotation.x = elapsedTime * 0.005;

      coreSphere.rotation.y = elapsedTime * 0.1;
      coreSphere.rotation.x = -elapsedTime * 0.05;
      coreSphere.position.y = 1 + Math.sin(elapsedTime * 0.5) * 0.4;

      subPlanet.rotation.x = elapsedTime * 0.15;
      subPlanet.rotation.y = -elapsedTime * 0.08;
      subPlanet.position.y = -2 + Math.cos(elapsedTime * 0.8) * 0.3;

      // Smooth lerp mouse parallax camera movement
      targetX = mouseX * 0.6;
      targetY = mouseY * 0.6;

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Listen to light theme toggle events to update material opacities dynamically
    const observer = new MutationObserver(() => {
      const isLightNow = document.body.classList.contains("light-theme");
      starMaterial.opacity = isLightNow ? 0.35 : 0.65;
      sphereMaterial.opacity = isLightNow ? 0.03 : 0.08;
      icosaMaterial.opacity = isLightNow ? 0.06 : 0.15;
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    // --- Cleanup ---
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      starGeometry.dispose();
      starMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      icosaGeometry.dispose();
      icosaMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden"
      id="space-3d-bg"
    />
  );
}

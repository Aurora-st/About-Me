"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SpaceCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const isLightTheme = document.body.classList.contains("light-theme");

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // Volumetric Cinematic Depth Fog
    scene.fog = new THREE.FogExp2(isLightTheme ? 0xf1f3f6 : 0x08080a, 0.08);

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 9;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // --- Ambient Spatial Coordinate Grid Room ---
    const gridColor1 = new THREE.Color(isLightTheme ? "#4f46e5" : "#00f2fe"); // primary
    const gridColor2 = new THREE.Color(isLightTheme ? "#e2e8f0" : "#141416"); // secondary/subtle

    // 1. Bottom floor coordinate grid
    const gridHelperBottom = new THREE.GridHelper(40, 40, gridColor1, gridColor2);
    gridHelperBottom.position.y = -5;
    scene.add(gridHelperBottom);

    // 2. Back wall coordinate grid
    const gridHelperBack = new THREE.GridHelper(40, 40, gridColor1, gridColor2);
    gridHelperBack.position.z = -12;
    gridHelperBack.rotation.x = Math.PI / 2;
    scene.add(gridHelperBack);

    // --- Floating Holographic Dust System ---
    const dustCount = 800;
    const dustGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(dustCount * 3);
    const colors = new Float32Array(dustCount * 3);
    const dustColorTypes: number[] = []; // 0 = neutral, 1 = primary, 2 = secondary

    const primaryColor = new THREE.Color(isLightTheme ? "#0ea5e9" : "#00f2fe"); // holographic ice cyan
    const secondaryColor = new THREE.Color(isLightTheme ? "#4f46e5" : "#8a2be2"); // spectral violet
    const neutralColor = new THREE.Color(isLightTheme ? "#94a3b8" : "#ffffff"); // silver/white

    for (let i = 0; i < dustCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4; // z

      const randomVal = Math.random();
      let dustColor = neutralColor;
      let type = 0;
      if (randomVal < 0.3) {
        dustColor = primaryColor;
        type = 1;
      } else if (randomVal < 0.6) {
        dustColor = secondaryColor;
        type = 2;
      }
      dustColorTypes.push(type);

      colors[i * 3] = dustColor.r;
      colors[i * 3 + 1] = dustColor.g;
      colors[i * 3 + 2] = dustColor.b;
    }

    dustGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Smooth circular canvas texture for particles
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

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.06,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      opacity: isLightTheme ? 0.3 : 0.6,
    });

    const dustParticles = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustParticles);

    // --- Premium Holographic Prism Centerpiece ---
    // 1. Solid glass refractive octahedron (double pyramid)
    const prismGeometry = new THREE.OctahedronGeometry(2.0, 0);
    const prismMaterial = new THREE.MeshPhysicalMaterial({
      color: isLightTheme ? 0xffffff : 0x0a0a0c,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.7,
      ior: 1.45,
      transparent: true,
      opacity: isLightTheme ? 0.12 : 0.22,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const solidPrism = new THREE.Mesh(prismGeometry, prismMaterial);
    solidPrism.position.set(0, 0.4, -1);
    scene.add(solidPrism);

    // 2. Neon wireframe outline
    const wireframePrismGeom = new THREE.OctahedronGeometry(2.02, 0);
    const wireframePrismMat = new THREE.MeshBasicMaterial({
      color: isLightTheme ? 0x4f46e5 : 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: isLightTheme ? 0.2 : 0.35,
    });
    const wireframePrism = new THREE.Mesh(wireframePrismGeom, wireframePrismMat);
    wireframePrism.position.set(0, 0.4, -1);
    scene.add(wireframePrism);

    // 3. Floating inner core (small high-frequency violet icosahedron)
    const innerCoreGeom = new THREE.IcosahedronGeometry(0.5, 1);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: isLightTheme ? 0xdb2777 : 0x8a2be2,
      wireframe: true,
      transparent: true,
      opacity: isLightTheme ? 0.35 : 0.55,
    });
    const innerCore = new THREE.Mesh(innerCoreGeom, innerCoreMat);
    innerCore.position.set(0, 0.4, -1);
    scene.add(innerCore);

    // --- Core Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, isLightTheme ? 0.8 : 0.15);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xff007f, isLightTheme ? 1.0 : 0.6); // magenta rim light
    directionalLight1.position.set(5, 5, 2);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x00f2fe, isLightTheme ? 1.0 : 0.7); // cyan key light
    directionalLight2.position.set(-5, -3, 2);
    scene.add(directionalLight2);

    // --- Dynamic Color Lab Lerp Registers ---
    const activePrimaryColor = new THREE.Color(isLightTheme ? "#4f46e5" : "#00f2fe");
    const activeSecondaryColor = new THREE.Color(isLightTheme ? "#db2777" : "#8a2be2");
    const activeFogColor = new THREE.Color(isLightTheme ? 0xf1f3f6 : 0x08080a);
    const activeNeutralColor = new THREE.Color(isLightTheme ? "#94a3b8" : "#ffffff");

    const targetPrimaryColor = activePrimaryColor.clone();
    const targetSecondaryColor = activeSecondaryColor.clone();
    const targetFogColor = activeFogColor.clone();
    const targetNeutralColor = activeNeutralColor.clone();

    const handleThemeColorChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!customEvent.detail) return;
      
      const { primaryColor, secondaryColor } = customEvent.detail;
      if (primaryColor) targetPrimaryColor.set(primaryColor);
      if (secondaryColor) targetSecondaryColor.set(secondaryColor);

      // Interpolate fog color slightly towards primary accent for dynamic environmental lighting
      const isLightNow = document.body.classList.contains("light-theme");
      const baseFog = new THREE.Color(isLightNow ? 0xf1f3f6 : 0x08080a);
      const accentTint = new THREE.Color(primaryColor);
      targetFogColor.copy(baseFog).lerp(accentTint, 0.06);
    };

    window.addEventListener("theme-color-change", handleThemeColorChange);

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

      // Lerp colors towards targets
      activePrimaryColor.lerp(targetPrimaryColor, 0.08);
      activeSecondaryColor.lerp(targetSecondaryColor, 0.08);
      activeFogColor.lerp(targetFogColor, 0.08);
      activeNeutralColor.lerp(targetNeutralColor, 0.08);

      // Apply lerped colors to 3D meshes and lights
      wireframePrism.material.color.copy(activePrimaryColor);
      innerCore.material.color.copy(activeSecondaryColor);
      directionalLight2.color.copy(activePrimaryColor);
      directionalLight1.color.copy(activeSecondaryColor);
      if (scene.fog) {
        scene.fog.color.copy(activeFogColor);
      }

      // Tint grid helpers using lerped color
      gridHelperBottom.material.color.copy(activePrimaryColor);
      gridHelperBack.material.color.copy(activePrimaryColor);

      // Dynamically morph dust particle colors buffer
      const colorsAttr = dustGeometry.getAttribute("color") as THREE.BufferAttribute;
      if (colorsAttr) {
        for (let i = 0; i < dustCount; i++) {
          const type = dustColorTypes[i];
          let c = activeNeutralColor;
          if (type === 1) c = activePrimaryColor;
          else if (type === 2) c = activeSecondaryColor;
          colorsAttr.setXYZ(i, c.r, c.g, c.b);
        }
        colorsAttr.needsUpdate = true;
      }

      // Coordinate grids drift slowly for spatial movement feel
      gridHelperBottom.position.z = (elapsedTime * 0.2) % 1;
      gridHelperBack.position.x = Math.sin(elapsedTime * 0.1) * 0.5;

      // Holographic dust coordinates orbital path
      dustParticles.rotation.y = elapsedTime * 0.015;
      dustParticles.rotation.x = elapsedTime * 0.004;

      // Prism rotations
      solidPrism.rotation.y = elapsedTime * 0.12;
      solidPrism.rotation.x = elapsedTime * 0.06;
      
      // Floating coordinates fluctuation (levitation)
      const hoverHeight = 0.4 + Math.sin(elapsedTime * 0.6) * 0.25;
      solidPrism.position.y = hoverHeight;

      // Mouse interactive kinetic shift with inertia
      const mouseFactorX = mouseX * 1.5;
      const mouseFactorY = mouseY * 1.0;
      solidPrism.position.x = THREE.MathUtils.lerp(solidPrism.position.x, mouseFactorX, 0.05);
      solidPrism.position.y = THREE.MathUtils.lerp(solidPrism.position.y, hoverHeight + mouseFactorY, 0.05);

      // Copy values to outer and inner elements
      wireframePrism.position.copy(solidPrism.position);
      wireframePrism.rotation.copy(solidPrism.rotation);

      innerCore.position.copy(solidPrism.position);
      innerCore.rotation.y = -elapsedTime * 0.3;
      innerCore.rotation.x = -elapsedTime * 0.15;

      // Smooth camera lerp parallax
      targetX = mouseX * 0.5;
      targetY = mouseY * 0.3;

      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(new THREE.Vector3(0, 0, -1));

      renderer.render(scene, camera);
    };

    animate();

    // Theme mutation observer
    const observer = new MutationObserver(() => {
      const isLightNow = document.body.classList.contains("light-theme");
      
      // Update neutral color target for floating dust
      targetNeutralColor.set(isLightNow ? "#94a3b8" : "#ffffff");
      
      // Update targets based on current CSS custom variables or defaults
      const rootStyles = getComputedStyle(document.documentElement);
      const primVal = rootStyles.getPropertyValue("--neon-cyan").trim();
      const secVal = rootStyles.getPropertyValue("--neon-violet").trim();
      
      if (primVal) targetPrimaryColor.set(primVal);
      else targetPrimaryColor.set(isLightNow ? "#4f46e5" : "#00f2fe");
      
      if (secVal) targetSecondaryColor.set(secVal);
      else targetSecondaryColor.set(isLightNow ? "#db2777" : "#8a2be2");

      const baseFog = new THREE.Color(isLightNow ? 0xf1f3f6 : 0x08080a);
      targetFogColor.copy(baseFog).lerp(targetPrimaryColor, 0.06);

      dustMaterial.opacity = isLightNow ? 0.3 : 0.6;
      solidPrism.material.color.setHex(isLightNow ? 0xffffff : 0x0a0a0c);
      solidPrism.material.opacity = isLightNow ? 0.12 : 0.22;
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    // --- Cleanup ---
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("theme-color-change", handleThemeColorChange);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      dustGeometry.dispose();
      dustMaterial.dispose();
      prismGeometry.dispose();
      prismMaterial.dispose();
      wireframePrismGeom.dispose();
      wireframePrismMat.dispose();
      innerCoreGeom.dispose();
      innerCoreMat.dispose();
      gridHelperBottom.dispose();
      gridHelperBack.dispose();
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

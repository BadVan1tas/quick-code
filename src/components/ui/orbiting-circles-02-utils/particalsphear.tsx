"use client";

import React, { useEffect, useRef } from "react";

export default function ParticleSphereAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 300);

    const isMobile = window.innerWidth < 768;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const particleCount = isMobile ? 60 : 120;
    const radius = Math.min(width, height) * 0.4;
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      size: number;
      color: string;
    }> = [];

    const colors = ["#6366f1", "#ec4899", "#06b6d4", "#818cf8", "#34d399"];

    // Generate points on a 3D sphere using Fibonacci lattice
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      particles.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        baseX: x * radius,
        baseY: y * radius,
        baseZ: z * radius,
        size: Math.random() * 2 + 1,
        color: colors[i % colors.length],
      });
    }

    let angleY = 0;
    const angleX = 0.2;

    const projected: Array<{ projX: number; projY: number; scale: number; z2: number; color: string; size: number }> = 
      new Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      projected[i] = { projX: 0, projY: 0, scale: 1, z2: 0, color: particles[i].color, size: particles[i].size };
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angleY += 0.008;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        const x1 = p.baseX * cosY - p.baseZ * sinY;
        const z1 = p.baseZ * cosY + p.baseX * sinY;

        const y1 = p.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.baseY * sinX;

        const fov = 350;
        const scale = fov / (fov + z2);

        projected[i].projX = centerX + x1 * scale;
        projected[i].projY = centerY + y1 * scale;
        projected[i].scale = scale;
        projected[i].z2 = z2;
      }

      // Draw 3D projected particles & connections
      for (let i = 0; i < particleCount; i++) {
        const p = projected[i];
        const alpha = Math.max(0.15, Math.min(0.9, (p.z2 + radius) / (radius * 2)));

        ctx.beginPath();
        ctx.arc(p.projX, p.projY, p.size * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Connect near neighbors (less connections on mobile)
        const step = isMobile ? 8 : 4;
        for (let j = i + 1; j < particleCount; j += step) {
          const p2 = projected[j];
          const dx = p.projX - p2.projX;
          const dy = p.projY - p2.projY;
          const distSq = dx * dx + dy * dy;
          const maxDist = 40 * p.scale;

          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(p.projX, p.projY);
            ctx.lineTo(p2.projX, p2.projY);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / maxDist) * 0.2 * alpha;
            ctx.lineWidth = 0.6 * p.scale;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

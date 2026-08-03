"use client";

import React, { useEffect, useRef } from "react";
import { SpotlightCard } from "./SpotlightCard";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ConfettiButton } from "./ConfettiButton";

export function SplineScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 380);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // 3D Geometric Cube Matrix
    let angle = 0;
    const nodes = [
      { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 },
      { x: 1, y: 1, z: -1 },  { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 },  { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 },   { x: -1, y: 1, z: 1 },
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angle += 0.012;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosB = Math.cos(angle * 0.7);
      const sinB = Math.sin(angle * 0.7);

      const scale = Math.min(width, height) * 0.28;
      const cx = width / 2;
      const cy = height / 2;

      const projected = nodes.map((n) => {
        let x1 = n.x * cosA - n.z * sinA;
        let z1 = n.z * cosA + n.x * sinA;
        let y1 = n.y * cosB - z1 * sinB;
        let z2 = z1 * cosB + n.y * sinB;

        let fov = 400;
        let pScale = fov / (fov + z2 * scale * 0.5);
        return {
          x: cx + x1 * scale * pScale,
          y: cy + y1 * scale * pScale,
        };
      });

      // Draw Edges with gradient (no heavy shadowBlur)
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];

        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, "#6366f1");
        grad.addColorStop(0.5, "#ec4899");
        grad.addColorStop(1, "#06b6d4");

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw Nodes
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "300px", background: "rgba(8, 12, 23, 0.6)", borderRadius: "16px", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "4px 12px",
          borderRadius: "9999px",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "var(--text-muted)",
          fontSize: "0.72rem",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.04em",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        ✦ 3D WebGL Matrix Engine Active
      </div>
    </div>
  );
}

export default function SpliteHeroDemo() {
  return (
    <section style={{ padding: "40px 20px 60px", maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
      <SpotlightCard
        className="splite-hero-card"
        style={{
          padding: "36px 28px",
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(11, 17, 35, 0.9) 100%)",
          border: "1px solid rgba(99, 102, 241, 0.3)",
          boxShadow: "0 32px 80px rgba(0, 0, 0, 0.6), 0 0 50px rgba(99, 102, 241, 0.15)",
        }}
        spotlightColor="rgba(99, 102, 241, 0.25)"
      >
        <div className="splite-hero-grid">
          {/* Left Column Text Content */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "var(--r-full)",
                background: "rgba(99, 102, 241, 0.15)",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#a5b4fc",
                fontFamily: "var(--font-mono)",
                marginBottom: "20px",
              }}
            >
              <Sparkles size={14} color="#6366f1" />
              3D INTERACTIVE EXPERIENCE
            </div>

            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.035em",
                marginBottom: "16px",
              }}
            >
              Immersive <span className="text-gradient">3D Web Applications</span>
            </h2>

            <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", lineHeight: 1.65, marginBottom: "28px" }}>
              Bring your software platform to life with interactive 3D product visualizers, WebGL physics engines, and smooth 60fps Spline scenes.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/book">
                <ConfettiButton style={{ padding: "14px 28px", fontSize: "0.92rem" }}>
                  Start 3D Project <ArrowRight size={16} />
                </ConfettiButton>
              </Link>
            </div>
          </div>

          {/* Right Column 3D Spline WebGL Scene */}
          <div style={{ width: "100%", height: "320px", borderRadius: "16px", overflow: "hidden", position: "relative" }}>
            <SplineScene />
          </div>
        </div>
      </SpotlightCard>

      <style>{`
        .splite-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .splite-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}

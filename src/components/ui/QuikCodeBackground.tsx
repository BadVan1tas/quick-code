"use client";

import { useEffect, useRef } from "react";

/**
 * QuikCode branded background:
 *  • Three slow-drifting aurora orbs in brand colours (indigo, pink, cyan)
 *  • Interactive particle constellation canvas on top
 *  • Subtle grid overlay handled by globals.css
 *  All layers sit at negative z-index so page content is always above.
 */

export function QuikCodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /* ─── Particle canvas ─────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = window.innerWidth < 768;
    const mouse = { x: -2000, y: -2000 };
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    if (!isMobile) window.addEventListener("mousemove", onMove);

    const COLORS = ["#6366f1", "#818cf8", "#ec4899", "#f472b6", "#06b6d4", "#a5b4fc"];
    const count = isMobile ? 18 : 55;

    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 0.6,
      a: Math.random() * 0.5 + 0.25,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const MAX_DIST   = 130;
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST;
    const MOUSE_R    = 160;

    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.a;
        ctx.fill();

        // Mouse repulsion line
        if (!isMobile) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_R * MOUSE_R) {
            const d = Math.sqrt(d2);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - d / MOUSE_R) * 0.35;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Particle links
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const ddx = p.x - q.x, ddy = p.y - q.y;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < MAX_DIST_SQ) {
            const d = Math.sqrt(d2);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - d / MAX_DIST) * 0.13;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      {/* ── Aurora orb layer ───────────────────────────────────────── */}
      <div aria-hidden="true" className="qc-aurora-root">
        {/* Indigo — top-left */}
        <div className="qc-orb qc-orb-indigo" />
        {/* Pink — bottom-right */}
        <div className="qc-orb qc-orb-pink" />
        {/* Cyan — centre */}
        <div className="qc-orb qc-orb-cyan" />
        {/* Violet accent — top-right */}
        <div className="qc-orb qc-orb-violet" />
      </div>

      {/* ── Particle constellation ─────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="reduce-motion-pause"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />

      {/* ── Scoped styles ──────────────────────────────────────────── */}
      <style>{`
        .qc-aurora-root {
          position: fixed;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          overflow: hidden;
          background: #05070d;
        }

        .qc-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          will-change: transform, opacity;
        }

        /* Indigo orb — slow float top-left */
        .qc-orb-indigo {
          width: 65vw;
          height: 65vw;
          max-width: 900px;
          max-height: 900px;
          top: -20%;
          left: -15%;
          background: radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(99,102,241,0.06) 55%, transparent 75%);
          animation: qcFloat1 22s ease-in-out infinite alternate;
        }

        /* Pink orb — mid-pace, bottom-right */
        .qc-orb-pink {
          width: 55vw;
          height: 55vw;
          max-width: 780px;
          max-height: 780px;
          bottom: -18%;
          right: -12%;
          background: radial-gradient(circle, rgba(236,72,153,0.18) 0%, rgba(236,72,153,0.05) 55%, transparent 75%);
          animation: qcFloat2 28s ease-in-out infinite alternate;
        }

        /* Cyan orb — centre, slowest */
        .qc-orb-cyan {
          width: 45vw;
          height: 45vw;
          max-width: 640px;
          max-height: 640px;
          top: 30%;
          left: 30%;
          background: radial-gradient(circle, rgba(6,182,212,0.13) 0%, rgba(6,182,212,0.04) 55%, transparent 75%);
          animation: qcFloat3 34s ease-in-out infinite alternate;
        }

        /* Violet accent — top-right */
        .qc-orb-violet {
          width: 38vw;
          height: 38vw;
          max-width: 520px;
          max-height: 520px;
          top: -10%;
          right: 5%;
          background: radial-gradient(circle, rgba(168,85,247,0.14) 0%, rgba(168,85,247,0.04) 55%, transparent 75%);
          animation: qcFloat4 19s ease-in-out infinite alternate;
        }

        @keyframes qcFloat1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(4vw, 3vh) scale(1.05); }
          66%  { transform: translate(-2vw, 6vh) scale(0.97); }
          100% { transform: translate(3vw, -4vh) scale(1.03); }
        }
        @keyframes qcFloat2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          40%  { transform: translate(-5vw, -4vh) scale(1.06); }
          70%  { transform: translate(3vw, -2vh) scale(0.95); }
          100% { transform: translate(-2vw, 5vh) scale(1.04); }
        }
        @keyframes qcFloat3 {
          0%   { transform: translate(0px, 0px) scale(1); opacity: 0.8; }
          50%  { transform: translate(-6vw, 4vh) scale(1.1); opacity: 1; }
          100% { transform: translate(4vw, -3vh) scale(0.92); opacity: 0.7; }
        }
        @keyframes qcFloat4 {
          0%   { transform: translate(0px, 0px) scale(1); }
          45%  { transform: translate(-3vw, 5vh) scale(1.08); }
          100% { transform: translate(5vw, -2vh) scale(0.96); }
        }

        @media (prefers-reduced-motion: reduce) {
          .qc-orb { animation: none !important; }
        }
      `}</style>
    </>
  );
}

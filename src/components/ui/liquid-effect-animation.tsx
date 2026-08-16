"use client";

import { useEffect, useRef } from "react";

/**
 * QuikCode Liquid Background
 * Uses the same threejs-components liquid engine as 21st.dev but feeds it
 * a dynamically generated canvas gradient in QuikCode brand colours
 * (indigo → pink → cyan → violet) instead of an external image.
 *
 * Layers:
 *   z -3  liquid canvas (WebGL, threejs-components CDN)
 *   z -2  dark vignette scrim (keeps text readable)
 *   z -1  subtle brand colour overlay
 *   z  0+ page content
 */
export function LiquidEffectAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    /* ── Build a QuikCode gradient texture via an off-screen canvas ── */
    const tex = document.createElement("canvas");
    tex.width  = 1024;
    tex.height = 1024;
    const tc = tex.getContext("2d")!;

    // Base: dark navy
    tc.fillStyle = "#05070d";
    tc.fillRect(0, 0, 1024, 1024);

    // Main diagonal gradient — indigo → pink → cyan
    const diag = tc.createLinearGradient(0, 0, 1024, 1024);
    diag.addColorStop(0.00, "#1e1b4b"); // deep indigo
    diag.addColorStop(0.20, "#4338ca"); // indigo
    diag.addColorStop(0.40, "#6366f1"); // brand indigo
    diag.addColorStop(0.60, "#ec4899"); // brand pink
    diag.addColorStop(0.80, "#06b6d4"); // brand cyan
    diag.addColorStop(1.00, "#a855f7"); // violet
    tc.fillStyle = diag;
    tc.fillRect(0, 0, 1024, 1024);

    // Radial glow — indigo top-left
    const r1 = tc.createRadialGradient(150, 150, 0, 150, 150, 500);
    r1.addColorStop(0, "rgba(99,102,241,0.85)");
    r1.addColorStop(1, "transparent");
    tc.fillStyle = r1;
    tc.fillRect(0, 0, 1024, 1024);

    // Radial glow — pink centre-right
    const r2 = tc.createRadialGradient(820, 400, 0, 820, 400, 450);
    r2.addColorStop(0, "rgba(236,72,153,0.75)");
    r2.addColorStop(1, "transparent");
    tc.fillStyle = r2;
    tc.fillRect(0, 0, 1024, 1024);

    // Radial glow — cyan bottom
    const r3 = tc.createRadialGradient(400, 900, 0, 400, 900, 420);
    r3.addColorStop(0, "rgba(6,182,212,0.70)");
    r3.addColorStop(1, "transparent");
    tc.fillStyle = r3;
    tc.fillRect(0, 0, 1024, 1024);

    // Violet accent — top-right
    const r4 = tc.createRadialGradient(950, 80, 0, 950, 80, 380);
    r4.addColorStop(0, "rgba(168,85,247,0.65)");
    r4.addColorStop(1, "transparent");
    tc.fillStyle = r4;
    tc.fillRect(0, 0, 1024, 1024);

    const textureUrl = tex.toDataURL("image/png");

    /* ── Inject the Three.js liquid engine ── */
    const script = document.createElement("script");
    script.type  = "module";
    script.id    = "qc-liquid-script";
    script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';

      const canvas = document.getElementById('qc-liquid-canvas');
      if (canvas && !window.__qcLiquidApp) {
        const app = LiquidBackground(canvas);

        // Feed the QuikCode gradient texture
        app.loadImage(${JSON.stringify(textureUrl)});

        // Tune material for a premium metallic liquid look
        app.liquidPlane.material.metalness  = 0.82;
        app.liquidPlane.material.roughness  = 0.18;
        app.liquidPlane.uniforms.displacementScale.value = 4.5;
        app.setRain(false);

        window.__qcLiquidApp = app;
      }
    `;
    document.body.appendChild(script);

    return () => {
      if (window.__qcLiquidApp?.dispose) {
        window.__qcLiquidApp.dispose();
      }
      window.__qcLiquidApp = undefined;
      const el = document.getElementById("qc-liquid-script");
      if (el) document.body.removeChild(el);
    };
  }, []);

  return (
    <>
      {/* Liquid WebGL canvas */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -3,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#05070d",
        }}
      >
        <canvas
          ref={canvasRef}
          id="qc-liquid-canvas"
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>

      {/* Vignette scrim — keeps text legible */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(5,7,13,0.45) 0%, rgba(5,7,13,0.72) 80%, rgba(5,7,13,0.88) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle brand-colour overlay — adds depth without killing the liquid */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, transparent 50%, rgba(236,72,153,0.04) 100%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

declare global {
  interface Window {
    __qcLiquidApp?: {
      dispose?:      () => void;
      loadImage?:    (url: string) => void;
      setRain?:      (v: boolean)  => void;
      liquidPlane?:  any;
    };
  }
}

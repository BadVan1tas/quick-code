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

    /* ── Inject the Three.js liquid engine ── */
    const imageUrl = `${window.location.origin}/og-image.png`;

    const script = document.createElement("script");
    script.type  = "module";
    script.id    = "qc-liquid-script";
    script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';

      const canvas = document.getElementById('qc-liquid-canvas');
      if (canvas && !window.__qcLiquidApp) {
        const app = LiquidBackground(canvas);

        // Use og-image.png as the liquid surface texture
        app.loadImage(${JSON.stringify(imageUrl)});

        // Premium metallic liquid look
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

      {/* Vignette scrim — toned down so text always wins */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(5,7,13,0.62) 0%, rgba(5,7,13,0.82) 70%, rgba(5,7,13,0.94) 100%)",
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

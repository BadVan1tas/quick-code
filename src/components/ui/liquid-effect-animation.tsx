"use client"

import { useEffect, useRef } from "react"

export function LiquidEffectAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const script = document.createElement("script")
    script.type = "module"
    script.id = "liquid-bg-script"
    script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';

      const canvas = document.getElementById('liquid-canvas');
      if (canvas && !window.__liquidApp) {
        const app = LiquidBackground(canvas);
        app.loadImage('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/enhanced_8bfe61b0-d431-433a-8acb-49d508bf88b4-image-vWzKFKS7vQy7s8wfQYzEpaoiYaVMkr.png');
        app.liquidPlane.material.metalness = 0.75;
        app.liquidPlane.material.roughness = 0.25;
        app.liquidPlane.uniforms.displacementScale.value = 5;
        app.setRain(false);
        window.__liquidApp = app;
      }
    `

    document.body.appendChild(script)

    return () => {
      if (window.__liquidApp?.dispose) {
        window.__liquidApp.dispose()
        window.__liquidApp = undefined
      }
      const existing = document.getElementById("liquid-bg-script")
      if (existing) document.body.removeChild(existing)
    }
  }, [])

  return (
    <>
      {/* Full-screen liquid canvas — sits at z-index -2, behind grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          touchAction: "none",
        }}
      >
        <canvas
          ref={canvasRef}
          id="liquid-canvas"
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>

      {/* Dark scrim so text stays readable over the vivid liquid surface */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background:
            "linear-gradient(180deg, rgba(5,7,13,0.72) 0%, rgba(5,7,13,0.55) 50%, rgba(5,7,13,0.72) 100%)",
          pointerEvents: "none",
        }}
      />
    </>
  )
}

declare global {
  interface Window {
    __liquidApp?: {
      dispose?: () => void
      liquidPlane?: any
      loadImage?: (url: string) => void
      setRain?: (v: boolean) => void
    }
  }
}

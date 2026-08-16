"use client";

import React from "react";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

/**
 * Heavy BorderBeam — triple-layer neon comet that races the card border:
 *   Layer 1 — fat diffuse glow halo  (blur: 12px, 18px wide)
 *   Layer 2 — bright coloured beam   (blur: 5px,  3px wide)
 *   Layer 3 — white-hot core          (no blur,   1px wide)
 * Plus: pulsing card-edge glow underneath.
 */
export const BorderBeam: React.FC<BorderBeamProps> = ({
  className = "",
  duration = 3,
  colorFrom = "#6366f1",
  colorTo   = "#ec4899",
  delay = 0,
}) => {
  const uid = React.useId().replace(/:/g, "u");

  return (
    <>
      <svg
        aria-hidden="true"
        className={`bb-svg ${className}`}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          borderRadius: "inherit",
          overflow: "visible",
          zIndex: 0,
        }}
      >
        <defs>
          {/* Gradient: transparent → colorFrom → colorTo → white-hot → transparent */}
          <linearGradient id={`bb-grad-${uid}`} gradientUnits="userSpaceOnUse"
            x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={colorFrom}  stopOpacity="0" />
            <stop offset="15%"  stopColor={colorFrom}  stopOpacity="0.8" />
            <stop offset="50%"  stopColor={colorTo}    stopOpacity="1" />
            <stop offset="80%"  stopColor="#ffffff"    stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff"    stopOpacity="0" />
          </linearGradient>

          {/* Halo gradient (wider, softer) */}
          <linearGradient id={`bb-halo-${uid}`} gradientUnits="userSpaceOnUse"
            x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={colorFrom}  stopOpacity="0" />
            <stop offset="20%"  stopColor={colorFrom}  stopOpacity="0.4" />
            <stop offset="60%"  stopColor={colorTo}    stopOpacity="0.5" />
            <stop offset="100%" stopColor={colorTo}    stopOpacity="0" />
          </linearGradient>

          {/* Glow filter — heavy blur */}
          <filter id={`bb-glow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur1" />
            <feGaussianBlur stdDeviation="12" result="blur2" in="SourceGraphic" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Tight glow for core beam */}
          <filter id={`bb-core-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Layer 1: fat diffuse halo ─────────────────────────── */}
        <rect
          className={`bb-rect bb-halo bbu-${uid}`}
          x="1" y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="13" ry="13"
          fill="none"
          stroke={`url(#bb-halo-${uid})`}
          strokeWidth="18"
          filter={`url(#bb-glow-${uid})`}
        />

        {/* ── Layer 2: bright coloured core beam ───────────────── */}
        <rect
          className={`bb-rect bb-beam bbu-${uid}`}
          x="1" y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="13" ry="13"
          fill="none"
          stroke={`url(#bb-grad-${uid})`}
          strokeWidth="3"
          filter={`url(#bb-core-${uid})`}
        />

        {/* ── Layer 3: white-hot 1px core (no filter) ──────────── */}
        <rect
          className={`bb-rect bb-core bbu-${uid}`}
          x="1" y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="13" ry="13"
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="1"
        />

        {/* ── Card-edge ambient glow pulse ─────────────────────── */}
        <rect
          className={`bb-pulse bbu-pulse-${uid}`}
          x="0" y="0"
          width="100%"
          height="100%"
          rx="14" ry="14"
          fill="none"
          stroke={colorFrom}
          strokeWidth="1"
        />
      </svg>

      <style>{`
        /* All three beam layers share the same dasharray/animation */
        .bb-rect {
          stroke-dasharray: 55% 200%;
          animation: bb-chase linear infinite;
        }

        /* Per-instance timing via uid class */
        .bbu-${uid} {
          animation-duration: ${duration}s;
          animation-delay:    -${delay}s;
        }

        @keyframes bb-chase {
          from { stroke-dashoffset: 0%; }
          to   { stroke-dashoffset: -300%; }
        }

        /* Ambient glow pulse — different timing */
        .bb-pulse {
          animation: bb-pulse-glow ease-in-out infinite;
        }
        .bbu-pulse-${uid} {
          animation-duration: ${duration * 1.8}s;
          animation-delay: -${delay * 0.5}s;
        }

        @keyframes bb-pulse-glow {
          0%, 100% { opacity: 0.15; }
          50%      { opacity: 0.55; }
        }

        @media (max-width: 768px) {
          .bb-svg { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bb-rect, .bb-pulse { animation: none !important; }
        }
      `}</style>
    </>
  );
};

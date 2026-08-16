"use client";

import React from "react";

interface BorderBeamProps {
  className?: string;
  size?: number;       // kept for API compat — no longer used
  duration?: number;
  borderWidth?: number;
  anchor?: number;     // kept for API compat
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

/**
 * Elegant card-border shimmer.
 * A thin glowing stroke traces the card perimeter continuously,
 * fading in at its head and out at its tail — no chunky colour blocks.
 */
export const BorderBeam: React.FC<BorderBeamProps> = ({
  className = "",
  duration = 4,
  borderWidth = 1,
  colorFrom = "#6366f1",
  colorTo = "#ec4899",
  delay = 0,
}) => {
  // Unique ID so multiple instances don't share the same <defs>
  const uid = React.useId().replace(/:/g, "s");

  return (
    <>
      <svg
        aria-hidden="true"
        className={`border-beam-svg ${className}`}
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
          <linearGradient id={`bbg-${uid}`} gradientUnits="userSpaceOnUse"
            x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={colorFrom} stopOpacity="0" />
            <stop offset="25%"  stopColor={colorFrom} stopOpacity="1" />
            <stop offset="75%"  stopColor={colorTo}   stopOpacity="1" />
            <stop offset="100%" stopColor={colorTo}   stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect
          className={`border-beam-rect bbr-${uid}`}
          x={borderWidth}
          y={borderWidth}
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="13"
          ry="13"
          fill="none"
          stroke={`url(#bbg-${uid})`}
          strokeWidth={borderWidth + 0.5}
        />
      </svg>

      {/* Scoped keyframe + per-instance timing via a class */}
      <style>{`
        .border-beam-rect {
          stroke-dasharray: 35% 200%;
          animation: bb-trace linear infinite;
        }

        /* Per-instance duration & delay injected via class */
        .bbr-${uid} {
          animation-duration: ${duration}s;
          animation-delay: -${delay}s;
        }

        @keyframes bb-trace {
          from { stroke-dashoffset: 0%; }
          to   { stroke-dashoffset: -300%; }
        }

        @media (max-width: 768px) {
          .border-beam-svg { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .border-beam-rect { animation: none !important; }
        }
      `}</style>
    </>
  );
};

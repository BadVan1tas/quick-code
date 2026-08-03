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

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className = "",
  size = 200,
  duration = 15,
  borderWidth = 1.5,
  anchor = 90,
  colorFrom = "#6366f1",
  colorTo = "#ec4899",
  delay = 0,
}) => {
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        border: `${borderWidth}px solid transparent`,
        maskImage: `linear-gradient(transparent, transparent), linear-gradient(white, white)`,
        maskClip: "padding-box, border-box",
        maskComposite: "intersect",
        WebkitMaskComposite: "destination-out",
        overflow: "hidden",
      }}
      className={`border-beam-wrapper ${className}`}
    >
      <div
        className="border-beam-glow"
        style={{
          position: "absolute",
          aspectRatio: "1/1",
          width: `${size}px`,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          animation: `border-beam ${duration}s infinite linear`,
          animationDelay: `-${delay}s`,
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
        }}
      />
      <style>{`
        @keyframes border-beam {
          0% {
            offset-distance: 0%;
          }
          100% {
            offset-distance: 100%;
          }
        }
        @media (max-width: 768px) {
          .border-beam-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

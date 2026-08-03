"use client";

import React from "react";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";

const orbits = [
  {
    className: "orbit-ring-1",
    duration: 18,
    icons: [
      { src: "https://images.shadcnspace.com/assets/svgs/supabase.svg", alt: "Supabase", angle: -60 },
      { src: "https://images.shadcnspace.com/assets/svgs/gemini.svg", alt: "gemini", angle: 0 },
      { src: "https://images.shadcnspace.com/assets/svgs/make.svg", alt: "Make", angle: 60 },
    ],
  },
  {
    className: "orbit-ring-2",
    duration: 24,
    icons: [
      { src: "https://images.shadcnspace.com/assets/svgs/figma.svg", alt: "Figma", angle: 0 },
      { src: "https://images.shadcnspace.com/assets/svgs/slack.svg", alt: "Slack", angle: -90 },
    ],
  },
  {
    className: "orbit-ring-3",
    duration: 30,
    icons: [
      { src: "https://images.shadcnspace.com/assets/svgs/clude.svg", alt: "Claude", angle: -60 },
      { src: "https://images.shadcnspace.com/assets/svgs/react.svg", alt: "react", angle: 0 },
      { src: "https://images.shadcnspace.com/assets/svgs/python.svg", alt: "python", angle: 60 },
    ],
  },
];

export default function OrbitingCirclesGlobeDemo() {
  return (
    <div style={{ position: "relative", width: "100%", height: "360px", overflow: "hidden", display: "flex", justifyContent: "center" }}>
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) + 360deg)) }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) - 360deg)) }
        }
        @keyframes counter-cw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) }
        }
        @keyframes counter-ccw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) }
        }
        .orbit-ring-1 { width: 220px; height: 220px; }
        .orbit-ring-2 { width: 290px; height: 290px; }
        .orbit-ring-3 { width: 350px; height: 350px; }

        @media (min-width: 768px) {
          .orbit-ring-1 { width: 280px; height: 280px; }
          .orbit-ring-2 { width: 380px; height: 380px; }
          .orbit-ring-3 { width: 480px; height: 480px; }
        }
      `}</style>

      {/* Center particle globe */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translate(-50%, 50%)",
          aspectRatio: "1/1",
          pointerEvents: "none",
          width: "240px",
          height: "240px",
          zIndex: 10,
        }}
      >
        <ParticleSphereAnimation />
      </div>

      {/* Orbiting rings */}
      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        const allIcons = [
          ...orbit.icons,
          ...orbit.icons.map((ic) => ({
            ...ic,
            angle: ic.angle + 180,
            alt: `${ic.alt}-mirror`,
          })),
        ];

        return (
          <div
            key={index}
            className={orbit.className}
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translate(-50%, 50%)",
              borderRadius: "50%",
              border: "1px solid rgba(99, 102, 241, 0.25)",
              boxShadow: "0 0 30px rgba(99, 102, 241, 0.08)",
            }}
          >
            {allIcons.map((iconData, iconIndex) => (
              <div
                key={iconIndex}
                style={
                  {
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    height: "50%",
                    marginLeft: "-16px",
                    transformOrigin: "bottom center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    "--start-angle": `${iconData.angle}deg`,
                    animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                  } as React.CSSProperties
                }
              >
                <div
                  style={
                    {
                      padding: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "50%",
                      background: "rgba(11, 17, 35, 0.9)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.6), 0 0 15px rgba(99, 102, 241, 0.3)",
                      marginTop: "-16px",
                      position: "relative",
                      zIndex: 10,
                      "--counter-offset": `${-iconData.angle}deg`,
                      animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                    } as React.CSSProperties
                  }
                >
                  <img
                    src={iconData.src}
                    alt={iconData.alt}
                    width={24}
                    height={24}
                    style={{ width: "20px", height: "20px", display: "block" }}
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

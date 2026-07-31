"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "We start with a 30-minute strategy session to map your requirements, goals, and constraints. You leave with a clear scope document.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    color: "#6366f1",
    duration: "Day 1",
  },
  {
    num: "02",
    title: "Design & Architecture",
    desc: "Our lead engineer designs the system architecture and UI wireframes. You approve before a single line of production code is written.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    color: "#ec4899",
    duration: "Day 1–2",
  },
  {
    num: "03",
    title: "Rapid Development",
    desc: "We build fast using Next.js 15, TypeScript, and battle-tested tooling. Daily progress updates keep you in the loop every step.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    color: "#06b6d4",
    duration: "Day 2–5",
  },
  {
    num: "04",
    title: "Review & Polish",
    desc: "A joint review session where you test-drive the product. We implement your feedback and run performance and security audits.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    color: "#10b981",
    duration: "Day 6",
  },
  {
    num: "05",
    title: "Launch & Handover",
    desc: "We deploy to production, hand over all source code with full documentation, and provide 30 days of post-launch support.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
    color: "#a855f7",
    duration: "Day 7",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "72px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="section-label">Process</div>
        <h2 className="section-heading">
          Delivered in <span className="text-gradient-emerald">7 Days</span> — Here&apos;s How
        </h2>
        <p className="section-subheading" style={{ margin: "0 auto" }}>
          Our battle-tested 5-step delivery framework removes uncertainty and keeps projects on time, every time.
        </p>
      </div>

      {/* Steps */}
      <div style={{ position: "relative" }}>
        {/* Vertical connector line */}
        <div
          style={{
            position: "absolute",
            left: "calc(50% - 1px)",
            top: "32px",
            bottom: "32px",
            width: "2px",
            background: "linear-gradient(to bottom, #6366f1, #ec4899, #06b6d4, #10b981, #a855f7)",
            opacity: visible ? 0.3 : 0,
            transition: "opacity 0.7s ease 0.4s",
          }}
          className="hide-mobile"
          aria-hidden
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {steps.map((step, i) => (
            <ProcessStep key={step.num} step={step} index={i} visible={visible} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .hide-mobile { display: none !important; } }
      `}</style>
    </section>
  );
}

function ProcessStep({
  step,
  index,
  visible,
}: {
  step: (typeof steps)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isRight = index % 2 === 1;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 64px 1fr",
        gap: "24px",
        alignItems: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms`,
      }}
    >
      {/* Left content (odd indices are blank) */}
      {!isRight ? (
        <StepCard step={step} hovered={hovered} />
      ) : (
        <div />
      )}

      {/* Center node */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: hovered ? step.color : "rgba(255,255,255,0.05)",
            border: `2px solid ${hovered ? step.color : "rgba(255,255,255,0.15)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: hovered ? "#fff" : step.color,
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: hovered ? `0 0 24px ${step.color}60, 0 0 48px ${step.color}20` : "none",
            zIndex: 1,
            position: "relative",
            flexShrink: 0,
          }}
        >
          {step.icon}
        </div>
      </div>

      {/* Right content (even indices are blank) */}
      {isRight ? (
        <StepCard step={step} hovered={hovered} />
      ) : (
        <div />
      )}
    </div>
  );
}

function StepCard({ step, hovered }: { step: (typeof steps)[0]; hovered: boolean }) {
  return (
    <div
      style={{
        padding: "24px",
        borderRadius: "var(--r-md)",
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? step.color + "40" : "rgba(255,255,255,0.06)"}`,
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "10px",
        }}
      >
        <span
          style={{
            fontSize: "0.72rem",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            color: step.color,
            letterSpacing: "0.08em",
          }}
        >
          {step.num}
        </span>
        <span
          style={{
            fontSize: "0.7rem",
            fontFamily: "var(--font-mono)",
            padding: "2px 10px",
            background: step.color + "15",
            border: `1px solid ${step.color}30`,
            borderRadius: "var(--r-full)",
            color: step.color,
            letterSpacing: "0.04em",
          }}
        >
          {step.duration}
        </span>
      </div>
      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "8px", letterSpacing: "-0.02em" }}>
        {step.title}
      </h3>
      <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
        {step.desc}
      </p>
    </div>
  );
}

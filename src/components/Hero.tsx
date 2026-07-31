"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FlipWords } from "./ui/FlipWords";
import { CodeTerminal } from "./ui/CodeTerminal";
import { ConfettiButton } from "./ui/ConfettiButton";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Code, Award } from "lucide-react";

/* ─── Animated Counter Hook ─── */
function useCounter(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

const stats = [
  { value: 140, suffix: "+", label: "Projects Delivered", color: "#06b6d4" },
  { value: 72, suffix: "h", label: "Avg. Turnaround", color: "#6366f1" },
  { value: 99, suffix: "%", label: "Client Satisfaction", color: "#ec4899" },
  { value: 256, suffix: "‑bit", label: "SSL Encryption", color: "#10b981" },
];

const flipWords = [
  "High-Impact SaaS",
  "Payment Portals",
  "Scalable Web Apps",
  "Custom AI Platforms",
  "Stripe Billing Systems",
];

export default function Hero() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeroVisible(true); }, { threshold: 0.1 });
    if (heroRef.current) obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.2 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const c0 = useCounter(stats[0].value, 1600, statsVisible);
  const c1 = useCounter(stats[1].value, 1400, statsVisible);
  const c2 = useCounter(stats[2].value, 1800, statsVisible);
  const c3 = useCounter(stats[3].value, 1200, statsVisible);
  const counters = [c0, c1, c2, c3];

  return (
    <section
      style={{
        position: "relative",
        padding: "110px 24px 80px",
        maxWidth: "1200px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div ref={heroRef} style={{ position: "relative", zIndex: 1 }}>
        {/* Live Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px 6px 10px",
            borderRadius: "var(--r-full)",
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.25)",
            marginBottom: "32px",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span className="dot-live" />
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6ee7b7", letterSpacing: "0.04em", fontFamily: "var(--font-mono)" }}>
            NEXT-GEN SOFTWARE & WEB DEVELOPMENT — BOOKINGS OPEN
          </span>
        </div>

        {/* Headline with FlipWords Animation */}
        <h1
          style={{
            fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            marginBottom: "20px",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          }}
        >
          We Engineer <FlipWords words={["Next.js Apps", "Payment Portals", "Custom Systems", "SaaS Platforms"]} duration={2800} />
          <br />
          <span className="text-gradient">With Military Precision</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
            color: "var(--text-muted)",
            maxWidth: "680px",
            margin: "0 auto 36px",
            lineHeight: 1.65,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          Quick Code turns complex requirements into high-converting web applications, payment portals, and enterprise software — backed by modern architecture and bulletproof security.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "64px",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
          }}
        >
          <Link href="/book">
            <ConfettiButton style={{ fontSize: "1rem", padding: "15px 36px" }}>
              Get Instant Quote & Book <ArrowRight size={18} />
            </ConfettiButton>
          </Link>
          <a href="#portfolio" className="btn-secondary" style={{ fontSize: "1rem", padding: "15px 36px" }}>
            Explore Our Work
          </a>
        </div>
      </div>

      {/* ─── 21st.dev Interactive Code Terminal Showcase ─── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "920px",
          margin: "0 auto 80px",
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
          transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
        }}
      >
        <CodeTerminal />
      </div>

      {/* Stats counter row */}
      <div
        ref={statsRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          maxWidth: "920px",
          margin: "0 auto 60px",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className="glass-card"
            style={{
              padding: "24px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 800,
                fontFamily: "var(--font-heading)",
                color: s.color,
                letterSpacing: "-0.03em",
                marginBottom: "6px",
                filter: `drop-shadow(0 0 12px ${s.color}60)`,
              }}
            >
              {counters[i]}
              {s.suffix}
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

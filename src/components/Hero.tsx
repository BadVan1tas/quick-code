"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
      className="hero-section"
      style={{
        position: "relative",
        padding: "100px 16px 60px",
        maxWidth: "1200px",
        width: "100%",
        boxSizing: "border-box",
        margin: "0 auto",
        textAlign: "center",
        overflowX: "hidden",
      }}
    >
      <div ref={heroRef} className="hero-content-wrapper" style={{ position: "relative", zIndex: 1 }}>
        {/* Live Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "var(--r-full)",
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.25)",
            marginBottom: "24px",
            maxWidth: "100%",
            justifyContent: "center",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span className="dot-live" />
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6ee7b7", letterSpacing: "0.04em", fontFamily: "var(--font-mono)" }}>
            <span className="hide-mobile">NEXT-GEN SOFTWARE &amp; WEB DEVELOPMENT — BOOKINGS OPEN</span>
            <span className="show-mobile">NEXT-GEN SOFTWARE &amp; WEB DEV</span>
          </span>
        </div>

        {/* Headline with FlipWords Animation */}
        <h1
          style={{
            fontSize: "clamp(1.35rem, 5.2vw, 4.8rem)",
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: "-0.035em",
            marginBottom: "20px",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            maxWidth: "100%",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          }}
        >
          <span style={{ display: "inline" }}>We Engineer </span>
          <span className="hero-headline-flipwords" style={{ display: "inline-block" }}>
            <FlipWords words={["Next.js Apps", "Payment Portals", "Custom Systems", "SaaS Platforms"]} duration={2800} />
          </span>
          <br className="hide-mobile" />{" "}
          <span className="text-gradient" style={{ display: "inline" }}>With Military Precision</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(0.92rem, 2vw, 1.2rem)",
            color: "var(--text-muted)",
            maxWidth: "680px",
            margin: "0 auto 32px",
            lineHeight: 1.65,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          Quik Code turns complex requirements into high-converting web applications, payment portals, and enterprise software — backed by modern architecture and bulletproof security.
        </p>

        {/* CTAs */}
        <div
          className="hero-cta-container"
          style={{
            display: "flex",
            gap: "14px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "56px",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
          }}
        >
          <ConfettiButton
            href="/book"
            style={{ fontSize: "0.95rem", padding: "14px 28px", width: "100%" }}
          >
            Get Instant Quote &amp; Book <ArrowRight size={18} />
          </ConfettiButton>
          <a href="#portfolio" className="btn-secondary" style={{ fontSize: "0.95rem", padding: "14px 28px" }}>
            Explore Our Work
          </a>
        </div>
      </div>

      {/* ─── 21st.dev Interactive Code Terminal Showcase ─── */}
      <div
        className="codeterminal-container"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "920px",
          margin: "0 auto 80px",
          width: "100%",
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
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "16px",
          maxWidth: "920px",
          width: "100%",
          boxSizing: "border-box",
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

      <style>{`
        /* Always hide show-mobile by default */
        span.show-mobile {
          display: none;
        }

        @media (max-width: 768px) {
          .hero-section {
            text-align: center !important;
            padding: 80px 16px 40px !important;
            overflow-x: hidden !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          .hero-content-wrapper {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          .hero-content-wrapper * {
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .hero-cta-container {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100% !important;
            gap: 12px !important;
          }
          .hero-cta-container a, 
          .hero-cta-container button,
          .hero-cta-container .btn-primary,
          .hero-cta-container .btn-secondary {
            width: 100% !important;
            max-width: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            box-sizing: border-box !important;
          }
          span.hide-mobile {
            display: none !important;
          }
          span.show-mobile {
            display: inline !important;
          }
          br.hide-mobile {
            display: none !important;
          }
          .codeterminal-container {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
            -webkit-overflow-scrolling: touch !important;
          }
          /* Ensure FlipWords wraps on mobile */
          .hero-headline-flipwords {
            display: block !important;
            width: 100% !important;
          }
          .hero-headline-flipwords > span {
            display: inline !important;
            white-space: normal !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
          }
        }
      `}</style>
    </section>
  );
}

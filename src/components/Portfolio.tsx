"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, Sparkles, ArrowUpRight } from "lucide-react";

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      style={{
        padding: "100px 24px",
        maxWidth: "1250px",
        margin: "0 auto",
        width: "100%",
        position: "relative",
      }}
    >
      {/* Editorial Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "24px",
          marginBottom: "64px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          paddingBottom: "32px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div>
          <div
            className="section-label"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "8px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "#6366f1",
            }}
          >
            <Sparkles size={14} /> (02) SELECTED WORK &amp; CASE STUDIES
          </div>
          <h2
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 800,
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#fff",
              margin: 0,
            }}
          >
            Production <span className="text-gradient">Portfolio</span>
          </h2>
        </div>

        {/* Lead Dev Profile Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            background: "rgba(15, 20, 38, 0.8)",
            padding: "10px 18px",
            borderRadius: "16px",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          }}
        >
          <img
            src="/portfolio/avatar.jpg"
            alt="Shaurya Shashi"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              objectFit: "cover",
              border: "1px solid rgba(99, 102, 241, 0.5)",
            }}
          />
          <div>
            <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff" }}>Shaurya Shashi</div>
            <div style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>Lead Dev &amp; Founder</div>
          </div>
          <span style={{ fontSize: "0.7rem", padding: "4px 8px", borderRadius: "6px", background: "rgba(16,185,129,0.15)", color: "#34d399", fontWeight: 700, marginLeft: "4px" }}>
            Available 🟢
          </span>
        </div>
      </div>

      {/* Project Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
        
        {/* Project 01: Homechef Bakery */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "48px",
            alignItems: "center",
            padding: "48px 40px",
            borderRadius: "32px",
            background: "rgba(15, 20, 38, 0.65)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(245,158,11,0.08)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          }}
        >
          {/* Image */}
          <div
            style={{
              borderRadius: "24px",
              overflow: "hidden",
              height: "340px",
              position: "relative",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img
              src="/portfolio/homechef.jpg"
              alt="Homechef Bakery"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "16px 20px",
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "0.78rem", color: "#fbbf24", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                🎂 100% Eggless Gourmet Bakery
              </span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)" }}>
                Bangalore, India
              </span>
            </div>
          </div>

          {/* Details */}
          <div>
            <div
              style={{
                fontSize: "clamp(3.5rem, 6vw, 5rem)",
                fontWeight: 900,
                fontFamily: "var(--font-heading)",
                lineHeight: 0.9,
                color: "rgba(255,255,255,0.08)",
                marginBottom: "12px",
              }}
            >
              01
            </div>
            <h3
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
                fontWeight: 800,
                fontFamily: "var(--font-heading)",
                color: "#fff",
                letterSpacing: "-0.02em",
                marginBottom: "12px",
                lineHeight: 1.1,
              }}
            >
              Homechef Bakery
            </h3>
            <div style={{ fontSize: "0.82rem", color: "#f59e0b", fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>
              E-Commerce Storefront · Next.js · WhatsApp API
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", lineHeight: 1.75, marginBottom: "24px" }}>
              A full-stack gourmet bakery platform handcrafted for Hebbal, Bangalore. Features animated interactive product showcases (Black Forest, Alphonso Mango, Belgian Chocolate Truffle), custom bespoke cake builders, and instant WhatsApp ordering.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
              {["Next.js 15", "TypeScript", "Tailwind CSS", "Vercel", "WhatsApp API"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.76rem",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    background: "rgba(245, 158, 11, 0.12)",
                    color: "#fbbf24",
                    border: "1px solid rgba(245, 158, 11, 0.25)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="https://homechef-bakery.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                padding: "14px 32px",
                fontSize: "0.92rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "linear-gradient(135deg, #d97706, #b45309)",
                textDecoration: "none",
              }}
            >
              <span>Visit Live Website</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Project 02: Cheap PC Resident */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "48px",
            alignItems: "center",
            padding: "48px 40px",
            borderRadius: "32px",
            background: "rgba(15, 20, 38, 0.65)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(6, 182, 212, 0.25)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(6,182,212,0.08)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          {/* Details (Left on desktop) */}
          <div style={{ order: 1 }}>
            <div
              style={{
                fontSize: "clamp(3.5rem, 6vw, 5rem)",
                fontWeight: 900,
                fontFamily: "var(--font-heading)",
                lineHeight: 0.9,
                color: "rgba(255,255,255,0.08)",
                marginBottom: "12px",
              }}
            >
              02
            </div>
            <h3
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
                fontWeight: 800,
                fontFamily: "var(--font-heading)",
                color: "#fff",
                letterSpacing: "-0.02em",
                marginBottom: "12px",
                lineHeight: 1.1,
              }}
            >
              Cheap PC Resident
            </h3>
            <div style={{ fontSize: "0.82rem", color: "#06b6d4", fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>
              Gaming Marketplace · 3D Scroll · Cyberpunk UI
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", lineHeight: 1.75, marginBottom: "24px" }}>
              A futuristic cyberpunk-themed gaming accounts store with custom 3D perspective rotation scrolling, holographic HUD indicators, and permanent warranty support across Steam, Rockstar, Ubisoft, and EA.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
              {["HTML5", "Vanilla CSS", "JavaScript", "3D Perspective Scroll", "HUD Interface"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.76rem",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    background: "rgba(6, 182, 212, 0.12)",
                    color: "#67e8f9",
                    border: "1px solid rgba(6, 182, 212, 0.25)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="https://cheappcresident.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                padding: "14px 32px",
                fontSize: "0.92rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "linear-gradient(135deg, #0891b2, #7c3aed)",
                textDecoration: "none",
              }}
            >
              <span>Visit Live Website</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Image (Right on desktop) */}
          <div
            style={{
              order: 2,
              borderRadius: "24px",
              overflow: "hidden",
              height: "340px",
              position: "relative",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img
              src="/portfolio/cheappc.jpg"
              alt="Cheap PC Resident"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "16px 20px",
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "0.78rem", color: "#67e8f9", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                🎮 Steam / Rockstar / EA / Ubisoft
              </span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)" }}>
                Lifetime Warranty
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Contact Action Bar */}
      <div
        style={{
          marginTop: "60px",
          padding: "36px",
          borderRadius: "24px",
          background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.08))",
          border: "1px solid rgba(99,102,241,0.3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <h4 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", margin: "0 0 6px 0", fontFamily: "var(--font-heading)" }}>
            Want a website like these for your business?
          </h4>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
            Direct contact: <strong style={{ color: "#fff" }}>shauryashashi30@gmail.com</strong> · WhatsApp: <strong style={{ color: "#34d399" }}>+91 9992145372</strong>
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a
            href="https://wa.me/919992145372?text=Hi%20Shaurya,%20I%20saw%20your%20portfolio%20on%20QuikCode%20and%20want%20to%20build%20a%20project!"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "12px 24px",
              borderRadius: "var(--r-sm)",
              background: "#10b981",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Chat on WhatsApp 💬
          </a>
          <Link
            href="/portfolio"
            style={{
              padding: "12px 24px",
              borderRadius: "var(--r-sm)",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Full Portfolio Page →
          </Link>
        </div>
      </div>
    </section>
  );
}

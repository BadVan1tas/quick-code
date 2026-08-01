"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CatBot from "@/components/CatBot";
import { Zap, ShieldCheck, Code2, Rocket, Award, Users, CheckCircle2, ArrowRight, Sparkles, Globe, Cpu } from "lucide-react";

const STATS = [
  { label: "Completed Projects", value: "100+", detail: "Web apps & custom portals delivered" },
  { label: "Average Delivery Time", value: "3 - 7 Days", detail: "Ultra-fast turnaround guarantee" },
  { label: "Client Satisfaction", value: "99.8%", detail: "Verified by client ratings" },
  { label: "Supported Payment Gateways", value: "UPI Instant + Stripe", detail: "Global USD & Domestic INR (UPI)" },
];

const VALUES = [
  {
    icon: Zap,
    title: "Ultra-Fast Execution",
    description: "We eliminate bureaucratic delays. Our streamlined development workflow delivers production-ready code in days, not months.",
  },
  {
    icon: Code2,
    title: "Engineering Excellence",
    description: "Built on Next.js 16, React 19, and Firebase. We write bulletproof, type-safe code that scales effortlessly.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent & Secured",
    description: "Full Firestore database integration, instant order status tracking, and direct real-time communication with developers.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Capabilities",
    description: "Integrating modern LLMs, CatBot AI advisors, and smart automation directly into your web applications.",
  },
];

const TECH_STACK = [
  { name: "Next.js 16", type: "Full-Stack Framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "React 19", type: "Frontend Library", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "TypeScript", type: "Type Safety", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Firebase", type: "Auth & Firestore DB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
  { name: "Tailwind CSS", type: "Styling & Design Tokens", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Figma", type: "UI/UX Architecture", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
];

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#05070d", color: "#fff" }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{ padding: "80px 24px 60px", maxWidth: 1200, margin: "0 auto", width: "100%", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 9999,
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.3)",
            fontSize: "0.8rem",
            color: "#a5b4fc",
            fontFamily: "var(--font-mono)",
            marginBottom: 20,
          }}
        >
          <Sparkles size={14} color="#6366f1" /> ABOUT QUICKCODE AGENCY
        </div>

        <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 800, fontFamily: "var(--font-heading)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 20 }}>
          Architecting High-Performance <br />
          <span className="text-gradient">Web Applications & AI Systems</span>
        </h1>

        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: 720, margin: "0 auto 36px", lineHeight: 1.7 }}>
          QuickCode is a premier software development studio. We build lightning-fast web applications, e-commerce portals, and enterprise AI integrations tailored for founders, startups, and modern businesses worldwide.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/book" className="btn-primary" style={{ padding: "14px 32px", fontSize: "0.95rem" }}>
            Start Your Project →
          </Link>
          <Link
            href="/#portfolio"
            style={{
              padding: "14px 28px",
              borderRadius: "var(--r-sm)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
            }}
          >
            Explore Our Work
          </Link>
        </div>
      </section>

      {/* Brand Logo Banner Section */}
      <section style={{ padding: "40px 24px", maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        <div
          style={{
            padding: 40,
            borderRadius: "24px",
            background: "rgba(11, 17, 35, 0.8)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 32,
          }}
        >
          <div style={{ maxWidth: 500 }}>
            <div style={{ fontSize: "0.78rem", color: "#6366f1", fontFamily: "var(--font-mono)", fontWeight: 700, marginBottom: 8 }}>
              OFFICIAL BRAND EMBLEM
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, fontFamily: "var(--font-heading)", marginBottom: 12 }}>
              The QuickCode Identity
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
              Our logo combines the sharp geometric lightning bolt of ultra-fast execution with digital code brackets. It represents our core promise: speed, clean architecture, and modern digital dominance.
            </p>
          </div>

          <div
            style={{
              position: "relative",
              width: 180,
              height: 180,
              borderRadius: "20px",
              background: "#000",
              border: "1px solid rgba(99,102,241,0.4)",
              padding: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(99,102,241,0.3)",
            }}
          >
            <img src="/logo.png" alt="QuickCode Official Logo" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "12px" }} />
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section style={{ padding: "60px 24px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              style={{
                padding: 28,
                borderRadius: "20px",
                background: "rgba(11, 17, 35, 0.6)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ fontSize: "2.2rem", fontWeight: 800, fontFamily: "var(--font-heading)", color: "#6366f1", marginBottom: 6 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>{stat.label}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{stat.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: "60px 24px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-heading)" }}>
            Our Operating Principles
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: 6 }}>
            How we deliver unmatched quality for every single project
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {VALUES.map((val, vIdx) => {
            const IconComp = val.icon;
            return (
              <div
                key={vIdx}
                style={{
                  padding: 32,
                  borderRadius: "20px",
                  background: "rgba(11, 17, 35, 0.7)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "14px",
                    background: "rgba(99,102,241,0.15)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6366f1",
                  }}
                >
                  <IconComp size={24} />
                </div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, fontFamily: "var(--font-heading)", color: "#fff" }}>
                  {val.title}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Technology Stack Grid */}
      <section style={{ padding: "60px 24px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-heading)" }}>
            Powered By Modern Tech Architecture
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: 6 }}>
            Enterprise-grade tools chosen for maximum velocity and stability
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 18 }}>
          {TECH_STACK.map((tech, tIdx) => (
            <div
              key={tIdx}
              style={{
                padding: 20,
                borderRadius: "16px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <img src={tech.icon} alt={tech.name} style={{ width: 32, height: 32 }} />
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#fff" }}>{tech.name}</div>
                <div style={{ fontSize: "0.74rem", color: "var(--text-dim)" }}>{tech.type}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CatBot AI Highlight Banner */}
      <section style={{ padding: "40px 24px 80px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div
          style={{
            padding: 48,
            borderRadius: "28px",
            background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(236,72,153,0.15) 100%)",
            border: "1px solid rgba(99,102,241,0.4)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ fontSize: "2.5rem" }}>🐱⚡</div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 800, fontFamily: "var(--font-heading)" }}>
            Need Guidance? Chat with CatBot AI!
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: 600, fontSize: "0.98rem", lineHeight: 1.6 }}>
            Not sure which plan or tech stack fits your budget and timeline? Talk to CatBot AI on the homepage to get instant advice, delivery estimates, and custom plan recommendations.
          </p>
          <Link href="/book" className="btn-primary" style={{ padding: "14px 36px", fontSize: "0.95rem", marginTop: 8 }}>
            Book Your Custom Project Now →
          </Link>
        </div>
      </section>

      <Footer />
      <CatBot />
    </main>
  );
}

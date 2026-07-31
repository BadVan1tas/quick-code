"use client";

import React from "react";
import { SpotlightCard } from "./SpotlightCard";
import { ShieldCheck, Zap, Layers, Cpu, Lock, Sparkles, Server, Code } from "lucide-react";

export const BentoGridSection: React.FC = () => {
  return (
    <section id="features" style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <div className="section-label" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <Sparkles size={14} color="#818cf8" />
          Architectural Edge
        </div>
        <h2 className="section-heading">
          Engineered for <span className="text-gradient">Maximum Performance</span>
        </h2>
        <p className="section-subheading" style={{ margin: "0 auto" }}>
          Every feature is handcrafted with modern design principles, sub-millisecond response times, and bulletproof encryption.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Large Feature Card 1 */}
        <SpotlightCard
          style={{
            gridColumn: "span 2",
            padding: "36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "280px",
          }}
          spotlightColor="rgba(99, 102, 241, 0.25)"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(99, 102, 241, 0.15)",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#818cf8",
                }}
              >
                <Zap size={22} />
              </div>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, fontFamily: "var(--font-mono)", color: "#818cf8", textTransform: "uppercase" }}>
                TURBO DELIVERABILITY
              </span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "12px" }}>
              72-Hour Full-Stack Production Deployment
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", maxWidth: "580px", lineHeight: 1.6 }}>
              Our standardized Next.js App Router boilerplate and pre-configured server modules allow us to launch enterprise-ready platforms 3x faster than traditional agencies.
            </p>
          </div>

          <div style={{ marginTop: "28px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-emerald)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
              ✓ 100/100 Lighthouse Benchmark
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-cyan)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
              ✓ Zero Technical Debt
            </span>
          </div>
        </SpotlightCard>

        {/* Feature Card 2 */}
        <SpotlightCard
          style={{
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          spotlightColor="rgba(236, 72, 153, 0.25)"
        >
          <div>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(236, 72, 153, 0.15)",
                border: "1px solid rgba(236, 72, 153, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ec4899",
                marginBottom: "20px",
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "10px" }}>
              PCI-DSS Level 1 Security
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
              Bank-grade Stripe integrations, encrypted database vaults, CSRF prevention, and automated Webhook signature validation.
            </p>
          </div>
          <div style={{ marginTop: "20px", fontSize: "0.8rem", color: "#ec4899", fontFamily: "var(--font-mono)" }}>
            🔒 A+ SSL Audit Grade
          </div>
        </SpotlightCard>

        {/* Feature Card 3 */}
        <SpotlightCard
          style={{
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          spotlightColor="rgba(6, 182, 212, 0.25)"
        >
          <div>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(6, 182, 212, 0.15)",
                border: "1px solid rgba(6, 182, 212, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#06b6d4",
                marginBottom: "20px",
              }}
            >
              <Layers size={22} />
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "10px" }}>
              21st.dev Motion Architecture
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
              Fluid glassmorphism, Framer Motion spring physics, particle canvases, and micro-interactions that captivate your users.
            </p>
          </div>
          <div style={{ marginTop: "20px", fontSize: "0.8rem", color: "#06b6d4", fontFamily: "var(--font-mono)" }}>
            ✨ Smooth 60 FPS Guarantee
          </div>
        </SpotlightCard>

        {/* Feature Card 4 */}
        <SpotlightCard
          style={{
            gridColumn: "span 2",
            padding: "36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          spotlightColor="rgba(16, 185, 129, 0.25)"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#10b981",
                }}
              >
                <Server size={22} />
              </div>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, fontFamily: "var(--font-mono)", color: "#10b981", textTransform: "uppercase" }}>
                FULL CODE OWNERSHIP
              </span>
            </div>
            <h3 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "12px" }}>
              Zero Lock-In, 100% Repository Transfer
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              Upon project delivery, you receive full GitHub repository access, clean TypeScript code, Prisma schemas, and complete ownership rights. No vendor lock-in ever.
            </p>
          </div>

          <div style={{ marginTop: "24px", padding: "12px 18px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            git clone git@github.com:quickcode/your-app.git
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};

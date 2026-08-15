"use client";

import Link from "next/link";
import { Printer, ArrowLeft, Mail, Phone, Globe, ExternalLink, Sparkles, Code2, Briefcase, GraduationCap } from "lucide-react";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#05070d", color: "#f0f0ff", padding: "40px 16px" }}>
      {/* Top Action Bar (Hidden on Print) */}
      <div
        className="no-print"
        style={{
          maxWidth: "850px",
          margin: "0 auto 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <Link
          href="/portfolio"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "0.9rem",
            padding: "8px 16px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handlePrint}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "8px",
              background: "#6366f1",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(99,102,241,0.4)",
            }}
          >
            <Printer size={16} />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Resume Container */}
      <div
        id="resume-content"
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          background: "#0c1020",
          borderRadius: "20px",
          border: "1px solid rgba(99,102,241,0.25)",
          boxShadow: "0 24px 70px rgba(0,0,0,0.6)",
          padding: "48px 44px",
          position: "relative",
        }}
      >
        {/* Header Section */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            paddingBottom: "32px",
            marginBottom: "32px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2.4rem",
                fontWeight: 800,
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.03em",
                color: "#fff",
                margin: "0 0 6px 0",
              }}
            >
              Shaurya Shashi
            </h1>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#818cf8",
                fontFamily: "var(--font-heading)",
                marginBottom: "14px",
              }}
            >
              Full Stack Web Developer &amp; Founder · QuikCode
            </div>

            {/* Contact Details Grid */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px 20px",
                fontSize: "0.85rem",
                color: "var(--text-muted)",
              }}
            >
              <a
                href="mailto:shauryashashi30@gmail.com"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "inherit", textDecoration: "none" }}
              >
                <Mail size={14} color="#6366f1" />
                <span>shauryashashi30@gmail.com</span>
              </a>
              <a
                href="https://wa.me/919992145372"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "inherit", textDecoration: "none" }}
              >
                <Phone size={14} color="#10b981" />
                <span>+91 9992145372</span>
              </a>
              <a
                href="https://github.com/BadVan1tas"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "inherit", textDecoration: "none" }}
              >
                <svg viewBox="0 0 24 24" fill="#06b6d4" style={{ width: 14, height: 14 }}>
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                <span>github.com/BadVan1tas</span>
              </a>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Globe size={14} color="#f59e0b" />
                <span>India · Available Globally (Remote)</span>
              </span>
            </div>
          </div>

          {/* Profile Photo */}
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "2px solid rgba(99,102,241,0.5)",
              boxShadow: "0 0 25px rgba(99,102,241,0.3)",
              flexShrink: 0,
            }}
          >
            <img
              src="/portfolio/avatar.jpg"
              alt="Shaurya Shashi"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </header>

        {/* Executive Summary */}
        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#818cf8",
              fontFamily: "var(--font-mono)",
              marginBottom: "10px",
            }}
          >
            // Professional Summary
          </h2>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "#d1d5db", margin: 0 }}>
            Results-driven <strong>Full Stack Web Developer</strong> and <strong>Founder of QuikCode</strong> with proven experience architecting, building, and deploying production-grade web applications. Expertise in <strong>Next.js App Router, React 19, TypeScript, Tailwind CSS, Node.js, and REST/WebSocket APIs</strong>. Demonstrated track record of delivering end-to-end e-commerce storefronts, SaaS dashboards, and high-performance interactive interfaces with 100% client satisfaction.
          </p>
        </section>

        {/* Technical Skills */}
        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#818cf8",
              fontFamily: "var(--font-mono)",
              marginBottom: "12px",
            }}
          >
            // Technical Skills
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
            <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>Frontend Engineering</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                Next.js 15/16, React 19, TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion, HTML5, Responsive UI/UX
              </div>
            </div>

            <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>Backend &amp; Database</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                Node.js, Express, Firebase Firestore, PostgreSQL, REST APIs, WebSockets, Auth.js, Server Actions
              </div>
            </div>

            <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>Tools &amp; Deployments</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                Git/GitHub, Vercel, UPI QR Integration, Stripe Connect, Figma, VS Code, Linux CLI, Turbopack
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects & Production Releases */}
        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#818cf8",
              fontFamily: "var(--font-mono)",
              marginBottom: "16px",
            }}
          >
            // Featured Projects &amp; Production Work
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Project 1: Homechef Bakery */}
            <div style={{ padding: "18px 20px", borderRadius: "14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "6px" }}>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", margin: 0 }}>
                    Homechef Bakery — Full-Stack E-Commerce Storefront
                  </h3>
                  <div style={{ fontSize: "0.78rem", color: "#f59e0b", fontFamily: "var(--font-mono)" }}>
                    Next.js 15 · TypeScript · Tailwind CSS · WhatsApp Business API · Vercel
                  </div>
                </div>
                <a
                  href="https://homechef-bakery.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.78rem",
                    color: "#818cf8",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  <span>homechef-bakery.vercel.app</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <ul style={{ margin: "8px 0 0", paddingLeft: "18px", fontSize: "0.85rem", color: "#d1d5db", lineHeight: 1.6 }}>
                <li>Architected and launched a 100% eggless artisanal bakery storefront in Bangalore with high-conversion product showcases.</li>
                <li>Engineered bespoke ordering flow integrated directly with WhatsApp Business API for instant custom cake quotes and order routing.</li>
                <li>Optimized Core Web Vitals, achieving &gt;95 Lighthouse score with lightning-fast static page generation on Vercel.</li>
              </ul>
            </div>

            {/* Project 2: Cheap PC Resident */}
            <div style={{ padding: "18px 20px", borderRadius: "14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "6px" }}>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", margin: 0 }}>
                    Cheap PC Resident — Cyberpunk Gaming Accounts Marketplace
                  </h3>
                  <div style={{ fontSize: "0.78rem", color: "#06b6d4", fontFamily: "var(--font-mono)" }}>
                    HTML5 · CSS3 · JavaScript · 3D Perspective Scroll Engine · HUD UI
                  </div>
                </div>
                <a
                  href="https://cheappcresident.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.78rem",
                    color: "#818cf8",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  <span>cheappcresident.in</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <ul style={{ margin: "8px 0 0", paddingLeft: "18px", fontSize: "0.85rem", color: "#d1d5db", lineHeight: 1.6 }}>
                <li>Designed and developed a cyberpunk storefront for verified gaming accounts across Steam, EA, Ubisoft, and Rockstar.</li>
                <li>Built custom 3D perspective rotation scrolling engine and HUD visual telemetry without heavy external dependencies.</li>
                <li>Implemented smooth mobile-responsive layout and direct payment / delivery customer onboarding flow.</li>
              </ul>
            </div>

            {/* Project 3: QuikCode Platform */}
            <div style={{ padding: "18px 20px", borderRadius: "14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "6px" }}>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", margin: 0 }}>
                    QuikCode — Digital Agency Platform &amp; AI Booking Engine
                  </h3>
                  <div style={{ fontSize: "0.78rem", color: "#ec4899", fontFamily: "var(--font-mono)" }}>
                    Next.js 16 (Turbopack) · React 19 · Firebase Auth/Firestore · UPI Instant QR · Stripe
                  </div>
                </div>
                <a
                  href="https://github.com/BadVan1tas/quick-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.78rem",
                    color: "#818cf8",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  <span>github.com/BadVan1tas/quick-code</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <ul style={{ margin: "8px 0 0", paddingLeft: "18px", fontSize: "0.85rem", color: "#d1d5db", lineHeight: 1.6 }}>
                <li>Engineered full-stack agency platform supporting multi-currency payments (USD via Stripe + INR via Instant UPI QR).</li>
                <li>Integrated Firestore database for order status tracking, user authentication, and admin management dashboard.</li>
                <li>Developed interactive AI CatBot assistant to provide automated project estimations and technology recommendations.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Experience & Leadership */}
        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#818cf8",
              fontFamily: "var(--font-mono)",
              marginBottom: "12px",
            }}
          >
            // Work Experience
          </h2>

          <div style={{ padding: "16px 20px", borderRadius: "14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "6px", marginBottom: "4px" }}>
              <div style={{ fontWeight: 800, color: "#fff", fontSize: "1rem" }}>Lead Full Stack Developer &amp; Founder</div>
              <div style={{ color: "#818cf8", fontSize: "0.82rem", fontFamily: "var(--font-mono)" }}>2024 – Present</div>
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "8px" }}>QuikCode Web Development Studio</div>
            <p style={{ fontSize: "0.84rem", color: "#d1d5db", lineHeight: 1.6, margin: 0 }}>
              Lead end-to-end software development lifecycle for client projects. Manage technical architecture, UI/UX prototyping in Figma, frontend and backend implementation, database modeling, and cloud deployments.
            </p>
          </div>
        </section>

        {/* Education & Achievements */}
        <section>
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#818cf8",
              fontFamily: "var(--font-mono)",
              marginBottom: "12px",
            }}
          >
            // Education &amp; Credentials
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
            <div style={{ padding: "14px 18px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem" }}>Computer Science &amp; Full-Stack Web Development</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>Modern Web Systems · Cloud Architecture</div>
            </div>
            <div style={{ padding: "14px 18px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem" }}>Languages</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>English (Fluent), Hindi (Native)</div>
            </div>
          </div>
        </section>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .no-print {
            display: none !important;
          }
          #resume-content {
            background: #ffffff !important;
            color: #111827 !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            max-width: 100% !important;
          }
          #resume-content h1,
          #resume-content h2,
          #resume-content h3,
          #resume-content div {
            color: #111827 !important;
          }
          #resume-content p,
          #resume-content li,
          #resume-content span,
          #resume-content a {
            color: #374151 !important;
          }
        }
      `}</style>
    </div>
  );
}

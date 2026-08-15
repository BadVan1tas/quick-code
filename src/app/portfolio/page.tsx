"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CatBot from "@/components/CatBot";
import { ExternalLink, Sparkles, ArrowUpRight, Code2, Rocket, Globe, Terminal } from "lucide-react";

export default function PortfolioPage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#07070f", color: "#f0f0ff" }}>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          padding: "100px 24px 80px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
          {/* Left Column */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: 9999,
                background: "rgba(99,102,241,0.12)",
                border: "1px solid rgba(99,102,241,0.3)",
                fontSize: "0.8rem",
                color: "#a5b4fc",
                fontFamily: "var(--font-mono)",
                marginBottom: "24px",
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block", animation: "pulse 2s infinite" }} />
              AVAILABLE FOR NEW PROJECTS
            </div>

            <h1
              style={{
                fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                fontWeight: 800,
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "20px",
              }}
            >
              Hi, I'm <span className="text-gradient">Shaurya</span><br />
              Full Stack Developer &amp; Founder
            </h1>

            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "540px" }}>
              Lead Developer at <strong style={{ color: "#fff" }}>QuikCode</strong>. I build premium, high-converting digital web apps from wireframe to deployment.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="#featured-projects" className="btn-primary" style={{ padding: "14px 32px", fontSize: "0.95rem" }}>
                Explore Shipped Work ↓
              </a>
              <Link
                href="/resume"
                style={{
                  padding: "14px 28px",
                  borderRadius: "var(--r-sm)",
                  background: "rgba(99,102,241,0.15)",
                  border: "1px solid rgba(99,102,241,0.4)",
                  color: "#a5b4fc",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>📄 View Resume</span>
              </Link>
              <Link
                href="/book"
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
                Hire / Contact
              </Link>
            </div>

            {/* Quick Stats */}
            <div style={{ display: "flex", gap: "36px", marginTop: "44px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#6366f1", fontFamily: "var(--font-heading)" }}>2+</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Live Stores</div>
              </div>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#06b6d4", fontFamily: "var(--font-heading)" }}>100%</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Satisfaction</div>
              </div>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#ec4899", fontFamily: "var(--font-heading)" }}>Fast</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Turnaround</div>
              </div>
            </div>
          </div>

          {/* Right Column / Avatar Frame */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                position: "relative",
                width: "320px",
                height: "380px",
                borderRadius: "28px",
                overflow: "hidden",
                background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.1))",
                border: "1px solid rgba(99,102,241,0.3)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 50px rgba(99,102,241,0.2)",
              }}
            >
              <img
                src="/portfolio/avatar.jpg"
                alt="Shaurya Shashi — Full Stack Developer"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  right: "16px",
                  padding: "12px 16px",
                  borderRadius: "14px",
                  background: "rgba(10, 10, 20, 0.85)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>Shaurya Shashi</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Lead Developer · QuikCode</div>
                </div>
                <span style={{ fontSize: "0.75rem", padding: "4px 8px", borderRadius: "6px", background: "rgba(99,102,241,0.2)", color: "#818cf8", fontWeight: 700 }}>
                  Active 🟢
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section
        id="featured-projects"
        style={{
          padding: "80px 24px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="section-label" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Sparkles size={14} color="#6366f1" /> PRODUCTION RELEASES
          </div>
          <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Selected <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subheading" style={{ margin: "0 auto" }}>
            Explore real live client projects crafted and shipped by QuikCode.
          </p>
        </div>

        {/* Project 1: Homechef Bakery */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "40px",
            alignItems: "center",
            padding: "40px",
            borderRadius: "28px",
            background: "rgba(15, 20, 38, 0.7)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            marginBottom: "48px",
          }}
        >
          <div style={{ borderRadius: "20px", overflow: "hidden", height: "300px", position: "relative" }}>
            <img
              src="/portfolio/homechef.jpg"
              alt="Homechef Bakery Showcase"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <div style={{ fontSize: "0.78rem", color: "#f59e0b", fontFamily: "var(--font-mono)", fontWeight: 700, marginBottom: "8px" }}>
              PROJECT 01 // E-COMMERCE BAKERY
            </div>
            <h3 style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-heading)", marginBottom: "12px", color: "#fff" }}>
              Homechef Bakery
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "20px" }}>
              A full-stack gourmet bakery storefront with Next.js App Router, 100% eggless menu showcases (Black Forest, Alphonso Mango, Belgian Truffle), and seamless WhatsApp direct custom ordering.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
              {["Next.js 15", "TypeScript", "Tailwind CSS", "Vercel", "WhatsApp Business API"].map((tag) => (
                <span key={tag} style={{ fontSize: "0.75rem", padding: "4px 12px", borderRadius: "6px", background: "rgba(245,158,11,0.12)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.25)" }}>
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
                padding: "12px 28px",
                fontSize: "0.9rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #d97706, #b45309)",
              }}
            >
              <span>Visit Live Website</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Project 2: Cheap PC Resident */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "40px",
            alignItems: "center",
            padding: "40px",
            borderRadius: "28px",
            background: "rgba(15, 20, 38, 0.7)",
            border: "1px solid rgba(6, 182, 212, 0.25)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ borderRadius: "20px", overflow: "hidden", height: "300px", position: "relative" }}>
            <img
              src="/portfolio/cheappc.jpg"
              alt="Cheap PC Resident Showcase"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <div style={{ fontSize: "0.78rem", color: "#06b6d4", fontFamily: "var(--font-mono)", fontWeight: 700, marginBottom: "8px" }}>
              PROJECT 02 // GAMING ACCOUNT STORE
            </div>
            <h3 style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-heading)", marginBottom: "12px", color: "#fff" }}>
              Cheap PC Resident
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "20px" }}>
              Cyberpunk-styled marketplace offering lifetime warranty gaming accounts for Steam, EA, Ubisoft, and Rockstar games with unique 3D perspective rotation scrolling and HUD-inspired system indicators.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
              {["HTML5", "Vanilla CSS", "JavaScript", "3D Perspective Scroll", "Cyberpunk HUD UI"].map((tag) => (
                <span key={tag} style={{ fontSize: "0.75rem", padding: "4px 12px", borderRadius: "6px", background: "rgba(6,182,212,0.12)", color: "#67e8f9", border: "1px solid rgba(6,182,212,0.25)" }}>
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
                padding: "12px 28px",
                fontSize: "0.9rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #0891b2, #7c3aed)",
              }}
            >
              <span>Visit Live Website</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Direct Contact & Inquiry Section */}
      <section style={{ padding: "40px 24px 80px", maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
        <div
          style={{
            padding: "48px 36px",
            borderRadius: "28px",
            background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(6,182,212,0.1) 100%)",
            border: "1px solid rgba(99,102,241,0.35)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div className="section-label" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Sparkles size={14} color="#6366f1" /> GET IN TOUCH
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, fontFamily: "var(--font-heading)", color: "#fff", margin: 0 }}>
            Have a Project in Mind? Let's Talk.
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "600px", fontSize: "0.98rem", lineHeight: 1.7, margin: 0 }}>
            Whether you need a custom e-commerce store, a full-stack SaaS platform, or high-performance web engineering — reach out directly:
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginTop: "12px" }}>
            <a
              href="mailto:shauryashashi30@gmail.com"
              className="btn-primary"
              style={{
                padding: "14px 28px",
                fontSize: "0.95rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
              }}
            >
              <span>✉️ Email: shauryashashi30@gmail.com</span>
            </a>

            <a
              href="https://wa.me/919992145372?text=Hi%20Shaurya,%20I%20saw%20your%20portfolio%20on%20QuikCode%20and%20want%20to%20discuss%20a%20project!"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "14px 28px",
                borderRadius: "var(--r-sm)",
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                color: "#34d399",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.2s ease",
              }}
            >
              <span>💬 WhatsApp: +91 9992145372</span>
            </a>
          </div>
        </div>
      </section>

      {/* Terminal Profile Card */}
      <section style={{ padding: "0 24px 100px", maxWidth: "800px", margin: "0 auto", width: "100%" }}>
        <div
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            background: "#080812",
            border: "1px solid rgba(99,102,241,0.3)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 20px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981" }} />
            <span style={{ marginLeft: "auto", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
              shaurya@quikcode ~ dev.config.ts
            </span>
          </div>

          <div style={{ padding: "28px", fontFamily: "var(--font-mono)", fontSize: "0.85rem", lineHeight: 1.9 }}>
            <div><span style={{ color: "#a855f7" }}>const</span> <span style={{ color: "#06b6d4" }}>developer</span> = &#123;</div>
            <div>&nbsp;&nbsp;<span style={{ color: "#f59e0b" }}>name</span>: <span style={{ color: "#fff" }}>"Shaurya Shashi"</span>,</div>
            <div>&nbsp;&nbsp;<span style={{ color: "#f59e0b" }}>email</span>: <span style={{ color: "#fff" }}>"shauryashashi30@gmail.com"</span>,</div>
            <div>&nbsp;&nbsp;<span style={{ color: "#f59e0b" }}>whatsapp</span>: <span style={{ color: "#fff" }}>"+91 9992145372"</span>,</div>
            <div>&nbsp;&nbsp;<span style={{ color: "#f59e0b" }}>role</span>: <span style={{ color: "#fff" }}>"Full Stack Web Developer &amp; Founder"</span>,</div>
            <div>&nbsp;&nbsp;<span style={{ color: "#f59e0b" }}>studio</span>: <span style={{ color: "#fff" }}>"QuikCode"</span>,</div>
            <div>&nbsp;&nbsp;<span style={{ color: "#f59e0b" }}>shippedProjects</span>: [<span style={{ color: "#fff" }}>"Homechef Bakery"</span>, <span style={{ color: "#fff" }}>"Cheap PC Resident"</span>],</div>
            <div>&nbsp;&nbsp;<span style={{ color: "#f59e0b" }}>techArsenal</span>: [<span style={{ color: "#fff" }}>"Next.js"</span>, <span style={{ color: "#fff" }}>"React"</span>, <span style={{ color: "#fff" }}>"TypeScript"</span>, <span style={{ color: "#fff" }}>"Node.js"</span>, <span style={{ color: "#fff" }}>"Tailwind"</span>],</div>
            <div>&nbsp;&nbsp;<span style={{ color: "#f59e0b" }}>status</span>: <span style={{ color: "#10b981" }}>"Accepting New Client Projects"</span>,</div>
            <div>&#125;;</div>
            <div style={{ marginTop: "12px" }}>
              <span style={{ color: "#a855f7" }}>console</span>.<span style={{ color: "#06b6d4" }}>log</span>(<span style={{ color: "#10b981" }}>"Let's build something exceptional! 🚀"</span>);
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CatBot />
    </main>
  );
}

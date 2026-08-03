"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "apex",
    title: "Apex Crypto Analytics",
    category: "SaaS Dashboard",
    metric: "+340% User Growth",
    metricColor: "#10b981",
    description:
      "Real-time crypto telemetry platform with live WebSocket price feeds, portfolio tracking, and tiered Stripe Pro subscriptions for 8,000+ active users.",
    tags: ["Next.js", "TypeScript", "Stripe", "WebSockets", "Recharts"],
    gradientFrom: "rgba(99,102,241,0.35)",
    gradientTo: "rgba(168,85,247,0.25)",
    accentLine: "#6366f1",
    year: "2024",
  },
  {
    id: "cybervault",
    title: "CyberVault Security Suite",
    category: "Enterprise SaaS",
    metric: "$1.2M Payment Volume",
    metricColor: "#06b6d4",
    description:
      "Zero-trust credential manager with AES-256 encryption, automated billing via Stripe Connect, and multi-tenant PostgreSQL architecture.",
    tags: ["React", "PostgreSQL", "Stripe Connect", "Auth.js", "Redis"],
    gradientFrom: "rgba(6,182,212,0.3)",
    gradientTo: "rgba(16,185,129,0.2)",
    accentLine: "#06b6d4",
    year: "2024",
  },
  {
    id: "nova",
    title: "Nova AI Agent Marketplace",
    category: "E-Commerce & AI",
    metric: "4.9 / 5 Rating",
    metricColor: "#f59e0b",
    description:
      "Interactive marketplace for buying/selling autonomous AI workflows with instant delivery, reputation scoring, and dispute resolution.",
    tags: ["Next.js App Router", "OpenAI", "Stripe", "Zod", "Prisma"],
    gradientFrom: "rgba(168,85,247,0.3)",
    gradientTo: "rgba(236,72,153,0.2)",
    accentLine: "#a855f7",
    year: "2025",
  },
  {
    id: "pulse",
    title: "Pulse Health Dashboard",
    category: "Healthcare SaaS",
    metric: "HIPAA Compliant",
    metricColor: "#ec4899",
    description:
      "Patient monitoring and telemedicine platform with HIPAA-compliant data handling, video consultation, and EHR integration.",
    tags: ["Next.js", "TypeScript", "FHIR API", "Twilio", "PostgreSQL"],
    gradientFrom: "rgba(236,72,153,0.25)",
    gradientTo: "rgba(251,113,133,0.15)",
    accentLine: "#ec4899",
    year: "2025",
  },
  {
    id: "fleet",
    title: "FleetOS Logistics Platform",
    category: "Operations SaaS",
    metric: "60% Cost Reduction",
    metricColor: "#10b981",
    description:
      "Fleet management suite with GPS tracking, automated dispatching, driver scoring, and predictive maintenance alerts.",
    tags: ["React", "Mapbox GL", "Node.js", "Kafka", "TimescaleDB"],
    gradientFrom: "rgba(16,185,129,0.25)",
    gradientTo: "rgba(6,182,212,0.15)",
    accentLine: "#10b981",
    year: "2024",
  },
  {
    id: "bazaar",
    title: "Bazaar E-Commerce Engine",
    category: "Multi-Vendor Platform",
    metric: "12k Monthly Orders",
    metricColor: "#f59e0b",
    description:
      "Multi-vendor marketplace with vendor onboarding, dynamic pricing, Stripe Connect splits, and mobile-first shopping UX.",
    tags: ["Next.js", "Stripe Connect", "Algolia", "Redis", "Cloudinary"],
    gradientFrom: "rgba(245,158,11,0.25)",
    gradientTo: "rgba(251,191,36,0.1)",
    accentLine: "#f59e0b",
    year: "2023",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "SaaS Dashboard", "Enterprise SaaS", "E-Commerce & AI", "Healthcare SaaS", "Operations SaaS", "Multi-Vendor Platform"];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      style={{ padding: "60px 16px", maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "48px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="section-label">Portfolio</div>
        <h2 className="section-heading">
          Featured <span className="text-gradient">Work</span>
        </h2>
        <p className="section-subheading" style={{ margin: "0 auto" }}>
          Production applications used by real clients — engineered for performance, security, and scale.
        </p>
      </div>

      {/* Filter tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "48px",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease 0.2s",
        }}
      >
        {["All", "SaaS Dashboard", "Enterprise SaaS", "E-Commerce & AI"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: "8px 18px",
              borderRadius: "var(--r-full)",
              border: `1px solid ${filter === cat ? "rgba(99,102,241,0.6)" : "rgba(255,255,255,0.08)"}`,
              background: filter === cat ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)",
              color: filter === cat ? "#818cf8" : "var(--text-muted)",
              fontSize: "0.82rem",
              fontWeight: 600,
              fontFamily: "var(--font-heading)",
              cursor: "pointer",
              transition: "all 0.25s ease",
              letterSpacing: "0.01em",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {filtered.map((proj, i) => (
          <ProjectCard key={proj.id} project={proj} delay={i * 100} visible={visible} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  delay,
  visible,
}: {
  project: (typeof projects)[0];
  delay: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        background: "var(--bg-card)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? project.accentLine + "50" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered
          ? `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${project.accentLine}25`
          : "0 8px 32px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        opacity: visible ? 1 : 0,
        animation: visible ? `slideUp 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` : "none",
      }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Visual cover */}
      <div
        style={{
          height: "200px",
          background: `linear-gradient(135deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)`,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
          overflow: "hidden",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              padding: "4px 12px",
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(8px)",
              borderRadius: "var(--r-full)",
              color: "var(--text-muted)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {project.category}
          </span>
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: project.metricColor,
              fontFamily: "var(--font-heading)",
              filter: `drop-shadow(0 0 8px ${project.metricColor}80)`,
            }}
          >
            {project.metric}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.025em",
              marginBottom: "4px",
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              fontSize: "0.72rem",
              fontFamily: "var(--font-mono)",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.06em",
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Decorative grid lines on cover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: hovered ? 0.6 : 0.3,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />

        {/* Accent line bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${project.accentLine}, transparent)`,
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.9rem",
            lineHeight: 1.6,
            marginBottom: "20px",
            flexGrow: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.73rem",
                fontFamily: "var(--font-mono)",
                padding: "4px 10px",
                borderRadius: "var(--r-xs)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--text-dim)",
                transition: "all 0.2s ease",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

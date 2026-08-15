"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";

const projects = [
  {
    id: "homechef",
    title: "Homechef Bakery",
    category: "E-Commerce & Food",
    metric: "100% Eggless",
    metricColor: "#f59e0b",
    image: "/portfolio/homechef.jpg",
    liveUrl: "https://homechef-bakery.vercel.app/",
    description:
      "Artisanal e-commerce bakery platform built for Hebbal, Bangalore. Features interactive product showcase, custom bespoke cake ordering with direct WhatsApp business API integration.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "WhatsApp API"],
    gradientFrom: "rgba(245,158,11,0.35)",
    gradientTo: "rgba(234,88,12,0.2)",
    accentLine: "#f59e0b",
    year: "2026",
    featured: true,
  },
  {
    id: "cheappc",
    title: "Cheap PC Resident",
    category: "Gaming & Storefront",
    metric: "Permanent Warranty",
    metricColor: "#06b6d4",
    image: "/portfolio/cheappc.jpg",
    liveUrl: "https://cheappcresident.in/",
    description:
      "Cyberpunk-themed premium gaming accounts marketplace featuring custom 3D perspective scroll, holographic HUD animations, and automated instant delivery across Steam, Rockstar, Ubisoft & EA.",
    tags: ["HTML5", "Vanilla CSS", "JavaScript", "3D Scroll", "HUD UI"],
    gradientFrom: "rgba(6,182,212,0.35)",
    gradientTo: "rgba(168,85,247,0.25)",
    accentLine: "#06b6d4",
    year: "2026",
    featured: true,
  },
  {
    id: "apex",
    title: "Apex Crypto Analytics",
    category: "SaaS Dashboard",
    metric: "+340% User Growth",
    metricColor: "#10b981",
    image: "/portfolio/cheappc.jpg",
    liveUrl: "https://github.com/BadVan1tas/quick-code",
    description:
      "Real-time crypto telemetry platform with live WebSocket price feeds, portfolio tracking, and tiered Stripe Pro subscriptions for 8,000+ active users.",
    tags: ["Next.js", "TypeScript", "Stripe", "WebSockets", "Recharts"],
    gradientFrom: "rgba(99,102,241,0.35)",
    gradientTo: "rgba(168,85,247,0.25)",
    accentLine: "#6366f1",
    year: "2025",
    featured: false,
  },
  {
    id: "cybervault",
    title: "CyberVault Security Suite",
    category: "Enterprise SaaS",
    metric: "$1.2M Payment Volume",
    metricColor: "#06b6d4",
    image: "/portfolio/homechef.jpg",
    liveUrl: "https://github.com/BadVan1tas/quick-code",
    description:
      "Zero-trust credential manager with AES-256 encryption, automated billing via Stripe Connect, and multi-tenant PostgreSQL architecture.",
    tags: ["React", "PostgreSQL", "Stripe Connect", "Auth.js", "Redis"],
    gradientFrom: "rgba(6,182,212,0.3)",
    gradientTo: "rgba(16,185,129,0.2)",
    accentLine: "#06b6d4",
    year: "2025",
    featured: false,
  },
  {
    id: "nova",
    title: "Nova AI Agent Marketplace",
    category: "E-Commerce & AI",
    metric: "4.9 / 5 Rating",
    metricColor: "#ec4899",
    image: "/portfolio/cheappc.jpg",
    liveUrl: "https://github.com/BadVan1tas/quick-code",
    description:
      "Interactive marketplace for buying/selling autonomous AI workflows with instant delivery, reputation scoring, and dispute resolution.",
    tags: ["Next.js App Router", "OpenAI", "Stripe", "Zod", "Prisma"],
    gradientFrom: "rgba(168,85,247,0.3)",
    gradientTo: "rgba(236,72,153,0.2)",
    accentLine: "#a855f7",
    year: "2025",
    featured: false,
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "E-Commerce & Food", "Gaming & Storefront", "SaaS Dashboard", "Enterprise SaaS", "E-Commerce & AI"];
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
      style={{ padding: "80px 16px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}
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
        <div className="section-label" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <Sparkles size={14} color="#6366f1" /> SHIPPED PORTFOLIO
        </div>
        <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          Featured <span className="text-gradient">Production Work</span>
        </h2>
        <p className="section-subheading" style={{ margin: "0 auto", maxWidth: "600px" }}>
          Real applications designed and deployed by QuikCode — engineered for performance, aesthetic excellence, and conversions.
        </p>
      </div>

      {/* Filter tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "40px",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease 0.2s",
        }}
      >
        {["All", "E-Commerce & Food", "Gaming & Storefront", "SaaS Dashboard"].map((cat) => (
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

      {/* Featured Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "28px",
        }}
      >
        {filtered.map((proj, i) => (
          <ProjectCard key={proj.id} project={proj} delay={i * 100} visible={visible} />
        ))}
      </div>

      {/* Link to Full Portfolio Page */}
      <div style={{ textAlign: "center", marginTop: "48px" }}>
        <Link
          href="/portfolio"
          className="btn-primary"
          style={{
            padding: "12px 28px",
            fontSize: "0.92rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>View Editorial Portfolio Page</span>
          <ExternalLink size={16} />
        </Link>
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
        background: "rgba(11, 17, 35, 0.75)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? project.accentLine + "60" : "rgba(255,255,255,0.08)"}`,
        boxShadow: hovered
          ? `0 24px 60px rgba(0,0,0,0.6), 0 0 35px ${project.accentLine}25`
          : "0 8px 32px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
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
          height: "220px",
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)`,
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />

        {/* Overlay gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(11, 17, 35, 0.95) 0%, rgba(11, 17, 35, 0.2) 60%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            right: "14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              padding: "4px 10px",
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(8px)",
              borderRadius: "var(--r-full)",
              color: "#fff",
              letterSpacing: "0.04em",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {project.category}
          </span>
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: project.metricColor,
              fontFamily: "var(--font-heading)",
              background: "rgba(0,0,0,0.65)",
              padding: "4px 10px",
              borderRadius: "var(--r-full)",
              border: `1px solid ${project.metricColor}40`,
            }}
          >
            {project.metric}
          </span>
        </div>

        {/* Title pinned over image bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            left: "16px",
            right: "16px",
            zIndex: 2,
          }}
        >
          <h3
            style={{
              fontSize: "1.35rem",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1, gap: "16px" }}>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.88rem",
            lineHeight: 1.6,
            margin: 0,
            flexGrow: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono)",
                padding: "3px 8px",
                borderRadius: "var(--r-xs)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--text-dim)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action button */}
        <div style={{ paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
            Launched {project.year}
          </span>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.82rem",
              fontWeight: 700,
              color: "#818cf8",
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: "8px",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.3)",
              transition: "all 0.2s ease",
            }}
          >
            <span>Live Site</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </article>
  );
}

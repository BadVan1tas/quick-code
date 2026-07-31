"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SpotlightCard } from "./ui/SpotlightCard";
import { BorderBeam } from "./ui/BorderBeam";
import { Code, ShoppingBag, Palette, Cpu, CheckCircle2, ArrowRight } from "lucide-react";

const services = [
  {
    id: "fullstack",
    icon: <Code size={26} color="#6366f1" />,
    tagline: "Full-Stack Web Applications",
    description: "Enterprise-grade SaaS platforms, dashboards, and custom portals built with Next.js App Router, server components, and PostgreSQL.",
    price: "From $1,499",
    features: [
      "Next.js App Router + Server Components",
      "Authentication & Role Management",
      "Database & Prisma ORM integration",
      "Custom Admin Panel & WebSockets",
      "72-Hour Rapid Delivery Guarantee",
    ],
    accentColor: "#6366f1",
    spotlightColor: "rgba(99, 102, 241, 0.25)",
    badge: "Most Popular",
    featured: true,
  },
  {
    id: "ecommerce",
    icon: <ShoppingBag size={26} color="#ec4899" />,
    tagline: "E-Commerce & Payment Portals",
    description: "PCI-DSS Level 1 compliant checkout systems with Stripe subscriptions, automated billing, and real-time webhook event handling.",
    price: "From $999",
    features: [
      "Stripe Checkout + Webhooks",
      "Subscription & one-time billing models",
      "Cart & Checkout Security Audit",
      "Automated Email Receipts",
      "Fraud Detection & Chargeback Protection",
    ],
    accentColor: "#ec4899",
    spotlightColor: "rgba(236, 72, 153, 0.25)",
    badge: "Secure",
    featured: false,
  },
  {
    id: "landing",
    icon: <Palette size={26} color="#06b6d4" />,
    tagline: "Landing Pages & UI Redesign",
    description: "Stunning interfaces with fluid motion, glassmorphism, dark themes, and conversion-optimised layouts.",
    price: "From $499",
    features: [
      "Custom design system & tokens",
      "Micro-animations & scroll reveals",
      "100/100 Lighthouse performance",
      "SEO & OpenGraph metadata",
      "Fully responsive & accessible",
    ],
    accentColor: "#06b6d4",
    spotlightColor: "rgba(6, 182, 212, 0.25)",
    badge: "Fast",
    featured: false,
  },
  {
    id: "enterprise-ai",
    icon: <Cpu size={26} color="#a855f7" />,
    tagline: "Custom AI & Microservices",
    description: "Bespoke LLM integrations, AI Agents, custom API microservices, and dedicated DevOps CI/CD pipelines.",
    price: "From $2,499",
    features: [
      "Custom AI Agent & LLM Integration",
      "Microservices & REST/GraphQL APIs",
      "Dedicated DevOps & CI/CD Pipeline",
      "Penetration Testing & Security Audit",
      "24/7 Priority SLA & Dedicated Lead",
    ],
    accentColor: "#a855f7",
    spotlightColor: "rgba(168, 85, 247, 0.25)",
    badge: "AI Enterprise",
    featured: false,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "64px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="section-label">Tailored Solutions</div>
        <h2 className="section-heading">
          What We <span className="text-gradient-cyan">Build For You</span>
        </h2>
        <p className="section-subheading" style={{ margin: "0 auto" }}>
          Every project is architected from scratch using 21st.dev design patterns — zero compromise on performance or security.
        </p>
      </div>

      {/* Cards grid */}
      <div className="four-card-grid">
        {services.map((s, i) => (
          <SpotlightCard
            key={s.id}
            spotlightColor={s.spotlightColor}
            style={{
              padding: "36px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms`,
            }}
          >
            <BorderBeam
              size={240}
              duration={8 + i * 2}
              colorFrom={s.accentColor}
              colorTo={i === 0 ? "#ec4899" : i === 1 ? "#a855f7" : i === 2 ? "#6366f1" : "#06b6d4"}
            />

            <div>
              {/* Icon & Badge */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: `${s.accentColor}18`,
                    border: `1px solid ${s.accentColor}35`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {s.icon}
                </div>
                {s.badge && (
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      padding: "4px 12px",
                      borderRadius: "var(--r-full)",
                      background: `${s.accentColor}20`,
                      border: `1px solid ${s.accentColor}40`,
                      color: s.accentColor,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.badge}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px", letterSpacing: "-0.02em" }}>
                {s.tagline}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.65, marginBottom: "28px" }}>
                {s.description}
              </p>

              {/* Checklist */}
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                {s.features.map((feat, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.88rem", color: "var(--text-muted)" }}>
                    <CheckCircle2 size={16} color={s.accentColor} />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price & CTA */}
            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "20px" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, fontFamily: "var(--font-heading)", color: s.accentColor, marginBottom: "16px" }}>
                {s.price}
              </div>
              <Link
                href="/book"
                className="btn-primary"
                style={{
                  width: "100%",
                  borderRadius: "var(--r-sm)",
                  background: s.featured ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" : "rgba(255, 255, 255, 0.06)",
                  border: `1px solid ${s.accentColor}50`,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontSize: "0.92rem",
                }}
              >
                Book Package <ArrowRight size={16} />
              </Link>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

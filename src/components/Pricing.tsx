"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SpotlightCard } from "./ui/SpotlightCard";
import { BorderBeam } from "./ui/BorderBeam";
import { Check, ShieldCheck, Lock, RefreshCw, Zap, Sparkles, ArrowRight } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { CurrencyToggle } from "./ui/CurrencyToggle";

const plans = [
  {
    id: "starter",
    name: "Starter Landing",
    tagline: "High-converting landing page with modern motion",
    price: "$499",
    priceNote: "one-time",
    deposit: "$150",
    color: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.25)",
    isOdd: true, // 1st plan - Odd highlighted
    badge: "Fast Delivery",
    features: [
      { label: "Custom landing page (up to 5 sections)", included: true },
      { label: "Mobile-first responsive design", included: true },
      { label: "SEO & Open Graph setup", included: true },
      { label: "Contact form integration", included: true },
      { label: "7-day delivery guarantee", included: true },
      { label: "Database / Auth integration", included: false },
    ],
    cta: "Book Starter Package",
  },
  {
    id: "pro",
    name: "Pro SaaS & Portal",
    tagline: "PCI-compliant payment portal & dashboard",
    price: "$999",
    priceNote: "one-time",
    deposit: "$200",
    color: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.25)",
    isOdd: false, // 2nd plan
    badge: "Stripe Ready",
    features: [
      { label: "Stripe Checkout & Webhook setup", included: true },
      { label: "Subscription & one-time billing", included: true },
      { label: "Cart & order management dashboard", included: true },
      { label: "Automated receipts & invoices", included: true },
      { label: "PCI-DSS Level 1 Security audit", included: true },
      { label: "Custom API development", included: false },
    ],
    cta: "Book Pro Package",
  },
  {
    id: "fullstack",
    name: "Full-Stack Suite",
    tagline: "Complete SaaS app with Auth, DB & Payments",
    price: "$1,499",
    priceNote: "one-time",
    deposit: "$250",
    color: "#6366f1",
    glowColor: "rgba(99, 102, 241, 0.3)",
    isOdd: true, // 3rd plan - Odd highlighted
    badge: "Most Popular",
    features: [
      { label: "Next.js App Router + Server Components", included: true },
      { label: "Authentication & Role Management", included: true },
      { label: "Database & Prisma ORM integration", included: true },
      { label: "Stripe Payment Portal + Webhooks", included: true },
      { label: "Admin panel & user dashboard", included: true },
      { label: "100/100 Lighthouse benchmark", included: true },
    ],
    cta: "Book Full-Stack Suite",
  },
  {
    id: "enterprise",
    name: "Enterprise Custom",
    tagline: "Complex microservices & bespoke AI integrations",
    price: "$2,999+",
    priceNote: "quote",
    deposit: "$500",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.25)",
    isOdd: true, // 4th plan - Odd styled
    badge: "Bespoke SLA",
    features: [
      { label: "Multi-service microservices architecture", included: true },
      { label: "Third-party AI & custom API integrations", included: true },
      { label: "Dedicated DevOps & CI/CD pipeline", included: true },
      { label: "Penetration testing & Security audit", included: true },
      { label: "24/7 Priority support & SLA", included: true },
      { label: "Complete GitHub repo transfer", included: true },
    ],
    cta: "Request Enterprise Quote",
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { formatPriceString } = useCurrency();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      style={{ padding: "60px 16px", maxWidth: "1240px", margin: "0 auto" }}
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
        <div className="section-label" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <Sparkles size={14} color="#818cf8" />
          Transparent Investment
        </div>
        <h2 className="section-heading">
          Select Your <span className="text-gradient">Production Package</span>
        </h2>
        <p className="section-subheading" style={{ margin: "0 auto 20px" }}>
          No hidden fees, no scope creep. 4 specialized plans engineered for every scale.
        </p>

        {/* Currency Switcher Toggle */}
        <div style={{ marginTop: "16px", display: "inline-flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            Select Currency:
          </span>
          <CurrencyToggle size="md" />
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="four-card-grid">
        {plans.map((plan, i) => (
          <SpotlightCard
            key={plan.id}
            spotlightColor={plan.glowColor}
            style={{
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              background: "rgba(11, 17, 35, 0.7)",
              border: `1px solid ${plan.color}40`,
              boxShadow: `0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px ${plan.glowColor}`,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
            }}
          >
            <BorderBeam size={240} duration={8 + i * 2} colorFrom={plan.color} colorTo={i === 0 ? "#6366f1" : i === 1 ? "#a855f7" : i === 2 ? "#ec4899" : "#06b6d4"} />

            <div>
              {/* Badge & Plan Name */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                    padding: "4px 10px",
                    borderRadius: "var(--r-full)",
                    background: `${plan.color}20`,
                    border: `1px solid ${plan.color}40`,
                    color: plan.color,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {plan.badge}
                </span>
                {plan.isOdd && (
                  <span style={{ fontSize: "0.75rem", color: "#6ee7b7", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                    ★ Highlighted
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "6px", letterSpacing: "-0.02em" }}>
                {plan.name}
              </h3>
              <p style={{ fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "24px" }}>
                {plan.tagline}
              </p>

              {/* Price */}
              <div style={{ marginBottom: "28px", paddingBottom: "20px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                      fontWeight: 800,
                      fontFamily: "var(--font-heading)",
                      color: plan.color,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      filter: `drop-shadow(0 0 12px ${plan.glowColor})`,
                    }}
                  >
                    {formatPriceString(plan.price)}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                    {plan.priceNote}
                  </span>
                </div>
                <div style={{ fontSize: "0.76rem", color: "var(--text-dim)", marginTop: "6px", fontFamily: "var(--font-mono)" }}>
                  {formatPriceString(plan.deposit)} deposit to lock slot
                </div>
              </div>

              {/* Features */}
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.85rem" }}>
                    <span
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        flexShrink: 0,
                        marginTop: "2px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: f.included ? `${plan.color}20` : "rgba(255, 255, 255, 0.04)",
                        border: `1px solid ${f.included ? `${plan.color}50` : "rgba(255, 255, 255, 0.08)"}`,
                      }}
                    >
                      {f.included ? (
                        <Check size={10} color={plan.color} strokeWidth={3} />
                      ) : (
                        <span style={{ fontSize: "0.6rem", color: "var(--text-dim)" }}>✕</span>
                      )}
                    </span>
                    <span style={{ color: f.included ? "var(--text-main)" : "var(--text-dim)", opacity: f.included ? 1 : 0.5 }}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <Link
              href="/book"
              className="btn-primary"
              style={{
                width: "100%",
                borderRadius: "var(--r-sm)",
                background: plan.isOdd ? `linear-gradient(135deg, ${plan.color} 0%, #4338ca 100%)` : "rgba(255, 255, 255, 0.06)",
                border: `1px solid ${plan.color}60`,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "0.9rem",
                padding: "12px",
              }}
            >
              {plan.cta} <ArrowRight size={16} />
            </Link>
          </SpotlightCard>
        ))}
      </div>

      {/* Security guarantees */}
      <div
        style={{
          marginTop: "60px",
          padding: "24px 32px",
          borderRadius: "var(--r-lg)",
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          display: "flex",
          flexWrap: "wrap",
          gap: "28px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          <Lock size={16} color="#10b981" /> 256-Bit SSL Encrypted
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          <ShieldCheck size={16} color="#06b6d4" /> PCI-DSS Level 1 Compliant
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          <RefreshCw size={16} color="#6366f1" /> 100% Refundable Deposit
        </span>
      </div>
    </section>
  );
}

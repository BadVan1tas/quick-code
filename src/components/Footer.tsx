"use client";

import Link from "next/link";

const footerLinks = {
  Services: [
    { label: "Full-Stack Apps", href: "/#services" },
    { label: "E-Commerce", href: "/#services" },
    { label: "Landing Pages", href: "/#services" },
    { label: "API Integrations", href: "/#services" },
  ],
  Company: [
    { label: "Our Work", href: "/#portfolio" },
    { label: "Process", href: "/#process" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Book a Project", href: "/book" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "NDA Template", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socials = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(5,7,13,0.95)",
        backdropFilter: "blur(20px)",
        marginTop: "60px",
      }}
    >
      {/* CTA Banner */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "64px 24px 48px",
        }}
      >
        <div
          style={{
            borderRadius: "var(--r-xl)",
            padding: "56px 48px",
            background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(236,72,153,0.1) 50%, rgba(6,182,212,0.08) 100%)",
            border: "1px solid rgba(99,102,241,0.3)",
            boxShadow: "0 0 80px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.07)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* BG glow orb */}
          <div
            style={{
              position: "absolute",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
            aria-hidden
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "5px 14px",
                borderRadius: "var(--r-full)",
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.25)",
                marginBottom: "24px",
              }}
            >
              <span className="dot-live" />
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6ee7b7", fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>
                TAKING NEW CLIENTS NOW
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: "16px",
                lineHeight: 1.15,
              }}
            >
              Ready to Build Something <span className="text-gradient">Extraordinary?</span>
            </h2>

            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", marginBottom: "36px", maxWidth: "520px", margin: "0 auto 36px", lineHeight: 1.6 }}>
              Let&apos;s turn your idea into a production-ready product. Book a free 30-minute
              discovery call today.
            </p>

            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/book" className="btn-primary" style={{ fontSize: "1rem", padding: "15px 36px" }}>
                Start Your Project →
              </Link>
              <Link href="/login" className="btn-secondary" style={{ fontSize: "1rem", padding: "15px 36px" }}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="footer-links-grid">
        {/* Brand column */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                color: "#fff",
                fontSize: "0.95rem",
                boxShadow: "0 0 16px rgba(99,102,241,0.4)",
                letterSpacing: "-0.04em",
              }}
            >
              QC
            </div>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-0.04em" }}>
              Quik<span style={{ color: "#6366f1" }}>Code</span>
            </span>
          </div>
          <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", lineHeight: 1.7, maxWidth: "280px", marginBottom: "24px" }}>
            Crafting high-impact software, web applications, and secure payment integrations — with precision and speed that set us apart.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "var(--r-sm)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-dim)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-main)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-dim)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--text-main)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "20px" }}>
              {title}
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      color: "var(--text-dim)",
                      fontSize: "0.87rem",
                      transition: "color 0.2s ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-dim)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <style>{`
        .footer-links-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px 48px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 769px) {
          .footer-links-grid {
            grid-template-columns: 2fr repeat(3, 1fr);
            gap: 48px;
          }
        }
      `}</style>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <p style={{ color: "var(--text-subtle)", fontSize: "0.82rem" }}>
          © {new Date().getFullYear()} Quik Code Inc. All rights reserved.
        </p>

        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#a5b4fc", display: "flex", alignItems: "center", gap: "6px", background: "rgba(99,102,241,0.08)", padding: "6px 14px", borderRadius: "9999px", border: "1px solid rgba(99,102,241,0.2)" }}>
          <span>Developed & Lead by</span>
          <span style={{ color: "#fff", background: "linear-gradient(135deg, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 800 }}>
            Shaurya Shashi
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="dot-live" />
          <span style={{ color: "var(--text-subtle)", fontSize: "0.82rem" }}>All Systems Operational</span>
        </div>
      </div>
    </footer>
  );
}

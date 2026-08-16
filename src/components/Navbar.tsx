"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, LogOut } from "lucide-react";
import { CurrencyToggle } from "./ui/CurrencyToggle";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Resume", href: "/resume" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    if (pathname === "/" && href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        e.preventDefault();
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      ref={navRef}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        backdropFilter: scrolled ? "blur(24px) saturate(2)" : "blur(12px)",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(2)" : "blur(12px)",
        backgroundColor: scrolled
          ? "rgba(5, 7, 13, 0.92)"
          : "rgba(5, 7, 13, 0.6)",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: scrolled ? "56px" : "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Quik Code Home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "38px",
              height: "38px",
              borderRadius: "11px",
              overflow: "hidden",
              border: "1px solid rgba(99,102,241,0.4)",
              boxShadow: "0 0 20px rgba(99,102,241,0.45)",
              flexShrink: 0,
            }}
          >
            <img src="/logo.png" alt="QuikCode Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "1.2rem",
              letterSpacing: "-0.04em",
              color: "var(--text-main)",
            }}
          >
            Quik<span style={{ color: "#6366f1" }}>Code</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hide-mobile"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && !link.href.startsWith("/#") && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  color: isActive ? "#ffffff" : "var(--text-muted)",
                  fontSize: "0.9rem",
                  fontWeight: isActive ? 600 : 500,
                  transition: "all 0.25s ease",
                  background: isActive ? "rgba(99, 102, 241, 0.15)" : "transparent",
                  border: isActive ? "1px solid rgba(99, 102, 241, 0.35)" : "1px solid transparent",
                  boxShadow: isActive ? "0 0 16px rgba(99, 102, 241, 0.2)" : "none",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-main)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA & Profile State */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <CurrencyToggle size="sm" />
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {isAdmin && (
                <Link
                  href="/admin"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    borderRadius: "9999px",
                    background: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.35)",
                    color: "#6ee7b7",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <span>Admin Portal</span>
                </Link>
              )}
              <Link
                href="/profile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  background: "rgba(99, 102, 241, 0.15)",
                  border: "1px solid rgba(99, 102, 241, 0.35)",
                  color: "#a5b4fc",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="avatar" width={22} height={22} style={{ borderRadius: "50%", objectFit: "cover" }} />
                ) : (
                  <User size={15} color="#818cf8" />
                )}
                <span>My Profile</span>
              </Link>
              <button
                onClick={logout}
                title="Sign Out"
                style={{
                  padding: "8px",
                  borderRadius: "var(--r-sm)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                fontWeight: 500,
                padding: "8px 16px",
                borderRadius: "var(--r-sm)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-main)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            >
              Sign In
            </Link>
          )}

          <Link
            href="/book"
            className="btn-primary"
            style={{ padding: "10px 22px", fontSize: "0.88rem" }}
          >
            Start Project →
          </Link>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="show-mobile touch-target"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-sm)",
            width: "48px",
            height: "48px",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "5px",
            padding: 0,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "18px",
                height: "2px",
                borderRadius: "1px",
                backgroundColor: "var(--text-muted)",
                transition: "all 0.3s ease",
                transform:
                  menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(5px, 5px)"
                      : i === 2
                      ? "rotate(-45deg) translate(5px, -5px)"
                      : "scaleX(0)"
                    : "none",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: menuOpen ? "calc(100vh - 100px)" : "0",
          transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          borderTop: menuOpen ? "1px solid var(--border)" : "none",
          overflowY: menuOpen ? "auto" : "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="touch-target"
              style={{
                padding: "16px",
                borderRadius: "var(--r-sm)",
                color: "var(--text-muted)",
                fontSize: "1rem",
                fontWeight: 500,
                textDecoration: "none",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border)",
                minHeight: "48px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: "var(--r-sm)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Currency:</span>
            <CurrencyToggle size="sm" />
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            {user ? (
              <Link
                href="/profile"
                className="btn-secondary touch-target"
                style={{ flex: 1, textAlign: "center", minHeight: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}
                onClick={() => setMenuOpen(false)}
              >
                My Profile
              </Link>
            ) : (
              <Link
                href="/login"
                className="btn-secondary touch-target"
                style={{ flex: 1, textAlign: "center", minHeight: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
            <Link
              href="/book"
              className="btn-primary touch-target"
              style={{ flex: 1, textAlign: "center", minHeight: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}
              onClick={() => setMenuOpen(false)}
            >
              Start Project →
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

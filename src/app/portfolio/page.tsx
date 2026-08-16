"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FuelPortfolioPage() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // ── Custom Cursor ─────────────────────────────────
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let rx = 0, ry = 0, mx = 0, my = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    function animCursor() {
      if (dot && ring) {
        dot.style.left = mx + "px";
        dot.style.top = my + "px";
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
      }
      animId = requestAnimationFrame(animCursor);
    }
    animCursor();

    // ── Scroll Reveal ─────────────────────────────────
    const reveals = document.querySelectorAll(".fuel-reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("fuel-up");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => obs.observe(el));

    // ── Hero bg parallax ──────────────────────────────
    const onScroll = () => {
      const y = window.scrollY;
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${y * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animId);
      obs.disconnect();
    };
  }, []);

  return (
    <div className="fuel-portfolio-root">
      {/* Official QuikCode Navbar */}
      <Navbar />

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      {/* Custom Cursor */}
      <div id="fuel-cursor-dot" ref={cursorDotRef} />
      <div id="fuel-cursor-ring" ref={cursorRingRef} />

      {/* ─── FLOATING BACK TO QUIKCODE PILL ─── */}
      <Link
        href="/"
        className="fuel-floating-back-btn"
        title="Return to QuikCode Main Website"
      >
        <span style={{ fontSize: "1.1rem" }}>←</span>
        <span>Back to QuikCode Home</span>
      </Link>

      {/* ─── HERO ─── */}
      <section id="hero" className="fuel-hero">
        <div className="fuel-hero-bg">
          <img ref={heroBgRef} src="/portfolio/cheappc.jpg" alt="Hero Background" id="hero-img" />
        </div>
        <div className="fuel-hero-wordmark">QUIKCODE</div>

        <div className="fuel-hero-content">
          <div className="fuel-hero-left">
            <p className="fuel-hero-tagline">
              Pick a stack, ship a product,
              <br />
              and your <strong>vision</strong> will go live
              <br />
              within the deadline.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
              <a href="#portfolio" className="fuel-hero-cta" id="hero-explore-btn">
                Explore Work
                <span className="fuel-hero-cta-arrow">↗</span>
              </a>
              <Link href="/resume" className="fuel-hero-cta" style={{ borderBottomColor: "rgba(255,255,255,0.7)" }}>
                View Resume
                <span className="fuel-hero-cta-arrow">↗</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="fuel-hero-services">
          <div className="fuel-hero-services-tag">01/ Capabilities</div>
          <div className="fuel-hero-services-list">
            Full Stack Development
            <br />
            UI / UX Design
            <br />
            Deployment &amp; DevOps
          </div>
        </div>

        <div className="fuel-hero-year">© 2026</div>
      </section>

      {/* ─── ABOUT STRIP ─── */}
      <section id="about-strip" className="fuel-about-strip">
        <div className="fuel-about-strip-left fuel-reveal">
          <div className="fuel-about-strip-num">01</div>
          <h2 className="fuel-about-strip-title">
            Building web
            <br />
            experiences that
            <br />
            actually ship.
          </h2>
        </div>
        <div className="fuel-about-strip-right fuel-reveal">
          <p className="fuel-about-strip-text">
            I'm <strong>Shaurya Shashi</strong>, a full-stack developer and founder of <strong>QuikCode</strong>. I
            specialize in turning ideas into production-ready products — fast. From artisan bakery stores to cyberpunk gaming
            marketplaces, I build experiences that look stunning and perform flawlessly.
          </p>
          <p className="fuel-about-strip-text" style={{ marginBottom: "2.5rem" }}>
            Every project starts with a deep understanding of the goal and ends with a product that makes both the client
            and users genuinely happy.
          </p>

          <div className="fuel-stat-bar">
            <span className="fuel-stat-lbl" style={{ whiteSpace: "nowrap" }}>
              Projects Shipped
            </span>
            <div className="fuel-stat-bar-track" style={{ flex: 1 }}>
              <div className="fuel-stat-bar-fill" style={{ width: "80%" }} />
            </div>
            <span className="fuel-stat-bar-val">2 Live</span>
          </div>
          <div className="fuel-stat-bar" style={{ marginTop: "1rem" }}>
            <span className="fuel-stat-lbl" style={{ whiteSpace: "nowrap" }}>
              Client Satisfaction
            </span>
            <div className="fuel-stat-bar-track" style={{ flex: 1 }}>
              <div className="fuel-stat-bar-fill" style={{ width: "100%" }} />
            </div>
            <span className="fuel-stat-bar-val">100%</span>
          </div>

          <div className="fuel-stats-row">
            <div className="fuel-stat-item">
              <span className="fuel-stat-val">2+</span>
              <span className="fuel-stat-lbl">Live Projects</span>
            </div>
            <div className="fuel-stat-item">
              <span className="fuel-stat-val">5+</span>
              <span className="fuel-stat-lbl">Tech Stacks</span>
            </div>
            <div className="fuel-stat-item">
              <span className="fuel-stat-val">∞</span>
              <span className="fuel-stat-lbl">Ambition</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLIENTS MARQUEE ─── */}
      <div id="clients" className="fuel-clients">
        <div className="fuel-clients-track">
          <span className="fuel-client-item">Next.js</span>
          <span className="fuel-client-item">React</span>
          <span className="fuel-client-item">TypeScript</span>
          <span className="fuel-client-item">Node.js</span>
          <span className="fuel-client-item">Tailwind.</span>
          <span className="fuel-client-item">PostgreSQL</span>
          <span className="fuel-client-item">Prisma</span>
          <span className="fuel-client-item">Vercel</span>
          <span className="fuel-client-item">Next.js</span>
          <span className="fuel-client-item">React</span>
          <span className="fuel-client-item">TypeScript</span>
          <span className="fuel-client-item">Node.js</span>
          <span className="fuel-client-item">Tailwind.</span>
          <span className="fuel-client-item">PostgreSQL</span>
          <span className="fuel-client-item">Prisma</span>
          <span className="fuel-client-item">Vercel</span>
        </div>
      </div>

      {/* ─── PORTFOLIO ─── */}
      <section id="portfolio" className="fuel-portfolio-section">
        <div className="fuel-portfolio-header fuel-reveal">
          <div>
            <div className="fuel-section-label">(Portfolio)</div>
            <h2 className="fuel-portfolio-title">Selected Work</h2>
          </div>
          <a href="#contact" className="fuel-portfolio-action" id="see-all-btn">
            See all (02)
            <span>↗</span>
          </a>
        </div>

        {/* Project 01 */}
        <div className="fuel-project-row">
          <div className="fuel-project-image-wrap">
            <img src="/portfolio/homechef.jpg" alt="Homechef Bakery" />
            <div className="fuel-project-meta-footer">
              <span className="fuel-project-meta-footer-name">Homechef Bakery</span>
              <span className="fuel-project-meta-footer-year">© 2026</span>
            </div>
          </div>
          <div className="fuel-project-info fuel-reveal">
            <div>
              <span className="fuel-project-num">01</span>
              <h3 className="fuel-project-name">
                Homechef
                <br />
                Bakery
              </h3>
              <div className="fuel-project-type">E-Commerce · Next.js · Bakery</div>
              <p className="fuel-project-desc">
                A premium 100% eggless bakery platform with animated product showcases, custom cake ordering via
                WhatsApp, and a warm editorial UI. Serving Hebbal, Bangalore — handcrafted daily.
              </p>
              <div className="fuel-project-tags-row">
                <span className="fuel-ptag">Next.js</span>
                <span className="fuel-ptag">TypeScript</span>
                <span className="fuel-ptag">Tailwind CSS</span>
                <span className="fuel-ptag">Vercel</span>
              </div>
            </div>
            <a
              href="https://homechef-bakery.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="fuel-project-cta"
              id="homechef-btn"
            >
              Visit Live Site
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Project 02 */}
        <div className="fuel-project-row fuel-reverse">
          <div className="fuel-project-image-wrap">
            <img src="/portfolio/cheappc.jpg" alt="Cheap PC Resident" />
            <div className="fuel-project-meta-footer">
              <span className="fuel-project-meta-footer-name">Cheap PC Resident</span>
              <span className="fuel-project-meta-footer-year">© 2026</span>
            </div>
          </div>
          <div className="fuel-project-info fuel-reveal">
            <div>
              <span className="fuel-project-num">02</span>
              <h3 className="fuel-project-name">
                Cheap PC
                <br />
                Resident
              </h3>
              <div className="fuel-project-type">Gaming Store · HTML/CSS/JS · Cyberpunk</div>
              <p className="fuel-project-desc">
                A cyberpunk-themed premium gaming account store featuring horizontal 3D scroll experience, holographic HUD
                animations, and neon aesthetics. Sells Steam, Rockstar, Ubisoft &amp; EA accounts with lifetime warranty.
              </p>
              <div className="fuel-project-tags-row">
                <span className="fuel-ptag">HTML5</span>
                <span className="fuel-ptag">Vanilla CSS</span>
                <span className="fuel-ptag">JavaScript</span>
                <span className="fuel-ptag">Cyberpunk UI</span>
              </div>
            </div>
            <a
              href="https://cheappcresident.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="fuel-project-cta"
              id="cheappc-btn"
            >
              Visit Live Site
              <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="fuel-services-section">
        <div className="fuel-services-header fuel-reveal">
          <span className="fuel-services-header-label">(03) Services &amp; Capabilities</span>
          <h2 className="fuel-services-header-title">What I Build</h2>
        </div>

        <div className="fuel-services-list">
          {/* Service 01 */}
          <div className="fuel-service-row fuel-reveal">
            <div className="fuel-service-num">01</div>
            <div className="fuel-service-image">
              <img src="/portfolio/homechef.jpg" alt="Web Applications" />
            </div>
            <div className="fuel-service-content">
              <div className="fuel-service-subtitle">Engineering</div>
              <h3 className="fuel-service-name">Full-Stack Web Apps</h3>
              <p className="fuel-service-desc">
                End-to-end applications built with Next.js, React, Node.js, and TypeScript. From database architecture to
                seamless deployment on Vercel or cloud platforms.
              </p>
            </div>
          </div>

          {/* Service 02 */}
          <div className="fuel-service-row fuel-reveal">
            <div className="fuel-service-num">02</div>
            <div className="fuel-service-image">
              <img src="/portfolio/cheappc.jpg" alt="UI/UX & Design" />
            </div>
            <div className="fuel-service-content">
              <div className="fuel-service-subtitle">Creative</div>
              <h3 className="fuel-service-name">UI / UX Design</h3>
              <p className="fuel-service-desc">
                Distinctive, high-conversion visual design that refuses to look like a generic template. Bespoke
                typography, custom micro-interactions, and fluid 60fps animations.
              </p>
            </div>
          </div>

          {/* Service 03 */}
          <div className="fuel-service-row fuel-reveal">
            <div className="fuel-service-num">03</div>
            <div className="fuel-service-image">
              <img src="/portfolio/homechef.jpg" alt="E-Commerce & Portals" />
            </div>
            <div className="fuel-service-content">
              <div className="fuel-service-subtitle">Commerce</div>
              <h3 className="fuel-service-name">E-Commerce &amp; Portals</h3>
              <p className="fuel-service-desc">
                Custom storefronts with payment gateways, automated messaging, WhatsApp Business integrations, and customer
                dashboards engineered to convert visitors into buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SKILLS GRID ─── */}
      <section id="skills" className="fuel-skills-section">
        <div className="fuel-skills-header fuel-reveal">
          <div className="fuel-section-label">(Tech Stack)</div>
          <h2 className="fuel-skills-title">Core Competencies</h2>
        </div>

        <div className="fuel-skills-cats fuel-reveal">
          {/* Cat 1 */}
          <div className="fuel-skill-cat">
            <span className="fuel-skill-cat-icon">⚡</span>
            <div className="fuel-skill-cat-name">Frontend</div>
            <div className="fuel-skill-list">
              <div className="fuel-skill-item">
                <span>React / Next.js</span>
                <div className="fuel-skill-item-bar">
                  <div className="fuel-skill-item-fill" style={{ width: "95%" }} />
                </div>
              </div>
              <div className="fuel-skill-item">
                <span>TypeScript</span>
                <div className="fuel-skill-item-bar">
                  <div className="fuel-skill-item-fill" style={{ width: "90%" }} />
                </div>
              </div>
              <div className="fuel-skill-item">
                <span>Tailwind CSS</span>
                <div className="fuel-skill-item-bar">
                  <div className="fuel-skill-item-fill" style={{ width: "92%" }} />
                </div>
              </div>
              <div className="fuel-skill-item">
                <span>HTML5 / CSS3</span>
                <div className="fuel-skill-item-bar">
                  <div className="fuel-skill-item-fill" style={{ width: "98%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Cat 2 */}
          <div className="fuel-skill-cat">
            <span className="fuel-skill-cat-icon">🛠️</span>
            <div className="fuel-skill-cat-name">Backend</div>
            <div className="fuel-skill-list">
              <div className="fuel-skill-item">
                <span>Node.js</span>
                <div className="fuel-skill-item-bar">
                  <div className="fuel-skill-item-fill" style={{ width: "88%" }} />
                </div>
              </div>
              <div className="fuel-skill-item">
                <span>PostgreSQL / Prisma</span>
                <div className="fuel-skill-item-bar">
                  <div className="fuel-skill-item-fill" style={{ width: "85%" }} />
                </div>
              </div>
              <div className="fuel-skill-item">
                <span>REST &amp; GraphQL APIs</span>
                <div className="fuel-skill-item-bar">
                  <div className="fuel-skill-item-fill" style={{ width: "90%" }} />
                </div>
              </div>
              <div className="fuel-skill-item">
                <span>Firebase Firestore</span>
                <div className="fuel-skill-item-bar">
                  <div className="fuel-skill-item-fill" style={{ width: "87%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Cat 3 */}
          <div className="fuel-skill-cat">
            <span className="fuel-skill-cat-icon">🚀</span>
            <div className="fuel-skill-cat-name">DevOps &amp; Tools</div>
            <div className="fuel-skill-list">
              <div className="fuel-skill-item">
                <span>Vercel / Cloud</span>
                <div className="fuel-skill-item-bar">
                  <div className="fuel-skill-item-fill" style={{ width: "95%" }} />
                </div>
              </div>
              <div className="fuel-skill-item">
                <span>Git &amp; GitHub</span>
                <div className="fuel-skill-item-bar">
                  <div className="fuel-skill-item-fill" style={{ width: "92%" }} />
                </div>
              </div>
              <div className="fuel-skill-item">
                <span>Figma UI/UX</span>
                <div className="fuel-skill-item-bar">
                  <div className="fuel-skill-item-fill" style={{ width: "86%" }} />
                </div>
              </div>
              <div className="fuel-skill-item">
                <span>Linux / CLI</span>
                <div className="fuel-skill-item-bar">
                  <div className="fuel-skill-item-fill" style={{ width: "80%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="fuel-contact-section">
        <div className="fuel-contact-inner">
          <div className="fuel-reveal">
            <div className="fuel-section-label" style={{ marginBottom: "1rem" }}>
              (04) Get in Touch
            </div>
            <h2 className="fuel-contact-title">
              Let's build
              <br />
              something
              <br />
              great.
            </h2>
            <p className="fuel-contact-subtitle">
              Available for freelance projects, full-time opportunities, and collaborations. Drop a message and I'll get
              back to you within 24 hours.
            </p>

            <div className="fuel-contact-links-list">
              <a href="mailto:shauryashashi30@gmail.com" className="fuel-contact-link-item" id="contact-email">
                <span className="fuel-contact-link-name">Email: shauryashashi30@gmail.com</span>
                <span className="fuel-contact-link-arrow">→</span>
              </a>
              <a
                href="https://github.com/BadVan1tas"
                target="_blank"
                rel="noopener noreferrer"
                className="fuel-contact-link-item"
                id="contact-github"
              >
                <span className="fuel-contact-link-name">GitHub: BadVan1tas</span>
                <span className="fuel-contact-link-arrow">→</span>
              </a>
              <a
                href="https://wa.me/919992145372?text=Hi%20Shaurya,%20I'm%20interested%20in%20working%20with%20you!"
                target="_blank"
                rel="noopener noreferrer"
                className="fuel-contact-link-item"
                id="contact-whatsapp"
              >
                <span className="fuel-contact-link-name">WhatsApp: +91 9992145372</span>
                <span className="fuel-contact-link-arrow">→</span>
              </a>
              <Link href="/resume" className="fuel-contact-link-item">
                <span className="fuel-contact-link-name">View &amp; Download Resume (PDF)</span>
                <span className="fuel-contact-link-arrow">→</span>
              </Link>
            </div>
          </div>

          <div className="fuel-contact-right fuel-reveal">
            <div className="fuel-contact-terminal">
              <div className="fuel-ct-bar">
                <div className="fuel-ct-dot fuel-ct-red" />
                <div className="fuel-ct-dot fuel-ct-yellow" />
                <div className="fuel-ct-dot fuel-ct-green" />
                <span className="fuel-ct-title">shaur@quikcode ~ portfolio.ts</span>
              </div>
              <div className="fuel-ct-body">
                <div>
                  <span className="fuel-ct-muted">1 </span>
                  <span className="fuel-ct-purple">const</span> <span className="fuel-ct-cyan">me</span> = &#123;
                </div>
                <div>
                  <span className="fuel-ct-muted">2 </span>&nbsp; <span className="fuel-ct-amber">name</span>:{" "}
                  <span className="fuel-ct-white">"Shaurya Shashi"</span>,
                </div>
                <div>
                  <span className="fuel-ct-muted">3 </span>&nbsp; <span className="fuel-ct-amber">email</span>:{" "}
                  <span className="fuel-ct-white">"shauryashashi30@gmail.com"</span>,
                </div>
                <div>
                  <span className="fuel-ct-muted">4 </span>&nbsp; <span className="fuel-ct-amber">whatsapp</span>:{" "}
                  <span className="fuel-ct-white">"+91 9992145372"</span>,
                </div>
                <div>
                  <span className="fuel-ct-muted">5 </span>&nbsp; <span className="fuel-ct-amber">role</span>:{" "}
                  <span className="fuel-ct-white">"Full Stack Dev"</span>,
                </div>
                <div>
                  <span className="fuel-ct-muted">6 </span>&nbsp; <span className="fuel-ct-amber">studio</span>:{" "}
                  <span className="fuel-ct-white">"QuikCode"</span>,
                </div>
                <div>
                  <span className="fuel-ct-muted">7 </span>&nbsp; <span className="fuel-ct-amber">stack</span>: [
                  <span className="fuel-ct-white">"Next.js"</span>, <span className="fuel-ct-white">"React"</span>,
                </div>
                <div>
                  <span className="fuel-ct-muted">8 </span>&nbsp; &nbsp; &nbsp; &nbsp;{" "}
                  <span className="fuel-ct-white">"TypeScript"</span>, <span className="fuel-ct-white">"Node"</span>],
                </div>
                <div>
                  <span className="fuel-ct-muted">9 </span>&nbsp; <span className="fuel-ct-amber">available</span>:{" "}
                  <span className="fuel-ct-cyan">true</span>,
                </div>
                <div>
                  <span className="fuel-ct-muted">10 </span>&nbsp; <span className="fuel-ct-amber">passion</span>:{" "}
                  <span className="fuel-ct-pink">Infinity</span>
                </div>
                <div>
                  <span className="fuel-ct-muted">11 </span>&#125;;
                </div>
                <div>&nbsp;</div>
                <div>
                  <span className="fuel-ct-muted">12 </span>
                  <span className="fuel-ct-purple">console</span>.<span className="fuel-ct-cyan">log</span>(
                  <span className="fuel-ct-white">"Ready to ship 🚀"</span>);
                </div>
                <div>
                  <span className="fuel-ct-muted">13 </span>
                  <span className="fuel-ct-cursor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RETURN TO MAIN SITE BANNER ─── */}
      <section style={{ padding: "4rem 2rem 2rem", background: "var(--black)", color: "var(--white)", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px", padding: "2.5rem", borderRadius: "16px", background: "linear-gradient(135deg, rgba(255,61,0,0.15) 0%, rgba(99,102,241,0.15) 100%)", border: "1px solid rgba(255,61,0,0.3)" }}>
          <div>
            <div style={{ fontSize: "0.8rem", color: "#ff3d00", fontFamily: "var(--font-mono, monospace)", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "6px" }}>
              QUIKCODE STUDIO
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0 0 8px 0", color: "#fff" }}>
              Ready to build something extraordinary?
            </h3>
            <p style={{ margin: 0, color: "#999990", fontSize: "0.95rem" }}>
              Return to our main agency platform to explore full pricing, packages, or request an instant quote.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <span>← Back to QuikCode Home</span>
            </Link>
            <Link
              href="/book"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "8px",
                background: "#ff3d00",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(255,61,0,0.4)",
              }}
            >
              <span>Book a Project ⚡</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="fuel-footer">
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/" className="fuel-footer-logo" style={{ textDecoration: "none", color: "inherit" }}>
            QuikCode©
          </Link>
          <Link href="/" style={{ fontSize: "0.8rem", color: "#ff3d00", textDecoration: "underline" }}>
            (Return to Main Website)
          </Link>
        </div>
        <span className="fuel-footer-copy">© 2026 Shaurya Shashi — QuikCode Studio</span>
      </footer>

      {/* ─── FUEL INLINE STYLES ─── */}
      <style jsx global>{`
        .fuel-portfolio-root {
          --white: #ffffff;
          --off: #f4f4f2;
          --light: #e8e8e4;
          --mid: #999990;
          --dark: #111110;
          --black: #0a0a09;
          --accent: #ff3d00;
          --border: rgba(0, 0, 0, 0.1);
          --font: 'Inter', sans-serif;
          --display: 'Syne', sans-serif;

          font-family: var(--font);
          background: var(--off);
          color: var(--dark);
          overflow-x: hidden;
          cursor: none;
          min-height: 100vh;
        }

        #fuel-cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background: var(--dark);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: transform 0.05s;
        }

        #fuel-cursor-ring {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 1.5px solid var(--dark);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s, opacity 0.3s;
          opacity: 0.4;
        }

        .fuel-portfolio-root:has(a:hover) #fuel-cursor-ring,
        .fuel-portfolio-root:has(button:hover) #fuel-cursor-ring {
          width: 64px;
          height: 64px;
          opacity: 0.2;
        }

        .fuel-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.6rem 2.5rem;
          mix-blend-mode: difference;
        }

        .fuel-floating-back-btn {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          z-index: 9990;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.8rem 1.4rem;
          background: #111110;
          color: #ffffff;
          border: 1px solid rgba(255, 61, 0, 0.4);
          border-radius: 9999px;
          font-family: var(--font);
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 61, 0, 0.2);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fuel-floating-back-btn:hover {
          transform: translateY(-3px) scale(1.03);
          background: #ff3d00;
          box-shadow: 0 14px 40px rgba(255, 61, 0, 0.4);
        }

        .fuel-nav-badge {
          display: inline-block;
          font-size: 0.62rem;
          font-weight: 700;
          background: #ff3d00;
          color: #fff;
          padding: 2px 8px;
          border-radius: 9999px;
          margin-left: 8px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          vertical-align: middle;
        }

        .fuel-nav-logo {
          font-family: var(--display);
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--white);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        .fuel-nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }

        .fuel-nav-links a {
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--white);
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.2s;
        }

        .fuel-nav-links a:hover {
          opacity: 1;
        }

        .fuel-nav-num {
          font-size: 0.65rem;
          opacity: 0.5;
          margin-right: 0.3rem;
          vertical-align: super;
        }

        .fuel-nav-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.95);
          padding: 0.5rem 1rem 0.5rem 0.5rem;
          border-radius: 8px;
          text-decoration: none;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
        }

        .fuel-nav-card img {
          width: 36px;
          height: 36px;
          border-radius: 4px;
          object-fit: cover;
        }

        .fuel-nav-card-text {
          display: flex;
          flex-direction: column;
        }

        .fuel-nav-card-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--dark);
          line-height: 1.2;
        }

        .fuel-nav-card-role {
          font-size: 0.7rem;
          color: var(--mid);
        }

        .fuel-hero {
          position: relative;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
        }

        .fuel-hero-bg {
          position: absolute;
          inset: 0;
          background: var(--black);
        }

        .fuel-hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.75;
          display: block;
        }

        .fuel-hero-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(10, 10, 9, 0.85) 0%,
            rgba(10, 10, 9, 0.3) 50%,
            rgba(255, 61, 0, 0.15) 100%
          );
        }

        .fuel-hero-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: end;
          padding: 3rem 2.5rem;
        }

        .fuel-hero-left {
          padding-bottom: 0.5rem;
        }

        .fuel-hero-tagline {
          font-size: 0.78rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
          max-width: 260px;
          margin-bottom: 2rem;
        }

        .fuel-hero-tagline strong {
          font-style: italic;
          color: rgba(255, 255, 255, 0.85);
        }

        .fuel-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          font-weight: 400;
          color: white;
          text-decoration: none;
          letter-spacing: 0.04em;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          transition: border-color 0.2s;
        }

        .fuel-hero-cta:hover {
          border-color: white;
        }

        .fuel-hero-cta-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          font-size: 0.65rem;
        }

        .fuel-hero-wordmark {
          position: absolute;
          bottom: -0.15em;
          left: 0;
          right: 0;
          font-family: var(--display);
          font-size: clamp(100px, 18vw, 220px);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.18);
          text-align: center;
          pointer-events: none;
          z-index: 1;
          white-space: nowrap;
        }

        .fuel-hero-services {
          position: absolute;
          bottom: 3rem;
          right: 2.5rem;
          z-index: 2;
          text-align: right;
        }

        .fuel-hero-services-tag {
          font-size: 0.7rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.45);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .fuel-hero-services-list {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.8;
        }

        .fuel-hero-year {
          position: absolute;
          bottom: 3rem;
          left: 2.5rem;
          z-index: 2;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 0.05em;
        }

        .fuel-section-label {
          font-size: 0.68rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--mid);
          font-weight: 400;
        }

        .fuel-about-strip {
          background: var(--white);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 4rem 2.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .fuel-about-strip-num {
          font-family: var(--display);
          font-size: clamp(60px, 10vw, 120px);
          font-weight: 800;
          line-height: 1;
          color: var(--off);
          -webkit-text-stroke: 1.5px var(--light);
          margin-bottom: 1.5rem;
        }

        .fuel-about-strip-title {
          font-family: var(--display);
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .fuel-about-strip-text {
          font-size: 1rem;
          line-height: 1.8;
          color: #444;
          margin-bottom: 1.5rem;
        }

        .fuel-stats-row {
          display: flex;
          gap: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }

        .fuel-stat-val {
          font-family: var(--display);
          font-size: 2rem;
          font-weight: 800;
          line-height: 1;
          display: block;
          margin-bottom: 0.3rem;
        }

        .fuel-stat-lbl {
          font-size: 0.75rem;
          color: var(--mid);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .fuel-stat-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .fuel-stat-bar-track {
          flex: 1;
          height: 1px;
          background: var(--light);
          position: relative;
        }

        .fuel-stat-bar-fill {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: var(--dark);
        }

        .fuel-stat-bar-val {
          font-size: 0.75rem;
          color: var(--mid);
          font-weight: 400;
          white-space: nowrap;
        }

        .fuel-clients {
          padding: 1.5rem 0;
          background: var(--off);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }

        .fuel-clients-track {
          display: flex;
          gap: 4rem;
          animation: fuelMarquee 24s linear infinite;
          width: max-content;
        }

        @keyframes fuelMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .fuel-client-item {
          font-family: var(--display);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--mid);
          white-space: nowrap;
        }

        .fuel-portfolio-section {
          background: var(--off);
          padding: 5rem 0 0;
        }

        .fuel-portfolio-header {
          padding: 0 2.5rem 3rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .fuel-portfolio-title {
          font-family: var(--display);
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1;
        }

        .fuel-portfolio-action {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: var(--dark);
          text-decoration: none;
          border-bottom: 1px solid var(--dark);
          padding-bottom: 0.2rem;
          transition: opacity 0.2s;
        }

        .fuel-portfolio-action:hover {
          opacity: 0.6;
        }

        .fuel-project-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--border);
        }

        .fuel-project-row:last-child {
          border-bottom: 1px solid var(--border);
        }

        .fuel-project-image-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4/3;
        }

        .fuel-project-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .fuel-project-row:hover .fuel-project-image-wrap img {
          transform: scale(1.04);
        }

        .fuel-project-meta-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.2rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 100%);
        }

        .fuel-project-meta-footer-name {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.75);
          letter-spacing: 0.06em;
        }

        .fuel-project-meta-footer-year {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .fuel-project-info {
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-left: 1px solid var(--border);
        }

        .fuel-project-num {
          font-family: var(--display);
          font-size: clamp(80px, 12vw, 160px);
          font-weight: 800;
          line-height: 1;
          color: var(--off);
          -webkit-text-stroke: 1.5px var(--light);
          display: block;
          margin-bottom: 1rem;
        }

        .fuel-project-name {
          font-family: var(--display);
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 0.75rem;
        }

        .fuel-project-type {
          font-size: 0.78rem;
          color: var(--mid);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .fuel-project-desc {
          font-size: 0.9rem;
          line-height: 1.7;
          color: #555;
          margin-bottom: 2rem;
        }

        .fuel-project-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 2rem;
        }

        .fuel-ptag {
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.3rem 0.8rem;
          border: 1px solid var(--border);
          border-radius: 2px;
          color: var(--mid);
        }

        .fuel-project-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          font-weight: 400;
          color: var(--dark);
          text-decoration: none;
          padding-bottom: 0.3rem;
          border-bottom: 1px solid var(--dark);
          width: fit-content;
          transition: opacity 0.2s;
        }

        .fuel-project-cta:hover {
          opacity: 0.5;
        }

        .fuel-project-row.fuel-reverse .fuel-project-image-wrap {
          order: 2;
        }
        .fuel-project-row.fuel-reverse .fuel-project-info {
          order: 1;
          border-left: none;
          border-right: 1px solid var(--border);
        }

        .fuel-services-section {
          background: var(--black);
          padding: 6rem 2.5rem;
        }

        .fuel-services-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 2rem;
        }

        .fuel-services-header-label {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
        }

        .fuel-services-header-title {
          font-family: var(--display);
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 800;
          color: white;
        }

        .fuel-service-row {
          display: grid;
          grid-template-columns: 260px 1fr 1fr;
          gap: 3rem;
          align-items: start;
          padding: 3rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }

        .fuel-service-num {
          font-family: var(--display);
          font-size: clamp(100px, 14vw, 180px);
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.12);
          line-height: 0.85;
        }

        .fuel-service-image {
          aspect-ratio: 4/3;
          overflow: hidden;
          border-radius: 4px;
        }

        .fuel-service-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(20%);
          transition: filter 0.4s;
        }

        .fuel-service-row:hover .fuel-service-image img {
          filter: grayscale(0%);
        }

        .fuel-service-content {
          padding-top: 1rem;
        }

        .fuel-service-name {
          font-family: var(--display);
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 800;
          color: white;
          margin-bottom: 1rem;
        }

        .fuel-service-subtitle {
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0.5rem;
        }

        .fuel-service-desc {
          font-size: 0.85rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.4);
        }

        .fuel-skills-section {
          background: var(--white);
          padding: 6rem 2.5rem;
        }

        .fuel-skills-header {
          margin-bottom: 4rem;
        }

        .fuel-skills-title {
          font-family: var(--display);
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-top: 0.5rem;
        }

        .fuel-skills-cats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 1px solid var(--border);
        }

        .fuel-skill-cat {
          padding: 2.5rem;
          border-right: 1px solid var(--border);
        }

        .fuel-skill-cat:last-child {
          border-right: none;
        }

        .fuel-skill-cat-icon {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          display: block;
        }

        .fuel-skill-cat-name {
          font-family: var(--display);
          font-size: 1.1rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
        }

        .fuel-skill-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .fuel-skill-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.82rem;
          color: #555;
        }

        .fuel-skill-item-bar {
          width: 60px;
          height: 1px;
          background: var(--light);
          position: relative;
        }

        .fuel-skill-item-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: var(--dark);
        }

        .fuel-contact-section {
          background: var(--off);
          padding: 6rem 2.5rem;
          border-top: 1px solid var(--border);
        }

        .fuel-contact-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .fuel-contact-title {
          font-family: var(--display);
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 800;
          line-height: 1;
          margin-bottom: 2rem;
        }

        .fuel-contact-subtitle {
          font-size: 1rem;
          color: #666;
          line-height: 1.7;
          margin-bottom: 3rem;
        }

        .fuel-contact-links-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .fuel-contact-link-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 0;
          border-top: 1px solid var(--border);
          text-decoration: none;
          color: var(--dark);
          transition: opacity 0.2s;
        }

        .fuel-contact-link-item:last-child {
          border-bottom: 1px solid var(--border);
        }
        .fuel-contact-link-item:hover {
          opacity: 0.5;
        }

        .fuel-contact-link-name {
          font-family: var(--display);
          font-size: 1.1rem;
          font-weight: 800;
        }

        .fuel-contact-link-arrow {
          font-size: 1.2rem;
          transform: rotate(-45deg);
          display: inline-block;
        }

        .fuel-contact-terminal {
          background: var(--black);
          border-radius: 12px;
          overflow: hidden;
        }

        .fuel-ct-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.4rem;
          background: rgba(255, 255, 255, 0.04);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .fuel-ct-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }
        .fuel-ct-red {
          background: #ff5f57;
        }
        .fuel-ct-yellow {
          background: #febc2e;
        }
        .fuel-ct-green {
          background: #28c840;
        }
        .fuel-ct-title {
          margin-left: auto;
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.3);
          font-family: monospace;
        }

        .fuel-ct-body {
          padding: 1.75rem;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 0.8rem;
          line-height: 2;
        }

        .fuel-ct-purple {
          color: #a855f7;
        }
        .fuel-ct-cyan {
          color: #06b6d4;
        }
        .fuel-ct-amber {
          color: #f59e0b;
        }
        .fuel-ct-white {
          color: rgba(255, 255, 255, 0.9);
        }
        .fuel-ct-muted {
          color: rgba(255, 255, 255, 0.3);
        }
        .fuel-ct-pink {
          color: #ec4899;
        }

        .fuel-ct-cursor {
          display: inline-block;
          width: 7px;
          height: 1em;
          background: #06b6d4;
          vertical-align: text-bottom;
          animation: fuelBlink 1s step-end infinite;
        }
        @keyframes fuelBlink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .fuel-footer {
          background: var(--black);
          padding: 2rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .fuel-footer-logo {
          font-family: var(--display);
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.7);
        }

        .fuel-footer-copy {
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.3);
          letter-spacing: 0.05em;
        }

        .fuel-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fuel-reveal.fuel-up {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 900px) {
          .fuel-nav {
            padding: 1.2rem 1.5rem;
          }
          .fuel-nav-links {
            display: none;
          }
          .fuel-nav-card {
            display: none;
          }

          .fuel-hero-wordmark {
            display: none;
          }
          .fuel-hero-content {
            grid-template-columns: 1fr;
          }
          .fuel-hero-services {
            display: none;
          }

          .fuel-about-strip {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .fuel-project-row {
            grid-template-columns: 1fr;
          }
          .fuel-project-row.fuel-reverse .fuel-project-image-wrap {
            order: 0;
          }
          .fuel-project-row.fuel-reverse .fuel-project-info {
            order: 0;
            border-right: none;
            border-left: none;
            border-top: 1px solid var(--border);
          }
          .fuel-project-info {
            border-left: none;
            border-top: 1px solid var(--border);
          }

          .fuel-service-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .fuel-service-num {
            font-size: 80px;
          }

          .fuel-skills-cats {
            grid-template-columns: 1fr;
          }
          .fuel-skill-cat {
            border-right: none;
            border-bottom: 1px solid var(--border);
          }

          .fuel-contact-inner {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

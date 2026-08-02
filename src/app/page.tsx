import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import CatBot from "@/components/CatBot";
import { BentoGridSection } from "@/components/ui/BentoGrid";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { ParticlesCanvas } from "@/components/ui/ParticlesCanvas";
import OrbitingCirclesGlobeDemo from "@/components/ui/orbiting-circles-02";
import SpliteHeroDemo from "@/components/ui/splite";

const testimonials = [
  {
    quote: "Quik Code delivered our full-stack crypto telemetry dashboard in 72 hours flat. Outstanding UI quality and bulletproof WebSockets.",
    author: "Marcus Vance",
    role: "CTO",
    company: "Apex Analytics",
  },
  {
    quote: "The Stripe integration was flawless. We processed over $1.2M in subscriptions within the first 60 days of launch.",
    author: "Elena Rostova",
    role: "Head of Product",
    company: "CyberVault Security",
  },
  {
    quote: "Best development experience I've ever had. 21st.dev level aesthetics, lightning performance, and complete GitHub repository transfer.",
    author: "David Chen",
    role: "Founder",
    company: "Nova AI Labs",
  },
  {
    quote: "Their team built our healthcare telemetry web portal with HIPAA compliance and HIPAA security audit in record time.",
    author: "Dr. Sarah Jenkins",
    role: "VP of Engineering",
    company: "Pulse Health",
  },
];

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
      {/* 21st.dev Interactive Canvas Particles Background */}
      <ParticlesCanvas />

      <Navbar />
      <Hero />

      {/* 21st.dev Orbiting Circles Globe Ecosystem Banner */}
      <section style={{ position: "relative", padding: "40px 0 80px", maxWidth: "1200px", margin: "0 auto", width: "100%", textAlign: "center" }}>
        <div style={{ marginBottom: "20px" }}>
          <div className="section-label">Seamless Integration</div>
          <h2 className="section-heading" style={{ fontSize: "2.2rem" }}>
            Connected to Your <span className="text-gradient">Tech Ecosystem</span>
          </h2>
        </div>
        <OrbitingCirclesGlobeDemo />
      </section>

      <div className="glow-line" style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }} />

      {/* 21st.dev Splite 3D Spline Scene Hero Banner */}
      <SpliteHeroDemo />

      <div className="glow-line" style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }} />

      {/* 21st.dev Bento Grid Section */}
      <BentoGridSection />

      <div className="glow-line" style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }} />

      <Services />

      <div className="glow-line" style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }} />

      <Portfolio />

      <div className="glow-line" style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }} />

      {/* 21st.dev Infinite Testimonials Marquee */}
      <section style={{ padding: "60px 0", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div className="section-label">Wall of Love</div>
          <h2 className="section-heading" style={{ fontSize: "2rem" }}>
            Loved by <span className="text-gradient">Founders & Engineers</span>
          </h2>
        </div>
        <InfiniteMarquee items={testimonials} speed={30} />
      </section>

      <div className="glow-line" style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }} />

      <Process />

      <div className="glow-line" style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }} />

      <Pricing />

      <Footer />
      <CatBot />
    </main>
  );
}

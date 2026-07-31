"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageSquare, X, Send, Bot, Sparkles, ArrowRight, Zap, CheckCircle2, RefreshCw } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  recommendation?: {
    serviceKey: string;
    title: string;
    price: string;
    deposit: number;
    timeline: string;
    features: string[];
  };
  options?: string[];
  timestamp: string;
}

const QUICK_QUESTIONS = [
  "Which plan is best for me?",
  "How fast can you deliver?",
  "I need an E-Commerce store",
  "What payment gateways do you support?",
  "What is your pricing?",
];

const generateId = (prefix = "msg") => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export default function CatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId("bot_init"),
      sender: "bot",
      text: "Meow! 🐾 Welcome to QuickCode! I'm **CatBot**, your AI Project Advisor. Tell me what you're planning to build, your budget, or timeline, and I'll recommend the exact best plan for you!",
      options: QUICK_QUESTIONS,
      timestamp: "Just now",
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: generateId("user"),
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    const isMathQuery = /\d+\s*[\+\-\*\/]\s*\d+/.test(queryText) || /(?:what is|calc|calculate|solve)\s+\d+/.test(queryText.toLowerCase());
    const localResponse = processUserQuery(queryText);

    // If query is math OR local response is generic fallback, query /api/catbot
    if (isMathQuery || localResponse.text.includes("I hear you! To give you the exact best recommendation")) {
      try {
        const res = await fetch("/api/catbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: queryText }),
        });
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: generateId("bot_api"),
          sender: "bot",
          text: data.text || localResponse.text,
          options: QUICK_QUESTIONS,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } catch (err) {
        setMessages((prev) => [...prev, localResponse]);
      } finally {
        setIsTyping(false);
      }
      return;
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, localResponse]);
      setIsTyping(false);
    }, 600);
  };

  const processUserQuery = (userQuery: string): ChatMessage => {
    const raw = userQuery.trim();
    const q = raw.toLowerCase();
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // 0A. GREETINGS (hi, hello, hey, etc.)
    const greetingWords = ["hi", "hello", "hey", "heyy", "heyyy", "greetings", "good morning", "good afternoon", "good evening", "yo"];
    if (greetingWords.some((g) => q === g || q.startsWith(g + " ") || q.endsWith(" " + g))) {
      return {
        id: generateId("bot"),
        sender: "bot",
        text: "Meow! 🐱 Hello there! It's awesome to meet you. I'm **CatBot**, your AI Project Advisor.\n\nHow can I help you today? Tell me what you're looking to build or ask me anything about our plans!",
        options: ["Which plan is best for me?", "How fast can you build my site?", "What is your pricing?"],
        timestamp: timeStr,
      };
    }

    // 0B. "HOW ARE YOU" / "WHAT'S UP"
    if (q.includes("how are you") || q.includes("how are u") || q.includes("how r u") || q.includes("how's it going") || q.includes("whats up") || q.includes("what's up")) {
      return {
        id: generateId("bot"),
        sender: "bot",
        text: "I'm feeling feline fine and full of code energy! ⚡🐾 Thanks for asking! I'm here and ready to help you plan your next web application or landing page. What project do you have in mind?",
        options: ["I need a web application", "I need an e-commerce store", "I need a landing page"],
        timestamp: timeStr,
      };
    }

    // 0C. WHO ARE YOU / WHAT CAN YOU DO
    if (q.includes("who are you") || q.includes("what is your name") || q.includes("who r u") || q.includes("what can you do") || q.includes("what do you do")) {
      return {
        id: generateId("bot"),
        sender: "bot",
        text: "I'm **CatBot** 🐱, QuickCode's AI Project Advisor! My job is to help you figure out the exact best development package for your idea, calculate deposit costs, estimate turnaround time, and answer any technical questions you have!",
        options: ["Recommend a plan for me", "What payment gateways do you support?", "Show me pricing"],
        timestamp: timeStr,
      };
    }

    // 0D. GRATITUDE / OK
    if (q === "thanks" || q.includes("thank you") || q === "cool" || q === "awesome" || q === "ok" || q === "okay" || q === "great") {
      return {
        id: generateId("bot"),
        sender: "bot",
        text: "You're very welcome! 🐱🐾 Whenever you're ready to bring your vision to life, click the button below to book your project!",
        options: ["Book Project Now", "Ask another question"],
        timestamp: timeStr,
      };
    }

    // 1. E-COMMERCE / STORE
    if (q.includes("e-commerce") || q.includes("ecommerce") || q.includes("store") || q.includes("shop") || q.includes("sell")) {
      return {
        id: generateId("bot"),
        sender: "bot",
        text: "🐱 Purrfect! For online stores, our **E-Commerce & Payment Portal** plan is tailor-made for you. It includes Cashfree & Stripe integration, product catalogs, shopping cart, and automated order tracking!",
        recommendation: {
          serviceKey: "ecommerce",
          title: "E-Commerce & Payment Portal",
          price: "$999+",
          deposit: 200,
          timeline: "5 – 7 Days Delivery",
          features: ["Cashfree & Stripe Payments", "Product & Cart System", "Firestore Order Tracking", "SEO & Mobile Optimized"],
        },
        options: ["How do payments work?", "What if I need custom features?", "Book This Plan"],
        timestamp: timeStr,
      };
    }

    // 2. LANDING PAGE / REDESIGN / BUDGET (<$800)
    if (q.includes("landing") || q.includes("redesign") || q.includes("portfolio") || q.includes("cheap") || q.includes("low budget") || q.includes("500") || q.includes("499")) {
      return {
        id: generateId("bot"),
        sender: "bot",
        text: "🐱 Great choice! If you need a high-converting landing page or a brand redesign, our **Landing Page & UI Redesign** plan delivers breathtaking 3D visuals, lightning speed, and peak conversion in under a week!",
        recommendation: {
          serviceKey: "landing",
          title: "Landing Page & UI Redesign",
          price: "$499+",
          deposit: 150,
          timeline: "3 – 5 Days Delivery",
          features: ["Futuristic Dark UI & Micro-animations", "SEO & Analytics Configured", "Mobile Responsive", "High Conversion Copy Structure"],
        },
        options: ["Show me Full-Stack plan", "Can I add custom forms?", "Book Landing Page Plan"],
        timestamp: timeStr,
      };
    }

    // 3. FULL STACK / CUSTOM APP / SAAS
    if (q.includes("full") || q.includes("stack") || q.includes("app") || q.includes("saas") || q.includes("dashboard") || q.includes("database") || q.includes("auth")) {
      return {
        id: generateId("bot"),
        sender: "bot",
        text: "⚡ Impressive! For complex web apps, SaaS platforms, or custom dashboards, our **Full-Stack Web Application** plan gives you production-grade Next.js, Firebase Auth, Firestore DB, and Admin Master Controls!",
        recommendation: {
          serviceKey: "fullstack",
          title: "Full-Stack Web Application",
          price: "$1,499+",
          deposit: 250,
          timeline: "7 – 10 Days Delivery",
          features: ["Next.js 16 + Firebase Backend", "Admin Control Panel & Live Chat", "User Auth & Roles", "Database & Payment Integration"],
        },
        options: ["What about API integrations?", "How does payment deposit work?", "Book Full-Stack Plan"],
        timestamp: timeStr,
      };
    }

    // 4. TIMELINE / SPEED / DELIVERY
    if (q.includes("fast") || q.includes("delivery") || q.includes("timeline") || q.includes("how long") || q.includes("urgent") || q.includes("days")) {
      return {
        id: generateId("bot"),
        sender: "bot",
        text: "⏱️ QuickCode builds at ultra-speed! Our turnaround times are:\n\n- 🎨 **Landing Page**: 3 to 5 Days\n- 🛒 **E-Commerce Portal**: 5 to 7 Days\n- 🚀 **Full-Stack Web App**: 7 to 10 Days\n\nNeed ASAP delivery? We also offer **Rush 2-3 Day Delivery**!",
        options: ["Which plan is best for me?", "What payment gateways are supported?", "Book Project Now"],
        timestamp: timeStr,
      };
    }

    // 5. PAYMENT GATEWAYS
    if (q.includes("payment") || q.includes("gateway") || q.includes("stripe") || q.includes("cashfree") || q.includes("upi") || q.includes("card")) {
      return {
        id: generateId("bot"),
        sender: "bot",
        text: "💳 We support seamless instant global & domestic payment gateways:\n\n1. **Cashfree PG**: UPI (GPay, PhonePe, Paytm), NetBanking, & Cards (INR)\n2. **Stripe PG**: Credit/Debit Cards, Apple Pay, International (USD)\n\nAll payments automatically save your order in Firebase Firestore!",
        options: ["Recommend a plan for me", "Book Project Now"],
        timestamp: timeStr,
      };
    }

    // 6. PRICING / PLANS GENERAL
    if (q.includes("price") || q.includes("cost") || q.includes("plan") || q.includes("how much") || q.includes("rate")) {
      return {
        id: generateId("bot"),
        sender: "bot",
        text: "💰 Here is a summary of QuickCode pricing & plans:\n\n1. **Landing Page**: $499+ (Deposit: $150)\n2. **E-Commerce Portal**: $999+ (Deposit: $200)\n3. **Full-Stack Web App**: $1,499+ (Deposit: $250)\n4. **Custom Enterprise AI**: $2,499+ (Deposit: $500)\n\nYou only pay a small initial deposit to kick off development!",
        options: ["Help me pick the right plan", "Book Project Now"],
        timestamp: timeStr,
      };
    }

    // DEFAULT FALLBACK AI RESPONSE
    return {
      id: generateId("bot"),
      sender: "bot",
      text: "🐾 I hear you! To give you the exact best recommendation, tell me a bit more about what you're building (e.g. 'I want an online shop', 'I need a SaaS web app', or 'What is your budget?').",
      options: QUICK_QUESTIONS,
      timestamp: timeStr,
    };
  };

  return (
    <>
      {/* Floating Trigger Widget Button */}
      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999 }}>
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            style={{
              padding: "12px 20px",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
              color: "#fff",
              fontWeight: 800,
              fontSize: "0.92rem",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 8px 30px rgba(99,102,241,0.5), 0 0 20px rgba(236,72,153,0.3)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="catbot-pulse"
          >
            <span style={{ fontSize: "1.2rem" }}>🐱</span>
            <span>Ask CatBot AI</span>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
          </button>
        )}
      </div>

      {/* Floating Chat Modal Panel */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            width: "calc(100vw - 40px)",
            maxWidth: 420,
            height: 580,
            borderRadius: "24px",
            background: "#080c17",
            border: "1px solid rgba(99, 102, 241, 0.35)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(99,102,241,0.25)",
            zIndex: 10000,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Top Header */}
          <div
            style={{
              padding: "16px 20px",
              background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(236,72,153,0.15) 100%)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #6366f1, #ec4899)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.3rem",
                  boxShadow: "0 0 12px rgba(99,102,241,0.5)",
                }}
              >
                🐱
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#fff", fontFamily: "var(--font-heading)", display: "flex", alignItems: "center", gap: 6 }}>
                  CatBot AI <span style={{ padding: "2px 6px", borderRadius: 9999, background: "rgba(16,185,129,0.2)", color: "#6ee7b7", fontSize: "0.65rem" }}>ONLINE</span>
                </div>
                <div style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>QuickCode Smart Plan & Price Advisor</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Container */}
          <div
            style={{
              flex: 1,
              padding: 16,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(99,102,241,0.04) 0%, transparent 100%)",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "90%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {/* Bubble */}
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: msg.sender === "user" ? "18px 18px 2px 18px" : "18px 18px 18px 2px",
                    background: msg.sender === "user" ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "rgba(255,255,255,0.06)",
                    border: `1px solid ${msg.sender === "user" ? "transparent" : "rgba(255,255,255,0.1)"}`,
                    color: "#fff",
                    fontSize: "0.88rem",
                    lineHeight: 1.5,
                  }}
                >
                  {msg.text}
                </div>

                {/* Plan Recommendation Card inside Chat */}
                {msg.recommendation && (
                  <div
                    style={{
                      padding: 16,
                      borderRadius: "16px",
                      background: "rgba(11, 17, 35, 0.9)",
                      border: "1px solid rgba(99, 102, 241, 0.4)",
                      boxShadow: "0 10px 30px rgba(99,102,241,0.2)",
                      marginTop: 4,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.72rem", color: "#a5b4fc", fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase" }}>
                        ⚡ RECOMMENDED PLAN
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#6ee7b7", fontWeight: 700 }}>{msg.recommendation.timeline}</span>
                    </div>

                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", fontFamily: "var(--font-heading)" }}>
                      {msg.recommendation.title}
                    </div>

                    <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#6366f1", fontFamily: "var(--font-heading)" }}>
                      {msg.recommendation.price} <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>(Deposit: ${msg.recommendation.deposit})</span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {msg.recommendation.features.map((feat, fIdx) => (
                        <div key={fIdx} style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
                          <CheckCircle2 size={13} color="#10b981" /> {feat}
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/book"
                      onClick={() => setIsOpen(false)}
                      className="btn-primary"
                      style={{ padding: "10px", fontSize: "0.85rem", justifyContent: "center", marginTop: 4 }}
                    >
                      Book {msg.recommendation.title} →
                    </Link>
                  </div>
                )}

                {/* Quick Option Buttons */}
                {msg.options && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                    {msg.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSend(opt)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "9999px",
                          background: "rgba(99,102,241,0.12)",
                          border: "1px solid rgba(99,102,241,0.3)",
                          color: "#a5b4fc",
                          fontSize: "0.76rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ alignSelf: "flex-start", padding: "10px 16px", borderRadius: "18px", background: "rgba(255,255,255,0.06)", color: "var(--text-muted)", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 6 }}>
                <span>🐱 CatBot is thinking</span>
                <span className="dot-pulse" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              padding: 12,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(5, 7, 13, 0.95)",
              display: "flex",
              gap: 8,
            }}
          >
            <input
              type="text"
              placeholder="Ask CatBot about plans, pricing, delivery..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff",
                fontSize: "0.88rem",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="btn-primary"
              style={{ width: 44, height: 44, borderRadius: "14px", padding: 0, justifyContent: "center" }}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

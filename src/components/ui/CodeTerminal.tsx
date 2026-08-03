"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, Play, Sparkles, Code2, Database } from "lucide-react";
import { BorderBeam } from "./BorderBeam";

const files = [
  {
    name: "page.tsx",
    icon: <Code2 size={14} color="#6366f1" />,
    language: "tsx",
    code: `import { QuikCodeEngine } from "@quikcode/core";
import { StripeCheckout } from "@quikcode/payments";

export default async function App() {
  const engine = await QuikCodeEngine.init({
    speed: "72h",
    securityGrade: "A+",
    pciCompliant: true,
  });

  return (
    <main className="dark-cyber-theme">
      <Hero title="Engineered to Scale" />
      <StripeCheckout amount={1499} />
    </main>
  );
}`,
  },
  {
    name: "stripe.ts",
    icon: <Terminal size={14} color="#ec4899" />,
    language: "typescript",
    code: `import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18",
  typescript: true,
});

export async function createCheckoutSession(serviceId: string) {
  return await stripe.checkout.sessions.create({
    payment_method_types: ["card", "us_bank_account"],
    line_items: [{ price: serviceId, quantity: 1 }],
    mode: "subscription",
    success_url: "https://quikcode.dev/success",
  });
}`,
  },
  {
    name: "schema.prisma",
    icon: <Database size={14} color="#06b6d4" />,
    language: "prisma",
    code: `model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  orders    Order[]
  createdAt DateTime @default(now())
}

model Order {
  id        String      @id @default(cuid())
  status    OrderStatus @default(PENDING)
  amount    Int
  userId    String
  user      User        @relation(fields: [userId], references: [id])
}`,
  },
];

export const CodeTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleCopy = () => {
    navigator.clipboard.writeText(files[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setExecuting(true);
    setLogs(["⚡ Compiling TypeScript...", "🔒 Verifying PCI-DSS Security..."]);
    setTimeout(() => {
      setLogs((prev) => [...prev, "✓ Stripe Webhook Active", "🚀 Production Build Ready (994ms)"]);
      setExecuting(false);
    }, 1200);
  };

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        background: "rgba(8, 12, 23, 0.95)",
        backdropFilter: "blur(24px)",
        boxShadow: "0 32px 80px rgba(0, 0, 0, 0.8), 0 0 60px rgba(99, 102, 241, 0.2)",
      }}
    >
      <BorderBeam size={280} duration={12} colorFrom="#6366f1" colorTo="#ec4899" />

      {/* Terminal Top Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          background: "rgba(255, 255, 255, 0.03)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", overflowX: "auto", maxWidth: "100%" }}>
          {/* Mac controls */}
          <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#eab308" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }} />
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
            {files.map((file, idx) => (
              <button
                key={file.name}
                onClick={() => setActiveTab(idx)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  border: "none",
                  background: activeTab === idx ? "rgba(99, 102, 241, 0.2)" : "transparent",
                  color: activeTab === idx ? "#ffffff" : "var(--text-muted)",
                  fontSize: "0.78rem",
                  fontFamily: "var(--font-mono)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {file.icon}
                {file.name}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <button
            onClick={handleRun}
            disabled={executing}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "6px",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              background: "rgba(16, 185, 129, 0.12)",
              color: "#6ee7b7",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <Play size={12} fill="#6ee7b7" />
            {executing ? "Running..." : "Run Engine"}
          </button>
          <button
            onClick={handleCopy}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "6px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(255, 255, 255, 0.05)",
              color: "var(--text-muted)",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div style={{ padding: "16px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", lineHeight: 1.6, color: "#e2e8f0", width: "100%", overflowX: "auto" }}>
        <pre style={{ margin: 0, overflowX: "auto", maxWidth: "100%", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          <code>{files[activeTab].code}</code>
        </pre>
      </div>

      {/* Live Console Logs */}
      {logs.length > 0 && (
        <div
          style={{
            padding: "12px 20px",
            background: "rgba(0, 0, 0, 0.6)",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {logs.map((log, i) => (
            <div key={i} style={{ color: log.includes("✓") ? "#34d399" : "#a5b4fc" }}>
              {log}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

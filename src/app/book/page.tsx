"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CashfreePaymentModal } from "@/components/CashfreePaymentModal";
import { QrCode, CreditCard, ShieldCheck } from "lucide-react";
import { createFirestoreOrder } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";

const services = [
  { value: "fullstack", label: "Full-Stack Web Application", price: "$1,499+", deposit: 250 },
  { value: "ecommerce", label: "E-Commerce & Payment Portal", price: "$999+", deposit: 200 },
  { value: "landing", label: "Landing Page & UI Redesign", price: "$499+", deposit: 150 },
  { value: "custom", label: "Custom Software / API Integration", price: "Quote", deposit: 250 },
];

const budgets = ["$500 – $1,000", "$1,000 – $3,000", "$3,000 – $5,000", "$5,000 – $10,000", "$10,000+"];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: "10px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#f1f5f9",
  fontSize: "0.95rem",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  rows,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const focusStyle: React.CSSProperties = focused
    ? { borderColor: "#6366f1", boxShadow: "0 0 0 3px rgba(99,102,241,0.15)", background: "rgba(99,102,241,0.05)" }
    : {};

  const props = {
    value,
    placeholder,
    required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    style: { ...inputStyle, ...focusStyle },
  };

  return (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: 600,
          fontSize: "0.88rem",
          color: "#8b9ec7",
          letterSpacing: "0.01em",
        }}
      >
        {label} {required && <span style={{ color: "#6366f1" }}>*</span>}
      </label>
      {rows ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          rows={rows}
          style={{ ...props.style, resize: "vertical", minHeight: "100px" }}
        />
      ) : (
        <input type={type} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
    </div>
  );
}

export default function BookPage() {
  const { user, sendVerificationEmail, reloadUser } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [budget, setBudget] = useState(budgets[1]);
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [company, setCompany] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timeline, setTimeline] = useState("Standard (7 days)");
  const [gateway, setGateway] = useState<"stripe" | "cashfree">("cashfree");
  const [showCashfreeModal, setShowCashfreeModal] = useState(false);
  const [txnRef, setTxnRef] = useState("");
  const [firestoreId, setFirestoreId] = useState("");

  // Email verification state
  const [verificationSent, setVerificationSent] = useState(false);
  const [verifyingMsg, setVerifyingMsg] = useState("");

  const isEmailUnverified = Boolean(user && !user.emailVerified && user.providerData.some((p) => p.providerId === "password"));

  const handlePayment = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (isEmailUnverified) {
        setVerifyingMsg("⚠️ Mandatory Email Verification Required! Please verify your email before completing payment.");
        return;
      }

      if (gateway === "cashfree") {
        setShowCashfreeModal(true);
      } else {
        setLoading(true);
        const stripePayId = `tx_stripe_${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

        // Save order document directly to Firebase Firestore
        const docId = await createFirestoreOrder({
          userId: user?.uid,
          customerName: name || "Client",
          customerEmail: email || "user@company.com",
          service: selectedService.label,
          budget,
          timeline,
          details,
          gateway: "stripe",
          amount: selectedService.deposit,
          paymentId: stripePayId,
          status: "PAID",
        });

        setLoading(false);
        setTxnRef(stripePayId);
        setFirestoreId(docId);
        setSuccess(true);
      }
    },
    [gateway, user, name, email, selectedService, budget, timeline, details, isEmailUnverified]
  );

  const handleCashfreeSuccess = async (cfPayId: string) => {
    setShowCashfreeModal(false);

    // Save order document directly to Firebase Firestore
    const docId = await createFirestoreOrder({
      userId: user?.uid,
      customerName: name || "Client",
      customerEmail: email || "user@company.com",
      service: selectedService.label,
      budget,
      timeline,
      details,
      gateway: "cashfree",
      amount: selectedService.deposit,
      paymentId: cfPayId,
      status: "PAID",
    });

    setTxnRef(cfPayId);
    setFirestoreId(docId);
    setSuccess(true);
  };

  const StepIndicator = () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "40px" }}>
      {[1, 2, 3].map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "none" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background:
                step > s
                  ? "#10b981"
                  : step === s
                  ? "#6366f1"
                  : "rgba(255,255,255,0.06)",
              border: `2px solid ${step > s ? "#10b981" : step === s ? "#6366f1" : "rgba(255,255,255,0.12)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.82rem",
              fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              color: step >= s ? "#fff" : "#4b5680",
              transition: "all 0.4s ease",
              flexShrink: 0,
              boxShadow: step === s ? "0 0 20px rgba(99,102,241,0.4)" : "none",
            }}
          >
            {step > s ? (
              <svg viewBox="0 0 14 14" width="14" height="14">
                <path d="M2 7l4 4 6-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              s
            )}
          </div>
          {i < 2 && (
            <div
              style={{
                flex: 1,
                height: "2px",
                background:
                  step > s + 1
                    ? "#10b981"
                    : step > s
                    ? "linear-gradient(90deg, #10b981, #6366f1)"
                    : "rgba(255,255,255,0.08)",
                transition: "all 0.5s ease",
                margin: "0 6px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Cashfree Payment Gateway Modal */}
      {showCashfreeModal && (
        <CashfreePaymentModal
          amount={selectedService.deposit}
          serviceName={selectedService.label}
          customerName={name || "Alex Morgan"}
          customerEmail={email || "alex@company.com"}
          onSuccess={handleCashfreeSuccess}
          onClose={() => setShowCashfreeModal(false)}
        />
      )}

      <section
        style={{
          flexGrow: 1,
          padding: "60px 24px",
          maxWidth: "720px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px",
              borderRadius: "9999px",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.25)",
              marginBottom: "20px",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#818cf8",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#6366f1",
                boxShadow: "0 0 8px #6366f1",
              }}
            />
            Firebase Firestore & Cashfree Enabled
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 800,
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.035em",
              marginBottom: "12px",
            }}
          >
            Start Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff, #a5b4fc, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Quick Code Project
            </span>
          </h1>
          <p style={{ color: "#8b9ec7", fontSize: "1rem", lineHeight: 1.6 }}>
            Pay deposit via Cashfree (UPI/INR) or Stripe. Orders are saved directly to Firebase Firestore!
          </p>
        </div>

        {success ? (
          /* ─── SUCCESS STATE ─── */
          <div
            style={{
              padding: "56px 48px",
              borderRadius: "20px",
              background: "rgba(16,185,129,0.05)",
              border: "1px solid rgba(16,185,129,0.3)",
              textAlign: "center",
              boxShadow: "0 0 60px rgba(16,185,129,0.08)",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "rgba(16,185,129,0.15)",
                border: "2px solid rgba(16,185,129,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg viewBox="0 0 24 24" width="32" height="32">
                <path d="M5 12l5 5 9-9" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#10b981", marginBottom: "12px", fontFamily: "'Space Grotesk', sans-serif" }}>
              Order Saved to Firebase!
            </h2>
            <p style={{ color: "#8b9ec7", lineHeight: 1.7, marginBottom: "8px" }}>
              Thank you, <strong style={{ color: "#f1f5f9" }}>{name || "Client"}</strong>! Your deposit for{" "}
              <strong style={{ color: "#f1f5f9" }}>{selectedService.label}</strong> has been processed via {gateway.toUpperCase()} PG.
            </p>
            <p style={{ color: "#8b9ec7", marginBottom: "28px" }}>
              Our team will reach out to <strong style={{ color: "#f1f5f9" }}>{email}</strong> within 2 hours.
            </p>
            <div
              style={{
                padding: "14px 20px",
                borderRadius: "10px",
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.82rem",
                color: "#6ee7b7",
                marginBottom: "28px",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div>🔥 Firestore Doc ID: <span style={{ color: "#fff" }}>{firestoreId}</span></div>
              <div>🔒 Payment Ref ID: <span style={{ color: "#a7f3d0" }}>{txnRef}</span></div>
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => { setSuccess(false); setStep(1); setName(""); setEmail(""); setDetails(""); }}
                style={{
                  padding: "12px 28px",
                  borderRadius: "9999px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#f1f5f9",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Book Another
              </button>
              <Link href="/" className="btn-primary" style={{ padding: "12px 28px" }}>
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          /* ─── FORM ─── */
          <div
            style={{
              borderRadius: "20px",
              background: "rgba(11,17,35,0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "36px 36px 0" }}>
              <StepIndicator />
            </div>

            <form onSubmit={handlePayment} style={{ padding: "0 36px 36px" }}>
              {/* ─── STEP 1 ─── */}
              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div>
                    <h2 style={{ fontSize: "1.2rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: "4px" }}>
                      Project Type & Budget
                    </h2>
                    <p style={{ fontSize: "0.85rem", color: "#8b9ec7" }}>Tell us what you need built</p>
                  </div>

                  {/* Service selector cards */}
                  <div>
                    <label style={{ display: "block", marginBottom: "12px", fontWeight: 600, fontSize: "0.88rem", color: "#8b9ec7" }}>
                      Service Required <span style={{ color: "#6366f1" }}>*</span>
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {services.map((s) => (
                        <button
                          type="button"
                          key={s.value}
                          onClick={() => setSelectedService(s)}
                          style={{
                            padding: "14px 18px",
                            borderRadius: "12px",
                            border: `1px solid ${selectedService.value === s.value ? "#6366f1" : "rgba(255,255,255,0.08)"}`,
                            background: selectedService.value === s.value ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.02)",
                            color: "#f1f5f9",
                            cursor: "pointer",
                            textAlign: "left",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            transition: "all 0.2s ease",
                            boxShadow: selectedService.value === s.value ? "0 0 20px rgba(99,102,241,0.15)" : "none",
                          }}
                        >
                          <span style={{ fontWeight: 600, fontSize: "0.92rem" }}>{s.label}</span>
                          <span style={{ fontSize: "0.82rem", fontFamily: "'JetBrains Mono', monospace", color: selectedService.value === s.value ? "#818cf8" : "#4b5680" }}>
                            {s.price}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label style={{ display: "block", marginBottom: "12px", fontWeight: 600, fontSize: "0.88rem", color: "#8b9ec7" }}>
                      Budget Range <span style={{ color: "#6366f1" }}>*</span>
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px" }}>
                      {budgets.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setBudget(b)}
                          style={{
                            padding: "10px 12px",
                            borderRadius: "10px",
                            border: `1px solid ${budget === b ? "#6366f1" : "rgba(255,255,255,0.08)"}`,
                            background: budget === b ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.02)",
                            color: budget === b ? "#a5b4fc" : "#8b9ec7",
                            fontSize: "0.83rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "0.88rem", color: "#8b9ec7" }}>
                      Delivery Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      style={{ ...inputStyle, appearance: "none" }}
                    >
                      {["Standard (7 days)", "Rush (3–5 days) +30%", "ASAP (1–2 days) +80%"].map((t) => (
                        <option key={t} value={t} style={{ background: "#080c17" }}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <button type="button" onClick={() => setStep(2)} className="btn-primary" style={{ width: "100%", padding: "14px" }}>
                    Continue to Details →
                  </button>
                </div>
              )}

              {/* ─── STEP 2 ─── */}
              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <h2 style={{ fontSize: "1.2rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: "4px" }}>
                      Contact & Project Details
                    </h2>
                    <p style={{ fontSize: "0.85rem", color: "#8b9ec7" }}>Help us understand your vision</p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <InputField label="Full Name" placeholder="Alex Morgan" value={name} onChange={setName} required />
                    <InputField label="Company (optional)" placeholder="Acme Corp" value={company} onChange={setCompany} />
                  </div>

                  <InputField label="Work Email" type="email" placeholder="alex@company.com" value={email} onChange={setEmail} required />

                  <InputField
                    label="Project Overview"
                    placeholder="Describe your vision, target audience, key features, deadlines, integrations..."
                    value={details}
                    onChange={setDetails}
                    rows={5}
                  />

                  <div style={{ display: "flex", gap: "12px" }}>
                    <button type="button" onClick={() => setStep(1)} style={{ flex: 1, padding: "14px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#f1f5f9", fontWeight: 600, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}>
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!name) setName(user?.displayName || "Alex Morgan");
                        if (!email) setEmail(user?.email || "alex@company.com");
                        setStep(3);
                      }}
                      className="btn-primary"
                      style={{ flex: 2, padding: "14px" }}
                    >
                      Proceed to Payment →
                    </button>
                  </div>
                </div>
              )}

              {/* ─── STEP 3 ─── */}
              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <h2 style={{ fontSize: "1.2rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: "4px" }}>
                      Select Payment Gateway
                    </h2>
                    <p style={{ fontSize: "0.85rem", color: "#8b9ec7" }}>Pay deposit via Cashfree (UPI/INR) or Stripe (USD). Saved to Firebase.</p>
                  </div>

                  {/* Payment Gateway Toggle */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <button
                      type="button"
                      onClick={() => setGateway("cashfree")}
                      style={{
                        padding: "16px",
                        borderRadius: "12px",
                        border: `2px solid ${gateway === "cashfree" ? "#06b6d4" : "rgba(255,255,255,0.08)"}`,
                        background: gateway === "cashfree" ? "rgba(6,182,212,0.15)" : "rgba(255,255,255,0.02)",
                        color: "#fff",
                        cursor: "pointer",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "0.95rem" }}>
                        <QrCode size={18} color="#06b6d4" /> Cashfree PG
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                        UPI (GPay/PhonePe), NetBanking, Cards (INR)
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setGateway("stripe")}
                      style={{
                        padding: "16px",
                        borderRadius: "12px",
                        border: `2px solid ${gateway === "stripe" ? "#6366f1" : "rgba(255,255,255,0.08)"}`,
                        background: gateway === "stripe" ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.02)",
                        color: "#fff",
                        cursor: "pointer",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "0.95rem" }}>
                        <CreditCard size={18} color="#818cf8" /> Stripe PG
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                        Global Cards & Subscriptions (USD)
                      </div>
                    </button>
                  </div>

                  {/* Order Summary */}
                  <div
                    style={{
                      padding: "20px",
                      borderRadius: "14px",
                      background: "rgba(99,102,241,0.08)",
                      border: "1px solid rgba(99,102,241,0.25)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.78rem", color: "#8b9ec7", fontFamily: "'JetBrains Mono', monospace", marginBottom: "4px" }}>ORDER SUMMARY</div>
                      <div style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "1rem" }}>{selectedService.label}</div>
                      <div style={{ fontSize: "0.82rem", color: "#8b9ec7" }}>{budget} · {timeline}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.78rem", color: "#8b9ec7", fontFamily: "'JetBrains Mono', monospace", marginBottom: "4px" }}>DEPOSIT DUE</div>
                      <div style={{ fontSize: "1.6rem", fontWeight: 800, color: gateway === "cashfree" ? "#06b6d4" : "#6366f1", fontFamily: "'Space Grotesk', sans-serif" }}>
                        {gateway === "cashfree" ? `₹${selectedService.deposit * 83}` : `$${selectedService.deposit}.00`}
                      </div>
                    </div>
                  </div>

                  {/* Mandatory Email Verification Alert for Unverified Users */}
                  {isEmailUnverified && (
                    <div
                      style={{
                        padding: "20px",
                        borderRadius: "14px",
                        background: "rgba(245, 158, 11, 0.12)",
                        border: "1px solid rgba(245, 158, 11, 0.4)",
                        color: "#fef3c7",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: 700, color: "#fbbf24", fontSize: "0.95rem", marginBottom: "8px" }}>
                        ⚠️ Mandatory Email Verification Required
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "#fde68a", lineHeight: 1.5, marginBottom: "16px" }}>
                        You must verify your email address (<strong>{user?.email}</strong>) before you can purchase or book projects.
                      </p>
                      {verifyingMsg && (
                        <div style={{ padding: "8px 12px", borderRadius: "8px", background: "rgba(239, 68, 68, 0.2)", border: "1px solid rgba(239, 68, 68, 0.4)", color: "#fca5a5", fontSize: "0.8rem", marginBottom: "12px" }}>
                          {verifyingMsg}
                        </div>
                      )}
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await sendVerificationEmail();
                              setVerificationSent(true);
                              setVerifyingMsg("📩 Verification email sent! Please check your inbox and click the verification link.");
                            } catch (e: any) {
                              setVerifyingMsg(e.message || "Could not send verification email.");
                            }
                          }}
                          style={{
                            padding: "10px 16px",
                            borderRadius: "8px",
                            background: "rgba(245, 158, 11, 0.25)",
                            border: "1px solid #fbbf24",
                            color: "#fff",
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          {verificationSent ? "📩 Verification Email Sent!" : "📩 Send Verification Link"}
                        </button>

                        <button
                          type="button"
                          onClick={async () => {
                            await reloadUser();
                            if (user?.emailVerified) {
                              setVerifyingMsg("");
                            }
                          }}
                          style={{
                            padding: "10px 16px",
                            borderRadius: "8px",
                            background: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            color: "#fff",
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          🔄 I Have Verified (Refresh Status)
                        </button>
                      </div>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: "12px" }}>
                    <button type="button" onClick={() => setStep(2)} style={{ flex: 1, padding: "14px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#f1f5f9", fontWeight: 600, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}>
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                      style={{
                        flex: 2,
                        padding: "14px",
                        background: gateway === "cashfree" ? "linear-gradient(135deg, #06b6d4, #6366f1)" : undefined,
                      }}
                    >
                      {gateway === "cashfree"
                        ? `Launch Cashfree Portal (₹${selectedService.deposit * 83}) →`
                        : `Pay $${selectedService.deposit} & Save to Firebase 🔒`}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

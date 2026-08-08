"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UPIPaymentModal } from "@/components/UPIPaymentModal";
import { QrCode, CreditCard, ShieldCheck } from "lucide-react";
import { createFirestoreOrder } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { CurrencyToggle } from "@/components/ui/CurrencyToggle";

const services = [
  { value: "fullstack", label: "Full-Stack Web Application", price: "$1,499+", deposit: 250 },
  { value: "ecommerce", label: "E-Commerce & Payment Portal", price: "$999+", deposit: 200 },
  { value: "landing", label: "Landing Page & UI Redesign", price: "$499+", deposit: 150 },
  { value: "custom", label: "Custom Software / API Integration", price: "Quote", deposit: 250 },
];

const usdBudgets = ["$500 – $1,000", "$1,000 – $3,000", "$3,000 – $5,000", "$5,000 – $10,000", "$10,000+"];

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
  inputMode,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  rows?: number;
  inputMode?: "search" | "none" | "text" | "numeric" | "email" | "tel" | "url" | "decimal";
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
          inputMode={inputMode}
          style={{ ...props.style, resize: "vertical", minHeight: "100px" }}
        />
      ) : (
        <input type={type} inputMode={inputMode} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
    </div>
  );
}

export default function BookPage() {
  const { user, loading: authLoading, sendVerificationEmail, reloadUser } = useAuth();
  const { formatPriceString, formatAmount, currency } = useCurrency();
  const budgets = usdBudgets.map((b) => formatPriceString(b));
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [budgetIdx, setBudgetIdx] = useState(1);
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [company, setCompany] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timeline, setTimeline] = useState("Standard (7 days)");
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [txnRef, setTxnRef] = useState("");
  const [firestoreId, setFirestoreId] = useState("");

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/book");
    }
  }, [authLoading, user, router]);

  // Keep name & email synced with Firebase user
  useEffect(() => {
    if (user) {
      if (user.displayName && !name) setName(user.displayName);
      if (user.email && !email) setEmail(user.email);
    }
  }, [user]);

  // Email verification state
  const [verificationSent, setVerificationSent] = useState(false);
  const [verifyingMsg, setVerifyingMsg] = useState("");

  const isEmailUnverified = Boolean(user && !user.emailVerified && user.providerData.some((p) => p.providerId === "password"));

  const handlePayment = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (isEmailUnverified) {
        setVerifyingMsg("⚠️ Mandatory Email Verification Required! Please verify your email before submitting your payment.");
        return;
      }

      setShowUpiModal(true);
    },
    [isEmailUnverified]
  );

  const handleUpiSubmit = async (utrId: string) => {
    setShowUpiModal(false);
    setLoading(true);

    // Save order document directly to Firebase Firestore with status VERIFICATION_PENDING
    const docId = await createFirestoreOrder({
      userId: user?.uid,
      customerName: name || user?.displayName || user?.email?.split("@")[0] || "Customer",
      customerEmail: email || user?.email || "",
      service: selectedService.label,
      budget: budgets[budgetIdx],
      timeline,
      details,
      gateway: "upi_qr",
      amount: selectedService.deposit,
      paymentId: utrId,
      status: "VERIFICATION_PENDING",
    });

    setLoading(false);
    setTxnRef(utrId);
    setFirestoreId(docId);
    setSuccess(true);
  };

  const StepIndicator = () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "40px", overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: "8px", WebkitOverflowScrolling: "touch" }}>
      {[1, 2, 3].map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", flex: "0 0 auto", scrollSnapAlign: "center" }}>
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

  if (authLoading || !user) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px" }}>
          <div style={{ textAlign: "center", color: "#8b9ec7", maxWidth: "420px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "3px solid rgba(99,102,241,0.2)",
                borderTopColor: "#6366f1",
                borderRadius: "50%",
                margin: "0 auto 20px",
                animation: "spin 1s linear infinite",
              }}
            />
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", marginBottom: "10px", fontFamily: "'Space Grotesk', sans-serif" }}>
              Account Sign-In Required
            </h2>
            <p style={{ fontSize: "0.92rem", color: "#8b9ec7", lineHeight: 1.6 }}>
              Please log in to your Quik Code account to select plans and proceed to checkout. Redirecting you to login...
            </p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* QuikCode UPI QR Payment Modal */}
      {showUpiModal && (
        <UPIPaymentModal
          amount={selectedService.deposit}
          serviceName={selectedService.label}
          customerName={name || user?.displayName || user?.email?.split("@")[0] || "Customer"}
          customerEmail={email || user?.email || ""}
          onSubmitTxnId={handleUpiSubmit}
          onClose={() => setShowUpiModal(false)}
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
            Firebase Firestore & UPI Payment Portal
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
              Quik Code Project
            </span>
          </h1>
          <p style={{ color: "#8b9ec7", fontSize: "1rem", lineHeight: 1.6 }}>
            Scan the QuikCode UPI QR Code, enter your 12-digit UTR ID, and submit for Admin Verification!
          </p>
        </div>

        {success ? (
          /* ─── SUCCESS / VERIFICATION PENDING STATE ─── */
          <div
            style={{
              padding: "56px 48px",
              borderRadius: "20px",
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.35)",
              textAlign: "center",
              boxShadow: "0 0 60px rgba(245,158,11,0.1)",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "rgba(245,158,11,0.18)",
                border: "2px solid rgba(245,158,11,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <span style={{ fontSize: "2rem" }}>⏳</span>
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fbbf24", marginBottom: "12px", fontFamily: "'Space Grotesk', sans-serif" }}>
              Payment Under Verification!
            </h2>
            <p style={{ color: "#8b9ec7", lineHeight: 1.7, marginBottom: "8px" }}>
              Thank you, <strong style={{ color: "#f1f5f9" }}>{name || "Client"}</strong>! Your payment reference{" "}
              <strong style={{ color: "#fbbf24" }}>#{txnRef}</strong> for <strong style={{ color: "#f1f5f9" }}>{selectedService.label}</strong> has been submitted to Admin.
            </p>
            <p style={{ color: "#8b9ec7", marginBottom: "28px" }}>
              Our Admin team is reviewing your transaction ID. Status will update to <strong style={{ color: "#10b981" }}>VERIFIED & ACTIVE</strong> as soon as admin approves!
            </p>
            <div
              style={{
                padding: "14px 20px",
                borderRadius: "10px",
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.25)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.82rem",
                color: "#fde68a",
                marginBottom: "28px",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div>🔥 Firestore Doc ID: <span style={{ color: "#fff" }}>{firestoreId}</span></div>
              <div>🔑 Submitted UTR / Txn ID: <span style={{ color: "#fbbf24", fontWeight: 700 }}>{txnRef}</span></div>
              <div>⏳ Current Status: <span style={{ color: "#fbbf24", fontWeight: 700 }}>VERIFICATION PENDING</span></div>
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <Link href="/profile" className="btn-primary" style={{ padding: "12px 28px" }}>
                View Order in Profile →
              </Link>
              <Link href="/" style={{ padding: "12px 28px", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}>
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
            <div style={{ padding: "clamp(24px, 5vw, 36px) clamp(24px, 5vw, 36px) 0" }}>
              <StepIndicator />
            </div>

            <form onSubmit={handlePayment} style={{ padding: "0 clamp(16px, 4vw, 36px) clamp(16px, 4vw, 36px)" }}>
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
                            {formatPriceString(s.price)}
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
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "clamp(8px, 2vw, 16px)" }}>
                       {budgets.map((b, idx) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setBudgetIdx(idx)}
                          style={{
                            padding: "10px 12px",
                            borderRadius: "10px",
                            border: `1px solid ${budgetIdx === idx ? "#6366f1" : "rgba(255,255,255,0.08)"}`,
                            background: budgetIdx === idx ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.02)",
                            color: budgetIdx === idx ? "#a5b4fc" : "#8b9ec7",
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
                    <InputField label="Full Name" placeholder="John Doe" value={name} onChange={setName} required inputMode="text" />
                    <InputField label="Company (optional)" placeholder="Acme Corp" value={company} onChange={setCompany} inputMode="text" />
                  </div>

                  <InputField label="Work Email" type="email" placeholder="john@example.com" value={email} onChange={setEmail} required inputMode="email" />

                  <InputField
                    label="Project Overview"
                    placeholder="Describe your vision, target audience, key features, deadlines, integrations..."
                    value={details}
                    onChange={setDetails}
                    rows={5}
                    inputMode="text"
                  />

                  <div style={{ display: "flex", gap: "12px" }}>
                    <button type="button" onClick={() => setStep(1)} style={{ flex: 1, padding: "14px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#f1f5f9", fontWeight: 600, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}>
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!name && user?.displayName) setName(user.displayName);
                        if (!email && user?.email) setEmail(user.email);
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
                  {/* Step 3: Payment Section */}
                  <div>
                    <h2 style={{ fontSize: "1.2rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: "4px" }}>
                      QuikCode UPI QR Payment
                    </h2>
                    <p style={{ fontSize: "0.85rem", color: "#8b9ec7" }}>Scan our QR Code with any UPI app (GPay/PhonePe/Paytm), enter your 12-digit UTR ID, and submit for Admin Verification.</p>
                  </div>

                  {/* UPI Method Card */}
                  <div
                    style={{
                      padding: "20px",
                      borderRadius: "14px",
                      background: "rgba(99,102,241,0.12)",
                      border: "1px solid rgba(99,102,241,0.3)",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        padding: "12px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #6366f1, #ec4899)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <QrCode size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#fff", fontSize: "1.05rem" }}>UPI ID: 9992145372@mbkns</div>
                      <div style={{ fontSize: "0.8rem", color: "#a5b4fc" }}>Scan QR code on next screen or copy UPI ID to pay via any UPI app</div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div
                    style={{
                      padding: "20px",
                      borderRadius: "14px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
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
                      <div style={{ fontSize: "0.82rem", color: "#8b9ec7" }}>{budgets[budgetIdx]} · {timeline}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.78rem", color: "#8b9ec7", fontFamily: "'JetBrains Mono', monospace", marginBottom: "4px" }}>DEPOSIT DUE NOW</div>
                      <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#a5b4fc", fontFamily: "'Space Grotesk', sans-serif" }}>
                        {formatAmount(selectedService.deposit)}
                        {currency === "INR" && (
                          <span style={{ fontSize: "0.85rem", color: "#8b9ec7", marginLeft: "8px" }}>(${selectedService.deposit}.00 USD)</span>
                        )}
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
                        background: "linear-gradient(135deg, #6366f1, #ec4899)",
                      }}
                    >
                      Open UPI QR Code & Enter UTR ID →
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

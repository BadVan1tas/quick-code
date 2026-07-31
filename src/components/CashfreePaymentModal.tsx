"use client";

import React, { useState } from "react";
import { ShieldCheck, CreditCard, QrCode, Smartphone, Building2, CheckCircle2, Lock, X } from "lucide-react";
import { SpotlightCard } from "./ui/SpotlightCard";
import { BorderBeam } from "./ui/BorderBeam";

interface CashfreePaymentModalProps {
  amount: number;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  onSuccess: (paymentId: string) => void;
  onClose: () => void;
}

export function CashfreePaymentModal({
  amount,
  serviceName,
  customerName,
  customerEmail,
  onSuccess,
  onClose,
}: CashfreePaymentModalProps) {
  const [paymentMode, setPaymentMode] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      const cfPaymentId = `cf_pay_${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
      onSuccess(cfPaymentId);
    }, 1800);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(5, 7, 13, 0.85)",
        backdropFilter: "blur(16px)",
        padding: "24px",
      }}
    >
      <SpotlightCard
        style={{
          width: "100%",
          maxWidth: "520px",
          padding: "32px",
          background: "rgba(11, 17, 35, 0.95)",
          border: "1px solid rgba(99, 102, 241, 0.3)",
          boxShadow: "0 32px 80px rgba(0, 0, 0, 0.8), 0 0 60px rgba(99, 102, 241, 0.2)",
          position: "relative",
        }}
        spotlightColor="rgba(99, 102, 241, 0.3)"
      >
        <BorderBeam size={220} duration={10} colorFrom="#06b6d4" colorTo="#6366f1" />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-muted)",
            cursor: "pointer",
          }}
        >
          <X size={16} />
        </button>

        {/* Cashfree Brand Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)",
              color: "#fff",
              fontWeight: 800,
              fontSize: "0.9rem",
              fontFamily: "var(--font-heading)",
            }}
          >
            CASHFREE PG
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              SECURE PAYMENT PORTAL
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>{serviceName}</div>
          </div>
        </div>

        {/* Amount Box */}
        <div
          style={{
            padding: "16px 20px",
            borderRadius: "12px",
            background: "rgba(99, 102, 241, 0.1)",
            border: "1px solid rgba(99, 102, 241, 0.25)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>TOTAL DUE</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#818cf8", fontFamily: "var(--font-heading)" }}>
              ₹{amount * 83} <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>(${amount}.00 USD)</span>
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <div>{customerName}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>{customerEmail}</div>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          {[
            { id: "upi", label: "UPI / QR", icon: <QrCode size={16} /> },
            { id: "card", label: "Cards", icon: <CreditCard size={16} /> },
            { id: "netbanking", label: "Banking", icon: <Building2 size={16} /> },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setPaymentMode(m.id as any)}
              style={{
                padding: "12px 10px",
                borderRadius: "10px",
                border: `1px solid ${paymentMode === m.id ? "#6366f1" : "rgba(255, 255, 255, 0.08)"}`,
                background: paymentMode === m.id ? "rgba(99, 102, 241, 0.15)" : "rgba(255, 255, 255, 0.02)",
                color: paymentMode === m.id ? "#a5b4fc" : "var(--text-muted)",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "all 0.2s ease",
              }}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePay} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {paymentMode === "upi" && (
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)" }}>
                Enter UPI ID (Google Pay / PhonePe / Paytm / BHIM)
              </label>
              <input
                type="text"
                placeholder="name@upi or 9876543210@paytm"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  outline: "none",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          )}

          {paymentMode === "card" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                type="text"
                placeholder="Card Number (4242 •••• •••• 4242)"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  outline: "none",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.9rem",
                }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="MM/YY"
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    outline: "none",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.9rem",
                  }}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  maxLength={4}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    outline: "none",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.9rem",
                  }}
                />
              </div>
            </div>
          )}

          {paymentMode === "netbanking" && (
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)" }}>
                Select Bank
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "#080c17",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  outline: "none",
                  fontSize: "0.9rem",
                }}
              >
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>State Bank of India (SBI)</option>
                <option>Axis Bank</option>
                <option>Kotak Mahindra Bank</option>
              </select>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", color: "var(--text-dim)", justifyContent: "center" }}>
            <Lock size={12} color="#10b981" /> 256-Bit Encrypted Cashfree PG Sandbox
          </div>

          <button
            type="submit"
            disabled={processing}
            className="btn-primary"
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)",
              fontSize: "0.95rem",
            }}
          >
            {processing ? "Processing Cashfree Payment..." : `Pay ₹${amount * 83} via Cashfree 🔒`}
          </button>
        </form>
      </SpotlightCard>
    </div>
  );
}

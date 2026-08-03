"use client";

import React, { useState } from "react";
import Image from "next/image";
import { QrCode, Lock, X, Copy, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { SpotlightCard } from "./ui/SpotlightCard";
import { BorderBeam } from "./ui/BorderBeam";

interface UPIPaymentModalProps {
  amount: number; // Deposit amount in USD
  serviceName: string;
  customerName: string;
  customerEmail: string;
  onSubmitTxnId: (utrId: string) => void;
  onClose: () => void;
}

export function UPIPaymentModal({
  amount,
  serviceName,
  customerName,
  customerEmail,
  onSubmitTxnId,
  onClose,
}: UPIPaymentModalProps) {
  const [utrId, setUtrId] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const upiId = "9992145372@mbkns";
  const amountInr = amount * 83;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUtr = utrId.trim();
    if (!cleanUtr || cleanUtr.length < 6) {
      setErrorMsg("Please enter a valid 12-digit UTR or Transaction ID.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    setTimeout(() => {
      setSubmitting(false);
      onSubmitTxnId(cleanUtr);
    }, 800);
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
        background: "rgba(5, 7, 13, 0.88)",
        backdropFilter: "blur(20px)",
        padding: "clamp(16px, 4vw, 24px)",
        overflowY: "auto",
      }}
    >
      <SpotlightCard
        style={{
          width: "100%",
          maxWidth: "calc(100vw - 32px)",
          padding: "clamp(16px, 4vw, 32px)",
          background: "rgba(11, 17, 35, 0.96)",
          border: "1px solid rgba(99, 102, 241, 0.35)",
          boxShadow: "0 32px 80px rgba(0, 0, 0, 0.85), 0 0 60px rgba(99, 102, 241, 0.2)",
          position: "relative",
          borderRadius: "24px",
        }}
        spotlightColor="rgba(99, 102, 241, 0.3)"
      >
        <BorderBeam size={240} duration={10} colorFrom="#6366f1" colorTo="#ec4899" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="touch-target"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-muted)",
            cursor: "pointer",
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
              color: "#fff",
              fontWeight: 800,
              fontSize: "0.85rem",
              fontFamily: "var(--font-heading)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <QrCode size={16} /> QUIKCODE PAYMENT
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              SCAN & PAY VIA UPI
            </div>
            <div style={{ fontSize: "1.05rem", fontWeight: 700 }}>{serviceName}</div>
          </div>
        </div>

        {/* Amount Box */}
        <div
          style={{
            padding: "16px 20px",
            borderRadius: "14px",
            background: "rgba(99, 102, 241, 0.12)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              DEPOSIT DUE NOW
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#a5b4fc", fontFamily: "var(--font-heading)" }}>
              ₹{amountInr.toLocaleString()} <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>(${amount}.00 USD)</span>
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <div style={{ fontWeight: 600, color: "#fff" }}>{customerName}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>{customerEmail}</div>
          </div>
        </div>

        {/* Dark Neon Theme QR Code Container */}
        <div
          style={{
            background: "rgba(5, 7, 13, 0.95)",
            border: "1px solid rgba(99, 102, 241, 0.4)",
            padding: "clamp(16px, 4vw, 20px)",
            borderRadius: "22px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(99, 102, 241, 0.25), inset 0 0 20px rgba(99, 102, 241, 0.08)",
            marginBottom: "clamp(12px, 3vw, 18px)",
            position: "relative",
          }}
        >
          <img
            src="/upi-qr-dark-neon.png"
            alt="QuikCode Dark Neon UPI Payment QR Code"
            style={{
              width: "min(210px, 80vw)",
              height: "min(210px, 80vw)",
              display: "block",
              borderRadius: "14px",
              boxShadow: "0 0 25px rgba(129, 140, 248, 0.3)",
              border: "1px solid rgba(129, 140, 248, 0.3)",
            }}
          />
          <div style={{ marginTop: "12px", fontSize: "0.78rem", color: "#a5b4fc", fontWeight: 600, fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "6px" }}>
            <span>⚡</span> Scan with Google Pay / PhonePe / Paytm / BHIM
          </div>
        </div>

        {/* Copy UPI ID Button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            marginBottom: "24px",
          }}
        >
          <div style={{ fontSize: "0.85rem" }}>
            <span style={{ color: "var(--text-muted)", marginRight: "8px" }}>UPI ID:</span>
            <strong style={{ fontFamily: "var(--font-mono)", color: "#a5b4fc" }}>{upiId}</strong>
          </div>
          <button
            type="button"
            onClick={handleCopyUpi}
            style={{
              background: "rgba(99, 102, 241, 0.2)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              color: "#a5b4fc",
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {copied ? <CheckCircle2 size={14} color="#10b981" /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy ID"}
          </button>
        </div>

        {/* UTR Input Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", fontWeight: 600, color: "#fff" }}>
              Enter 12-Digit Transaction / UTR ID <span style={{ color: "#ec4899" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 421098765432 or Ref No."
              value={utrId}
              onChange={(e) => setUtrId(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "16px",
                minHeight: "48px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(99, 102, 241, 0.4)",
                color: "#fff",
                outline: "none",
                fontFamily: "var(--font-mono)",
                fontSize: "0.95rem",
                boxSizing: "border-box",
              }}
            />
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "6px" }}>
              After completing the UPI payment, copy the 12-digit UTR/Ref ID from your payment app.
            </div>
          </div>

          {errorMsg && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#fca5a5",
                fontSize: "0.82rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <AlertCircle size={16} /> {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary touch-target"
            style={{
              width: "100%",
              padding: "16px",
              minHeight: "48px",
              background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
              fontSize: "0.98rem",
              fontWeight: 700,
            }}
          >
            {submitting ? "Submitting for Verification..." : "Submit Transaction ID for Admin Verification 🚀"}
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "var(--text-dim)", justifyContent: "center", marginTop: "16px" }}>
          <ShieldCheck size={14} color="#10b981" /> Status will update to Verified as soon as Admin reviews your UTR ID.
        </div>
      </SpotlightCard>
    </div>
  );
}

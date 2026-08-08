"use client";

import React from "react";
import { useCurrency } from "@/context/CurrencyContext";

interface CurrencyToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export const CurrencyToggle: React.FC<CurrencyToggleProps> = ({ size = "md", className = "" }) => {
  const { currency, setCurrency } = useCurrency();

  const isSm = size === "sm";

  return (
    <div
      className={`currency-toggle ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: isSm ? "2px" : "3px",
        borderRadius: "9999px",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        fontFamily: "var(--font-mono)",
        fontSize: isSm ? "0.72rem" : "0.8rem",
        userSelect: "none",
      }}
    >
      <button
        type="button"
        onClick={() => setCurrency("USD")}
        aria-label="Switch currency to USD ($)"
        style={{
          padding: isSm ? "3px 8px" : "4px 12px",
          borderRadius: "9999px",
          border: "none",
          background: currency === "USD" ? "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)" : "transparent",
          color: currency === "USD" ? "#ffffff" : "var(--text-muted)",
          fontWeight: currency === "USD" ? 700 : 500,
          cursor: "pointer",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: currency === "USD" ? "0 2px 8px rgba(99, 102, 241, 0.4)" : "none",
        }}
      >
        $ USD
      </button>
      <button
        type="button"
        onClick={() => setCurrency("INR")}
        aria-label="Switch currency to INR (₹)"
        style={{
          padding: isSm ? "3px 8px" : "4px 12px",
          borderRadius: "9999px",
          border: "none",
          background: currency === "INR" ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "transparent",
          color: currency === "INR" ? "#ffffff" : "var(--text-muted)",
          fontWeight: currency === "INR" ? 700 : 500,
          cursor: "pointer",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: currency === "INR" ? "0 2px 8px rgba(16, 185, 129, 0.4)" : "none",
        }}
      >
        ₹ INR
      </button>
    </div>
  );
};

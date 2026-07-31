"use client";

import React from "react";
import { motion } from "framer-motion";

interface InfiniteMarqueeProps {
  items: Array<{
    quote: string;
    author: string;
    role: string;
    company: string;
  }>;
  speed?: number;
}

export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  items,
  speed = 35,
}) => {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        padding: "20px 0",
      }}
    >
      <motion.div
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
        style={{
          display: "flex",
          gap: "24px",
          width: "max-content",
        }}
      >
        {items.concat(items).map((item, idx) => (
          <div
            key={idx}
            style={{
              width: "360px",
              padding: "24px",
              borderRadius: "var(--r-md)",
              background: "rgba(15, 23, 42, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "16px",
              flexShrink: 0,
            }}
          >
            <p style={{ color: "var(--text-main)", fontSize: "0.92rem", lineHeight: 1.6, fontStyle: "italic" }}>
              &ldquo;{item.quote}&rdquo;
            </p>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#f1f5f9" }}>{item.author}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {item.role} · <span style={{ color: "var(--primary-light)" }}>{item.company}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

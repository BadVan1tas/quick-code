"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* ─── Top Neon Progress Glow Bar ─── */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key={`bar-${pathname}`}
            initial={{ scaleX: 0, opacity: 0.9 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              transformOrigin: "0%",
              zIndex: 99999,
              background: "linear-gradient(90deg, #6366f1 0%, #ec4899 50%, #06b6d4 100%)",
              boxShadow: "0 0 16px rgba(99, 102, 241, 0.8), 0 0 32px rgba(236, 72, 153, 0.6)",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      {/* ─── Page Fade & Slide Transition Wrapper ─── */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
        transition={{
          duration: 0.42,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ width: "100%", position: "relative" }}
      >
        {children}
      </motion.div>
    </>
  );
}

"use client";

import React from "react";
import confetti from "canvas-confetti";

interface ConfettiButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const ConfettiButton: React.FC<ConfettiButtonProps> = ({
  children,
  onClick,
  className = "",
  style,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x, y },
      colors: ["#6366f1", "#ec4899", "#06b6d4", "#10b981", "#ffffff"],
    });

    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      style={style}
      className={`btn-primary ${className}`}
    >
      {children}
    </button>
  );
};

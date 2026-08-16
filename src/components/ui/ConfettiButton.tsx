"use client";

import React from "react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

interface ConfettiButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ConfettiButton: React.FC<ConfettiButtonProps> = ({
  children,
  onClick,
  href,
  className = "",
  style,
}) => {
  const router = useRouter();

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
    if (href) router.push(href);
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

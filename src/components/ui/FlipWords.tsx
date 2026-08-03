"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export const FlipWords: React.FC<FlipWordsProps> = ({
  words,
  duration = 3000,
  className = "",
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = words.indexOf(currentWord);
      const nextWord = words[(currentIndex + 1) % words.length];
      setCurrentWord(nextWord);
    }, duration);

    return () => clearInterval(interval);
  }, [currentWord, words, duration]);

  return (
    <AnimatePresence>
      <motion.span
        key={currentWord}
        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(6px)", position: "absolute" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={className}
        style={{
          display: "inline",
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      >
        {currentWord.split(" ").map((word, wordIdx) => (
          <span key={wordIdx} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((letter, letterIdx) => (
              <motion.span
                key={letterIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (wordIdx * 4 + letterIdx) * 0.04, duration: 0.3 }}
                style={{ display: "inline-block" }}
              >
                {letter}
              </motion.span>
            ))}
            {wordIdx < currentWord.split(" ").length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
};

"use client";

import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

interface ScrambleTextProps {
  text: string;
  duration?: number;
  className?: string;
  delay?: number;
}

export function ScrambleText({
  text,
  duration = 1500,
  className,
  delay = 0,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const currentTextRef = { value: displayText };

    const startAnimation = () => {
      startTimeRef.current = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress = 1 - Math.pow(1 - progress, 3);

        const fixedCharsCount =
          progress >= 1 ? text.length : Math.floor(easedProgress * text.length);

        const shouldUpdateScramble = Math.floor(now / 40) % 2 === 0;

        const result = text
          .split("")
          .map((char, index) => {
            if (index < fixedCharsCount) {
              return char;
            }

            if (char === " ") return " ";

            if (shouldUpdateScramble) {
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            }
            return currentTextRef.value[index] || CHARS[0];
          })
          .join("");

        currentTextRef.value = result;
        setDisplayText(result);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    };

    if (delay > 0) {
      timeoutId = setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text, duration, delay]);

  return <span className={className}>{displayText}</span>;
}

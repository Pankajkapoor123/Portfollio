import { useEffect, useState } from "react";

interface RotatingWordProps {
  words: string[];
  interval?: number;
}

/**
 * Cycles through `words` in place: the current word slides up into view while the
 * previous one slides out above. All words share one grid cell, so the width never jumps.
 */
const RotatingWord = ({ words, interval = 2400 }: RotatingWordProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  const previous = (index - 1 + words.length) % words.length;

  return (
    <span className="inline-grid overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
      {words.map((word, i) => (
        <span
          key={word}
          className={`text-gradient col-start-1 row-start-1 whitespace-nowrap transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            i === index
              ? "translate-y-0 opacity-100 blur-0"
              : i === previous
                ? "-translate-y-[0.55em] opacity-0 blur-[3px]"
                : "translate-y-[0.55em] opacity-0 blur-[3px]"
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

export default RotatingWord;

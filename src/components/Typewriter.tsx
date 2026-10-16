import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  className?: string;
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
}

/**
 * Types each word out, holds it, deletes it and moves to the next, with a blinking caret.
 * With reduced motion the first word is shown as plain text.
 */
const Typewriter = ({ words, className = "", typeMs = 90, deleteMs = 45, holdMs = 1800 }: TypewriterProps) => {
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const full = length === words[index].length;
    const delay = !deleting && full ? holdMs : deleting && length === 0 ? 350 : deleting ? deleteMs : typeMs;
    const timer = setTimeout(() => {
      if (!deleting && full) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else setLength((l) => l + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [reduced, words, index, length, deleting, typeMs, deleteMs, holdMs]);

  return (
    <span className={className}>
      {reduced ? words[0] : words[index].slice(0, length)}
      <span className="caret" aria-hidden />
    </span>
  );
};

export default Typewriter;

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Numeric value, optionally with a suffix, e.g. "2.5+" or "26". */
  value: string;
  duration?: number;
}

/** Counts from zero to `value` the first time it scrolls into view. */
const CountUp = ({ value, duration = 1400 }: CountUpProps) => {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const decimals = match?.[1].split(".")[1]?.length ?? 0;

  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!el || !match || reduced || typeof IntersectionObserver === "undefined") {
      setCurrent(target);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setCurrent(target * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <span>{value}</span>;

  return (
    <span ref={ref} aria-label={value}>
      {current.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default CountUp;

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { onScrollFrame } from "@/lib/scrollFx";

const R = 20;
const CIRCUMFERENCE = 2 * Math.PI * R;

/**
 * Desktop back-to-top button whose ring fills with page progress.
 * Phones use <MobileHireBar /> in this corner instead.
 */
const ScrollTopButton = () => {
  const ring = useRef<SVGCircleElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(
    () =>
      onScrollFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        ring.current?.style.setProperty("stroke-dashoffset", String(CIRCUMFERENCE * (1 - p)));
        setVisible(window.scrollY > 800);
      }),
    []
  );

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-6 right-6 z-40 hidden h-12 w-12 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)] backdrop-blur-lg transition-[opacity,transform,color] duration-300 hover:text-primary md:flex ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden>
        <defs>
          <linearGradient id="scroll-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--brand-cyan))" />
          </linearGradient>
        </defs>
        <circle
          ref={ring}
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="url(#scroll-ring)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
      </svg>
      <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
};

export default ScrollTopButton;

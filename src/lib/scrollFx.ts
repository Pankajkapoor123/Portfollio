import { useEffect, useRef } from "react";

/**
 * One shared, rAF-throttled scroll/resize loop for every scroll-linked effect on the page,
 * so twenty parallax layers still cost a single listener and one callback pass per frame.
 */
type Listener = () => void;

const listeners = new Set<Listener>();
let frame = 0;

const run = () => {
  frame = 0;
  listeners.forEach((fn) => fn());
};

const schedule = () => {
  if (!frame) frame = requestAnimationFrame(run);
};

export const onScrollFrame = (fn: Listener) => {
  if (listeners.size === 0) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  listeners.add(fn);
  schedule();
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    }
  };
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

interface ParallaxOptions {
  /** Pixels moved per pixel of distance from the viewport centre. Negative moves against the scroll. */
  speed?: number;
  axis?: "x" | "y";
  /** Cap the offset at this fraction of the parent's height (e.g. image overscan). */
  limit?: number;
}

/**
 * Shifts an element with the CSS `translate` property as its parent crosses the viewport.
 * `translate` composes with `transform`, so hover scales and reveal animations keep working.
 * The parent is measured, not the element, so the offset never feeds back into itself.
 */
export function useParallax<T extends HTMLElement>({ speed = 0.1, axis = "y", limit }: ParallaxOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const anchor = el.parentElement ?? el;

    const stop = onScrollFrame(() => {
      const r = anchor.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -200 || r.top > vh + 200) return;
      let offset = (r.top + r.height / 2 - vh / 2) * speed;
      if (limit) offset = clamp(offset, -r.height * limit, r.height * limit);
      el.style.translate = axis === "y" ? `0 ${offset.toFixed(1)}px` : `${offset.toFixed(1)}px 0`;
    });
    return () => {
      stop();
      el.style.translate = "";
    };
  }, [speed, axis, limit]);

  return ref;
}

/**
 * 0 → 1 as the page scrolls through the first `distance` viewport heights; written to the
 * element as `--out` so CSS can lift and fade content as it leaves (used by the hero).
 */
export function useScrollOut<T extends HTMLElement>(distance = 0.9) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const stop = onScrollFrame(() => {
      const p = clamp(window.scrollY / (window.innerHeight * distance), 0, 1);
      el.style.setProperty("--out", p.toFixed(3));
    });
    return () => {
      stop();
      el.style.removeProperty("--out");
    };
  }, [distance]);

  return ref;
}

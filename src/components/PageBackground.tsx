import { useEffect } from "react";

/**
 * Plain page background. Also feeds the cursor position to whichever
 * interactive card is under the pointer, for its hover highlight.
 */
const PageBackground = () => {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".card-interactive");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - r.left}px`);
        card.style.setProperty("--y", `${e.clientY - r.top}px`);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div className="pointer-events-none fixed inset-0 -z-10 bg-background" aria-hidden />;
};

export default PageBackground;

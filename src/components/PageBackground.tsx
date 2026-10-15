import { useEffect, useRef } from "react";

/**
 * Fixed, page-wide background: gradient mesh, a rotating aurora, drifting colour
 * blobs, a dot grid and a soft spotlight that follows the cursor.
 */
const PageBackground = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onMove = (e: PointerEvent) => {
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);

      // Feed the spotlight on whichever interactive card is under the cursor
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

  return (
    <div ref={rootRef} className="page-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="aurora" />
      <div className="blob left-[-10rem] top-[10%] h-[36rem] w-[36rem] bg-primary/25 dark:bg-primary/20" />
      <div className="blob right-[-12rem] top-[35%] h-[34rem] w-[34rem] bg-brand-violet/25 [animation-delay:-7s] [animation-duration:24s] dark:bg-brand-violet/20" />
      <div className="blob bottom-[-10rem] left-[25%] h-[30rem] w-[30rem] bg-brand-cyan/20 [animation-delay:-14s] [animation-duration:28s] dark:bg-brand-cyan/15" />
      <div className="bg-dots absolute inset-0" />
      <div className="spotlight absolute inset-0" />
      <div className="noise absolute inset-0" />
    </div>
  );
};

export default PageBackground;

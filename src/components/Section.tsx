import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

interface SectionProps {
  id: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Shared section frame: label pill, title with accent bar and optional right-hand aside. */
const Section = ({ id, label, title, description, aside, children, className = "" }: SectionProps) => (
  <section id={id} aria-labelledby={`${id}-title`} className={`relative overflow-x-clip border-t border-border py-20 md:py-28 ${className}`}>
    <div className="shell">
      <Reveal>
        <header className="relative isolate mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          {/* Oversized outline word behind the heading */}
          <span className="watermark" aria-hidden>
            {label}
          </span>
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              {label}
            </p>
            <h2 id={`${id}-title`} className="text-3xl font-semibold leading-[1.15] md:text-4xl">
              {title}
            </h2>
            <span className="grow-bar mt-5 block h-1 rounded-full bg-brand-gradient" aria-hidden />
            {description && <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>}
          </div>
          {aside}
        </header>
      </Reveal>
      {children}
    </div>
  </section>
);

export default Section;

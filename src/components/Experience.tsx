import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Briefcase, Gauge, GraduationCap, MonitorSmartphone, Sparkles, type LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { TechChip } from "@/components/Projects";
import { experience, type Experience as Job } from "@/data/profile";
import { projects } from "@/data/projects";
import { clamp, onScrollFrame, prefersReducedMotion } from "@/lib/scrollFx";
import { scrollToSection } from "@/lib/scroll";
import { toneFor } from "@/lib/tones";

/** Highlights that aren't a case study still get an icon and colour of their own. */
const extras: Record<string, { icon: LucideIcon; tile: string; tag: string }> = {
  "Responsive Angular frontends": {
    icon: MonitorSmartphone,
    tile: "bg-fuchsia-500/10 text-fuchsia-600 ring-fuchsia-500/20 dark:text-fuchsia-400",
    tag: "Frontend · Angular",
  },
  "Query optimisation": {
    icon: Gauge,
    tile: "bg-amber-500/10 text-amber-600 ring-amber-500/20 dark:text-amber-400",
    tag: "Performance · SQL",
  },
};

/** Where the fill line is measured against: a little below the middle of the screen. */
const READ_LINE = 0.58;

/** Big node + card that opens each role on the timeline. */
const Chapter = ({ job }: { job: Job }) => {
  const Icon = job.current ? Briefcase : GraduationCap;
  return (
    <div data-node className="relative pb-10 pl-14 md:pb-14 md:pl-0">
      <span className="tl-dot tl-anchor absolute left-5 top-0 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full md:left-1/2">
        <Icon className="tl-icon h-5 w-5 text-muted-foreground transition-colors duration-500" strokeWidth={1.9} />
      </span>

      <Reveal variant="scale" className="md:mx-auto md:max-w-2xl md:pt-16">
        <article className="tl-card card relative overflow-hidden p-6 md:p-8 md:text-center">
          <span className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" aria-hidden />
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 md:justify-center">
            <span className="font-mono text-sm font-medium text-primary">{job.period}</span>
            <span className="text-sm text-muted-foreground">{job.location}</span>
            {job.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                Current
              </span>
            )}
          </p>
          <h3 className="mt-3 text-2xl font-semibold md:text-[1.7rem]">{job.role}</h3>
          <p className="mt-1 font-medium text-foreground/70">{job.company}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{job.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-1.5 md:justify-center" aria-label="Stack">
            {job.stack.map((t) => (
              <li key={t}>
                <TechChip>{t}</TechChip>
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </div>
  );
};

/** One milestone; alternates sides of the centre line on desktop. */
const Milestone = ({ item, index }: { item: Job["highlights"][number]; index: number }) => {
  const left = index % 2 === 0;
  const project = item.project ? projects.find((p) => p.slug === item.project) : undefined;
  const extra = extras[item.title];
  const Icon = project?.icon ?? extra?.icon ?? Sparkles;
  const tile = project ? toneFor(project.slug).tile : extra?.tile ?? toneFor("hims").tile;
  const tag = project?.category ?? extra?.tag;

  return (
    <li
      data-node
      className={`relative pb-8 pl-14 md:w-1/2 md:pb-10 ${index > 0 ? "md:-mt-20" : ""} ${
        left ? "md:pl-0 md:pr-14" : "md:ml-auto md:pl-14"
      }`}
    >
      <span
        className={`tl-dot tl-anchor absolute left-5 top-7 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full ${
          left ? "md:left-full" : "md:left-0"
        }`}
        aria-hidden
      />
      <span
        className={`tl-link absolute left-5 top-[34px] h-px w-9 md:w-14 ${left ? "md:left-auto md:right-0" : "md:left-0"}`}
        aria-hidden
      />

      <Reveal variant={left ? "left" : "right"}>
        <article className="tl-card card card-interactive group p-5 md:p-6">
          <div className="flex items-start gap-3">
            <span className={`icon-tile h-10 w-10 shrink-0 ${tile} group-hover:-rotate-6 group-hover:scale-110`}>
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 pt-0.5">
              <h4 className="font-semibold leading-snug">{item.title}</h4>
              {tag && <p className="label mt-1 text-[10px]">{tag}</p>}
            </div>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{item.text}</p>
          {item.project && (
            <Link
              to={`/projects/${item.project}`}
              className="group/link mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline hover:underline-offset-4"
            >
              Read case study
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </Link>
          )}
        </article>
      </Reveal>
    </li>
  );
};

const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Fill the centre line as the timeline scrolls past the read line and light up each node it reaches
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const anchors = Array.from(root.querySelectorAll<HTMLElement>("[data-node]")).map((node) => ({
      node,
      dot: node.querySelector<HTMLElement>(".tl-anchor") ?? node,
    }));

    if (prefersReducedMotion()) {
      root.style.setProperty("--progress", "1");
      anchors.forEach(({ node }) => (node.dataset.active = "true"));
      return;
    }

    return onScrollFrame(() => {
      const r = root.getBoundingClientRect();
      const line = window.innerHeight * READ_LINE;
      const progress = clamp((line - r.top) / r.height, 0, 1);
      root.style.setProperty("--progress", progress.toFixed(4));
      const fillY = r.top + progress * r.height;
      anchors.forEach(({ node, dot }) => {
        const d = dot.getBoundingClientRect();
        node.dataset.active = String(d.top + d.height / 2 <= fillY + 1);
      });
    });
  }, []);

  return (
    <Section
      id="experience"
      label="Experience"
      title="Where I've worked."
      description="Shipping production systems since 2024, after full-stack training in 2023. Scroll to follow the timeline."
    >
      <div ref={ref} className="relative">
        {/* Centre line, its scroll-driven fill and the glowing head that leads it */}
        <div className="absolute bottom-0 left-5 top-0 w-0.5 -translate-x-1/2 rounded-full bg-border md:left-1/2" aria-hidden>
          <div className="tl-fill absolute inset-0 rounded-full bg-gradient-to-b from-primary via-brand-violet to-brand-cyan" />
          <div className="tl-head absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_4px_hsl(var(--primary)/0.35),0_0_24px_6px_hsl(var(--primary)/0.7)]" />
        </div>

        {experience.map((job) => (
          <div key={job.role + job.company}>
            <Chapter job={job} />
            <ol className="pb-6 md:pb-10">
              {job.highlights.map((item, j) => (
                <Milestone key={item.title} item={item} index={j} />
              ))}
            </ol>
          </div>
        ))}

        {/* The open end of the line: the next chapter */}
        <div data-node className="relative pl-14 md:pl-0">
          <span className="tl-dot tl-anchor absolute left-5 top-0 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full md:left-1/2">
            <Sparkles className="tl-icon h-5 w-5 text-muted-foreground transition-colors duration-500" strokeWidth={1.9} />
          </span>
          <Reveal variant="scale" className="md:mx-auto md:max-w-xl md:pt-16">
            <div className="tl-card card relative overflow-hidden p-6 md:p-8 md:text-center">
              <div className="blob -right-16 -top-16 h-40 w-40 bg-primary/20" aria-hidden />
              <p className="label text-[11px]">Next chapter</p>
              <p className="mt-2 text-xl font-semibold">Could be your team.</p>
              <p className="mt-2 text-muted-foreground">
                Looking for a full-stack .NET and Angular developer who owns features end to end? Let's talk.
              </p>
              <Link
                to="/#contact"
                onClick={(e) => scrollToSection("contact") && e.preventDefault()}
                className="btn btn-primary group mt-6 h-11 px-5"
              >
                Hire me
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

export default Experience;

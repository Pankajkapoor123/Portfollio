import { Link } from "react-router-dom";
import { ArrowUpRight, Briefcase, GraduationCap } from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { TechChip } from "@/components/Projects";
import { experience } from "@/data/profile";

const Experience = () => (
  <Section
    id="experience"
    label="Experience"
    title="Where I've worked."
    description="Shipping production systems since 2024, after full-stack training in 2023."
  >
    <ol className="space-y-6">
      {experience.map((job, i) => {
        const Icon = job.current ? Briefcase : GraduationCap;
        return (
          <li key={job.role + job.company}>
            <Reveal delay={i * 80}>
              <article className="card card-interactive group relative grid gap-6 overflow-hidden p-6 md:grid-cols-[220px_1fr] md:gap-12 md:p-8">
                {/* Timeline rail */}
                <span
                  className="draw-line absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-primary via-brand-violet to-brand-cyan"
                  aria-hidden
                />

                <div className="space-y-2 md:sticky md:top-24 md:self-start">
                  <span
                    className={`icon-tile h-10 w-10 group-hover:scale-110 ${
                      job.current
                        ? "bg-primary/10 text-primary ring-primary/20"
                        : "bg-brand-violet/10 text-brand-violet ring-brand-violet/20"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="pt-2 font-mono text-sm font-medium text-foreground">{job.period}</p>
                  <p className="text-sm text-muted-foreground">{job.location}</p>
                  {job.current && (
                    <p className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                      </span>
                      Current
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold">
                    {job.role} <span className="font-normal text-muted-foreground">· {job.company}</span>
                  </h3>
                  <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{job.summary}</p>

                  <ul className="mt-6 max-w-3xl space-y-3">
                    {job.highlights.map((h, j) => (
                      <li
                        key={h.text}
                        className="stagger-item flex gap-3 text-[15px] leading-relaxed text-foreground/85"
                        style={{ ["--i" as string]: j }}
                      >
                        <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                        <span>
                          {h.text}
                          {h.project && (
                            <Link
                              to={`/projects/${h.project}`}
                              className="group/link ml-1.5 inline-flex items-center gap-0.5 whitespace-nowrap text-sm font-medium text-primary hover:underline hover:underline-offset-4"
                            >
                              Case study{" "}
                              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                            </Link>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
                    {job.stack.map((t) => (
                      <li key={t}>
                        <TechChip>{t}</TechChip>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ol>
  </Section>
);

export default Experience;

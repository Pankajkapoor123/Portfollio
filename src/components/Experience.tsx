import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { TechChip } from "@/components/Projects";
import { experience } from "@/data/profile";

/** One card per role on a simple vertical line; highlights are a compact list, not cards of their own. */
const Experience = () => (
  <Section
    id="experience"
    label="Experience"
    title="Where I've worked."
    description="Shipping production systems since 2024, after full-stack training in 2023."
  >
    <ol className="relative space-y-6 border-l border-border pl-6 md:pl-8">
      {experience.map((job, i) => (
        <li key={job.role + job.company} className="relative">
          <span
            className={`absolute -left-[31px] top-7 h-3 w-3 rounded-full border-2 border-background md:-left-[39px] ${
              job.current ? "bg-foreground" : "bg-muted-foreground/50"
            }`}
            aria-hidden
          />
          <Reveal delay={i * 80}>
            <article className="card p-6 md:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-xl font-semibold">{job.role}</h3>
                <span className="font-mono text-sm text-muted-foreground">{job.period}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                <span className="font-medium text-foreground/80">{job.company}</span> · {job.location}
                {job.current && (
                  <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 align-middle text-xs font-medium text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    Current
                  </span>
                )}
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{job.summary}</p>

              <ul className="mt-4 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
                {job.highlights.map((h) => (
                  <li key={h.title} className="flex items-center gap-2">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
                    {h.project ? (
                      <Link
                        to={`/projects/${h.project}`}
                        className="group inline-flex items-center gap-1 font-medium hover:underline hover:underline-offset-4"
                      >
                        {h.title}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    ) : (
                      <span className="text-foreground/80">{h.title}</span>
                    )}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
                {job.stack.map((t) => (
                  <li key={t}>
                    <TechChip>{t}</TechChip>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  </Section>
);

export default Experience;

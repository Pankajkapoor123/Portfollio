import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import TiltCard from "@/components/TiltCard";
import { projects, type Project } from "@/data/projects";
import { toneFor } from "@/lib/tones";
import { useParallax } from "@/lib/scrollFx";

export const TechChip = ({ children }: { children: string }) => <span className="chip">{children}</span>;

const TechList = ({ tech, max = tech.length }: { tech: string[]; max?: number }) => (
  <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
    {tech.slice(0, max).map((t) => (
      <li key={t}>
        <TechChip>{t}</TechChip>
      </li>
    ))}
    {tech.length > max && <li className="px-1 py-0.5 font-mono text-[12px] text-muted-foreground">+{tech.length - max}</li>}
  </ul>
);

/** Large cover that tilts towards the mouse; featured projects get a rotating light frame. */
const Showcase = ({ project }: { project: Project }) => {
  const tone = toneFor(project.slug);
  // The photo drifts inside its frame, giving the cover some depth while scrolling
  const photo = useParallax<HTMLImageElement>({ speed: -0.09, limit: 0.09 });
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block rounded-2xl focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`${project.title} case study`}
    >
      <TiltCard max={6}>
        <div className={project.featured ? "glow-frame rounded-2xl" : "rounded-2xl"}>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-muted shadow-[0_30px_60px_-30px_hsl(var(--primary)/0.45)]">
            <div className="relative aspect-video overflow-hidden">
              {project.image && (
                <img
                  ref={photo}
                  src={project.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              )}
            </div>
            {/* Tone wash that fades in on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-tr ${tone.bar} opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-40`}
              aria-hidden
            />
            <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone.bar}`} aria-hidden />
          </div>
        </div>
      </TiltCard>
    </Link>
  );
};

const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
  const tone = toneFor(project.slug);
  const flip = index % 2 === 1;

  return (
    <article
      className={`grid items-center gap-8 lg:gap-14 ${flip ? "lg:grid-cols-[1fr_1.1fr]" : "lg:grid-cols-[1.1fr_1fr]"}`}
    >
      <Reveal variant={flip ? "right" : "left"} className={flip ? "lg:order-2" : ""}>
        <Showcase project={project} />
      </Reveal>

      <Reveal variant="blur" delay={120}>
        <div>
          <p className="flex items-center gap-2.5">
            <span className={`icon-tile h-9 w-9 ${tone.tile}`}>
              <project.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </span>
            <span className="label text-[11px]">{project.category}</span>
            {project.featured && (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary ring-1 ring-inset ring-primary/20">
                Featured
              </span>
            )}
          </p>

          <h3 className="mt-5 text-2xl font-semibold leading-tight md:text-3xl">
            <Link to={`/projects/${project.slug}`} className="transition-colors hover:text-primary">
              {project.title}
            </Link>
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{project.summary}</p>

          <ul className="mt-6 space-y-2.5">
            {project.highlights.map((h, i) => (
              <li
                key={h}
                className="stagger-item flex gap-3 text-[15px] leading-relaxed text-foreground/85"
                style={{ ["--i" as string]: i }}
              >
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tone.tile} ring-1`}>
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <TechList tech={project.tech} max={7} />
          </div>

          <Link to={`/projects/${project.slug}`} className="btn btn-outline group mt-8 h-11 px-5">
            Read case study
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </article>
  );
};

const Projects = () => (
  <Section
    id="projects"
    label="Key Projects"
    className="section-tint"
    title="Systems I've designed and built."
    description="Healthcare, AI, logistics and enterprise platforms. Each case study covers the problem, the modules and exactly what I owned."
  >
    <div className="space-y-20 md:space-y-28">
      {projects.map((project, index) => (
        <ProjectRow key={project.slug} project={project} index={index} />
      ))}
    </div>
  </Section>
);

export default Projects;

import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { TechChip } from "@/components/Projects";
import { projects, type Project } from "@/data/projects";
import { toneFor } from "@/lib/tones";
import NotFound from "@/pages/NotFound";

const DEFAULT_TITLE = "Pankaj Kumar — .NET Full Stack Developer";

// Old links keep working after a project was renamed
const aliases: Record<string, string> = { navita: "navitra" };

const tocFor = (p: Project) =>
  [
    { id: "overview", label: "Overview" },
    p.workflow && { id: "how-it-works", label: p.workflowTitle ?? "How it works" },
    { id: "modules", label: "Modules" },
    { id: "contribution", label: "My contribution" },
  ].filter(Boolean) as { id: string; label: string }[];

/** Highlights the table-of-contents entry for the section in view. */
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
};

const SectionTitle = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="mb-6 flex scroll-mt-24 items-center gap-3 text-2xl font-semibold">
    <span className="h-6 w-1 rounded-full bg-gradient-to-b from-primary to-brand-violet" aria-hidden />
    {children}
  </h2>
);

const ProjectDetail = () => {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const toc = project ? tocFor(project) : [];
  const active = useActiveSection(toc.map((t) => t.id));

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (project) document.title = `${project.title} — Pankaj Kumar`;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [project]);

  if (!project && slug && aliases[slug]) return <Navigate to={`/projects/${aliases[slug]}`} replace />;
  if (!project) return <NotFound />;

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const tone = toneFor(project.slug);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <header className="relative overflow-hidden border-b border-border pb-14 pt-28 md:pt-36">
          {project.image && (
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <img src={project.image} alt="" className="h-full w-full animate-fade-in object-cover opacity-60 [mask-image:linear-gradient(to_right,transparent_40%,black_85%)]" />
              <div className="absolute inset-0 bg-gradient-to-r from-background from-30% via-background/95 to-background/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden />
          <div aria-hidden>
            <div className="blob -left-24 -top-24 h-80 w-80 bg-primary/20 dark:bg-primary/15" />
            <div className="blob right-[-5rem] top-16 h-72 w-72 bg-brand-violet/20 [animation-delay:-8s] dark:bg-brand-violet/15" />
          </div>
          <div className="shell relative">
            <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/" className="transition-colors hover:text-primary">
                    home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link to="/#projects" className="transition-colors hover:text-primary">
                    projects
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-primary" aria-current="page">
                  {project.slug}
                </li>
              </ol>
            </nav>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-16">
              <div className="animate-fade-up">
                <p className="label flex items-center gap-2.5 text-[11px]">
                  <span className={`icon-tile h-9 w-9 ${tone.tile}`}>
                    <project.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  {project.category}
                </p>
                <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] md:text-5xl">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{project.overview}</p>
                <ul className="mt-7 flex flex-wrap gap-1.5" aria-label="Tech stack">
                  {project.tech.map((t) => (
                    <li key={t}>
                      <TechChip>{t}</TechChip>
                    </li>
                  ))}
                </ul>
              </div>

              {project.facts && (
                <div className="card relative h-fit animate-fade-up overflow-hidden [animation-delay:120ms]">
                  <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone.bar}`} aria-hidden />
                  <dl className="divide-y divide-border text-sm">
                    {project.facts.map((f) => (
                      <div key={f.label} className="flex items-baseline justify-between gap-4 px-5 py-3">
                        <dt className="label text-[11px]">{f.label}</dt>
                        <dd className="text-right font-medium">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="shell grid gap-12 py-16 md:py-20 lg:grid-cols-[200px_1fr] lg:gap-16">
          {/* Table of contents */}
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-28">
              <p className="label text-[11px]">On this page</p>
              <ul className="mt-4 space-y-1 border-l border-border text-sm">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className={`-ml-px block border-l py-1.5 pl-4 transition-colors ${
                        active === t.id
                          ? "border-primary font-medium text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0 space-y-20">
            <Reveal>
              <section aria-labelledby="overview">
                <SectionTitle id="overview">
                  Overview
                </SectionTitle>
                <p className="max-w-3xl text-lg leading-relaxed text-foreground/85">{project.summary}</p>
                <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3 bg-card p-5 text-sm leading-relaxed transition-colors hover:bg-accent/60">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {project.workflow && (
              <Reveal>
                <section aria-labelledby="how-it-works">
                  <SectionTitle id="how-it-works">
                    {project.workflowTitle ?? "How it works"}
                  </SectionTitle>
                  <ol className="relative grid gap-0 sm:grid-cols-2 xl:grid-cols-3">
                    {project.workflow.map((step, i) => (
                      <li
                        key={step.title}
                        className="stagger-item relative border-l-2 border-primary/20 pb-8 pl-6 sm:pr-6"
                        style={{ ["--i" as string]: i }}
                      >
                        <span className="absolute -left-[7px] top-1 flex h-3 w-3" aria-hidden>
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40 [animation-duration:2.4s]" />
                          <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-background bg-gradient-to-br from-primary to-brand-violet" />
                        </span>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>
            )}

            <section aria-labelledby="modules">
              <Reveal>
                <SectionTitle id="modules">
                  Modules &amp; functionality
                </SectionTitle>
              </Reveal>
              <div className="grid gap-4 md:grid-cols-2">
                {project.modules.map((m, i) => (
                  <Reveal key={m.title} delay={(i % 2) * 60}>
                    <article className="card card-interactive group h-full p-6">
                      <h3 className="flex items-center gap-3 font-semibold">
                        <span className={`h-2 w-2 shrink-0 rounded-full ${tone.dot} transition-transform group-hover:scale-150`} aria-hidden />
                        {m.title}
                      </h3>
                      <ul className="mt-4 space-y-2">
                        {m.points.map((pt) => (
                          <li key={pt} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                            <span className="mt-[0.65em] h-px w-2.5 shrink-0 bg-primary/50" aria-hidden />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                ))}
              </div>
            </section>

            <Reveal>
              <section aria-labelledby="contribution">
                <SectionTitle id="contribution">
                  My contribution
                </SectionTitle>
                <div className="card relative overflow-hidden border-l-4 border-l-primary bg-gradient-to-br from-card via-card to-accent/60 p-6 md:p-8">
                  <p className="max-w-3xl text-lg leading-relaxed text-foreground/85">{project.role}</p>
                  {project.roleDetails && (
                    <ul className="mt-6 grid max-w-4xl gap-x-8 gap-y-3 md:grid-cols-2">
                      {project.roleDetails.map((d, i) => (
                        <li
                          key={d}
                          className="stagger-item flex gap-3 text-[15px] leading-relaxed text-foreground/85"
                          style={{ ["--i" as string]: i }}
                        >
                          <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                  {project.note && (
                    <p className="mt-6 flex max-w-3xl gap-2.5 border-t border-border pt-5 text-sm text-muted-foreground">
                      <Info className="mt-0.5 h-4 w-4 shrink-0" /> {project.note}
                    </p>
                  )}
                </div>
              </section>
            </Reveal>

            <nav aria-label="More projects" className="grid gap-4 border-t border-border pt-10 sm:grid-cols-2">
              <Link to={`/projects/${prev.slug}`} className="card card-interactive group p-5">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" /> Previous
                </span>
                <span className="mt-1.5 block font-semibold transition-colors group-hover:text-primary">{prev.title}</span>
              </Link>
              <Link to={`/projects/${next.slug}`} className="card card-interactive group p-5 text-right">
                <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                  Next <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="mt-1.5 block font-semibold transition-colors group-hover:text-primary">{next.title}</span>
              </Link>
            </nav>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;

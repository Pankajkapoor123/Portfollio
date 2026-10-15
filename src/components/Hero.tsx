import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Building2, Cpu, Download, Layers, Rocket, type LucideIcon } from "lucide-react";
import CountUp from "@/components/CountUp";
import RotatingWord from "@/components/RotatingWord";
import TiltCard from "@/components/TiltCard";
import TechMarquee from "@/components/TechMarquee";
import { coreTech, profile, socials, yearsOfExperience } from "@/data/profile";
import { projects } from "@/data/projects";
import { scrollToSection } from "@/lib/scroll";
import { useParallax, useScrollOut } from "@/lib/scrollFx";

const facts = [
  { label: "Role", value: profile.role },
  { label: "Focus", value: "APIs · Data · Integrations" },
  { label: "Location", value: "Zirakpur, IN · IST" },
];

const domains = ["healthcare.", "hospitals.", "AI health.", "logistics.", "enterprise."];

/** Splits a phrase into words that rise in one after another. */
const Words = ({ text, start, className = "" }: { text: string; start: number; className?: string }) => (
  <>
    {text.split(" ").map((w, i) => (
      <span key={i} className={`inline-block animate-fade-up ${className}`} style={{ animationDelay: `${start + i * 70}ms` }}>
        {w}&nbsp;
      </span>
    ))}
  </>
);

const Hero = () => {
  // Background drifts slower than the page; the headline block lifts and fades as it leaves
  const blobs = useParallax<HTMLDivElement>({ speed: -0.35 });
  const intro = useScrollOut<HTMLDivElement>();

  const stats: { value: string; label: string; icon: LucideIcon; tone: string; hint?: string }[] = [
    {
      value: `${yearsOfExperience()}+`,
      label: "Years in production",
      icon: Rocket,
      tone: "bg-blue-500/10 text-blue-600 ring-blue-500/20 dark:text-blue-400",
    },
    {
      value: String(projects.length),
      label: "Systems shipped",
      icon: Layers,
      tone: "bg-violet-500/10 text-violet-600 ring-violet-500/20 dark:text-violet-400",
    },
    {
      value: String(coreTech.length),
      label: "Core technologies",
      icon: Cpu,
      tone: "bg-cyan-500/10 text-cyan-600 ring-cyan-500/20 dark:text-cyan-400",
      hint: coreTech.join(" · "),
    },
    {
      value: "4",
      label: "Industry domains",
      icon: Building2,
      tone: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400",
      hint: "Healthcare · Logistics · Finance · E-commerce",
    },
  ];

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden />
      <div ref={blobs} className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="blob -left-24 -top-24 h-[22rem] w-[22rem] bg-primary/20 dark:bg-primary/15" />
        <div className="blob right-[-6rem] top-10 h-[20rem] w-[20rem] bg-brand-violet/20 [animation-delay:-6s] dark:bg-brand-violet/15" />
        <div className="blob left-1/3 top-64 h-[16rem] w-[16rem] bg-brand-cyan/15 [animation-delay:-12s] dark:bg-brand-cyan/10" />
      </div>

      <div className="shell relative">
        <div ref={intro} className="scroll-out grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <div>
            {profile.available && (
              <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-success/30 bg-success/10 py-1 pl-2.5 pr-3 text-xs font-medium text-success">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                Open to new opportunities
              </p>
            )}

            <h1 className="mt-7 text-[2.3rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]">
              <span className="sr-only">Full-stack .NET systems for {domains.join(" ")} From API to interface.</span>
              <span aria-hidden>
                <Words text="Full-stack .NET systems" start={80} />
                <br />
                <Words text="for" start={300} />
                <span className="inline-block animate-fade-up" style={{ animationDelay: "430ms" }}>
                  <RotatingWord words={domains} />
                </span>
                <br />
                <Words text="From API to interface." start={520} className="text-muted-foreground" />
              </span>
            </h1>

            <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-muted-foreground [animation-delay:160ms]">
              I'm {profile.name}, a {profile.role}. I design APIs, data
              models and integrations with <span className="font-medium text-primary">ASP.NET Core</span>,{" "}
              <span className="font-medium text-primary">Angular</span> and{" "}
              <span className="font-medium text-primary">PostgreSQL</span> — from hospital information systems to
              AI-assisted medical report analysis.
            </p>

            <div className="mt-9 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:240ms]">
              <Link
                to="/#projects"
                onClick={(e) => scrollToSection("projects") && e.preventDefault()}
                className="btn btn-primary group h-11 px-5"
              >
                View projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/#contact"
                onClick={(e) => scrollToSection("contact") && e.preventDefault()}
                className="btn btn-outline h-11 px-5"
              >
                Get in touch
              </Link>
              <a href={profile.resume} download className="btn btn-ghost group h-11 px-4">
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Download CV
              </a>
            </div>

            <ul className="mt-8 flex animate-fade-up flex-wrap gap-x-6 gap-y-2 text-sm [animation-delay:320ms]">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <s.icon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                    {s.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Profile card with a gradient frame */}
          <aside className="relative w-full max-w-md animate-fade-up [animation-delay:200ms] lg:max-w-none" aria-label="Profile summary">
            <TiltCard>
              <div className="group rounded-2xl bg-gradient-to-br from-primary/60 via-brand-violet/40 to-brand-cyan/60 p-px shadow-[0_30px_60px_-30px_hsl(var(--primary)/0.5)]">
                <div className="overflow-hidden rounded-[15px] bg-card">
                  <div className="relative aspect-[16/11] overflow-hidden border-b border-border bg-muted">
                    <img
                      src="/profile.jpg"
                      alt={`Portrait of ${profile.name}`}
                      width={800}
                      height={800}
                      className="h-full w-full object-cover object-[50%_22%] transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card/80 to-transparent" aria-hidden />
                  </div>
                  <dl className="divide-y divide-border text-sm">
                    {facts.map((f) => (
                      <div key={f.label} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
                        <dt className="label text-[11px]">{f.label}</dt>
                        <dd className="text-right font-medium">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </TiltCard>
          </aside>
        </div>

        <dl className="mt-14 grid animate-fade-up grid-cols-2 gap-3 [animation-delay:400ms] md:mt-16 md:grid-cols-4 md:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="card card-interactive group relative overflow-hidden p-5 md:p-6"
            >
              <span className={`icon-tile absolute right-4 top-4 h-9 w-9 ${s.tone} group-hover:scale-110 group-hover:-rotate-6 md:right-5 md:top-5`}>
                <s.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
              <span className="absolute inset-x-0 top-0 h-0.5 bg-brand-gradient opacity-70" aria-hidden />
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="text-gradient block text-3xl font-semibold tracking-tight tabular-nums md:text-4xl">
                  <CountUp value={s.value} />
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{s.label}</span>
                {s.hint && <span className="mt-1.5 block font-mono text-[11px] text-muted-foreground/80">{s.hint}</span>}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 animate-fade-up [animation-delay:500ms]">
          <TechMarquee />
        </div>
      </div>
    </section>
  );
};

export default Hero;

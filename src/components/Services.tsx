import { Link } from "react-router-dom";
import {
  ArrowRight,
  Boxes,
  Cable,
  FileSearch,
  Gauge,
  Hammer,
  HeartPulse,
  LayoutDashboard,
  Lightbulb,
  PenTool,
  Rocket,
  Server,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { scrollToSection } from "@/lib/scroll";

const services = [
  {
    icon: LayoutDashboard,
    title: "Full-stack web applications",
    text: "Business apps on ASP.NET Core and Angular — dashboards, admin portals and role-based access that work on any screen.",
    tone: "bg-blue-500/10 text-blue-600 ring-blue-500/20 dark:text-blue-400",
  },
  {
    icon: Server,
    title: "REST APIs & backends",
    text: "Secure, documented APIs for web and mobile clients, with validation, JWT auth and clean data models.",
    tone: "bg-violet-500/10 text-violet-600 ring-violet-500/20 dark:text-violet-400",
  },
  {
    icon: HeartPulse,
    title: "Healthcare & enterprise systems",
    text: "Patient lifecycle, billing, inventory and multi-level approval workflows, including ABHA-related integrations.",
    tone: "bg-rose-500/10 text-rose-600 ring-rose-500/20 dark:text-rose-400",
  },
  {
    icon: FileSearch,
    title: "AI document processing",
    text: "Turn PDFs and scanned reports into structured, validated data with OCR and LLMs — checked against the source.",
    tone: "bg-fuchsia-500/10 text-fuchsia-600 ring-fuchsia-500/20 dark:text-fuchsia-400",
  },
  {
    icon: Cable,
    title: "Integrations & cloud",
    text: "AWS S3, SQS and CloudFront, SFTP bank-file workflows, payment gateways and third-party APIs.",
    tone: "bg-amber-500/10 text-amber-600 ring-amber-500/20 dark:text-amber-400",
  },
  {
    icon: Gauge,
    title: "Database design & tuning",
    text: "Relational schemas on PostgreSQL and SQL Server, and query tuning where page load times matter.",
    tone: "bg-cyan-500/10 text-cyan-600 ring-cyan-500/20 dark:text-cyan-400",
  },
];

const steps = [
  { icon: Lightbulb, title: "Understand", text: "Workflow, users, data and what success looks like." },
  { icon: PenTool, title: "Design", text: "Database schema, API contract and screens agreed up front." },
  { icon: Hammer, title: "Build", text: "Small, working increments you can review as they land." },
  { icon: Rocket, title: "Ship & support", text: "Deployment, documentation and fixes after go-live." },
];

const Services = () => (
  <Section
    id="services"
    label="Services"
    title="How I can help your team."
    description="From a single API to a complete product — here's what I build and how a project with me runs."
  >
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <Reveal key={s.title} variant="scale" delay={(i % 3) * 80}>
          <article className="card card-interactive group h-full p-6">
            <span className={`icon-tile h-11 w-11 ${s.tone} group-hover:-rotate-6 group-hover:scale-110`}>
              <s.icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </article>
        </Reveal>
      ))}
    </div>

    <Reveal variant="blur" className="mt-14">
      <div className="card relative overflow-hidden p-6 md:p-8">
        <div className="flex items-center gap-2.5">
          <Boxes className="h-4 w-4 text-primary" />
          <p className="label text-[11px]">How a project runs</p>
        </div>

        <ol className="relative mt-8 grid gap-8 md:grid-cols-4 md:gap-6">
          {/* Connecting line behind the step icons (desktop) */}
          <span
            className="absolute left-6 right-[24%] top-6 hidden h-px bg-gradient-to-r from-primary/60 via-brand-violet/60 to-brand-cyan/60 md:block"
            aria-hidden
          />
          {steps.map((step, i) => (
            <li key={step.title} className="stagger-item relative" style={{ ["--i" as string]: i }}>
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-brand-violet text-white shadow-[0_10px_24px_-10px_hsl(var(--primary)/0.8)]">
                <step.icon className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <h4 className="mt-4 font-semibold">{step.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] text-foreground/85">Have something like this in mind? Let's talk about it.</p>
          <Link
            to="/#contact"
            onClick={(e) => scrollToSection("contact") && e.preventDefault()}
            className="btn btn-primary group h-11 w-fit px-5"
          >
            Start a conversation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </Reveal>
  </Section>
);

export default Services;

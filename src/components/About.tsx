import { Braces, Database, HeartPulse, LayoutTemplate, MonitorSmartphone, ScanText } from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { education, profile } from "@/data/profile";

const focus = [
  {
    icon: Braces,
    title: "API design",
    tone: "bg-primary/10 text-primary ring-primary/25",
    text: "RESTful ASP.NET Core APIs with request validation, centralized error handling, JWT auth and role-based access.",
  },
  {
    icon: LayoutTemplate,
    title: "Angular frontends",
    tone: "bg-primary/10 text-primary ring-primary/25",
    text: "Reusable components and services, reactive forms with validation, routing with lazy loading and guards, and HTTP interceptors for JWT auth — all wired to the APIs with RxJS.",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive design",
    tone: "bg-primary/10 text-primary ring-primary/25",
    text: "Mobile-first layouts with Flexbox and CSS Grid that work on phones, tablets and desktops, with clean, accessible forms, tables and dashboards.",
  },
  {
    icon: Database,
    title: "Data modelling",
    tone: "bg-primary/10 text-primary ring-primary/25",
    text: "Relational schemas on PostgreSQL and SQL Server with EF Core, plus query tuning where load times matter.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare workflows",
    tone: "bg-primary/10 text-primary ring-primary/25",
    text: "Patient lifecycle, billing and ABHA M1–M3 integrations, where record consistency and access control are non-negotiable.",
  },
  {
    icon: ScanText,
    title: "AI-assisted pipelines",
    tone: "bg-primary/10 text-primary ring-primary/25",
    text: "OCR and LLM extraction wrapped in deterministic validation, so model output never overrides source data.",
  },
];

const About = () => (
  <Section
    id="about"
    label="About"
    title="A full-stack engineer who cares about correctness."
  >
    <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
      <Reveal variant="left">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            I'm a <span className="font-medium text-foreground">.NET Full Stack Developer</span> building web applications and
            RESTful APIs with ASP.NET Core, Angular, SQL Server and PostgreSQL. I like turning manual, paper-driven
            workflows into systems people can rely on.
          </p>
          <p>
            On the frontend I build responsive Angular applications — reusable components, reactive forms with
            validation, role-aware routing and dashboards that work just as well on a phone as on a desktop — and connect
            them cleanly to the .NET APIs behind them.
          </p>
          <p>
            Most of my work sits in domains where mistakes are expensive — hospital operations, medical reports,
            inventory approvals and bank file transfers — so I spend as much time on validation, access control and data
            integrity as on features.
          </p>
        </div>
      </Reveal>

      <Reveal variant="right" delay={100}>
        <dl className="card relative divide-y divide-border overflow-hidden text-sm before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-brand-gradient before:content-['']">
          <div className="p-5">
            <dt className="label text-[11px]">Currently</dt>
            <dd className="mt-2 font-medium text-primary">{profile.role}</dd>
            <dd className="text-muted-foreground">{profile.company} · since Apr 2024</dd>
          </div>
          <div className="p-5">
            <dt className="label text-[11px]">Education</dt>
            {education.map((e) => (
              <dd key={e.degree} className="mt-2">
                <span className="block font-medium">{e.degree}</span>
                <span className="block text-muted-foreground">
                  {e.institution} · {e.period}
                </span>
              </dd>
            ))}
          </div>
          <div className="p-5">
            <dt className="label text-[11px]">Based in</dt>
            <dd className="mt-2 font-medium">{profile.location}</dd>
            <dd className="text-muted-foreground">{profile.timezone}</dd>
          </div>
        </dl>
      </Reveal>
    </div>

    <Reveal className="mt-16">
      <p className="label mb-6">What I do</p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {focus.map((f, i) => (
          <li
            key={f.title}
            className="stagger-item card card-interactive group p-6"
            style={{ ["--i" as string]: i }}
          >
            <span className={`icon-tile h-10 w-10 ${f.tone} group-hover:scale-110 group-hover:-rotate-6`}>
              <f.icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <h3 className="mt-4 font-semibold">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  </Section>
);

export default About;

import {
  ArrowLeftRight,
  BadgeCheck,
  BookOpenCheck,
  Bot,
  Brain,
  Cloud,
  CreditCard,
  Database,
  FileText,
  FolderLock,
  Globe,
  HeartPulse,
  KeyRound,
  Layout,
  LayoutGrid,
  MessagesSquare,
  MonitorSmartphone,
  Network,
  Route,
  ScanText,
  Server,
  ShieldCheck,
  TextCursorInput,
  Waypoints,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { skillGroups } from "@/data/profile";
import angular from "@/assets/tech/angular-original.svg";
import aws from "@/assets/tech/amazonwebservices-original-wordmark.svg";
import csharp from "@/assets/tech/csharp-original.svg";
import css3 from "@/assets/tech/css3-original.svg";
import dotnet from "@/assets/tech/dotnetcore-original.svg";
import git from "@/assets/tech/git-original.svg";
import html5 from "@/assets/tech/html5-original.svg";
import postgres from "@/assets/tech/postgresql-original.svg";
import postman from "@/assets/tech/postman-original.svg";
import rxjs from "@/assets/tech/rxjs-original.svg";
import sqlserver from "@/assets/tech/microsoftsqlserver-plain.svg";
import swagger from "@/assets/tech/swagger-original.svg";
import typescript from "@/assets/tech/typescript-original.svg";

// Icon, colour and bento span per skill group, in the same order as `skillGroups`
const groupStyle = [
  { icon: Server, tone: "bg-violet-500/15 text-violet-400 ring-violet-500/30", span: "lg:col-span-2", glow: "from-violet-500/[0.07]" },
  { icon: Layout, tone: "bg-rose-500/15 text-rose-400 ring-rose-500/30", span: "lg:row-span-2", glow: "from-rose-500/[0.07]" },
  { icon: Database, tone: "bg-sky-500/15 text-sky-400 ring-sky-500/30", span: "", glow: "from-sky-500/[0.07]" },
  { icon: Cloud, tone: "bg-amber-500/15 text-amber-400 ring-amber-500/30", span: "", glow: "from-amber-500/[0.07]" },
  { icon: Brain, tone: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30", span: "lg:col-span-2", glow: "from-emerald-500/[0.07]" },
  { icon: Wrench, tone: "bg-orange-500/15 text-orange-400 ring-orange-500/30", span: "", glow: "from-orange-500/[0.07]" },
];

// Brand logo (full colour) where the skill has one, otherwise a tinted lucide icon
type SkillIcon = { logo: string } | { icon: LucideIcon; color: string };

const skillIcons: Record<string, SkillIcon> = {
  "C#": { logo: csharp },
  ".NET 8": { logo: dotnet },
  ".NET Core": { logo: dotnet },
  "ASP.NET Core Web API": { logo: dotnet },
  "ASP.NET Core MVC": { logo: dotnet },
  "Entity Framework Core": { icon: Database, color: "text-violet-400" },
  "REST APIs": { icon: Network, color: "text-sky-400" },
  JWT: { icon: KeyRound, color: "text-pink-400" },
  RBAC: { icon: ShieldCheck, color: "text-emerald-400" },
  Angular: { logo: angular },
  TypeScript: { logo: typescript },
  RxJS: { logo: rxjs },
  "Reactive Forms": { icon: TextCursorInput, color: "text-rose-400" },
  "Routing & Guards": { icon: Route, color: "text-amber-400" },
  "HTTP Interceptors": { icon: ArrowLeftRight, color: "text-cyan-400" },
  "Responsive Design": { icon: MonitorSmartphone, color: "text-sky-400" },
  HTML5: { logo: html5 },
  CSS3: { logo: css3 },
  "Flexbox & CSS Grid": { icon: LayoutGrid, color: "text-blue-400" },
  PostgreSQL: { logo: postgres },
  "SQL Server": { logo: sqlserver },
  pgvector: { icon: Waypoints, color: "text-indigo-400" },
  "AWS S3": { logo: aws },
  CloudFront: { icon: Globe, color: "text-violet-400" },
  SQS: { icon: MessagesSquare, color: "text-pink-400" },
  SFTP: { icon: FolderLock, color: "text-emerald-400" },
  "LLM integration": { icon: Bot, color: "text-emerald-400" },
  OCR: { icon: ScanText, color: "text-cyan-400" },
  "PDF parsing": { icon: FileText, color: "text-red-400" },
  "Knowledge-base matching": { icon: BookOpenCheck, color: "text-amber-400" },
  "Output validation": { icon: BadgeCheck, color: "text-lime-400" },
  Git: { logo: git },
  "Swagger / OpenAPI": { logo: swagger },
  Postman: { logo: postman },
  "ABHA / ABDM": { icon: HeartPulse, color: "text-rose-400" },
  "Payment gateways": { icon: CreditCard, color: "text-violet-400" },
};

const SkillChip = ({ name }: { name: string }) => {
  const s = skillIcons[name];
  return (
    <span className="chip gap-1.5 py-1 pl-1.5 pr-2.5">
      {s && ("logo" in s ? (
        <img src={s.logo} alt="" width={16} height={16} className="h-4 w-4 object-contain" loading="lazy" />
      ) : (
        <s.icon className={`h-4 w-4 ${s.color}`} strokeWidth={2} aria-hidden />
      ))}
      {name}
    </span>
  );
};

const Skills = () => (
  <Section
    id="skills"
    label="Skills"
    className="section-tint"
    title="The stack I ship with."
    description="Day-to-day tools for designing, building and running production systems."
    aside={
      <p className="eyebrow">
        {skillGroups.length} skill areas
      </p>
    }
  >
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((g, i) => {
        const { icon: Icon, tone, span, glow } = groupStyle[i % groupStyle.length];
        return (
          <Reveal key={g.title} variant="scale" delay={(i % 3) * 80} className={span}>
            <div className={`card card-interactive group h-full overflow-hidden bg-gradient-to-br ${glow} via-card to-card p-6 md:p-7`}>
              <h3 className="flex items-center gap-3 text-lg font-semibold">
                <span className={`icon-tile h-11 w-11 ${tone} group-hover:scale-110 group-hover:-rotate-6`}>
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                {g.title}
              </h3>
              <div className="mt-5">
                <ul className="flex flex-wrap gap-1.5">
                  {g.items.map((item, j) => (
                    <li key={item} className="stagger-item" style={{ ["--i" as string]: j }}>
                      <SkillChip name={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  </Section>
);

export default Skills;

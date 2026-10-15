import { Brain, Cloud, Database, Layout, Server, Wrench } from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { TechChip } from "@/components/Projects";
import { skillGroups } from "@/data/profile";

// Icon, colour and bento span per skill group, in the same order as `skillGroups`
const groupStyle = [
  { icon: Server, tone: "bg-blue-500/10 text-blue-600 ring-blue-500/20 dark:text-blue-400", span: "lg:col-span-2", glow: "from-blue-500/15" },
  { icon: Layout, tone: "bg-rose-500/10 text-rose-600 ring-rose-500/20 dark:text-rose-400", span: "lg:row-span-2", glow: "from-rose-500/15" },
  { icon: Database, tone: "bg-cyan-500/10 text-cyan-600 ring-cyan-500/20 dark:text-cyan-400", span: "", glow: "from-cyan-500/15" },
  { icon: Cloud, tone: "bg-amber-500/10 text-amber-600 ring-amber-500/20 dark:text-amber-400", span: "", glow: "from-amber-500/15" },
  { icon: Brain, tone: "bg-violet-500/10 text-violet-600 ring-violet-500/20 dark:text-violet-400", span: "lg:col-span-2", glow: "from-violet-500/15" },
  { icon: Wrench, tone: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400", span: "", glow: "from-emerald-500/15" },
];

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
                      <TechChip>{item}</TechChip>
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

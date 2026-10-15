import { Brain, Cloud, Database, Layout, Server, Wrench } from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { TechChip } from "@/components/Projects";
import { skillGroups } from "@/data/profile";

// Icon, colour and bento span per skill group, in the same order as `skillGroups`
const groupStyle = [
  { icon: Server, tone: "bg-secondary text-foreground ring-border", span: "lg:col-span-2", glow: "from-foreground/[0.03]" },
  { icon: Layout, tone: "bg-secondary text-foreground ring-border", span: "lg:row-span-2", glow: "from-foreground/[0.03]" },
  { icon: Database, tone: "bg-secondary text-foreground ring-border", span: "", glow: "from-foreground/[0.03]" },
  { icon: Cloud, tone: "bg-secondary text-foreground ring-border", span: "", glow: "from-foreground/[0.03]" },
  { icon: Brain, tone: "bg-secondary text-foreground ring-border", span: "lg:col-span-2", glow: "from-foreground/[0.03]" },
  { icon: Wrench, tone: "bg-secondary text-foreground ring-border", span: "", glow: "from-foreground/[0.03]" },
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

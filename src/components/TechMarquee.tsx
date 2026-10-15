const items = [
  { name: "C#", color: "bg-muted-foreground/60" },
  { name: ".NET 8", color: "bg-muted-foreground/60" },
  { name: "ASP.NET Core", color: "bg-muted-foreground/60" },
  { name: "Entity Framework Core", color: "bg-muted-foreground/60" },
  { name: "Angular", color: "bg-muted-foreground/60" },
  { name: "TypeScript", color: "bg-muted-foreground/60" },
  { name: "RxJS", color: "bg-muted-foreground/60" },
  { name: "PostgreSQL", color: "bg-muted-foreground/60" },
  { name: "SQL Server", color: "bg-muted-foreground/60" },
  { name: "AWS", color: "bg-muted-foreground/60" },
  { name: "REST APIs", color: "bg-muted-foreground/60" },
  { name: "JWT & RBAC", color: "bg-muted-foreground/60" },
  { name: "LLM & OCR", color: "bg-muted-foreground/60" },
  { name: "Responsive UI", color: "bg-muted-foreground/60" },
];

/** Endless, edge-faded strip of the stack; pauses on hover and stays still for reduced motion. */
const TechMarquee = () => (
  <div className="marquee group relative overflow-hidden py-2" aria-label="Technologies I work with">
    <ul className="marquee-track flex w-max gap-3 group-hover:[animation-play-state:paused]">
      {[...items, ...items].map((t, i) => (
        <li
          key={i}
          aria-hidden={i >= items.length}
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-medium text-foreground/85 shadow-sm backdrop-blur"
        >
          <span className={`h-2 w-2 rounded-full ${t.color}`} aria-hidden />
          {t.name}
        </li>
      ))}
    </ul>
  </div>
);

export default TechMarquee;

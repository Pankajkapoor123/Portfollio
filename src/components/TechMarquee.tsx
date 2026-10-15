const items = [
  { name: "C#", color: "bg-violet-500" },
  { name: ".NET 8", color: "bg-indigo-500" },
  { name: "ASP.NET Core", color: "bg-blue-500" },
  { name: "Entity Framework Core", color: "bg-sky-500" },
  { name: "Angular", color: "bg-red-500" },
  { name: "TypeScript", color: "bg-blue-600" },
  { name: "RxJS", color: "bg-pink-500" },
  { name: "PostgreSQL", color: "bg-cyan-600" },
  { name: "SQL Server", color: "bg-rose-500" },
  { name: "AWS", color: "bg-amber-500" },
  { name: "REST APIs", color: "bg-emerald-500" },
  { name: "JWT & RBAC", color: "bg-teal-500" },
  { name: "LLM & OCR", color: "bg-fuchsia-500" },
  { name: "Responsive UI", color: "bg-orange-500" },
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

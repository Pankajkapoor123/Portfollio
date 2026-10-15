import { Link, useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { profile, sections, socials } from "@/data/profile";
import { projects } from "@/data/projects";
import { scrollToSection } from "@/lib/scroll";

const Footer = () => {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  return (
    <footer className="relative border-t border-border bg-card/40 backdrop-blur-sm">
      <span className="absolute inset-x-0 top-[-1px] h-px bg-brand-gradient opacity-60" aria-hidden />

      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="group inline-flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-brand-violet font-mono text-sm font-semibold text-white shadow-[0_6px_16px_-6px_hsl(var(--primary)/0.7)] transition-transform group-hover:-rotate-6">
              {profile.initials}
            </span>
            <span className="text-base font-semibold">{profile.name}</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {profile.role} building reliable APIs, Angular frontends and data-heavy systems for healthcare and
            enterprise teams.
          </p>
          {profile.available && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
              Open to new opportunities
            </p>
          )}
        </div>

        <nav aria-label="Footer">
          <p className="label text-[11px]">Navigate</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/#${s.id}`}
                  onClick={(e) => onHome && scrollToSection(s.id) && e.preventDefault()}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label text-[11px]">Case studies</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link to={`/projects/${p.slug}`} className="text-muted-foreground transition-colors hover:text-primary">
                  {p.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col gap-4 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <div className="flex items-center gap-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="btn btn-ghost h-9 w-9 px-0 hover:-translate-y-0.5 hover:text-primary"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
            <span className="mx-2 h-4 w-px bg-border" aria-hidden />
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="btn btn-ghost group h-9 gap-1.5 px-3 hover:text-primary"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

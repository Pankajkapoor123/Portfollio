import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ChevronRight, Command, Download, Menu, Search, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useCommandMenu } from "@/components/CommandMenu";
import { profile, sections } from "@/data/profile";
import { scrollToSection } from "@/lib/scroll";

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

const Navbar = () => {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const { open: openCommandMenu } = useCommandMenu();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  // Track the section in view (home page only)
  useEffect(() => {
    if (!onHome) {
      setActive(pathname.startsWith("/projects") ? "projects" : "");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const clearAtTop = () => window.scrollY < 300 && setActive("");
    window.addEventListener("scroll", clearAtTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearAtTop);
    };
  }, [onHome, pathname]);

  // On the home page, scroll in place instead of routing (works for repeat clicks too)
  const handleSectionClick = (e: React.MouseEvent, id: string) => {
    setMenuOpen(false);
    if (onHome && scrollToSection(id)) e.preventDefault();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-200 ${
        scrolled || menuOpen ? "border-border bg-background/80 backdrop-blur-lg" : "border-transparent"
      }`}
    >
      <nav className="shell flex h-16 items-center justify-between gap-4" aria-label="Main">
        <Link to="/" className="group flex items-center gap-2.5" aria-label={`${profile.name} — home`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-brand-violet font-mono text-[13px] font-semibold text-white shadow-[0_6px_16px_-6px_hsl(var(--primary)/0.7)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            {profile.initials}
          </span>
          <span className="text-[15px] font-semibold tracking-tight">{profile.name}</span>
        </Link>

        <div className="flex items-center gap-1">
          <ul className="mr-2 hidden items-center md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/#${s.id}`}
                  onClick={(e) => handleSectionClick(e, s.id)}
                  aria-current={active === s.id ? "location" : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                    active === s.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                  <span
                    className={`absolute inset-x-3 -bottom-[13px] h-0.5 origin-center rounded-full bg-brand-gradient transition-transform duration-300 ${
                      active === s.id ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={openCommandMenu}
            className="hidden h-9 items-center gap-2 rounded-lg border border-border bg-card pl-3 pr-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground lg:inline-flex"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="pr-6">Search</span>
            <kbd>{isMac ? <Command className="h-2.5 w-2.5" /> : "Ctrl"}</kbd>
            <kbd>K</kbd>
          </button>
          <button
            type="button"
            onClick={openCommandMenu}
            className="btn btn-ghost h-9 w-9 px-0 lg:hidden"
            aria-label="Open command menu"
          >
            <Search className="h-4 w-4" />
          </button>
          <ThemeToggle />
          <Link
            to="/#contact"
            onClick={(e) => handleSectionClick(e, "contact")}
            className="btn btn-primary group ml-1 hidden h-9 px-4 sm:inline-flex"
          >
            Hire me
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            className="btn btn-ghost h-9 w-9 px-0 md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="animate-fade-in border-t border-border md:hidden">
          <ul className="shell flex flex-col py-2">
            {sections.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/#${s.id}`}
                  onClick={(e) => handleSectionClick(e, s.id)}
                  className={`flex items-center justify-between rounded-md py-3 text-[15px] ${
                    active === s.id ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>
              </li>
            ))}
            <li className="flex gap-2 py-3">
              <Link
                to="/#contact"
                onClick={(e) => handleSectionClick(e, "contact")}
                className="btn btn-primary h-10 flex-1"
              >
                Hire me
              </Link>
              <a href={profile.resume} download className="btn btn-outline h-10 flex-1">
                <Download className="h-4 w-4" /> CV
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Reading progress */}
      <span
        className="absolute bottom-[-1px] left-0 h-0.5 bg-brand-gradient transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
        aria-hidden
      />
    </header>
  );
};

export default Navbar;

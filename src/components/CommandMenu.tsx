import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { ArrowRight, Copy, FileText, Hash, Moon, Sun } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { projects } from "@/data/projects";
import { profile, sections, socials } from "@/data/profile";
import { scrollToSection } from "@/lib/scroll";

const CommandMenuContext = createContext<{ open: () => void }>({ open: () => {} });

export const useCommandMenu = () => useContext(CommandMenuContext);

export const CommandMenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const run = useCallback((action: () => void) => {
    setIsOpen(false);
    // Let the dialog close (and restore scroll lock) before acting
    requestAnimationFrame(action);
  }, []);

  const goToSection = (id: string) => run(() => scrollToSection(id) || navigate(`/#${id}`));

  const copyEmail = () =>
    run(async () => {
      try {
        await navigator.clipboard.writeText(profile.email);
        toast.success("Email copied to clipboard", { description: profile.email });
      } catch {
        window.location.href = `mailto:${profile.email}`;
      }
    });

  const value = useMemo(() => ({ open: () => setIsOpen(true) }), []);

  return (
    <CommandMenuContext.Provider value={value}>
      {children}
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Search sections, projects, actions…" />
        <CommandList className="max-h-[min(420px,60vh)]">
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Navigate">
            {sections.map((s) => (
              <CommandItem key={s.id} value={`section ${s.label}`} onSelect={() => goToSection(s.id)}>
                <Hash className="mr-2 text-muted-foreground" />
                {s.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {projects.map((p) => (
              <CommandItem
                key={p.slug}
                value={`project ${p.title} ${p.category}`}
                onSelect={() => run(() => navigate(`/projects/${p.slug}`))}
              >
                <FileText className="mr-2 text-muted-foreground" />
                <span className="flex-1 truncate">{p.title}</span>
                <span className="ml-3 hidden text-xs text-muted-foreground sm:inline">{p.category}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem value="copy email address" onSelect={copyEmail}>
              <Copy className="mr-2 text-muted-foreground" />
              Copy email address
            </CommandItem>
            <CommandItem
              value="toggle theme dark light mode"
              onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
            >
              {resolvedTheme === "dark" ? (
                <Sun className="mr-2 text-muted-foreground" />
              ) : (
                <Moon className="mr-2 text-muted-foreground" />
              )}
              Switch to {resolvedTheme === "dark" ? "light" : "dark"} theme
            </CommandItem>
            {socials
              .filter((s) => s.href.startsWith("http"))
              .map((s) => (
                <CommandItem
                  key={s.label}
                  value={`open ${s.label}`}
                  onSelect={() => run(() => window.open(s.href, "_blank", "noopener,noreferrer"))}
                >
                  <s.icon className="mr-2 text-muted-foreground" />
                  <span className="flex-1">Open {s.label}</span>
                  <ArrowRight className="text-muted-foreground" />
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </CommandMenuContext.Provider>
  );
};

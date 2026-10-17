import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import Typewriter from "@/components/Typewriter";
import { profile, socials, yearsOfExperience } from "@/data/profile";
import { scrollToSection } from "@/lib/scroll";
import { useScrollOut } from "@/lib/scrollFx";

const titles = [profile.name, ".NET Developer", "API Engineer"];

const Hero = () => {
  // The intro text lifts and fades as it leaves
  const intro = useScrollOut<HTMLDivElement>();

  return (
    <section id="top" className="relative overflow-hidden pt-28 lg:pt-0">
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden />

      <div className="shell relative grid grid-cols-[minmax(0,1fr)] items-center gap-6 lg:min-h-[100svh] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
        <div ref={intro} className="scroll-out lg:pb-24 lg:pt-44">
          <p className="animate-fade-up text-lg font-semibold sm:text-xl">Hi, There!</p>

          <h1 className="mt-3 animate-fade-up whitespace-nowrap text-[8.4vw] font-bold leading-[1.1] tracking-[-0.03em] [animation-delay:80ms] sm:text-[3.4rem] lg:text-[4.3vw] xl:text-[3.4rem]">
            <span className="sr-only">
              I'm {profile.name}, {profile.role}
            </span>
            <span aria-hidden>
              I'm <Typewriter words={titles} className="text-primary" />
            </span>
          </h1>

          <p className="mt-5 max-w-[34rem] animate-fade-up text-sm leading-relaxed text-muted-foreground [animation-delay:160ms] sm:text-[15px]">
            {profile.role} with {yearsOfExperience()}+ years of building production systems — ASP.NET Core APIs,
            Angular frontends and PostgreSQL data models for healthcare, logistics and enterprise teams.
          </p>

          <ul className="mt-5 flex animate-fade-up gap-3 [animation-delay:240ms]" aria-label="Social links">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
                >
                  <s.icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:320ms]">
            <Link
              to="/#contact"
              onClick={(e) => scrollToSection("contact") && e.preventDefault()}
              className="btn btn-primary h-11 px-6 font-semibold"
            >
              Hire me
            </Link>
            <a
              href={profile.resume}
              download
              className="btn group h-11 border border-primary/60 px-6 text-primary hover:-translate-y-0.5 hover:bg-primary/10"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Download CV
            </a>
          </div>
        </div>

        {/* Cut-out portrait standing on the bottom edge, with a soft glow behind it */}
        <div className="relative mx-auto w-full max-w-[540px] animate-fade-up self-end [animation-delay:200ms] lg:max-w-none">
          <div className="absolute bottom-[12%] left-1/2 h-1/2 w-2/3 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" aria-hidden />
          <img
            src="/profile-cutout.png"
            alt={`Portrait of ${profile.name}`}
            width={760}
            height={760}
            className="relative mx-auto w-full [mask-image:linear-gradient(to_bottom,black_78%,transparent)] lg:ml-auto lg:h-[88svh] lg:w-[88svh] lg:max-w-none lg:object-contain lg:object-bottom"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

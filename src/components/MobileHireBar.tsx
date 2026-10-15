import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { scrollToSection } from "@/lib/scroll";

/**
 * Phone-only action bar pinned to the bottom of the screen. It appears once the
 * visitor scrolls past the hero and steps aside while the contact section is on screen.
 */
const MobileHireBar = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let contactInView = false;
    const update = () => setVisible(window.scrollY > 600 && !contactInView);

    const contact = document.getElementById("contact");
    const observer =
      contact &&
      new IntersectionObserver(([entry]) => {
        contactInView = entry.isIntersecting;
        update();
      });
    if (contact && observer) observer.observe(contact);

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [pathname]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-3 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex gap-2 rounded-2xl border border-border bg-card/90 p-2 shadow-[0_-10px_40px_-12px_hsl(var(--primary)/0.45)] backdrop-blur-lg">
        <Link
          to="/#contact"
          onClick={(e) => pathname === "/" && scrollToSection("contact") && e.preventDefault()}
          className="btn btn-primary h-11 flex-1"
          tabIndex={visible ? 0 : -1}
        >
          <Mail className="h-4 w-4" /> Hire me
        </Link>
        <a href={profile.resume} download className="btn btn-outline h-11 flex-1" tabIndex={visible ? 0 : -1}>
          <Download className="h-4 w-4" /> Download CV
        </a>
      </div>
    </div>
  );
};

export default MobileHireBar;

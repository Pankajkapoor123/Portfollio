/** Smooth-scrolls to a section on the home page; returns false if it isn't mounted. */
export const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth" });
  history.replaceState(null, "", id === "top" ? "/" : `/#${id}`);
  return true;
};

/**
 * Accent colour per project, so each case study is recognisable at a glance.
 * Class names are written out in full so Tailwind can find them.
 */
export type Tone = { tile: string; bar: string; dot: string };

const tones: Record<string, Tone> = {
  hims: {
    tile: "bg-blue-500/10 text-blue-600 ring-blue-500/20 dark:text-blue-400",
    bar: "from-blue-500 to-cyan-400",
    dot: "bg-blue-500",
  },
  snevva: {
    tile: "bg-violet-500/10 text-violet-600 ring-violet-500/20 dark:text-violet-400",
    bar: "from-violet-500 to-fuchsia-400",
    dot: "bg-violet-500",
  },
  navitra: {
    tile: "bg-amber-500/10 text-amber-600 ring-amber-500/20 dark:text-amber-400",
    bar: "from-amber-500 to-orange-400",
    dot: "bg-amber-500",
  },
  mims: {
    tile: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400",
    bar: "from-emerald-500 to-teal-400",
    dot: "bg-emerald-500",
  },
  authentiko: {
    tile: "bg-cyan-500/10 text-cyan-600 ring-cyan-500/20 dark:text-cyan-400",
    bar: "from-cyan-500 to-sky-400",
    dot: "bg-cyan-500",
  },
  ecommerce: {
    tile: "bg-rose-500/10 text-rose-600 ring-rose-500/20 dark:text-rose-400",
    bar: "from-rose-500 to-pink-400",
    dot: "bg-rose-500",
  },
};

export const toneFor = (slug: string): Tone => tones[slug] ?? tones.hims;

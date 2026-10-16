/**
 * Accent per project. Every project shares the sky-blue primary accent;
 * kept as a lookup so a project can still be given its own accent later.
 * Class names are written out in full so Tailwind can find them.
 */
export type Tone = { tile: string; bar: string; dot: string };

const accent: Tone = {
  tile: "bg-primary/10 text-primary ring-primary/25",
  bar: "from-primary to-brand-cyan",
  dot: "bg-primary",
};

export const toneFor = (_slug: string): Tone => accent;

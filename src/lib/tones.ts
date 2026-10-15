/**
 * Accent per project. The UI is monochrome, so every project shares one neutral tone;
 * kept as a lookup so a project can still be given its own accent later.
 * Class names are written out in full so Tailwind can find them.
 */
export type Tone = { tile: string; bar: string; dot: string };

const neutral: Tone = {
  tile: "bg-secondary text-foreground ring-border",
  bar: "from-foreground/80 to-muted-foreground/60",
  dot: "bg-foreground/70",
};

export const toneFor = (_slug: string): Tone => neutral;

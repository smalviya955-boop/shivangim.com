/**
 * Hand-drawn path generation.
 *
 * Doodles are generated at the measured pixel size of the phrase they annotate
 * rather than drawn once and stretched — a stretched SVG distorts the stroke and
 * pulls the ends of a loop apart. Jitter comes from a seeded PRNG so a given
 * phrase always gets the same wobble (no flicker on re-render).
 */

/** Small deterministic PRNG (mulberry32) seeded from a string. */
export function seededRandom(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = [number, number];

/** Quadratic smoothing through a point list — keeps strokes fluid, not polygonal. */
function smooth(points: Pt[]): string {
  if (points.length < 2) return "";
  const round = (n: number) => Math.round(n * 10) / 10;
  let d = `M${round(points[0][0])},${round(points[0][1])}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [cx, cy] = points[i];
    const [nx, ny] = points[i + 1];
    d += ` Q${round(cx)},${round(cy)} ${round((cx + nx) / 2)},${round((cy + ny) / 2)}`;
  }
  const last = points[points.length - 1];
  d += ` L${round(last[0])},${round(last[1])}`;
  return d;
}

/**
 * A loop around a box, drawn as one continuous stroke that overshoots its own
 * start the way a real pen does.
 *
 * The loop is a superellipse rather than a true ellipse: around a single line of
 * text an ellipse pinches in at the ends and cuts through the first and last few
 * letters, while a squarer loop hugs the phrase the way a hand-drawn circle does.
 */
export function roughEllipse(w: number, h: number, seed: string): string[] {
  const rand = seededRandom(seed);
  const cx = w / 2;
  const cy = h / 2;
  const rx = Math.max(w / 2 - 2, 4);
  const ry = Math.max(h / 2 - 2, 4);

  // Flatten the sides more as the phrase gets wider relative to its height.
  const ratio = w / Math.max(h, 1);
  const exponent = ratio > 6 ? 0.5 : ratio > 3 ? 0.6 : 0.78;
  const shape = (v: number) => Math.sign(v) * Math.pow(Math.abs(v), exponent);

  // Start bottom-left, sweep once around, overshoot past the start.
  const from = Math.PI * 0.78;
  const to = from + Math.PI * 2 + Math.PI * 0.26;
  const steps = 64;
  const points: Pt[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = from + (to - from) * t;
    // Wobble grows slightly through the stroke, like a pen losing precision.
    const wob = 1 + (rand() - 0.5) * 0.045 + Math.sin(t * 7) * 0.01;
    // Ease the overshoot outward so the tail drifts off the loop.
    const drift = t > 0.9 ? (t - 0.9) * 0.5 : 0;
    points.push([
      cx + shape(Math.cos(angle)) * rx * (wob + drift),
      cy + shape(Math.sin(angle)) * ry * (wob + drift * 0.6),
    ]);
  }

  return [smooth(points)];
}

/** A wavy underline across the full width. */
export function roughUnderline(w: number, h: number, seed: string): string[] {
  const rand = seededRandom(seed);
  const steps = Math.max(8, Math.round(w / 26));
  const amp = Math.max(1.4, h * 0.22);
  const mid = h / 2;
  const points: Pt[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    points.push([
      2 + (w - 4) * t,
      mid + Math.sin(t * Math.PI * 2.1) * amp * 0.7 + (rand() - 0.5) * amp * 0.5,
    ]);
  }

  return [smooth(points)];
}

/** An underline that finishes in an arrowhead. */
export function roughArrow(w: number, h: number, seed: string): string[] {
  const [line] = roughUnderline(w, h, seed);
  const tipX = w - 2;
  const tipY = h / 2;
  const back = Math.max(7, h * 0.9);
  const spread = Math.max(4, h * 0.5);
  const head = `M${(tipX - back).toFixed(1)},${(tipY - spread).toFixed(1)} L${tipX.toFixed(1)},${tipY.toFixed(1)} L${(tipX - back).toFixed(1)},${(tipY + spread).toFixed(1)}`;
  return [line, head];
}

/** A rough four-sided frame, each side its own overshooting stroke. */
export function roughBox(w: number, h: number, seed: string): string[] {
  const rand = seededRandom(seed);
  const j = () => (rand() - 0.5) * Math.min(6, h * 0.16);
  const side = (a: Pt, b: Pt): Pt[] => {
    const steps = 6;
    const pts: Pt[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      pts.push([a[0] + (b[0] - a[0]) * t + j() * 0.5, a[1] + (b[1] - a[1]) * t + j() * 0.5]);
    }
    return pts;
  };

  const p = 3;
  const tl: Pt = [p, p];
  const tr: Pt = [w - p, p];
  const br: Pt = [w - p, h - p];
  const bl: Pt = [p, h - p];

  return [
    smooth(side(tl, tr)),
    smooth(side(tr, br)),
    smooth(side(br, bl)),
    smooth(side(bl, tl)),
  ];
}

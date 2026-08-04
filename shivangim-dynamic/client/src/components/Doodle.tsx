/**
 * Hand-drawn doodle annotations.
 *
 * Each annotation is a rough SVG stroke that draws itself when the phrase
 * scrolls into view — the same beat as the doodle cues in the brand video
 * script (circle the phrase, arrow the number, starburst the insight).
 *
 * The geometry is generated at the phrase's measured pixel size (see lib/rough)
 * and re-generated on resize, so a loop stays a loop at every breakpoint and
 * across line wraps instead of being stretched out of shape.
 *
 * Usage:
 *   <Doodle kind="circle">where the pain already lives</Doodle>
 *   <Doodle kind="arrow" color="#8FA83B">who actually fit</Doodle>
 *   Same question <Starburst /> every time
 */
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useInView, usePrefersReducedMotion } from "@/hooks/useInView";
import { roughArrow, roughBox, roughEllipse, roughUnderline } from "@/lib/rough";

export type DoodleKind = "circle" | "underline" | "arrow" | "box";

const DOODLE_CORAL = "#E07050";
const DOODLE_LIME = "#8FA83B";

/**
 * Two marks, two jobs. Coral circles and boxes enclose the one claim a scene is
 * making; lime underlines and arrows mark supporting phrases. Keeping the colour
 * tied to the kind means a scene can't accidentally end up with two competing
 * "this is the point" cues. Pass `color` to override for a one-off.
 */
const KIND_COLOR: Record<DoodleKind, string> = {
  circle: DOODLE_CORAL,
  box: DOODLE_CORAL,
  underline: DOODLE_LIME,
  arrow: DOODLE_LIME,
};

/** How far the annotation extends past the phrase box, as a fraction of its height. */
const PAD: Record<DoodleKind, { x: number; y: number; band: number | null }> = {
  circle: { x: 0.16, y: 0.14, band: null },
  box: { x: 0.13, y: 0.11, band: null },
  // `band` = the annotation sits below the text in a band this tall (x line-height).
  underline: { x: 0.03, y: 0, band: 0.2 },
  arrow: { x: 0.04, y: 0, band: 0.26 },
};

const DURATION: Record<DoodleKind, number> = {
  circle: 1000,
  box: 950,
  underline: 620,
  arrow: 780,
};

/**
 * The box the annotation should enclose.
 *
 * A wrapped phrase produces one client rect per line, and the fragment left at
 * the end of the previous line is often just a trailing space a few pixels wide.
 * Including it would stretch the annotation up into a line it doesn't belong to,
 * so slivers are discarded before taking the union.
 */
function measureText(el: HTMLElement): { rect: DOMRect; lines: number } {
  const rects = Array.from(el.getClientRects()).filter((r) => r.width > 6);
  if (rects.length === 0) return { rect: el.getBoundingClientRect(), lines: 1 };

  const left = Math.min(...rects.map((r) => r.left));
  const right = Math.max(...rects.map((r) => r.right));
  const top = Math.min(...rects.map((r) => r.top));
  const bottom = Math.max(...rects.map((r) => r.bottom));
  return {
    rect: new DOMRect(left, top, right - left, bottom - top),
    lines: rects.length,
  };
}

interface DoodleProps {
  children: ReactNode;
  kind?: DoodleKind;
  color?: string;
  /** ms to wait after the phrase enters view before drawing */
  delay?: number;
  /** stroke weight in px */
  weight?: number;
  className?: string;
}

export function Doodle({
  children,
  kind = "circle",
  color,
  delay = 220,
  weight = 2.4,
  className = "",
}: DoodleProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.55 });
  const reduced = usePrefersReducedMotion();
  const textRef = useRef<HTMLSpanElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0, dx: 0, dy: 0, lines: 1 });

  // Track the phrase box so the doodle is generated at its real size. `dx/dy`
  // is the text box's offset inside the wrapper: an inline span's box is the
  // font's content area, which is shorter than the line box around it, so the
  // annotation would otherwise ride high and strike through the words.
  useEffect(() => {
    const el = textRef.current;
    const wrap = ref.current;
    if (!el || !wrap) return;

    const measure = () => {
      const { rect, lines } = measureText(el);
      const outer = wrap.getBoundingClientRect();
      const next = {
        w: rect.width,
        h: rect.height,
        dx: rect.left - outer.left,
        dy: rect.top - outer.top,
        lines,
      };
      setBox((prev) =>
        Math.abs(prev.w - next.w) > 1 ||
        Math.abs(prev.h - next.h) > 1 ||
        Math.abs(prev.dx - next.dx) > 1 ||
        Math.abs(prev.dy - next.dy) > 1 ||
        prev.lines !== next.lines
          ? next
          : prev,
      );
    };

    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [ref]);

  const stroke = color ?? KIND_COLOR[kind];
  const pad = PAD[kind];
  const seed = typeof children === "string" ? children : kind;

  const frame = useMemo(() => {
    if (box.w === 0 || box.h === 0) return null;
    const padX = box.h * pad.x;

    if (pad.band !== null) {
      const height = Math.max(6, box.h * pad.band);
      return {
        w: box.w + padX * 2,
        h: height,
        left: box.dx - padX,
        top: box.dy + box.h - height * 0.35,
      };
    }

    // A wide single-line phrase needs generous vertical room or the loop clips
    // its own ascenders. A wrapped phrase must stay tight instead: the space
    // above it belongs to the previous line of the same sentence, and a loop
    // reaching into it would strike through that line's descenders.
    const lineHeight = box.h / box.lines;
    const ratio = box.w / Math.max(lineHeight, 1);
    const padY =
      box.lines > 1
        ? Math.min(box.h * 0.09, lineHeight * 0.16)
        : box.h * (pad.y + Math.min(0.34, ratio * 0.016));
    return {
      w: box.w + padX * 2,
      h: box.h + padY * 2,
      left: box.dx - padX,
      top: box.dy - padY,
    };
  }, [box, pad.x, pad.y, pad.band]);

  const paths = useMemo(() => {
    if (!frame) return [];
    switch (kind) {
      case "circle":
        return roughEllipse(frame.w, frame.h, seed);
      case "box":
        return roughBox(frame.w, frame.h, seed);
      case "arrow":
        return roughArrow(frame.w, frame.h, seed);
      default:
        return roughUnderline(frame.w, frame.h, seed);
    }
  }, [frame, kind, seed]);

  const drawn = reduced || inView;
  const duration = DURATION[kind];

  return (
    <span ref={ref} className={`doodle-wrap ${className}`}>
      <span ref={textRef} className="doodle-text">
        {children}
      </span>
      {frame && (
        <svg
          className="doodle-svg"
          style={{ left: frame.left, top: frame.top, width: frame.w, height: frame.h }}
          viewBox={`0 0 ${frame.w} ${frame.h}`}
          aria-hidden="true"
          focusable="false"
        >
          {paths.map((d, i) => (
            <path
              key={`${i}-${d.length}`}
              d={d}
              pathLength={1}
              fill="none"
              stroke={stroke}
              strokeWidth={weight}
              strokeLinecap="round"
              strokeDasharray={1}
              strokeDashoffset={drawn ? 0 : 1}
              style={{
                transition: reduced
                  ? "none"
                  : `stroke-dashoffset ${duration}ms cubic-bezier(0.23,1,0.32,1) ${
                      delay + i * (duration * 0.35)
                    }ms`,
              }}
            />
          ))}
        </svg>
      )}
    </span>
  );
}

interface StarburstProps {
  color?: string;
  size?: number;
  delay?: number;
  className?: string;
}

/** Radiating hand-drawn marks — the "this is the point" cue. */
export function Starburst({
  color = DOODLE_CORAL,
  size = 26,
  delay = 260,
  className = "",
}: StarburstProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.55 });
  const reduced = usePrefersReducedMotion();
  const drawn = reduced || inView;
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <span
      ref={ref}
      className={`inline-block align-middle ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" width={size} height={size} focusable="false">
        {rays.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const inner = i % 2 === 0 ? 9 : 11;
          const outer = i % 2 === 0 ? 18 : 16;
          return (
            <line
              key={angle}
              x1={20 + Math.cos(rad) * inner}
              y1={20 + Math.sin(rad) * inner}
              x2={20 + Math.cos(rad) * outer}
              y2={20 + Math.sin(rad) * outer}
              stroke={color}
              strokeWidth={2.2}
              strokeLinecap="round"
              style={{
                opacity: drawn ? 1 : 0,
                transform: drawn ? "scale(1)" : "scale(0.4)",
                transformOrigin: "20px 20px",
                transition: reduced
                  ? "none"
                  : `opacity 240ms ease-out ${delay + i * 45}ms, transform 340ms cubic-bezier(0.23,1,0.32,1) ${
                      delay + i * 45
                    }ms`,
              }}
            />
          );
        })}
      </svg>
    </span>
  );
}

/** A short hand-drawn connector between scenes. */
export function DoodleDivider({ color = DOODLE_CORAL }: { color?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const reduced = usePrefersReducedMotion();
  const drawn = reduced || inView;

  return (
    <div ref={ref} className="flex justify-center py-8 md:py-12" aria-hidden="true">
      <svg width="26" height="66" viewBox="0 0 26 66" fill="none">
        <path
          d="M13,2 C9,13 17,20 12,31 C8,41 16,49 12,60 M12,60 C10,56 8,54 5,52 M12,60 C15,56 18,54 21,52"
          pathLength={1}
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={drawn ? 0 : 1}
          style={{
            transition: reduced
              ? "none"
              : "stroke-dashoffset 900ms cubic-bezier(0.23,1,0.32,1) 100ms",
          }}
        />
      </svg>
    </div>
  );
}

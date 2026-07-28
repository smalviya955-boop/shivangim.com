/**
 * Number reveals.
 *
 * CountFigure animates a narrowing — 5,000 -> 1,000 — counting the second
 * number down when it scrolls into view. CountStat counts a single number up.
 * Both no-op for visitors who prefer reduced motion.
 */
import { useEffect, useRef, useState } from "react";
import { useInView, usePrefersReducedMotion } from "@/hooks/useInView";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function useTween(target: number, start: number, run: boolean, duration: number) {
  const [value, setValue] = useState(run ? target : start);
  const raf = useRef(0);

  useEffect(() => {
    if (!run) return;
    const begun = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - begun) / duration, 1);
      setValue(Math.round(start + (target - start) * easeOutCubic(p)));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, start, run, duration]);

  return value;
}

interface CountFigureProps {
  from: number;
  to: number;
  caption: string;
  color?: string;
  duration?: number;
}

export function CountFigure({
  from,
  to,
  caption,
  color = "#8FA83B",
  duration = 1400,
}: CountFigureProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.5 });
  const reduced = usePrefersReducedMotion();
  const live = useTween(to, from, reduced ? false : inView, duration);
  const shown = reduced ? to : live;

  return (
    <div ref={ref}>
      <div className="flex items-baseline gap-3 md:gap-5 flex-wrap">
        <span
          className="metric-stat text-4xl md:text-6xl"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {from.toLocaleString()}
        </span>
        <span
          className="text-2xl md:text-4xl"
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono" }}
          aria-hidden="true"
        >
          &rarr;
        </span>
        <span
          className="metric-stat text-5xl md:text-7xl tabular-nums"
          style={{ color }}
        >
          {shown.toLocaleString()}
        </span>
      </div>
      <div className="mt-3 text-sm text-white/45 max-w-md leading-relaxed">{caption}</div>
    </div>
  );
}

interface CountStatProps {
  target: number;
  suffix?: string;
  desc: string;
  duration?: number;
}

export function CountStat({ target, suffix = "", desc, duration = 1500 }: CountStatProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const reduced = usePrefersReducedMotion();
  const live = useTween(target, 0, reduced ? false : inView, duration);
  const shown = reduced ? target : live;

  return (
    <div ref={ref}>
      <div className="text-3xl md:text-4xl font-bold mb-1 metric-stat tabular-nums">
        {shown.toLocaleString()}
        {suffix}
      </div>
      <div className="text-xs text-white/45 leading-relaxed">{desc}</div>
    </div>
  );
}

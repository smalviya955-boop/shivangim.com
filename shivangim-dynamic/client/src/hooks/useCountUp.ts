import { useEffect, useState, useRef } from "react";

interface UseCountUpProps {
  target: number;
  duration?: number;
  suffix?: string;
  start?: boolean;
}

export function useCountUp({ target, duration = 1500, suffix = "", start = true }: UseCountUpProps) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, start, suffix]);

  const formatted = count.toLocaleString() + suffix;
  return formatted;
}

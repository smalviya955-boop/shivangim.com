/**
 * Scroll reveal wrapper — fade up with an optional stagger delay.
 * Respects prefers-reduced-motion (content appears immediately, no transform).
 */
import type { ElementType, ReactNode } from "react";
import { useInView, usePrefersReducedMotion } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  /** ms delay after entering view */
  delay?: number;
  /** px translate distance before revealing */
  distance?: number;
  as?: ElementType;
  className?: string;
  id?: string;
}

export default function Reveal({
  children,
  delay = 0,
  distance = 34,
  as: Tag = "div",
  className = "",
  id,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const reduced = usePrefersReducedMotion();
  const shown = reduced || inView;

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${distance}px)`,
        transition: reduced
          ? "none"
          : `opacity 620ms cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 620ms cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
        willChange: shown ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}

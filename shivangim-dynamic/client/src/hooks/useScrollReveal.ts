import { useEffect, useRef, useCallback } from "react";

export function useScrollReveal(stagger = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRef(false);

  const checkReveal = useCallback(() => {
    if (!ref.current || revealed.current) return;
    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight * 0.85) {
      revealed.current = true;
      ref.current.classList.add("visible");
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal");
    if (stagger > 0) {
      el.style.transitionDelay = `${stagger}ms`;
    }
    checkReveal();
    window.addEventListener("scroll", checkReveal, { passive: true });
    window.addEventListener("resize", checkReveal, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkReveal);
      window.removeEventListener("resize", checkReveal);
    };
  }, [stagger, checkReveal]);

  return ref;
}

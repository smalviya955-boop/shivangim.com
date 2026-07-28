/**
 * Sticky nav with scroll-spy. Sections come from NAV_SECTIONS in content/site.ts,
 * so adding a section to the page adds it to the nav.
 */
import { useEffect, useState } from "react";
import { BRAND, NAV_SECTIONS } from "@/content/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(NAV_SECTIONS[0].id);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (targets.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between py-3">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group text-left"
          aria-label="Back to top"
        >
          <span
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
            style={{
              background: BRAND.colors.charcoal,
              color: BRAND.colors.lime,
              fontFamily: "JetBrains Mono",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            SM
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold tracking-tight leading-tight">
              {BRAND.name}
            </span>
            <span className="block text-[10px] text-muted-foreground leading-none">
              {BRAND.role}
            </span>
          </span>
        </button>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_SECTIONS.filter((s) => s.id !== "contact").map((link) => (
            <li key={link.id}>
              <button
                onClick={() => go(link.id)}
                className="px-3 py-2 text-sm rounded-md transition-colors duration-200"
                style={{
                  color: activeId === link.id ? BRAND.colors.charcoal : "oklch(0.5 0.02 60)",
                  fontWeight: activeId === link.id ? 600 : 400,
                  background: activeId === link.id ? "rgba(0,0,0,0.04)" : "transparent",
                }}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="ml-2">
            <button
              onClick={() => go("contact")}
              className="px-4 py-2 bg-[#8FA83B] text-white text-sm font-medium rounded-md hover:bg-[#7d9435] transition-all duration-200 active:scale-[0.97] shadow-sm shadow-[#8FA83B]/20"
            >
              Book a call
            </button>
          </li>
        </ul>

        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-border px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2">
            {NAV_SECTIONS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  className="block text-sm py-2.5 w-full text-left"
                  style={{
                    color: activeId === link.id ? BRAND.colors.charcoal : "oklch(0.5 0.02 60)",
                    fontWeight: activeId === link.id ? 600 : 400,
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => go("contact")}
                className="block px-4 py-2.5 bg-[#8FA83B] text-white text-sm font-medium rounded-md text-center mt-2 w-full"
              >
                Book a call
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

/**
 * Design: Signal & Strategy — Footer
 * Dark background, minimal. Name + location.
 *
 * Everything here reads from BRAND in content/site.ts. It used to hardcode the
 * name, role, location and email, which meant a change to any of them had to be
 * made twice and the role label silently went stale.
 */
import { BRAND } from "@/content/site";

export default function Footer() {
  return (
    <footer className="py-8" style={{ background: "oklch(0.96 0.02 80)" }}>
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>
          <span className="font-semibold text-foreground">{BRAND.name}</span>
          {" | "}
          <span>{BRAND.role}</span>
        </div>
        <div>
          {BRAND.location}
          {" | "}
          <a
            href={`mailto:${BRAND.email}`}
            className="hover:text-[#8FA83B] transition-colors"
          >
            {BRAND.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

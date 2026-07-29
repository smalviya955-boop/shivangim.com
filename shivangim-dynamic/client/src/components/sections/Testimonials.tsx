/**
 * "In their words" — the qualitative counterweight to the metrics.
 *
 * Two groups, deliberately separated:
 *  - Clients, talking about an outcome. These are the evidence a buyer wants.
 *  - Colleagues, talking about how she works. Useful, but it is evidence of
 *    competence rather than of a result, and mixing the two lets a reader
 *    discount both. The colleague quotes are public LinkedIn recommendations,
 *    so each one links out to where it can be checked.
 *
 * Renders nothing at all while TESTIMONIALS is empty, so the site never shows a
 * bare heading over a blank space.
 *
 * Nothing goes in here without the person's permission — names, titles, company
 * names and message screenshots all need an explicit yes.
 */
import { Link } from "wouter";
import Reveal from "@/components/Reveal";
import { BRAND, CASE_STUDIES, TESTIMONIALS, type Testimonial } from "@/content/site";
import { attributionFor, attributionInitials } from "@/lib/attribution";

function QuoteCard({ item, index }: { item: Testimonial; index: number }) {
  const credit = attributionFor(item);
  const linked = item.caseSlug ? CASE_STUDIES.find((c) => c.slug === item.caseSlug) : undefined;
  const isClient = item.kind === "client";

  return (
    <Reveal delay={index * 80}>
      <figure
        className="rounded-2xl bg-white border border-border/50 shadow-sm p-7 h-full flex flex-col"
        style={isClient ? { borderTop: `3px solid ${BRAND.colors.lime}` } : undefined}
      >
        <span
          aria-hidden="true"
          className="block text-5xl leading-none mb-3"
          style={{
            fontFamily: "DM Serif Display, Georgia, serif",
            color: isClient ? BRAND.colors.coral : "oklch(0.8 0.02 80)",
          }}
        >
          &ldquo;
        </span>

        <blockquote
          className={`leading-relaxed text-charcoal flex-1 ${isClient ? "text-base md:text-lg" : "text-sm md:text-base"}`}
          style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
        >
          {item.quote}
        </blockquote>

        {item.screenshot && (
          <img
            src={item.screenshot}
            alt={item.screenshotAlt ?? `Message from ${item.name || item.company}`}
            loading="lazy"
            className="mt-5 rounded-lg border border-border w-full"
          />
        )}

        <figcaption className="mt-6 pt-5 border-t border-border/50 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
            style={{
              background: "oklch(0.94 0.02 80)",
              color: "oklch(0.45 0.02 60)",
              fontFamily: "JetBrains Mono",
            }}
          >
            {attributionInitials(item)}
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-charcoal">{credit.primary}</span>
            <span className="block text-xs text-muted-foreground">{credit.secondary}</span>
          </span>
        </figcaption>

        {(linked || item.sourceUrl) && (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs">
            {linked && (
              <Link
                href={`/case/${linked.slug}`}
                className="font-medium hover:underline"
                style={{ color: BRAND.colors.lime }}
              >
                Read the {linked.client} case study &rarr;
              </Link>
            )}
            {item.sourceUrl && (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-charcoal transition-colors"
              >
                {item.sourceLabel ?? "Source"} {"↗"}
              </a>
            )}
          </div>
        )}
      </figure>
    </Reveal>
  );
}

export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  const clients = TESTIMONIALS.filter((t) => t.kind === "client");
  const colleagues = TESTIMONIALS.filter((t) => t.kind === "colleague");

  return (
    <section id="words" className="py-20 md:py-28 scroll-mt-24">
      <div className="container">
        <Reveal>
          <div className="section-label mb-5">
            <span>In their words</span>
          </div>
          <h2 className="text-3xl md:text-[2.6rem] font-bold text-charcoal max-w-3xl leading-[1.2]">
            The numbers are mine. These are theirs.
          </h2>
          <p className="mt-4 text-warm-gray max-w-2xl leading-relaxed">
            Every figure on this page came out of work someone paid for. Here is what the people who
            paid for it say about it.
          </p>
        </Reveal>

        {clients.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {clients.map((item, i) => (
              <QuoteCard key={`client-${item.company}-${i}`} item={item} index={i} />
            ))}
          </div>
        )}

        {colleagues.length > 0 && (
          <>
            <Reveal>
              <div className="mt-20 mb-2">
                <div className="section-label mb-4">
                  <span>From the people who worked with me</span>
                </div>
                <p className="text-sm text-warm-gray max-w-2xl leading-relaxed">
                  Colleagues rather than clients — how the work actually goes day to day. All three
                  are public recommendations on LinkedIn, so you can check them yourself.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
              {colleagues.map((item, i) => (
                <QuoteCard key={`colleague-${item.name}-${i}`} item={item} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

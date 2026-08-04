/**
 * A single case study at /case/<slug>.
 *
 * Reads in the order a buyer evaluates: what state were they in, what did I find
 * that nobody else had, what did I actually build, what changed, and who will
 * say so. One link you can send a prospect instead of the whole site.
 *
 * Content lives in CASE_STUDIES in content/site.ts.
 */
import { useEffect } from "react";
import { Link, useLocation, useParams } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Doodle } from "@/components/Doodle";
import { BRAND, CASE_STUDIES, getCaseStudy, SEO, TESTIMONIALS } from "@/content/site";
import { attributionFor } from "@/lib/attribution";
import { goToSection } from "@/lib/goToSection";

function NotFoundCase() {
  return (
    <div className="container py-32 text-center">
      <div className="section-label mb-5 justify-center">
        <span>Case study</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
        That case study doesn&rsquo;t exist.
      </h1>
      <p className="text-warm-gray mb-8">Here is everything that does:</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {CASE_STUDIES.map((c) => (
          <Link
            key={c.slug}
            href={`/case/${c.slug}`}
            className="px-4 py-2 text-sm rounded-lg border border-border hover:border-charcoal/40 transition-colors"
          >
            {c.client}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Block({
  label,
  paragraphs,
}: {
  label: string;
  paragraphs: string[];
}) {
  return (
    <Reveal>
      <section className="mb-14">
        <div className="section-label mb-5">
          <span>{label}</span>
        </div>
        <div className="space-y-4 max-w-3xl">
          {paragraphs.map((p) => (
            <p key={p} className="text-base md:text-lg leading-relaxed text-foreground/75">
              {p}
            </p>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

export default function CaseStudy() {
  const params = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const study = getCaseStudy(params.slug ?? "");

  useEffect(() => {
    document.title = study
      ? `${study.client} case study | ${BRAND.name}`
      : `Case study | ${BRAND.name}`;

    const desc = study ? study.headline : SEO.description;
    let meta = document.head.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    window.scrollTo(0, 0);
    return () => {
      document.title = SEO.title;
    };
  }, [study]);

  const index = study ? CASE_STUDIES.findIndex((c) => c.slug === study.slug) : -1;
  const next = index >= 0 ? CASE_STUDIES[(index + 1) % CASE_STUDIES.length] : undefined;

  /**
   * The client's own words. Prefer a `quote` written on the case study itself,
   * otherwise pull the matching client testimonial so the same approved quote
   * lives in one place and shows up on both the home page and here.
   */
  const testimonial = study
    ? TESTIMONIALS.find((t) => t.kind === "client" && t.caseSlug === study.slug)
    : undefined;

  const clientQuote = study?.quote
    ? {
        text: study.quote.text,
        credit: attributionFor({
          name: study.quote.name,
          role: study.quote.role,
          company: study.client,
        }),
      }
    : testimonial
      ? { text: testimonial.quote, credit: attributionFor(testimonial) }
      : undefined;

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "DM Sans, system-ui, sans-serif", background: "oklch(0.98 0.01 80)" }}
    >
      <Navbar />

      <main className="pt-28 md:pt-32 pb-8">
        {!study ? (
          <NotFoundCase />
        ) : (
          <>
            {/* Header */}
            <div className="container">
              <Reveal>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-charcoal transition-colors mb-8"
                >
                  &larr; Back to overview
                </Link>

                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="system-badge">{study.type}</span>
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: study.accent }}
                  >
                    {study.client}
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-charcoal leading-[1.15] max-w-4xl">
                  {study.headline}
                </h1>

                <p className="mt-7 text-sm md:text-base text-warm-gray">
                  Signal found in{" "}
                  <Doodle kind="underline" delay={400}>
                    {study.signal}
                  </Doodle>
                </p>
              </Reveal>
            </div>

            {/* Outcomes strip */}
            <div className="container mt-12">
              <Reveal delay={120}>
                <div className="rounded-2xl p-8 md:p-10" style={{ background: BRAND.colors.charcoal }}>
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-6"
                    style={{ color: BRAND.colors.lime }}
                  >
                    What changed
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {study.outcomes.map((o) => (
                      <div key={o.label}>
                        <div className="text-2xl md:text-3xl font-bold mb-1.5 metric-stat">
                          {o.value}
                        </div>
                        <div className="text-xs text-white/45 leading-relaxed">{o.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Narrative */}
            <div className="container mt-16">
              <Block label="Where they were" paragraphs={study.situation} />
              <Block label="What I found" paragraphs={study.finding} />

              <Reveal>
                <section className="mb-14">
                  <div className="section-label mb-5">
                    <span>What I built</span>
                  </div>
                  <ul className="space-y-3 max-w-3xl">
                    {study.work.map((item, i) => (
                      <li key={item} className="flex items-start gap-4">
                        <span
                          className="badge-num shrink-0 mt-0.5"
                          style={{ background: `${study.accent}18`, color: study.accent }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-base leading-relaxed text-foreground/75 pt-1">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {/* Client's own words, if they have agreed to go on record */}
              {clientQuote && (
                <Reveal>
                  <figure
                    className="mb-14 max-w-3xl rounded-2xl glass-panel p-8"
                    style={{ borderTop: `3px solid ${study.accent}` }}
                  >
                    <div className="section-label mb-5">
                      <span>In their words</span>
                    </div>
                    <blockquote
                      className="text-lg md:text-xl leading-relaxed text-charcoal"
                      style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                    >
                      &ldquo;{clientQuote.text}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 pt-5 border-t border-border/50 text-sm">
                      <span className="font-semibold text-charcoal">
                        {clientQuote.credit.primary}
                      </span>
                      {clientQuote.credit.secondary && (
                        <span className="text-muted-foreground">
                          {" "}
                          — {clientQuote.credit.secondary}
                        </span>
                      )}
                    </figcaption>
                  </figure>
                </Reveal>
              )}

              {study.verify && (
                <Reveal>
                  <div className="mb-14 max-w-3xl tab-sand-block">
                    <div className="tab-sand-label mb-3">Want to check it</div>
                    <div className="tab-sand-text">{study.verify}</div>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Next steps */}
            <div className="container">
              <Reveal>
                <div className="border-t border-border pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Bring me a similar problem
                    </div>
                    <button
                      onClick={() => goToSection("contact", navigate)}
                      className="inline-block px-6 py-3 bg-[#8FA83B] text-white font-medium rounded-md hover:bg-[#7d9435] transition-all duration-200 active:scale-[0.97]"
                    >
                      Book a strategy diagnosis
                    </button>
                  </div>

                  {next && next.slug !== study.slug && (
                    <Link
                      href={`/case/${next.slug}`}
                      className="text-sm text-muted-foreground hover:text-charcoal transition-colors text-left sm:text-right"
                    >
                      <span className="block text-xs uppercase tracking-wider mb-1">Next</span>
                      <span className="font-medium text-charcoal">{next.client} &rarr;</span>
                    </Link>
                  )}
                </div>
              </Reveal>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

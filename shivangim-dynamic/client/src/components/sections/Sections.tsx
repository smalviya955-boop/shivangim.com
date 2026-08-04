/**
 * Supporting sections below the narrative: operating areas (interactive
 * selector), process, offers, and proof. All copy comes from content/site.ts.
 */
import { useState } from "react";
import { Link } from "wouter";
import Reveal from "@/components/Reveal";
import { CountStat } from "@/components/CountFigure";
import { Doodle } from "@/components/Doodle";
import {
  OPERATING_AREAS,
  PROCESS_STEPS,
  OFFERS,
  PROOF_STATS,
  PROJECTS,
  BRAND,
  SECTION_COPY,
} from "@/content/site";

export function OperatingAreasSection() {
  const [active, setActive] = useState(0);
  const area = OPERATING_AREAS[active];

  return (
    <section id="operating" className="py-20 md:py-28 scroll-mt-24">
      <div className="container">
        <Reveal>
          <div className="section-label mb-5">
            <span>{SECTION_COPY.operating.label}</span>
          </div>
          <h2 className="text-3xl md:text-[2.6rem] font-bold text-charcoal max-w-2xl leading-[1.2]">
            {SECTION_COPY.operating.heading}
          </h2>
          <p className="mt-4 text-warm-gray max-w-2xl leading-relaxed">
            {SECTION_COPY.operating.sub}
          </p>
        </Reveal>

        <Reveal delay={110}>
          <div className="flex flex-wrap gap-2 mt-9" role="tablist" aria-label="Business type">
            {OPERATING_AREAS.map((a, i) => (
              <button
                key={a.label}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className="px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200"
                style={{
                  background: i === active ? BRAND.colors.charcoal : "transparent",
                  color: i === active ? "#fff" : "oklch(0.5 0.02 60)",
                  border: i === active ? "1px solid transparent" : "1px solid rgba(0,0,0,0.1)",
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div key={area.label} className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-8 tab-content">
          <div className="lg:col-span-3 rounded-2xl p-7 md:p-8 bg-white border border-border/50 shadow-sm">
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: area.accent }}
            >
              {area.label}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-3 leading-snug">
              {area.title}
            </h3>
            <p className="text-warm-gray text-sm leading-relaxed mb-5">{area.desc}</p>
            <div
              className="text-[11px] tracking-wide mb-6 px-3 py-2 rounded-md inline-block"
              style={{
                fontFamily: "JetBrains Mono",
                background: `${area.accent}14`,
                color: area.accent,
              }}
            >
              {area.signal}
            </div>
            <div className="border-t border-border/50 pt-5">
              {area.pipeline.map((step, i) => (
                <div key={step} className="flex items-start gap-3 mb-2.5">
                  <span
                    className="badge-num shrink-0"
                    style={{ background: `${area.accent}18`, color: area.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-foreground/70 leading-relaxed pt-1">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 tab-value-block flex items-center">
            <div>
              <div className="tab-value-label mb-3">{SECTION_COPY.operating.valueLabel}</div>
              <div className="tab-value-text">{area.why}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="py-20 md:py-28 scroll-mt-24" style={{ background: "oklch(0.94 0.02 80)" }}>
      <div className="container">
        <Reveal>
          <div className="section-label mb-5">
            <span>{SECTION_COPY.process.label}</span>
          </div>
          <h2 className="text-3xl md:text-[2.6rem] font-bold text-charcoal max-w-3xl leading-[1.2]">
            {SECTION_COPY.process.heading}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 90}>
              <div className="rounded-2xl p-7 border border-border/50 bg-white shadow-sm card-hover relative h-full">
                <span className="system-badge-light absolute top-5 right-5">
                  STEP {step.num}
                </span>
                <div className="text-3xl font-bold mb-4 metric-stat">{step.num}</div>
                <h3 className="text-lg font-bold text-charcoal mb-3 pr-16">{step.title}</h3>
                <p className="text-sm text-warm-gray leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OffersSection() {
  return (
    <section id="offers" className="py-20 md:py-28 scroll-mt-24">
      <div className="container">
        <Reveal>
          <div className="section-label mb-5">
            <span>{SECTION_COPY.offers.label}</span>
          </div>
          <h2 className="text-3xl md:text-[2.6rem] font-bold text-charcoal max-w-3xl leading-[1.2]">
            {SECTION_COPY.offers.heading}
          </h2>
          <p className="mt-4 text-warm-gray max-w-2xl leading-relaxed">
            {SECTION_COPY.offers.sub}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {OFFERS.map((offer, i) => (
            <Reveal key={offer.title} delay={i * 100}>
              <div
                className="rounded-2xl p-7 card-hover relative overflow-hidden h-full flex flex-col"
                style={{
                  background: offer.dark ? BRAND.colors.charcoal : "#fff",
                  borderTop: `4px solid ${offer.accent}`,
                  border: offer.dark ? "none" : "1px solid rgba(0,0,0,0.06)",
                  borderTopWidth: 4,
                  borderTopColor: offer.accent,
                  borderTopStyle: "solid",
                }}
              >
                <span
                  className={
                    offer.dark
                      ? "system-badge absolute top-5 right-5"
                      : "system-badge-light absolute top-5 right-5"
                  }
                >
                  {offer.code}
                </span>
                <h3
                  className={`text-xl font-bold mb-3 pr-16 ${offer.dark ? "text-white" : "text-charcoal"}`}
                  style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                >
                  {offer.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-6 ${offer.dark ? "text-white/60" : "text-muted-foreground"}`}
                >
                  {offer.desc}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {offer.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span
                        className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                        style={{ background: offer.accent }}
                      />
                      <span className={`text-sm ${offer.dark ? "text-white/80" : "text-foreground/80"}`}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="inline-block px-5 py-2.5 text-sm font-medium rounded-md transition-all duration-200 active:scale-[0.97] bg-[#8FA83B] text-white hover:bg-[#7d9435] self-start"
                >
                  {offer.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProofSection() {
  const types = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.type)))];
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.type === filter);

  return (
    <section id="proof" className="py-20 md:py-28 scroll-mt-24">
      <div className="container">
        <Reveal>
          <div className="section-label mb-5">
            <span>{SECTION_COPY.proof.label}</span>
          </div>
          <h2 className="text-3xl md:text-[2.6rem] font-bold text-charcoal max-w-3xl leading-[1.2]">
            {SECTION_COPY.proof.headingBefore}
            <Doodle kind="underline" color={BRAND.colors.lime} delay={400}>
              {SECTION_COPY.proof.headingEmphasis}
            </Doodle>
            .
          </h2>
          <p className="mt-4 text-warm-gray max-w-2xl leading-relaxed">
            {SECTION_COPY.proof.sub}
          </p>
        </Reveal>

        <Reveal delay={110}>
          <div className="rounded-2xl p-8 md:p-10 mt-10" style={{ background: BRAND.colors.charcoal }}>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8FA83B] mb-6">
              {SECTION_COPY.proof.metricsLabel}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {PROOF_STATS.map((s) => (
                <CountStat key={s.desc} target={s.target} suffix={s.suffix} desc={s.desc} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="flex flex-wrap gap-2 mt-10">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className="px-3.5 py-2 text-xs font-medium rounded-full transition-all duration-200"
                style={{
                  background: filter === t ? BRAND.colors.charcoal : "transparent",
                  color: filter === t ? "#fff" : "oklch(0.5 0.02 60)",
                  border: filter === t ? "1px solid transparent" : "1px solid rgba(0,0,0,0.1)",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          {visible.map((p) => (
            <div
              key={p.company}
              className="rounded-xl p-6 card-hover relative overflow-hidden bg-white tab-content"
              style={{
                borderLeft: `4px solid ${p.accent}`,
                border: "1px solid rgba(0,0,0,0.06)",
                borderLeftWidth: 4,
                borderLeftColor: p.accent,
                borderLeftStyle: "solid",
              }}
            >
              <span className="system-badge-light absolute top-4 right-4">{p.code}</span>
              <div
                className="text-xs font-semibold uppercase tracking-wider mb-3 pr-20"
                style={{ color: p.accent }}
              >
                {p.company} | {p.type}
              </div>
              <h3 className="text-base font-bold text-charcoal mb-2 leading-snug">{p.title}</h3>
              <ul className="space-y-1.5">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ background: p.accent }}
                    />
                    <span className="text-xs leading-relaxed text-foreground/60">{b}</span>
                  </li>
                ))}
              </ul>

              {p.slug && (
                <Link
                  href={`/case/${p.slug}`}
                  className="inline-block mt-4 text-xs font-semibold hover:underline"
                  style={{ color: p.accent }}
                >
                  Read the full story &rarr;
                </Link>
              )}
            </div>
          ))}
        </div>

        <Reveal delay={80}>
          <p className="mt-8 text-sm text-warm-gray max-w-2xl leading-relaxed">
            {SECTION_COPY.proof.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

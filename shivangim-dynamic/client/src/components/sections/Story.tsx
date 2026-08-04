/**
 * The narrative spine: hook -> three proof beats -> meta-line.
 *
 * Structure mirrors the brand video script. Each scene occupies its own band of
 * the page and reveals on scroll; doodle annotations draw themselves on the
 * exact phrase the script marks. Proof beats alternate charcoal / sand so the
 * page keeps the light-dark rhythm of the Signal & Strategy system.
 */
import Reveal from "@/components/Reveal";
import { Doodle, Starburst, DoodleDivider } from "@/components/Doodle";
import { CountFigure } from "@/components/CountFigure";
import { HOOK, PROOF_BEATS, META, BRAND, type ProofBeat } from "@/content/site";

function Hook() {
  return (
    <section className="pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="container">
        <Reveal>
          <div className="section-label mb-6">
            <span>{HOOK.eyebrow}</span>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="text-[2.1rem] sm:text-5xl lg:text-[4.1rem] leading-[1.08] font-bold text-charcoal max-w-4xl">
            {HOOK.headlineBefore}
            <br />
            {HOOK.headlineLeadIn}
            <Doodle kind="circle" delay={520} weight={2.6}>
              {HOOK.headlineCircled}
            </Doodle>
            {HOOK.headlineAfter}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-8 text-lg md:text-xl text-charcoal/80 max-w-2xl leading-snug font-medium">
            {HOOK.subLead}
          </p>
          <p className="mt-4 text-base text-warm-gray max-w-2xl leading-relaxed">
            {HOOK.sub}
          </p>
        </Reveal>

        <Reveal delay={290}>
          <div className="flex flex-wrap gap-4 mt-9">
            <a
              href={HOOK.primaryCta.href}
              className="px-6 py-3 bg-[#8FA83B] text-white font-medium rounded-md hover:bg-[#7d9435] transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#8FA83B]/20"
            >
              {HOOK.primaryCta.label}
            </a>
            <a
              href={HOOK.secondaryCta.href}
              className="px-6 py-3 border-2 border-charcoal/20 text-charcoal font-medium rounded-md hover:border-charcoal/40 hover:bg-charcoal/5 transition-all duration-200 active:scale-[0.97]"
            >
              {HOOK.secondaryCta.label}
            </a>
          </div>
        </Reveal>

        <Reveal delay={380}>
          <div className="flex flex-wrap gap-2 mt-8">
            {HOOK.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 border border-border rounded-full text-sm text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Beat({ beat, index }: { beat: ProofBeat; index: number }) {
  const dark = index % 2 === 0;

  return (
    <section className={dark ? "py-20 md:py-28 glass-dark-band" : "py-20 md:py-28"}>
      <div className="container max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-3 mb-7 flex-wrap">
            <span className="system-badge">{beat.code}</span>
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: beat.accent }}
            >
              {beat.client}
            </span>
            <span
              className="text-[11px] tracking-wide"
              style={{
                fontFamily: "JetBrains Mono",
                color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.38)",
              }}
            >
              {beat.signal}
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="text-2xl md:text-[2.4rem] leading-[1.2] font-bold max-w-3xl"
            style={{ color: dark ? "#fff" : undefined }}
          >
            {beat.setup}
          </h2>
        </Reveal>

        {beat.figure && (
          <Reveal delay={170}>
            <div className="mt-10">
              <CountFigure
                from={beat.figure.from}
                to={beat.figure.to}
                caption={beat.figure.caption}
                color={beat.accent}
              />
            </div>
          </Reveal>
        )}

        <Reveal delay={beat.figure ? 260 : 170}>
          <p
            className="mt-9 text-lg md:text-2xl leading-[1.55] max-w-3xl"
            style={{
              fontFamily: "DM Serif Display, Georgia, serif",
              color: dark ? "rgba(255,255,255,0.9)" : undefined,
            }}
          >
            {beat.insightBefore}
            <Doodle kind={beat.emphasisKind} delay={420} weight={2.4}>
              {beat.emphasis}
            </Doodle>
            {beat.insightAfter}
          </p>
        </Reveal>

        {beat.detail && (
          <div className="mt-8 space-y-2 max-w-2xl">
            {beat.detail.map((line, i) => (
              <Reveal key={line} delay={340 + i * 130} distance={18}>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)" }}
                >
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MetaLine() {
  return (
    <section className="py-24 md:py-32" style={{ background: "oklch(0.94 0.02 80)" }}>
      <div className="container max-w-4xl text-center">
        <Reveal>
          <div className="section-label mb-8 justify-center">
            <span>{META.label}</span>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <h2 className="text-[1.75rem] sm:text-4xl md:text-[3.1rem] leading-[1.32] font-bold text-charcoal">
            {META.before}
            <Doodle kind="circle" delay={560} weight={2.4}>
              {META.emphasis}
            </Doodle>
          </h2>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-10 text-base md:text-lg text-warm-gray">{META.sub}</p>
        </Reveal>

        <Reveal delay={300}>
          <p
            className="mt-2 text-xl md:text-2xl text-charcoal inline-flex items-center gap-2 flex-wrap justify-center"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            {META.subEmphasis}
            <Starburst color={BRAND.colors.coral} delay={700} />
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function Story() {
  return (
    <>
      <Hook />
      <div id="story" className="scroll-anchor" />
      {PROOF_BEATS.map((beat, i) => (
        <div key={beat.id}>
          {i > 0 && !((i - 1) % 2 === 0) && <DoodleDivider color={BRAND.colors.coral} />}
          <Beat beat={beat} index={i} />
        </div>
      ))}
      <MetaLine />
    </>
  );
}

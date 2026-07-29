/**
 * Verification block.
 *
 * Buyers with a procurement process ask for trade and bank references before
 * they can raise a PO. Saying up front that those exist removes a stall without
 * publishing a single client name.
 */
import Reveal from "@/components/Reveal";
import { BRAND, CREDENTIALS } from "@/content/site";

export default function Credentials() {
  return (
    <section id="verification" className="py-20 md:py-24 scroll-mt-24">
      <div className="container">
        <div className="rounded-2xl p-8 md:p-12" style={{ background: BRAND.colors.charcoal }}>
          <Reveal>
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-5"
              style={{ color: BRAND.colors.lime }}
            >
              {CREDENTIALS.label}
            </div>
            <h2
              className="text-2xl md:text-[2.1rem] font-bold text-white max-w-2xl leading-[1.25]"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              {CREDENTIALS.heading}
            </h2>
            <p className="mt-4 text-white/55 max-w-2xl text-sm md:text-base leading-relaxed">
              {CREDENTIALS.sub}
            </p>
          </Reveal>

          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7 mt-10">
            {CREDENTIALS.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} distance={20}>
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="badge-num shrink-0 mt-0.5"
                    style={{ background: "rgba(143,168,59,0.15)", color: BRAND.colors.lime }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <dt className="text-base font-semibold text-white mb-1.5">{item.title}</dt>
                    <dd className="text-sm text-white/55 leading-relaxed">{item.detail}</dd>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={340}>
            <p className="mt-10 pt-6 border-t border-white/10 text-xs text-white/40 leading-relaxed max-w-2xl">
              {CREDENTIALS.note}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

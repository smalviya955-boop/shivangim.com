/**
 * FAQ + lead capture.
 *
 * Submission is tried in three steps, stopping at the first that works:
 *
 *   1. Netlify Forms — POST url-encoded to "/" with `form-name`. Netlify stores
 *      the submission and emails it on. Needs the hidden static form in
 *      index.html (Netlify only registers forms it can see in built HTML) and
 *      form detection enabled on the project.
 *   2. `POST /api/leads` — the Express API, for when this runs on a Node host.
 *   3. A pre-filled mailto — last resort, so an enquiry is never lost silently.
 *
 * Whichever path runs, the visitor sees the same confirmation.
 */
import { useState } from "react";
import { toast } from "sonner";
import Reveal from "@/components/Reveal";
import { BRAND, CONTACT, FAQS } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "fallback";

interface LeadPayload {
  name: string;
  email: string;
  company: string;
  business: string;
  message: string;
}

/** The form name registered by the hidden static form in index.html. */
const NETLIFY_FORM_NAME = "lead";

/** Netlify Forms: url-encoded POST to the site root. */
async function submitToNetlify(lead: LeadPayload): Promise<boolean> {
  const body = new URLSearchParams({
    "form-name": NETLIFY_FORM_NAME,
    name: lead.name,
    email: lead.email,
    company: lead.company,
    business: lead.business,
    message: lead.message,
  });

  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** The Express API, for Node hosting. */
async function submitToApi(lead: LeadPayload): Promise<boolean> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function mailtoFor(lead: LeadPayload) {
  const subject = encodeURIComponent(
    `Strategy enquiry from ${lead.name}${lead.company ? ` at ${lead.company}` : ""}`,
  );
  const body = encodeURIComponent(
    [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Company: ${lead.company}`,
      `Business type: ${lead.business}`,
      "",
      "What needs fixing:",
      lead.message,
    ].join("\n"),
  );
  return `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
}

function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const lead: LeadPayload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      business: String(data.get("business") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    setStatus("sending");

    // The single-file preview build has nothing behind it — show the success
    // state rather than throwing the visitor into their mail client.
    if ((window as { __PREVIEW__?: boolean }).__PREVIEW__) {
      setTimeout(() => {
        setStatus("sent");
        form.reset();
        toast.success("Preview only — on the live site this is delivered to your inbox.");
      }, 500);
      return;
    }

    const delivered = (await submitToNetlify(lead)) || (await submitToApi(lead));

    if (delivered) {
      setStatus("sent");
      form.reset();
      toast.success("Got it. I'll come back with where the pain looks like it's sitting.");
      return;
    }

    // Nothing accepted the submission — hand the visitor a drafted email so the
    // enquiry still reaches an inbox.
    setStatus("fallback");
    toast.message("Opening your email app instead", {
      description: "The form couldn't reach the server, so I've drafted the email for you.",
    });
    window.location.href = mailtoFor(lead);
  };

  if (status === "sent") {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4 metric-stat">01</div>
        <h3 className="text-xl font-bold mb-2 text-white">Enquiry received.</h3>
        <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
          I read every one myself. Expect a reply with a first read on where the pain is showing up.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs text-[#8FA83B] hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#8FA83B] transition-colors";
  const labelClass = "block text-[10px] uppercase tracking-wider text-white/50 mb-1";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass} htmlFor="lead-name">
            Name
          </label>
          <input id="lead-name" name="name" type="text" required className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label className={labelClass} htmlFor="lead-email">
            Email
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass} htmlFor="lead-company">
            Company
          </label>
          <input id="lead-company" name="company" type="text" className={inputClass} placeholder="Company name" />
        </div>
        <div>
          <label className={labelClass} htmlFor="lead-business">
            Business type
          </label>
          <select
            id="lead-business"
            name="business"
            className={`${inputClass} appearance-none`}
            defaultValue=""
          >
            <option value="" className="text-charcoal">
              Select type
            </option>
            {CONTACT.businessTypes.map((t) => (
              <option key={t} value={t} className="text-charcoal">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="lead-message">
          What needs fixing?
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="Example: we're hiring salespeople but nobody agrees on who we sell to..."
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-2.5 bg-[#8FA83B] text-white font-medium rounded-lg hover:bg-[#7d9435] transition-all duration-200 active:scale-[0.97] text-sm disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send the problem"}
      </button>
      <p className="text-[11px] text-white/35 leading-relaxed">
        Goes straight to me. No sequence, no newsletter.
      </p>
    </form>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 scroll-mt-24 glass-band">
      <div className="container">
        <Reveal>
          <div className="section-label mb-5">
            <span>{CONTACT.label}</span>
          </div>
          <h2 className="text-3xl md:text-[2.6rem] font-bold text-charcoal max-w-2xl leading-[1.2]">
            Quick answers before we talk.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 mt-10">
          <div className="lg:col-span-3 space-y-3">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 70}>
                <details className="rounded-xl overflow-hidden glass-panel group">
                  <summary className="px-5 py-4 text-sm font-medium text-charcoal cursor-pointer select-none list-none flex items-center justify-between gap-4">
                    {faq.q}
                    <span className="text-muted-foreground text-lg shrink-0 group-open:rotate-45 transition-transform duration-200">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-warm-gray leading-relaxed">{faq.a}</div>
                </details>
              </Reveal>
            ))}

            <Reveal delay={300}>
              <div className="tab-sand-block glass-panel mt-6">
                <div className="tab-sand-label mb-3">Reach me directly</div>
                <div className="space-y-1.5 text-sm">
                  <div className="text-muted-foreground">
                    Email:{" "}
                    <a href={`mailto:${BRAND.email}`} className="text-charcoal hover:text-[#8FA83B]">
                      {BRAND.email}
                    </a>
                  </div>
                  <div className="text-muted-foreground">
                    Phone:{" "}
                    <a href={BRAND.phoneHref} className="text-charcoal hover:text-[#8FA83B]">
                      {BRAND.phone}
                    </a>
                  </div>
                  <div className="text-muted-foreground">
                    LinkedIn:{" "}
                    <a
                      href={BRAND.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-charcoal hover:text-[#8FA83B]"
                    >
                      {BRAND.linkedinLabel}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140} className="lg:col-span-2">
            <div className="bg-[#1A1A1A] rounded-2xl p-7 md:p-8 text-white h-full">
              <div className="system-badge mb-4 inline-flex">CONTACT</div>
              <h3 className="text-xl font-bold mb-2">{CONTACT.heading}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{CONTACT.sub}</p>
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

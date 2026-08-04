/**
 * SITE CONTENT — single source of truth.
 *
 * Every word on the site lives here. Edit this file to change copy; you never
 * need to touch a component. Structure follows the brand video script:
 * hook -> three proof beats -> meta-line -> offer.
 */

export const BRAND = {
  name: "Shivangi Malviya",
  role: "Market Discovery & GTM Consultant",
  email: "hello@shivangim.com",
  phone: "+91 98066 47672",
  phoneHref: "tel:+919806647672",
  linkedin: "https://linkedin.com/in/shivangi-malviya1105",
  linkedinLabel: "linkedin.com/in/shivangi-malviya1105",
  location: "Madhya Pradesh and Central India",
  colors: {
    lime: "#8FA83B",
    coral: "#E07050",
    blue: "#6B8BB5",
    teal: "#5FB8A0",
    violet: "#B8A0D0",
    charcoal: "#1A1A1A",
  },
} as const;

/** Sections in scroll order — drives the nav and the scroll-spy. */
export const NAV_SECTIONS = [
  { id: "story", label: "The method" },
  { id: "offers", label: "Offers" },
  { id: "operating", label: "What I help with" },
  { id: "proof", label: "Proof" },
  { id: "words", label: "In their words" },
  { id: "contact", label: "Contact" },
] as const;

// ─────────────────────────────────────────────────────────────
// Scene 1 — Hook
// ─────────────────────────────────────────────────────────────
export const HOOK = {
  eyebrow: "Market Discovery & GTM Consultant",
  /** Split so the doodle circle lands on the exact phrase. */
  headlineBefore: "I don't guess your ICP.",
  headlineLeadIn: "I find ",
  headlineCircled: "where the pain already lives.",
  headlineAfter: "",
  sub: "I help early-stage teams find where demand already exists, sharpen positioning, and build a GTM strategy on evidence instead of assumptions.",
  primaryCta: { label: "Book a GTM strategy call", href: "#contact" },
  secondaryCta: { label: "See proof of work", href: "#proof" },
  tags: ["Market discovery", "Positioning", "GTM strategy", "Launch execution"],
};

// ─────────────────────────────────────────────────────────────
// Scenes 2-4 — Three proof beats (rule of three)
// ─────────────────────────────────────────────────────────────
export interface ProofBeat {
  id: string;
  client: string;
  code: string;
  /** The problem, stated the way the client felt it. */
  setup: string;
  /** Optional animated number reveal. */
  figure?: { from: number; to: number; caption: string };
  /** Optional single stat when there's no from/to movement. */
  stat?: { value: string; caption: string };
  /** The line that carries the insight; the doodle lands on `emphasis`. */
  insightBefore: string;
  emphasis: string;
  insightAfter: string;
  emphasisKind: "circle" | "underline" | "arrow" | "box";
  /** Extra beats revealed in sequence. Optional. */
  detail?: string[];
  accent: string;
  /** Where the signal was actually found — shown as a small label. */
  signal: string;
}

export const PROOF_BEATS: ProofBeat[] = [
  {
    id: "creditright",
    client: "CreditRight",
    code: "SIG 01",
    setup: "CreditRight needed real prospects, not a spreadsheet of maybes.",
    figure: {
      from: 5754,
      to: 2194,
      caption: "companies scored down to accounts that actually fit",
    },
    insightBefore: "Mined public GST filings to find ",
    emphasis: "who actually fit",
    insightAfter: ".",
    emphasisKind: "arrow",
    accent: BRAND.colors.lime,
    signal: "Signal found in: public GST filings",
  },
  {
    id: "testkart",
    client: "TestKart",
    code: "SIG 02",
    setup: "TestKart's buyers weren't sitting on LinkedIn.",
    insightBefore: "They were inside ",
    emphasis: "coaching centers and campus ambassador networks",
    insightAfter: ".",
    emphasisKind: "circle",
    accent: BRAND.colors.coral,
    signal: "Signal found in: offline education networks",
  },
  {
    id: "plucia",
    client: "Plucia",
    code: "SIG 03",
    setup: "Plucia's ICP was hiding in a job posting.",
    insightBefore: "Whoever's hiring a sales intern, telecaller, or BDM ",
    emphasis: "already has the problem",
    insightAfter: ".",
    emphasisKind: "underline",
    detail: [
      "Real estate closes by the second.",
      "B2B SaaS needs an instant reply.",
      "Both need speed. Both were hiding in plain sight.",
    ],
    accent: BRAND.colors.blue,
    signal: "Signal found in: live hiring posts",
  },
];

// ─────────────────────────────────────────────────────────────
// Scene 5 — Meta-line (the turn)
// ─────────────────────────────────────────────────────────────
export const META = {
  label: "The Signal Method",
  before: "Same question, every time: ",
  emphasis: "where does the pain already show up?",
  after: "",
  sub: "Not a filter. Not a tool.",
  subEmphasis: "A different answer, every client.",
};

// ─────────────────────────────────────────────────────────────
// Operating areas
// ─────────────────────────────────────────────────────────────
export interface OperatingArea {
  label: string;
  title: string;
  desc: string;
  /** Where the buying signal usually hides for this business type. */
  signal: string;
  pipeline: string[];
  accent: string;
  why: string;
}

export const OPERATING_AREAS: OperatingArea[] = [
  {
    label: "Tech & SaaS",
    title: "Product direction and GTM without random tactics.",
    desc: "For early teams with product momentum but unclear priorities. We turn founder knowledge into product positioning, roadmap choices, launch messages, proof assets, and a channel sequence.",
    signal: "Usually hiding in: hiring posts, support tickets, churn reasons",
    pipeline: [
      "Define the strongest customer problem and product promise.",
      "Prioritize roadmap, packaging, and launch assets.",
      "Run discovery, launch, and sales learning loops.",
      "Convert learnings into product and GTM decisions.",
    ],
    accent: BRAND.colors.lime,
    why: "You get a clear product story and GTM sequence instead of scattered tactics.",
  },
  {
    label: "D2C brands",
    title: "From first order to repeat demand.",
    desc: "From first listing to repeat orders. We define the brand promise, select channels, build the launch narrative, and set up the feedback loop from customer behavior back to product decisions.",
    signal: "Usually hiding in: return reasons, review text, repeat-order gaps",
    pipeline: [
      "Map the customer journey from awareness to repeat purchase.",
      "Select and sequence the right channels for the product stage.",
      "Build launch assets: messaging, social proof, and conversion flows.",
      "Set up measurement for channel ROI and retention.",
    ],
    accent: BRAND.colors.coral,
    why: "You stop burning ad spend on unclear positioning and start building repeat demand.",
  },
  {
    label: "Manufacturers",
    title: "Moving from production capacity to market demand.",
    desc: "For manufacturers building direct-to-buyer channels or upgrading from traditional distribution. We align product packaging, pricing, and GTM for modern buyer expectations.",
    signal: "Usually hiding in: import-export records, tender listings, distributor margins",
    pipeline: [
      "Audit current buyer segments and channel economics.",
      "Define the value proposition for direct vs. wholesale buyers.",
      "Build the digital presence and sales funnel.",
      "Implement CRM and pipeline tracking for the new motion.",
    ],
    accent: BRAND.colors.blue,
    why: "You move from being a production unit to a market-facing brand with predictable revenue.",
  },
  {
    label: "Real estate",
    title: "From inventory to conversion for property launches.",
    desc: "For new projects, township launches, and commercial developments. We create the positioning, build the funnel, and set up the sales team for consistent conversion.",
    signal: "Usually hiding in: enquiry response times, site-visit drop-off, broker call logs",
    pipeline: [
      "Define the project positioning and target buyer profile.",
      "Design the lead capture funnel and qualification logic.",
      "Build sales scripts, site visit flow, and follow-up cadence.",
      "Set up weekly pipeline review and performance tracking.",
    ],
    accent: BRAND.colors.violet,
    why: "You get a repeatable sales motion instead of depending on individual broker relationships.",
  },
  {
    label: "Clinics & institutes",
    title: "Admissions and enrollment that actually convert.",
    desc: "For coaching institutes, clinics, and education businesses. We fix the trust gaps, optimize the enrollment funnel, and create retention systems that keep students engaged.",
    signal: "Usually hiding in: week-one drop-off, counsellor call notes, referral patterns",
    pipeline: [
      "Audit the current enrollment journey and drop-off points.",
      "Fix the trust gaps between first contact and enrollment.",
      "Build onboarding sequences that reduce week-one attrition.",
      "Set up referral systems and alumni engagement loops.",
    ],
    accent: BRAND.colors.teal,
    why: "You stop losing students after week one and build a sustainable enrollment pipeline.",
  },
];

// ─────────────────────────────────────────────────────────────
// Offers
// ─────────────────────────────────────────────────────────────
export interface Offer {
  title: string;
  desc: string;
  bullets: string[];
  cta: string;
  dark: boolean;
  accent: string;
  code: string;
}

export const OFFERS: Offer[] = [
  {
    title: "Market & GTM clarity sprint",
    desc: "A focused one-time engagement for market discovery, positioning, offer cleanup, channel choice, or launch planning. Best for founders with traction but no agreement on who the buyer is.",
    bullets: [
      "Market discovery and demand-signal audit",
      "Current product and funnel diagnosis",
      "Positioning, messaging, and channel priorities",
      "90-day action plan",
    ],
    cta: "Book a GTM strategy call",
    dark: false,
    accent: BRAND.colors.lime,
    code: "MOD 01",
  },
  {
    title: "Fractional Product & GTM Partner",
    desc: "Ongoing support with 2-3 working sessions a week for founders who need product and market thinking without a full-time senior hire. Best for teams past first revenue, deciding what to scale.",
    bullets: [
      "Weekly execution rhythm",
      "Roadmap, offer, and launch guidance",
      "Product, sales, and marketing alignment",
    ],
    cta: "Book a GTM strategy call",
    dark: true,
    accent: BRAND.colors.lime,
    code: "MOD 02",
  },
  {
    title: "Launch command room",
    desc: "For new products, real estate launches, institute admissions, clinic campaigns, or brand launches with a fixed timeline. Best when the launch date is already committed to the market.",
    bullets: [
      "Product promise, launch narrative, and calendar",
      "Lead capture and follow-up flow",
      "Weekly launch review",
    ],
    cta: "Book a GTM strategy call",
    dark: false,
    accent: BRAND.colors.blue,
    code: "MOD 03",
  },
];

/**
 * The Signal Method — six steps, in order. Every step produces something you can
 * check, so when a conclusion is wrong you can trace it back instead of guessing.
 */
export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Signal sources",
    desc: "Find where the pain already shows up. Filings, hiring posts, support tickets, drop-off points, call logs, offline networks.",
  },
  {
    num: "02",
    title: "Evidence",
    desc: "Pull the raw records. No interpretation yet. Just what is verifiably true.",
  },
  {
    num: "03",
    title: "Pattern discovery",
    desc: "Find what the buyers who already have the problem have in common.",
  },
  {
    num: "04",
    title: "Positioning",
    desc: "Write down who it is for and what actually changes for them.",
  },
  {
    num: "05",
    title: "GTM strategy",
    desc: "Choose the channel, the sequence, and the proof each stage needs.",
  },
  {
    num: "06",
    title: "Execution",
    desc: "Build the working assets, run the loop, and tune weekly on what the market did. Roadmap notes, briefs, messaging, scripts, CRM rules. Things the team uses on Monday.",
  },
];

// ─────────────────────────────────────────────────────────────
// Proof
// ─────────────────────────────────────────────────────────────
export const PROOF_STATS = [
  { target: 5754, suffix: "", desc: "companies scored from a raw GST dataset" },
  { target: 2194, suffix: "", desc: "qualified accounts into an outbound pipeline" },
  { target: 3, suffix: " days", desc: "to build a custom CRM with routing" },
  { target: 250, suffix: "+", desc: "compliance obligations mapped to an OS" },
];

export interface Project {
  company: string;
  type: string;
  title: string;
  bullets: string[];
  accent: string;
  code: string;
  /** Links the card to its full write-up at /case/<slug>. */
  slug?: string;
}

export const PROJECTS: Project[] = [
  {
    company: "CreditRight",
    type: "Product + GTM",
    title: "Built the market-entry system as the first product and GTM hire.",
    bullets: [
      "5,754 companies scored into 2,194 qualified accounts",
      "4-touch, 14-day outbound sequence",
      "Competitive narrative across 13 platforms",
    ],
    accent: BRAND.colors.lime,
    code: "SYS 01",
    slug: "creditright",
  },
  {
    company: "TestKart",
    type: "GTM strategy",
    title: "Found the buyers offline when digital channels went quiet.",
    bullets: [
      "Coaching centers mapped as the real distribution layer",
      "Campus ambassador network built as a channel",
      "Channel choice driven by where buyers already gather",
    ],
    accent: BRAND.colors.coral,
    code: "SYS 02",
    slug: "testkart",
  },
  {
    company: "Plucia",
    type: "ICP engineering",
    title: "Turned live job postings into a buying-intent signal.",
    bullets: [
      "Hiring a telecaller, BDM, or sales intern = active pain",
      "Real estate and B2B SaaS mapped to a shared speed problem",
      "Outreach targeted at intent, not at firmographics",
    ],
    accent: BRAND.colors.blue,
    code: "SYS 03",
    slug: "plucia",
  },
  {
    company: "Vishwamitra",
    type: "Product management",
    title: "Shipped an AI voice-input feature after finding the real adoption blocker.",
    bullets: [
      "Completion rate rose 20%",
      "Onboarding drop-off reduced 10%",
      "Discovery-to-build loop closed in one sprint",
    ],
    accent: BRAND.colors.teal,
    code: "SYS 04",
    slug: "vishwamitra",
  },
  {
    company: "Life science instrument company, USA",
    type: "Ops + product feedback",
    title: "Turned support friction into automation and product requirements.",
    bullets: [
      "Manual work cut 40%",
      "Resolution time reduced 30%",
      "2 product improvements shipped from feedback",
    ],
    accent: BRAND.colors.violet,
    code: "SYS 05",
    slug: "life-science-instrument-company",
  },
  {
    company: "Gaming company, USA",
    type: "Systems build",
    title: "Designed a lightweight compliance operating system.",
    bullets: [
      "India, US, privacy, FTC, and FDA obligations",
      "650-line Apps Script automation engine",
      "Built with Google Workspace, Forms, Drive, Python",
    ],
    accent: BRAND.colors.lime,
    code: "SYS 06",
    slug: "gaming-company-compliance",
  },
];

// ─────────────────────────────────────────────────────────────
// Testimonials — the qualitative half of the proof
//
// Numbers show what happened; a named person shows someone was there and would
// do it again. Buyers use the second to decide whether to believe the first.
//
// NOTHING GOES IN HERE WITHOUT THE CLIENT'S PERMISSION. Names, titles, company
// names, logos and message screenshots all need an explicit yes. A screenshot
// of a private chat is still that person's words.
//
// Quotes are reproduced exactly as given, punctuation included. Do not edit them
// for house style.
//
// The section hides itself while this list is empty, so the site never shows an
// empty "testimonials" heading. Fill one in and it appears.
// ─────────────────────────────────────────────────────────────
export interface Testimonial {
  /** The quote itself. Keep their own wording, including the rough bits. */
  quote: string;
  /**
   * "client" — a buyer talking about a result. These carry the most weight and
   * are shown first.
   * "colleague" — someone who worked alongside her talking about how she works.
   * Shown separately, because a peer endorsement is evidence of competence, not
   * of an outcome, and blurring the two weakens both.
   */
  kind: "client" | "colleague";
  /** Leave empty when the person or company will not go on record by name. */
  name?: string;
  /** Their title — adds more credibility than the company alone. */
  role?: string;
  /** Company, or a description of it when the name is withheld. */
  company: string;
  /** Optional: which case study this person is talking about (a CASE_STUDIES slug). */
  caseSlug?: string;
  /** Optional public link a reader can check the quote against, e.g. a LinkedIn recommendation. */
  sourceUrl?: string;
  /** Label for that link — "Verify on LinkedIn". */
  sourceLabel?: string;
  /**
   * Optional path to a screenshot of the original message, e.g.
   * "/testimonials/creditright-whatsapp.png" — put the file in client/public/.
   * Blur phone numbers and anything personal before exporting it.
   */
  screenshot?: string;
  /** Alt text for the screenshot — required if `screenshot` is set. */
  screenshotAlt?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  // Both of these gave permission to be named, and asked for the name to be
  // left off anyway. Title and company stay, so the seniority is still clear.
  {
    quote:
      "We had thousands of companies in a spreadsheet and no way to tell which ones actually had the problem we solved. Shivangi went into public GST filings and came back with a scored list of 2,194 accounts, plus the sequence and the CRM to work them. It turned an argument about who our buyer was into something we could act on.",
    kind: "client",
    role: "CEO & Founder",
    company: "CreditRight",
    caseSlug: "creditright",
  },
  {
    quote:
      "We assumed our messaging was the problem and kept iterating on it. Shivangi worked out our buyers weren't on the channels we were paying for at all — the decisions were happening inside coaching centers and campus networks. Changing where we showed up mattered more than anything we said.",
    kind: "client",
    role: "CEO",
    company: "TestKart",
    caseSlug: "testkart",
  },
  {
    quote:
      "Our filters kept producing lists that looked right and converted badly. Shivangi reframed the whole thing around hiring intent — anyone advertising for a telecaller or a BDM is telling you publicly that they have a speed problem. It gave two very different markets one story.",
    kind: "client",
    name: "Anas Khanooni",
    role: "CEO & Founder",
    company: "Plucia",
    caseSlug: "plucia",
  },
  {
    quote:
      "We were about to redesign the interface again. Shivangi's discovery showed the interface was never the issue — volunteers finishing a day of fieldwork weren't going to type on any screen. We shipped voice input instead and completion went up 20% in a single sprint.",
    kind: "client",
    name: "Rohit Pandey",
    role: "CEO",
    company: "Vishwamitra app",
    caseSlug: "vishwamitra",
  },
  {
    quote:
      "Our tickets were a workload nobody thought of as information. Shivangi automated the handoffs between Salesforce and Jira, cut resolution time roughly 30% across 200-plus cases, and then turned the recurring complaints into product changes that actually shipped.",
    kind: "client",
    company: "Life science instrument company, USA",
    caseSlug: "life-science-instrument-company",
  },
  {
    quote:
      "We were tracking obligations across five different regimes with no clear owner for any of them and no evidence trail. Shivangi mapped 250-plus obligations to owners, reviewers and reminders and built the automation on tools we already paid for. No new software.",
    kind: "client",
    company: "Gaming company, USA",
    caseSlug: "gaming-company-compliance",
  },

  // Colleague recommendations, published on LinkedIn — independently checkable,
  // which is exactly why they are worth showing.
  {
    quote:
      "I had the opportunity to work closely with Shivangi on multiple AI product initiatives, and she consistently demonstrated strong product thinking and execution skills. She has a clear ability to break down complex, ambiguous problems into well-structured requirements and actionable product plans. Shivangi collaborates effectively with engineering, data, and design teams, communicates ideas with clarity, and keeps user impact at the center of decisions.",
    kind: "colleague",
    name: "Shiva NU",
    role: "Product Manager, ex-Amazon",
    company: "Worked with Shivangi on the same team",
    sourceUrl: BRAND.linkedin,
    sourceLabel: "Recommendation on LinkedIn",
  },
  {
    quote:
      "I enjoyed working with Shivangi as she provided technical support for our customers at Antylia Scientific. Anytime I reached out to her, she would provide prompt service and sufficient answers to win business for our customers. I highly recommend Shivangi to any company!",
    kind: "colleague",
    name: "Denise Roberts",
    role: "Outside Sales Representative",
    company: "Antylia Scientific",
    sourceUrl: BRAND.linkedin,
    sourceLabel: "Recommendation on LinkedIn",
  },
  {
    quote:
      "Working with Shivangi has been a great experience. She is efficient, quick to resolve technical issues, and always supportive of the team. Her professionalism and positive attitude make her a standout colleague. Highly recommend.",
    kind: "colleague",
    name: "Akbar Kotadia",
    role: "Customer Experience Specialist",
    company: "Antylia Scientific",
    sourceUrl: BRAND.linkedin,
    sourceLabel: "Recommendation on LinkedIn",
  },
];

// ─────────────────────────────────────────────────────────────
// Case studies
//
// Each one gets its own page at /case/<slug>, so you can send a prospect a
// single link instead of the whole site.
//
// Structure follows how a buyer reads: what state were they in, what did you
// find that nobody else had, what did you actually do, what changed. The
// `quote` field is the client's own voice on the same work. Leave it empty
// until you have permission, and the page simply omits it.
// ─────────────────────────────────────────────────────────────
export interface CaseStudy {
  slug: string;
  client: string;
  /** Short label for the kind of work — matches the PROJECTS `type` values. */
  type: string;
  /** One line, past tense, the result. Used as the page headline. */
  headline: string;
  /** Where the signal was hiding. The through-line of the whole site. */
  signal: string;
  accent: string;
  /** The state of things before you arrived, in plain language. */
  situation: string[];
  /** The insight — what you found that changed the approach. */
  finding: string[];
  /** What you actually built or shipped. Concrete, verifiable. */
  work: string[];
  /** Measurable outcomes. Keep these honest and attributable. */
  outcomes: { value: string; label: string }[];
  /** What the client would tell another buyer. Needs their permission. */
  quote?: { text: string; name: string; role: string };
  /** Anything a prospect would reasonably want to verify. */
  verify?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "creditright",
    client: "CreditRight",
    type: "Product + GTM",
    headline: "Built the market-entry system as the first product and GTM hire.",
    signal: "Public GST filings",
    accent: BRAND.colors.lime,
    situation: [
      "A pre-launch AI fintech with a product to sell and no defined buyer. The team had a spreadsheet of roughly 5,700 companies pulled from a public dataset and no way to tell which of them had the problem the product solved.",
      "Outbound had not started, because nobody could agree on who to send it to. Every week spent guessing was a week of runway.",
    ],
    finding: [
      "The qualifying signal was already public. GST filings show turnover bands, filing regularity, and registration status. That is enough to infer which companies carry the working-capital pain the product addressed.",
      "It turned a subjective argument about ICP into a scoring problem with an answer.",
    ],
    work: [
      "Built an account scoring model over the raw GST dataset, narrowing 5,754 companies to 2,194 that fit.",
      "Wrote the positioning and the competitive narrative, mapped across 13 platforms and 4 differentiation angles.",
      "Designed a 4-touch, 14-day outbound sequence with persona-specific messaging.",
      "Shipped a CRM-style operating system for the pipeline: lifecycle stages, routing, and follow-up rules.",
      "Created the design-partner funnel used to land the first cohort.",
    ],
    outcomes: [
      { value: "5,754", label: "companies scored from the raw dataset" },
      { value: "2,194", label: "qualified accounts into the pipeline" },
      { value: "13", label: "platforms covered by the competitive narrative" },
      { value: "1", label: "repeatable market-entry system, handed over" },
    ],
    verify:
      "The scoring model, sequence copy, and CRM structure can be walked through on a call. Client reference available on request.",
  },
  {
    slug: "testkart",
    client: "TestKart",
    type: "GTM strategy",
    headline: "Found the buyers offline when digital channels went quiet.",
    signal: "Coaching centers and campus ambassador networks",
    accent: BRAND.colors.coral,
    situation: [
      "An education product running the standard playbook: LinkedIn, paid social, content. Spend was going out and the pipeline was not moving.",
      "The assumption was that the messaging was wrong. It was not the messaging.",
    ],
    finding: [
      "The buyers were not on the channels being paid for. Decisions were happening inside coaching centers and through campus ambassador networks. Offline, relationship-led, and invisible to a digital funnel.",
      "No amount of ad copy iteration fixes being in the wrong room.",
    ],
    work: [
      "Mapped coaching centers as the real distribution layer rather than a side channel.",
      "Built a campus ambassador network and treated it as an acquisition channel with its own metrics.",
      "Rebuilt channel selection around where buyers already gather, sequenced by product stage.",
    ],
    outcomes: [
      { value: "Offline", label: "channel identified as the primary motion" },
      { value: "2", label: "distribution layers built from scratch" },
    ],
    verify: "Channel plan and ambassador programme structure available to review on a call.",
  },
  {
    slug: "plucia",
    client: "Plucia",
    type: "ICP engineering",
    headline: "Turned live job postings into a buying-intent signal.",
    signal: "Live hiring posts",
    accent: BRAND.colors.blue,
    situation: [
      "An AI sales product with two very different target markets, real estate and B2B SaaS, and no shared definition of a good-fit account.",
      "Firmographic filters returned lists that looked plausible and converted badly.",
    ],
    finding: [
      "A company hiring a telecaller, BDM, or sales intern is telling you, publicly and with a date on it, that it has a response-speed problem it is trying to solve with headcount.",
      "Real estate closes by the second. B2B SaaS needs an instant reply. Different industries, the same underlying pain, and both were advertising it in plain sight.",
    ],
    work: [
      "Rebuilt the ICP definition around active hiring intent rather than company attributes.",
      "Mapped both verticals to the shared speed problem so one product story covered both.",
      "Retargeted outreach at intent signals, with timing tied to when the post went live.",
    ],
    outcomes: [
      { value: "2", label: "verticals unified under one product story" },
      { value: "Intent", label: "replaced firmographics as the targeting basis" },
    ],
    verify: "The signal logic and outreach timing rules can be demonstrated live.",
  },
  {
    slug: "vishwamitra",
    client: "Vishwamitra",
    type: "Product management",
    headline: "Shipped an AI voice-input feature after finding the real adoption blocker.",
    signal: "Where volunteers dropped the form",
    accent: BRAND.colors.teal,
    situation: [
      "Field volunteers were expected to enter records after a day of fieldwork. Completion rates were poor and onboarding drop-off was high.",
      "The team read it as a UX problem and was preparing another interface redesign.",
    ],
    finding: [
      "It was not the interface. Volunteers finishing a day in the field would not sit and type, on any layout. The input method was the blocker, not the screen.",
      "That reframed the fix from design to capability: capture speech, convert it to structured records.",
    ],
    work: [
      "Ran the discovery that isolated the input method as the cause.",
      "Specced and shipped AI voice input, converting speech into structured records.",
      "Closed the discovery-to-build loop inside a single sprint.",
    ],
    outcomes: [
      { value: "+20%", label: "completion rate" },
      { value: "-10%", label: "onboarding drop-off" },
      { value: "1 sprint", label: "discovery to shipped feature" },
    ],
  },
  {
    slug: "life-science-instrument-company",
    client: "Life science instrument company, USA",
    type: "Ops + product feedback",
    headline: "Turned support friction into automation and product requirements.",
    signal: "Patterns inside support tickets",
    accent: BRAND.colors.violet,
    situation: [
      "A support function carrying over 200 active cases, with manual routing and handoffs between Salesforce and Jira eating the team's time.",
      "Customer feedback was arriving constantly and going nowhere near the product roadmap.",
    ],
    finding: [
      "The same complaints were recurring. Tickets were not just a support workload. They were an unread product requirements document.",
    ],
    work: [
      "Connected Salesforce and Jira through n8n to remove manual handoffs.",
      "Rebuilt case routing to cut triage time.",
      "Translated recurring feedback into product requirements and pushed them through to shipped changes.",
    ],
    outcomes: [
      { value: "-40%", label: "manual work" },
      { value: "-30%", label: "resolution time across 200+ cases" },
      { value: "2", label: "product improvements shipped from feedback" },
    ],
  },
  {
    slug: "gaming-company-compliance",
    client: "Gaming company, USA",
    type: "Systems build",
    headline: "Designed a lightweight compliance operating system with no new software spend.",
    signal: "Obligations nobody owned",
    accent: BRAND.colors.lime,
    situation: [
      "A cross-jurisdiction compliance surface across India, US, privacy, FTC and FDA, tracked informally, with no clear owner per obligation and no evidence trail.",
      "Buying a compliance platform was not on the table.",
    ],
    finding: [
      "The gap was not tooling. It was that no obligation had a named owner, a reviewer, or a place where evidence lived.",
    ],
    work: [
      "Mapped 250+ obligations into owners, reviewers, evidence, reminders, dashboards, and escalation chains.",
      "Built a 650-line Apps Script automation engine to drive reminders and escalation.",
      "Delivered it on Google Workspace, Forms, Drive, and Python. No new licences.",
    ],
    outcomes: [
      { value: "250+", label: "obligations mapped and owned" },
      { value: "5", label: "regulatory regimes covered" },
      { value: "₹0", label: "additional software spend" },
    ],
  },
];

/** Look up a case study by slug. */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

// ─────────────────────────────────────────────────────────────
// Credentials and references
//
// Answers the buyer's verification question ("can I check any of this?") without
// publishing anything sensitive. Trade references are past clients who will
// vouch for the work, a normal ask from anyone with a procurement process.
// Nothing is listed here that can't be produced quickly on request.
// ─────────────────────────────────────────────────────────────
export const CREDENTIALS = {
  label: "Verification",
  heading: "Check the work before you commit to it.",
  sub: "Two ways to verify what's on this page: talk to someone I've done it for, or look at what I actually built. Both ready on request.",
  items: [
    {
      title: "Trade references",
      detail:
        "Named past clients, with title and company, who will take a call or answer an email about the work and how it went.",
    },
    {
      title: "Work samples",
      detail:
        "Resume, case study walkthroughs, and live build samples. The actual CRM structures, scoring models, and automation, not screenshots of them.",
    },
  ],
  note: "Shared on request rather than published, so client names stay private until they have agreed to be a reference.",
};

// ─────────────────────────────────────────────────────────────
// FAQ + contact
// ─────────────────────────────────────────────────────────────
export const FAQS = [
  {
    q: "Why fractional instead of hiring full-time?",
    a: "A senior product or GTM hire is a three-to-six month search and a large fixed cost, usually committed before you know which market you are actually serving. Fractional support gives you senior judgment, focus, and operating rhythm in weeks. You convert to a full-time hire once the direction is proven.",
  },
  {
    q: "Is this only for startups?",
    a: "No. The method works anywhere buying intent leaves a trace. Early-stage startups, growth-stage SaaS, D2C brands launching new products, manufacturers going direct, real estate projects, education businesses. The signal source changes. The approach does not.",
  },
  {
    q: "How is this different from an agency?",
    a: "An agency executes a channel you have already chosen. This role sits upstream of that, between founder, product, marketing and sales: finding where demand already exists, deciding what to sell and to whom, then building the execution rhythm. The focus is product direction, packaging and positioning, not running ads or making content.",
  },
  {
    q: "What happens after the first call?",
    a: "I come back with either a sprint scope, a launch plan, a fractional retainer proposal, or a clear reason why now is not the right time. Resume, case studies, and build samples are available for serious conversations.",
  },
];

export const CONTACT = {
  label: "Contact",
  heading: "Bring one messy product or GTM problem.",
  sub: "Send the context. I'll come back with where I think the pain is actually showing up, and the right next step.",
  businessTypes: [
    "Tech / SaaS",
    "D2C / Consumer",
    "Manufacturer",
    "Real estate",
    "Coaching institute",
    "Clinic / healthcare",
    "Other",
  ],
};

export const SEO = {
  title: "Shivangi Malviya | Market Discovery & GTM Consultant",
  description:
    "Most GTM advice starts with assumptions. Mine starts with evidence. Market discovery, positioning, launch execution and a 90-day operating rhythm for early-stage teams.",
};

// ─────────────────────────────────────────────────────────────
// Section headings and standing labels
//
// These used to be hardcoded inside the section components, which meant the file
// header's claim that "every word lives here" was not true, and a copy change
// touched four files. Anything a visitor reads now belongs in this file.
// ─────────────────────────────────────────────────────────────
export const SECTION_COPY = {
  operating: {
    label: "What I help with",
    heading: "The pain hides in a different place for every business.",
    sub: "Pick your business type to see where I look first, and what the work looks like.",
    valueLabel: "The value for you",
  },
  process: {
    label: "The Signal Method",
    heading: "Six steps, and every one produces something you can check.",
  },
  offers: {
    label: "Engagement models",
    heading: "Start with the amount of help you actually need.",
    sub: "Use a sprint when you need a decision and a roadmap. Use a retainer when you need a fractional partner operating with the team.",
  },
  proof: {
    label: "Proof from actual builds",
    headingBefore: "Strategy backed by ",
    headingEmphasis: "shipped systems",
    headingAfter: ".",
    sub: "I have built product features, GTM pipelines, CRM systems, automation workflows, diagnostics, and operating playbooks from scratch.",
    metricsLabel: "System metrics",
    footnote:
      "Each case study walks through where the client was, what signal I found, what I built, and what changed. References available if you want to hear it from them.",
  },
  words: {
    colleaguesLabel: "From the people who worked with me",
    colleaguesSub:
      "Colleagues rather than clients. How the work actually goes day to day. All three are public recommendations on LinkedIn, so you can check them yourself.",
  },
  nav: {
    cta: "Book a GTM strategy call",
  },
} as const;

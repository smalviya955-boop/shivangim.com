/**
 * SITE CONTENT — single source of truth.
 *
 * Every word on the site lives here. Edit this file to change copy; you never
 * need to touch a component. Structure follows the brand video script:
 * hook -> three proof beats -> meta-line -> offer.
 */

export const BRAND = {
  name: "Shivangi Malviya",
  role: "Product & GTM Strategy Consultant",
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
  { id: "operating", label: "Operating areas" },
  { id: "offers", label: "Offers" },
  { id: "proof", label: "Proof" },
  { id: "contact", label: "Contact" },
] as const;

// ─────────────────────────────────────────────────────────────
// Scene 1 — Hook
// ─────────────────────────────────────────────────────────────
export const HOOK = {
  eyebrow: "Product & GTM Strategy Consultant",
  /** Split so the doodle circle lands on the exact phrase. */
  headlineBefore: "I don't guess your ICP.",
  headlineLeadIn: "I find ",
  headlineCircled: "where the pain already lives.",
  headlineAfter: "",
  sub: "Same question, every client. The answer is never in a generic filter — it's in a GST filing, a campus network, or a job posting nobody thought to read.",
  primaryCta: { label: "Book a strategy diagnosis", href: "#contact" },
  secondaryCta: { label: "See proof of work", href: "#proof" },
  tags: ["Product direction", "Positioning", "GTM strategy", "Launch execution"],
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
    setup: "CreditRight needed real prospects — not a spreadsheet of maybes.",
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
  label: "The method",
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
    title: "Launch discipline for consumer products.",
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
    title: "Product + GTM clarity sprint",
    desc: "A focused one-time engagement for product direction, positioning, offer cleanup, channel choice, or launch planning.",
    bullets: [
      "Current product and funnel diagnosis",
      "90-day action plan",
      "Roadmap, messaging, and channel priorities",
    ],
    cta: "Ask for sprint",
    dark: false,
    accent: BRAND.colors.lime,
    code: "MOD 01",
  },
  {
    title: "Fractional Product & GTM Partner",
    desc: "Ongoing support with 2-3 working sessions a week for founders who need product and market thinking without a full-time senior hire.",
    bullets: [
      "Weekly execution rhythm",
      "Roadmap, offer, and launch guidance",
      "Product, sales, and marketing alignment",
    ],
    cta: "Book intro call",
    dark: true,
    accent: BRAND.colors.lime,
    code: "MOD 02",
  },
  {
    title: "Launch command room",
    desc: "For new products, real estate launches, institute admissions, clinic campaigns, or brand launches with a fixed timeline.",
    bullets: [
      "Product promise, launch narrative, and calendar",
      "Lead capture and follow-up flow",
      "Weekly launch review",
    ],
    cta: "Plan a launch",
    dark: false,
    accent: BRAND.colors.blue,
    code: "MOD 03",
  },
];

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Find where the pain already shows up",
    desc: "Before any strategy, we look for the signal that already exists — filings, hiring posts, support tickets, drop-off points, call logs.",
  },
  {
    num: "02",
    title: "Choose the sharpest bet",
    desc: "We decide what gets fixed first: product packaging, feature priority, positioning, launch sequence, lead flow, or sales handoff.",
  },
  {
    num: "03",
    title: "Build the working assets",
    desc: "Roadmap notes, product briefs, messaging, launch plans, channel plans, scripts, and CRM follow-up rules — things the team uses on Monday.",
  },
  {
    num: "04",
    title: "Review and improve weekly",
    desc: "We use what happened in market to tune the product, offer, onboarding, qualification, creative, and next moves.",
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
  },
  {
    company: "Antylia / Cole-Parmer",
    type: "Ops + product feedback",
    title: "Turned support friction into automation and product requirements.",
    bullets: [
      "Manual work cut 40%",
      "Resolution time reduced 30%",
      "2 product improvements shipped from feedback",
    ],
    accent: BRAND.colors.violet,
    code: "SYS 05",
  },
  {
    company: "Compliance Calendar",
    type: "Systems build",
    title: "Designed a lightweight compliance operating system.",
    bullets: [
      "India, US, privacy, FTC, and FDA obligations",
      "650-line Apps Script automation engine",
      "Built with Google Workspace, Forms, Drive, Python",
    ],
    accent: BRAND.colors.lime,
    code: "SYS 06",
  },
];

// ─────────────────────────────────────────────────────────────
// FAQ + contact
// ─────────────────────────────────────────────────────────────
export const FAQS = [
  {
    q: "Why fractional instead of hiring full-time?",
    a: "A senior product or GTM hire is expensive and often hard to justify before the motion is proven. Fractional support gives you senior judgment, focus, and operating rhythm without committing to a permanent role too early.",
  },
  {
    q: "Is this only for startups?",
    a: "No. The work applies to any business with a product and a market: early-stage startups, growth-stage SaaS, D2C brands launching new products, manufacturers going direct, real estate projects, and education businesses.",
  },
  {
    q: "How is this different from an agency?",
    a: "Agencies execute marketing. This role sits between founder, product, marketing, and sales. The focus is on product direction, packaging, positioning, and the execution rhythm — not on running ads or making content.",
  },
  {
    q: "What happens after the first call?",
    a: "I come back with either a sprint scope, a launch plan, a fractional retainer proposal, or a clear reason why now is not the right time. Resume, case studies, and build samples are available for serious conversations.",
  },
];

export const CONTACT = {
  label: "Contact",
  heading: "Bring one messy product or GTM problem.",
  sub: "Send the context. I'll come back with where I think the pain is actually showing up — and the right next step.",
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
  title: "Shivangi Malviya | Product & GTM Strategy Consultant",
  description:
    "I don't guess your ICP — I find where the pain already lives. Fractional product and GTM strategy for founders: positioning, launch execution, and a 90-day operating rhythm.",
};

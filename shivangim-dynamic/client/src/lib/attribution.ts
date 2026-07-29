/**
 * How a quote is credited.
 *
 * A testimonial can be attributed three ways, and the two lines under the quote
 * have to shift accordingly — otherwise a title-only quote reads as though the
 * company said it, or an anonymous one leaves a blank line:
 *
 *   1. Fully named      "Rohit Pandey"                     / "CEO, Vishwamitra app"
 *   2. Title only       "CEO & Founder"                    / "CreditRight"
 *   3. Fully anonymous  "Life science instrument company"   / "Anonymised at the client's request"
 *
 * Used by both the testimonials section and the case study pages so a quote is
 * credited identically wherever it appears.
 */
export interface Attributable {
  name?: string;
  role?: string;
  company: string;
}

export interface Attribution {
  primary: string;
  secondary: string;
  /** True when a real person is named — the strongest form. */
  named: boolean;
}

export function attributionFor(item: Attributable): Attribution {
  if (item.name) {
    return {
      primary: item.name,
      secondary: [item.role, item.company].filter(Boolean).join(", "),
      named: true,
    };
  }

  // No person named, but the company is — lead with the title so the reader
  // knows the seniority of whoever said it.
  if (item.role) {
    return { primary: item.role, secondary: item.company, named: false };
  }

  return {
    primary: item.company,
    secondary: "Anonymised at the client's request",
    named: false,
  };
}

/**
 * Initials for the avatar chip. Falls back to the company when nobody is named,
 * and takes two letters from a single word so "CreditRight" reads "CR" rather
 * than a lone "C".
 */
export function attributionInitials(item: Attributable): string {
  const words = (item.name || item.company).split(/\s+/).filter((w) => /[a-z]/i.test(w));
  if (words.length === 0) return "—";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

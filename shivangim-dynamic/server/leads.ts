/**
 * Lead intake.
 *
 * Validates an enquiry, appends it to a newline-delimited JSON file, and
 * optionally forwards it to a webhook (Zapier, Make, n8n, Slack, a CRM) when
 * LEADS_WEBHOOK_URL is set. Storage is a file so this runs anywhere Node runs
 * with no database to provision; swap writeLead for a DB call when you outgrow
 * it and nothing else needs to change.
 */
import fs from "node:fs/promises";
import path from "node:path";

export interface Lead {
  name: string;
  email: string;
  company: string;
  business: string;
  message: string;
}

export interface StoredLead extends Lead {
  receivedAt: string;
  userAgent: string;
  source: string;
}

const LEADS_DIR = process.env.LEADS_DIR || path.resolve(process.cwd(), "data");
const LEADS_FILE = path.join(LEADS_DIR, "leads.jsonl");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MAX = { name: 120, email: 200, company: 160, business: 80, message: 4000 };

export function validateLead(input: unknown): { ok: true; lead: Lead } | { ok: false; error: string } {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Expected a JSON object." };
  }
  const raw = input as Record<string, unknown>;
  const str = (key: keyof typeof MAX) =>
    typeof raw[key] === "string" ? (raw[key] as string).trim().slice(0, MAX[key]) : "";

  const lead: Lead = {
    name: str("name"),
    email: str("email"),
    company: str("company"),
    business: str("business"),
    message: str("message"),
  };

  if (!lead.name) return { ok: false, error: "Name is required." };
  if (!EMAIL_RE.test(lead.email)) return { ok: false, error: "A valid email is required." };

  return { ok: true, lead };
}

export async function writeLead(lead: Lead, meta: { userAgent?: string }): Promise<StoredLead> {
  const stored: StoredLead = {
    ...lead,
    receivedAt: new Date().toISOString(),
    userAgent: meta.userAgent?.slice(0, 300) ?? "",
    source: "website-contact-form",
  };

  await fs.mkdir(LEADS_DIR, { recursive: true });
  await fs.appendFile(LEADS_FILE, `${JSON.stringify(stored)}\n`, "utf-8");

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stored),
      });
    } catch (err) {
      console.error("[leads] webhook forward failed:", err);
    }
  }

  return stored;
}

export async function readLeads(limit = 100): Promise<StoredLead[]> {
  try {
    const text = await fs.readFile(LEADS_FILE, "utf-8");
    return text
      .split("\n")
      .filter(Boolean)
      .slice(-limit)
      .map((line) => JSON.parse(line) as StoredLead)
      .reverse();
  } catch {
    return [];
  }
}

export const LEADS_PATH = LEADS_FILE;

/**
 * Express app: static client + a small JSON API.
 *
 *   POST /api/leads   store a contact-form enquiry
 *   GET  /api/leads   read recent enquiries (requires LEADS_ADMIN_TOKEN)
 *   GET  /api/health  liveness check
 */
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { LEADS_PATH, readLeads, validateLead, writeLead } from "./leads.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Very small in-memory rate limit: max submissions per IP per window. */
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.set("trust proxy", 1);
  app.use(express.json({ limit: "32kb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, leadsFile: LEADS_PATH, time: new Date().toISOString() });
  });

  app.post("/api/leads", async (req, res) => {
    const ip = req.ip ?? "unknown";
    if (rateLimited(ip)) {
      res.status(429).json({ ok: false, error: "Too many submissions. Try again shortly." });
      return;
    }

    const result = validateLead(req.body);
    if (!result.ok) {
      res.status(400).json({ ok: false, error: result.error });
      return;
    }

    try {
      const stored = await writeLead(result.lead, { userAgent: req.get("user-agent") });
      console.log(`[leads] ${stored.receivedAt} ${stored.name} <${stored.email}> ${stored.business}`);
      res.status(201).json({ ok: true, receivedAt: stored.receivedAt });
    } catch (err) {
      console.error("[leads] write failed:", err);
      res.status(500).json({ ok: false, error: "Could not store the enquiry." });
    }
  });

  app.get("/api/leads", async (req, res) => {
    const token = process.env.LEADS_ADMIN_TOKEN;
    if (!token || req.get("x-admin-token") !== token) {
      res.status(401).json({ ok: false, error: "Unauthorized." });
      return;
    }
    res.json({ ok: true, leads: await readLeads(200) });
  });

  // Serve the built client
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Client-side routing fallback
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

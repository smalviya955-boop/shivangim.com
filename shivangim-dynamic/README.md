# shivangim.com — dynamic site

Scroll-driven narrative landing page for Shivangi Malviya, Product & GTM Strategy Consultant.
React 19 + Vite + Tailwind on the front, small Express API on the back.

## Run it

```bash
npm install          # or pnpm install
npm run dev          # http://localhost:3000 — includes the /api/leads endpoint
npm run build        # builds client to dist/public and server to dist/index.js
npm start            # serves the build on PORT (default 3000)

npm run build:preview  # one self-contained file: dist/shivangim-preview.html
```

`build:preview` inlines the JS and CSS into a single HTML file you can open by
double-clicking — no server, no install, easy to email or drop in a folder. Fonts still
load from Google Fonts, so it wants a connection to look right. The contact form in that
file shows its success state without posting anywhere, since there's no API behind it.

## Where things live

| What | Where |
|---|---|
| **All copy and content** | `client/src/content/site.ts` |
| Narrative scenes (hook, proof beats, meta-line) | `client/src/components/sections/Story.tsx` |
| Operating areas, process, offers, proof | `client/src/components/sections/Sections.tsx` |
| FAQ + lead form | `client/src/components/sections/Contact.tsx` |
| Hand-drawn doodle annotations | `client/src/components/Doodle.tsx` + `client/src/lib/rough.ts` |
| Scroll reveal / in-view detection | `client/src/components/Reveal.tsx`, `client/src/hooks/useInView.ts` |
| Number reveals (5,000 → 1,000, stat counters) | `client/src/components/CountFigure.tsx` |
| Lead API | `server/index.ts`, `server/leads.ts` |
| Colours, type scale, doodle CSS | `client/src/index.css` |

### Editing content

Everything readable on the page comes from `content/site.ts` — headlines, proof beats,
operating areas, offers, FAQ, SEO description. You do not need to open a component to
change a word, a number, or the order of the proof beats.

Adding a section to `NAV_SECTIONS` adds it to the nav and the scroll-spy, as long as the
section element carries a matching `id`.

### The doodles

`<Doodle kind="circle">phrase</Doodle>` wraps a phrase and draws a rough annotation over it
when it scrolls into view. Kinds: `circle`, `underline`, `arrow`, `box`. The geometry is
generated at the phrase's measured pixel size and regenerated on resize, so a loop stays a
loop at every breakpoint and across line wraps. Wobble is seeded from the phrase text, so a
given phrase always gets the same shape.

`<Starburst />` is the "this is the point" cue. `<DoodleDivider />` is the between-scene
connector.

Everything respects `prefers-reduced-motion`: annotations and counters render in their final
state with no animation.

## Lead capture

`POST /api/leads` validates the enquiry, appends it to `data/leads.jsonl`, and returns 201.
Rate limited to 5 submissions per IP per 10 minutes. If the request fails for any reason,
the form falls back to opening a pre-filled email so an enquiry is never lost silently.

Environment variables:

| Variable | Effect |
|---|---|
| `LEADS_WEBHOOK_URL` | Also POST each lead here — Zapier, Make, n8n, Slack, a CRM |
| `LEADS_ADMIN_TOKEN` | Enables `GET /api/leads`, sent as the `x-admin-token` header |
| `LEADS_DIR` | Where `leads.jsonl` is written (default `./data`) |
| `PORT` | Server port (default 3000) |

Read your leads:

```bash
curl -H "x-admin-token: $LEADS_ADMIN_TOKEN" https://yoursite.com/api/leads
```

## Deploying

The API needs a Node process, so deploy to a Node host (Render, Railway, Fly, a VPS) with
build command `npm run build` and start command `npm start`.

On a static host (Netlify, GitHub Pages, Vercel static) the page works fine but `/api/leads`
won't exist, and the form will fall back to email. To keep server-side capture on a static
host, point the form's `fetch` in `Contact.tsx` at a serverless function or a form service.

Note: `data/leads.jsonl` lives on the server's disk. On hosts with ephemeral filesystems
(most free tiers), set `LEADS_WEBHOOK_URL` so leads also land somewhere permanent.

## Accessibility

Verified: no horizontal overflow at 390 / 768 / 1440 px, form fields carry labels, doodles
are `aria-hidden`, reduced-motion respected, nav has an aria-expanded mobile toggle.

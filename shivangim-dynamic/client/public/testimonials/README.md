# Testimonial screenshots

Drop client message screenshots here, then reference them from `TESTIMONIALS` in
`client/src/content/site.ts`:

```ts
{
  quote: "…",
  name: "Anita Rao",
  role: "Founder",
  company: "CreditRight",
  screenshot: "/testimonials/creditright.png",
  screenshotAlt: "WhatsApp message from the CreditRight founder",
}
```

Files in `client/public/` are served from the site root, so
`client/public/testimonials/creditright.png` is `/testimonials/creditright.png`.

## Before you export a screenshot

- Get the client's explicit permission. A screenshot of a private chat is still
  their words, and their name and photo alongside it.
- Crop or blur phone numbers, email addresses, profile photos, and any other
  message visible in the thread.
- Keep it legible — roughly 800px wide is plenty; a full-resolution phone
  screenshot is a slow download for no benefit.
- PNG for chat screenshots (crisp text), JPG only for photos.

Every testimonial should also carry a typed `quote`. The screenshot is
corroboration; the typed text is what search engines and screen readers read.

/**
 * Fold the built client into one self-contained HTML file.
 *
 * Reads dist/public/index.html and inlines the JS bundle and stylesheet, so the
 * result opens by double-clicking — no server, no build, nothing to install.
 * Fonts still come from Google Fonts, so it wants a network connection to look
 * right; everything else is in the file.
 *
 * Run via: npm run build:preview
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "dist", "public");
const outFile = path.join(root, "dist", "shivangim-preview.html");

let html = fs.readFileSync(path.join(publicDir, "index.html"), "utf-8");

const readAsset = (src) => fs.readFileSync(path.join(publicDir, src.replace(/^\//, "")), "utf-8");

// Inline the stylesheet(s).
html = html.replace(
  /<link[^>]+rel="stylesheet"[^>]*href="(\/assets\/[^"]+)"[^>]*>/g,
  (_m, href) => `<style>\n${readAsset(href)}\n</style>`,
);

// Inline the module bundle. `</script>` inside string literals would close the
// tag early, so it is escaped.
html = html.replace(
  /<script[^>]*src="(\/assets\/[^"]+)"[^>]*><\/script>/g,
  (_m, src) =>
    `<script type="module">\n${readAsset(src).replace(/<\/script>/gi, "<\\/script>")}\n</script>`,
);

// The preview has no API behind it; make that explicit for the contact form.
html = html.replace(
  "</head>",
  `  <script>window.__PREVIEW__ = true;</script>\n</head>`,
);

fs.writeFileSync(outFile, html, "utf-8");

const kb = (n) => `${Math.round(n / 1024)} kB`;
console.log(`Wrote ${path.relative(root, outFile)} (${kb(Buffer.byteLength(html))})`);
console.log("Open it directly in a browser — no server needed.");

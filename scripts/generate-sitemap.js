import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hostname = process.env.NUXT_PUBLIC_SITE_URL || "https://etage.com.ua";

const routes = ["/"];

const locales = [
  { code: "ru", iso: "ru-RU" },
  { code: "ua", iso: "uk-UA" },
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

routes.forEach((route) => {
  sitemap += `
  <url>
    <loc>${hostname}${route}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>`;

  locales.forEach((locale) => {
    sitemap += `
    <xhtml:link rel="alternate" hreflang="${locale.code}" href="${hostname}${route}" />
    <xhtml:link rel="alternate" hreflang="${locale.iso}" href="${hostname}${route}" />`;
  });

  sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${hostname}${route}" />
  </url>`;
});

sitemap += `
</urlset>`;

// Write to public directory (will be copied to output)
const publicPath = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(publicPath, sitemap, "utf-8");
console.log(`Sitemap generated at ${publicPath}`);

// Also write to output/public if it exists (for post-build)
const outputPath = resolve(__dirname, "../.output/public/sitemap.xml");
try {
  writeFileSync(outputPath, sitemap, "utf-8");
  console.log(`Sitemap also written to ${outputPath}`);
} catch (e) {
  // Output directory might not exist yet, that's okay
}


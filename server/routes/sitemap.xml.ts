import { readdirSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..", "..", "..");

// Function to recursively get all Vue files from pages directory
function getPagesFromDirectory(dir: string, basePath: string = ""): string[] {
  const routes: string[] = [];

  try {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        const subRoutes = getPagesFromDirectory(
          fullPath,
          join(basePath, entry.name)
        );
        routes.push(...subRoutes);
      } else if (entry.isFile() && entry.name.endsWith(".vue")) {
        // Convert file path to route
        let route = basePath;

        // Handle index.vue files
        if (entry.name === "index.vue") {
          // If it's the root index.vue, route is "/"
          if (basePath === "") {
            route = "/";
          } else {
            // For nested index.vue, use the directory path
            route = `/${basePath}`;
          }
        } else {
          // For other .vue files, remove .vue extension
          const fileName = entry.name.replace(/\.vue$/, "");
          route = basePath ? `/${basePath}/${fileName}` : `/${fileName}`;
        }

        routes.push(route);
      }
    }
  } catch (error) {
    // Directory might not exist, return empty array
    console.warn(`Could not read directory ${dir}:`, error);
  }

  return routes;
}

export default defineEventHandler((event) => {
  // Get hostname from environment variable or request
  // For prerendering, prioritize environment variable, then default to production URL
  let hostname = process.env.NUXT_PUBLIC_SITE_URL;

  if (!hostname) {
    const host = getHeader(event, "host");
    // During prerendering, host might be localhost, so use production URL as fallback
    if (host && !host.includes("localhost") && !host.includes("127.0.0.1")) {
      const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
      hostname = `${protocol}://${host}`;
    } else {
      // Default to production URL for prerendering
      hostname = "https://etage.com.ua";
    }
  }

  // Ensure hostname has protocol
  if (!hostname.startsWith("http://") && !hostname.startsWith("https://")) {
    hostname = `https://${hostname}`;
  }

  // Get all routes from the pages directory
  const pagesDir = resolve(__dirname, "pages");
  const routes = getPagesFromDirectory(pagesDir);

  // Sort routes to ensure consistent ordering (root first, then alphabetically)
  routes.sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    return a.localeCompare(b);
  });

  // Get i18n locales with prefixes
  const locales = [
    { code: "ua", iso: "uk-UA", prefix: "/ua" },
    { code: "ru", iso: "ru-RU", prefix: "/ru" },
  ];

  // Generate sitemap XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  routes.forEach((route) => {
    // Generate a URL entry for each locale
    locales.forEach((locale) => {
      // Build locale route
      const localeRoute = locale.prefix + (route === "/" ? "" : route);
      sitemap += `
  <url>
    <loc>${hostname}${localeRoute}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>`;

      // Add alternate language links
      locales.forEach((altLocale) => {
        const altLocaleRoute = altLocale.prefix + (route === "/" ? "" : route);
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${altLocale.code}" href="${hostname}${altLocaleRoute}" />
    <xhtml:link rel="alternate" hreflang="${altLocale.iso}" href="${hostname}${altLocaleRoute}" />`;
      });

      // Add x-default pointing to default locale (ua)
      const defaultRoute = "/ua";
      sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${hostname}${defaultRoute}" />
  </url>`;
    });
  });

  sitemap += `
</urlset>`;

  // Set proper headers for XML content
  setHeader(event, "Content-Type", "application/xml");
  setHeader(event, "Cache-Control", "public, max-age=3600");

  return sitemap;
});

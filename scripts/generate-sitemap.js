import { writeFileSync, readdirSync, statSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hostname = process.env.NUXT_PUBLIC_SITE_URL || "https://etage.com.ua";

// Function to recursively get all Vue files from pages directory
function getPagesFromDirectory(dir, basePath = "") {
  const routes = [];
  
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

// Get all routes from the pages directory
const pagesDir = resolve(__dirname, "../pages");
const routes = getPagesFromDirectory(pagesDir);

// Sort routes to ensure consistent ordering (root first, then alphabetically)
routes.sort((a, b) => {
  if (a === "/") return -1;
  if (b === "/") return 1;
  return a.localeCompare(b);
});

const locales = [
  { code: "ua", iso: "uk-UA", prefix: "/ua" },
  { code: "ru", iso: "ru-RU", prefix: "/ru" },
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

routes.forEach((route) => {
  // Generate a URL entry for each locale
  locales.forEach((locale) => {
    // Build locale route
    let localeRoute = locale.prefix + (route === "/" ? "" : route);
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


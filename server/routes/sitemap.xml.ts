export default defineEventHandler((event) => {
  // Get hostname from environment variable or request
  // For prerendering, use environment variable or default production URL
  const hostname =
    process.env.NUXT_PUBLIC_SITE_URL ||
    (getHeader(event, "host")
      ? `${
          process.env.NODE_ENV === "production" ? "https" : "http"
        }://${getHeader(event, "host")}`
      : "https://etage.com.ua");

  // Get all routes from the pages directory
  const routes = ["/"];

  // Get i18n locales
  const locales = [
    { code: "ru", iso: "ru-RU" },
    { code: "ua", iso: "uk-UA" },
  ];

  // Generate sitemap XML
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

    // Add alternate language versions
    locales.forEach((locale) => {
      sitemap += `
    <xhtml:link rel="alternate" hreflang="${locale.code}" href="${hostname}${route}" />
    <xhtml:link rel="alternate" hreflang="${locale.iso}" href="${hostname}${route}" />`;
    });

    // Add x-default
    sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${hostname}${route}" />`;

    sitemap += `
  </url>`;
  });

  sitemap += `
</urlset>`;

  // Set proper headers for XML content
  setHeader(event, "Content-Type", "application/xml");
  setHeader(event, "Cache-Control", "public, max-age=3600");

  return sitemap;
});

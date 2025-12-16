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

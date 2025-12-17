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

import { NextResponse } from 'next/server';
import { readdirSync } from 'fs';
import { join, resolve } from 'path';

// Function to recursively get all routes from app directory
function getRoutesFromDirectory(dir: string, basePath: string = ''): string[] {
  const routes: string[] = [];

  try {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        const subRoutes = getRoutesFromDirectory(
          fullPath,
          join(basePath, entry.name)
        );
        routes.push(...subRoutes);
      } else if (entry.isFile() && entry.name === 'page.tsx') {
        let route = basePath;
        if (!route) {
          route = '/';
        } else {
          route = `/${route}`;
        }
        routes.push(route);
      }
    }
  } catch (error) {
    console.warn(`Could not read directory ${dir}:`, error);
  }

  return routes;
}

export async function GET() {
  // Get hostname from environment variable or default
  let hostname = process.env.NEXT_PUBLIC_SITE_URL || 'https://etage.com.ua';

  if (!hostname.startsWith('http://') && !hostname.startsWith('https://')) {
    hostname = `https://${hostname}`;
  }

  // Get all routes from the app directory
  const appDir = resolve(process.cwd(), 'src/app');
  const routes = getRoutesFromDirectory(appDir);

  // Sort routes
  routes.sort((a, b) => {
    if (a === '/') return -1;
    if (b === '/') return 1;
    return a.localeCompare(b);
  });

  // Get i18n locales with prefixes
  const locales = [
    { code: 'ua', iso: 'uk-UA', prefix: '/ua' },
    { code: 'ru', iso: 'ru-RU', prefix: '/ru' },
  ];

  // Generate sitemap XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  routes.forEach((route) => {
    // Generate a URL entry for each locale
    locales.forEach((locale) => {
      // Build locale route
      const localeRoute = locale.prefix + (route === '/' ? '' : route);
      sitemap += `
  <url>
    <loc>${hostname}${localeRoute}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>`;

      // Add alternate language links
      locales.forEach((altLocale) => {
        const altLocaleRoute = altLocale.prefix + (route === '/' ? '' : route);
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${altLocale.code}" href="${hostname}${altLocaleRoute}" />
    <xhtml:link rel="alternate" hreflang="${altLocale.iso}" href="${hostname}${altLocaleRoute}" />`;
      });

      // Add x-default pointing to default locale (ua)
      const defaultRoute = '/ua';
      sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${hostname}${defaultRoute}" />
  </url>`;
    });
  });

  sitemap += `
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}


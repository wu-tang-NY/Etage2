/* eslint-disable */
// This file will be processed by @vite-pwa/nuxt in injectManifest mode
// Import Workbox modules
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { enable } from 'workbox-navigation-preload';

// Enable navigation preload
enable();

// Precache assets
precacheAndRoute(self.__WB_MANIFEST);

// Custom navigation handler that properly handles preloadResponse
const navigationHandler = async ({ event, request, url }) => {
  // Only handle navigation requests, exclude root URL
  if (request.mode !== 'navigate' || url.pathname === '/') {
    return;
  }

  // Properly await preloadResponse to ensure it settles
  // This prevents the "cancelled before settled" error
  let preloadResponse = null;
  try {
    preloadResponse = await event.preloadResponse;
  } catch (error) {
    // PreloadResponse might fail, that's okay
    console.debug('PreloadResponse error:', error);
  }

  // Use NetworkFirst strategy
  const networkFirst = new NetworkFirst({
    cacheName: 'pages-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24, // 1 day
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
    networkTimeoutSeconds: 3,
  });

  // If we have a valid preloadResponse, use it
  if (preloadResponse) {
    return preloadResponse;
  }

  // Otherwise, use NetworkFirst strategy
  // NetworkFirst will handle the request and cache it
  return networkFirst.handle({ event, request, url });
};

// Register navigation route with custom handler
registerRoute(
  ({ request, url }) => request.mode === 'navigate' && url.pathname !== '/',
  navigationHandler
);

// Google Fonts - Cache first
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new CacheFirst({
    cacheName: 'google-fonts-stylesheets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Google Fonts Static - Cache first
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Images - Cache first
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Nuxt static assets - Network first
registerRoute(
  ({ url }) => url.pathname.startsWith('/_nuxt/'),
  new NetworkFirst({
    cacheName: 'nuxt-static-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24, // 1 day
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
    networkTimeoutSeconds: 3,
  })
);

// API calls - Network first
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 5, // 5 minutes
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
    networkTimeoutSeconds: 10,
  })
);

// Static assets (CSS, JS) - Stale while revalidate
registerRoute(
  ({ request }) =>
    request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);


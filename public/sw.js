/* eslint-disable */
// This file will be processed by @vite-pwa/nuxt in injectManifest mode
// Import Workbox modules
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import { enable } from "workbox-navigation-preload";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";

// Service Worker version - increment this when you need to force update
const SW_VERSION = "v2.0.0";

// Clean up old caches from previous service worker versions
cleanupOutdatedCaches();

// Enable navigation preload
enable();

// Handle messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log(`[Service Worker ${SW_VERSION}] Received SKIP_WAITING message`);
    self.skipWaiting();
  }
  // Send version info when requested
  if (event.data && event.data.type === "GET_VERSION") {
    event.ports[0].postMessage({ version: SW_VERSION });
  }
});

// Log installation with version
self.addEventListener("install", (event) => {
  console.log(`[Service Worker ${SW_VERSION}] Installing...`);
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Handle service worker activation
self.addEventListener("activate", (event) => {
  console.log(`[Service Worker ${SW_VERSION}] Activated`);

  // List of cache names we want to keep (versioned with SW_VERSION)
  const currentCaches = [
    `workbox-precache-${SW_VERSION}`,
    `pages-cache-${SW_VERSION}`,
    `google-fonts-stylesheets-${SW_VERSION}`,
    `google-fonts-webfonts-${SW_VERSION}`,
    `images-cache-${SW_VERSION}`,
    `nuxt-static-assets-${SW_VERSION}`,
    `api-cache-${SW_VERSION}`,
    `static-resources-${SW_VERSION}`,
  ];

  // Also keep the non-versioned caches for backward compatibility
  const legacyCaches = [
    "workbox-precache",
    "pages-cache",
    "google-fonts-stylesheets",
    "google-fonts-webfonts",
    "images-cache",
    "nuxt-static-assets",
    "api-cache",
    "static-resources",
  ];

  const cacheWhitelist = [...currentCaches, ...legacyCaches];

  event.waitUntil(
    Promise.all([
      // Take control of all clients immediately
      self.clients.claim(),

      // Clean up ALL old caches that don't match our whitelist
      caches.keys().then((cacheNames) => {
        console.log("[Service Worker] Found caches:", cacheNames);
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Delete any cache that's not in our whitelist
              const shouldKeep = cacheWhitelist.some((whitelist) =>
                cacheName.startsWith(whitelist)
              );
              if (!shouldKeep) {
                console.log("[Service Worker] Will delete old cache:", cacheName);
              }
              return !shouldKeep;
            })
            .map((cacheName) => {
              console.log("[Service Worker] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            })
        );
      }),

      // Clear all workbox-precache entries to force fresh precaching
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.startsWith("workbox-precache"))
            .map((cacheName) => {
              console.log("[Service Worker] Clearing workbox precache:", cacheName);
              return caches.open(cacheName).then((cache) => {
                return cache.keys().then((requests) => {
                  return Promise.all(
                    requests.map((request) => cache.delete(request))
                  );
                });
              });
            })
        );
      }),
    ]).then(() => {
      console.log(`[Service Worker ${SW_VERSION}] Cleanup complete, all clients claimed`);
    })
  );
});

// Precache assets with error handling for missing files
precacheAndRoute(self.__WB_MANIFEST || [], {
  // Ignore URL parameters during precaching
  ignoreURLParametersMatching: [/.*/],
  // Don't throw errors for missing precache files
  cleanURLs: false,
});

// Create NetworkFirst strategy instance once for reuse
const navigationStrategy = new NetworkFirst({
  cacheName: "pages-cache",
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

// Custom navigation handler that properly handles preloadResponse
const navigationHandler = async ({ event, request, url }) => {
  // Only handle navigation requests, exclude root URL
  if (request.mode !== "navigate" || url.pathname === "/") {
    return;
  }

  // Properly await preloadResponse to ensure it settles
  // This prevents the "cancelled before settled" error
  // The handler must return a Promise that awaits preloadResponse
  // so that respondWith() (called by Workbox) waits for it to settle
  let preloadResponse = null;
  try {
    // Await preloadResponse - this ensures the promise settles
    // Workbox's registerRoute will call event.respondWith() with this handler's return value
    // By awaiting preloadResponse here, we ensure respondWith() waits for it
    preloadResponse = await event.preloadResponse;
  } catch (error) {
    // PreloadResponse might fail, that's okay - we'll fall back to network
    console.debug("PreloadResponse error:", error);
  }

  // If we have a valid preloadResponse, use it directly
  if (preloadResponse && preloadResponse.ok) {
    return preloadResponse;
  }

  // Otherwise, use NetworkFirst strategy which will handle the request
  return navigationStrategy.handle({ event, request, url });
};

// Register navigation route with custom handler
registerRoute(
  ({ request, url }) => request.mode === "navigate" && url.pathname !== "/",
  navigationHandler
);

// Google Fonts - Cache first
registerRoute(
  ({ url }) => url.origin === "https://fonts.googleapis.com",
  new CacheFirst({
    cacheName: "google-fonts-stylesheets",
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
  ({ url }) => url.origin === "https://fonts.gstatic.com",
  new CacheFirst({
    cacheName: "google-fonts-webfonts",
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
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images-cache",
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
  ({ url }) => url.pathname.startsWith("/_nuxt/"),
  new NetworkFirst({
    cacheName: "nuxt-static-assets",
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
  ({ url }) => url.pathname.startsWith("/api/"),
  new NetworkFirst({
    cacheName: "api-cache",
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
    request.destination === "script" || request.destination === "style",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
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

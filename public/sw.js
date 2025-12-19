/* eslint-disable */
// This file will be processed by @vite-pwa/nuxt in injectManifest mode
// Import Workbox modules
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import { enable } from "workbox-navigation-preload";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";

// Enable navigation preload
enable();

// Handle messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log("[Service Worker] Received SKIP_WAITING message");
    self.skipWaiting();
  }
});

// Handle service worker activation
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activated");

  // List of cache names we want to keep
  const cacheWhitelist = [
    "workbox-precache",
    "pages-cache",
    "google-fonts-stylesheets",
    "google-fonts-webfonts",
    "images-cache",
    "nuxt-static-assets",
    "api-cache",
    "static-resources",
  ];

  event.waitUntil(
    Promise.all([
      // Take control of all clients immediately
      self.clients.claim(),

      // Clean up old caches that don't match our whitelist
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Check if cache name starts with any whitelisted name
              return !cacheWhitelist.some((whitelist) =>
                cacheName.startsWith(whitelist)
              );
            })
            .map((cacheName) => {
              console.log("[Service Worker] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
    ]).then(() => {
      console.log("[Service Worker] Cleanup complete, all clients claimed");
    })
  );
});

// Precache assets
precacheAndRoute(self.__WB_MANIFEST);

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

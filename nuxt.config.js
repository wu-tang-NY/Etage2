// https://nuxt.com/docs/api/configuration/nuxt-config
import { copyFileSync, mkdirSync, readdirSync, statSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to copy directory recursively
function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = resolve(src, entry.name);
    const destPath = resolve(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  modules: ["nuxt-booster"],

  // Nuxt Booster configuration - enable all performance features
  // Booster automatically optimizes:
  // - Images (BoosterImage, BoosterPicture)
  // - Iframes (BoosterIframe)
  // - Fonts (viewport-based loading)
  // - JavaScript (eliminates unnecessary JS)
  // - Components (viewport-based lazy loading)
  booster: {
    // Enable performance and browser support detection
    detection: {
      performance: true,
      browserSupport: true,
    },
    // Performance metrics based on device capabilities
    performanceMetrics: {
      device: {
        hardwareConcurrency: { min: 2, max: 48 },
        deviceMemory: { min: 2 },
      },
    },
  },

  // Alias configuration
  alias: {
    "@": resolve(__dirname, "./src"),
    "vue-svgicon": resolve(__dirname, "./src/utils/vue-svgicon-bridge.js"),
  },

  // Components configuration - auto-import from src/components
  components: [
    {
      path: resolve(__dirname, "./src/components"),
      pathPrefix: false,
    },
  ],

  // App configuration
  app: {
    head: {
      // Title and description will be set dynamically by plugins/meta.js based on locale
      // These are fallback values for default locale (ua)
      title: "Етаж - Сервіс переїздів та вантажоперевезень по Дніпру та Одесі",
      htmlAttrs: {
        lang: "uk", // Will be updated dynamically by plugins/meta.js
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Професійний сервіс переїздів та вантажоперевезень в Дніпрі та Одесі. Квартирні та офісні переїзди під ключ, перевезення меблів та майна, послуги досвідчених вантажників. Упаковка, розбирання меблів, транспортування. Доступні ціни, сучасний автопарк, гарантія збереження",
        },
        {
          name: "google-site-verification",
          content: "vKA3RhUs0WxI3pWumanZ7yC33v9yf74_KzTRS4CLMkE",
        },
        { name: "msapplication-TileColor", content: "#ffffff" },
        // Note: theme-color meta tags with media queries are added in app.html
        // for better browser support
        { name: "apple-mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
        { name: "apple-mobile-web-app-title", content: "Etage" },
        { name: "mobile-web-app-capable", content: "yes" },
      ],
      link: [
        // Root favicon for search engines (Google looks for /favicon.ico)
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/x-icon", href: "/favicon/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicon/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon/favicon-16x16.png",
        },
        // Manifest is handled by @vite-pwa/nuxt module, but adding explicit fallback
        { rel: "manifest", href: "/manifest.webmanifest" },
        {
          rel: "mask-icon",
          href: "/favicon/safari-pinned-tab.svg",
          color: "#ffa511",
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700;900&family=Roboto:wght@400;500;700;900&display=swap&subset=cyrillic",
          media: "print",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  // Global CSS
  css: ["~/src/styles/index.scss"],

  // Plugins
  plugins: [
    { src: "~/plugins/icons.js" }, // Must run first to register icons for SSR
    { src: "~/plugins/vue-svgicon.js" }, // Must run on both server and client for SSR
    { src: "~/plugins/line-clamp.js" }, // Must run on both server and client for SSR
    { src: "~/plugins/eventbus.js" }, // Must run on both server and client for SSR
    { src: "~/plugins/emailService.js", mode: "client" }, // Email service initialization
    { src: "~/plugins/fonts.js", mode: "client" }, // Async font loading
    { src: "~/plugins/defer-css.js", mode: "client" }, // Defer non-critical CSS
    { src: "~/plugins/theme.js", mode: "client" },
    { src: "~/plugins/html-lang.js", mode: "client" }, // Update HTML lang attribute based on locale
  ],

  // Modules
  modules: ["@nuxtjs/i18n", "@vite-pwa/nuxt"],

  // i18n module configuration
  i18n: {
    locales: [
      { code: "ru", iso: "ru-RU", file: "ru.js" },
      { code: "ua", iso: "uk-UA", file: "ua.js" },
    ],
    lazy: false, // Disable lazy loading for static builds - all translations will be bundled
    langDir: "locales/",
    defaultLocale: "ua",
    strategy: "prefix", // Use language prefix in URLs for all locales
    restructureDir: false, // Keep current directory structure for v9 compatibility
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "locale",
      alwaysRedirect: false,
      fallbackLocale: "ua",
    },
    vueI18n: "./src/i18n/config.js",
    compilation: {
      strictMessage: false,
    },
  },

  // Experimental features for performance
  experimental: {
    // Extract CSS to separate files for better caching and code splitting
    inlineSSRStyles: false,
  },

  // Vite configuration for SCSS
  vite: {
    resolve: {
      alias: {
        "vue-svgicon": resolve(__dirname, "./src/utils/vue-svgicon-bridge.js"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/src/styles/utils/functions" as *; @use "~/src/styles/utils/mixins" as *;',
          api: "modern-compiler",
          silenceDeprecations: ["legacy-js-api"],
          loadPaths: ["node_modules"],
        },
      },
      // Disable source maps in production for smaller CSS files
      devSourcemap: false,
    },
    build: {
      // Enable CSS code splitting (default in Vite, but explicit is better)
      cssCodeSplit: true,
      // Minify CSS in production (uses esbuild by default)
      cssMinify: true,
      rollupOptions: {
        output: {
          // Optimize chunk naming for better caching
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split(".");
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `_nuxt/img/[name]-[hash][extname]`;
            }
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return `_nuxt/fonts/[name]-[hash][extname]`;
            }
            return `_nuxt/assets/[name]-[hash][extname]`;
          },
        },
      },
    },
  },

  // Router configuration
  router: {
    options: {
      linkActiveClass: "active",
      linkExactActiveClass: "active",
    },
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (server-side only) - accessed via useRuntimeConfig() in server routes
    mailgunApiKey: process.env.MAILGUN_API_KEY,
    mailgunDomain: process.env.MAILGUN_DOMAIN,
    // Public keys (exposed to client) - accessed via useRuntimeConfig().public
    public: {
      mailgunApiKey: process.env.MAILGUN_API_KEY,
      mailgunDomain: process.env.MAILGUN_DOMAIN,
    },
  },

  // Server API routes are automatically handled by Nitro in server/api/
  nitro: {
    experimental: {
      wasm: true,
    },
    // Enable gzip compression for static assets (compressed at build time)
    compressPublicAssets: true,
    // Ensure CSS and other assets are properly copied to output
    publicAssets: [
      {
        baseURL: "/",
        dir: "static",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    ],
    // Prerender routes for static generation
    prerender: {
      routes: ["/sitemap.xml"],
    },
    hooks: {
      "prerender:routes"(ctx) {
        // Copy static files to output after prerendering
      },
      "build:before"(nitro) {
        // This will run before the build
      },
      "nitro:render:html"(html, { event }) {
        // Defer CSS loading by modifying stylesheet links to use print media trick
        // This prevents CSS from blocking the initial render
        // Only process if html is an object with head property (not a string for error overlay)
        if (
          html &&
          typeof html === "object" &&
          html.head &&
          Array.isArray(html.head)
        ) {
          html.head = html.head.map((tag) => {
            if (
              typeof tag === "string" &&
              tag.includes('rel="stylesheet"') &&
              !tag.includes("fonts.googleapis.com") &&
              !tag.includes("fonts.gstatic.com")
            ) {
              // Add media="print" to defer CSS loading
              // The inline script in app.html will change it back to "all" after load
              if (tag.includes("media=")) {
                // Replace existing media attribute
                tag = tag.replace(/media="[^"]*"/, 'media="print"');
              } else {
                // Add media attribute before the closing tag
                tag = tag.replace(
                  /(<link[^>]*rel="stylesheet"[^>]*)(>)/,
                  '$1 media="print"$2'
                );
              }
            }
            return tag;
          });
        }
      },
      close(nitro) {
        // Copy static files after build completes, preserving directory structure
        const staticDir = resolve(__dirname, "static");
        const outputStaticDir = resolve(__dirname, ".output/public/static");
        const outputDir = resolve(__dirname, ".output/public");
        try {
          if (statSync(staticDir).isDirectory()) {
            // Copy entire static directory to .output/public/static
            copyDir(staticDir, outputStaticDir);
            // Also copy icons directory to root for /icons/bg.svg reference
            const iconsDir = resolve(staticDir, "icons");
            const outputIconsDir = resolve(outputDir, "icons");
            if (statSync(iconsDir).isDirectory()) {
              copyDir(iconsDir, outputIconsDir);
            }
            // Also copy favicon directory to root for /favicon/... references
            const faviconDir = resolve(staticDir, "favicon");
            const outputFaviconDir = resolve(outputDir, "favicon");
            if (statSync(faviconDir).isDirectory()) {
              copyDir(faviconDir, outputFaviconDir);
              // Copy favicon.ico to root for search engines (Google looks for /favicon.ico)
              const faviconIco = resolve(faviconDir, "favicon.ico");
              const outputFaviconIco = resolve(outputDir, "favicon.ico");
              try {
                if (statSync(faviconIco).isFile()) {
                  copyFileSync(faviconIco, outputFaviconIco);
                  console.log("Copied favicon.ico to root directory");
                }
              } catch (e) {
                console.warn("Failed to copy favicon.ico to root:", e.message);
              }
            }
          }

          // Copy sitemap.xml and robots.txt from public directory if they exist
          const publicSitemap = resolve(__dirname, "public/sitemap.xml");
          const outputSitemap = resolve(outputDir, "sitemap.xml");
          try {
            if (statSync(publicSitemap).isFile()) {
              copyFileSync(publicSitemap, outputSitemap);
              console.log("Copied sitemap.xml to output directory");
            }
          } catch (e) {
            // sitemap.xml might not exist in public yet, that's okay
          }

          const publicRobots = resolve(__dirname, "public/robots.txt");
          const outputRobots = resolve(outputDir, "robots.txt");
          try {
            if (statSync(publicRobots).isFile()) {
              copyFileSync(publicRobots, outputRobots);
              console.log("Copied robots.txt to output directory");
            }
          } catch (e) {
            // robots.txt might not exist in public yet, that's okay
          }
        } catch (e) {
          // Ignore if static directory doesn't exist or copy fails
          console.warn("Failed to copy static files:", e.message);
        }
      },
    },
  },

  // Dev server configuration to help with HMR issues
  devServer: {
    port: 3000,
  },

  // DevTools configuration
  devtools: {
    enabled: true,
  },

  // PWA configuration
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Етаж - Сервіс переїздів та вантажоперевезень",
      short_name: "Etage",
      description:
        "Професійний сервіс переїздів та вантажоперевезень в Дніпрі та Одесі. Квартирні та офісні переїзди під ключ, перевезення меблів та майна, послуги досвідчених вантажників",
      lang: "uk",
      dir: "ltr",
      start_url: "/",
      scope: "/",
      id: "/",
      display: "standalone",
      display_override: ["window-controls-overlay", "standalone", "minimal-ui"],
      orientation: "any",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      // Add dark theme color support for PWA
      // Note: PWA manifest doesn't support media queries, so we use light as default
      // The theme-color meta tags handle the dynamic switching
      categories: ["business", "utilities"],
      icons: [
        {
          src: "/favicon/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/favicon/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/favicon/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/favicon/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/favicon/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
          purpose: "any",
        },
      ],
      shortcuts: [
        {
          name: "Замовити переїзд",
          short_name: "Замовити",
          description: "Швидке замовлення переїзду",
          url: "/?action=order",
          icons: [
            {
              src: "/favicon/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
        },
        {
          name: "Передзвонити",
          short_name: "Дзвінок",
          description: "Замовити дзвінок",
          url: "/?action=callback",
          icons: [
            {
              src: "/favicon/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
        },
      ],
      share_target: {
        action: "/",
        method: "GET",
        params: {
          title: "title",
          text: "text",
          url: "url",
        },
      },
      launch_handler: {
        client_mode: "navigate-existing",
      },
      edge_side_panel: {
        preferred_width: 400,
      },
      prefer_related_applications: false,
    },
    workbox: {
      navigateFallback: null,
      globPatterns: [
        "**/*.{js,css,html,png,svg,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}",
      ],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "google-fonts-cache",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "gstatic-fonts-cache",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "images-cache",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
            },
          },
        },
        {
          urlPattern: /\/_nuxt\/.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "nuxt-static-cache",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 60, // 60 days
            },
          },
        },
        {
          urlPattern: ({ request }) => request.mode === "navigate",
          handler: "NetworkFirst",
          options: {
            cacheName: "pages-cache",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24, // 1 day
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      type: "module",
    },
  },
});

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
      title: "Etage",
      htmlAttrs: {
        lang: "uk",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Сервіс переїздів по Одесі та по всій Україні. Квартирні та офісні переїзди, перевезення майна, послуги вантажників",
        },
        {
          name: "google-site-verification",
          content: "vKA3RhUs0WxI3pWumanZ7yC33v9yf74_KzTRS4CLMkE",
        },
        { name: "msapplication-TileColor", content: "#ffffff" },
        { name: "theme-color", content: "#ffffff" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/static/favicon/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/static/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/static/favicon/favicon-16x16.png",
        },
        { rel: "manifest", href: "/static/favicon/site.webmanifest" },
        {
          rel: "mask-icon",
          href: "/static/favicon/safari-pinned-tab.svg",
          color: "#ffa511",
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "preload",
          as: "style",
          href: "https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700;900&family=Roboto:wght@400;500;700;900&display=swap&subset=cyrillic",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700;900&family=Roboto:wght@400;500;700;900&display=swap&subset=cyrillic",
          media: "print",
        },
        // Preload LCP images for faster discovery (both light and dark themes)
        {
          rel: "preload",
          as: "image",
          href: "/icons/bg.svg",
          fetchpriority: "high",
        },
        {
          rel: "preload",
          as: "image",
          href: "/static/icons/bg_dark.svg",
          fetchpriority: "high",
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
  modules: ["@nuxtjs/i18n"],

  // i18n module configuration
  i18n: {
    locales: [
      { code: "ru", iso: "ru-RU", file: "ru.js" },
      { code: "ua", iso: "uk-UA", file: "ua.js" },
    ],
    lazy: true,
    langDir: "locales/",
    defaultLocale: "ua",
    strategy: "no_prefix",
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
    mailgunApiKey:
      process.env.MAILGUN_API_KEY || "key-1a62b4a4982b7185d90632a29ca3b9d2",
    mailgunDomain: process.env.MAILGUN_DOMAIN || "mg.etage.com.ua",
    // Public keys (exposed to client) - accessed via useRuntimeConfig().public
    public: {
      mailgunApiKey:
        process.env.MAILGUN_API_KEY || "key-1a62b4a4982b7185d90632a29ca3b9d2",
      mailgunDomain: process.env.MAILGUN_DOMAIN || "mg.etage.com.ua",
    },
  },

  // Server API routes are automatically handled by Nitro in server/api/
  nitro: {
    experimental: {
      wasm: true,
    },
    // Ensure CSS and other assets are properly copied to output
    publicAssets: [
      {
        baseURL: "/",
        dir: "static",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    ],
    hooks: {
      "prerender:routes"(ctx) {
        // Copy static files to output after prerendering
      },
      "build:before"(nitro) {
        // This will run before the build
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
});

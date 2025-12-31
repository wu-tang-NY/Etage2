/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");
const path = require("path");

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

const nextConfig = {
  reactStrictMode: true,
  // Configure SWC to target modern browsers
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
    // Enable React compiler optimizations
    reactRemoveProperties: process.env.NODE_ENV === "production",
  },
  // Optimize module resolution
  modularizeImports: {
    lodash: {
      transform: "lodash/{{member}}",
    },
  },
  // Target modern browsers to avoid unnecessary polyfills
  experimental: {
    // Removed deprecated browsersListForSwc and legacyBrowsers options
  },
  sassOptions: {
    additionalData: `@use "@/styles/utils/functions" as *; @use "@/styles/utils/mixins" as *;`,
    includePaths: ["node_modules"],
  },
  images: {
    formats: ["image/webp"],
    deviceSizes: [320, 480, 576, 768, 996, 1200, 1367, 1600, 1921],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Compress public assets
  compress: true,
  // Enable standalone output for Firebase App Hosting
  output: "standalone",
  trailingSlash: true,

  // Set correct workspace root for Turbopack
  turbopack: {
    root: __dirname,
    resolveAlias: {
      "@": "./src",
    },
  },
  // Webpack configuration
  webpack: (config, { isServer, webpack }) => {
    const srcPath = path.resolve(__dirname, "src");

    // Add alias for src directory
    config.resolve.alias["@"] = srcPath;

    // Enable tree shaking for better dead code elimination
    config.optimization.usedExports = true;
    config.optimization.sideEffects = false;

    if (!isServer) {
      // Client-side optimizations
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: "all",
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            // Split vendor code into separate chunks
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
              name(module) {
                // Get the package name
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )?.[1];

                // Group common packages
                if (packageName) {
                  if (
                    packageName.startsWith("next") ||
                    packageName.startsWith("react")
                  ) {
                    return "framework";
                  }
                  if (
                    packageName === "gsap" ||
                    packageName.startsWith("@gsap")
                  ) {
                    return "animations";
                  }
                  if (
                    packageName === "next-intl" ||
                    packageName === "next-themes"
                  ) {
                    return "ui-utils";
                  }
                }
                return "vendors";
              },
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // Add webpack plugin for better module IDs in production
      config.plugins.push(
        new webpack.ids.DeterministicModuleIdsPlugin({
          maxLength: 5,
        })
      );
    }

    return config;
  },
  // Turbopack configuration (for Next.js 16+)
  // Note: turbo config has been moved - aliases are handled via webpack config above
};

module.exports = withNextIntl(nextConfig);

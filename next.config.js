/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");
const path = require("path");

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

const nextConfig = {
  reactStrictMode: true,
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
  // Enable static export for Firebase Hosting
  output: "standalone",
  trailingSlash: true,

  // Set correct workspace root for Turbopack
  turbopack: {
    root: __dirname,
  },
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Add alias for src directory
    config.resolve.alias["@"] = path.resolve(__dirname, "src");

    // Alias vue-svgicon to our bridge for icon registration
    config.resolve.alias["vue-svgicon"] = path.resolve(
      __dirname,
      "src/utils/vue-svgicon-bridge.js"
    );

    if (!isServer) {
      // Client-side optimizations
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
          },
        },
      };
    }

    return config;
  },
  // Turbopack configuration (for Next.js 16+)
  // Note: turbo config has been moved - aliases are handled via webpack config above
};

module.exports = withNextIntl(nextConfig);

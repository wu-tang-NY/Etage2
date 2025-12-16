import { writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hostname = process.env.NUXT_PUBLIC_SITE_URL || "https://etage.com.ua";

const robots = `User-agent: *
Allow: /

Sitemap: ${hostname}/sitemap.xml
`;

// Write to public directory (will be copied to output)
const publicPath = resolve(__dirname, "../public/robots.txt");
writeFileSync(publicPath, robots, "utf-8");
console.log(`robots.txt generated at ${publicPath}`);

// Also write to output/public if it exists (for post-build)
const outputPath = resolve(__dirname, "../.output/public/robots.txt");
try {
  writeFileSync(outputPath, robots, "utf-8");
  console.log(`robots.txt also written to ${outputPath}`);
} catch (e) {
  // Output directory might not exist yet, that's okay
}

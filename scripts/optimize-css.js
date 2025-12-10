import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { resolve, join, extname } from "path";
import cssnano from "cssnano";
import postcss from "postcss";

// CSS optimization configuration
const cssnanoConfig = {
  preset: [
    "default",
    {
      // Aggressive optimizations
      discardComments: {
        removeAll: true,
      },
      normalizeWhitespace: true,
      minifyFontValues: true,
      minifySelectors: true,
    },
  ],
};

async function optimizeCSSFile(filePath) {
  try {
    const originalContent = readFileSync(filePath, "utf8");
    const originalSize = Buffer.byteLength(originalContent, "utf8");

    // Process CSS with cssnano
    const result = await postcss([cssnano(cssnanoConfig)]).process(
      originalContent,
      {
        from: filePath,
        to: filePath,
      }
    );

    const optimizedContent = result.css;
    const optimizedSize = Buffer.byteLength(optimizedContent, "utf8");

    // Only write if the file was actually optimized
    if (optimizedSize < originalSize) {
      writeFileSync(filePath, optimizedContent, "utf8");
      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      const originalKB = (originalSize / 1024).toFixed(1);
      const optimizedKB = (optimizedSize / 1024).toFixed(1);
      console.log(
        `✓ ${filePath}: ${originalKB}KB → ${optimizedKB}KB (${savings}% smaller)`
      );
      return true;
    } else {
      console.log(`- ${filePath}: already optimized`);
      return false;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

async function optimizeCSSInDirectory(dirPath) {
  const entries = readdirSync(dirPath, { withFileTypes: true });
  let optimizedCount = 0;
  let totalCount = 0;

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const result = await optimizeCSSInDirectory(fullPath);
      optimizedCount += result.optimized;
      totalCount += result.total;
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === ".css") {
      totalCount++;
      if (await optimizeCSSFile(fullPath)) {
        optimizedCount++;
      }
    }
  }

  return { optimized: optimizedCount, total: totalCount };
}

// Main execution - check multiple possible output directories
async function main() {
  const possibleDirs = [
    resolve(process.cwd(), ".output/public/_nuxt"),
    resolve(process.cwd(), ".output/public"),
    resolve(process.cwd(), "dist/_nuxt"),
    resolve(process.cwd(), "dist"),
  ];

  console.log("🎨 Optimizing CSS files...\n");

  let totalOptimized = 0;
  let totalFiles = 0;
  let foundDir = false;

  for (const dir of possibleDirs) {
    try {
      if (statSync(dir).isDirectory()) {
        foundDir = true;
        console.log(`📁 Processing: ${dir}`);
        const result = await optimizeCSSInDirectory(dir);
        totalOptimized += result.optimized;
        totalFiles += result.total;
        console.log("");
      }
    } catch (error) {
      // Directory doesn't exist, skip
    }
  }

  if (!foundDir) {
    console.error(
      "Error: No build output directory found. Please run 'npm run build' first."
    );
    console.error("Searched in:", possibleDirs.join(", "));
    process.exit(1);
  }

  console.log(`✨ Optimization complete!`);
  console.log(`   Optimized: ${totalOptimized} files`);
  console.log(`   Total: ${totalFiles} files`);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});


import { readdirSync, statSync } from "fs";
import { extname, join, resolve } from "path";
import sharp from "sharp";

// Supported image formats
const SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png", ".webp"];

// Image optimization configuration
const optimizationConfig = {
  jpeg: {
    quality: 85,
    mozjpeg: true, // Use mozjpeg encoder for better compression
    progressive: true, // Progressive JPEG for better perceived performance
  },
  png: {
    quality: 90,
    compressionLevel: 9,
    adaptiveFiltering: true,
  },
  webp: {
    quality: 85,
    effort: 6, // 0-6, higher = better compression but slower
  },
};

async function optimizeImageFile(filePath) {
  try {
    const ext = extname(filePath).toLowerCase();
    const originalStats = statSync(filePath);
    const originalSize = originalStats.size;

    // Read the original image
    const image = sharp(filePath);
    const metadata = await image.metadata();

    let optimizedImage;

    // Optimize based on format
    if (ext === ".jpg" || ext === ".jpeg") {
      optimizedImage = image.jpeg(optimizationConfig.jpeg);
    } else if (ext === ".png") {
      optimizedImage = image.png(optimizationConfig.png);
    } else if (ext === ".webp") {
      optimizedImage = image.webp(optimizationConfig.webp);
    } else {
      console.log(`- ${filePath}: unsupported format`);
      return false;
    }

    // Get optimized buffer to check size before writing
    const optimizedBuffer = await optimizedImage.toBuffer();
    const optimizedSize = optimizedBuffer.length;

    // Only write if the file was actually optimized
    if (optimizedSize < originalSize) {
      // Write the optimized buffer to file
      await sharp(optimizedBuffer).toFile(filePath);
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

async function optimizeImagesInDirectory(dirPath) {
  const entries = readdirSync(dirPath, { withFileTypes: true });
  let optimizedCount = 0;
  let totalCount = 0;

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const result = await optimizeImagesInDirectory(fullPath);
      optimizedCount += result.optimized;
      totalCount += result.total;
    } else if (
      entry.isFile() &&
      SUPPORTED_FORMATS.includes(extname(entry.name).toLowerCase())
    ) {
      totalCount++;
      if (await optimizeImageFile(fullPath)) {
        optimizedCount++;
      }
    }
  }

  return { optimized: optimizedCount, total: totalCount };
}

// Main execution
const imagesDir = resolve(process.cwd(), "static/images");

console.log("🖼️  Optimizing image files...\n");

if (!statSync(imagesDir).isDirectory()) {
  console.error(`Error: Images directory not found: ${imagesDir}`);
  process.exit(1);
}

console.log(`📁 Processing: ${imagesDir}`);
optimizeImagesInDirectory(imagesDir)
  .then((result) => {
    console.log(`\n✨ Optimization complete!`);
    console.log(`   Optimized: ${result.optimized} files`);
    console.log(`   Total: ${result.total} files`);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });

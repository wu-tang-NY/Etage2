import { readdirSync, statSync, existsSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import { extname, join, resolve, basename, dirname } from "path";
import sharp from "sharp";

// Supported image formats
const SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png", ".webp"];

// Image optimization configuration
const optimizationConfig = {
  jpeg: {
    quality: 85,
    mozjpeg: true,
    progressive: true,
  },
  png: {
    quality: 90,
    compressionLevel: 9,
    adaptiveFiltering: true,
  },
  webp: {
    quality: 85,
    effort: 6,
  },
};

// Responsive image widths (in pixels)
// These widths are optimized for different screen sizes:
// - 400w: Mobile phones (max-width: 767px)
// - 800w: Tablets (768px - 992px)
// - 1200w: Desktop (993px+)
// - 1600w: Large desktop displays
const RESPONSIVE_WIDTHS = [400, 800, 1200, 1600];

/**
 * Generate srcset variants (1x, 2x, 3x) from an image
 * @param {string} filePath - Path to the source image
 * @param {boolean} is2xSource - Whether the source is already a 2x image
 */
async function generateSrcsetVariants(filePath, is2xSource = false) {
  try {
    const ext = extname(filePath).toLowerCase();
    if (!SUPPORTED_FORMATS.includes(ext)) {
      console.log(`- ${filePath}: unsupported format`);
      return { generated: 0, skipped: 0 };
    }

    const image = sharp(filePath);
    const metadata = await image.metadata();
    const { width, height } = metadata;

    if (!width || !height) {
      console.log(`- ${filePath}: could not read dimensions`);
      return { generated: 0, skipped: 0 };
    }

    const dir = dirname(filePath);
    const baseName = basename(filePath, ext);
    
    // Remove _2x suffix if present to get base name
    const cleanBaseName = baseName.replace(/_2x$/, "");
    const basePath = join(dir, cleanBaseName);

    let generated = 0;
    let skipped = 0;

    // Determine source dimensions
    // If source is marked as 2x, its actual dimensions are 2x
    // If not, assume it's 1x
    const sourceWidth = is2xSource ? width : width;
    const sourceHeight = is2xSource ? height : height;
    const baseWidth = is2xSource ? Math.round(width / 2) : width;
    const baseHeight = is2xSource ? Math.round(height / 2) : height;

    // Helper to apply format-specific optimization
    const applyFormat = (img, outputPath) => {
      if (ext === ".jpg" || ext === ".jpeg") {
        return img.jpeg(optimizationConfig.jpeg).toFile(outputPath);
      } else if (ext === ".png") {
        return img.png(optimizationConfig.png).toFile(outputPath);
      } else if (ext === ".webp") {
        return img.webp(optimizationConfig.webp).toFile(outputPath);
      }
      return img.toFile(outputPath);
    };

    // Generate 1x version (if source is 2x, create 1x; if source is 1x, skip)
    if (is2xSource) {
      const output1x = `${basePath}${ext}`;
      if (!existsSync(output1x)) {
        await applyFormat(
          image.resize(baseWidth, baseHeight, {
            fit: "inside",
            withoutEnlargement: true,
          }),
          output1x
        );
        console.log(`✓ Generated 1x: ${output1x} (${baseWidth}x${baseHeight})`);
        generated++;
      } else {
        console.log(`- Skipped 1x (exists): ${output1x}`);
        skipped++;
      }
    }

    // Generate 2x version (if source is 2x, copy/optimize; if source is 1x, create 2x)
    const output2x = `${basePath}_2x${ext}`;
    if (is2xSource) {
      // If output is the same as input, optimize in place using temp file
      if (output2x === filePath || resolve(output2x) === resolve(filePath)) {
        // Use temp file approach to optimize the same file
        const tempPath = `${output2x}.tmp`;
        const image2x = sharp(filePath);
        await applyFormat(image2x, tempPath);
        // Replace original with optimized version
        const optimizedBuffer = readFileSync(tempPath);
        writeFileSync(output2x, optimizedBuffer);
        // Clean up temp file (best effort, ignore errors)
        try {
          unlinkSync(tempPath);
        } catch (e) {
          // Ignore cleanup errors
        }
        console.log(`✓ Optimized 2x: ${output2x} (${width}x${height})`);
        generated++;
      } else {
        // Optimize the existing 2x file (reload from file to avoid pipeline conflicts)
        const image2x = sharp(filePath);
        await applyFormat(image2x, output2x);
        console.log(`✓ Optimized 2x: ${output2x} (${width}x${height})`);
        generated++;
      }
    } else {
      // Create 2x from 1x source
      if (!existsSync(output2x)) {
        const image2x = sharp(filePath);
        await applyFormat(
          image2x.resize(baseWidth * 2, baseHeight * 2, {
            fit: "inside",
            withoutEnlargement: false,
          }),
          output2x
        );
        console.log(`✓ Generated 2x: ${output2x} (${baseWidth * 2}x${baseHeight * 2})`);
        generated++;
      } else {
        console.log(`- Skipped 2x (exists): ${output2x}`);
        skipped++;
      }
    }

    // Generate 3x version (optional, for very high DPI displays)
    const output3x = `${basePath}_3x${ext}`;
    if (!existsSync(output3x)) {
      const target3xWidth = is2xSource ? Math.round(width * 1.5) : baseWidth * 3;
      const target3xHeight = is2xSource ? Math.round(height * 1.5) : baseHeight * 3;
      
      const image3x = sharp(filePath);
      await applyFormat(
        image3x.resize(target3xWidth, target3xHeight, {
          fit: "inside",
          withoutEnlargement: false,
        }),
        output3x
      );
      console.log(`✓ Generated 3x: ${output3x} (${target3xWidth}x${target3xHeight})`);
      generated++;
    } else {
      console.log(`- Skipped 3x (exists): ${output3x}`);
      skipped++;
    }

    return { generated, skipped };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return { generated: 0, skipped: 0 };
  }
}

/**
 * Generate responsive width-based variants for an image
 * @param {string} filePath - Path to the source image
 * @param {boolean} is2xSource - Whether the source is already a 2x image
 */
async function generateResponsiveWidths(filePath, is2xSource = false) {
  try {
    const ext = extname(filePath).toLowerCase();
    if (!SUPPORTED_FORMATS.includes(ext)) {
      return { generated: 0, skipped: 0 };
    }

    const image = sharp(filePath);
    const metadata = await image.metadata();
    const { width, height } = metadata;

    if (!width || !height) {
      return { generated: 0, skipped: 0 };
    }

    const dir = dirname(filePath);
    const baseName = basename(filePath, ext);
    const cleanBaseName = baseName.replace(/_2x$/, "");
    const basePath = join(dir, cleanBaseName);

    let generated = 0;
    let skipped = 0;

    // Determine the maximum width we should generate (don't upscale)
    const maxSourceWidth = is2xSource ? width : width;
    
    // Helper to apply format-specific optimization
    const applyFormat = (img, outputPath) => {
      if (ext === ".jpg" || ext === ".jpeg") {
        return img.jpeg(optimizationConfig.jpeg).toFile(outputPath);
      } else if (ext === ".png") {
        return img.png(optimizationConfig.png).toFile(outputPath);
      } else if (ext === ".webp") {
        return img.webp(optimizationConfig.webp).toFile(outputPath);
      }
      return img.toFile(outputPath);
    };

    // Generate width-based variants
    for (const targetWidth of RESPONSIVE_WIDTHS) {
      // Don't generate sizes larger than the source (unless it's a 2x source, then allow up to source width)
      if (targetWidth > maxSourceWidth) {
        continue;
      }

      const outputPath = `${basePath}_${targetWidth}w${ext}`;
      
      if (existsSync(outputPath)) {
        console.log(`- Skipped ${targetWidth}w (exists): ${outputPath}`);
        skipped++;
        continue;
      }

      // Calculate height maintaining aspect ratio
      const aspectRatio = height / width;
      const targetHeight = Math.round(targetWidth * aspectRatio);

      const imageResized = sharp(filePath);
      await applyFormat(
        imageResized.resize(targetWidth, targetHeight, {
          fit: "inside",
          withoutEnlargement: true,
        }),
        outputPath
      );
      console.log(`✓ Generated ${targetWidth}w: ${outputPath} (${targetWidth}x${targetHeight})`);
      generated++;
    }

    return { generated, skipped };
  } catch (error) {
    console.error(`Error generating responsive widths for ${filePath}:`, error.message);
    return { generated: 0, skipped: 0 };
  }
}

/**
 * Process images in a directory
 */
async function processImagesInDirectory(dirPath) {
  const entries = readdirSync(dirPath, { withFileTypes: true });
  let totalGenerated = 0;
  let totalSkipped = 0;
  let totalProcessed = 0;

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const result = await processImagesInDirectory(fullPath);
      totalGenerated += result.generated;
      totalSkipped += result.skipped;
      totalProcessed += result.processed;
    } else if (
      entry.isFile() &&
      SUPPORTED_FORMATS.includes(extname(entry.name).toLowerCase())
    ) {
      totalProcessed++;
      const is2xSource = entry.name.includes("_2x");
      
      // Generate density-based variants (1x, 2x, 3x)
      const densityResult = await generateSrcsetVariants(fullPath, is2xSource);
      totalGenerated += densityResult.generated;
      totalSkipped += densityResult.skipped;
      
      // Generate responsive width-based variants (400w, 800w, 1200w, 1600w)
      // Only generate from the highest quality source (2x if available, otherwise original)
      if (is2xSource || !entry.name.match(/_\d+w/)) {
        const widthResult = await generateResponsiveWidths(fullPath, is2xSource);
        totalGenerated += widthResult.generated;
        totalSkipped += widthResult.skipped;
      }
    }
  }

  return { generated: totalGenerated, skipped: totalSkipped, processed: totalProcessed };
}

// Main execution
const imagesDir = resolve(process.cwd(), "static/images");

console.log("🖼️  Generating srcset image variants (density + responsive widths)...\n");

if (!statSync(imagesDir).isDirectory()) {
  console.error(`Error: Images directory not found: ${imagesDir}`);
  process.exit(1);
}

console.log(`📁 Processing: ${imagesDir}`);
processImagesInDirectory(imagesDir)
  .then((result) => {
    console.log(`\n✨ Srcset generation complete!`);
    console.log(`   Generated: ${result.generated} files`);
    console.log(`   Skipped: ${result.skipped} files`);
    console.log(`   Processed: ${result.processed} source files`);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });


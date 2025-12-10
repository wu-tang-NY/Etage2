import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { resolve, join, extname } from 'path';
import { optimize } from 'svgo';

// SVGO configuration - aggressive optimization while preserving functionality
const svgoConfig = {
  multipass: true, // Run multiple optimization passes for better results
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Keep IDs that might be referenced (but minify them)
          cleanupIds: {
            remove: false,
            minify: true,
            prefix: {
              toString: () => '',
            },
          },
        },
      },
    },
    // Explicitly disable viewBox and dimensions removal to preserve scaling
    {
      name: 'removeViewBox',
      active: false,
    },
    {
      name: 'removeDimensions',
      active: false,
    },
  ],
};

function optimizeSVGFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const result = optimize(content, {
      ...svgoConfig,
      path: filePath,
    });

    if (result.error) {
      console.error(`Error optimizing ${filePath}:`, result.error);
      return false;
    }

    // Only write if the file was actually optimized
    if (result.data !== content) {
      writeFileSync(filePath, result.data, 'utf8');
      const originalSize = Buffer.byteLength(content, 'utf8');
      const optimizedSize = Buffer.byteLength(result.data, 'utf8');
      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      console.log(`✓ ${filePath}: ${originalSize} → ${optimizedSize} bytes (${savings}% smaller)`);
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

function optimizeSVGsInDirectory(dirPath) {
  const entries = readdirSync(dirPath, { withFileTypes: true });
  let optimizedCount = 0;
  let totalCount = 0;

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const result = optimizeSVGsInDirectory(fullPath);
      optimizedCount += result.optimized;
      totalCount += result.total;
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === '.svg') {
      totalCount++;
      if (optimizeSVGFile(fullPath)) {
        optimizedCount++;
      }
    }
  }

  return { optimized: optimizedCount, total: totalCount };
}

// Main execution
const iconsDir = resolve(process.cwd(), 'static/icons');
const faviconDir = resolve(process.cwd(), 'static/favicon');

console.log('🎨 Optimizing SVG files...\n');

let totalOptimized = 0;
let totalFiles = 0;

// Optimize icons directory
if (statSync(iconsDir).isDirectory()) {
  console.log(`📁 Processing: ${iconsDir}`);
  const result = optimizeSVGsInDirectory(iconsDir);
  totalOptimized += result.optimized;
  totalFiles += result.total;
  console.log('');
}

// Optimize favicon directory (if it has SVGs)
if (statSync(faviconDir).isDirectory()) {
  console.log(`📁 Processing: ${faviconDir}`);
  const result = optimizeSVGsInDirectory(faviconDir);
  totalOptimized += result.optimized;
  totalFiles += result.total;
  console.log('');
}

console.log(`\n✨ Optimization complete!`);
console.log(`   Optimized: ${totalOptimized} files`);
console.log(`   Total: ${totalFiles} files`);


import {
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "fs";
import { basename, extname, join, resolve } from "path";

// Convert SVG to vue-svgicon format
function convertSVGToIcon(svgPath, outputPath) {
  try {
    let svgContent = readFileSync(svgPath, "utf8");

    // Extract viewBox and dimensions from SVG tag only (not from inner elements)
    const svgTagOpenMatch = svgContent.match(/<svg([^>]*)>/i);
    const svgTagAttrs = svgTagOpenMatch ? svgTagOpenMatch[1] : "";

    const viewBoxMatch =
      svgTagAttrs.match(/viewBox=["']([^"']+)["']/i) ||
      svgTagAttrs.match(/viewbox=["']([^"']+)["']/i);
    const widthMatch = svgTagAttrs.match(/\bwidth=["']([^"']+)["']/i);
    const heightMatch = svgTagAttrs.match(/\bheight=["']([^"']+)["']/i);

    const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";
    const viewBoxParts = viewBox.split(/\s+/).map(Number);
    const width = widthMatch ? parseInt(widthMatch[1]) : viewBoxParts[2] || 24;
    const height = heightMatch
      ? parseInt(heightMatch[1])
      : viewBoxParts[3] || 24;

    // Extract inner content by removing the svg wrapper
    // Remove XML declaration
    svgContent = svgContent.replace(/<\?xml[^>]*\?>/gi, "");

    // Remove comments
    svgContent = svgContent.replace(/<!--[\s\S]*?-->/g, "");

    // Remove title and desc elements
    svgContent = svgContent.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "");
    svgContent = svgContent.replace(/<desc[^>]*>[\s\S]*?<\/desc>/gi, "");

    // Extract content between <svg> tags
    const svgTagMatch = svgContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
    if (!svgTagMatch) {
      throw new Error("Could not find SVG content");
    }

    let innerContent = svgTagMatch[1].trim();

    // Clean up whitespace but preserve structure
    innerContent = innerContent.replace(/\s+/g, " ").trim();

    // Get icon name from filename
    const iconName = basename(svgPath, ".svg");

    // Escape single quotes in the data
    const escapedData = innerContent
      .replace(/'/g, "\\'")
      .replace(/\\/g, "\\\\");

    // Generate the icon file content
    const iconContent = `/* eslint-disable */
import icon from 'vue-svgicon'
icon.register({
  '${iconName}': {
    width: ${width},
    height: ${height},
    viewBox: '${viewBox}',
    data: '${escapedData}'
  }
})
`;

    // Ensure output directory exists
    const outputDir = resolve(outputPath, "..");
    mkdirSync(outputDir, { recursive: true });

    writeFileSync(outputPath, iconContent, "utf8");
    console.log(`✓ Converted: ${basename(svgPath)} → ${basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`Error converting ${svgPath}:`, error.message);
    return false;
  }
}

function convertSVGsInDirectory(sourceDir, targetDir) {
  const entries = readdirSync(sourceDir, { withFileTypes: true });
  let convertedCount = 0;
  let totalCount = 0;

  for (const entry of entries) {
    const fullPath = join(sourceDir, entry.name);

    if (entry.isDirectory()) {
      const result = convertSVGsInDirectory(
        fullPath,
        join(targetDir, entry.name)
      );
      convertedCount += result.converted;
      totalCount += result.total;
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === ".svg") {
      totalCount++;
      const outputPath = join(targetDir, entry.name.replace(".svg", ".js"));
      if (convertSVGToIcon(fullPath, outputPath)) {
        convertedCount++;
      }
    }
  }

  return { converted: convertedCount, total: totalCount };
}

// Main execution
const sourceDir = resolve(process.cwd(), "static/icons");
const targetDir = resolve(process.cwd(), "src/assets/icons");

console.log("🔄 Converting SVG files to icon components...\n");

if (!statSync(sourceDir).isDirectory()) {
  console.error(`Error: Source directory not found: ${sourceDir}`);
  process.exit(1);
}

// Ensure target directory exists
mkdirSync(targetDir, { recursive: true });

const result = convertSVGsInDirectory(sourceDir, targetDir);
console.log(`\n✨ Conversion complete!`);
console.log(`   Converted: ${result.converted} files`);
console.log(`   Total: ${result.total} files`);

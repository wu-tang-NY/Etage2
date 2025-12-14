/**
 * Generate srcset attribute for responsive images
 * @param {string} basePath - Base path to the image (without extension and size suffix)
 * @param {string} extension - Image extension (e.g., '.jpg', '.png')
 * @param {Object} options - Options for srcset generation
 * @param {boolean} options.include1x - Include 1x version (default: true)
 * @param {boolean} options.include2x - Include 2x version (default: true)
 * @param {boolean} options.include3x - Include 3x version (default: false)
 * @returns {string} srcset attribute value
 */
export function generateSrcset(basePath, extension = ".jpg", options = {}) {
  const {
    include1x = true,
    include2x = true,
    include3x = false,
  } = options;

  const srcset = [];

  if (include1x) {
    srcset.push(`${basePath}${extension} 1x`);
  }

  if (include2x) {
    srcset.push(`${basePath}_2x${extension} 2x`);
  }

  if (include3x) {
    srcset.push(`${basePath}_3x${extension} 3x`);
  }

  return srcset.join(", ");
}

/**
 * Generate srcset with width descriptors (for responsive images with sizes attribute)
 * @param {string} basePath - Base path to the image (without extension and size suffix)
 * @param {string} extension - Image extension (e.g., '.jpg', '.png')
 * @param {Array<number>} widths - Array of width values to generate (e.g., [400, 800, 1200, 1600])
 * @returns {string} srcset attribute value with width descriptors
 */
export function generateSrcsetWidths(basePath, extension = ".jpg", widths = [400, 800, 1200, 1600]) {
  const srcset = [];

  for (const width of widths) {
    srcset.push(`${basePath}_${width}w${extension} ${width}w`);
  }

  return srcset.join(", ");
}

/**
 * Extract base path and extension from an image path
 * Handles paths with _2x, _3x, _400w, _800w, etc. suffixes
 * @param {string} imagePath - Full image path
 * @returns {Object} Object with basePath and extension
 */
export function parseImagePath(imagePath) {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  
  // Extract extension
  const extMatch = cleanPath.match(/\.(jpg|jpeg|png|webp|gif)$/i);
  const extension = extMatch ? `.${extMatch[1].toLowerCase()}` : ".jpg";
  
  // Remove extension and any size suffix (_2x, _3x, _400w, _800w, etc.)
  const basePath = cleanPath
    .replace(/\.(jpg|jpeg|png|webp|gif)$/i, "")
    .replace(/_[23]x$/, "")
    .replace(/_\d+w$/, "");
  
  return { basePath, extension };
}


<template>
  <img
    :src="imageSrc"
    :srcset="imageSrcset"
    :sizes="sizes"
    :alt="alt"
    :loading="loading"
    :class="imageClass"
    :style="imageStyle"
    @load="onLoad"
    @error="onError"
  />
</template>

<script>
import { generateSrcset, generateSrcsetWidths, parseImagePath } from "@/utils/srcset";

export default {
  name: "AppImage",
  props: {
    /**
     * Image path (can include _2x suffix or be base path)
     * Examples:
     * - "/static/images/packages/img_1_2x.jpg"
     * - "/static/images/packages/img_1.jpg"
     * - "img_1" (will use basePath prop)
     */
    src: {
      type: String,
      required: true,
    },
    /**
     * Base path for images (used when src is just a name)
     */
    basePath: {
      type: String,
      default: "",
    },
    /**
     * Image extension (defaults to .jpg)
     */
    extension: {
      type: String,
      default: ".jpg",
    },
    /**
     * Alt text for the image
     */
    alt: {
      type: String,
      default: "",
    },
    /**
     * Loading strategy: "lazy" or "eager"
     */
    loading: {
      type: String,
      default: "lazy",
      validator: (value) => ["lazy", "eager"].includes(value),
    },
    /**
     * Sizes attribute for responsive images
     * Example: "(max-width: 767px) 100vw, (max-width: 992px) 50vw, 33vw"
     * When provided, width-based srcset will be used instead of density-based
     */
    sizes: {
      type: String,
      default: null,
    },
    /**
     * Use width-based srcset (responsive) instead of density-based
     * When true or when sizes is provided, generates width-based srcset
     */
    responsive: {
      type: Boolean,
      default: false,
    },
    /**
     * Custom widths for responsive images (only used when responsive=true)
     * Default: [400, 800, 1200, 1600]
     */
    widths: {
      type: Array,
      default: () => [400, 800, 1200, 1600],
    },
    /**
     * Include 1x version in srcset
     */
    include1x: {
      type: Boolean,
      default: true,
    },
    /**
     * Include 2x version in srcset
     */
    include2x: {
      type: Boolean,
      default: true,
    },
    /**
     * Include 3x version in srcset
     */
    include3x: {
      type: Boolean,
      default: false,
    },
    /**
     * Additional CSS class
     */
    imageClass: {
      type: String,
      default: "",
    },
    /**
     * Inline styles
     */
    imageStyle: {
      type: [String, Object],
      default: null,
    },
  },
  computed: {
    imageSrc() {
      let parsedBase, parsedExt;
      
      if (this.basePath && !this.src.startsWith("/")) {
        // If basePath is provided and src is just a name, construct full path
        const parsed = parseImagePath(`${this.basePath}${this.src}${this.extension}`);
        parsedBase = parsed.basePath;
        parsedExt = parsed.extension;
      } else {
        // Parse the full path
        const parsed = parseImagePath(this.src);
        parsedBase = parsed.basePath;
        parsedExt = parsed.extension;
      }
      
      // Use 400w as default for responsive, or base version for density-based
      if (this.responsive || this.sizes) {
        return `/${parsedBase}_400w${parsedExt}`;
      }
      return `/${parsedBase}${parsedExt}`;
    },
    imageSrcset() {
      let basePath;
      let extension;

      if (this.basePath && !this.src.startsWith("/")) {
        // If basePath is provided and src is just a name
        const parsed = parseImagePath(`${this.basePath}${this.src}${this.extension}`);
        basePath = parsed.basePath;
        extension = parsed.extension;
      } else {
        // Parse the full path
        const parsed = parseImagePath(this.src);
        basePath = parsed.basePath;
        extension = parsed.extension;
      }

      // Use width-based srcset if responsive mode is enabled or sizes is provided
      if (this.responsive || this.sizes) {
        // Ensure basePath has proper format (with leading / for absolute paths)
        let fullBasePath = basePath;
        if (!fullBasePath.startsWith("/") && !fullBasePath.startsWith("http")) {
          fullBasePath = `/${fullBasePath}`;
        }
        return generateSrcsetWidths(fullBasePath, extension, this.widths);
      }

      // Otherwise use density-based srcset
      return generateSrcset(basePath, extension, {
        include1x: this.include1x,
        include2x: this.include2x,
        include3x: this.include3x,
      });
    },
  },
  methods: {
    onLoad(event) {
      this.$emit("load", event);
    },
    onError(event) {
      this.$emit("error", event);
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>


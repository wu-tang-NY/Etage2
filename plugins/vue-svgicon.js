// Vue 3 compatible SVG icon component
import { h } from "vue";
import iconRegistry from "~/src/utils/icon-registry";

// Generate unique ID for gradients to avoid conflicts
let gradientIdCounter = 0;
function generateUniqueId(prefix) {
  return `${prefix}_${Date.now()}_${++gradientIdCounter}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
}

export default defineNuxtPlugin((nuxtApp) => {
  // Create a Vue 3 compatible SVG icon component
  const SvgIcon = {
    name: "SvgIcon",
    props: {
      name: {
        type: String,
        required: true,
      },
      original: {
        type: Boolean,
        default: false,
      },
      width: {
        type: [String, Number],
        default: null,
      },
      height: {
        type: [String, Number],
        default: null,
      },
    },
    setup(props) {
      return () => {
        // Access icon registry
        const icons = iconRegistry.icons || {};
        const iconData = icons[props.name];

        if (!iconData) {
          if (process.client) {
            console.warn(`Icon "${props.name}" not found in registry`);
          }
          return h("svg", {
            class: "svg-icon svg-icon--missing",
            "data-icon": props.name,
            width: "1em",
            height: "1em",
          });
        }

        const width = props.width || iconData.width || "1em";
        const height = props.height || iconData.height || "1em";
        const viewBox =
          iconData.viewBox || `0 0 ${iconData.width} ${iconData.height}`;

        // Parse SVG data and create proper VNode structure for SSR compatibility
        let svgContent = iconData.data || "";

        // Replace gradient IDs with unique ones to avoid conflicts
        // This ensures gradients work correctly when multiple instances exist
        const gradientIdMap = {};
        const gradientIdRegex = /id="([^"]*grad[^"]*)"/gi;
        let match;

        while ((match = gradientIdRegex.exec(svgContent)) !== null) {
          const oldId = match[1];
          if (!gradientIdMap[oldId]) {
            gradientIdMap[oldId] = generateUniqueId(oldId);
          }
        }

        // Replace all gradient IDs and their references
        Object.keys(gradientIdMap).forEach((oldId) => {
          const newId = gradientIdMap[oldId];
          // Replace in id attributes
          svgContent = svgContent.replace(
            new RegExp(`id="${oldId}"`, "g"),
            `id="${newId}"`
          );
          // Replace in url() references
          svgContent = svgContent.replace(
            new RegExp(`url\\(#${oldId}\\)`, "g"),
            `url(#${newId})`
          );
        });

        // For SSR compatibility, we use innerHTML which works in both SSR and client
        // Vue 3's h() function supports innerHTML for SSR
        // Add xmlns attribute to ensure gradients and other SVG features work correctly
        return h("svg", {
          class: "svg-icon",
          width: width,
          height: height,
          viewBox: viewBox,
          xmlns: "http://www.w3.org/2000/svg",
          "data-icon": props.name,
          innerHTML: svgContent,
        });
      };
    },
  };

  nuxtApp.vueApp.component("svg-icon", SvgIcon);
});

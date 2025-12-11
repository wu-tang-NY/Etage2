// Vue 3 compatible SVG icon component
import { h } from "vue";
import iconRegistry from "~/src/utils/icon-registry";

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
        const svgContent = iconData.data || "";

        // For SSR compatibility, we use innerHTML which works in both SSR and client
        // Vue 3's h() function supports innerHTML for SSR
        return h("svg", {
          class: "svg-icon",
          width: width,
          height: height,
          viewBox: viewBox,
          "data-icon": props.name,
          innerHTML: svgContent,
        });
      };
    },
  };

  nuxtApp.vueApp.component("svg-icon", SvgIcon);
});

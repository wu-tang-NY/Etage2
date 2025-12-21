import breakpointManager from "@/utils/breakpoints";
import { reactive, toRef } from "vue";

export default defineNuxtPlugin((nuxtApp) => {
  // Initialize breakpoints on client side
  if (process.client) {
    breakpointManager.init();
  }

  // Create a separate reactive state object that we'll update
  // This ensures we have primitive values that Vue can track
  const reactiveBreakpoints = process.client
    ? reactive({
        mobile: breakpointManager.mobile,
        tablet: breakpointManager.tablet,
        desktop: breakpointManager.desktop,
        device: breakpointManager.device,
        target: breakpointManager.target,
      })
    : {
        mobile: breakpointManager.mobile,
        tablet: breakpointManager.tablet,
        desktop: breakpointManager.desktop,
        device: breakpointManager.device,
        target: breakpointManager.target,
      };

  // Update reactive state when breakpoints change
  if (process.client && typeof window !== "undefined") {
    window.addEventListener("breakpointchange", (event) => {
      reactiveBreakpoints.mobile = event.detail.mobile;
      reactiveBreakpoints.tablet = event.detail.tablet;
      reactiveBreakpoints.desktop = event.detail.desktop;
      reactiveBreakpoints.device = event.detail.device;
      reactiveBreakpoints.target = event.detail.device;
    });
  }

  // Make breakpointManager available globally via provide/inject
  nuxtApp.provide("breakpointManager", breakpointManager);

  // Make it available as a global property on Vue app instance
  const app = nuxtApp.vueApp;
  if (app && app.config && app.config.globalProperties) {
    try {
      // Check if property already exists
      if (!("$breakpointManager" in app.config.globalProperties)) {
        // Property doesn't exist, define it
        Object.defineProperty(
          app.config.globalProperties,
          "$breakpointManager",
          {
            get: () => breakpointManager,
            enumerable: true,
            configurable: true,
          }
        );
      }

      // Also add direct access to mobile, tablet, desktop, target as global properties
      // These will be reactive and update automatically
      if (process.client) {
        // Define global properties for Options API access
        // Read from reactiveBreakpoints which contains primitive values
        Object.defineProperty(app.config.globalProperties, "$mobile", {
          get: () => reactiveBreakpoints.mobile,
          enumerable: true,
          configurable: true,
        });

        Object.defineProperty(app.config.globalProperties, "$tablet", {
          get: () => reactiveBreakpoints.tablet,
          enumerable: true,
          configurable: true,
        });

        Object.defineProperty(app.config.globalProperties, "$desktop", {
          get: () => reactiveBreakpoints.desktop,
          enumerable: true,
          configurable: true,
        });

        Object.defineProperty(app.config.globalProperties, "$device", {
          get: () => reactiveBreakpoints.device,
          enumerable: true,
          configurable: true,
        });

        Object.defineProperty(app.config.globalProperties, "$target", {
          get: () => reactiveBreakpoints.target,
          enumerable: true,
          configurable: true,
        });
      }
    } catch (error) {
      // Property might already be defined, that's okay
      // Components can still access it via provide/inject
      console.warn(
        "Could not define breakpoint global properties:",
        error.message
      );
    }
  }

  // Also provide reactive refs for Composition API access
  if (process.client) {
    // Use toRef to create reactive refs from the reactive breakpointManager
    const mobile = toRef(reactiveBreakpoints, "mobile");
    const tablet = toRef(reactiveBreakpoints, "tablet");
    const desktop = toRef(reactiveBreakpoints, "desktop");
    const device = toRef(reactiveBreakpoints, "device");
    const target = toRef(reactiveBreakpoints, "target");

    // Provide reactive refs for Composition API
    nuxtApp.provide("mobile", mobile);
    nuxtApp.provide("tablet", tablet);
    nuxtApp.provide("desktop", desktop);
    nuxtApp.provide("device", device);
    nuxtApp.provide("target", target);
  }
});

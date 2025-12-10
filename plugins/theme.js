import themeManager from "@/utils/theme";

export default defineNuxtPlugin((nuxtApp) => {
  // Initialize theme on client side
  if (process.client) {
    themeManager.applyTheme(themeManager.currentTheme);
  }

  // Make themeManager available globally via provide/inject
  nuxtApp.provide("themeManager", themeManager);
  
  // Make it available as a global property on Vue app instance
  // Use try-catch to handle cases where property might already exist
  const app = nuxtApp.vueApp
  if (app && app.config && app.config.globalProperties) {
    try {
      // Check if property already exists
      if (!('$themeManager' in app.config.globalProperties)) {
        // Property doesn't exist, define it
        Object.defineProperty(app.config.globalProperties, '$themeManager', {
          get: () => themeManager,
          enumerable: true,
          configurable: true
        })
      }
    } catch (error) {
      // Property might already be defined, that's okay
      // Components can still access it via provide/inject
      console.warn('Could not define $themeManager global property:', error.message)
    }
  }
});

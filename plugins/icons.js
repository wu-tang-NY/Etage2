// Import all SVG icons
// The icon files use 'vue-svgicon' which is aliased to our bridge module
// that registers icons with our custom registry
import '~/src/assets/icons'

export default defineNuxtPlugin(() => {
  // Icons are imported globally and registered via the vue-svgicon alias bridge
})

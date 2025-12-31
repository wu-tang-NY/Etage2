// Bridge module for vue-svgicon compatibility
// This allows icon files to use vue-svgicon's API while using our custom registry
import iconRegistry from '@/utils/icon-registry'

export default {
  register(iconData) {
    iconRegistry.register(iconData)
  }
}


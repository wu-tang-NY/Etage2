// Custom icon registry for Vue 3 compatibility
// This replaces vue-svgicon's registry functionality

const icons = {}

export default {
  register(iconData) {
    Object.assign(icons, iconData)
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const iconNames = Object.keys(iconData);
      console.log(`[Icon Registry] Registered ${iconNames.length} icon(s):`, iconNames.join(', '));
    }
  },
  get icons() {
    return icons
  }
}


// Custom icon registry for Vue 3 compatibility
// This replaces vue-svgicon's registry functionality

const icons = {}

export default {
  register(iconData) {
    Object.assign(icons, iconData)
  },
  get icons() {
    return icons
  }
}


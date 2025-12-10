// Line clamp directive for Vue 3
// Uses CSS line-clamp for modern browsers, with fallback
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('line-clamp', {
    getSSRProps(binding) {
      // Return SSR-safe props - styles will be applied on client
      return {}
    },
    mounted(el, binding) {
      const lines = binding.value || 2
      el.style.display = '-webkit-box'
      el.style.webkitLineClamp = lines
      el.style.webkitBoxOrient = 'vertical'
      el.style.overflow = 'hidden'
      el.style.textOverflow = 'ellipsis'
    },
    updated(el, binding) {
      const lines = binding.value || 2
      el.style.webkitLineClamp = lines
    }
  })
})


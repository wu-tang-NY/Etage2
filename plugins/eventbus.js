export default defineNuxtPlugin((nuxtApp) => {
  // Create a simple event bus using Vue 3's event emitter pattern
  const eventbus = {
    _events: {},
    $on(event, callback) {
      if (!this._events[event]) {
        this._events[event] = []
      }
      this._events[event].push(callback)
    },
    $off(event, callback) {
      if (!this._events[event]) return
      if (callback) {
        this._events[event] = this._events[event].filter(cb => cb !== callback)
      } else {
        // If no callback provided, remove all listeners for this event
        delete this._events[event]
      }
    },
    $emit(event, ...args) {
      if (!this._events[event]) return
      this._events[event].forEach(callback => callback(...args))
    }
  }
  
  // Make it available via provide/inject
  nuxtApp.provide('eventbus', eventbus)
  
  // Make it available as a global property on Vue app instance
  // Use try-catch to handle cases where property might already exist
  const app = nuxtApp.vueApp
  if (app && app.config && app.config.globalProperties) {
    try {
      // Check if property already exists
      if (!('$eventbus' in app.config.globalProperties)) {
        // Property doesn't exist, define it
        Object.defineProperty(app.config.globalProperties, '$eventbus', {
          get: () => eventbus,
          enumerable: true,
          configurable: true
        })
      }
    } catch (error) {
      // Property might already be defined, that's okay
      // Components can still access it via provide/inject
      console.warn('Could not define $eventbus global property:', error.message)
    }
  }
})

<template>
  <div id="app">
    <router-view />

    <transition name="modal">
      <portal-target name="modal" slim />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.updateScrollbarWidth();
    window.addEventListener('resize', this.updateScrollbarWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateScrollbarWidth);
  },
  methods: {
    getScrollbarWidth() {
      // Create a temporary div to measure scrollbar width
      const outer = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.overflow = 'scroll';
      outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
      outer.style.width = '100px';
      outer.style.position = 'absolute';
      outer.style.top = '-9999px';
      document.body.appendChild(outer);

      const inner = document.createElement('div');
      inner.style.width = '100%';
      outer.appendChild(inner);

      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

      outer.parentNode.removeChild(outer);

      return scrollbarWidth;
    },
    updateScrollbarWidth() {
      const scrollbarWidth = this.getScrollbarWidth();
      // Set CSS variable for dynamic padding globally
      document.documentElement.style.setProperty(
        '--scrollbar-width',
        `${scrollbarWidth}px`,
      );
    },
  },
};
</script>

<style lang="scss">
.modal {
  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter-active,
  &-leave-active {
    transition: 0.25s ease-in-out;
  }
}
</style>

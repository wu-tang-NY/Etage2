<template>
  <button
    type="button"
    class="app-theme-toggle"
    @click="toggleTheme"
    :aria-label="$t('common.themeToggle')"
    :title="$t('common.themeToggle')"
  >
    <svg-icon
      :name="isDark ? 'theme_light' : 'theme_dark'"
      class="app-theme-toggle__icon"
      original
    />
  </button>
</template>

<script>
import themeManager from '../../../utils/theme';

export default {
  name: "AppThemeToggle",
  data() {
    return {
      isDark: themeManager.isDark(),
      themeChangeHandler: null
    };
  },
  mounted() {
    // Listen for theme changes via custom event
    this.updateTheme();
    this.themeChangeHandler = (event) => {
      this.isDark = event.detail.isDark;
    };
    window.addEventListener('themechange', this.themeChangeHandler);
  },
  beforeDestroy() {
    if (this.themeChangeHandler) {
      window.removeEventListener('themechange', this.themeChangeHandler);
    }
  },
  methods: {
    toggleTheme() {
      themeManager.toggleTheme();
      this.updateTheme();
    },
    updateTheme() {
      this.isDark = themeManager.isDark();
    }
  }
};
</script>

<style lang="scss">
.app-theme-toggle {
  background: transparent;
  border: 1px solid var(--colors-text-primary);
  color: var(--colors-text-primary);
  padding: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  @include size(32px, 32px);
  box-sizing: border-box;

  &:hover {
    background-color: var(--colors-text-primary);
    color: $white;
  }

  &:focus {
    outline: none;
  }

  &__icon {
    @include size(18px, 18px);
    display: block;
  }
}
</style>


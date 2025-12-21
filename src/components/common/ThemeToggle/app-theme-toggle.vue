<template>
  <ClientOnly>
    <AppButton
      type="button"
      :onClick="toggleTheme"
      :icon="true"
      :aria-label="$t('common.themeToggle')"
      :title="$t('common.themeToggle')"
    >
      <svg-icon
        :name="isDark ? 'theme_light' : 'theme_dark'"
        class="size-4"
        original
      />
    </AppButton>
  </ClientOnly>
</template>

<script>
import AppButton from "@/components/ui/Button/app-button.vue";
import themeManager from "../../../utils/theme";

export default {
  name: "AppThemeToggle",
  components: {
    AppButton,
  },
  data() {
    return {
      isDark: themeManager.isDark(),
      themeChangeHandler: null,
    };
  },
  mounted() {
    // Listen for theme changes via custom event
    this.updateTheme();
    this.themeChangeHandler = (event) => {
      this.isDark = event.detail.isDark;
    };
    window.addEventListener("themechange", this.themeChangeHandler);
  },
  beforeUnmount() {
    if (this.themeChangeHandler) {
      window.removeEventListener("themechange", this.themeChangeHandler);
    }
  },
  methods: {
    toggleTheme() {
      themeManager.toggleTheme();
      this.updateTheme();
    },
    updateTheme() {
      this.isDark = themeManager.isDark();
    },
  },
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
    color: var(--white);
    fill: var(--white);
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

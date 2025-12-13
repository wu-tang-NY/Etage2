<template>
  <ClientOnly>
    <div class="app-logo">
      <a href="/" class="app-logo__title" aria-label="Home">
        <span class="app-logo__icon">
          <svg-icon :name="logoIconName" original />
        </span>
      </a>
      <span class="app-logo__subtitle">{{ $t("logo.subtitle") }}</span>
    </div>
  </ClientOnly>
</template>

<script>
import themeManager from "../../../utils/theme";

export default {
  name: "AppLogo",
  data() {
    return {
      isDark: themeManager.isDark(),
    };
  },
  computed: {
    logoIconName() {
      // In dark mode, use white logo; in light mode, use dark logo
      if (this.isDark) {
        return "logo_white";
      }
      // Use ru version for Russian locale, ua version for English/other locales
      return this.$i18n.locale === "ru" ? "logo_dark_ru" : "logo_dark_ua";
    },
  },
  mounted() {
    // Listen for theme changes
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
};
</script>

<style lang="scss">
$logo-separator-color: #e6e6e6;

.app-logo {
  display: flex;
  align-items: center;
  letter-spacing: 0.3px;

  &__icon {
    display: block;
    @include size(110px, 22px);

    svg {
      vertical-align: top;
      width: 100%;
    }
  }

  &__subtitle {
    font-weight: 500;
    color: var(--colors-text-secondary);
    white-space: nowrap;

    &::before {
      content: "";
      background-color: $logo-separator-color;
      display: inline-block;
      @include size(2px, 28px);
      margin: 0 1rem;
      vertical-align: middle;
    }
  }

  @include media-breakpoint-down(xl) {
    &__subtitle {
      display: none;
    }
  }

  @include media-breakpoint-down(md) {
    &__icon {
      @include size(90px, 18px);
    }

    &__subtitle {
      display: none;
    }
  }
}
</style>

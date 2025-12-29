<template>
  <ClientOnly>
    <div class="flex items-center">
      <a href="/" aria-label="Home">
        <span class="flex w-[110px] h-[22px] md:w-[90px] md:h-[18px]">
          <svg-icon :name="logoIconName" original class="size-full" />
        </span>
      </a>
      <span
        class="hidden xl:block font-medium text-gray-500 whitespace-nowrap before:content-[''] before:bg-gray-300 dark:before:bg-gray-700 before:inline-block before:w-[2px] before:h-[28px] before:mx-4 before:align-middle"
        >{{ $t("logo.subtitle") }}</span
      >
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
      // Use ru version for all locales
      return "logo_dark_ru";
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

<template>
  <ClientOnly>
    <app-new-year-decorations v-if="showDecorations" />
    <div class="app-main">
      <header
        :class="{ 'pt-[40px]': showDecorations }"
        class="app-header bg-light fixed left-0 top-0 w-full pb-3 box-border overflow-visible z-[1000] dark:bg-dark"
      >
        <div class="container mx-auto">
          <div class="flex items-center justify-between">
            <app-logo />

            <ul class="flex items-center gap-4">
              <li class="">
                <app-theme-toggle />
              </li>

              <li class="">
                <app-language-switcher />
              </li>

              <li class="hidden lg:block">
                <app-callback />
              </li>

              <li class="hidden lg:block">
                <app-schedule />
              </li>

              <li class="hidden lg:block">
                <app-phones />
              </li>

              <li class="lg:hidden ml-8">
                <MenuToggle :open="navOpen" @click="handleToggleMenu" />
              </li>
            </ul>
          </div>

          <h4
            v-if="mobile || tablet"
            class="text-gray-400 text-center text-sm mt-2"
          >
            {{ $t("logo.subtitle") }}
          </h4>
        </div>

        <div v-if="!mobile && !tablet" class="container mx-auto mt-8">
          <layout-main-nav @click="handleCloseMenu" />
        </div>
      </header>

      <MobileMenu
        v-if="mobile || tablet"
        :navOpen="navOpen"
        :showDecorations="showDecorations"
        @close="handleCloseMenu"
      />

      <main class="relative">
        <NuxtPage />
      </main>

      <layout-main-footer class="mt-2 lg:fixed bottom-0 left-0 w-full" />

      <AppWelcomeModal />
      <div id="modal-portal"></div>
    </div>
  </ClientOnly>
</template>

<script>
import AppButton from "@/components/ui/Button/app-button.vue";
import MenuToggle from "@/components/common/MenuToggle/MenuToggle.vue";
import LayoutMainNav from "@/layouts/main/components/LayoutMainNav.vue";
import LayoutMainFooter from "@/layouts/main/components/LayoutMainFooter.vue";
import MobileMenu from "@/components/common/MobileMenu/MobileMenu.vue";

import AppWelcomeModal from "../src/components/common/Welcome/app-welcome-modal.vue";
export default {
  name: "AppMainLayout",
  components: {
    LayoutMainNav,
    LayoutMainFooter,
    AppButton,
    MobileMenu,
    MenuToggle,
    AppWelcomeModal,
  },
  provide() {
    // Provide eventbus to child components for Options API inject
    // The eventbus is set as a global property by the plugin
    return {
      eventbus: this.$eventbus,
    };
  },
  data: () => ({
    navOpen: false,
    scrollPosition: 0,

    device: "desktop",
    mobile: false,
    tablet: false,
    desktop: false,
  }),
  computed: {
    showDecorations() {
      return this.shouldShowDecorations();
    },
  },
  methods: {
    handleToggleMenu() {
      if (typeof document === "undefined") return;

      this.navOpen = !this.navOpen;

      const navOpenClassName = "menu-open";

      if (this.navOpen) {
        // Save current scroll position
        this.scrollPosition =
          window.pageYOffset || document.documentElement.scrollTop;
        // Apply fixed positioning and restore scroll position
        document.body.classList.add(navOpenClassName);
        document.body.style.top = `-${this.scrollPosition}px`;
      } else {
        // Restore scroll position before removing the class
        const scrollPosition = this.scrollPosition;
        document.body.classList.remove(navOpenClassName);
        document.body.style.top = "";
        window.scrollTo(0, scrollPosition);
      }
    },

    handleCloseMenu() {
      if (typeof document === "undefined") return;

      this.navOpen = false;

      document.body.classList.remove("modal-open");
      document.body.classList.remove("menu-open");
    },

    isMobile() {
      if (typeof window === "undefined" || !window.matchMedia) return false;
      return window.matchMedia("(max-width: 767px)").matches;
    },

    isTablet() {
      if (typeof window === "undefined" || !window.matchMedia) return false;
      return window.matchMedia("(min-width: 768px) and (max-width: 992px)")
        .matches;
    },

    resizeHandler() {
      if (typeof document === "undefined") return;

      if (!document.hidden) {
        this.mobile = false;
        this.tablet = false;
        this.desktop = false;

        if (this.isMobile()) {
          this.device = "mobile";
          this.mobile = true;
        } else if (this.isTablet()) {
          this.device = "tablet";
          this.tablet = true;
        } else {
          this.desktop = true;
          this.device = "desktop";
        }
      }
    },
    shouldShowDecorations() {
      // Show decorations from December 1st to February 1st
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth(); // 0-11, where 11 is December, 0 is January
      const currentDay = now.getDate();

      // December (month 11): from December 1st onwards
      if (currentMonth === 11) {
        return currentDay >= 1;
      }

      // January (month 0): all of January
      if (currentMonth === 0) {
        return true;
      }

      // February (month 1): only until February 1st
      if (currentMonth === 1) {
        return currentDay < 1;
      }

      return false;
    },
  },
  beforeMount() {
    if (typeof window === "undefined") return;

    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
  },
  mounted() {
    // Initialize theme
    if (this.$themeManager) {
      this.$themeManager.applyTheme(this.$themeManager.currentTheme);
    }
  },
  beforeDestroy() {
    if (typeof window === "undefined") return;
    window.removeEventListener("resize", this.resizeHandler);
  },
};
</script>

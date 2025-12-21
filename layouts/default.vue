<template>
  <ClientOnly>
    <app-new-year-decorations v-if="showDecorations" />
    <div class="app-main">
      <header
        :class="{ 'pt-[40px]': showDecorations }"
        class="app-header bg-light fixed left-0 top-0 w-full pb-3 box-border overflow-visible z-[1000] dark:bg-dark"
      >
        <div class="container">
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
        </div>

        <div v-if="!mobile && !tablet" class="container mt-8">
          <layout-main-nav @click="handleCloseMenu" />
        </div>
      </header>

      <MobileMenu
        v-if="mobile || tablet"
        :navOpen="navOpen"
        :showDecorations="showDecorations"
        @close="handleCloseMenu"
      />

      <main class="relative lg:top-[200px] pt-[150px] lg:pt-0">
        <NuxtPage />
      </main>

      <layout-main-footer class="mt-2 lg:fixed bottom-0 left-0 w-full" />

      <!-- PWA Install Prompt -->
      <ClientOnly>
        <app-install-prompt />
      </ClientOnly>

      <div id="modal-portal"></div>
    </div>
  </ClientOnly>
</template>

<script>
import AppButton from "@/components/ui/Button/app-button.vue";
import MenuToggle from "@/components/common/MenuToggle/MenuToggle.vue";
import LayoutMainNav from "@/layouts/main/components/LayoutMainNav.vue";
import LayoutMainFooter from "@/layouts/main/components/LayoutMainFooter.vue";
import AppInstallPrompt from "@/components/common/InstallPrompt/app-install-prompt.vue";
import MobileMenu from "@/components/common/MobileMenu/MobileMenu.vue";

export default {
  name: "AppMainLayout",
  components: {
    LayoutMainNav,
    LayoutMainFooter,
    AppInstallPrompt,
    AppButton,
    MobileMenu,
    MenuToggle,
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

      // Restore scroll position before removing the class
      const scrollPosition = this.scrollPosition;
      this.navOpen = false;

      document.body.classList.remove("modal-open");
      document.body.classList.remove("menu-open");
      document.body.style.top = "";
      // Restore scroll position
      if (scrollPosition > 0) {
        window.scrollTo(0, scrollPosition);
      }
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

    getScrollbarWidth() {
      // Only run on client side
      if (typeof document === "undefined") return 0;

      // Create a temporary div to measure scrollbar width
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.overflow = "scroll";
      outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
      outer.style.width = "100px";
      outer.style.position = "absolute";
      outer.style.top = "-9999px";
      document.body.appendChild(outer);

      const inner = document.createElement("div");
      inner.style.width = "100%";
      outer.appendChild(inner);

      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

      outer.parentNode.removeChild(outer);

      return scrollbarWidth;
    },

    updateScrollbarWidth() {
      // Only run on client side
      if (typeof document === "undefined") return;

      const scrollbarWidth = this.getScrollbarWidth();
      // Set CSS variable for dynamic padding globally
      document.documentElement.style.setProperty(
        "--scrollbar-width",
        `${scrollbarWidth}px`
      );
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

    this.updateScrollbarWidth();
  },
  beforeDestroy() {
    if (typeof window === "undefined") return;
    window.removeEventListener("resize", this.resizeHandler);
  },
};
</script>

<style lang="scss">
$footer-height: 65px;

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

.app-header {
  &__inner {
    display: flex;
    align-items: center;
    padding: 18px 0;
    width: 100%;
  }

  &__blocks {
    margin-left: auto;
    margin-bottom: 0;
    padding: 0;
  }

  &__block {
    display: inline-block;
    margin-left: 40px;
    vertical-align: middle;

    &:first-of-type {
      margin-left: 0;
    }
  }
}

@media screen and (min-width: 993px) and (min-height: 730px) and (max-height: 890px) {
  .app-header {
    &__inner {
      padding: 10px 0;
    }

    &__block {
      margin-left: 30px;
    }
  }

  .app-content {
    padding-top: 10px;
  }

  .app-footer {
    &__inner {
      height: 40px;
    }
  }
}

@media screen and (min-width: 993px) and (max-height: 730px) {
  .app-header {
    &__blocks {
      display: none;
    }
  }

  .nav-wrapper {
    display: none;
    padding: 18px 0;
    @include fixed(0, 0, 0, 0);

    &__inner {
      justify-content: center;
    }

    &__menu {
      .nav-block__title {
        display: flex;
      }

      .nav-block__content {
        padding-left: 0;
        padding-right: 0;
      }
    }

    &__footer-mobile {
      border-top: 1px solid var(--colors-grey-100);
      display: block !important;
      position: static;
      width: 700px;
      margin: 20px auto 0;

      .container {
        margin: 0;
        padding: 0;
      }
    }

    &__container {
      display: flex;
      justify-content: space-between;
      width: 700px;
      margin: 0 auto;
    }

    &__mobile-only {
      display: block;
    }

    &--open {
      background-color: var(--white);
      display: block;
    }

    &__inner {
      display: flex;
      flex-direction: column;
      height: 100%;
      // overflow-y: auto;
      // overflow-x: hidden;
    }

    .app-nav {
      margin: 0;
    }

    &__blocks {
      list-style: none;
      margin: 0 -15px;
      padding: 0;
    }

    .app-copyright {
      text-align: center;
      font-size: rem(12);
    }
  }

  .nav-block {
    margin-bottom: 30px;

    &.nav-social {
      display: none;
    }

    &__title {
      background-color: var(--colors-grey-200);
      clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0% 100%);
      width: 300px;
      display: flex;
      align-items: center;
      height: 42px;
      padding: 0 35px 0 15px;
      font-weight: 900;
      font-size: rem(20);
    }

    &__content {
      padding: 21px 15px 0;
    }
  }

  .app-footer {
    display: none;
  }
}

@include media-breakpoint-down(lg) {
  .menu-open {
    @include fixed(0, 0, 0, 0);
    overflow-y: scroll;
  }

  .modal-open {
    @include fixed(0, 0, 0, 0);
    overflow-y: scroll;

    .app-content {
      top: 0;
      height: 100vh;
      z-index: 100;
    }
  }

  .app-header {
    &__blocks {
      display: none;
    }
  }

  .nav-wrapper {
    &--open {
      background-color: var(--white);
      display: block;
      overflow: auto;
    }

    &__container {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
    }

    .container {
      height: 100%;
    }

    &__inner {
      display: flex;
      flex-direction: column;
      height: 100%;
      // overflow-y: auto;
      // overflow-x: hidden;
    }

    .app-nav {
      margin: 0 -15px 0;
    }

    &__blocks {
      list-style: none;
      margin: 0 -15px;
      padding: 0;
    }

    .app-copyright {
      text-align: center;
      font-size: rem(12);
    }
  }

  .nav-block {
    margin-top: 25px;

    &.nav-social {
      display: block;
    }

    &__title {
      background-color: var(--colors-grey-200);
      clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0% 100%);
      max-width: 300px;
      display: flex;
      align-items: center;
      height: 36px;
      padding: 0 35px 0 15px;
      font-weight: 700;
    }

    &__content {
      padding: 15px 15px 0;
    }
  }
}
</style>

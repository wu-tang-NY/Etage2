<template>
  <ClientOnly>
    <div class="app-main">
      <header class="app-header">
        <div class="container">
          <div class="app-header__inner">
            <app-logo />

            <ul class="app-header__blocks">
              <li class="app-header__block">
                <app-theme-toggle />
              </li>

              <li class="app-header__block">
                <app-language-switcher />
              </li>

              <li class="app-header__block">
                <app-callback />
              </li>

              <li class="app-header__block">
                <app-schedule />
              </li>

              <li class="app-header__block" style="vertical-align: top">
                <app-phones />
              </li>
            </ul>

            <div class="menu-toggle">
              <button
                type="button"
                class="menu-toggle__btn"
                @click="handleToggleMenu"
              >
                <span class="menu-toggle__line"></span>
                <span class="menu-toggle__line"></span>
                <span class="menu-toggle__line"></span>
              </button>
            </div>
          </div>
        </div>

        <div class="nav-wrapper" :class="{ 'nav-wrapper--open': navOpen }">
          <div class="container">
            <div class="nav-wrapper__inner">
              <div class="nav-wrapper__container">
                <div class="d-lg-none">
                  <app-logo />
                </div>

                <ul class="nav-wrapper__blocks nav-wrapper__menu">
                  <li class="nav-wrapper__block nav-block">
                    <div class="nav-block__title">
                      <span>{{ $t("common.menu") }}</span>
                    </div>

                    <div class="nav-block__content">
                      <layout-main-nav @click="handleCloseMenu" />
                    </div>
                  </li>
                </ul>

                <div class="nav-wrapper__mobile-only">
                  <ul class="nav-wrapper__blocks">
                    <li class="nav-wrapper__block nav-block">
                      <div class="nav-block__title">
                        <span>{{ $t("common.contacts") }}</span>
                        <div class="ml-auto">
                          <app-callback @openModal="handleCloseMenu" />
                        </div>
                      </div>

                      <div class="nav-block__content">
                        <app-phones />
                      </div>
                    </li>

                    <li class="nav-wrapper__block nav-block">
                      <div class="nav-block__title">
                        <span>{{ $t("common.schedule") }}</span>
                      </div>

                      <div class="nav-block__content">
                        <app-schedule without-label />
                      </div>
                    </li>

                    <li class="nav-wrapper__block nav-block nav-social">
                      <div class="app-social">
                        <a
                          href="https://instagram.com/etage.com.ua/"
                          class="app-social__link"
                          target="_blank"
                          aria-label="Visit our Instagram"
                          rel="noopener noreferrer"
                        >
                          <svg-icon name="icon_in" original />
                        </a>
                        <a
                          href="https://www.facebook.com/Грузоперевозки-Этаж-528673617657091/"
                          class="app-social__link"
                          target="_blank"
                          aria-label="Visit our Facebook page"
                          rel="noopener noreferrer"
                        >
                          <svg-icon name="icon_fb" original />
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="app-copyright mt-auto d-lg-none">
                  {{ $t("common.copyright") }}
                </div>
              </div>

              <layout-main-footer class="nav-wrapper__footer-mobile" />
            </div>
          </div>
        </div>
      </header>

      <main class="app-content">
        <NuxtPage />
      </main>

      <layout-main-footer v-if="!mobile && !tablet" />

      <app-new-year-decorations />

      <!-- PWA Install Prompt -->
      <ClientOnly>
        <app-install-prompt />
      </ClientOnly>

      <div id="modal-portal"></div>
    </div>
  </ClientOnly>
</template>

<script>
import LayoutMainNav from "@/layouts/main/components/LayoutMainNav.vue";
import LayoutMainFooter from "@/layouts/main/components/LayoutMainFooter.vue";
import AppInstallPrompt from "@/components/common/InstallPrompt/app-install-prompt.vue";

export default {
  name: "AppMainLayout",
  components: {
    LayoutMainNav,
    LayoutMainFooter,
    AppInstallPrompt,
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

    device: "desktop",
    mobile: false,
    tablet: false,
    desktop: false,
  }),
  methods: {
    handleToggleMenu() {
      if (typeof document === "undefined") return;

      this.navOpen = !this.navOpen;

      const navOpenClassName = "menu-open";

      if (this.navOpen) {
        document.body.classList.add(navOpenClassName);
      } else {
        document.body.classList.remove(navOpenClassName);
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
  background-color: var(--white);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  overflow: visible;
  z-index: 100;

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

.has-christmas-lights {
  .app-header {
    padding-top: 40px;
  }

  .app-content {
    padding-top: 58px;
  }
}

.nav-wrapper {
  &__footer-mobile {
    display: none;
  }

  &__inner {
    width: 100%;
  }
}

.app-content {
  padding: 0;
  padding-top: 18px;
  position: relative;
  top: 50px;
}

.app-footer {
  font-weight: 500;
  font-size: rem(12);
  color: var(--colors-text-secondary);
  letter-spacing: 0.2px;
  bottom: 0;

  &__inner {
    height: $footer-height;
  }
}

.menu-toggle {
  margin-left: auto;
  z-index: var(--zindex-tooltip);

  &__btn {
    background-color: transparent;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @include size(18px, 14px);
    padding: 0;
    cursor: pointer;

    &:active,
    &:focus {
      outline: none;
    }
  }

  &__line {
    background-color: var(--colors-text-primary);
    display: block;
    @include size(18px, 2px);
    transform-origin: 0 50%;
    transition: 0.2s ease-in-out;
  }
}

.menu-open {
  // overflow-y: scroll;
  // @include fixed(0, 0, 0, 0);

  .menu-toggle {
    &__line {
      &:nth-child(1) {
        transform: translate(0, 0) rotate(43deg);
      }

      &:nth-child(2) {
        transform: translate(100%, 0);
        opacity: 0;
      }

      &:nth-child(3) {
        transform: translate(0, 0) rotate(-43deg);
      }
    }
  }
}

@include media-breakpoint-up(lg) {
  .app-footer {
    position: fixed;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 1;
  }

  .nav-wrapper {
    margin-top: 10px;
    flex: 0 0 auto;
    position: relative;
    width: 100%;
    box-sizing: border-box;

    &__mobile-only {
      display: none;
    }

    &__menu {
      list-style: none;
      margin: 0;
      padding: 0;

      .nav-block__title {
        display: none;
      }
    }

    .container {
      width: 100%;
      box-sizing: border-box;
    }
  }

  .menu-toggle {
    display: none;
  }

  .app-content {
    top: 140px;
  }

  .modal-open {
    .app-header {
      padding-right: var(--scrollbar-width, 0px);
    }

    .app-footer {
      padding-right: var(--scrollbar-width, 0px);
    }

    .nav-wrapper {
      margin-right: calc(-1 * var(--scrollbar-width, 0px));
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

  .nav-wrapper {
    margin-top: 15px;
  }
}

@media screen and (min-width: 993px) and (max-height: 730px) {
  .app-header {
    &__blocks {
      display: none;
    }
  }

  .app-content {
    top: 50px;
  }

  .menu-toggle {
    display: block;
  }

  .nav-wrapper {
    display: none;
    padding: 18px 0;
    @include fixed(0, 0, 0, 0);
    z-index: var(--zindex-modal);

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

@include media-breakpoint-down(md) {
  .has-christmas-lights {
    .nav-wrapper {
      padding-top: 58px;
    }
  }
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
    display: none;
    padding: 18px 0;
    @include fixed(0, 0, 0, 0);
    z-index: var(--zindex-modal);

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

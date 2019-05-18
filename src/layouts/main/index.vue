<template>
  <div class="app-main">
    <header class="app-header">
      <div class="container">
        <div class="app-header__inner">
          <app-logo />

          <ul class="app-header__blocks">
            <li class="app-header__block">
              <app-callback />
            </li>

            <li class="app-header__block">
              <app-schedule />
            </li>

            <li class="app-header__block">
              <app-phones />
            </li>
          </ul>

          <div class="menu-toggle">
            <button type="button" class="menu-toggle__btn" @click="handleToggleMenu">
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
            <div class="d-lg-none">
              <app-logo />
            </div>

            <layout-main-nav @click="handleCloseMenu" />

            <div class="d-lg-none">
              <ul class="nav-wrapper__blocks">
                <li class="nav-wrapper__block nav-block">
                  <div class="nav-block__title">
                    <span>Контакты:</span>
                    <div class="ml-auto">
                      <app-callback />
                    </div>
                  </div>

                  <div class="nav-block__content">
                    <app-phones />
                  </div>
                </li>

                <li class="nav-wrapper__block nav-block">
                  <div class="nav-block__title">
                    <span>Наш график:</span>
                  </div>

                  <div class="nav-block__content">
                    <app-schedule without-label />
                  </div>
                </li>
              </ul>
            </div>

            <div class="app-copyright mt-auto d-lg-none">
              &copy; 2019 Etage. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="app-content">
      <router-view
        :mobile="mobile"
        :tablet="tablet"
      />
    </main>

    <footer class="app-footer" v-if="!mobile && !tablet">
      <div class="container">
        <div class="app-footer__inner">
          <div class="app-copyright mr-auto">
            &copy; 2019 Etage. All Rights Reserved.
          </div>

          <div class="app-designedby">
            <span class="app-designedby__text">Designed by:</span>
            <a href="#" class="app-designedby__icon">
              <svg-icon name="logotype" original />
            </a>
          </div>
        </div>
      </div>
    </footer>
    <transition name="component-fade">
      <modal-info></modal-info>
    </transition>
  </div>
</template>

<script>
import components from './components';
import ModalInfo from '../../views/modal';

export default {
  name: 'AppMainLayout',
  components: { ...components, ModalInfo },
  data: () => ({
    navOpen: false,

    device: 'desktop',
    mobile: false,
    tablet: false,
  }),
  methods: {
    handleToggleMenu() {
      this.navOpen = !this.navOpen;

      const navOpenClassName = 'menu-open';

      if (this.navOpen) {
        document.body.classList.add(navOpenClassName);
      } else {
        document.body.classList.remove(navOpenClassName);
      }
    },

    handleCloseMenu() {
      this.navOpen = false;

      document.body.style.overflow = 'auto';
    },

    isMobile() {
      return window.matchMedia('(max-width: 767px)').matches;
    },

    isTablet() {
      return window.matchMedia('(min-width: 768px) and (max-width: 992px)').matches;
    },

    resizeHandler() {
      if (!document.hidden) {
        if (this.isMobile()) {
          this.device = 'mobile';
          this.mobile = true;
        } else if (this.isTablet()) {
          this.device = 'tablet';
          this.tablet = true;
        } else {
          this.device = 'desktop';
        }
      }
    },
  },
  beforeMount() {
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  },
};
</script>

<style lang="scss">
$footer-height: 65px;

.app-header {
  background-color: $white;
  position: fixed;
  left: 0;
  width: 100%;
  z-index: 100;

  &__inner {
    display: flex;
    align-items: center;
    padding: 18px 0;
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
  }
}

.app-content {
  padding: 0;
  position: relative;
  top: 50px;
}

.app-footer {
  font: 500 rem(12) $font-family--secondary;
  color: $colors-text--secondary;
  letter-spacing: .2px;
  bottom: 0;

  &__inner {
    display: flex;
    align-items: center;
    height: $footer-height;
  }
}

.app-designedby {
  &__text {
    margin-right: .5rem;
    line-height: 1;
    vertical-align: bottom;
  }

  &__icon {
    @include size(87px, 16px);
    display: inline-block;
    flex-shrink: 0;
  }
}

.menu-toggle {
  margin-left: auto;
  z-index: $zindex-tooltip;

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
    background-color: $colors-text--primary;
    display: block;
    @include size(18px, 2px);
    transform-origin: 0 50%;
    transition: .2s ease-in-out;
  }
}

.menu-open {
  .menu-toggle {
    &__line {
      &:nth-child(1) {
        transform: translate(0, 0) rotate(45deg);
      }

      &:nth-child(2) {
        transform: translate(100%, 0);
        opacity: 0;
      }

      &:nth-child(3) {
        transform: translate(0, 0) rotate(-45deg);
      }
    }
  }
}


@include media-breakpoint-up(lg) {
  .app-footer {
    position: fixed;
    left: 0;
    width: 100%;
    z-index: 1;
  }

  .nav-wrapper {
    margin-top: 10px;
    flex: 0 0 auto;
  }

  .menu-toggle {
    display: none;
  }

  .app-content {
    top: 140px;
  }
}


@include media-breakpoint-down(md) {
  .menu-open {
    @include fixed(0, 0, 0, 0);
    overflow-y: scroll;
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
    z-index: $zindex-modal;

    &--open {
      background-color: $white;
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
      margin: 30px -15px 0;
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
    margin-top: 30px;

    &__title {
      background-color: $colors-grey-200;
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

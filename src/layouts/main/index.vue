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
        </div>
      </div>

      <div class="app-nav-wrapper">
        <div class="container">
          <layout-main-nav />
        </div>
      </div>
    </header>

    <main class="app-content">
      <router-view />
    </main>

    <footer class="app-footer">
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
  </div>
</template>

<script>
import components from './components';

export default {
  name: 'AppMainLayout',
  components: { ...components },
};
</script>

<style lang="scss">
$footer-height: 65px;

.app-main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.app-header,
.app-footer {
  position: fixed;
  left: 0;
  width: 100%;
}

.app-header {
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

.app-nav-wrapper {
  margin-top: 10px;
  flex: 0 0 auto;
}

.app-content {
  padding: 140px 0 $footer-height;
  flex: 1 1 auto;
}

.app-footer {
  border-top: 3px solid $colors-grey-300;
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
</style>

<template functional>
  <div class="app-logo">
    <a href="/" class="app-logo__title">
      <span class="app-logo__icon">
        <svg-icon name="logo_dark" original />
      </span>
    </a>
    <span class="app-logo__subtitle">Все виды грузоперевозок по Одессе и области</span>
  </div>
</template>

<script>
export default {
  name: 'AppLogo',
};
</script>

<style lang="scss">
  $logo-separator-color: #e6e6e6;

  .app-logo {
    display: flex;
    align-items: center;
    letter-spacing: .3px;

    // &__title {
    //   color: $colors-text--primary;
    //   font: 900 rem(36) $font-family--secondary;
    //   text-transform: lowercase;
    //   padding-bottom: 4px;

    //   &:hover {
    //     color: $colors-text--primary;
    //   }
    // }

    &__icon {
      display: block;
      @include size(110px, 22px);
    }

    &__subtitle {
      font-weight: 500;
      color: $colors-text--secondary;

      &::before {
        content: '';
        background-color: $logo-separator-color;
        display: inline-block;
        @include size(2px, 28px);
        margin: 0 1rem;
        vertical-align: middle;
      }
    }
  }
</style>

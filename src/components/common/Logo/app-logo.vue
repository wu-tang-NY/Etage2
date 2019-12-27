<template functional>
  <div class="app-logo">
    <a href="/" class="app-logo__title">
      <span class="app-logo__icon">
        <svg-icon name="logo_dark" original />
      </span>
    </a>
    <span class="app-logo__subtitle">Сервис переездов по Одессе и области</span>
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

  &__icon {
    display: block;
    @include size(110px, 22px);

    svg {
      vertical-align: top;
    }
  }

  &__subtitle {
    font-weight: 500;
    color: $colors-text--secondary;
    white-space: nowrap;

    &::before {
      content: '';
      background-color: $logo-separator-color;
      display: inline-block;
      @include size(2px, 28px);
      margin: 0 1rem;
      vertical-align: middle;
    }
  }

  @include media-breakpoint-down(xl) {
    &__subtitle {
      // display: none;
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

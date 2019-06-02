<template functional>
  <div class="app-phones">
    <ul class="app-phones__codes">
      <li class="app-phones__code">
        <span class="app-phones__code-icon">
          <svg-icon name="operator_1" original />
        </span>
        <a href="tel:+380930970110" class="app-phones__code-text">
          093 <span class="app-phone">097-01-10</span>
        </a>
      </li>

      <li class="app-phones__code">
        <span class="app-phones__code-icon">
          <svg-icon name="operator_2" original />
        </span>
        <a href="tel:+380970970110" class="app-phones__code-text">
          097 <span class="app-phone">097-01-10</span>
        </a>
      </li>

      <li class="app-phones__code">
        <span class="app-phones__code-icon">
          <svg-icon name="operator_3" original />
        </span>
        <a href="tel:+380950970110" class="app-phones__code-text">
          095 <span class="app-phone">097-01-10</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppPhones',
};
</script>

<style lang="scss">
.app-phones {
  font-weight: 700;
  font-family: $font-family--secondary;
  display: flex;
  align-items: center;

  &__codes-wrapper {
    margin-right: 5px;
  }

  &__codes {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__code {
    font-size: rem(14);
  }

  &__code-icon {
    display: inline-block;
    @include size(12px);
    margin-right: 3px;
    vertical-align: middle;

    svg {
      @include size(100%);
      vertical-align: top;
      transform: translate(0, -1px);
    }
  }

  &__code-text {
    line-height: 1.29;
    color: $colors-text--primary;

    &:hover, &:active {
      span {
        color: $colors-accent;
      }
    }

    span {
      color: $colors-text--secondary;
    }
  }
}

.app-phone {
  font-size: inherit;
  color: $colors-accent;
  letter-spacing: .4px;
  vertical-align: middle;
}

@media screen and (min-width: 993px) and (max-height: 760px) {
  .app-phone {
    &--mobile-only {
      display: inline-block;
    }
  }

  .app-phones {
    &__code-text {
      font-size: rem(18);
    }
  }

  .app-phone {
    vertical-align: top;
  }
}

@include media-breakpoint-down(md) {
  .app-phones {
    &__code-text {
      font-size: rem(18);
    }

    .app-phone {
      vertical-align: top;
    }
  }
}
</style>

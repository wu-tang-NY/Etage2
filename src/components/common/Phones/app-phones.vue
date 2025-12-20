<template>
  <div class="app-phones">
    <ul class="app-phones__codes">
      <li class="app-phones__code">
        <span class="app-phones__code-icon">
          <svg-icon name="operator_2" original />
        </span>
        <a href="tel:+380973560005" class="app-phones__code-text">
          097 <span class="app-phone"> 356-00-05</span>
        </a>

        <a
          href="https://viber.click/380953560005"
          class="app-phones__code-icon"
          target="_blank"
        >
          <svg-icon name="icon_vb" original />
        </a>
      </li>

      <li class="app-phones__code">
        <span class="app-phones__code-icon">
          <svg-icon name="operator_3" original />
        </span>
        <a href="tel:+380953560005" class="app-phones__code-text">
          095 <span class="app-phone">356-00-05</span>
        </a>

        <a
          href="https://t.me/+380953560005"
          class="app-phones__code-icon"
          target="_blank"
        >
          <svg-icon name="icon_tg" original />
        </a>
      </li>

      <li class="app-phones__code">
        <span class="app-phones__code-icon">
          <svg-icon name="operator_1" original />
        </span>
        <a href="tel:+380733560005" class="app-phones__code-text">
          073 <span class="app-phone">356-00-05</span>
        </a>

        <a
          href="https://wa.me/380953560005"
          class="app-phones__code-icon"
          target="_blank"
        >
          <svg-icon name="icon_wa" original />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppPhones",
};
</script>

<style lang="scss">
.app-phones {
  font-weight: 700;
  font-family: var(--font-family-secondary);
  display: flex;

  &__codes-wrapper {
    margin-right: 5px;
  }

  &__codes {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__code {
    display: flex;
    align-items: center;
    padding: 4px 0;
    font-size: rem(14);
  }

  &__code-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    @include size(18px);
    margin: 0 4px;
    vertical-align: middle;

    svg {
      @include size(100%);
      vertical-align: top;
      transform: translate(0, -1px);
    }
  }

  &__code-text {
    width: 100px;
    line-height: 1.29;
    margin: 0 8px;
    color: var(--colors-text-primary);

    &:hover,
    &:active {
      span {
        color: var(--colors-accent);
      }
    }

    span {
      color: var(--colors-text-secondary);
    }
  }
}

.app-phone {
  font-size: inherit;
  color: var(--colors-accent);
  letter-spacing: 0.4px;
  vertical-align: middle;
}

@media screen and (min-width: 993px) and (max-height: 730px) {
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
      width: auto;
      font-size: rem(18);
    }

    .app-phone {
      vertical-align: top;
    }
  }
}
</style>

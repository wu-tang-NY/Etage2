<template>
  <nav class="app-nav relative">
    <ul
      class="flex flex-col lg:flex-row"
      :class="{
        'app-nav__list--open': isOpen,
      }"
    >
      <slot></slot>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "AppNav",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.app-nav {
  @include media-breakpoint-up(lg) {
    &::before {
      content: "";
      background-image: linear-gradient(
        to right,
        #e6e6e6,
        rgba(230, 230, 230, 0)
      );
      @include size(100%, 2px);
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .nav-item:first-child {
      .nav-item {
        &__link {
          padding-left: 12px;
        }

        &__bg {
          clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0% 100%);
        }
      }
    }

    .nav-item:last-child {
      .nav-item {
        &__bg {
          clip-path: polygon(20px 0, 100% 0, 100% 100%, 0% 100%);
        }
      }
    }
  }
}

@media screen and (min-width: 993px) and (max-height: 730px) {
  .app-nav {
    &::before {
      display: none;
    }

    &__list {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
  }
}

@media screen and (max-width: 992px) {
  .app-nav {
    &__list {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
  }
}
</style>

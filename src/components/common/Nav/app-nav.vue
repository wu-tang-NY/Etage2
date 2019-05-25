<template functional>
  <nav class="app-nav">
    <div class="app-nav__inner">
      <ul
        :class="{
          'app-nav__list': true,
          'app-nav__list--open': isOpen,
        }"
      >
        <slot></slot>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNav',
};
</script>

<style lang="scss">
.app-nav {
  position: relative;

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  @include media-breakpoint-up(lg) {
    &::before {
      content: '';
      background-image: linear-gradient(to right, #e6e6e6, rgba(230, 230, 230, 0));
      @include size(100%, 2px);
      position: absolute;
      bottom: 0; left: 0;
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
  }
}

@media screen and (min-width: 993px) and (max-height: 760px) {
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

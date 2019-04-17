<template functional>
  <li
    class="app-nav-item"
    :class="{
      'app-nav-item--active': props.active,
      'app-nav-item--visited': props.visited,
    }"
  >
    <a href="" class="app-nav-item__link" @click.prevent>
      <div class="app-nav-item__inner">
        <slot>
          <span class="app-nav-item__icon" v-if="props.icon">
            <svg-icon :name="icon" />
          </span>
          <span class="app-nav-item__text">{{ props.title }}</span>
        </slot>
      </div>
      <div class="app-nav-item__bg"></div>
    </a>
  </li>
</template>

<script>
export default {
  name: 'AppNavItem',
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
    active: {
      type: Boolean,
      required: true,
    },
    visited: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.app-nav-item {
  display: inline-block;

  &:not(:last-child) {
    margin-right: 5px;
  }

  &__link {
    display: block;
    padding: 8px rem(24) 7px;
    color: $colors-text--primary;
    font-weight: 700;
    font-size: rem(14);
    letter-spacing: .3px;
    position: relative;

    &:hover {
      color: $colors-text--primary;

      .app-nav-item__bg::before {
        width: 100%;
        left: 0;
      }
    }
  }

  &__inner {
    position: relative;
    z-index: 1;
  }

  &__bg {
    @include absolute(0, 0);
    @include size(100%);
    overflow: hidden;
    transform: translate(0, 0) skew(25deg);

    &::before {
      content: '';
      background-color: $colors-grey-200;
      @include size(0, 100%);
      position: absolute;
      top: 0;
      left: auto; right: 0;
      transition: width .3s linear;
    }
  }

  &.app-nav-item--visited {
    .app-nav-item {
      &__bg::before {
        background-color: $colors-grey-200;
        width: 100%;
      }
    }
  }

  &.app-nav-item--active {
    .app-nav-item {
      &__link {
        color: $white;

        &:hover {
          color: $white;
        }
      }

      &__bg::before {
        background-color: $colors-accent;
        width: 100%;
      }
    }
  }
}
</style>

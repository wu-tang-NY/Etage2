<template>
  <li
    class="nav-item"
    :class="{
      'nav-item--active': active,
      'nav-item--visited': visited,
    }"
  >
    <a href="" class="nav-item__link" @click.prevent>
      <div class="nav-item__inner">
        <slot>
          <span class="nav-item__icon" v-if="icon">
            <svg-icon :name="icon" :original="!active" />
          </span>

          <span class="nav-item__text">{{ title }}</span>
        </slot>

        <span class="nav-item__chevron" v-if="children"></span>
      </div>

      <div class="nav-item__bg"></div>

      <ul class="nav-inner" v-if="children">
        <template v-for="(child, index) in children">
          <router-link class="nav-inner__item" :to="child.path" tag="li" :key="index">
            <a href="" class="nav-inner__link">
              {{ child.title }}
            </a>
          </router-link>
        </template>
      </ul>
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

    children: {
      type: Array,
    },
  },
};
</script>

<style lang="scss">
.nav-item {
  display: inline-block;

  &:not(:last-child) {
    margin-right: -15px;
  }

  &__link {
    display: block;
    padding: 7px rem(24) 8px;
    color: $colors-text--primary;
    font-weight: 600;
    font-size: rem(14);
    letter-spacing: .2px;
    position: relative;

    &:hover {
      color: $colors-text--primary;

      .nav-item__bg::before {
        width: 100%;
        left: 0;
      }

      .nav-inner {
        display: block;
      }
    }
  }

  &__inner {
    position: relative;
    z-index: 1;
  }

  &__icon {
    display: inline-block;
    @include size(26px);
    margin-right: 6px;
  }

  &__chevron {
    border: 4px solid transparent;
    border-top-color: $white;
    display: inline-block;
    margin-left: 5px;
    transform: translate(0, 2px);
  }

  &__text {
    vertical-align: middle;
  }

  &__bg {
    position: absolute;
    bottom: 2px; left: 0;
    @include size(100%);
    overflow: hidden;
    // transform: translate(0, 0) skew(25deg);
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%);

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

  .nav-inner {
    background-color: $colors-accent;
    padding: 10px;
    position: absolute;
    top: 100%;
    left: 0;
    width: 230px;
    display: none;

    &__link {
      display: block;
      padding: 9px 10px;
      color: $white;
      font-weight: 500;
      letter-spacing: .3px;
      transition: background-color .15s ease-in-out;

      &:hover {
        background-color: rgba($white, .2);
      }
    }
  }

  &.nav-item--visited {
    .nav-item {
      &__bg::before {
        background-color: $colors-grey-200;
        width: 100%;
      }
    }
  }

  &.nav-item--active {
    .nav-item {
      &__link {
        color: $white;

        &:hover {
          color: $white;
        }
      }

      &__icon {
        color: $white !important;

        svg {
          fill: $white !important;
        }
      }

      &__bg::before {
        background-color: $colors-accent;
        width: 100%;
        left: 0;
      }
    }
  }
}
</style>

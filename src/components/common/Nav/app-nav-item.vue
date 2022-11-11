<template>
  <li class="nav-item" :class="{
    'nav-item--active': active,
    'nav-item--visited': visited,
    'nav-item--hovered': hovered,
  }">
    <a href="" :id="id" class="nav-item__link" @mouseenter="hovered = true" @mouseleave="hovered = false"
      @click.stop.prevent="hovered = false">
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
          <li class="nav-inner__item" tag="li" @click="$eventbus.$emit('openPopup', child.path)" :key="index">
            <a href="" class="nav-inner__link">
              {{ child.title }}
            </a>
          </li>
        </template>
      </ul>
    </a>
  </li>
</template>

<script>
export default {
  name: 'AppNavItem',
  props: {
    id: {
      type: String,
    },

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
  data: () => ({
    hovered: false,
  }),
};
</script>

<style lang="scss">
.nav-item {
  &__link {
    display: block;
    padding: 7px rem(24) 8px;
    color: $colors-text--primary;
    font-weight: 600;
    font-size: rem(14);
    letter-spacing: .2px;
    position: relative;
  }

  &__inner {
    position: relative;
    z-index: 1;
  }

  &__icon {
    display: inline-block;
    @include size(22px);
    margin-right: 6px;
  }

  &__chevron {
    border: 4px solid transparent;
    border-top-color: $colors-text--primary;
    display: inline-block;
    margin-left: 5px;
    transform: translate(0, 2px);
  }

  &__text {
    vertical-align: middle;
  }

  &__bg {
    position: absolute;
    bottom: 0;
    left: 0;
    @include size(100%);
    overflow: hidden;
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0 100%);

    &::before {
      content: '';
      background-color: $colors-grey-200;
      @include size(0, 100%);
      position: absolute;
      top: 0;
      left: auto;
      right: 0;
      transition: width .3s linear;
    }
  }

  .nav-inner {
    background-color: $colors-grey-200;
    padding: 10px;
    position: absolute;
    top: 100%;
    left: 0;
    width: 230px;
    display: none;
    list-style: none;

    &__link {
      display: block;
      padding: 9px 10px;
      color: $colors-text--primary;
      font-weight: 500;
      letter-spacing: .3px;
      transition: background-color .15s ease-in-out;

      &:hover {
        background-color: rgba($black, .05);
      }
    }
  }

  &.nav-item--hovered {
    .nav-item {
      &__link {
        color: $colors-text--primary;
      }
    }

    .nav-inner {
      display: block;
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

      &__chevron {
        border-top-color: $white;
      }

      &__bg::before {
        background-color: $colors-accent;
        width: 100%;
        left: 0;
      }
    }

    .nav-inner {
      background-color: $colors-accent;

      &__link {
        color: $white;

        &:hover {
          background-color: rgba($white, .2);
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    display: inline-block;

    &:not(:last-child) {
      margin-right: -15px;
    }

    &__link {
      &:hover {
        .nav-item__bg::before {
          width: 100%;
          left: 0;
        }
      }
    }

    &__bg {
      bottom: 2px;
      clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%);
    }

    &__icon {
      @include size(26px);
    }

    &.nav-item--visited {
      .nav-item {
        &__bg::before {
          background-color: $colors-grey-200;
          width: 100%;
        }
      }
    }
  }

  @media screen and (min-width: 993px) and (max-height: 890px) {
    .nav-item {
      &__link {
        padding: 4px rem(24) 6px;
      }

      &__icon {
        @include size(22px);
      }
    }
  }

  @media screen and (min-width: 993px) and (max-height: 730px) {
    display: block;
    margin: 0 !important;

    &__link {
      padding: 0 rem(24) !important;
      max-width: 300px;
      width: 300px;
      height: 36px;
      line-height: 36px;
      margin-bottom: 10px;
    }

    &__icon {
      @include size(20px);
    }

    &__bg {
      bottom: 0;
      clip-path: none !important;
    }

    &__chevron {
      display: none !important;
    }

    .nav-inner {
      display: none !important;
    }
  }

  @include media-breakpoint-down(md) {
    &__link {
      padding: 7px rem(24) 7px;
      max-width: 300px;
    }

    &__chevron {
      display: none !important;
    }

    .nav-inner {
      display: none !important;
    }
  }
}
</style>

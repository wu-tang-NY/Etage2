<template>
  <NuxtLink
    :to="to"
    :id="id"
    class="block py-1.5 px-6 font-semibold text-sm relative !outline-none flex items-center gap-2 transition-background duration-300 ease-in-out"
    :class="{
      'bg-primary text-white cursor-default': active,
      'bg-gray-100': visited && !active,
      'hover:bg-gray-100': !visited && !active,
      '[clip-path:polygon(0_0,calc(100%-20px)_0,100%_100%,0%_100%)] pl-3':
        index === 0,
      '[clip-path:polygon(0_0,calc(100%-20px)_0,100%_100%,0_100%)] lg:[clip-path:polygon(0_0,calc(100%-20px)_0,100%_100%,20px_100%)]':
        index > 0,
    }"
    role="button"
    tabindex="0"
    @click.prevent="handleClick"
  >
    <slot>
      <svg-icon v-if="icon" :name="icon" original class="size-5 lg:size-6" />

      <span>{{ title }}</span>
    </slot>

    <span
      class="border-4 border-transparent border-t-inherit translate-y-0.5 hidden lg:block"
      v-if="children?.length > 0"
    ></span>
  </NuxtLink>
</template>

<script>
export default {
  name: "AppNavItem",
  props: {
    id: {
      type: String,
    },

    title: {
      type: String,
    },

    index: {
      type: Number,
      required: false,
    },

    icon: {
      type: String,
    },

    to: {
      type: String,
      default: "",
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
      default: () => [],
    },
  },
  computed: {},
  emits: ["click", "close"],
  methods: {
    handleClick(event) {
      this.$emit("click", event);
      // If this nav item has a route (to prop), emit close event for mobile menu
      if (this.to) {
        this.$emit("close");
      }
    },
  },
};
</script>

<style lang="scss">
@media (min-width: 993px) {
  .nav-item:first-child {
    &__bg {
      clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0% 100%);
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

.nav-item {
  @include media-breakpoint-up(lg) {
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

    &.nav-item--visited {
      .nav-item {
        &__bg::before {
          width: 100%;
        }
      }
    }
  }
}
</style>

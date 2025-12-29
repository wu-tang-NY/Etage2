<template>
  <nav
    class="app-nav relative lg:before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-[#e6e6e6] before:to-transparent"
  >
    <ul
      class="flex flex-col justify-start lg:flex-row"
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

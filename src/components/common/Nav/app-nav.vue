<template>
  <nav class="relative">
    <ul class="flex flex-col justify-start gap-1 lg:gap-0 lg:flex-row">
      <slot></slot>
    </ul>
    <div
      class="hidden lg:block absolute top-full left-0 w-full h-[2px] bg-gradient-to-r from-gray-100 dark:from-gray-800 to-transparent"
    ></div>
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

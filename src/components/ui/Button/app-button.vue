<template>
  <button
    class="bg-transparent border border-solid border-text-primary text-xs font-bold text-gray-700 cursor-pointer transition-all duration-200 rounded-sm flex items-center justify-center box-border dark:bg-gray-800 dark:fill-white dark:text-white"
    :type="type"
    :class="[
      classes,
      icon === true ? 'p-0' : 'py-2 px-5',
      size === 'sm' && 'size-6',
      size === 'md' && 'size-8',
      size === 'lg' && 'size-10',
      disabled && 'opacity-50 cursor-not-allowed',
    ]"
    :aria-label="ariaLabel"
    :disabled="disabled"
    :title="title"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    type: {
      type: String,
      default: "button",
    },
    classes: {
      type: String,
      default: "",
    },
    ariaLabel: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    icon: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "md",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<template>
  <button
    class="flex-0 shrink-0 font-bold cursor-pointer transition-all duration-200 rounded-sm flex items-center justify-center box-border"
    :type="type"
    :class="[
      classes,
      icon === true && '!px-0 !w-8',
      size === 'sm' && 'h-6 text-xs px-4',
      size === 'md' && 'h-8 text-xs px-3',
      size === 'lg' && 'h-10 px-6 text-[15px]',
      disabled && 'opacity-40 cursor-not-allowed',
      variant === 'default' &&
        'bg-transparent border border-solid border-gray-700 dark:bg-gray-800 text-gray-700 dark:fill-white dark:text-white dark:border-gray-700',
      variant === 'primary' && 'bg-primary text-white border-none',
      variant === 'secondary' &&
        'bg-gray-200 text-gray-700 dark:bg-secondary dark:text-gray-100 border-none',
      active && '!bg-black !text-white dark:!bg-white dark:!text-black',
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
      default: "default",
    },
    size: {
      type: String,
      default: "md",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    active: {
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

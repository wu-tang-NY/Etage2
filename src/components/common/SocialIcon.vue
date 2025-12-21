<template>
  <a
    :href="href"
    :target="target"
    :rel="rel"
    :aria-label="ariaLabel"
    class="flex items-center justify-center"
    :class="size"
  >
    <svg-icon
      :name="iconName"
      :original="original"
      class="size-full align-top"
    />
  </a>
</template>

<script>
export default {
  name: "SocialIcon",
  props: {
    href: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: "_blank",
    },
    rel: {
      type: String,
      default: "noopener noreferrer",
    },
    iconName: {
      type: String,
      required: true,
    },
    original: {
      type: Boolean,
      default: true,
    },
    ariaLabel: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "size-5",
    },
  },
};
</script>

<template>
  <ClientOnly>
    <div
      class="cloud relative select-none"
      :style="{ width: `${iconWidth}px` }"
    >
      <div
        class="cloud__title font-bold text-sm leading-normal absolute top-1/2 left-0 -mt-1 px-7 -translate-y-1/2"
      >
        <slot>
          <span class="text-lg font-extrabold text-accent">{{ title }}</span>
        </slot>
      </div>

      <div class="cloud__icon">
        <svg-icon :name="icon" :width="iconWidth" original />
      </div>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: "PageMainCarCloud",
  props: {
    title: {
      type: String,
    },

    icon: {
      type: String,
      required: true,
    },

    iconWidth: {
      type: [String, Number],
    },
  },
};
</script>

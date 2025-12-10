<template>
  <ClientOnly>
    <div class="cloud" :style="{ width: `${iconWidth}px` }">
      <div class="cloud__title">
        <slot>{{ title }}</slot>
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

<style lang="scss">
.cloud {
  position: relative;
  user-select: none;

  span {
    font-size: rem(18);
    font-weight: 800;
    letter-spacing: 0.4px;
    color: var(--colors-accent);
  }

  &__title {
    font-weight: 700;
    font-size: rem(13);
    line-height: 1.25;
    @include absolute(50%, 0);
    margin-top: -4px;
    padding: 0 30px;
    transform: translate(0, -50%);
  }
}
</style>

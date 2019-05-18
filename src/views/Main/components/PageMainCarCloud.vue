<template>
  <div class="cloud" :style="{ width: `${iconWidth}px` }">
    <div class="cloud__title">
      <slot>{{ title }}</slot>
    </div>

    <div class="cloud__icon">
      <svg-icon :name="icon" :width="iconWidth" original />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageMainCarCloud',
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
    font-family: $font-family--secondary;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 0.4px;
    color: $colors-accent;
  }

  &__title {
    font-weight: 700;
    font-size: rem(14);
    line-height: 1;
    @include absolute(50%, 0);
    margin-top: -4px;
    padding: 0 30px;
    transform: translate(0, -50%);
  }
}
</style>

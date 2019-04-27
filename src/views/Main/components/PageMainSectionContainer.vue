<template>
  <div class="app-section-container">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppPageMainSectionContainer',
};
</script>

<style lang="scss">
.app-section-container {
  @include size(100%);
}
</style>

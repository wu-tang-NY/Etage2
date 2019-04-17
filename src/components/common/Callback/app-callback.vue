<template functional>
  <div class="app-callback">
    <span class="app-callback__text">Обратный звонок</span>
  </div>
</template>

<script>
export default {
  name: 'AppCallback',
};
</script>

<style lang="scss">
  .app-callback {
    &__text {
      @include underline();
      font: 600 rem(12) $font-family--primary;
      letter-spacing: .2px;
      cursor: pointer;
    }
  }
</style>

<template>
  <div class="app-callback">
    <span class="app-callback__text" @click="modal = !modal">Перезвонить мне</span>

    <callback-modal v-model="modal" />
  </div>
</template>

<script>
import CallbackModal from './app-callback-modal';

export default {
  name: 'AppCallback',
  data: () => ({
    modal: false,
  }),
  components: {
    CallbackModal,
  },
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

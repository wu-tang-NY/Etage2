<template>
  <div class="app-callback">
    <span class="app-callback__text" @click="openCallModal">Перезвонить мне</span>

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
  methods: {
    openCallModal() {
      this.modal = !this.modal;
      this.$emit('openModal');
    },
  },
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

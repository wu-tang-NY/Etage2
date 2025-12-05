<template>
  <div class="app-callback">
    <span id="callback-btn" class="app-callback__text" @click="openCallModal">{{
      $t("callback.button")
    }}</span>

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
    letter-spacing: 0.2px;
    cursor: pointer;
  }
}
</style>

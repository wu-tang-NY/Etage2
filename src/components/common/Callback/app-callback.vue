<template>
  <ClientOnly>
    <div class="app-callback">
      <span
        id="callback-btn"
        class="app-callback__text"
        @click="openCallModal"
        >{{ $t("callback.button") }}</span
      >

      <callback-modal v-model="modal" />
    </div>
  </ClientOnly>
</template>

<script>
import { defineAsyncComponent } from "vue";

// Lazy load CallbackModal - only loads when user clicks to open the modal
// This is safe because the modal is only shown on user interaction
export default {
  name: "AppCallback",
  data: () => ({
    modal: false
  }),
  methods: {
    openCallModal() {
      this.modal = !this.modal;
      this.$emit("openModal");
    }
  },
  components: {
    CallbackModal: defineAsyncComponent(() => import("./app-callback-modal"))
  }
};
</script>

<style lang="scss">
.app-callback {
  &__text {
    @include underline();
    font-size: rem(12);
    font-weight: 600;
    letter-spacing: 0.2px;
    cursor: pointer;
  }
}
</style>

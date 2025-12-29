<template>
  <ClientOnly>
    <div class="mx-[10px]">
      <button
        id="callback-btn"
        class="border-b border-dashed border-[var(--colors-accent)] inline-block text-xs font-semibold tracking-[0.2px] cursor-pointer"
        @click="openCallModal"
      >
        {{ $t("callback.button") }}
      </button>

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
    modal: false,
  }),
  methods: {
    openCallModal() {
      this.modal = !this.modal;
      this.$emit("openModal");
    },
  },
  components: {
    CallbackModal: defineAsyncComponent(() =>
      import("./app-callback-modal.vue")
    ),
  },
};
</script>

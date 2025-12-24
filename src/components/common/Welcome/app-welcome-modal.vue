<template>
  <div>
    <!-- Modal is teleported to body, this wrapper ensures stable root element for transitions -->
    <app-modal :show="isOpen" @update:show="handleUpdate">
      <div class="welcome-block">
        <svg-icon name="icon_thanks" original />
        <h4>{{ $t("welcome.thanks") }}</h4>
        <p>{{ $t("welcome.thanksMessage") }}</p>

        <div class="row">
          <div class="col-lg-12 text-center pb-1">
            <button type="button" class="btn" @click="closeModal">
              {{ $t("welcome.backToSite") }}
            </button>
          </div>
        </div>
      </div>
    </app-modal>
  </div>
</template>

<script>
export default {
  name: "AppWelcomeModal",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    // Legacy support for 'open' prop
    open: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "update:open", "input"],
  computed: {
    isOpen() {
      return this.modelValue !== undefined ? this.modelValue : this.open;
    },
  },
  methods: {
    handleUpdate(value) {
      this.$emit("update:modelValue", value);
      this.$emit("update:open", value);
      this.$emit("input", value);
    },
    closeModal() {
      this.handleUpdate(false);
    },
  },
};
</script>

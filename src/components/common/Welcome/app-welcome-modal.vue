<template>
  <app-modal :show="show" @update:show="closeModal">
    <div class="flex flex-col items-center justify-center">
      <svg-icon name="icon_thanks" class="mb-4 size-20" original />
      <h2>{{ $t("welcome.thanks") }}</h2>
      <p class="text-gray-700 dark:text-gray-300 mb-8">
        {{ $t("welcome.thanksMessage") }}
      </p>

      <AppButton variant="primary" size="lg" class="w-full" @click="closeModal">
        {{ $t("welcome.backToSite") }}
      </AppButton>
    </div>
  </app-modal>
</template>

<script>
import AppButton from "../../ui/Button/app-button.vue";
export default {
  components: {
    AppButton,
  },
  data: () => ({
    show: false,
    timer: null,
  }),
  name: "AppWelcomeModal",
  methods: {
    closeModal() {
      this.show = false;
      this.clearTimer();
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    startAutoCloseTimer() {
      this.clearTimer();
      this.timer = setTimeout(() => {
        this.closeModal();
      }, 10000); // 10 seconds
    },
  },
  mounted() {
    this.$eventbus.$on("openWelcomeModal", () => {
      this.show = true;
      this.startAutoCloseTimer();
    });
  },
  beforeUnmount() {
    this.$eventbus.$off("openWelcomeModal");
    this.clearTimer();
  },
};
</script>

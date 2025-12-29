<template>
  <ClientOnly>
    <app-modal
      :show="isOpen"
      @update:show="$emit('update:modelValue', $event)"
      :title="$t('callback.title')"
    >
      <form>
        <app-input
          id="callback-name"
          :requiredField="!name && name !== null"
          :label="$t('callback.nameLabel')"
          type="text"
          :placeholder="$t('callback.namePlaceholder')"
          v-model="name"
        />

        <app-input
          id="callback-phone"
          :requiredField="!phone && phone !== null"
          :label="$t('callback.phoneLabel')"
          type="text"
          :placeholder="$t('callback.phonePlaceholder')"
          :isPhoneInput="true"
          mask="###-###-##-##"
          v-model="phone"
        />

        <AppButton
          variant="primary"
          size="lg"
          class="w-full"
          :disabled="!name || !phone"
          @click.prevent="handleSendEmail"
        >
          {{ $t("common.submit") }}
        </AppButton>
      </form>
    </app-modal>
  </ClientOnly>
</template>

<script>
import emailService from "@/utils/emailService";
import AppButton from "../../ui/Button/app-button.vue";

export default {
  name: "AppCallbackModal",
  components: {
    AppButton,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    // Legacy support for 'open' prop
    open: {
      type: Boolean,
      default: undefined,
    },
  },
  emits: ["update:modelValue"],
  data: () => ({
    name: null,
    phone: null,
    required: null,
  }),
  computed: {
    isOpen() {
      // Support both modelValue (v-model) and legacy 'open' prop
      return this.open !== undefined ? this.open : this.modelValue;
    },
  },
  watch: {
    isOpen(newValue) {
      // Reset form when modal opens
      if (newValue) {
        this.clearForm();
      }
    },
  },
  methods: {
    clearForm() {
      this.name = null;
      this.phone = null;
    },
    async handleSendEmail() {
      if (this.phone && this.name) {
        try {
          await emailService.sendCallback({
            name: this.name,
            phone: this.phone,
          });
          this.clearForm();
          this.$eventbus.$emit("openWelcomeModal");
          this.closeModal();
        } catch (error) {
          console.error("Failed to send callback request:", error);
          // Optionally show error message to user
        }
      }
    },
    closeModal() {
      this.$emit("update:modelValue", false);
    },
  },
};
</script>

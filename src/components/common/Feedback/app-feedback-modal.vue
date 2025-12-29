<template>
  <ClientOnly>
    <app-modal
      :show="isOpen"
      @update:show="$emit('update:modelValue', $event)"
      :title="$t('feedback.modalTitle')"
    >
      <form v-if="unsend">
        <app-input
          id="feedback-name"
          :requiredField="!name && name !== null"
          :label="$t('feedback.nameLabel')"
          type="text"
          :placeholder="$t('feedback.namePlaceholder')"
          v-model="name"
        />

        <app-input
          id="feedback-from"
          :requiredField="!from && from !== null"
          :label="$t('feedback.fromLabel')"
          type="text"
          :placeholder="$t('feedback.fromPlaceholder')"
          v-model="from"
        />

        <app-input
          id="feedback-phone"
          :requiredField="!phone && phone !== null"
          :label="$t('feedback.phoneLabel')"
          type="text"
          :placeholder="$t('feedback.phonePlaceholder')"
          :isPhoneInput="true"
          mask="###-###-##-##"
          v-model="phone"
        />

        <app-textarea
          id="feedback-comment"
          :requiredField="!comment && comment !== null"
          :label="$t('feedback.commentLabel')"
          :placeholder="$t('feedback.commentPlaceholder')"
          v-model="comment"
        />

        <AppButton
          variant="primary"
          size="lg"
          class="w-full"
          :disabled="!phone || !name || !from || !comment"
          @click.prevent="handleSendEmail"
        >
          {{ $t("common.submit") }}
        </AppButton>
      </form>
      <div v-else>
        <strong>{{ $t("feedback.thanks") }}</strong>
        <br />
        {{ $t("feedback.thanksMessage") }}
      </div>
    </app-modal>
  </ClientOnly>
</template>

<script>
import emailService from "@/utils/emailService";
import AppButton from "../../ui/Button/app-button.vue";
export default {
  name: "AppFeedbackModal",
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
    from: null,
    comment: null,
    unsend: true,
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
      this.from = null;
      this.comment = null;
      this.unsend = true;
    },
    async handleSendEmail() {
      if (this.phone && this.name && this.from && this.comment) {
        try {
          await emailService.sendFeedback({
            name: this.name,
            phone: this.phone,
            from: this.from,
            comment: this.comment,
          });
          this.clearForm();
          this.unsend = false;
        } catch (error) {
          console.error("Failed to send feedback:", error);
          // Optionally show error message to user
        }
      }
    },
  },
};
</script>

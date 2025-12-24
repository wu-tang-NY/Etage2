<template>
  <ClientOnly>
    <app-modal
      :show="isOpen"
      @update:show="$emit('update:modelValue', $event)"
      :title="$t('feedback.modalTitle')"
    >
      <form v-if="unsend">
        <div class="row">
          <div class="col-lg-12">
            <app-input
              id="feedback-name"
              :requiredField="!name && name !== null"
              :label="$t('feedback.nameLabel')"
              type="text"
              :placeholder="$t('feedback.namePlaceholder')"
              v-model="name"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
            <app-input
              id="feedback-from"
              :requiredField="!from && from !== null"
              :label="$t('feedback.fromLabel')"
              type="text"
              :placeholder="$t('feedback.fromPlaceholder')"
              v-model="from"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
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
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
            <app-textarea
              id="feedback-comment"
              :requiredField="!comment && comment !== null"
              :label="$t('feedback.commentLabel')"
              :placeholder="$t('feedback.commentPlaceholder')"
              v-model="comment"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 text-center pb-1">
            <button
              type="button"
              class="btn"
              :disabled="!phone || !name || !from || !comment"
              @click.prevent="handleSendEmail"
            >
              {{ $t("common.submit") }}
            </button>
          </div>
        </div>
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

export default {
  name: "AppFeedbackModal",
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
  methods: {
    async handleSendEmail() {
      if (this.phone && this.name && this.from && this.comment) {
        try {
          await emailService.sendFeedback({
            name: this.name,
            phone: this.phone,
            from: this.from,
            comment: this.comment,
          });
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

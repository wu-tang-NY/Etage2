<template>
  <div class="call-form">
    <div class="flex flex-wrap gap-4">
      <div class="w-full lg:w-1/4">
        <app-input
          id="call-name"
          :requiredField="!name && name !== null"
          :label="$t('callForm.nameLabel')"
          type="text"
          :placeholder="$t('callForm.namePlaceholder')"
          mask=""
          v-model="name"
        />
      </div>

      <div class="w-full lg:w-1/4">
        <app-input
          id="call-phone"
          :requiredField="!phone && phone !== null"
          :label="$t('callForm.phoneLabel')"
          type="text"
          :placeholder="$t('callForm.phonePlaceholder')"
          :isPhoneInput="true"
          mask="###-###-##-##"
          v-model="phone"
        />
      </div>
    </div>

    <app-button
      id="callback-form-btn"
      variant="primary"
      size="lg"
      class="w-full lg:w-auto"
      :disabled="!phone || !name"
      @click.prevent="handleSendEmail"
    >
      {{ $t("common.submit") }}
    </app-button>
  </div>
</template>

<script>
import emailService from "@/utils/emailService";
import AppButton from "@/components/ui/Button/app-button.vue";

export default {
  name: "CallFormComponent",
  components: {
    AppButton,
  },
  props: {
    mobile: Boolean,
    tablet: Boolean,
  },
  data() {
    return {
      name: null,
      phone: null,
    };
  },
  methods: {
    clearForm() {
      this.name = null;
      this.phone = null;
    },
    async handleSendEmail() {
      if (this.name && this.phone) {
        try {
          await emailService.sendCallback({
            name: this.name,
            phone: this.phone,
          });

          this.clearForm();
          this.$emit("closeModal");
          this.$eventbus.emit("openWelcomeModal");
        } catch (error) {
          console.error("Failed to send callback request:", error);
          // Optionally show error message to user
        }
      }
    },
  },
};
</script>

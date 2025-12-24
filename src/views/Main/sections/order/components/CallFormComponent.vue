<template>
  <div class="call-form">
    <div class="row" v-if="unsend">
      <div class="col-lg-4">
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

      <div class="col-lg-4">
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
      :disabled="!phone || !name"
      @click.prevent="handleSendEmail"
    >
      {{ $t("common.submit") }}
    </app-button>

    <welcome-modal v-model="modalWelcomeOpen" />
  </div>
</template>

<script>
import emailService from "@/utils/emailService";
import AppButton from "@/components/ui/Button/app-button.vue";
import WelcomeModal from "@/components/common/Welcome/app-welcome-modal";

export default {
  name: "CallFormComponent",
  components: {
    WelcomeModal,
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
      unsend: true,
      modalWelcomeOpen: false,
    };
  },
  beforeUnmount() {
    // Ensure modal is closed before component unmounts
    if (this.modalWelcomeOpen) {
      this.modalWelcomeOpen = false;
    }
  },
  methods: {
    async handleSendEmail() {
      if (this.name && this.phone) {
        try {
          await emailService.sendCallback({
            name: this.name,
            phone: this.phone,
          });

          this.unsend = false;
          this.modalWelcomeOpen = true;
        } catch (error) {
          console.error("Failed to send callback request:", error);
          // Optionally show error message to user
        }
      }
    },
  },
};
</script>

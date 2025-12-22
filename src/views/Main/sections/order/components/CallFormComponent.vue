<template>
  <div class="call-form">
    <div class="mobile-wrapper">
      <header class="flex justify-between mb-6">
        <div v-if="mobile || tablet" class="order-form__title">
          <h3>{{ $t("callForm.title") }}</h3>
          <div class="text-sm">{{ $t("callForm.subtitle") }}</div>
        </div>
        <AppButton
          v-if="mobile || tablet"
          :icon="true"
          @click="$emit('closeModal')"
        >
          <svg
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            /></svg
        ></AppButton>
      </header>

      <div class="row" v-if="unsend">
        <div class="col-lg-4">
          <app-input
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
      <welcome-modal v-model="modalWelcomeOpen" />
      <div class="call-form__btn-wrapper" v-if="unsend">
        <button
          id="callback-form-btn"
          class="call-form__button"
          :disabled="!phone || !name"
          @click.prevent="handleSendEmail"
        >
          {{ $t("common.submit") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import emailService from "@/utils/emailService";
import WelcomeModal from "@/components/common/Welcome/app-welcome-modal";

export default {
  name: "CallFormComponent",
  components: {
    WelcomeModal,
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

<style lang="scss">
.call-form {
  margin-top: 30px;

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 13px 20px;
    font-size: rem(14);
    font-weight: bold;
    line-height: 1;
    letter-spacing: 0.3px;
    color: var(--white);
    border: none;
    box-shadow: none;
    background-color: var(--colors-accent);

    &:hover,
    &:focus,
    &:active {
      outline: none;
    }
  }
}

@media screen and (max-width: 992px) {
  .call-form {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    max-height: 100vh;
    min-height: 100vh;
    overflow: auto;
    z-index: 999999;
    padding: 0 16px;
    background-color: #fff;
    margin-top: 0;

    &__button {
      width: 100%;
    }

    &__btn-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>

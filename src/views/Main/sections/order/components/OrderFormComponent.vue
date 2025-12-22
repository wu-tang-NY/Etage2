<template>
  <form class="order-form">
    <div class="mobile-wrapper">
      <header class="flex justify-between mb-6">
        <div v-if="mobile || tablet" class="order-form__title">
          <h3>{{ $t("orderForm.title") }}</h3>
          <div class="text-sm">{{ $t("orderForm.subtitle") }}</div>
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
        <div class="col-lg-3">
          <app-input
            :requiredField="!name && name !== null"
            v-model="name"
            :label="$t('orderForm.nameLabel')"
            type="text"
            :placeholder="$t('orderForm.namePlaceholder')"
          />
        </div>

        <div class="col-lg-3">
          <app-input
            :requiredField="!phone && phone !== null"
            v-model="phone"
            :label="$t('orderForm.phoneLabel')"
            type="text"
            :placeholder="$t('orderForm.phonePlaceholder')"
            :isPhoneInput="true"
            mask="###-###-##-##"
          />
        </div>

        <div class="col-lg-3">
          <app-input
            v-model="from"
            :label="$t('orderForm.fromLabel')"
            type="text"
            :placeholder="$t('orderForm.fromPlaceholder')"
          />
        </div>

        <div class="col-lg-3">
          <app-input
            v-model="date"
            :label="$t('orderForm.dateLabel')"
            type="text"
            :placeholder="$t('orderForm.datePlaceholder')"
            mask="##/##/#### ##:##"
          />
        </div>

        <div class="col-lg-3">
          <app-select
            v-model="type"
            :label="$t('orderForm.typeLabel')"
            :placeholder="$t('orderForm.typePlaceholder')"
            :options="transport.options"
            :value="transport.value"
          ></app-select>
        </div>

        <div class="col-lg-3">
          <app-select
            v-model="workers"
            :label="$t('orderForm.workersLabel')"
            :placeholder="$t('orderForm.workersPlaceholder')"
            :options="stuff.options"
            :value="stuff.value"
          ></app-select>
        </div>

        <div class="col-lg-3">
          <app-input
            v-model="to"
            :label="$t('orderForm.toLabel')"
            type="text"
            :placeholder="$t('orderForm.toPlaceholder')"
          />
        </div>

        <div class="col-lg-3">
          <app-input
            v-model="comment"
            :label="$t('orderForm.commentLabel')"
            type="text"
            :placeholder="$t('orderForm.commentPlaceholder')"
          />
        </div>
      </div>
      <welcome-modal v-model="modalWelcomeOpen" />
      <div class="order-form__btn-wrapper" v-if="unsend">
        <button
          id="order-form-btn"
          class="order-form__button"
          :disabled="!phone || !name"
          @click.prevent="handleSendEmail"
        >
          {{ $t("common.submit") }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import emailService from "@/utils/emailService";
import WelcomeModal from "@/components/common/Welcome/app-welcome-modal";

export default {
  name: "SectionOrderFormComponent",
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
      from: "",
      to: "",
      workers: null,
      type: null,
      date: null,
      comment: "",
      unsend: true,
      modalWelcomeOpen: false,
    };
  },
  computed: {
    transport() {
      return {
        options: [
          this.$t("orderForm.transportOptions.flat"),
          this.$t("orderForm.transportOptions.office"),
          this.$t("orderForm.transportOptions.stuff"),
        ],
        value: null,
      };
    },
    stuff() {
      return {
        options: [
          this.$t("orderForm.workersOptions.one"),
          this.$t("orderForm.workersOptions.two"),
          this.$t("orderForm.workersOptions.three"),
          this.$t("orderForm.workersOptions.more"),
        ],
        value: null,
      };
    },
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
          await emailService.sendOrder({
            name: this.name,
            phone: this.phone,
            from: this.from,
            to: this.to,
            workers: this.workers,
            type: this.type,
            date: this.date,
            comment: this.comment,
          });

          this.unsend = false;
          this.modalWelcomeOpen = true;
        } catch (error) {
          console.error("Failed to send order:", error);
          // Optionally show error message to user
        }
      }
    },
  },
};
</script>

<style lang="scss">
.order-form {
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

  &__after {
    font-size: rem(14);
    color: var(--colors-text-primary);
  }
}

@media screen and (max-width: 992px) {
  .order-form {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
    max-height: 100vh;
    overflow: auto;
    z-index: 999999;
    background-color: #fff;
    margin-top: 0;
    padding: 0 16px;

    &__close {
      @include size(16px);
      overflow: hidden;
      position: relative;
      top: 4px;
      right: 0;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotateZ(-45deg);
        @include size(20px, 2px);
        background-color: var(--colors-text-primary);
      }

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotateZ(45deg);
        @include size(20px, 2px);
        background-color: var(--colors-text-primary);
      }
    }

    &__btn-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 40px;
    }
  }
}
</style>

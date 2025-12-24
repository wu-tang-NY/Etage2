<template>
  <div class="order-form">
    <div class="row" v-if="unsend">
      <div class="col-lg-3">
        <app-input
          id="order-name"
          :requiredField="!name && name !== null"
          v-model="name"
          :label="$t('orderForm.nameLabel')"
          type="text"
          :placeholder="$t('orderForm.namePlaceholder')"
        />
      </div>

      <div class="col-lg-3">
        <app-input
          id="order-phone"
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
          id="order-from"
          v-model="from"
          :label="$t('orderForm.fromLabel')"
          type="text"
          :placeholder="$t('orderForm.fromPlaceholder')"
        />
      </div>

      <div class="col-lg-3">
        <app-input
          id="order-date"
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
          id="order-to"
          v-model="to"
          :label="$t('orderForm.toLabel')"
          type="text"
          :placeholder="$t('orderForm.toPlaceholder')"
        />
      </div>

      <div class="col-lg-3">
        <app-input
          id="order-comment"
          v-model="comment"
          :label="$t('orderForm.commentLabel')"
          type="text"
          :placeholder="$t('orderForm.commentPlaceholder')"
        />
      </div>

      <div class="col-lg-12 text-center pb-1">
        <AppButton
          id="order-form-btn"
          variant="primary"
          size="lg"
          :disabled="!phone || !name"
          @click.prevent="handleSendEmail"
        >
          {{ $t("common.submit") }}
        </AppButton>
      </div>
    </div>

    <welcome-modal v-model="modalWelcomeOpen" />
  </div>
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

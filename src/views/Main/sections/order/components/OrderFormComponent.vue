<template>
  <div class="order-form">
    <div class="flex flex-wrap">
      <div class="w-full lg:w-1/4">
        <app-input
          id="order-name"
          :requiredField="!name && name !== null"
          v-model="name"
          :label="$t('orderForm.nameLabel')"
          type="text"
          :placeholder="$t('orderForm.namePlaceholder')"
        />
      </div>

      <div class="w-full lg:w-1/4">
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

      <div class="w-full lg:w-1/4">
        <app-input
          id="order-from"
          v-model="from"
          :label="$t('orderForm.fromLabel')"
          type="text"
          :placeholder="$t('orderForm.fromPlaceholder')"
        />
      </div>

      <div class="w-full lg:w-1/4">
        <app-input
          id="order-date"
          v-model="date"
          :label="$t('orderForm.dateLabel')"
          type="text"
          :placeholder="$t('orderForm.datePlaceholder')"
          mask="##/##/#### ##:##"
        />
      </div>

      <div class="w-full lg:w-1/4">
        <app-select
          v-model="type"
          :label="$t('orderForm.typeLabel')"
          :placeholder="$t('orderForm.typePlaceholder')"
          :options="transport.options"
          :value="transport.value"
        ></app-select>
      </div>

      <div class="w-full lg:w-1/4">
        <app-select
          v-model="workers"
          :label="$t('orderForm.workersLabel')"
          :placeholder="$t('orderForm.workersPlaceholder')"
          :options="stuff.options"
          :value="stuff.value"
        ></app-select>
      </div>

      <div class="w-full lg:w-1/4">
        <app-input
          id="order-to"
          v-model="to"
          :label="$t('orderForm.toLabel')"
          type="text"
          :placeholder="$t('orderForm.toPlaceholder')"
        />
      </div>

      <div class="w-full lg:w-1/4">
        <app-input
          id="order-comment"
          v-model="comment"
          :label="$t('orderForm.commentLabel')"
          type="text"
          :placeholder="$t('orderForm.commentPlaceholder')"
        />
      </div>

      <div class="w-full">
        <app-button
          id="order-form-btn"
          variant="primary"
          size="lg"
          class="w-full lg:w-auto"
          :disabled="!phone || !name"
          @click.prevent="handleSendEmail"
        >
          {{ $t("common.submit") }}
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
import emailService from "@/utils/emailService";

export default {
  name: "SectionOrderFormComponent",
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
    clearForm() {
      this.name = null;
      this.phone = null;
      this.from = "";
      this.to = "";
      this.workers = null;
      this.type = null;
      this.date = null;
      this.comment = "";
    },
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
          this.clearForm();
          this.$emit("closeModal");
          this.$eventbus.emit("openWelcomeModal");
        } catch (error) {
          console.error("Failed to send order:", error);
          // Optionally show error message to user
        }
      }
    },
  },
};
</script>

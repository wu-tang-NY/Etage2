<template>
  <ClientOnly>
    <app-modal
      :show="isOpen"
      @update:show="$emit('update:modelValue', $event)"
      :title="unsend ? $t('callback.title') : false"
    >
      <form v-if="unsend">
        <div class="row">
          <div class="col-lg-12">
            <app-input
              :requiredField="!name && name !== null"
              :label="$t('callback.nameLabel')"
              type="text"
              :placeholder="$t('callback.namePlaceholder')"
              v-model="name"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
            <app-input
              :requiredField="!phone && phone !== null"
              :label="$t('callback.phoneLabel')"
              type="text"
              :placeholder="$t('callback.phonePlaceholder')"
              :isPhoneInput="true"
              mask="###-###-##-##"
              v-model="phone"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 text-center pb-1">
            <button
              type="button"
              class="btn"
              :disabled="!name || !phone"
              @click.prevent="handleSendEmail"
            >
              {{ $t("common.submit") }}
            </button>
          </div>
        </div>
      </form>

      <div v-else class="welcome-block">
        <svg-icon name="icon_thanks" original />
        <h4>{{ $t("callback.thanks") }}</h4>
        <p>{{ $t("callback.thanksMessage") }}</p>
        <button type="button" class="btn" @click="closeModal">
          {{ $t("common.backToSite") }}
        </button>
      </div>
    </app-modal>
  </ClientOnly>
</template>

<script>
import emailService from "@/utils/emailService";

export default {
  name: "AppCallbackModal",
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
    unsend: true,
    required: null,
  }),
  computed: {
    isOpen() {
      // Support both modelValue (v-model) and legacy 'open' prop
      return this.open !== undefined ? this.open : this.modelValue;
    },
  },
  methods: {
    async handleSendEmail() {
      if (this.phone && this.name) {
        try {
          await emailService.sendCallback({
            name: this.name,
            phone: this.phone,
          });
          this.unsend = false;
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

<style lang="scss">
.btn {
  background-color: var(--colors-accent);
  border-radius: 0;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  color: var(--white);
  font-size: rem(14);
  line-height: 1;
  font-weight: 600;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  width: 100%;

  &:hover {
    color: var(--white);
    filter: brightness(1.1);
  }
}
</style>

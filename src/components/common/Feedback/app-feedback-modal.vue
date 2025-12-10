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
import axios from "axios";

export default {
  name: "AppFeedbackModal",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    // Legacy support for 'open' prop
    open: {
      type: Boolean,
      default: undefined
    }
  },
  emits: ["update:modelValue"],
  data: () => ({
    name: null,
    phone: null,
    from: null,
    comment: null,
    unsend: true
  }),
  computed: {
    isOpen() {
      // Support both modelValue (v-model) and legacy 'open' prop
      return this.open !== undefined ? this.open : this.modelValue;
    }
  },
  methods: {
    handleSendEmail() {
      if (this.phone && this.name && this.from && this.comment) {
        axios({
          url: "https://etage.com.ua/api/feedback",
          method: "post",
          data: {
            name: this.name,
            phone: this.phone,
            from: this.from,
            comment: this.comment
          }
        });
        this.unsend = false;
      }
    }
  }
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
  letter-spacing: 0.3px;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    color: var(--white);
    filter: brightness(1.1);
  }
}
</style>

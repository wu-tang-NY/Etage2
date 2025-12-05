<template>
  <app-modal
    :show="open"
    @input="$emit('input', $event)"
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
</template>

<script>
import axios from 'axios';

export default {
  name: 'AppCallbackModal',
  model: {
    prop: 'open',
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    internalModalState: {
      get() {
        return this.open;
      },
      set(v) {
        this.$emit('input', v);
      },
    },

    name: null,
    phone: null,
    unsend: true,
    required: null,
  }),
  methods: {
    handleSendEmail() {
      if (this.phone && this.name) {
        axios({
          url: 'https://etage.com.ua/api/callback',
          method: 'post',
          data: {
            name: this.name,
            phone: this.phone,
          },
        });
        this.unsend = false;
      }
    },
    closeModal() {
      this.open = false;
    },
  },
};
</script>

<style lang="scss">
.btn {
  background-color: $colors-accent;
  border-radius: 0;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  color: $white;
  font-size: rem(14);
  line-height: 1;
  letter-spacing: 0.3px;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    color: $white;
    filter: brightness(1.1);
  }
}
</style>

<template>
  <div class="call-form">
    <div class="mobile-wrapper">
      <template v-if="mobile || tablet">
        <div class="call-form__close" @click="$emit('closeModal')"></div>

        <div class="call-form__title">
          <h2>{{ $t('callForm.title') }}</h2>
          <div class="subtitle">{{ $t('callForm.subtitle') }}</div>
        </div>
      </template>

      <div class="row" v-if="unsend">
        <div class="col-lg-4">
          <app-input :requiredField="!name && name !== null" :label="$t('callForm.nameLabel')" type="text" :placeholder="$t('callForm.namePlaceholder')"
            mask="" v-model="name" />
        </div>

        <div class="col-lg-4">
          <app-input :requiredField="!phone && phone !== null" :label="$t('callForm.phoneLabel')" type="text"
            :placeholder="$t('callForm.phonePlaceholder')" mask="###-###-##-##" v-model="phone" />
        </div>
      </div>
      <welcome-modal v-model="modalWelcomeOpen" />
      <div class="call-form__btn-wrapper" v-if="unsend">
        <button id="callback-form-btn" class="call-form__button" :disabled="!phone || !name"
          @click.prevent="handleSendEmail">{{ $t('common.submit') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import WelcomeModal from '@/components/common/Welcome/app-welcome-modal';

export default {
  name: 'CallFormComponent',
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
      modalWelcomeOpen: true,
    };
  },
  mounted() {
    this.modalWelcomeOpen = false;
  },
  methods: {
    handleSendEmail() {
      if (this.name && this.phone) {
        axios({
          url: 'https://etage.com.ua/api/callback',
          method: 'post',
          data: {
            name: this.name,
            phone: this.phone,
          },
        });

        this.unsend = false;
        this.modalWelcomeOpen = true;
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
    color: $white;
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

    &__close {
      @include size(16px);
      overflow: hidden;
      position: absolute;
      top: 16px;
      right: 0;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotateZ(-45deg);
        @include size(20px, 2px);
        background-color: var(--colors-text-primary);
      }

      &::after {
        content: '';
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
    }
  }
}
</style>

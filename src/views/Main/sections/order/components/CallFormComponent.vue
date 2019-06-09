<template>
  <div class="call-form">
    <div class="mobile-wrapper">
      <template v-if="mobile || tablet">
        <div class="call-form__close" @click="$emit('closeModal')"></div>

        <div class="call-form__title">
          <h2>Оставьте номер</h2>
          <div class="subtitle">чтобы узнать все и сразу</div>
        </div>
      </template>

      <div class="row" v-if="unsend">
        <div class="col-lg-4">
          <app-input
            :requiredField="!name && name !== null"
            label="Как к вам обращаться"
            type="text"
            placeholder="Имя"
            mask=""
            v-model="name"
          />
        </div>

        <div class="col-lg-4">
          <app-input
            :requiredField="!phone && phone !== null"
            label="Номер телефона"
            type="text"
            placeholder="0ХХ ХХХ ХХХХ"
            mask="### - ### - ## - ##"
            v-model="phone"
          />
        </div>
      </div>
      <div v-else>
        <strong>Спасибо, запрос отправлен</strong>
        <br>
        Мы свяжемся с вами в ближайшее время
      </div>
      <div class="call-form__btn-wrapper" v-if="unsend">
        <button class="call-form__button" :disabled="!phone || !name" @click.prevent="handleSendEmail">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CallFormComponent',
  props: {
    mobile: Boolean,
    tablet: Boolean,
  },
  data() {
    return {
      name: null,
      phone: null,
      unsend: true,
    };
  },
  methods: {
    handleSendEmail() {
      if (this.name && this.phone) {
        axios({
          url: 'http://etage.com.ua/api/callback',
          method: 'post',
          data: {
            name: this.name,
            phone: this.phone,
          },
        });

        this.unsend = false;
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
    background-color: $colors-accent;

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
        background-color: $colors-text--primary;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotateZ(45deg);
        @include size(20px, 2px);
        background-color: $colors-text--primary;
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

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

      <div class="row">
        <div class="col-lg-4">
          <app-input
            label="Как к вам обращаться"
            type="text"
            placeholder="Имя"
            mask=""
            v-model="name"
          />
        </div>

        <div class="col-lg-4">
          <app-input
            label="Номер телефона"
            type="text"
            placeholder="0ХХ ХХХ ХХХХ"
            mask="### - ### - ## - ##"
            v-model="phone"
          />
        </div>
      </div>
      <div class="call-form__btn-wrapper">
        <button class="call-form__button" @click.prevent="handleSendEmail">Отправить</button>
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
      name: '',
      phone: '',
    };
  },
  methods: {
    handleSendEmail() {
      const url = 'https://api.sendgrid.com/v3/mail/send';
      const token = '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';

      axios({
        url,
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        data: {
          'personalizations': [{
            'to': [{
              'email': 'stoleurbike@gmail.com',
              'name': 'Etage',
            }],
            'subject': 'Order Message!',
          }],
          'content': [{
            'type': 'text/html',
            'value': `
              <strong>Имя:</strong> ${this.name},
              Телефон: ${this.phone},
              Откуда: ${this.from},
              Куда: ${this.to},
              Грузчики: ${this.workers},
              Тип: ${this.type},
              Дата: ${this.date},
              Комментарий: ${this.comment},
            `,
          }],
          'from': {
            'email': 'stoleurbike@gmail.com',
            'name': 'Sam Smith',
          },
          'reply_to': {
            'email': 'stoleurbike@gmail.com',
            'name': 'Sam Smith',
          },
        },
      });
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

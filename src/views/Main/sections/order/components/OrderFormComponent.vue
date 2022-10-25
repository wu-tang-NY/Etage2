<template>
  <form class="order-form">
    <div class="mobile-wrapper">

      <template v-if="mobile || tablet">
        <div class="order-form__close" @click="$emit('closeModal')"></div>

        <div class="order-form__title">
          <h2>Заполните форму</h2>
          <div class="subtitle">и мы перезвоним вам в течение 15 минут и огласим примерную стоимость</div>
        </div>
      </template>

      <div class="row" v-if="unsend">
        <div class="col-lg-3">
          <app-input :requiredField="!name && name !== null" v-model="name" label="Как к вам обращаться" type="text"
            placeholder="Имя" />
        </div>

        <div class="col-lg-3">
          <app-input :requiredField="!phone && phone !== null" v-model="phone" label="Ваш номер телефона" type="text"
            placeholder="0ХХ ХХХ ХХ ХХ" mask="###-###-##-##" />
        </div>

        <div class="col-lg-3">
          <app-input v-model="from" label="Откуда" type="text" placeholder="Введите адресс" />
        </div>

        <div class="col-lg-3">
          <app-input v-model="date" label="Планируемая дата" type="text" placeholder="ДД/ММ/ГГГГ ЧЧ:ММ"
            mask="##/##/#### ##:##" />
        </div>

        <div class="col-lg-3">
          <app-select v-model="type" label="Тип транспортировки" placeholder="Выберите" :options="transport.options"
            :value="transport.value"></app-select>
        </div>

        <div class="col-lg-3">
          <app-select v-model="workers" label="Грузчики" placeholder="Выберите" :options="stuff.options"
            :value="stuff.value"></app-select>
        </div>

        <div class="col-lg-3">
          <app-input v-model="to" label="Куда" type="text" placeholder="Введите адресс" />
        </div>

        <div class="col-lg-3">
          <app-input v-model="comment" label="Комментарий или пожелание" type="text" placeholder="Ваши пожелания" />
        </div>
      </div>
      <welcome-modal v-model="modalWelcomeOpen" />
      <div class="order-form__btn-wrapper" v-if="unsend">
        <button class="order-form__button" :disabled="!phone || !name"
          @click.prevent="handleSendEmail">Отправить</button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
import WelcomeModal from '@/components/common/Welcome/app-welcome-modal';

export default {
  name: 'SectionOrderFormComponent',
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
      from: '',
      to: '',
      workers: null,
      type: null,
      date: null,
      comment: '',
      unsend: true,

      transport: {
        options: ['Квартирный переезд', 'Офисный переезд', 'Перевозка имущества'],
        value: null,
      },
      stuff: {
        options: ['1 грузчик', '2 грузчика', '3 грузчика', 'более 3 грузчиков'],
        value: null,
      },
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
          url: 'https://etage.com.ua/api/order',
          method: 'post',
          data: {
            name: this.name,
            phone: this.phone,
            from: this.from,
            to: this.to,
            workers: this.workers,
            type: this.type,
            date: this.date,
            comment: this.comment,
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

  &__after {
    font-size: rem(14);
    color: $colors-text--primary;
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
      margin-bottom: 40px;
    }
  }
}
</style>

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

      <div class="row">
        <div class="col-lg-3">
          <app-input
            label="Как к вам обращаться"
            type="text"
            placeholder="Имя"
          />
        </div>

        <div class="col-lg-3">
          <app-input
            label="Ваш номер телефона"
            type="text"
            placeholder="09Х ХХХ ХХ ХХ"
          />
        </div>

        <div class="col-lg-3">
          <app-input
            label="Планируемая дата"
            type="text"
            placeholder="Введите дату"
          />
        </div>

        <div class="col-lg-3">
          <app-input
            label="Откуда"
            type="text"
            placeholder="Введите адресс"
          />
        </div>

        <div class="col-lg-3">
          <app-select
            label="Тип транспортировки"
            placeholder="Выберите"
            :options="transport.options"
            :value="transport.value"
          ></app-select>
        </div>

        <div class="col-lg-3">
          <app-select
            label="Грузчики"
            placeholder="Выберите"
            :options="transport.options"
            :value="transport.value"
          ></app-select>
        </div>

        <div class="col-lg-3">
          <app-input
            label="Комментарий или пожелание"
            type="text"
            placeholder="Введите комментарий или пожелание"
          />
        </div>

        <div class="col-lg-3">
          <app-input
            label="Куда"
            type="text"
            placeholder="Введите адресс"
          />
        </div>
        </div>
      <div class="order-form__btn-wrapper">
        <button class="order-form__button" type="submit">Отправить</button>
      </div>
    </div>
  </form>
</template>

<script>

export default {
  name: 'SectionOrderFormComponent',
  props: {
    mobile: Boolean,
    tablet: Boolean,
  },
  data() {
    return {
      transport: {
        options: ['Позиция1', 'Позиция2', 'Позиция2', 'Позиция3'],
        value: null,
      },
    };
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
    }
  }
}
</style>

<template>
  <form class="order-form">
    <div class="order-form__title" v-if="isMobile">
      <h2>Заполните форму</h2>
      <div class="subtitle">и мы перезвоним вам в течение 15 минут и огласим примерную стоимость</div>
    </div>
    <div class="order-form__wrapper">
      <app-input
        label="Как к вам обращаться"
        type="text"
        placeholder="Имя"
      />

      <app-input
        label="Ваш номер телефона"
        type="text"
        placeholder="09Х ХХХ ХХ ХХ"
      />

      <app-input
        label="Планируемая дата"
        type="text"
        placeholder="Введите дату"
      />

      <!-- Заменить на селект 2 инпута -->
      <app-input
        label="Планируемая дата"
        type="text"
        placeholder="Введите дату"
      />

      <app-input
        label="Планируемая дата"
        type="text"
        placeholder="Введите дату"
      />

      <app-input
        label="Откуда"
        type="text"
        placeholder="Введите адресс"
      />

      <app-input
        label="Куда"
        type="text"
        placeholder="Введите адресс"
      />
    </div>

    <button class="order-form__button" type="submit">Отправить</button>
  </form>
</template>

<script>
export default {
  name: 'SectionOrderFormComponent',
  computed: {
    isMobile() {
      return window.innerWidth < 577;
    },
  },
};
</script>

<style lang="scss">
.order-form {
  margin-top: 30px;

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .app-form {
    margin-right: 40px;
  }

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 20px;
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

@media screen and (max-width: 576px) {
  .order-form {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vh;
    min-height: 100vh;
    z-index: 99;
    padding: 65px 16px 40px 16px;
    background-color: #fff;
  }
}
</style>

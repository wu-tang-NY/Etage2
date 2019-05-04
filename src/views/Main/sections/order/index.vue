<template>
  <div class="section-order">
    <h2>Онлайн заказ</h2>

    <div class="subtitle dark-gray">
      Если вы впервые столкнулись с потребностью использования сервиса
      грузоперевозок и точно не знаете, какого размера автомобиль вам нужен и необходимы ли грузчики вообще
        - не отчаивайтесь. У превалирующего большинства наших постоянных заказчиков мы - их первый опыт.
      Мы будем рады прояснить для вас все моменты, связанные с работой нашего сервиса или спецификой сферы перевозок в целом.
      Просто оставьте свой номер ниже.
    </div>

    <div class="section-order__tab-wrapper">
      <div class="section-order__tab-block">
        <button
          class="section-order__tab order__tab--left"
          :class="{ 'section-order__tab--active': tabs[activeTab] === 'order' }"
          @click="activeTab = 0"
        >
          Заполните форму
        </button>

        <div
          class="section-order__tab-description"
          :class="{ 'section-order__tab-description--active': tabs[activeTab] === 'order' }"
        >
          и мы перезвоним вам в течение 15 минут и огласим примерную стоимость
        </div>
      </div>

      <div class="section-order__tab-block">
        <div class="section-order__divider">
          или
        </div>
      </div>

      <div class="section-order__tab-block">
        <button
          class="section-order__tab order__tab--right"
          :class="{ 'section-order__tab--active': tabs[activeTab] === 'call' }"
          @click="activeTab = 1"
        >
          Оставьте номер
        </button>

        <div
          class="section-order__tab-description section-order__tab-description--right"
          :class="{ 'section-order__tab-description--active': !active }"
        >
          чтобы узнать все и сразу
        </div>
      </div>
    </div>


    <transition name="component-fade" mode="out-in" >
      <component :is="tabs[activeTab]" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppPageMainSectionOrder',
  components: {
    order: () => import('./components/OrderFormComponent'),
    call: () => import('./components/CallFormComponent'),
  },
  props: {
    active: {
      type: Boolean,
    },
  },
  data: () => ({
    tabs: ['order', 'call'],
    activeTab: 0,
  }),
};
</script>

<style lang="scss">
.section-order {
  padding-top: 30px;

  h2 {
    margin-bottom: 16px;
  }

  .subtitle {
    margin-bottom: 40px;
  }

  &__tab-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  &__divider {
    font-family: $font-family--primary;
    font-size: rem(14);
    line-height: 36px;
    font-weight: bold;
    letter-spacing: 0.3px;
    color: $colors-text--primary;
    padding: 0 20px;
  }

  &__tab {
    display: inline-flex;
    align-items: center;
    height: 36px;
    color: $colors-text--primary;
    background-color: $colors-grey-200;
    line-height: 36px;
    border: none;
    outline: none;
    font-family: $font-family--secondary;
    font-size: rem(18);
    font-weight: 800;
    letter-spacing: .4px;
    text-transform: uppercase;
    transition: .3s ease-in-out;
    margin-bottom: 12px;

    &:hover, &:active, &:focus {
      outline: none;
    }

    &--left {
      padding: 0 40px 0 20px;
      clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0% 100%);
    }

    &--right {
      padding: 0 20px 0 40px;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 20px 100%);
    }

    &--active {
      color: $white;
      background-color: $colors-text--primary;
    }
  }

  &__tab-description {
    max-width: 222px;
    font-size: rem(14);
    color: $colors-text--secondary;
    transition: .3s ease-in-out;
    letter-spacing: .3px;

    &--active {
      color: $colors-text--primary;
    }

    &--right {
      padding-left: 20px;
    }
  }
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity .4s ease;
}

.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>

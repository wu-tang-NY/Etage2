<template>
  <div class="section-order">
    <h2>Онлайн заказ</h2>

    <div class="subtitle dark-gray">
      Если вы впервые столкнулись с потребностью использования сервиса
      грузоперевозок и точно не знаете, какого размера автомобиль вам нужен и необходимы ли грузчики вообще
        - не отчаивайтесь. У превалирующего большинства наших постоянных заказчиков мы - их первый опыт.
      Мы будем рады прояснить для вас все моменты, связанные с работой нашего сервиса или спецификой сферы перевозок в целом.
      Просто оставьте свой номер ниже.
    </div>

    <div class="section-order__tab-wrapper">
      <div class="section-order__tab-block">
        <button
          class="section-order__tab section-order__tab--left"
          :class="{ 'section-order__tab--active': tabs[activeTab] === 'call' }"
          @click="handleOpenOrderComponent"
        >
          Оставьте номер
        </button>

        <div
          class="section-order__tab-description"
          :class="{ 'section-order__tab-description--active': tabs[activeTab] === 'call' }"
        >
          чтобы узнать все и сразу
        </div>
      </div>

      <div class="section-order__tab-block">
        <div class="section-order__divider">
          или
        </div>
      </div>

      <div class="section-order__tab-block">
        <button
          class="section-order__tab section-order__tab--right"
          :class="{ 'section-order__tab--active': tabs[activeTab] === 'order' }"
          @click="handleOpenPhoneComponent"
        >
          Заполните форму
        </button>

        <div
          class="section-order__tab-description section-order__tab-description--right"
          :class="{ 'section-order__tab-description--active': tabs[activeTab] === 'order' }"
        >
          и мы перезвоним вам в течение 15 минут и огласим примерную стоимость
        </div>
      </div>
    </div>


    <transition name="component-fade" mode="out-in" v-if="(!mobile && !tablet) || isModalOpen">
      <component
        :is="tabs[activeTab]"
        @closeModal="closeModal"
        :mobile="mobile"
        :tablet="tablet"
      />
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
    mobile: Boolean,
    tablet: Boolean,
  },
  data: () => ({
    tabs: ['call', 'order'],
    activeTab: 0,
    isModalOpen: false,
  }),
  watch: {
    mobile() {
      this.isModalOpen = false;
    },
    tablet() {
      this.isModalOpen = false;
    },
  },
  methods: {
    handleOpenOrderComponent() {
      this.activeTab = 0;
      this.isModalOpen = true;
      if (this.mobile || this.tablet) document.body.classList.add('modal-open');
    },
    handleOpenPhoneComponent() {
      this.activeTab = 1;
      this.isModalOpen = true;
      if (this.mobile || this.tablet) document.body.classList.add('modal-open');
    },
    closeModal() {
      this.isModalOpen = false;
      document.body.classList.remove('modal-open');
    },
  },
  created() {
    this.$eventbus.$on('openFormModal', this.handleOpenPhoneComponent);
  },
};
</script>

<style lang="scss">
.section-order {
  padding-top: 40px;

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

@media screen and (min-width: 993px) and (max-height: 920px) {
  .section-order {
    padding-top: 0;

    &__tab-description {
      display: none;
    }

    .order-form__button {
      height: 38px;
    }
  }
}

@media screen and (min-width: 993px) and (max-height: 760px) {
  .section-order {
    padding-top: 40px;
  }
}

@media screen and (max-width: 992px) {
  .section-order {
    padding-top: 50px;
    padding-bottom: 20px;

    h2 {
      margin-bottom: 10px;
    }

    .subtitle {
      margin-bottom: 30px;
    }

    &__tab-wrapper {
      flex-wrap: wrap;
    }

    &__tab-block {
      width: 100%;
      text-align: center;
      margin-bottom: 8px;
    }

    &__tab {
      margin-bottom: 10px;
      text-transform: none;
      font-size: rem(14);
      font-weight: bold;
      height: 40px;
      line-height: 40px;

      &--left,
      &--right {
        clip-path: none;
        padding: 0 20px;
      }
    }

    &__tab-description {
      font-size: rem(10);
      line-height: 2;
      letter-spacing: 0.2px;
      text-align: center;
      margin: 0 auto;
    }
  }
}
</style>

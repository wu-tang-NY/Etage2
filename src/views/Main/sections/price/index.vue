<template>
  <div class="price">
    <h2>Как формируется стоимость?</h2>

    <div class="subtitle dark-gray price__header--mobile">
      <a href="javascript:void(0)" @click="$eventbus.$emit('openPopup', 'PopupContentAuto')">Объем автомобиля</a>
      и время его работы + Количество и время занятости

      <a href="javascript:void(0)" @click="$eventbus.$emit('openPopup', 'PopupContentSpecialists')">грузчиков</a>
      + Количество

      <a href="javascript:void(0)" @click="$eventbus.$emit('openPopup', 'PopupContentPackage')">упаковочных
        материалов</a>
    </div>

    <div class="price__header">
      <div class="price__header-block subtitle dark-gray">
        <svg-icon name="icon_1" original />
        <a href="javascript:void(0)" @click="$eventbus.$emit('openPopup', 'PopupContentAuto')">Объем автомобиля</a>
        &nbsp;и время его работы
      </div>
      <div class="price__header-block subtitle dark-gray">
        <svg-icon name="icon_2" original />
        Количество и время занятости&nbsp;
        <a href="javascript:void(0)" @click="$eventbus.$emit('openPopup', 'PopupContentSpecialists')">грузчиков</a>
      </div>
      <div class="price__header-block subtitle dark-gray">
        <svg-icon name="icon_3" original />
        Количество&nbsp;
        <a href="javascript:void(0)" @click="$eventbus.$emit('openPopup', 'PopupContentPackage')">упаковочных
          материалов</a>
      </div>
    </div>

    <div class="row" v-if="!mobile && !tablet">
      <div class="col-lg-8">
        <div class="price__subtitle-wrapper">
          <div class="price__subtitle price__subtitle--tree" @click="$eventbus.$emit('openPopup', 'PopupContentAuto')">
            Аренда автомобиля
            <svg-icon name="link" original />
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="price__subtitle" @click="$eventbus.$emit('openPopup', 'PopupContentSpecialists')">
          Услуги специалистов
          <svg-icon name="link" original />
        </div>
      </div>
    </div>
    <div class="row" v-if="(mobile || tablet)">
      <div v-for="category in categories" :key="category.name" class="col-12">
        <div class="category-mini" @click="handleOpenFullSize(category)">
          <svg-icon :name="category.iconName" class="category-mini__icon" original />
          <div class="category-mini__info">
            <h3 class="category-mini__title">{{ category.name }}</h3>
            <p class="category-mini__subtitle dark-gray">{{ category.subtitle }}</p>
          </div>
          <svg-icon class="category-mini__arrow" name="arrow_m" original />
        </div>
      </div>
    </div>
    <div class="row align-items-stretch">
      <div v-for="category in categories" :key="category.name" class="col-lg-4">
        <transition name="component-fade">
          <div class="price__category category" v-if="(!mobile && !tablet) || category.opened">
            <div class="mobile-wrapper">
              <div class="category__header-wrapper">
                <h3 class="category__title">{{ category.name }}</h3>
                <div class="category__tooltip category__tooltip--small-screens">
                  <svg-icon name="info" />
                  <div class="category__info">{{ category.undertext }}</div>
                </div>
              </div>

              <p class="category__subtitle">{{ category.subtitle }}</p>

              <svg-icon :name="category.iconName" class="category__icon" original />

              <div class="category__close" v-if="mobile || tablet" @click="handleCloseFullSize(category)"></div>

              <div class="category__price-wrapper" v-for="item in category.items" :key="item.id">
                <div class="category__additional" v-if="item.additional">{{ item.additional }}</div>

                <div class="category__price">
                  <div class="category__tooltip-wrapper">
                    <span class="category__price-value">{{ item.time }}&nbsp;</span>
                    <span class="category__price-value category__price-value--highlighted">{{ item.price }}</span>

                    <div class="category__tooltip" v-if="item.info">
                      <svg-icon name="info" />
                      <div class="category__info">{{ item.info }}</div>
                    </div>
                  </div>

                  <p class="category__description">{{ item.description }}</p>
                </div>
              </div>
              <p class="category__undertext">{{ category.undertext }}</p>
              <div class="row justify-content-center">
                <div v-if="mobile" @click="openForm(category)" class="price__examples price__examples--mobile">Заказать
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="price__examples" @click="$eventbus.$emit('openPopup', 'PopupContentFlatMove')">Мне нужны примеры
        <svg-icon name="arrow-next" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppPageMainSectionPrice',
  props: {
    active: Boolean,
    mobile: Boolean,
    tablet: Boolean,
  },
  data: () => ({
    categories: [
      {
        name: 'ПЕРЕВОЗКИ',
        subtitle: 'Мебель, бытовая техника, сейфы и тд.',
        undertext: 'В стоимость включены: прокладочные материалы, стяжные стропы.',
        iconName: 'price_transport',
        opened: false,
        items: [
          {
            id: 1,
            time: '1 час -',
            price: '275 грн',
            description: 'Если у вас всего 1 предмет',
            info: 'Время минимального заказа в черте Одессы - 2 часа, для Савиньона и поселка Котовского - 3 часа',
          }, {
            id: 2,
            time: '1 час -',
            price: '300 грн',
            description: 'Межгород - 37 грн/км',
          },
        ],
      }, {
        name: 'ПЕРЕЕЗДЫ',
        subtitle: 'Квартирный, офисный переезды, переезд коммерческих помещений',
        undertext: 'В стоимость включены: прокладочные материалы, стяжные стропы.',
        iconName: 'price_moving',
        opened: false,
        items: [
          {
            id: 1,
            time: '1 час -',
            price: '300 грн',
            description: 'Межгород - 37 грн/км',
            additional: '1-3т',
            info: 'Время минимального заказа в черте Одессы - 2 часа, для Савиньона и поселка Котовского - 3 часа',
          }, {
            id: 2,
            time: '1 час -',
            price: '500 грн',
            description: 'Межгород - 50 грн/км',
            additional: 'до 5т',
          },
        ],
      }, {
        name: 'ГРУЗЧИКИ',
        subtitle: 'Для транспортировки личных вещей, мебели, и т.д.',
        undertext: 'В стоимость включены: упаковка и маркировка имущества, разборка и сборка мебели, полный цикл ручной транспортировки.',
        iconName: 'price_workers',
        opened: false,
        items: [
          {
            id: 1,
            time: '1 час -',
            price: '180 грн',
            description: 'За одного грузчика',
            info: 'Оплата транспортивки предмотов, весом свыше 100кг расчитываеться индивидуально',
          }, {
            id: 2,
            time: '>2 часов -',
            price: '90 грн/полчаса',
          },
        ],
      },
    ],
  }),
  methods: {
    handleCloseFullSize(e) {
      e.opened = false;
      document.body.classList.remove('modal-open');
    },

    handleOpenFullSize(e) {
      e.opened = true;
      document.body.classList.add('modal-open');
    },

    openForm(e) {
      this.handleOpenFullSize(e);
      e.opened = false;
      this.$eventbus.$emit('openFormModal');
    },
  },
};
</script>

<style lang="scss">
.price {
  padding-top: 40px;

  h2 {
    margin-bottom: 16px;
  }

  .subtitle {
    margin-bottom: 16px;
  }

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    &--mobile {
      display: none;
    }

    svg {
      height: 18px;
      margin-right: 6px;
    }

    .price__header-block+.price__header-block {
      margin-left: 24px;
      position: relative;

      &::before {
        content: '+';
        position: absolute;
        left: -12px;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  &__header-block {
    margin-bottom: 0;
    font-size: rem(13);
    background-color: $colors-grey-200;
    height: 36px;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }

  &__subtitle-wrapper {
    display: flex;
    justify-content: center;
  }

  &__subtitle {
    color: $colors-text--secondary;
    font-family: $font-family--secondary;
    font-size: rem(18);
    font-weight: bold;
    letter-spacing: 0.4px;
    text-align: center;
    margin-bottom: 18px;
    position: relative;
    cursor: pointer;

    &--tree {
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        right: calc(100% + 20px);
        @include size(84px, 20px);
        border-top: 2px solid #e8e8e8;
        border-left: 2px solid #e8e8e8;
      }

      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: calc(100% + 20px);
        @include size(84px, 20px);
        border-top: 2px solid #e8e8e8;
        border-right: 2px solid #e8e8e8;
      }
    }

    svg {
      @include size(12px);
      margin-left: 2px;
    }
  }

  &__examples {
    margin-top: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 13px 20px;
    background-color: $colors-accent;
    color: $white;
    font-size: rem(14);
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.3px;
    transition: .3s ease-in-out;
    cursor: pointer;

    &--mobile {
      padding: 12px 38px;
      margin-top: 52px;
    }

    svg {
      @include size(18px);
      margin-left: 14px;
      transition: .3s ease-in-out;
      fill: #fff;
    }

    &:hover {
      color: $white;
      filter: brightness(1.1);

      svg {
        transform: translateX(6px);
      }
    }
  }
}

.category {
  background-color: $colors-grey-100;
  padding: 10px 20px 20px 20px;
  position: relative;
  height: 100%;

  &__subtitle {
    letter-spacing: .3px;
    max-width: 280px;
    margin-bottom: 12px;
  }

  &__icon {
    @include size(40px);
    position: absolute;
    right: 20px;
    top: 20px;
  }

  &__price-wrapper {
    display: flex;
    align-items: center;

    &:not(:last-of-type) {
      margin-bottom: 14px;
    }
  }

  &__additional {
    @include size(72px, 37px);
    margin-right: 12px;
    background-color: $white;
    clip-path: polygon(79% 0, 100% 50%, 80% 100%, 0 100%, 0 0);
    padding-left: 9px;
    line-height: 37px;
    font-family: $font-family--secondary;
    font-size: rem(18);
    font-weight: 800;
    letter-spacing: 0.4px;
    color: $colors-accent;
  }

  &__price-value {
    font-family: $font-family--secondary;
    font-size: rem(19);
    font-weight: bold;
    letter-spacing: 0.4px;

    &--highlighted {
      color: $colors-accent;
    }
  }

  &__undertext {
    margin-top: 20px;
    color: $colors-text--secondary;
  }

  &__header-wrapper {
    display: flex;
    align-items: center;

    .category__tooltip {
      margin-top: -3px;
    }
  }

  &__tooltip-wrapper {
    display: flex;
    align-items: center;
  }

  &__tooltip {
    position: relative;
    margin-left: 8px;
    cursor: pointer;
    display: inline;

    &--small-screens {
      display: none;
    }

    svg {
      @include size(16px);
      fill: #d0d0d0;
      transition: .3s ease-in-out;
    }

    &:hover {
      svg {
        fill: $colors-accent;
      }

      .category__info {
        display: block;
      }
    }
  }

  &__info {
    position: absolute;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    background-color: $colors-text--primary;
    color: $white;
    border-radius: 4px;
    width: 184px;
    padding: 10px 14px;
    font-size: rem(12);
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translate(-50%);
    display: none;

    &::before {
      content: '';
      position: absolute;
      bottom: -5px;
      @include size(10px);
      background-color: $colors-text--primary;
      left: 50%;
      transform: translateX(-50%) rotateZ(45deg);
    }
  }
}

.category-mini {
  height: 100px;
  background-color: #f6f6f6;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding: 0 16px;

  &:hover {
    .category-mini__icon {
      transform: scale(1.2)
    }
  }

  &__icon {
    @include size(40px);
    margin-right: 16px;
    flex-shrink: 0;
    transition: .3s ease-in-out;
  }

  &__arrow {
    @include size(14px);
    margin-left: auto;
    flex-shrink: 0;
  }
}

@media screen and (min-width: 993px) and (max-height: 890px) {
  .price {
    padding-top: 0;

    &__subtitle {
      font-size: rem(16);
    }

    &__examples {
      height: 38px;
    }
  }

  .category {
    &__price-value {
      font-size: rem(17);
    }

    &__price-wrapper {
      margin-bottom: 0 !important;

      &+& {
        margin-top: 14px;
      }
    }

    &__icon {
      @include size(35px);
      top: 16px;
      right: 16px;
    }

    &__subtitle {
      max-width: calc(100% - 20px);
    }

    &__undertext {
      display: none;
    }

    &__tooltip {
      &--small-screens {
        display: block;

        svg {
          fill: $colors-accent;
          animation: pulse .6s 2s 3;
        }

        &:hover {
          svg {
            animation: none;
          }
        }

        .category__info {
          width: 250px;
        }
      }
    }
  }
}

@media screen and (min-width: 993px) and (max-height: 770px) {
  .price {
    padding-top: 10px;

    &__header {
      margin-bottom: 0;

      svg {
        height: 14px;
      }
    }

    &__header-block {
      height: 30px;
      font-size: rem(11);
    }

    &__examples {
      margin-top: 25px;
    }
  }
}

@media screen and (min-width: 993px) and (max-height: 730px) {
  .price {
    padding-top: 10px;

    &__header {
      margin-bottom: 0;
    }
  }
}

@media screen and (max-width: 992px) {
  .price {
    &__header {
      display: none;

      &--mobile {
        display: block;
      }
    }
  }

  .category {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100000;
    padding: 0 16px 0 16px;

    h3 {
      font-size: rem(22);
      font-weight: 800;
      letter-spacing: 0.4px;
      margin-bottom: 4px;
    }

    &__subtitle {
      color: $colors-text--primary;
      max-width: 250px;
    }

    &__undertext {
      margin-top: 20px;
      padding: 0;
    }

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

    &__icon {
      @include size(50px);
      top: 105px;
      right: 10px;
    }
  }
}

@media screen and (max-width: 767px) {
  .category {
    padding: 0 16px 0 16px;

    &__close {
      top: 16px;
      right: 0;
    }

    &__icon {
      @include size(50px);
      top: 60px;
      right: 0px;
    }
  }
}
</style>

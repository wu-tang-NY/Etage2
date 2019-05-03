<template>
  <div class="price">
    <h2>Как формируется стоимость?</h2>

    <div class="subtitle dark-gray">
      <a href="javascript:void(0)">Объем автомобиля</a>
      и время его работы + Количество и время занятости

      <a href="javascript:void(0)">грузчиков</a>
        + Количество

      <a href="javascript:void(0)">упаковочных материалов</a>
    </div>

    <div class="row">
      <div class="col-xl-8">
        <div class="price__subtitle-wrapper">
          <div class="price__subtitle price__subtitle--tree">
            Аренда автомобиля
            <svg-icon name="link" original />
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="price__subtitle">
          Услуги специалистов
          <svg-icon name="link" original />
        </div>
      </div>
    </div>

    <div class="row">
      <div v-for="category in categories" :key="category.name" class="col-xl-4">
        <div class="price__category category">
          <h3 class="category__title">{{ category.name }}</h3>

          <p class="category__subtitle">{{ category.subtitle }}</p>

          <svg-icon :name="category.iconName" class="category__icon" original />

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
        </div>

        <p class="category__undertext">{{category.undertext}}</p>
      </div>
    </div>

    <div class="row justify-content-center">
      <a href="#" class="price__examples">Мне нужны примеры</a>
    </div>

    <portal to="car-cloud" v-if="active">
      <car-cloud
        title="При необходимости - выезжает оценщик!"
        icon="cloud_small"
        icon-width="315"
      />
    </portal>
  </div>
</template>

<script>
import CarCloud from '../../components/PageMainCarCloud';

export default {
  name: 'AppPageMainSectionPrice',
  components: {
    CarCloud,
  },
  props: {
    active: Boolean,
  },
  data: () => ({
    categories: [
      {
        name: 'ПЕРЕВОЗКИ',
        subtitle: 'Мебель, бытовая техника, стройматериалы, сейфы и тд.',
        undertext: 'В стоимость включены: прокладочные материалы, стяжные стропы.',
        iconName: 'price_transport',
        items: [
          {
            id: 1,
            time: '1 час -',
            price: '160 грн',
            description: 'Если у вас всего 1 предмет',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          }, {
            id: 2,
            time: '1 час -',
            price: '160 грн',
            description: 'Межгород - 20 грн/км',
          },
        ],
      }, {
        name: 'ПЕРЕЕЗДЫ',
        subtitle: 'Квартирный, офисный переезды, переезд коммерческих помещений',
        undertext: 'В стоимость включены: прокладочные материалы, стяжные стропы.',
        iconName: 'price_moving',
        items: [
          {
            id: 1,
            time: '1 час -',
            price: '200 грн',
            description: 'Межгород - 20 грн/км',
            additional: '1-3т',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          }, {
            id: 2,
            time: '1 час -',
            price: '300 грн',
            description: 'Межгород - 25 грн/км',
            additional: 'до 5т',
          },
        ],
      }, {
        name: 'ГРУЗЧИКИ',
        subtitle: 'Для транспортировки личных вещей, стройматериалов, и т.д.',
        undertext: 'В стоимость включены: упаковка и маркировка имущества, разборка и сборка мебели, полный цикл ручной транспортировки.',
        iconName: 'price_workers',
        items: [
          {
            id: 1,
            time: '1 час -',
            price: '100 грн',
            description: 'Если у вас всего 1 предмет',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          }, {
            id: 2,
            time: '>2 часов -',
            price: '50 грн/полчаса',
            description: 'Межгород - 20 грн/км',
          },
        ],
      },
    ],
  }),
};
</script>

<style lang="scss">
.price {
  padding-top: 30px;

  h2 {
    margin-bottom: 16px;
  }

  .subtitle {
    margin-bottom: 16px;
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
    line-height: 1;
    letter-spacing: 0.3px;
    transition: .3s ease-in-out;

    svg {
      @include size(18px);
      margin-left: 14px;
      transition: .3s ease-in-out;
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
    padding: 0 10px;
    margin-top: 10px;
    color: $colors-text--secondary;
  }

  &__tooltip-wrapper {
    display: flex;
    align-items: center;
  }

  &__tooltip {
    position: relative;
    margin-left: 8px;
    cursor: pointer;

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
</style>

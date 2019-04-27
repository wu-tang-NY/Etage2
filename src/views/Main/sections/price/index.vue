<template>
  <section-container>
    <section class="price">
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
            <div class="price__subtitle">
              Аренда автомобиля
            </div>
          </div>
        </div>

        <div class="col-xl-4">
          <div class="price__subtitle">
            Услуги специалистов
          </div>
        </div>
      </div>

      <div class="row">
        <div v-for="category in categories" :key="category.name" class="col-xl-4">
          <div class="price__category category">
            <h3 class="category__title">{{ category.name }}</h3>

            <p class="category__subtitle">{{ category.subtitle }}</p>

            <div class="category__price-wrapper" v-for="item in category.items" :key="item.id">
              <div class="category__price">
                <span class="category__price-value">{{ item.time }}</span>
                <span class="category__price-value category__price-value--highlighted">{{ item.price }}</span>
              </div>

              <p class="category__description">{{item.description}}</p>
            </div>
          </div>

          <p class="category__undertext">{{category.undertext}}</p>
        </div>
      </div>

      <div class="row justify-content-center">
        <a href="#" class="price__examples">Мне нужны примеры</a>
      </div>
    </section>
  </section-container>
</template>

<script>
import SectionContainer from '../../components/PageMainSectionContainer';

export default {
  name: 'AppPageMainSectionPrice',
  components: {
    SectionContainer,
  },
  data() {
    return {
      categories: [
        {
          name: 'ПЕРЕВОЗКИ',
          subtitle: 'Мебель, бытовая техника, стройматериалы, сейфы и тд.',
          undertext: 'В стоимость включены: прокладочные материалы, стяжные стропы.',
          items: [
            {
              id: 1,
              time: '1 час -',
              price: '160 грн',
              description: 'Если у вас всего 1 предмет',
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
          items: [
            {
              id: 1,
              time: '1 час -',
              price: '200 грн',
              description: 'Межгород - 20 грн/км',
            }, {
              id: 2,
              time: '1 час -',
              price: '300 грн',
              description: 'Межгород - 25 грн/км',
            },
          ],
        }, {
          name: 'ГРУЗЧИКИ',
          subtitle: 'Для транспортировки личных вещей, стройматериалов, и т.д.',
          undertext: 'В стоимость включены: упаковка и маркировка имущества, разборка и сборка мебели, полный цикл ручной транспортировки.',
          items: [
            {
              id: 1,
              time: '1 час -',
              price: '100 грн',
              description: 'Если у вас всего 1 предмет',
            }, {
              id: 2,
              time: '>2 часов -',
              price: '50 грн/полчаса',
              description: 'Межгород - 20 грн/км',
            },
          ],
        },
      ],
    };
  },
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

    &:hover {
      color: $white;
    }
  }
}

.category {
  background-color: $colors-grey-100;
  padding: 10px 20px 20px 20px;

  &__subtitle {
    letter-spacing: .3px;
    max-width: 280px;
    margin-bottom: 12px;
  }

  &__price-wrapper:not(:last-of-type) {
    margin-bottom: 14px;
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
}
</style>

<template>
  <section-container>
    <section class="reviews">
      <h2>Почему нам доверяют?</h2>

      <div class="subheading dark-gray">В первый раз - потому что с нами легко и надежно, во все последующие - по опыту и дружбе.</div>

      <div class="reviews__list">
        <div v-for="item in items" :key="item.feature" class="reviews__block">
          <div class="reviews__title" v-html="item.feature"></div>
        </div>
      </div>

      <swiper :options="options">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>

        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <div class="row justify-content-center">
        <div class="reviews__next">Отзывы о нашей работе</div>
      </div>
    </section>
  </section-container>
</template>

<script>
import SectionContainer from '../../components/PageMainSectionContainer';

export default {
  name: 'AppPageMainSectionReviews',
  components: {
    SectionContainer,
  },
  data: () => ({
    items: [
      {
        feature: 'Индивидуальный <br> подход',
      },
      {
        feature: 'Команда <br> специалистов',
      },
      {
        feature: 'Профессиональные упаковочные материалы',
      },
      {
        feature: 'Современный грузовой автопарк',
      },
      {
        feature: 'Прозрачность ценообразования',
      },
    ],

    options: {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        slidesPerView: 3,
      },
    },
  }),
};
</script>

<style lang="scss">
.reviews {
  padding-top: 30px;

  h2 {
    margin-bottom: 16px;
  }

  .subheading {
    margin-bottom: 50px;
  }

  &__list {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__block {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    text-align: center;
    font-family: $font-family--secondary;
    font-size: rem(16);
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  &__next {
    background-color: $colors-accent;
    color: $white;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    padding: 0 30px;
    margin-top: 10px;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%);
    letter-spacing: 0.3px;
    font-weight: bold;
  }
}
</style>

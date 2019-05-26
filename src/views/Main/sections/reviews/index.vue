<template>
  <section class="reviews">
    <h2>Почему нам доверяют?</h2>

    <div class="subtitle dark-gray">В первый раз - потому что с нами легко и надежно, во все последующие - по опыту и дружбе.</div>

    <div class="reviews__list">
      <div v-for="item in items" :key="item.feature" class="reviews__block" @click="openPopup(item.component)">
        <svg-icon :name="item.svg" original class="reviews__icon" />

        <div class="reviews__title" v-html="item.feature"></div>

        <svg-icon name="chevron_feature" original class="reviews__chevron" />
      </div>
    </div>

    <div class="reviews__swiper">
      <swiper :options="options" ref="swiper">
        <swiper-slide v-for="(slide, index) in slides" :key="index" class="reviews__slide" @click.native="$eventbus.$emit('openPopup', 'PopupContentFeedback')">
          <div class="reviews__slide-title">{{ slide.title }}</div>

          <p class="reviews__slide-desc dark-gray">{{ slide.desc }}</p>
        </swiper-slide>
      </swiper>

      <div class="swiper-button-prev reviews__swiper-button swiper-button-white" slot="button-prev"></div>
      <svg-icon name="divider" original v-if="mobile || tablet" class="reviews__swiper-divider"></svg-icon>
      <div class="swiper-button-next reviews__swiper-button swiper-button-white" slot="button-next"></div>
    </div>

    <div class="reviews__btnholder">
      <div
        @click="$eventbus.$emit('openPopup', 'PopupContentFeedback')"
        class="reviews__next"
      >Отзывы о нашей работе
        <svg-icon name="arrow-next" original/>
      </div>
      <div class="reviews__next reviews__next--feedback" @click.prevent="modalFeedbackOpen = true">Оставьте отзыв</div>
    </div>
    <feedback-modal v-model="modalFeedbackOpen" />
  </section>
</template>

<script>
import FeedbackModal from '@/components/common/Feedback/app-feedback-modal';

export default {
  name: 'AppPageMainSectionReviews',
  components: {
    FeedbackModal,
  },
  props: {
    active: Boolean,
    mobile: Boolean,
    tablet: Boolean,
  },
  data: () => ({
    modalFeedbackOpen: false,
    items: [
      {
        feature: 'Индивидуальный <br> подход',
        svg: 'individual_feature',
        component: 'PopupContentAboutUs',
      },
      {
        feature: 'Команда <br> специалистов',
        svg: 'team_feature',
        component: 'PopupContentSpecialists',
      },
      {
        feature: 'Профессиональные <br> упаковочные материалы',
        svg: 'pack_feature',
        component: 'PopupContentPackage',
      },
      {
        feature: 'Современный <br> грузовой автопарк',
        svg: 'auto_feature',
        component: 'PopupContentAuto',
      },
      {
        feature: 'Прозрачность <br> ценообразования',
        svg: 'price_feature',
        component: 'PopupContentPayment',
      },
    ],

    slides: [
      {
        title: 'Илья, Одесса',
        desc: 'Мы с женой уже второй раз обратились к ребятам. Первый был случайно, увидели объявление и решили не заморачиваться, если бы сломали наш старый диван, мы бы не расстроились)) Но не сломали. Сейчас переезжали в новый дом, тоже все круто. Спасибо!',
      },
      {
        title: 'Алена Александровна, Одесса',
        desc: 'Добрый день! Передаю большую благодарность грузчику Александру за его внимательность и заботу о кровати. Разобрал, все упаковал, подписал. Потом собрал все на новом месте, ни тебе царапинки, ни пылинки. Буду к вам обращаться еще!!',
      },
      {
        title: 'Евгения, Николаев',
        desc: 'Сначала отнеслась с настороженностью, боялась что грузчики будут нетрезвые, или машина грязная. Всякое раньше  бывало… Тем более, переезжать пришлось не на соседнюю улицу. Зря переживала. В один момент пришлось даже идти пить кофе, потому что не знала, куда себя деть, пока ребята трудились :) Как-то все у них легко так получалось, спасибо!',
      },
      {
        title: 'Андрей, Киев',
        desc: 'Я не доверяю почтам, только частным транспортникам. Пришлось передавать ребятами в Киев важный предмет….Все люкс',
      },
      {
        title: 'Пётр, пгт Авангард, Одесская обл.',
        desc: 'Быстро справились, молодцы',
      },
      {
        title: 'Марія, Одесса',
        desc: 'Перевозили увесь офіс з підсопками. Все супер!! Але я б радила ще зробити аплікацію, щоб відстежувати машину, як у таксі. Дякую!! (Іван та Саша були грузчики - ніяких нарікань)',
      },
    ],

    options: {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 'auto',
      centeredSlides: true,
      loop: true,
      spaceBetween: 70,
      breakpoints: {
        576: {
          spaceBetween: 0,
          centeredSlides: false,
          slidesPerView: 1,
        },
      },
    },
  }),
  methods: {
    openPopup(e) {
      this.$eventbus.$emit('openPopup', e);
    },
    reinitSwiper() {
      this.$refs.swiper.swiper.update();
    },
  },
};
</script>

<style lang="scss">
.reviews {
  padding-top: 40px;

  h2 {
    margin-bottom: 16px;
  }

  .subtitle {
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
    cursor: pointer;
  }

  &__title {
    text-align: center;
    font-family: $font-family--secondary;
    font-size: rem(16);
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  &__icon {
    @include size(39px);
    margin-bottom: 10px;
  }

  &__chevron {
    height: 12px;
    margin-top: 12px;
  }

  &__swiper {
    margin-top: 70px;
    margin-bottom: 40px;
    position: relative;

    &::before {
      content: '';
      z-index: 10;
      display: block;
      position: absolute;
      left: -2px;
      top: 0;
      width: 200px;
      height: 100%;
      background-image: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0));
    }

    &::after {
      content: '';
      z-index: 10;
      display: block;
      position: absolute;
      right: -2px;
      top: 0;
      width: 200px;
      height: 100%;
      background-image: linear-gradient(to left, #ffffff 10%, rgba(255, 255, 255, 0));
    }
  }

  &__swiper-divider {
    position: absolute;
    bottom: -48px;
    height: 28px;
    left: 50%;
    width: 35%;
    transform: translateX(-50%);
  }

  &__swiper-button {
    @include size(28px);
    background-color: $colors-accent;
    background-size: 8px 14px;
    background-position: center;
    border-radius: 50%;
    transform: translateY(-50%);
    margin-top: 0;

    &.swiper-button-next {
      right: -30px;
    }

    &.swiper-button-prev {
      left: -30px;
    }

    &:hover, &:focus, &:active {
      outline: none;
    }
  }

  &__slide {
    text-align: center;
    width: 400px;
    cursor: pointer;
  }

  &__slide-desc {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-height: 16px;
      max-height: 48px;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

  &__slide-title {
    color: $colors-accent;
    font-size: rem(16);
    line-height: 1;
    letter-spacing: .3px;
    font-weight: bold;
    margin-bottom: 7px;
  }

  &__btnholder {
    display: flex;
    justify-content: center;
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
    cursor: pointer;
    transition: .3s ease-in-out;

    &--feedback {
      background-color: $colors-grey-200;
      color: $colors-text--primary;

      &:hover {
        color: $white;
        background-color: $colors-text--primary;
      }
    }

    & + & {
      margin-left: 10px;
    }

    svg {
      @include size(18px);
      margin-left: 14px;
      transition: .3s ease-in-out;
    }

    &:hover {
      filter: brightness(1.1);

      svg {
        transform: translateX(6px);
      }
    }
  }
}

@media screen and (min-width: 993px) and (max-height: 920px) {
  .reviews {
    padding-top: 0;

    .subtitle {
      margin-bottom: 30px;
    }

    &__icon {
      @include size(36px);
    }

    &__title {
      font-size: rem(14);
    }

    &__chevron {
      display: none;
    }

    &__swiper {
      margin-top: 60px;
      margin-bottom: 30px;
    }

    &__swiper-button {
      @include size(24px);
      background-size: 7px 12px;

      &.swiper-button-next {
        right: -26px;
      }

      &.swiper-button-prev {
        left: -26px;
      }
    }

    &__next {
      height: 38px;
    }
  }
}

@media screen and (min-width: 993px) and (max-height: 760px) {
  .reviews {
    padding-top: 40px;
  }
}

@media screen and (max-width: 993px) {
  .reviews {
    padding-top: 50px;

    h2 {
      margin-bottom: 10px;
    }

    .subtitle {
      margin-bottom: 20px;
    }

    &__list {
      flex-wrap: wrap;
    }

    &__block {
      width: calc(50% - 8px);
      margin-right: 16px;
      margin-bottom: 16px;
      height: 120px;
      background-color: #f6f6f6;
      padding: 14px 9px 16px 9px;
      justify-content: center;
      margin-right: 0;

      &:nth-child(2) {
        order: -1;
        width: 100%;
      }
    }

    &__icon {
      @include size (39px);
      margin-bottom: 12px;
      flex-shrink: 0;
    }

    &__title {
      font-size: rem(12);
      font-weight: 500;
      letter-spacing: 0.2px;
      color: $colors-text--primary;
    }

    &__chevron {
      display: none;
    }

    &__swiper {
      margin-top: 50px;
      margin-bottom: 88px;

      &::before,
      &::after {
        display: none;
      }
    }

    &__slide {
      width: 100%;
    }

    &__swiper-button {
      top: auto;
      bottom: -48px;
      transform: translateY(0);

      &.swiper-button-next {
        right: 20%;
      }

      &.swiper-button-prev {
        left: 20%;
      }
    }

    &__btnholder {
      flex-direction: column;
      align-items: center;
    }

    &__next {
      margin-top: 0;
      clip-path: none;

      & + & {
        margin-left: 0;
        margin-top: 16px;
      }
    }
  }
}
</style>

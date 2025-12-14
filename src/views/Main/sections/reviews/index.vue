<template>
  <ClientOnly>
    <section class="reviews">
      <div class="reviews__btnholder">
        <h2>{{ $t("reviews.title") }}</h2>
        <div
          id="feedback-btn"
          class="reviews__next reviews__next"
          @click.prevent="modalFeedbackOpen = true"
          v-if="!mobile && !tablet"
        >
          {{ $t("reviews.leaveReview") }}
        </div>
      </div>

      <div class="reviews__list">
        <div
          v-for="item in items"
          :key="item.feature"
          class="reviews__block"
          @click="openPopup(item.component)"
        >
          <svg-icon :name="item.svg" original class="reviews__icon" />

          <div class="reviews__title" v-html="item.feature"></div>

          <svg-icon name="chevron_feature" original class="reviews__chevron" />
        </div>
      </div>

      <div class="reviews__swiper">
        <div class="reviews__carousel" ref="carousel">
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="reviews__slide"
            @click="$eventbus.$emit('openPopup', 'PopupContentFeedback')"
          >
            <div class="reviews__slide-title">{{ slide.title }}</div>

            <p class="reviews__slide-desc dark-gray" v-line-clamp="3">
              {{ slide.desc }}
            </p>
          </div>
        </div>

        <button
          class="reviews__swiper-button reviews__swiper-button--prev"
          @click="scrollCarousel('prev')"
          :disabled="!canScrollPrev"
          aria-label="Previous review"
        ></button>
        <svg-icon
          name="divider"
          original
          v-if="mobile || tablet"
          class="reviews__swiper-divider"
        ></svg-icon>
        <button
          class="reviews__swiper-button reviews__swiper-button--next"
          @click="scrollCarousel('next')"
          :disabled="!canScrollNext"
          aria-label="Next review"
        ></button>
      </div>

      <div class="reviews__btnholder">
        <div
          id="feedback-btn-mobile"
          class="reviews__next reviews__next"
          @click.prevent="modalFeedbackOpen = true"
          v-if="mobile || tablet"
        >
          {{ $t("reviews.leaveReview") }}
        </div>
      </div>
      <feedback-modal v-model="modalFeedbackOpen" />
    </section>
  </ClientOnly>
</template>

<script>
import { defineAsyncComponent } from "vue";

// Lazy load FeedbackModal - only loads when reviews section is active or modal is opened
export default {
  name: "AppPageMainSectionReviews",
  components: {
    FeedbackModal: defineAsyncComponent(() =>
      import("@/components/common/Feedback/app-feedback-modal")
    ),
  },
  props: {
    active: Boolean,
    mobile: Boolean,
    tablet: Boolean,
    desktop: Boolean,
  },
  watch: {
    mobile: "updateScrollButtons",
    tablet: "updateScrollButtons",
    desktop: "updateScrollButtons",
  },
  data: () => ({
    modalFeedbackOpen: false,
    currentIndex: 0,
  }),
  computed: {
    items() {
      return [
        {
          feature: this.$t("reviews.individualApproach"),
          svg: "individual_feature",
          component: "PopupContentAboutUs",
        },
        {
          feature: this.$t("reviews.teamSpecialists"),
          svg: "team_feature",
          component: "PopupContentSpecialists",
        },
        {
          feature: this.$t("reviews.professionalMaterials"),
          svg: "pack_feature",
          component: "PopupContentPackage",
        },
        {
          feature: this.$t("reviews.modernFleet"),
          svg: "auto_feature",
          component: "PopupContentAuto",
        },
        {
          feature: this.$t("reviews.transparentPricing"),
          svg: "price_feature",
          component: "PopupContentPayment",
        },
      ];
    },
    slides() {
      return [
        {
          title: this.$t("reviews.slides.slide1.title"),
          desc: this.$t("reviews.slides.slide1.desc"),
        },
        {
          title: this.$t("reviews.slides.slide2.title"),
          desc: this.$t("reviews.slides.slide2.desc"),
        },
        {
          title: this.$t("reviews.slides.slide3.title"),
          desc: this.$t("reviews.slides.slide3.desc"),
        },
        {
          title: this.$t("reviews.slides.slide4.title"),
          desc: this.$t("reviews.slides.slide4.desc"),
        },
        {
          title: this.$t("reviews.slides.slide5.title"),
          desc: this.$t("reviews.slides.slide5.desc"),
        },
        {
          title: this.$t("reviews.slides.slide6.title"),
          desc: this.$t("reviews.slides.slide6.desc"),
        },
      ];
    },
    canScrollPrev() {
      return this.currentIndex > 0;
    },
    canScrollNext() {
      if (this.mobile || this.tablet) {
        return this.currentIndex < this.slides.length - 1;
      }
      return this.currentIndex < this.slides.length - 3;
    },
  },
  mounted() {
    this.updateScrollButtons();
  },
  methods: {
    openPopup(e) {
      this.$eventbus.$emit("openPopup", e);
    },
    scrollCarousel(direction) {
      if (!this.$refs.carousel) return;

      const slideWidth = this.mobile || this.tablet ? 100 : 33.333;
      const container = this.$refs.carousel;
      const scrollAmount = (container.offsetWidth / 100) * slideWidth;

      if (direction === "next") {
        this.currentIndex = Math.min(
          this.currentIndex + 1,
          this.mobile || this.tablet
            ? this.slides.length - 1
            : this.slides.length - 3
        );
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      } else {
        this.currentIndex = Math.max(this.currentIndex - 1, 0);
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    },
    updateScrollButtons() {
      this.$nextTick(() => {
        if (this.$refs.carousel) {
          this.currentIndex = 0;
          this.$refs.carousel.scrollLeft = 0;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.reviews {
  padding-top: 40px;

  h2 {
    margin-bottom: 36px;
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
    font-family: var(--font-family-secondary);
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
      content: "";
      z-index: 10;
      display: block;
      position: absolute;
      left: -2px;
      top: 0;
      width: 200px;
      height: 100%;
      background-image: linear-gradient(
        to right,
        #ffffff 10%,
        rgba(255, 255, 255, 0)
      );
    }

    &::after {
      content: "";
      z-index: 10;
      display: block;
      position: absolute;
      right: -2px;
      top: 0;
      width: 200px;
      height: 100%;
      background-image: linear-gradient(
        to left,
        #ffffff 10%,
        rgba(255, 255, 255, 0)
      );
    }
  }

  &__carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    gap: 70px;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
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
    background-color: var(--colors-accent);
    background-size: 8px 14px;
    background-position: center;
    background-repeat: no-repeat;
    border: none;
    border-radius: 50%;
    transform: translateY(-50%);
    margin-top: 0;
    cursor: pointer;
    position: absolute;
    top: 50%;
    z-index: 20;
    transition: opacity 0.3s;

    &--next {
      right: -30px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 14'%3E%3Cpath fill='white' d='M1 0L0 1l6 6-6 6 1 1 7-7z'/%3E%3C/svg%3E");
    }

    &--prev {
      left: -30px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 14'%3E%3Cpath fill='white' d='M7 0l1 1-6 6 6 6-1 1-7-7z'/%3E%3C/svg%3E");
    }

    &:hover:not(:disabled),
    &:focus:not(:disabled),
    &:active:not(:disabled) {
      outline: none;
      filter: brightness(1.1);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__slide {
    text-align: center;
    width: 400px;
    min-width: 400px;
    cursor: pointer;
    scroll-snap-align: center;
  }

  &__slide-desc {
    line-height: 16px;
    word-break: normal !important;
  }

  &__slide-title {
    color: var(--colors-accent);
    font-size: rem(16);
    line-height: 1;
    letter-spacing: 0.3px;
    font-weight: bold;
    margin-bottom: 7px;
  }

  &__btnholder {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__next {
    background-color: var(--colors-accent);
    color: var(--white);
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%);
    letter-spacing: 0.3px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &--feedback {
      background-color: var(--colors-grey-200);
      color: var(--colors-text-primary);

      &:hover {
        color: var(--white);
        background-color: var(--colors-text-primary);
      }
    }

    & + & {
      margin-left: 10px;
    }

    svg {
      @include size(18px);
      margin-left: 14px;
      transition: 0.3s ease-in-out;
    }

    &:hover {
      filter: brightness(1.1);

      svg {
        transform: translateX(6px);
      }
    }
  }
}

@media screen and (min-width: 993px) and (max-height: 890px) {
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

      &--next {
        right: -26px;
      }

      &--prev {
        left: -26px;
      }
    }

    &__next {
      height: 38px;
    }
  }
}

@media screen and (min-width: 993px) and (max-height: 730px) {
  .reviews {
    padding-top: 10px;
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
      background-color: var(--colors-grey-100);
      padding: 14px 9px 16px 9px;
      justify-content: center;
      margin-right: 0;

      &:nth-child(2) {
        order: -1;
        width: 100%;
      }
    }

    &__icon {
      @include size(39px);
      margin-bottom: 12px;
      flex-shrink: 0;
    }

    &__title {
      font-size: rem(12);
      font-weight: 500;
      letter-spacing: 0.2px;
      color: var(--colors-text-primary);
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

    &__carousel {
      gap: 0;
    }

    &__slide {
      width: 100%;
      min-width: 100%;
    }

    &__swiper-button {
      top: auto;
      bottom: -48px;
      transform: translateY(0);

      &--next {
        right: 20%;
      }

      &--prev {
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

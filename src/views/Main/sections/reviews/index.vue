<template>
  <ClientOnly>
    <section class="pt-10 max-lg:pt-[50px]">
      <div
        class="flex justify-between items-start max-lg:flex-col max-lg:items-center"
      >
        <h2 class="mb-9 max-lg:mb-[10px]">{{ $t("reviews.title") }}</h2>
        <div
          id="feedback-btn"
          class="inline-flex items-center justify-center h-10 px-[30px] bg-[var(--colors-accent)] text-[var(--white)] font-bold cursor-pointer transition-all duration-300 ease-in-out tracking-[0.3px] [clip-path:polygon(0_0,calc(100%-10px)_0,100%_100%,10px_100%)] hover:brightness-110 max-lg:hidden"
          @click.prevent="modalFeedbackOpen = true"
          v-if="!mobile && !tablet"
        >
          {{ $t("reviews.leaveReview") }}
        </div>
      </div>

      <div class="flex items-start justify-between flex-wrap max-lg:flex-wrap">
        <div
          v-for="(item, index) in items"
          :key="item.feature"
          :class="[
            'flex flex-col items-center cursor-pointer w-1/5 max-lg:w-[calc(50%-8px)] max-lg:mb-4 max-lg:h-[120px] max-lg:bg-[var(--colors-grey-100)] max-lg:px-[9px] max-lg:py-[14px] max-lg:pb-4 max-lg:justify-center',
            index === 1 && 'max-lg:order-[-1] max-lg:w-full',
          ]"
          @click="openPopup(item.component)"
        >
          <svg-icon
            :name="item.svg"
            original
            class="w-[39px] h-[39px] mb-[10px] max-lg:mb-3 max-lg:flex-shrink-0"
          />

          <div
            class="text-center font-[var(--font-family-secondary)] text-base font-medium tracking-[0.3px] max-lg:text-xs max-lg:tracking-[0.2px] max-lg:text-[var(--colors-text-primary)]"
            v-html="item.feature"
          ></div>

          <svg-icon
            name="chevron_feature"
            original
            class="h-3 mt-3 max-lg:hidden"
          />
        </div>
      </div>

      <div class="mt-[70px] mb-10 relative max-lg:mt-[50px] max-lg:mb-[88px]">
        <div
          class="flex overflow-x-auto scroll-smooth gap-[70px] [scrollbar-width:none] max-lg:gap-0 snap-x snap-mandatory [scroll-behavior:smooth] [-webkit-overflow-scrolling:touch]"
          ref="carousel"
        >
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="text-center w-[400px] min-w-[400px] cursor-pointer snap-center max-lg:w-full max-lg:min-w-full"
            @click="navigateToInfo('reviews')"
          >
            <div
              class="text-primary text-base leading-none tracking-[0.3px] font-bold mb-[7px]"
            >
              {{ slide.title }}
            </div>

            <p class="dark-gray leading-4 break-normal" v-line-clamp="3">
              {{ slide.desc }}
            </p>
          </div>
        </div>

        <button
          class="w-7 h-7 bg-[var(--colors-accent)] bg-no-repeat bg-center rounded-full border-none cursor-pointer absolute top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 left-[-30px] bg-[length:8px_14px] hover:brightness-110 focus:brightness-110 active:brightness-110 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed max-lg:top-auto max-lg:bottom-[-48px] max-lg:translate-y-0 max-lg:left-[20%] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%208%2014%27%3E%3Cpath%20fill=%27white%27%20d=%27M7%200l1%201-6%206%206%206-1%201-7-7z%27/%3E%3C/svg%3E')]"
          @click="scrollCarousel('prev')"
          :disabled="!canScrollPrev"
          aria-label="Previous review"
        ></button>
        <svg-icon
          name="divider"
          original
          v-if="mobile || tablet"
          class="absolute bottom-[-48px] h-7 left-1/2 -translate-x-1/2 w-[35%]"
        ></svg-icon>
        <button
          class="w-7 h-7 bg-[var(--colors-accent)] bg-no-repeat bg-center rounded-full border-none cursor-pointer absolute top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 right-[-30px] bg-[length:8px_14px] hover:brightness-110 focus:brightness-110 active:brightness-110 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed max-lg:top-auto max-lg:bottom-[-48px] max-lg:translate-y-0 max-lg:right-[20%] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%208%2014%27%3E%3Cpath%20fill=%27white%27%20d=%27M1%200L0%201l6%206-6%206%201%201%207-7z%27/%3E%3C/svg%3E')]"
          @click="scrollCarousel('next')"
          :disabled="!canScrollNext"
          aria-label="Next review"
        ></button>
      </div>

      <div
        class="flex justify-between items-start max-lg:flex-col max-lg:items-center"
      >
        <div
          id="feedback-btn-mobile"
          class="inline-flex items-center justify-center h-10 px-[30px] bg-[var(--colors-accent)] text-[var(--white)] font-bold cursor-pointer transition-all duration-300 ease-in-out tracking-[0.3px] [clip-path:polygon(0_0,calc(100%-10px)_0,100%_100%,10px_100%)] hover:brightness-110 max-lg:clip-path-none max-lg:mt-0 hidden max-lg:flex"
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
    navigateToInfo(route) {
      const locale = this.$i18n?.locale || "ua";
      if (this.$router) {
        this.$router.push(`/${locale}/info/${route}`);
      }
    },
    openPopup(e) {
      // Keep for backward compatibility with items that still use component names
      const routeMap = {
        PopupContentAboutUs: "about_us",
        PopupContentSpecialists: "specialists",
        PopupContentPackage: "package",
        PopupContentAuto: "auto",
        PopupContentPayment: "payment",
        PopupContentFeedback: "reviews",
      };
      const route = routeMap[e] || "about_us";
      this.navigateToInfo(route);
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

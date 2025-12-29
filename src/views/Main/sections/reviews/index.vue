<template>
  <ClientOnly>
    <section>
      <div
        class="flex justify-between items-start flex-col items-center lg:flex-row mb-9 lg:mb-6"
      >
        <h2>{{ $t("reviews.title") }}</h2>
        <AppButton
          id="feedback-btn"
          variant="primary"
          size="lg"
          @click.prevent="modalFeedbackOpen = true"
          v-if="!mobile && !tablet"
        >
          {{ $t("reviews.leaveReview") }}
        </AppButton>
      </div>

      <div class="flex items-start justify-between flex-wrap lg:flex-nowrap">
        <div
          v-for="(item, index) in items"
          :key="item.feature"
          :class="[
            'w-1/2 lg:w-1/5 flex-0 lg:flex-1 p-1',
            index === 1 && 'order-[-1] lg:order-none w-full lg:w-auto',
          ]"
          @click="openPopup(item.component)"
        >
          <div
            class="flex flex-col items-center justify-center cursor-pointer h-40 lg:h-auto bg-gray-100 dark:bg-gray-800 lg:!bg-transparent"
          >
            <svg-icon
              :name="item.svg"
              original
              class="size-10 mb-4 lg:mb-3 flex-shrink-0"
            />

            <div
              class="text-center font-medium text-base lg:text-sm"
              v-html="item.feature"
            ></div>
          </div>
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
            <h3 class="text-primary leading-none font-bold mb-4">
              {{ slide.title }}
            </h3>

            <p
              class="text-gray-500 dark:text-gray-400 leading-5 text-base lg:text-sm break-normal"
              v-line-clamp="3"
            >
              {{ slide.desc }}
            </p>
          </div>
        </div>

        <AppButton
          variant="primary"
          size="icon"
          class="size-8 bg-primary bg-no-repeat bg-center absolute top-1/2 -translate-y-1/2 -left-16 bg-[length:8px_14px] max-lg:top-auto max-lg:bottom-[-48px] max-lg:translate-y-0 max-lg:left-[20%] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%208%2014%27%3E%3Cpath%20fill=%27white%27%20d=%27M7%200l1%201-6%206%206%206-1%201-7-7z%27/%3E%3C/svg%3E')]"
          @click="scrollCarousel('prev')"
          :disabled="!canScrollPrev"
          :aria-label="'Previous review'"
        ></AppButton>
        <AppButton
          variant="primary"
          size="icon"
          class="size-8 bg-primary bg-no-repeat bg-center absolute top-1/2 -translate-y-1/2 -right-16 bg-[length:8px_14px] max-lg:top-auto max-lg:bottom-[-48px] max-lg:translate-y-0 max-lg:right-[20%] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%208%2014%27%3E%3Cpath%20fill=%27white%27%20d=%27M1%200L0%201l6%206-6%206%201%201%207-7z%27/%3E%3C/svg%3E')]"
          @click="scrollCarousel('next')"
          :disabled="!canScrollNext"
          :aria-label="'Next review'"
        ></AppButton>
      </div>

      <div
        class="flex justify-between items-start max-lg:flex-col max-lg:items-center"
      >
        <AppButton
          id="feedback-btn-mobile"
          variant="primary"
          class="!px-6"
          @click.prevent="modalFeedbackOpen = true"
          v-if="mobile || tablet"
        >
          {{ $t("reviews.leaveReview") }}
        </AppButton>
      </div>

      <feedback-modal v-model="modalFeedbackOpen" />
    </section>
  </ClientOnly>
</template>

<script>
import { defineAsyncComponent } from "vue";
import AppButton from "@/components/ui/Button/app-button.vue";

export default {
  name: "AppPageMainSectionReviews",
  components: {
    FeedbackModal: defineAsyncComponent(() =>
      import("@/components/common/Feedback/app-feedback-modal")
    ),
    AppButton,
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

<template>
  <InfoLayout :mobile="mobile" :tablet="tablet">
    <div>
      <h2>{{ $t("feedback.title") }}</h2>
      <div
        class="info-feedback__comment"
        v-for="(comment, index) in comments"
        :key="index"
      >
        <h5>{{ comment.name }}</h5>
        <div class="info-feedback__category">{{ comment.category }}</div>
        <p>{{ comment.comment }}</p>
      </div>
    </div>
  </InfoLayout>
</template>

<script>
import InfoLayout from "@/components/common/InfoLayout/InfoLayout.vue";

definePageMeta({});

export default {
  name: "InfoReviews",
  components: {
    InfoLayout,
  },
  data() {
    return {
      mobile: false,
      tablet: false,
    };
  },
  computed: {
    comments() {
      const slides = this.$t("reviews.slides", { returnObjects: true });
      const categoryMap = {
        slide1: this.$t("feedback.categories.flatMove"),
        slide2: this.$t("feedback.categories.stuffMove"),
        slide3: this.$t("feedback.categories.flatMove"),
        slide4: this.$t("feedback.categories.stuffMove"),
        slide5: this.$t("feedback.categories.houseMove"),
        slide6: this.$t("feedback.categories.commercialMove"),
      };

      return Object.keys(slides).map((key) => ({
        name: slides[key].title,
        category: categoryMap[key] || this.$t("feedback.categories.flatMove"),
        comment: slides[key].desc,
      }));
    },
  },
  methods: {
    isMobile() {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(max-width: 767px)").matches;
    },
    isTablet() {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(min-width: 768px) and (max-width: 992px)")
        .matches;
    },
    updateDeviceType() {
      this.mobile = this.isMobile();
      this.tablet = this.isTablet();
    },
  },
  head() {
    const title = this.$t("feedback.title");
    const description = this.$t(`seo.reviews.description`, {
      default: this.$t("reviews.title"),
    });

    return {
      title: `${title} - ${this.$t("meta.title", { default: "Etage" })}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description,
        },
      ],
    };
  },
  mounted() {
    this.updateDeviceType();
    window.addEventListener("resize", this.updateDeviceType);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateDeviceType);
  },
};
</script>

<style lang="scss" scoped>
.info-feedback__comment {
  margin-bottom: 30px;
  h5 {
    color: var(--colors-accent);
    margin-bottom: 0;
  }
  .info-feedback__category {
    font-size: rem(12);
    color: color-mix(in srgb, var(--colors-accent) 60%, transparent);
    margin-bottom: 10px;
  }
}
</style>

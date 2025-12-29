<template>
  <InfoLayout>
    <h2>{{ $t("feedback.title") }}</h2>
    <div class="mb-10" v-for="(comment, index) in comments" :key="index">
      <h5 class="text-primary font-bold mb-0">{{ comment.name }}</h5>
      <div class="text-sm text-gray-500 font-medium mb-2">
        {{ comment.category }}
      </div>
      <p class="text-base leading-relaxed mt-3">{{ comment.comment }}</p>
    </div>
  </InfoLayout>
</template>

<script>
import InfoLayout from "~/layouts/info.vue";

export default {
  name: "InfoReviews",
  components: {
    InfoLayout,
  },
  computed: {
    comments() {
      const categoryMap = {
        slide1: this.$t("feedback.categories.flatMove"),
        slide2: this.$t("feedback.categories.stuffMove"),
        slide3: this.$t("feedback.categories.flatMove"),
        slide4: this.$t("feedback.categories.stuffMove"),
        slide5: this.$t("feedback.categories.houseMove"),
        slide6: this.$t("feedback.categories.commercialMove"),
      };

      return [
        {
          name: this.$t("reviews.slides.slide1.title"),
          category: categoryMap.slide1,
          comment: this.$t("reviews.slides.slide1.desc"),
        },
        {
          name: this.$t("reviews.slides.slide2.title"),
          category: categoryMap.slide2,
          comment: this.$t("reviews.slides.slide2.desc"),
        },
        {
          name: this.$t("reviews.slides.slide3.title"),
          category: categoryMap.slide3,
          comment: this.$t("reviews.slides.slide3.desc"),
        },
        {
          name: this.$t("reviews.slides.slide4.title"),
          category: categoryMap.slide4,
          comment: this.$t("reviews.slides.slide4.desc"),
        },
        {
          name: this.$t("reviews.slides.slide5.title"),
          category: categoryMap.slide5,
          comment: this.$t("reviews.slides.slide5.desc"),
        },
        {
          name: this.$t("reviews.slides.slide6.title"),
          category: categoryMap.slide6,
          comment: this.$t("reviews.slides.slide6.desc"),
        },
      ];
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
};
</script>

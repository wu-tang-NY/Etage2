<template>
  <InfoLayout :mobile="mobile" :tablet="tablet">
    <div>
      <h2>{{ $t("facts.title") }}</h2>
      <p>{{ $t("facts.intro") }}</p>
      <ul>
        <li>{{ $t("facts.fact1") }}</li>
        <li>{{ $t("facts.fact2") }}</li>
        <li>{{ $t("facts.fact3") }}</li>
        <li>{{ $t("facts.fact4") }}</li>
      </ul>
    </div>
  </InfoLayout>
</template>

<script>
import InfoLayout from "@/components/common/InfoLayout/InfoLayout.vue";

definePageMeta({});

export default {
  name: "InfoFacts",
  components: {
    InfoLayout,
  },
  data() {
    return {
      mobile: false,
      tablet: false,
    };
  },
  head() {
    const title = this.$t("facts.title");
    const description = this.$t(`seo.facts.description`, {
      default: this.$t("facts.intro"),
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
};
</script>

<style lang="scss" scoped></style>

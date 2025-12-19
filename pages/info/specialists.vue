<template>
  <InfoLayout :mobile="mobile" :tablet="tablet">
    <div>
      <h2>{{ $t("specialists.title") }}</h2>
      <p>{{ $t("specialists.paragraph1") }}</p>
      <p>{{ $t("specialists.question") }}</p>
      <ul>
        <li>{{ $t("specialists.who1") }}</li>
        <li>{{ $t("specialists.who2") }}</li>
        <li>{{ $t("specialists.who3") }}</li>
        <li>{{ $t("specialists.who4") }}</li>
        <li>{{ $t("specialists.who5") }}</li>
      </ul>
      <p>{{ $t("specialists.optionsTitle") }}</p>
      <ul>
        <li>{{ $t("specialists.option1") }}</li>
      </ul>
      <p>{{ $t("specialists.note") }}</p>
    </div>
  </InfoLayout>
</template>

<script>
import InfoLayout from "@/components/common/InfoLayout/InfoLayout.vue";

definePageMeta({});

export default {
  name: "InfoSpecialists",
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
    const title = this.$t("specialists.title");
    const description = this.$t(`seo.specialists.description`, {
      default: this.$t("specialists.paragraph1"),
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

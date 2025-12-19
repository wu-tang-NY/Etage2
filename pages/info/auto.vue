<template>
  <InfoLayout :mobile="mobile" :tablet="tablet">
    <div>
      <h2>{{ $t("auto.title") }}</h2>
      <p>{{ $t("auto.question1") }}</p>
      <p>{{ $t("auto.paragraph1") }}</p>
      <p>{{ $t("auto.paragraph2") }}</p>
      <p>{{ $t("auto.paragraph3") }}</p>
      <p>{{ $t("auto.question2") }}</p>
      <ul>
        <li>
          {{ $t("auto.reason1Title") }}
          <p>{{ $t("auto.reason1Desc") }}</p>
        </li>
        <li>
          {{ $t("auto.reason2Title") }}
          <p>{{ $t("auto.reason2Desc") }}</p>
        </li>
        <li>
          {{ $t("auto.reason3Title") }}
          <p>{{ $t("auto.reason3Desc") }}</p>
        </li>
      </ul>
      <p>{{ $t("auto.price") }}</p>
    </div>
  </InfoLayout>
</template>

<script>
import InfoLayout from "@/components/common/InfoLayout/InfoLayout.vue";

definePageMeta({});

export default {
  name: "InfoAuto",
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
    const title = this.$t("auto.title");
    const description = this.$t(`seo.auto.description`, {
      default: this.$t("auto.paragraph1"),
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

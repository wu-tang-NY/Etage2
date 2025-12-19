<template>
  <InfoLayout :mobile="mobile" :tablet="tablet">
    <div>
      <h2>{{ $t("officeMove.title") }}</h2>
      <p>{{ $t("officeMove.paragraph1") }}</p>
      <p>{{ $t("officeMove.question") }}</p>
      <ul>
        <li>{{ $t("officeMove.reason1") }}</li>
        <li>{{ $t("officeMove.reason2") }}</li>
        <li>{{ $t("officeMove.reason3") }}</li>
        <li>{{ $t("officeMove.reason4") }}</li>
        <li>{{ $t("officeMove.reason5") }}</li>
        <li>{{ $t("officeMove.reason6") }}</li>
      </ul>
    </div>
  </InfoLayout>
</template>

<script>
import InfoLayout from "@/components/common/InfoLayout/InfoLayout.vue";

definePageMeta({});

export default {
  name: "InfoOfficeMove",
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
    const title = this.$t("officeMove.title");
    const description = this.$t(`seo.officeMove.description`, {
      default: this.$t("officeMove.paragraph1"),
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

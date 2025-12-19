<template>
  <InfoLayout :mobile="mobile" :tablet="tablet">
    <div>
      <h2>{{ $t("flatMove.title") }}</h2>
      <p>{{ $t("flatMove.paragraph1") }}</p>
      <p>{{ $t("flatMove.question") }}</p>
      <ol>
        <li>{{ $t("flatMove.step1") }}</li>
        <li>
          {{ $t("flatMove.step2Title") }}
          <p>{{ $t("flatMove.step2Desc") }}</p>
        </li>
        <li>
          {{ $t("flatMove.step3Title") }}
          <p>{{ $t("flatMove.step3Desc") }}</p>
        </li>
        <li>
          {{ $t("flatMove.step4Title") }}
          <p>{{ $t("flatMove.step4Desc") }}</p>
        </li>
      </ol>
    </div>
  </InfoLayout>
</template>

<script>
import InfoLayout from "@/components/common/InfoLayout/InfoLayout.vue";

definePageMeta({});

export default {
  name: "InfoFlatMove",
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
    const title = this.$t("flatMove.title");
    const description = this.$t(`seo.flatMove.description`, {
      default: this.$t("flatMove.paragraph1"),
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

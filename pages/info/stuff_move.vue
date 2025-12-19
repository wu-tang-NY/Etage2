<template>
  <InfoLayout :mobile="mobile" :tablet="tablet">
    <div>
      <h2>{{ $t("stuffMove.title") }}</h2>
      <p>{{ $t("stuffMove.paragraph1") }}</p>
      <p>{{ $t("stuffMove.optionsTitle") }}</p>
      <ul>
        <li>{{ $t("stuffMove.option1") }}</li>
        <li>{{ $t("stuffMove.option2") }}</li>
        <li>
          {{ $t("stuffMove.option3") }}
          <p>{{ $t("stuffMove.option3Note") }}</p>
        </li>
        <li>{{ $t("stuffMove.option4") }}</li>
      </ul>
    </div>
  </InfoLayout>
</template>

<script>
import InfoLayout from "@/components/common/InfoLayout/InfoLayout.vue";

definePageMeta({});

export default {
  name: "InfoStuffMove",
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
    const title = this.$t("stuffMove.title");
    const description = this.$t(`seo.stuffMove.description`, {
      default: this.$t("stuffMove.paragraph1"),
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

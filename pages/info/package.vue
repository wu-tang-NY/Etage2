<template>
  <InfoLayout :mobile="mobile" :tablet="tablet">
    <div>
      <h2>{{ $t("package.title") }}</h2>
      <p>{{ $t("package.paragraph1") }}</p>
      <p>{{ $t("package.typesTitle") }}</p>
      <ul class="info-packages">
        <li>
          <h6>{{ $t("package.boxTitle") }}</h6>
          <BoosterImage
            src="/images/packages/img_1_2x.jpg"
            :alt="$t('package.boxTitle')"
            sizes="(max-width: 767px) 100vw, (max-width: 992px) 50vw, 33vw"
            loading="lazy"
          />
          <p>{{ $t("package.boxDesc") }}</p>
        </li>
        <li>
          <h6>{{ $t("package.stretchTitle") }}</h6>
          <BoosterImage
            src="/images/packages/img_2_2x.jpg"
            :alt="$t('package.stretchTitle')"
            sizes="(max-width: 767px) 100vw, (max-width: 992px) 50vw, 33vw"
            loading="lazy"
          />
          <p>{{ $t("package.stretchDesc") }}</p>
        </li>
        <li>
          <h6>{{ $t("package.bubbleTitle") }}</h6>
          <BoosterImage
            src="/images/packages/img_3_2x.jpg"
            :alt="$t('package.bubbleTitle')"
            sizes="(max-width: 767px) 100vw, (max-width: 992px) 50vw, 33vw"
            loading="lazy"
          />
          <p>{{ $t("package.bubbleDesc") }}</p>
        </li>
        <li>
          <h6>{{ $t("package.tapeTitle") }}</h6>
          <BoosterImage
            src="/images/packages/img_4_2x.jpg"
            :alt="$t('package.tapeTitle')"
            sizes="(max-width: 767px) 100vw, (max-width: 992px) 50vw, 33vw"
            loading="lazy"
          />
          <p>{{ $t("package.tapeDesc") }}</p>
        </li>
        <li>
          <h6>{{ $t("package.cornerTitle") }}</h6>
          <BoosterImage
            src="/images/packages/img_5_2x.jpg"
            :alt="$t('package.cornerTitle')"
            sizes="(max-width: 767px) 100vw, (max-width: 992px) 50vw, 33vw"
            loading="lazy"
          />
          <p>{{ $t("package.cornerDesc") }}</p>
        </li>
        <li>
          <h6>{{ $t("package.bagTitle") }}</h6>
          <BoosterImage
            src="/images/packages/img_6_2x.jpg"
            :alt="$t('package.bagTitle')"
            sizes="(max-width: 767px) 100vw, (max-width: 992px) 50vw, 33vw"
            loading="lazy"
          />
          <p>{{ $t("package.bagDesc") }}</p>
        </li>
        <li>
          <h6>{{ $t("package.foamTitle") }}</h6>
          <BoosterImage
            src="/images/packages/img_7_2x.jpg"
            :alt="$t('package.foamTitle')"
            sizes="(max-width: 767px) 100vw, (max-width: 992px) 50vw, 33vw"
            loading="lazy"
          />
          <p>{{ $t("package.foamDesc") }}</p>
        </li>
        <li>
          <h6>{{ $t("package.polybagTitle") }}</h6>
          <BoosterImage
            src="/images/packages/img_8_2x.jpg"
            :alt="$t('package.polybagTitle')"
            sizes="(max-width: 767px) 100vw, (max-width: 992px) 50vw, 33vw"
            loading="lazy"
          />
          <p>{{ $t("package.polybagDesc") }}</p>
        </li>
        <li>
          <h6>{{ $t("package.paperTitle") }}</h6>
          <BoosterImage
            src="/images/packages/img_9_2x.jpg"
            :alt="$t('package.paperTitle')"
            sizes="(max-width: 767px) 100vw, (max-width: 992px) 50vw, 33vw"
            loading="lazy"
          />
          <p>{{ $t("package.paperDesc") }}</p>
        </li>
        <li>
          <h6>{{ $t("package.cardboardTitle") }}</h6>
          <BoosterImage
            src="/images/packages/img_10_2x.jpg"
            :alt="$t('package.cardboardTitle')"
            sizes="(max-width: 767px) 100vw, (max-width: 992px) 50vw, 33vw"
            loading="lazy"
          />
          <p>{{ $t("package.cardboardDesc") }}</p>
        </li>
      </ul>
      <p>{{ $t("package.planningTitle") }}</p>
      <p>{{ $t("package.planningDesc") }}</p>
      <p>{{ $t("package.deliveryTitle") }}</p>
      <ul>
        <li>{{ $t("package.delivery1") }}</li>
      </ul>
      <p>{{ $t("package.pickupTitle") }}</p>
      <ul>
        <li>{{ $t("package.pickupDesc") }}</li>
      </ul>
    </div>
  </InfoLayout>
</template>

<script>
import BoosterImage from "#booster/components/BoosterImage";
import InfoLayout from "@/components/common/InfoLayout/InfoLayout.vue";

definePageMeta({});

export default {
  name: "InfoPackage",
  components: {
    InfoLayout,
    BoosterImage,
  },
  data() {
    return {
      mobile: false,
      tablet: false,
    };
  },
  head() {
    const title = this.$t("package.title");
    const description = this.$t(`seo.package.description`, {
      default: this.$t("package.paragraph1"),
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

<style lang="scss" scoped>
.info-packages {
  list-style: none;
  margin: 0;
  padding: 0;

  & > li {
    margin: 1.5rem 0.5rem 2rem 0;

    & > h6 {
      color: color-mix(in srgb, var(--colors-accent) 90%, white);
      margin-bottom: 1rem;
    }
  }
}

// Ensure BoosterImage displays correctly
:deep(img),
:deep(picture),
:deep(picture img) {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  object-position: center;
  margin: 1rem 0;
}
</style>

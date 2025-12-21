<template>
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
          :title="$t('package.boxTitle')"
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
          :title="$t('package.stretchTitle')"
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
          :title="$t('package.bubbleTitle')"
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
          :title="$t('package.tapeTitle')"
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
          :title="$t('package.cornerTitle')"
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
          :title="$t('package.bagTitle')"
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
          :title="$t('package.foamTitle')"
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
          :title="$t('package.polybagTitle')"
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
          :title="$t('package.paperTitle')"
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
          :title="$t('package.cardboardTitle')"
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
</template>

<script>
export default {
  name: "PopupContentPackage",
};
</script>

<style lang="scss">
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
</style>

<template>
  <div>
    <h2>{{ $t("package.title") }}</h2>
    <p>{{ $t("package.paragraph1") }}</p>
    <p>{{ $t("package.typesTitle") }}</p>
    <ul class="info-packages">
      <li>
        <h6>{{ $t("package.boxTitle") }}</h6>
        <img src="/static/images/packages/img_1_2x.jpg" alt="" />
        <p>{{ $t("package.boxDesc") }}</p>
      </li>
      <li>
        <h6>{{ $t("package.stretchTitle") }}</h6>
        <img src="/static/images/packages/img_2_2x.jpg" alt="" />
        <p>{{ $t("package.stretchDesc") }}</p>
      </li>
      <li>
        <h6>{{ $t("package.bubbleTitle") }}</h6>
        <img src="/static/images/packages/img_3_2x.jpg" alt="" />
        <p>{{ $t("package.bubbleDesc") }}</p>
      </li>
      <li>
        <h6>{{ $t("package.tapeTitle") }}</h6>
        <img src="/static/images/packages/img_4_2x.jpg" alt="" />
        <p>{{ $t("package.tapeDesc") }}</p>
      </li>
      <li>
        <h6>{{ $t("package.cornerTitle") }}</h6>
        <img src="/static/images/packages/img_5_2x.jpg" alt="" />
        <p>{{ $t("package.cornerDesc") }}</p>
      </li>
      <li>
        <h6>{{ $t("package.bagTitle") }}</h6>
        <img src="/static/images/packages/img_6_2x.jpg" alt="" />
        <p>{{ $t("package.bagDesc") }}</p>
      </li>
      <li>
        <h6>{{ $t("package.foamTitle") }}</h6>
        <img src="/static/images/packages/img_7_2x.jpg" alt="" />
        <p>{{ $t("package.foamDesc") }}</p>
      </li>
      <li>
        <h6>{{ $t("package.polybagTitle") }}</h6>
        <img src="/static/images/packages/img_8_2x.jpg" alt="" />
        <p>{{ $t("package.polybagDesc") }}</p>
      </li>
      <li>
        <h6>{{ $t("package.paperTitle") }}</h6>
        <img src="/static/images/packages/img_9_2x.jpg" alt="" />
        <p>{{ $t("package.paperDesc") }}</p>
      </li>
      <li>
        <h6>{{ $t("package.cardboardTitle") }}</h6>
        <img src="/static/images/packages/img_10_2x.jpg" alt="" />
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
  name: 'PopupContentPackage.vue',
};
</script>

<style lang="scss">
.info-packages {
  list-style: none;
  margin: 0;
  padding: 0;

  & > li {
    margin: 1.5rem .5rem 2rem 0;

    & > h6 {
      color: lighten($colors-accent, 10%);
      margin-bottom: 1rem;
    }
  }
}
</style>

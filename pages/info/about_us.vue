<template>
  <InfoLayout>
    <div>
      <h2>{{ $t("aboutUs.title") }}</h2>
      <p>{{ $t("aboutUs.paragraph1") }}</p>
      <p>{{ $t("aboutUs.paragraph2") }}</p>
      <p>{{ $t("aboutUs.paragraph3") }}</p>
      <p>{{ $t("aboutUs.paragraph4") }}</p>
      <p>{{ $t("aboutUs.paragraph5") }}</p>
      <ul>
        <li>{{ $t("aboutUs.services.transport") }}</li>
        <li>{{ $t("aboutUs.services.flatMove") }}</li>
        <li>{{ $t("aboutUs.services.officeMove") }}</li>
        <li>{{ $t("aboutUs.services.loading") }}</li>
        <li>{{ $t("aboutUs.services.disassembly") }}</li>
        <li>{{ $t("aboutUs.services.packing") }}</li>
      </ul>
    </div>
  </InfoLayout>
</template>

<script>
import InfoLayout from "~/layouts/info.vue";

export default {
  components: {
    InfoLayout,
  },
  name: "InfoAboutUs",
  head() {
    const locale = this.$i18n.locale;
    const title = this.$t("aboutUs.title");
    const description = this.$t(`seo.aboutUs.description`, {
      default: this.$t("aboutUs.paragraph1"),
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

<style lang="scss" scoped></style>

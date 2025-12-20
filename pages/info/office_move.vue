<template>
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
</template>

<script>
definePageMeta({});

export default {
  name: "InfoOfficeMove",
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
};
</script>

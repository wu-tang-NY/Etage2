<template>
  <InfoLayout>
    <h2>{{ $t("facts.title") }}</h2>
    <p>{{ $t("facts.intro") }}</p>
    <ul>
      <li>{{ $t("facts.fact1") }}</li>
      <li>{{ $t("facts.fact2") }}</li>
      <li>{{ $t("facts.fact3") }}</li>
      <li>{{ $t("facts.fact4") }}</li>
    </ul>
  </InfoLayout>
</template>

<script>
import InfoLayout from "~/layouts/info.vue";
export default {
  name: "InfoFacts",
  components: {
    InfoLayout,
  },
  head() {
    const title = this.$t("facts.title");
    const description = this.$t(`seo.facts.description`, {
      default: this.$t("facts.intro"),
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

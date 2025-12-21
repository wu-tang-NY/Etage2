<template>
  <InfoLayout>
    <h2>{{ $t("history.title") }}</h2>
    <p>{{ $t("history.paragraph1") }}</p>
    <p>{{ $t("history.paragraph2") }}</p>
    <p>{{ $t("history.paragraph3") }}</p>
    <p>{{ $t("history.paragraph4") }}</p>
    <p>{{ $t("history.paragraph5") }}</p>
  </InfoLayout>
</template>

<script>
import InfoLayout from "~/layouts/info.vue";

export default {
  components: {
    InfoLayout,
  },
  name: "InfoHistory",
  head() {
    const title = this.$t("history.title");
    const description = this.$t(`seo.history.description`, {
      default: this.$t("history.paragraph1"),
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

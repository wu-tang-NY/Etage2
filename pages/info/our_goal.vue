<template>
  <div>
    <h2>{{ $t("ourGoal.title") }}</h2>
    <p>{{ $t("ourGoal.paragraph1") }}</p>
    <p>{{ $t("ourGoal.paragraph2") }}</p>
  </div>
</template>

<script>
definePageMeta({});

export default {
  name: "InfoOurGoal",
  head() {
    const title = this.$t("ourGoal.title");
    const description = this.$t(`seo.ourGoal.description`, {
      default: this.$t("ourGoal.paragraph1"),
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

<template>
  <div>
    <h2>{{ $t("jobs.title") }}</h2>
    <p>{{ $t("jobs.paragraph1") }}</p>
    <p>{{ $t("jobs.paragraph2") }}</p>
  </div>
</template>

<script>
definePageMeta({});

export default {
  name: "InfoJobs",
  head() {
    const title = this.$t("jobs.title");
    const description = this.$t(`seo.jobs.description`, {
      default: this.$t("jobs.paragraph1"),
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

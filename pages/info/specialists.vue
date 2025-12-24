<template>
  <InfoLayout>
    <h2>{{ $t("specialists.title") }}</h2>
    <p>{{ $t("specialists.paragraph1") }}</p>
    <p>{{ $t("specialists.question") }}</p>
    <ul>
      <li>{{ $t("specialists.who1") }}</li>
      <li>{{ $t("specialists.who2") }}</li>
      <li>{{ $t("specialists.who3") }}</li>
      <li>{{ $t("specialists.who4") }}</li>
      <li>{{ $t("specialists.who5") }}</li>
    </ul>
    <p>{{ $t("specialists.optionsTitle") }}</p>
    <ul>
      <li>{{ $t("specialists.option1") }}</li>
    </ul>
    <p>{{ $t("specialists.note") }}</p>
  </InfoLayout>
</template>

<script>
import InfoLayout from "~/layouts/info.vue";

export default {
  components: {
    InfoLayout,
  },
  name: "InfoSpecialists",
  head() {
    const title = this.$t("specialists.title");
    const description = this.$t(`seo.specialists.description`, {
      default: this.$t("specialists.paragraph1"),
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

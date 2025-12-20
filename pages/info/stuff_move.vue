<template>
  <div>
    <h2>{{ $t("stuffMove.title") }}</h2>
    <p>{{ $t("stuffMove.paragraph1") }}</p>
    <p>{{ $t("stuffMove.optionsTitle") }}</p>
    <ul>
      <li>{{ $t("stuffMove.option1") }}</li>
      <li>{{ $t("stuffMove.option2") }}</li>
      <li>
        {{ $t("stuffMove.option3") }}
        <p>{{ $t("stuffMove.option3Note") }}</p>
      </li>
      <li>{{ $t("stuffMove.option4") }}</li>
    </ul>
  </div>
</template>

<script>
definePageMeta({});

export default {
  name: "InfoStuffMove",
  head() {
    const title = this.$t("stuffMove.title");
    const description = this.$t(`seo.stuffMove.description`, {
      default: this.$t("stuffMove.paragraph1"),
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

<template>
  <div>
    <h2>{{ $t("flatMove.title") }}</h2>
    <p>{{ $t("flatMove.paragraph1") }}</p>
    <p>{{ $t("flatMove.question") }}</p>
    <ol>
      <li>{{ $t("flatMove.step1") }}</li>
      <li>
        {{ $t("flatMove.step2Title") }}
        <p>{{ $t("flatMove.step2Desc") }}</p>
      </li>
      <li>
        {{ $t("flatMove.step3Title") }}
        <p>{{ $t("flatMove.step3Desc") }}</p>
      </li>
      <li>
        {{ $t("flatMove.step4Title") }}
        <p>{{ $t("flatMove.step4Desc") }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
definePageMeta({});

export default {
  name: "InfoFlatMove",
  head() {
    const title = this.$t("flatMove.title");
    const description = this.$t(`seo.flatMove.description`, {
      default: this.$t("flatMove.paragraph1"),
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

<template>
  <div>
    <h2>{{ $t("payment.title") }}</h2>
    <p>{{ $t("payment.paragraph1") }}</p>
    <p>{{ $t("payment.paragraph2") }}</p>
    <p>{{ $t("payment.paragraph3") }}</p>
  </div>
</template>

<script>
definePageMeta({});

export default {
  name: "InfoPayment",
  head() {
    const title = this.$t("payment.title");
    const description = this.$t(`seo.payment.description`, {
      default: this.$t("payment.paragraph1"),
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

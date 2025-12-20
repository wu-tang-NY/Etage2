<template>
  <div>
    <h2>{{ $t("specialOffers.title") }}</h2>
    <ul>
      <li>{{ $t("specialOffers.offer1") }}</li>
      <li>
        {{ $t("specialOffers.offer2") }}
        <p>{{ $t("specialOffers.offer2Note") }}</p>
      </li>
      <li>{{ $t("specialOffers.offer3") }}</li>
    </ul>
  </div>
</template>

<script>
definePageMeta({});

export default {
  name: "InfoSpecialOffers",
  head() {
    const title = this.$t("specialOffers.title");
    const description = this.$t(`seo.specialOffers.description`, {
      default: this.$t("specialOffers.title"),
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

<template>
  <InfoLayout :mobile="mobile" :tablet="tablet">
    <div>
      <h2>{{ $t("contacts.title") }}</h2>
      <h3>{{ $t("contacts.company") }}</h3>
      <p>{{ $t("contacts.address") }}</p>
      <p>
        <a href="tel:+380973170434">+38 097 317 0434</a>
        <br />
        <a href="tel:+380669680944">+38 066 968 0944</a>
      </p>
      <p>
        {{ $t("contacts.emailLabel") }}
        <a href="mailto:support@etage.com.ua">support@etage.com.ua</a>
      </p>
      <p>{{ $t("contacts.mapTitle") }}</p>
      <div class="info-map">
        <BoosterIframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2747.635342285657!2d30.719623415591563!3d46.4757305791259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c6318e938e782b%3A0xff287e6aa12db202!2z0LLRg9C70LjRhtGPINCa0L7Qu9C-0L3RgtCw0ZfQstGB0YzQutCwLCA3LCDQntC00LXRgdCwLCDQntC00LXRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgNjUwMDA!5e0!3m2!1sru!2sua!4v1560112076644!5m2!1sru!2sua"
          width="100%"
          height="100%"
          frameborder="0"
          style="border: 0"
          allowfullscreen
          loading="lazy"
        />
      </div>
    </div>
  </InfoLayout>
</template>

<script>
import InfoLayout from "@/components/common/InfoLayout/InfoLayout.vue";

definePageMeta({});

export default {
  name: "InfoContacts",
  components: {
    InfoLayout,
  },
  data() {
    return {
      mobile: false,
      tablet: false,
    };
  },
  head() {
    const title = this.$t("contacts.title");
    const description = this.$t(`seo.contacts.description`, {
      default: this.$t("contacts.address"),
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
  mounted() {
    this.updateDeviceType();
    window.addEventListener("resize", this.updateDeviceType);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateDeviceType);
  },
  methods: {
    isMobile() {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(max-width: 767px)").matches;
    },
    isTablet() {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(min-width: 768px) and (max-width: 992px)")
        .matches;
    },
    updateDeviceType() {
      this.mobile = this.isMobile();
      this.tablet = this.isTablet();
    },
  },
};
</script>

<style lang="scss" scoped>
.info-map {
  height: 300px;
  margin-top: 10px;
}

a {
  color: var(--colors-accent);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>

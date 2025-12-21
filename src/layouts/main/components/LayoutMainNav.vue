<template>
  <app-nav>
    <app-nav-item
      v-for="({ id, title, icon, children }, index) in pages"
      :id="id"
      :key="title"
      :title="title"
      :icon="icon"
      :children="children"
      :active="!isInfoRoute && index === activePage"
      :visited="!isInfoRoute && index < activePage"
      @click="handleClick(index)"
    />

    <app-nav-item
      :title="$t('navInfo.information')"
      icon="icon_5_c"
      :to="localizedInfoPath"
      :active="isInfoRoute"
      :visited="isInfoRoute"
      class="nav-info"
    />
  </app-nav>
</template>

<script>
export default {
  name: "LayoutMainNav",
  computed: {
    pages() {
      return [
        {
          id: "services_link",
          title: this.$t("nav.services"),
          icon: "icon_1_c",
          children: [
            {
              title: this.$t("nav.flatMove"),
              path: "PopupContentFlatMove",
            },
            {
              title: this.$t("nav.officeMove"),
              path: "PopupContentOfficeMove",
            },
            {
              title: this.$t("nav.stuffMove"),
              path: "PopupContentStuffMove",
            },
            {
              title: this.$t("nav.specialists"),
              path: "PopupContentSpecialists",
            },
            {
              title: this.$t("nav.package"),
              path: "PopupContentPackage",
            },
          ],
        },
        {
          id: "prices_link",
          title: this.$t("nav.prices"),
          icon: "icon_2_c",
        },
        {
          id: "reviews_link",
          title: this.$t("nav.reviews"),
          icon: "icon_3_c",
        },
        {
          id: "order_link",
          title: this.$t("nav.order"),
          icon: "icon_4_c",
        },
      ];
    },
    isInfoRoute() {
      if (!this.$route) return false;
      const path = this.$route.path || "";
      return path.includes("/info");
    },
    localizedInfoPath() {
      const locale = this.$i18n?.locale || "ua";
      return `/${locale}/info`;
    },
  },
  data: () => ({
    activePage: 0,
  }),
  methods: {
    handleClick(index) {
      if (this.isInfoRoute) {
        // Store the section index to scroll to after navigation
        if (typeof window !== "undefined" && window.sessionStorage) {
          window.sessionStorage.setItem("scrollToSection", index.toString());
        }
        // Navigate to the main page
        const locale = this.$i18n?.locale || "ua";
        this.$router.push(`/${locale}`);
        return;
      }
      this.activePage = index;

      this.$emit("click");
      this.$eventbus.$emit("section:change", index);
    },
  },
  watch: {
    "$route.path"() {
      if (this.isInfoRoute) {
        this.activePage = -1;
      }
    },
  },
  mounted() {
    if (this.isInfoRoute) {
      this.activePage = -1;
      return;
    }

    if (this.$eventbus) {
      this.$eventbus.$on("section:scroll", (index) => {
        if (!this.isInfoRoute) {
          this.activePage = index;
        }
      });
    }

    if (typeof document !== "undefined") {
      const sections = document.querySelector("#sections");
      const el = sections?.querySelector("section.active");

      if (el && !this.isInfoRoute) {
        this.activePage = Array.from(sections.children).indexOf(el);
      }
    }
  },
  beforeUnmount() {
    if (this.$eventbus) {
      this.$eventbus.$off("section:scroll");
    }
  },
};
</script>

<style lang="scss">
@include media-breakpoint-up(lg) {
  .nav-info {
    margin-left: auto;
  }
}
</style>

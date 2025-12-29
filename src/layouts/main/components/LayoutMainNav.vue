<template>
  <app-nav>
    <li
      class="group relative"
      v-for="({ id, title, icon, children }, index) in pages"
      :class="{
        'lg:-ml-4': index > 0,
      }"
      :key="title"
    >
      <app-nav-item
        :id="id"
        :title="title"
        :icon="icon"
        :index="index"
        :children="children"
        :active="!isInfoRoute && index === activePage"
        :visited="!isInfoRoute && index < activePage"
        @click="handleClick(index)"
        @close="$emit('close')"
      />

      <ul
        class="group-hover:flex flex-col gap-1 bg-gray-100 dark:bg-gray-800 p-3 absolute top-full z-10 left-0 w-60 hidden group-focus-within/item:block"
        v-if="children?.length > 0"
        role="menu"
        :class="{
          '!bg-primary': !isInfoRoute && index === activePage,
        }"
      >
        <template v-for="child in children" :key="child.title">
          <li role="menuitem">
            <NuxtLink
              :to="`/${$i18n?.locale || 'ua'}/info/${child.path}`"
              class="block py-2.5 rounded px-4 font-medium transition-colors duration-150 ease-in-out hover:bg-black/5 dark:hover:bg-white/10 focus:bg-black/5 dark:focus:bg-white/20"
              :exactActiveClass="'text-white bg-white/10'"
              role="link"
              tabindex="0"
            >
              {{ child.title }}
            </NuxtLink>
          </li>
        </template>
      </ul>
    </li>

    <li class="lg:ml-auto">
      <app-nav-item
        :title="$t('navInfo.information')"
        icon="icon_5_c"
        :to="localizedInfoPath"
        :active="isInfoRoute"
        :visited="isInfoRoute"
        class="[clip-path:polygon(0_0,calc(100%-20px)_0,100%_100%,0_100%)] lg:[clip-path:polygon(20px_0,100%_0,100%_100%,0%_100%)]"
        @close="$emit('close')"
      />
    </li>
  </app-nav>
</template>

<script>
export default {
  name: "LayoutMainNav",
  emits: ["click", "close"],
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
              path: "flat_move",
            },
            {
              title: this.$t("nav.officeMove"),
              path: "office_move",
            },
            {
              title: this.$t("nav.stuffMove"),
              path: "stuff_move",
            },
            {
              title: this.$t("nav.specialists"),
              path: "specialists",
            },
            {
              title: this.$t("nav.package"),
              path: "package",
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
        // Emit close event for mobile menu
        this.$emit("close");
        return;
      }
      this.activePage = index;

      this.$emit("click");
      // Close menu first to ensure correct layout for scroll calculation
      this.$emit("close");
      // Wait for DOM to update after menu closes, then trigger scroll
      this.$nextTick(() => {
        if (typeof window !== "undefined" && window.requestAnimationFrame) {
          requestAnimationFrame(() => {
            if (this.$eventbus) {
              this.$eventbus.$emit("section:change", index);
            }
          });
        } else {
          // Fallback if requestAnimationFrame is not available
          setTimeout(() => {
            if (this.$eventbus) {
              this.$eventbus.$emit("section:change", index);
            }
          }, 50);
        }
      });
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

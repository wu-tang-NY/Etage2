<template>
  <div class="container">
    <div class="info-layout">
      <div class="info-layout__sidebar sticky">
        <div class="info-layout__nav">
          <template v-if="navItems && navItems.length > 0">
            <template
              v-for="(item, index) in navItems"
              :key="item.header || index"
            >
              <div
                v-if="item"
                class="info-layout__panel"
                :class="{ 'info-layout__panel--active': item.isActive }"
              >
                <div
                  class="info-layout__panel-header"
                  @click="toggleActive(item, index)"
                >
                  {{ item.header }}
                  <svg-icon name="modal_dropdown" original />
                </div>
                <template v-if="item && item.links && item.links.length > 0">
                  <template
                    v-for="(link, linkIndex) in item.links"
                    :key="link.slug || linkIndex"
                  >
                    <div v-if="link" class="info-layout__panel-content">
                      <NuxtLink
                        v-if="link && link.title"
                        :to="getLocalizedPath(`/info/${link.slug}`)"
                        class="info-layout__panel-link"
                        :class="{
                          'info-layout__panel-link--active': link.isActive,
                        }"
                        @click="handleLinkClick"
                      >
                        {{ link.title }}
                      </NuxtLink>
                    </div>
                  </template>
                </template>
              </div>
            </template>
          </template>
        </div>
      </div>
      <div class="info-layout__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoLayout",
  data() {
    return {
      activeStates: {},
      currentPath: "",
      manuallyToggledGroups: new Set(), // Track groups that have been manually toggled
    };
  },
  computed: {
    baseNavItems() {
      if (!this.$i18n) return [];
      return [
        {
          header: this.$t("modal.aboutCompany"),
          links: [
            {
              title: this.$t("modal.aboutUs"),
              slug: "about_us",
            },
            {
              title: this.$t("modal.history"),
              slug: "history",
            },
            {
              title: this.$t("modal.ourGoal"),
              slug: "our_goal",
            },
            {
              title: this.$t("modal.facts"),
              slug: "facts",
            },
            {
              title: this.$t("modal.auto"),
              slug: "auto",
            },
          ],
          isActive: false,
        },
        {
          header: this.$t("modal.services"),
          links: [
            {
              title: this.$t("modal.flatMove"),
              slug: "flat_move",
            },
            {
              title: this.$t("modal.officeMove"),
              slug: "office_move",
            },
            {
              title: this.$t("modal.stuffMove"),
              slug: "stuff_move",
            },
            {
              title: this.$t("modal.specialists"),
              slug: "specialists",
            },
            {
              title: this.$t("modal.package"),
              slug: "package",
            },
          ],
          isActive: false,
        },
        {
          header: this.$t("modal.information"),
          links: [
            {
              title: this.$t("modal.jobs"),
              slug: "jobs",
            },
            {
              title: this.$t("modal.reviews"),
              slug: "reviews",
            },
            {
              title: this.$t("modal.contacts"),
              slug: "contacts",
            },
          ],
          isActive: false,
        },
        {
          header: this.$t("modal.payment"),
          links: [
            {
              title: this.$t("modal.payment"),
              slug: "payment",
            },
          ],
          isActive: false,
        },
        {
          header: this.$t("modal.specialOffers"),
          links: [
            {
              title: this.$t("modal.specialOffers"),
              slug: "special_offers",
            },
          ],
          isActive: false,
        },
      ];
    },
    navItems() {
      if (!this.$i18n) return [];
      const items = this.baseNavItems;

      // Mark active states based on current route
      // Extract slug from path like /ua/info/about_us or /ru/info/about_us
      const match = this.currentPath.match(/\/info\/([^/]+)/);
      const currentSlug = match ? match[1] : "";

      // Check if any group was manually toggled
      const hasManuallyToggledGroups = this.manuallyToggledGroups.size > 0;

      return items.map((item, index) => {
        const hasActiveLink = item.links.some(
          (link) => link.slug === currentSlug
        );
        const links = item.links.map((link) => ({
          ...link,
          isActive: link.slug === currentSlug,
        }));

        // If group was manually toggled, respect manual state only
        // If any group was manually toggled, only use manual states (don't auto-open via hasActiveLink)
        // Otherwise, auto-open if it has an active link
        const isManuallyToggled = this.manuallyToggledGroups.has(index);
        const isActive = isManuallyToggled
          ? this.activeStates[index] || false
          : hasManuallyToggledGroups
          ? this.activeStates[index] || false
          : hasActiveLink || this.activeStates[index] || false;

        return {
          ...item,
          isActive,
          links,
        };
      });
    },
  },
  watch: {
    "$route.path": {
      handler(newPath) {
        this.currentPath = newPath;
        this.updateActiveStates();
      },
      immediate: true,
    },
    "$i18n.locale": {
      handler() {
        // Force reactivity update when locale changes
        this.$forceUpdate();
      },
    },
  },
  methods: {
    toggleNav() {
      if (this.mobile || this.tablet) {
        this.navOpen = !this.navOpen;
      }
    },
    closeNav() {
      this.navOpen = false;
    },
    getLocalizedPath(path) {
      const locale = this.$i18n?.locale || "ua";
      // If path already has a locale prefix, replace it; otherwise add it
      const pathWithoutLocale = path.replace(/^\/(ua|ru)(\/|$)/, "$2");
      return `/${locale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
    },
    handleLinkClick() {
      if (this.mobile || this.tablet) {
        this.navOpen = false;
      }
    },
    toggleActive(item, index) {
      let prev = null;

      // Find which panel is currently active
      Object.keys(this.activeStates).forEach((key) => {
        if (this.activeStates[key]) {
          prev = parseInt(key);
        }
      });

      // Mark this group as manually toggled
      this.manuallyToggledGroups.add(index);

      // Close all panels
      this.activeStates = {};

      // Open the clicked panel if it wasn't already open
      if (prev !== index) {
        this.activeStates[index] = true;
      }
    },
    updateActiveStates() {
      // Open the panel that contains the current active link
      // Extract slug from path like /ua/info/about_us or /ru/info/about_us
      const match = this.currentPath.match(/\/info\/([^/]+)/);
      const currentSlug = match ? match[1] : "";

      // Reset manual toggle state for groups that no longer have active links
      const groupsWithActiveLinks = new Set();

      // Use baseNavItems to avoid circular dependency with navItems computed property
      this.baseNavItems.forEach((item, index) => {
        const hasActiveLink = item.links.some(
          (link) => link.slug === currentSlug
        );
        if (hasActiveLink) {
          groupsWithActiveLinks.add(index);
          // Only auto-open if group wasn't manually toggled
          if (!this.manuallyToggledGroups.has(index)) {
            this.activeStates[index] = true;
          }
        } else {
          // Clear active state for groups without active links (but respect manual toggle)
          if (!this.manuallyToggledGroups.has(index)) {
            this.activeStates[index] = false;
          }
        }
      });

      // Remove manual toggle flag for groups that no longer have active links
      // This allows them to auto-open again when their links become active
      this.manuallyToggledGroups.forEach((index) => {
        if (!groupsWithActiveLinks.has(index)) {
          this.manuallyToggledGroups.delete(index);
        }
      });
    },
  },
  mounted() {
    this.updateActiveStates();
  },
};
</script>

<style lang="scss">
.info-layout {
  width: 100%;
  min-height: calc(100vh - 200px);
  padding: 30px 0 60px;
  display: flex;

  .sticky {
    position: sticky;
    top: 200px;
    overflow: auto;
    max-height: calc(100vh - 200px);
    width: 15%;
    max-width: 15%;
    min-width: 300px;
    flex-shrink: 0;
    align-self: flex-start;

    @media screen and (max-width: 992px) {
      position: fixed;
      top: 0;
      left: 0;
      max-width: 100%;
      width: 100%;
      min-width: 100%;
      max-height: 100vh;
      background-color: #0e1a28;
      z-index: 2;
      padding-bottom: 16px;

      &--open {
        min-height: 100vh;
      }
    }
  }

  &__panel {
    margin-bottom: 10px;
    max-width: 210px;
    cursor: pointer;

    @media screen and (max-width: 992px) {
      max-width: 100%;
      width: 100%;
    }

    &--active {
      .info-layout__panel-header {
        background-color: var(--colors-grey-200);

        svg {
          transform: rotateZ(0);

          g {
            fill: var(--colors-text-primary);
          }
        }
      }
      .info-layout__panel-content {
        max-height: 10000px;
      }

      .info-layout__panel-link {
        max-height: 36px;
      }
    }
  }

  &__panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.3px;
    padding: 0 16px;
    line-height: 36px;
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: var(--colors-grey-200);
    }

    svg {
      @include size(8px, 5px);
      transform: rotateZ(180deg);
      transition: 0.3s ease-in-out;
      fill: var(--colors-accent);

      g {
        fill: var(--colors-text-primary);
      }
    }
  }

  &__panel-content {
    max-height: 0;
    transition: 0.3s ease-in-out;
    overflow: hidden;
  }

  &__panel-link {
    display: block;
    height: 36px;
    padding-left: 26px;
    opacity: 0.5;
    font-size: rem(14);
    line-height: 36px;
    font-weight: 500;
    letter-spacing: 0.3px;
    max-height: 0;
    transition: 0.3s ease-in-out;
    text-decoration: none;

    &.active {
      color: var(--colors-accent);
      opacity: 1;
    }

    &:hover {
      opacity: 1;
    }
  }

  &__content {
    // padding-top: 60px;

    @media screen and (max-width: 992px) {
      margin-top: 100px;
      margin-left: 0;
      padding-top: 24px;
    }

    h2 {
      color: var(--colors-accent);
      margin-bottom: 20px;
    }

    h3 {
      color: var(--colors-accent);
      margin-bottom: 20px;
    }

    p,
    li {
      font-size: rem(15);
      line-height: 1.6;
      letter-spacing: 0.3px;
    }

    p + p,
    img + p,
    img + img,
    p + img {
      margin-top: 20px;
    }

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      object-position: center;
      display: block;
    }

    // Ensure BoosterImage component displays images correctly
    :deep(img),
    :deep(picture),
    :deep(picture img) {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
      object-position: center;
    }

    ul,
    ol {
      padding-left: 20px;
      margin: 20px 0;

      li {
        margin-bottom: 10px;
      }
    }

    ul {
      list-style: disc;
    }

    ol {
      list-style: decimal;
    }
  }
}

@media screen and (max-width: 992px) {
  .info-layout {
    padding-top: 0;
    min-height: 100vh;

    &__nav {
      margin-top: 40px;
    }
  }
}
</style>

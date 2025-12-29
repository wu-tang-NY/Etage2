<template>
  <div class="container mx-auto">
    <div
      class="w-full flex flex-col lg:flex-row relative pb-[60px] pb-0 lg:pt-[200px] pt-0"
    >
      <div
        class="sticky bg-light dark:bg-dark lg:top-[200px] lg:w-[15%] lg:max-w-[15%] lg:min-w-[300px] lg:flex-shrink-0 lg:self-start relative top-0 w-full"
      >
        <div class="info-nav -mx-4 lg:mx-0">
          <template v-if="navItems && navItems.length > 0">
            <template
              v-for="(item, index) in navItems"
              :key="item.header || index"
            >
              <!-- Single link item - render as direct link -->
              <NuxtLink
                v-if="item && item.links.length === 1"
                :to="getLocalizedPath(`/info/${item.links[0].slug}`)"
                class="flex items-center h-9 text-sm max-lg:text-base font-bold px-4 hover:bg-gray-200 dark:hover:bg-gray-800 mb-1 lg:max-w-[210px] max-w-full transition-all duration-300 ease-in-out"
                :exactActiveClass="'bg-gray-200 dark:bg-gray-800 dark:text-white'"
              >
                {{ item.header }}
              </NuxtLink>

              <div
                v-else-if="item"
                class="mb-2 lg:max-w-[210px] cursor-pointer max-w-full w-full"
              >
                <div
                  class="flex items-center justify-between h-9 lg:text-sm text-base font-bold px-4 hover:bg-gray-200 dark:hover:bg-gray-800"
                  :class="{
                    'bg-gray-200 dark:bg-gray-800': activeGroupIndex === index,
                  }"
                  @click="toggleAccordion(index)"
                >
                  <span>{{ item.header }}</span>
                  <svg-icon
                    :ref="`icon-${index}`"
                    name="modal_dropdown"
                    class="w-2 h-4 transition-transform duration-300 ease-in-out rotate-180"
                  />
                </div>
                <div
                  :ref="`content-${index}`"
                  class="max-h-0 transition-[max-height] duration-300 ease-in-out overflow-hidden"
                >
                  <template v-if="item && item.links && item.links.length > 0">
                    <template
                      v-for="(link, linkIndex) in item.links"
                      :key="link.slug || linkIndex"
                    >
                      <NuxtLink
                        v-if="link && link.title"
                        :to="getLocalizedPath(`/info/${link.slug}`)"
                        class="flex items-center h-10 pl-4 my-1 opacity-75 text-base lg:text-sm font-medium hover:opacity-100"
                        :exactActiveClass="'text-primary opacity-100'"
                      >
                        {{ link.title }}
                      </NuxtLink>
                    </template>
                  </template>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
      <div class="pt-6 info-content text-lg lg:text-base lg:pt-0">
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
      activeGroupIndex: null,
      navItems: [
        {
          header: this.$t("modal.aboutCompany"),
          links: [
            { title: this.$t("modal.aboutUs"), slug: "about_us" },
            { title: this.$t("modal.history"), slug: "history" },
            { title: this.$t("modal.ourGoal"), slug: "our_goal" },
            { title: this.$t("modal.facts"), slug: "facts" },
            { title: this.$t("modal.auto"), slug: "auto" },
          ],
        },
        {
          header: this.$t("modal.services"),
          links: [
            { title: this.$t("modal.flatMove"), slug: "flat_move" },
            { title: this.$t("modal.officeMove"), slug: "office_move" },
            { title: this.$t("modal.stuffMove"), slug: "stuff_move" },
            { title: this.$t("modal.specialists"), slug: "specialists" },
            { title: this.$t("modal.package"), slug: "package" },
          ],
        },
        {
          header: this.$t("modal.information"),
          links: [
            { title: this.$t("modal.jobs"), slug: "jobs" },
            { title: this.$t("modal.reviews"), slug: "reviews" },
            { title: this.$t("modal.contacts"), slug: "contacts" },
          ],
        },
        {
          header: this.$t("modal.payment"),
          links: [{ title: this.$t("modal.payment"), slug: "payment" }],
        },
        {
          header: this.$t("modal.specialOffers"),
          links: [
            { title: this.$t("modal.specialOffers"), slug: "special_offers" },
          ],
        },
      ],
    };
  },
  watch: {
    activeGroupIndex(newIndex, oldIndex) {
      this.$nextTick(() => {
        // Close old accordion
        if (oldIndex !== null && oldIndex !== newIndex) {
          const oldContent = this.$refs[`content-${oldIndex}`]?.[0];
          const oldIcon = this.$refs[`icon-${oldIndex}`]?.[0];
          if (oldContent) oldContent.style.maxHeight = "0";
          if (oldIcon?.$el) oldIcon.$el.style.transform = "rotate(180deg)";
        }

        // Open new accordion
        if (newIndex !== null) {
          const content = this.$refs[`content-${newIndex}`]?.[0];
          const icon = this.$refs[`icon-${newIndex}`]?.[0];
          if (content) content.style.maxHeight = content.scrollHeight + "px";
          if (icon?.$el) icon.$el.style.transform = "rotate(0deg)";
        }
      });
    },
  },
  methods: {
    getLocalizedPath(path) {
      const locale = this.$i18n?.locale || "ua";
      const pathWithoutLocale = path.replace(/^\/(ua|ru)(\/|$)/, "$2");
      return `/${locale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
    },
    toggleAccordion(index) {
      // Toggle: if clicking the same one, close it; otherwise open the new one
      this.activeGroupIndex = this.activeGroupIndex === index ? null : index;
    },
    findActiveGroup() {
      // Find which group has the active link
      const index = this.navItems.findIndex(
        (item) => item.hasActiveLink && item.links.length > 1
      );
      if (index !== -1) {
        this.activeGroupIndex = index;
      }
    },
  },
  mounted() {
    this.findActiveGroup();
  },
};
</script>

<style>
/* Christmas lights margin adjustment */
@media screen and (max-width: 992px) {
  .has-christmas-lights .info-nav {
    margin-top: 120px;
  }
}

.info-content {
  h1,
  h2,
  h3 {
    color: var(--colors-accent) !important;
  }

  * + * {
    margin-top: 1rem;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  ul,
  ol {
    padding-left: 1rem;
  }

  p,
  li {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
}
</style>

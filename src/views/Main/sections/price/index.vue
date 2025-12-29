<template>
  <ClientOnly>
    <div>
      <h2 class="mb-6">{{ $t("price.title") }}</h2>

      <div
        class="text-gray-800 dark:text-gray-300 flex items-center flex-wrap lg:flex-nowrap gap-3 mb-6"
      >
        <div
          class="flex items-center gap-3 text-lg lg:text-sm"
          v-for="(category, index) in categories2"
        >
          <div
            :key="index"
            class="lg:bg-gray-100 lg:dark:bg-gray-800 lg:py-2 lg:px-4 flex items-center"
          >
            <svg-icon
              :name="category.iconName"
              class="hidden lg:block size-5 mr-3"
              original
            />
            <template
              v-for="(part, partIndex) in category.parts"
              :key="partIndex"
            >
              <template v-if="partIndex > 0">&nbsp;</template>
              <NuxtLink
                v-if="part.type === 'link'"
                :to="getInfoRoute(part.route)"
                class="link"
              >
                {{ part.text }}
              </NuxtLink>
              <span v-else>{{ part.text }}</span>
            </template>
          </div>
          <div v-if="index < categories2.length - 1" class="text-gray-300">
            +
          </div>
        </div>
      </div>

      <div
        class="hidden lg:flex text-gray-500 dark:text-gray-400 font-bold text-sm text-center"
      >
        <div class="w-2/3 flex justify-center">
          <div
            class="mb-3 relative cursor-pointer before:content-[''] before:block before:absolute before:top-1/2 before:right-[calc(100%+20px)] before:w-[84px] before:h-5 before:border-t-2 before:border-l-2 before:border-gray-200 dark:before:border-gray-600 after:content-[''] after:block after:absolute after:top-1/2 after:left-[calc(100%+20px)] after:w-[84px] after:h-5 after:border-t-2 after:border-r-2 after:border-gray-200 dark:after:border-gray-600"
            @click="navigateToInfo('auto')"
          >
            {{ $t("price.carRental") }}
            <svg-icon name="link" class="size-3 ml-1" original />
          </div>
        </div>

        <div class="w-1/3">
          <div
            class="mb-3 relative cursor-pointer"
            @click="navigateToInfo('specialists')"
          >
            {{ $t("price.specialistsServices") }}
            <svg-icon name="link" class="size-3 ml-1" original />
          </div>
        </div>
      </div>

      <div class="flex flex-wrap lg:flex-nowrap gap-4">
        <div
          v-for="category in categories"
          :key="category.name"
          class="w-full lg:w-1/3"
        >
          <div class="bg-gray-100 dark:bg-gray-800 h-full p-5 lg:py-2">
            <div class="flex items-center gap-4">
              <svg-icon
                :name="category.iconName"
                class="size-20 lg:size-12 lg:order-last"
                original
              />
              <div>
                <h3>{{ category.name }}</h3>
                <p
                  class="text-base leading-1 lg:text-sm text-gray-500 dark:text-gray-400 max-w-[90%]"
                >
                  {{ category.subtitle }}
                </p>
              </div>
            </div>

            <div
              class="flex items-center my-4"
              v-for="item in category.items"
              :key="item.id"
            >
              <div
                v-if="item.additional"
                class="w-20 h-10 flex items-center justify-center pr-2 mr-3 bg-white dark:bg-gray-700 [clip-path:polygon(79%_0,100%_50%,80%_100%,0_100%,0_0)] text-base font-bold text-primary"
              >
                {{ item.additional }}
              </div>

              <div>
                <div class="flex items-center text-lg font-bold">
                  <span>{{ item.time }}&nbsp;</span>
                  <span class="text-primary">{{ item.price }}</span>

                  <div
                    v-if="item.info"
                    class="relative ml-3 cursor-pointer group"
                  >
                    <svg-icon name="info" class="size-5" />
                    <div
                      class="absolute hidden z-[9999999] lg:text-sm group-hover:block bg-gray-900 text-white rounded w-80 px-4 py-2 text-base font-normal bottom-full mb-2 left-1/2 -translate-x-1/2 before:content-[''] before:absolute before:-bottom-[5px] before:size-3 before:bg-inherit before:left-1/2 before:-translate-x-1/2 before:rotate-45"
                    >
                      {{ item.info }}
                    </div>
                  </div>
                </div>

                <p class="text-gray-500 dark:text-gray-400 lg:text-sm">
                  {{ item.description }}
                </p>
              </div>
            </div>

            <p class="lg:hidden my-5 text-gray-600 dark:text-gray-200">
              {{ category.undertext }}
            </p>

            <AppButton
              v-if="mobile || tablet"
              variant="primary"
              size="lg"
              class="w-full"
              @click="openForm(category)"
            >
              {{ $t("price.orderButton") }}
            </AppButton>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <AppButton
          variant="primary"
          size="lg"
          class="mt-12"
          @click="navigateToInfo('flat_move')"
        >
          {{ $t("price.examplesButton") }}
          <svg-icon name="arrow-next" class="size-4 ml-2" />
        </AppButton>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import AppButton from "../../../../components/ui/Button/app-button.vue";

export default {
  name: "AppPageMainSectionPrice",
  components: {
    AppButton,
  },
  props: {
    active: Boolean,
    mobile: Boolean,
    tablet: Boolean,
  },
  computed: {
    categories2() {
      return [
        {
          iconName: "icon_1",
          parts: [
            {
              type: "link",
              text: this.$t("price.desktopSubtitle1"),
              route: "auto",
            },
            {
              type: "text",
              text: this.$t("price.desktopSubtitle2"),
            },
          ],
        },
        {
          iconName: "icon_2",
          parts: [
            {
              type: "text",
              text: this.$t("price.desktopSubtitle3"),
            },
            {
              type: "link",
              text: this.$t("price.desktopSubtitle4"),
              route: "specialists",
            },
          ],
        },
        {
          iconName: "icon_3",
          parts: [
            {
              type: "text",
              text: this.$t("price.desktopSubtitle5"),
            },
            {
              type: "link",
              text: this.$t("price.desktopSubtitle6"),
              route: "package",
            },
          ],
        },
      ];
    },
    categories() {
      return [
        {
          name: this.$t("price.categoryTransport"),
          subtitle: this.$t("price.categoryTransportSubtitle"),
          undertext: this.$t("price.categoryTransportUndertext"),
          iconName: "price_transport",
          route: "auto",
          opened: false,
          items: [
            {
              id: 1,
              time: this.$t("price.categoryTransportItem1Time"),
              price: this.$t("price.categoryTransportItem1Price"),
              description: this.$t("price.categoryTransportItem1Desc"),
              info: this.$t("price.categoryTransportItem1Info"),
            },
            {
              id: 2,
              time: this.$t("price.categoryTransportItem2Time"),
              price: this.$t("price.categoryTransportItem2Price"),
              description: this.$t("price.categoryTransportItem2Desc"),
            },
          ],
        },
        {
          name: this.$t("price.categoryMove"),
          subtitle: this.$t("price.categoryMoveSubtitle"),
          undertext: this.$t("price.categoryMoveUndertext"),
          iconName: "price_moving",
          route: "flat_move",
          opened: false,
          items: [
            {
              id: 1,
              time: this.$t("price.categoryMoveItem1Time"),
              price: this.$t("price.categoryMoveItem1Price"),
              description: this.$t("price.categoryMoveItem1Desc"),
              additional: this.$t("price.categoryMoveItem1Additional"),
              info: this.$t("price.categoryMoveItem1Info"),
            },
            {
              id: 2,
              time: this.$t("price.categoryMoveItem2Time"),
              price: this.$t("price.categoryMoveItem2Price"),
              description: this.$t("price.categoryMoveItem2Desc"),
              additional: this.$t("price.categoryMoveItem2Additional"),
            },
          ],
        },
        {
          name: this.$t("price.categoryWorkers"),
          subtitle: this.$t("price.categoryWorkersSubtitle"),
          undertext: this.$t("price.categoryWorkersUndertext"),
          iconName: "price_workers",
          route: "specialists",
          opened: false,
          items: [
            {
              id: 1,
              time: this.$t("price.categoryWorkersItem1Time"),
              price: this.$t("price.categoryWorkersItem1Price"),
              description: this.$t("price.categoryWorkersItem1Desc"),
              info: this.$t("price.categoryWorkersItem1Info"),
            },
            {
              id: 2,
              time: this.$t("price.categoryWorkersItem2Time"),
              price: this.$t("price.categoryWorkersItem2Price"),
            },
          ],
        },
      ];
    },
  },
  methods: {
    getInfoRoute(route) {
      const locale = this.$i18n?.locale || "ua";
      return `/${locale}/info/${route}`;
    },
    navigateToInfo(route) {
      const locale = this.$i18n?.locale || "ua";
      if (this.$router) {
        this.$router.push(`/${locale}/info/${route}`);
      }
    },
    handleCloseFullSize(e) {
      e.opened = false;
      document.body.classList.remove("modal-open");
    },

    handleOpenFullSize(e) {
      e.opened = true;
      document.body.classList.add("modal-open");
    },

    openForm(e) {
      this.handleOpenFullSize(e);
      e.opened = false;
      this.$eventbus.$emit("openFormModal");
    },
  },
};
</script>

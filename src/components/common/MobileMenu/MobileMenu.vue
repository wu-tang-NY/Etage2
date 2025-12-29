<template>
  <div
    class="bg-light dark:bg-dark fixed left-0 top-0 bottom-0 py-4 w-full lg:translate-x-0 pt-4 box-border overflow-y-scroll z-[999] transition-transform duration-300 lg:relative"
    :class="{
      'translate-none': navOpen,
      '-translate-x-full': !navOpen,
      'pt-[90px]': showDecorations,
    }"
  >
    <div class="container mx-auto h-full pt-6">
      <div class="flex flex-col h-full">
        <div class="flex flex-col flex-1 flex-auto">
          <ul class="list-none -mx-4 p-0">
            <li class="mt-6 first:mt-0">
              <div
                class="bg-gray-200 dark:bg-gray-700 [clip-path:polygon(0_0,calc(100%_-_20px)_0,100%_100%,0%_100%)] max-w-[300px] flex items-center h-9 px-[35px] pl-4 font-bold"
              >
                <span>{{ $t("common.menu") }}</span>
              </div>

              <div class="pt-4 px-4 max-w-[300px] -ml-4">
                <LayoutMainNav @close="$emit('close')" />
              </div>
            </li>
          </ul>

          <div class="flex flex-col mt-8 flex-1 lg:hidden">
            <ul class="list-none -mx-4 p-0">
              <li class="mt-6 first:mt-0">
                <div
                  class="bg-gray-200 dark:bg-gray-700 [clip-path:polygon(0_0,calc(100%_-_20px)_0,100%_100%,0%_100%)] max-w-[300px] flex items-center h-9 px-[35px] pl-4 font-bold"
                >
                  <span>{{ $t("common.contacts") }}</span>
                  <div class="ml-auto">
                    <AppCallback />
                  </div>
                </div>

                <div class="pt-4 px-4">
                  <AppPhones />
                </div>
              </li>

              <li class="mt-6 first:mt-0">
                <div
                  class="bg-gray-200 dark:bg-gray-700 [clip-path:polygon(0_0,calc(100%_-_20px)_0,100%_100%,0%_100%)] max-w-[300px] flex items-center h-9 px-[35px] pl-4 font-bold"
                >
                  <span>{{ $t("common.schedule") }}</span>
                </div>

                <div class="pt-4 px-4">
                  <app-schedule without-label />
                </div>
              </li>
            </ul>

            <LayoutMainFooter class="mt-auto pt-10" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutMainFooter from "@/layouts/main/components/LayoutMainFooter.vue";
import LayoutMainNav from "@/layouts/main/components/LayoutMainNav.vue";
import AppCallback from "@/components/common/Callback/app-callback.vue";
import AppPhones from "@/components/common/Phones/app-phones.vue";

export default {
  name: "MobileMenu",
  components: {
    LayoutMainFooter,
    LayoutMainNav,
    AppCallback,
    AppPhones,
  },
  emits: ["close"],
  props: {
    navOpen: {
      type: Boolean,
      default: false,
    },
    showDecorations: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

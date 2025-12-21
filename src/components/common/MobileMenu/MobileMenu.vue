<template>
  <div
    class="bg-light dark:bg-dark fixed left-0 top-0 bottom-0 py-4 w-full lg:translate-x-0 pt-4 box-border overflow-y-scroll z-[999] transition-all duration-300 lg:relative"
    :class="{
      'translate-none': navOpen,
      '-translate-x-full': !navOpen,
      'pt-[60px]': showDecorations,
    }"
  >
    <div class="container h-full">
      <div class="nav-wrapper__inner">
        <div class="nav-wrapper__container">
          <ul class="nav-wrapper__blocks nav-wrapper__menu">
            <li class="nav-wrapper__block nav-block">
              <div class="nav-block__title">
                <span>{{ $t("common.menu") }}</span>
              </div>

              <div class="nav-block__content max-w-[300px]">
                <LayoutMainNav @close="$emit('close')" />
              </div>
            </li>
          </ul>

          <div class="flex flex-col flex-1 lg:hidden">
            <ul class="nav-wrapper__blocks">
              <li class="nav-wrapper__block nav-block">
                <div class="nav-block__title">
                  <span>{{ $t("common.contacts") }}</span>
                  <div class="ml-auto">
                    <AppCallback />
                  </div>
                </div>

                <div class="nav-block__content">
                  <AppPhones />
                </div>
              </li>

              <li class="nav-wrapper__block nav-block">
                <div class="nav-block__title">
                  <span>{{ $t("common.schedule") }}</span>
                </div>

                <div class="nav-block__content">
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

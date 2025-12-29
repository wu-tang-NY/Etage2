<template>
  <ClientOnly>
    <div>
      <h1 class="mt-5 lg:mt-10 mb-4 lg:mb-10">
        {{ $t("services.title") }}
        <br v-if="!mobile && !tablet" />
        <span class="text-primary">{{ $t("services.titleSpan") }}</span>
        {{ $t("services.titleEnd") }}
      </h1>

      <div
        class="text-gray-400 mb-4 lg:mb-8 font-medium text-lg leading-[1.75] max-w-full lg:max-w-[680px]"
      >
        {{ $t("services.subtitle1") }}
        <span class="text-gray-900 dark:text-gray-400 font-extrabold">{{
          $t("services.subtitle1Span")
        }}</span
        >{{ $t("services.subtitle1Middle") }}
        <span class="text-gray-900 dark:text-gray-400 font-extrabold">{{
          $t("services.subtitle1Span2")
        }}</span
        >{{ $t("services.subtitle1End") }}
      </div>

      <div
        class="mb-4 lg:mb-8 font-medium text-lg leading-[1.75] max-w-full lg:max-w-[680px]"
      >
        {{ $t("services.subtitle2") }}
        <a href="" class="link" @click.prevent="modalCallbackOpen = true">{{
          $t("services.subtitle2Link")
        }}</a
        >{{ $t("services.subtitle2End") }}
      </div>

      <callback-modal v-model="modalCallbackOpen" />
    </div>
  </ClientOnly>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "AppPageMainSectionServices",
  components: {
    CallbackModal: defineAsyncComponent(() =>
      import("@/components/common/Callback/app-callback-modal")
    ),
  },
  props: {
    active: {
      type: Boolean,
    },
    mobile: Boolean,
    tablet: Boolean,
  },
  data: () => ({
    modalCallbackOpen: false,
  }),
};
</script>

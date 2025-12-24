<template>
  <ClientOnly>
    <div class="services pt-10 lg:pt-0">
      <h1 class="mt-5 mb-[10px] lg:mb-[50px]">
        {{ $t("services.title") }}
        <br v-if="!mobile && !tablet" />
        <span class="text-primary">{{ $t("services.titleSpan") }}</span>
        {{ $t("services.titleEnd") }}
      </h1>

      <div
        class="subtitle light-gray mb-[10px] lg:mb-8 font-medium text-lg leading-[1.75] max-w-full lg:max-w-[680px]"
      >
        {{ $t("services.subtitle1") }}
        <span class="text-[var(--colors-text-primary)] font-extrabold">{{
          $t("services.subtitle1Span")
        }}</span
        >{{ $t("services.subtitle1Middle") }}
        <span class="text-[var(--colors-text-primary)] font-extrabold">{{
          $t("services.subtitle1Span2")
        }}</span
        >{{ $t("services.subtitle1End") }}
      </div>

      <div
        class="subtitle dark-gray mb-[10px] lg:mb-8 font-medium text-lg leading-[1.75] max-w-full lg:max-w-[680px]"
      >
        {{ $t("services.subtitle2") }}
        <a href="" @click.prevent="modalCallbackOpen = true">{{
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

// Lazy load CallbackModal - only loads when services section is active or modal is opened
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

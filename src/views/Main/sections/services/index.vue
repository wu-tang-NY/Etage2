<template>
  <ClientOnly>
    <div class="services">
      <h1>
        {{ $t("services.title") }}
        <br v-if="!mobile && !tablet" />
        <span>{{ $t("services.titleSpan") }}</span>
        {{ $t("services.titleEnd") }}
      </h1>

      <div class="subtitle light-gray">
        {{ $t("services.subtitle1") }}
        <span>{{ $t("services.subtitle1Span") }}</span
        >{{ $t("services.subtitle1Middle") }}
        <span>{{ $t("services.subtitle1Span2") }}</span
        >{{ $t("services.subtitle1End") }}
      </div>

      <div class="subtitle dark-gray">
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

<style lang="scss">
.services {
  h1 {
    margin-top: 20px;
    margin-bottom: 50px;

    span {
      color: var(--colors-accent);
    }
  }

  .subtitle {
    margin-bottom: 30px;
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 1.75;
    max-width: 680px;

    span {
      color: var(--colors-text-primary);
      font-weight: 800;
    }
  }

  &__bg {
    width: 100%;
    margin-top: 10px;
  }
}

@media screen and (min-width: 993px) and (max-height: 890px) {
  .services {
    padding-top: 30px;
  }
}

@media screen and (min-width: 993px) and (max-height: 730px) {
  .services {
    padding-top: 70px;
  }
}

@media screen and (max-width: 992px) {
  .services {
    padding-top: 40px;

    h1 {
      margin-bottom: 10px;
    }

    .subtitle {
      max-width: 100%;
      margin-bottom: 10px;
    }
  }
}
</style>

<template>
  <div class="services">
    <!-- <svg-icon name="mobile_bg" original v-if="mobile || tablet" class="services__bg" /> -->
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
</template>

<script>
import CallbackModal from '@/components/common/Callback/app-callback-modal';

export default {
  name: 'AppPageMainSectionServices',
  components: {
    CallbackModal,
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
  padding-top: 70px;

  h1 {
    margin-bottom: 32px;

    span {
      color: var(--colors-accent);
    }
  }

  .subtitle {
    margin-bottom: 20px;
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

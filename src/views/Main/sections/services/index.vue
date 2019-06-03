<template>
  <div class="services">
    <!-- <svg-icon name="mobile_bg" original v-if="mobile || tablet" class="services__bg" /> -->
    <h1>Переезжайте и перевозите легко,
      <br v-if="(!mobile && !tablet)">
      <span>все заботы</span>
      мы берем на себя!
    </h1>

    <div class="subtitle light-gray">
      «Этаж» - первый современный
      <span>сервис грузоперевозок</span>, главными ценностями которого являются
      не только имущество заказчика, но также его <span>время и комфорт</span>. Независимо от масштабов грузоперевозки
      или переезда - с нами все легко, своевременно и беззаботно.
    </div>

    <div class="subtitle dark-gray">
      Если это то, чего вы хотите, мы будем рады <a href="" @click.prevent="modalCallbackOpen = true">перезвонить вам</a>  уже сейчас.
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
      color: $colors-accent;
    }
  }

  .subtitle {
    margin-bottom: 20px;
    max-width: 680px;

    span {
      color: $colors-accent;
    }
  }

  &__bg {
    width: 100%;
    margin-top: 10px;
  }
}

@media screen and (min-width: 993px) and (max-height: 920px) {
  .services {
    padding-top: 30px;
  }
}

@media screen and (min-width: 993px) and (max-height: 760px) {
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

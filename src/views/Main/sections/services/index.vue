<template>
  <div class="services">
    <h1>Переезжайте и перевозите легко,
      <br v-if="!isMobile">
      все заботы мы берем на себя!
    </h1>

    <div class="subtitle light-gray">
      «Этаж» - первый современный сервис грузоперевозок, главными ценностями которого являются
      не только имущество заказчика, но также его время и комфорт. Независимо от масштабов грузоперевозки
      или переезда - с нами все легко, своевременно и беззаботно.
    </div>

    <div class="subtitle dark-gray">
      Если это то, чего вы хотите, мы будем рады <a href="" @click.prevent="modalCallbackOpen = true">перезвонить вам</a>  уже сейчас.
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
  },
  data: () => ({
    modalCallbackOpen: false,
  }),
  computed: {
    isMobile() {
      return window.innerWidth < 993;
    },
  },
};
</script>

<style lang="scss">
.services {
  padding-top: 70px;

  h1 {
    margin-bottom: 32px;
  }

  .subtitle {
    margin-bottom: 20px;
    max-width: 680px;
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

<template>
  <div class="services">
    <h1>Переезжайте и перевозите легко,
      <br>
      все заботы мы берем на себя!
    </h1>

    <div class="subtitle light-gray">
      «Этаж» - первый современный сервис грузоперевозок, главными ценностями которого являются
      не только имущество заказчика, но также его время и комфорт. Независимо от масштабов грузоперевозки
      или переезда - с нами все легко, своевременно и беззаботно.
    </div>

    <div class="subtitle dark-gray">
      Если это то, чего вы хотите, мы будем рады <a href="#">перезвонить вам</a>  уже сейчас.
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppPageMainSectionServices',
  props: {
    active: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss">
.services {
  padding-top: 60px;

  h1 {
    margin-bottom: 32px;
  }

  .subtitle {
    margin-bottom: 20px;
    max-width: 680px;
  }
}

@media screen and (max-width: 576px) {
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

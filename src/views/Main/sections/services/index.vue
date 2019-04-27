<template>
  <section-container>
    <section class="services">
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
    </section>
  </section-container>
</template>

<script>
import SectionContainer from '../../components/PageMainSectionContainer';

export default {
  name: 'AppPageMainSectionServices',
  components: {
    SectionContainer,
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
</style>

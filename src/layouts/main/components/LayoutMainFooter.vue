<template>
  <footer class="app-footer">
    <div class="container">
      <div class="app-footer__inner">
        <div class="app-copyright">
          &copy; 2019 Etage. All Rights Reserved.
        </div>
        <div class="app-social">
          <a href="https://instagram.com/etage_odessa" class="app-social__link" target="_blank">
            <svg-icon name="icon_in" original/>
          </a>
          <a href="https://www.facebook.com/Грузоперевозки-Этаж-528673617657091/" class="app-social__link" target="_blank">
            <svg-icon name="icon_fb" original/>
          </a>
        </div>
        <div class="app-designedby">
          <span class="app-designedby__text">Handcrafted by:</span>
          <a href="http://weralls.com" target="_blank" class="app-designedby__icon">
            <svg-icon name="logo_weralls" original />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'LayoutMainFooter',
};
</script>

<style lang="scss">
.app-footer__inner {
  justify-content: space-between;
}

.app-social {
  display: flex;
  align-items: center;

  &__link {
    & + & {
      margin-left: 15px;
    }

    svg {
      @include size(24px);
    }
  }
}

@media screen  and (max-width: 992px) {
  .app-social {
    margin-left: 20px;
    margin-bottom: 20px;

    &__link {
      svg {
        @include size(30px);
      }
    }
  }
}
</style>

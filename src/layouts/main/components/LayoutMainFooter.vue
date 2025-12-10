<template>
  <ClientOnly>
    <footer class="app-footer">
      <div class="container">
        <div class="app-footer__inner">
          <div class="app-copyright">
            {{ $t("footer.copyright") }}
          </div>
          <div class="app-social">
            <a
              href="https://instagram.com/etage.com.ua/"
              class="app-social__link"
              target="_blank"
            >
              <svg-icon name="icon_in" original />
            </a>
            <a
              href="https://www.facebook.com/groups/2522732927949314/?ref=share_group_link"
              class="app-social__link"
              target="_blank"
            >
              <svg-icon name="icon_fb" original />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </ClientOnly>
</template>

<script>
export default {
  name: "LayoutMainFooter"
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

@media screen and (max-width: 992px) {
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

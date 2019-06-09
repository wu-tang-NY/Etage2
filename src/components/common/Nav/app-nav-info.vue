<template>
  <div class="nav-info">
    <svg-icon name="icon_5_c" original/>
    Информация
  </div>
</template>

<script>
export default {
  name: 'AppNavInfo',
  methods: {
    openModal() {
      this.$eventbus.$emit('openPopup', 'PopupContentAboutUs');
      document.body.classList.remove('modal-open');
    },
  },
};
</script>

<style lang="scss">
.nav-info {
  display: inline-flex;
  align-items: center;
  font-size: rem(14);
  font-weight: bold;
  letter-spacing: 0.3px;
  color: $colors-text--primary;
  cursor: pointer;

  svg {
    @include size(20px);
    margin-right: 13px;
  }
}

@media screen and (min-width: 993px) and (max-height: 730px) {
  .nav-info {
    height: 36px;
    padding-left: 24px;
  }
}

@media screen and (max-width: 992px) {
  .nav-info {
    height: 36px;
    padding-left: 24px;
    font-weight: 600;
  }
}
</style>

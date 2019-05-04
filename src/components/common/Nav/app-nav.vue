<template functional>
  <nav class="app-nav">
    <div class="app-nav__inner">
      <ul class="app-nav__list">
        <slot></slot>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNav',
};
</script>

<style lang="scss">
.app-nav {
  position: relative;

  &::before {
    content: '';
    background-image: linear-gradient(to right, #e6e6e6, rgba(230, 230, 230, 0));
    @include size(100%, 2px);
    position: absolute;
    bottom: 0; left: 0;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  & .nav-item:first-child {
    .nav-item {
      &__link {
        padding-left: 12px;
      }

      &__bg {
        clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0% 100%);
      }
    }
  }
}
</style>

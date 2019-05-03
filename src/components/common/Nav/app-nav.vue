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
    @include absolute(100%, 0);
  }

  &__inner {
    overflow: hidden;
  }

  &__list {
    list-style: none;
    margin: 0 0 0 -9px;
    padding: 0;
  }
}
</style>

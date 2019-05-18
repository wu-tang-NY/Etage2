<template>
  <div id="app">
    <router-view/>


    <transition name="modal">
      <portal-target name="modal" slim />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
  .modal {
    &-enter,
    &-leave-to {
      opacity: 0;
    }

    &-enter-active,
    &-leave-active {
      transition: .25s ease-in-out;
    }
  }
</style>

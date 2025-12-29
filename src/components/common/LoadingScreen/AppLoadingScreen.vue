<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isLoading"
        class="app-loading-screen flex items-center justify-center bg-dark fixed top-0 left-0 size-full z-[9999999]"
      >
        <span
          class="loader inline-block size-12 relative rotate-45 before:animate-animloader after:animate-animloader2"
        ></span>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  name: "AppLoadingScreen",
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 0);
  },
};
</script>

<style lang="scss" scoped>
.loader::before {
  content: "";
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  position: absolute;
  left: 0;
  top: -24px;
}
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  background: #fff;
}
</style>

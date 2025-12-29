<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isLoading"
        class="app-loading-screen flex items-center justify-center bg-dark fixed top-0 left-0 size-full z-[9999999]"
      >
        <span
          class="loader inline-block size-12 relative rotate-45 before:content-[''] before:box-border before:w-6 before:h-6 before:absolute before:left-0 before:-top-6 before:animate-animloader after:content-[''] after:box-border after:absolute after:left-0 after:top-0 after:w-6 after:h-6 after:bg-white after:animate-animloader2"
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

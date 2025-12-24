<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isLoading"
        class="app-loading-screen flex items-center justify-center bg-dark fixed top-0 left-0 size-full z-[9999999]"
      >
        <span class="loader inline-block size-12 relative rotate-45"></span>
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
  animation: animloader 4s ease infinite;
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
  animation: animloader2 2s ease infinite;
}

@keyframes animloader {
  0% {
    box-shadow: 0 24px rgba(255, 255, 255, 0), 24px 24px rgba(255, 255, 255, 0),
      24px 48px rgba(255, 255, 255, 0), 0px 48px rgba(255, 255, 255, 0);
  }
  12% {
    box-shadow: 0 24px white, 24px 24px rgba(255, 255, 255, 0),
      24px 48px rgba(255, 255, 255, 0), 0px 48px rgba(255, 255, 255, 0);
  }
  25% {
    box-shadow: 0 24px white, 24px 24px white, 24px 48px rgba(255, 255, 255, 0),
      0px 48px rgba(255, 255, 255, 0);
  }
  37% {
    box-shadow: 0 24px white, 24px 24px white, 24px 48px white,
      0px 48px rgba(255, 255, 255, 0);
  }
  50% {
    box-shadow: 0 24px white, 24px 24px white, 24px 48px white, 0px 48px white;
  }
  62% {
    box-shadow: 0 24px rgba(255, 255, 255, 0), 24px 24px white, 24px 48px white,
      0px 48px white;
  }
  75% {
    box-shadow: 0 24px rgba(255, 255, 255, 0), 24px 24px rgba(255, 255, 255, 0),
      24px 48px white, 0px 48px white;
  }
  87% {
    box-shadow: 0 24px rgba(255, 255, 255, 0), 24px 24px rgba(255, 255, 255, 0),
      24px 48px rgba(255, 255, 255, 0), 0px 48px white;
  }
  100% {
    box-shadow: 0 24px rgba(255, 255, 255, 0), 24px 24px rgba(255, 255, 255, 0),
      24px 48px rgba(255, 255, 255, 0), 0px 48px rgba(255, 255, 255, 0);
  }
}

@keyframes animloader2 {
  0% {
    transform: translate(0, 0) rotateX(0) rotateY(0);
  }
  25% {
    transform: translate(100%, 0) rotateX(0) rotateY(180deg);
  }
  50% {
    transform: translate(100%, 100%) rotateX(-180deg) rotateY(180deg);
  }
  75% {
    transform: translate(0, 100%) rotateX(-180deg) rotateY(360deg);
  }
  100% {
    transform: translate(0, 0) rotateX(0) rotateY(360deg);
  }
}
</style>

<template>
  <div>
    <!-- Modal is teleported to body, this wrapper ensures stable root element for transitions -->
    <ClientOnly>
      <Teleport to="body">
        <div
          v-if="show"
          class="modal"
          tabindex="-1"
          role="dialog"
          @click.self="handleCloseModal"
        >
          <div :class="modalDialogClasses" role="document">
            <div class="modal-content" v-if="show">
              <div class="modal-header" v-if="title">
                <h5 class="modal-title">{{ title }}</h5>

                <AppButton :icon="true" @click="handleCloseModal">
                  <svg
                    class="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    /></svg
                ></AppButton>
              </div>

              <div class="modal-body">
                <slot></slot>
              </div>

              <div class="modal-footer" v-if="$slots.footer">
                <slot name="footer"></slot>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script>
import AppButton from "../Button/app-button.vue";

export default {
  name: "AppModal",
  props: {
    show: {
      type: Boolean,
    },
    title: String,
    small: Boolean,
    large: Boolean,
    centered: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:show", "input"],
  data() {
    return {
      scrollPosition: 0,
    };
  },
  watch: {
    show(value) {
      if (typeof document === "undefined") return;
      const className = "modal-open";
      if (value) {
        // Save current scroll position
        this.scrollPosition =
          window.pageYOffset || document.documentElement.scrollTop;
        // Apply modal-open class and block scrolling
        document.body.classList.add(className);
        document.body.style.top = `-${this.scrollPosition}px`;
      } else {
        // Remove modal-open class and restore scroll position
        document.body.classList.remove(className);
        document.body.style.top = "";
        window.scrollTo(0, this.scrollPosition);
      }
    },
  },
  computed: {
    modalDialogClasses() {
      return {
        "modal-dialog": true,
        "modal-dialog-sm": this.small,
        "modal-dialog-lg": this.large,
        "modal-dialog-centered": this.centered,
      };
    },
  },
  methods: {
    handleCloseModal() {
      this.$emit("update:show", false);
      this.$emit("input", false);
    },
  },
  beforeUnmount() {
    // Cleanup: remove modal-open class if component is destroyed while modal is open
    if (typeof document !== "undefined" && this.show) {
      document.body.classList.remove("modal-open");
      document.body.style.top = "";
      window.scrollTo(0, this.scrollPosition);
    }
  },
};
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  &-dialog {
    position: relative;
    width: auto;
    margin: 0.5rem;
    pointer-events: none;
    display: flex;
    align-items: center;
    min-height: calc(100% - 1rem);

    &-centered {
      display: flex;
      align-items: center;
      min-height: calc(100% - 1rem);
    }

    &-sm {
      max-width: 300px;
    }

    &-lg {
      max-width: 800px;
    }
  }

  &-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 400px;
    pointer-events: auto;
    background-color: var(--white);
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    outline: 0;
  }

  &-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-top-left-radius: calc(0.3rem - 1px);
    border-top-right-radius: calc(0.3rem - 1px);
    align-items: center;
  }

  &-body {
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
  }

  &-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom-right-radius: calc(0.3rem - 1px);
    border-bottom-left-radius: calc(0.3rem - 1px);
  }

  &-title {
    font-size: rem(20);
    font-weight: 900;
  }

  .welcome-block {
    text-align: center;

    .svg-icon {
      width: 36px;
      height: 36px;
      margin-bottom: 12px;
    }

    .btn {
      margin-top: 24px;
    }
  }
}

@include media-breakpoint-up(lg) {
  .modal-open {
    padding-right: var(--scrollbar-width, 0px);
  }
}

@include media-breakpoint-down(sm) {
  .modal {
    overflow: hidden;
    height: 100vh;
    &-dialog {
      background-color: var(--white);
      margin: 0;
      height: 100%;
      width: 100%;
      align-items: flex-start;
    }

    .btn {
      margin-bottom: 40px;
    }

    &-content {
      border: none;
      width: 100%;
      height: 100vh;
      overflow: auto;
    }
  }

  // Add padding-top when New Year decorations are active
  body.has-christmas-lights .modal-content {
    padding-top: 25px;
  }
}
</style>

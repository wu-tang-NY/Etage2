<template>
  <div>
    <!-- Modal is teleported to body, this wrapper ensures stable root element for transitions -->
    <ClientOnly>
      <Teleport to="body">
        <div
          v-if="show"
          class="fixed top-0 left-0 z-[1000] w-full h-full overflow-x-hidden overflow-y-auto outline-0 bg-black/50 flex items-center justify-center max-sm:overflow-hidden max-sm:h-screen"
          tabindex="-1"
          role="dialog"
          @click.self="handleCloseModal"
        >
          <div
            :class="[
              'relative w-auto m-2 pointer-events-none flex items-center min-h-[calc(100%-1rem)]',
              'max-sm:bg-white max-sm:m-0 max-sm:h-full max-sm:w-full max-sm:items-start',
              {
                'max-w-[300px]': small,
                'max-w-[800px]': large,
              },
              centered && 'flex items-center min-h-[calc(100%-1rem)]',
            ]"
            role="document"
          >
            <div
              class="modal-content relative flex flex-col w-[400px] pointer-events-auto bg-white bg-clip-padding border border-black/20 rounded outline-0 max-sm:border-0 max-sm:w-full max-sm:h-screen max-sm:overflow-auto"
              v-if="show"
            >
              <div class="flex justify-between p-4">
                <div v-if="title">
                  <h5 class="text-xl font-black">{{ title }}</h5>

                  <div v-if="subtitle" class="text-sm text-gray-500">
                    {{ subtitle }}
                  </div>
                </div>

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

              <div class="relative flex-1 p-4">
                <slot></slot>
              </div>

              <div
                class="flex items-center justify-end p-4 border-t border-black/10"
                v-if="$slots.footer"
              >
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
    subtitle: String,
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
        document.body.classList.add(className);
      } else {
        document.body.classList.remove(className);
      }
    },
  },
  computed: {},
  methods: {
    handleCloseModal() {
      this.$emit("update:show", false);
      this.$emit("input", false);
    },
  },
  beforeUnmount() {
    if (typeof document !== "undefined" && this.show) {
      document.body.classList.remove("modal-open");
    }
  },
};
</script>

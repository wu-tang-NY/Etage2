<template>
  <AppButton :icon="true" class="relative focus:outline-none rounded">
    <div
      class="block w-4 left-1/2 absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <span
        class="block absolute h-0.5 w-full text-gray-800 dark:text-white bg-current transform transition duration-500 ease-in-out"
        :class="{ 'rotate-45': open, ' -translate-y-1.5': !open }"
      ></span>
      <span
        class="block absolute h-0.5 w-3 text-gray-800 dark:text-white bg-current transform transition duration-500 ease-in-out"
        :class="{ 'opacity-0': open }"
      ></span>
      <span
        class="block absolute h-0.5 w-full text-gray-800 dark:text-white bg-current transform transition duration-500 ease-in-out"
        :class="{ '-rotate-45': open, ' translate-y-1.5': !open }"
      ></span>
    </div>
  </AppButton>
</template>

<script>
import AppButton from "@/components/ui/Button/app-button.vue";
export default {
  name: "MenuToggle",
  components: {
    AppButton,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

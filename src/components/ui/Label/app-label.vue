<template>
  <label
    v-if="label"
    class="font-bold text-[13px] leading-[2] cursor-pointer"
    :for="forAttr"
  >
    {{ label }}
  </label>
</template>

<script>
export default {
  name: "AppLabel",
  props: {
    label: {
      type: String,
      default: "",
    },
    forAttr: {
      type: String,
      default: "",
    },
  },
};
</script>

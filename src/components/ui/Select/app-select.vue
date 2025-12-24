<template>
  <div class="w-full inline-block mb-5">
    <app-label :label="label" />

    <div class="group relative overflow-hidden w-full">
      <select
        ref="select"
        class="border-0 border-b bg-transparent w-full text-sm leading-normal py-2 px-0 outline-none active:outline-none hover:outline-none focus:border-primary cursor-text transition-all duration-300 ease-in-out dark:border-gray-700 dark:placeholder:text-gray-400"
        :value="selectValue"
        @change="handleChange"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option v-for="(option, index) in options" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppSelect",
  props: {
    options: Array,
    modelValue: null,
    // Backward compatibility
    value: null,
    label: String,
    placeholder: String,
  },
  emits: ["update:modelValue", "input"],
  computed: {
    selectValue: {
      get() {
        return this.modelValue !== undefined ? this.modelValue : this.value;
      },
      set(val) {
        this.$emit("update:modelValue", val);
        this.$emit("input", val);
      },
    },
  },
};
</script>

<template>
  <ClientOnly>
    <div class="w-full inline-block mb-5">
      <app-label :label="label" :forAttr="inputId" />

      <div class="group relative overflow-hidden w-full flex">
        <textarea
          :id="inputId"
          class="border-0 border-b bg-transparent w-full text-sm leading-normal py-2 px-0 outline-none active:outline-none hover:outline-none focus:border-primary cursor-text transition-all duration-300 ease-in-out dark:border-gray-700 dark:placeholder:text-gray-400 h-20 resize-none"
          :value="textareaValue"
          :placeholder="placeholder"
          @input="textareaValue = $event.target.value"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: "AppTextarea",
  props: {
    label: {
      type: String,
    },

    placeholder: {
      type: String,
    },

    modelValue: {
      required: false,
    },
    // Backward compatibility
    value: {
      required: false,
    },
    id: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "input"],
  data() {
    return {
      generatedId: `textarea-${Math.random().toString(36).slice(2, 11)}`,
    };
  },
  computed: {
    inputId() {
      return this.id || this.generatedId;
    },
    textareaValue: {
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

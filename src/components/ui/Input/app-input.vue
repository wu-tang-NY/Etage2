<template>
  <ClientOnly>
    <div class="w-full inline-block mb-5">
      <app-label :label="label" :forAttr="inputId" />

      <div class="group relative overflow-hidden w-full">
        <input
          :id="inputId"
          ref="input"
          class="border-0 border-b bg-transparent w-full text-sm leading-normal py-2 px-0 outline-none active:outline-none hover:outline-none focus:border-primary cursor-text transition-all duration-300 ease-in-out dark:border-gray-700 dark:placeholder:text-gray-400"
          :type="type"
          :value="displayValue"
          :placeholder="placeholder"
          @input="handleInput"
          @keypress="handleKeyPress"
          @keydown="handleKeyDown"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: "AppInput",
  props: {
    label: {
      type: String,
    },

    type: {
      type: String,
    },

    placeholder: {
      type: String,
    },

    requiredField: {
      type: Boolean,
    },

    modelValue: {
      required: false,
    },
    // Backward compatibility
    value: {
      required: false,
    },
    mask: {
      type: String,
      default: "",
    },
    isPhoneInput: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "input"],
  data() {
    return {
      rawValue: "",
      generatedId: `input-${Math.random().toString(36).slice(2, 11)}`,
    };
  },
  computed: {
    inputId() {
      return this.id || this.generatedId;
    },
    inputValue: {
      get() {
        return this.modelValue !== undefined ? this.modelValue : this.value;
      },
      set(val) {
        this.$emit("update:modelValue", val);
        this.$emit("input", val);
      },
    },
    shouldRestrictToNumbers() {
      // Check if it's a phone input via prop or mask pattern
      return this.isPhoneInput || (this.mask && this.mask.includes("#"));
    },
    hasMask() {
      return this.mask && this.mask.length > 0;
    },
    displayValue() {
      if (this.hasMask && this.shouldRestrictToNumbers) {
        return this.applyMask(this.rawValue || this.inputValue || "");
      }
      return this.inputValue || "";
    },
  },
  watch: {
    inputValue: {
      immediate: true,
      handler(newVal) {
        if (this.hasMask && this.shouldRestrictToNumbers) {
          // Extract only numbers from the value
          this.rawValue = (newVal || "").toString().replace(/\D/g, "");
        } else {
          this.rawValue = newVal || "";
        }
      },
    },
  },
  methods: {
    applyMask(value) {
      if (!this.hasMask || !value) return value;

      const numbers = value.toString().replace(/\D/g, "");
      let formatted = "";
      let numberIndex = 0;

      for (
        let i = 0;
        i < this.mask.length && numberIndex < numbers.length;
        i++
      ) {
        if (this.mask[i] === "#") {
          formatted += numbers[numberIndex];
          numberIndex++;
        } else {
          formatted += this.mask[i];
        }
      }

      return formatted;
    },
    getUnmaskedValue(value) {
      if (!this.hasMask || !this.shouldRestrictToNumbers) {
        return value;
      }
      return value.toString().replace(/\D/g, "");
    },
    getCursorPosition(oldValue, newValue, oldCursorPos) {
      // Calculate new cursor position after formatting
      const oldUnmasked = this.getUnmaskedValue(oldValue);
      const newUnmasked = this.getUnmaskedValue(newValue);

      // Count digits before cursor in old value
      let digitsBeforeCursor = 0;
      for (let i = 0; i < oldCursorPos && i < oldValue.length; i++) {
        if (/\d/.test(oldValue[i])) {
          digitsBeforeCursor++;
        }
      }

      // Find position in new formatted value
      let newCursorPos = 0;
      let digitsCounted = 0;

      for (let i = 0; i < newValue.length; i++) {
        if (/\d/.test(newValue[i])) {
          if (digitsCounted < digitsBeforeCursor) {
            digitsCounted++;
            newCursorPos = i + 1;
          } else {
            break;
          }
        } else if (digitsCounted < digitsBeforeCursor) {
          newCursorPos = i + 1;
        }
      }

      return newCursorPos;
    },
    handleKeyDown(event) {
      // Handle backspace/delete to allow proper deletion
      // The input handler will take care of reformatting, we just need to let it happen
      // This is mainly here for future enhancements if needed
    },
    handleKeyPress(event) {
      // Prevent non-numeric input for phone fields
      if (this.shouldRestrictToNumbers) {
        // Allow special keys: backspace, delete, tab, escape, enter, arrow keys
        const allowedKeys = [
          "Backspace",
          "Delete",
          "Tab",
          "Escape",
          "Enter",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Home",
          "End",
        ];

        // Allow Ctrl/Cmd combinations (for copy, paste, select all, etc.)
        if (event.ctrlKey || event.metaKey) {
          return;
        }

        // Check if it's an allowed special key
        if (allowedKeys.includes(event.key)) {
          return;
        }

        // Only allow numeric characters
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }
    },
    handleInput(event) {
      const input = event.target;
      let value = input.value;
      const cursorPos = input.selectionStart;
      const oldFormatted = this.displayValue;

      // If it's a phone input, only allow numbers
      if (this.shouldRestrictToNumbers) {
        // Get the raw numeric value
        const filteredValue = this.getUnmaskedValue(value);

        // Update raw value
        this.rawValue = filteredValue;

        // Apply mask formatting
        const formattedValue = this.hasMask
          ? this.applyMask(filteredValue)
          : filteredValue;

        // Update the input element's display value
        if (input.value !== formattedValue) {
          input.value = formattedValue;
        }

        // Calculate and set cursor position
        // Count how many digits were before the cursor in the old value
        let digitsBeforeCursor = 0;
        for (let i = 0; i < cursorPos && i < value.length; i++) {
          if (/\d/.test(value[i])) {
            digitsBeforeCursor++;
          }
        }

        // Find the position in the new formatted value
        let newCursorPos = 0;
        let digitsCounted = 0;
        for (let i = 0; i < formattedValue.length; i++) {
          if (/\d/.test(formattedValue[i])) {
            digitsCounted++;
            if (digitsCounted <= digitsBeforeCursor) {
              newCursorPos = i + 1;
            } else {
              break;
            }
          } else if (digitsCounted < digitsBeforeCursor) {
            newCursorPos = i + 1;
          }
        }

        this.$nextTick(() => {
          input.setSelectionRange(newCursorPos, newCursorPos);
        });

        // Emit the raw numeric value (without formatting)
        this.inputValue = filteredValue;
      } else {
        this.inputValue = value;
      }
    },
  },
};
</script>

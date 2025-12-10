<template>
  <div class="app-select">
    <label class="app-select__label" v-if="label">
      {{ label }}
    </label>

    <div
      class="app-select__control"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <select
        class="app-select__select"
        :value="selectValue"
        @change="selectValue = $event.target.value"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option v-for="(option, index) in options" :key="index" :value="option">
          {{ option }}
        </option>
      </select>

      <div
        class="app-select__line"
        :class="{ 'app-select__line--active': isFocused || isHovered }"
      ></div>
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
    placeholder: String
  },
  emits: ["update:modelValue", "input"],
  data() {
    return {
      isFocused: false,
      isHovered: false
    };
  },
  computed: {
    selectValue: {
      get() {
        return this.modelValue !== undefined ? this.modelValue : this.value;
      },
      set(val) {
        this.$emit("update:modelValue", val);
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style lang="scss">
.app-select {
  width: 100%;
  display: inline-block;
  margin-bottom: 20px;

  &__label {
    font-weight: 700;
    font-size: rem(13);
    line-height: 2;
    cursor: pointer;
  }

  &__control {
    position: relative;
    width: 100%;

    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid var(--colors-text-primary);
      pointer-events: none;
    }
  }

  &__select {
    width: 100%;
    min-height: 33px;
    height: 33px;
    padding: 4px 40px 4px 0;
    font-size: rem(12);
    line-height: 2;
    letter-spacing: 0.2px;
    color: var(--colors-text-primary);
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--colors-grey-200);
    border-radius: 0;
    appearance: none;
    cursor: pointer;
    outline: none;
  }

  &__line {
    background-color: var(--colors-text-primary);
    position: absolute;
    left: auto;
    right: 0;
    bottom: 0;
    height: 1px;
    width: 0;
    transition: 0.3s ease-in-out;

    &--active {
      width: 100%;
      left: 0;
    }
  }
}
</style>

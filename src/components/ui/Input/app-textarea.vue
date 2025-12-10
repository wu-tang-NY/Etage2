<template>
  <ClientOnly>
    <div class="app-form app-form--textarea">
      <label class="app-form__label" v-if="label">
        {{ label }}
      </label>

      <div class="app-form__control">
        <textarea
          class="app-form__input app-form__input--textarea"
          :value="textareaValue"
          :placeholder="placeholder"
          @input="textareaValue = $event.target.value"
        />

        <div class="app-form__line"></div>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: "AppTextarea",
  props: {
    label: {
      type: String
    },

    placeholder: {
      type: String
    },

    modelValue: {
      required: false
    },
    // Backward compatibility
    value: {
      required: false
    }
  },
  emits: ["update:modelValue", "input"],
  computed: {
    textareaValue: {
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
.app-form {
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
    overflow: hidden;
    width: 100%;
    display: flex;
  }

  &__input {
    border: none;
    border-bottom: 1px solid var(--colors-grey-200);
    background-color: transparent;
    width: 100%;
    font-size: rem(13);
    line-height: 2;
    padding: 4px 0;

    &--textarea {
      height: 80px;
      resize: none;
    }

    &::placeholder {
      color: var(--colors-text-secondary);
    }

    &:hover,
    &:focus,
    &:active {
      outline: none;

      & + .app-form__line {
        width: 100%;
        left: 0;
      }
    }
  }

  &--textarea {
    .app-form__line {
      bottom: 5px;
    }
  }
}
</style>

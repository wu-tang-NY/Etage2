<template>
  <div class="app-form app-form--textarea">
    <label class="app-form__label" v-if="label">
      {{ label }}
    </label>

    <div class="app-form__control">
      <textarea
        class="app-form__input app-form__input--textarea"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
      />

      <div class="app-form__line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTextarea',
  model: {
    prop: 'value',
  },
  props: {
    label: {
      type: String,
    },

    placeholder: {
      type: String,
    },

    value: {
      required: false,
    },
  },
};
</script>

<style lang="scss">
.app-form {
  width: 100%;
  display: inline-block;
  margin-bottom: 20px;

  &__label {
    font-size: rem(12);
    line-height: 2;
    letter-spacing: 0.2px;
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
    border-bottom: 1px solid $colors-grey-200;
    background-color: transparent;
    width: 100%;
    font-size: rem(12);
    line-height: 2;
    letter-spacing: 0.2px;
    padding: 4px 0;

    &--textarea {
      height: 80px;
      resize: none;
    }

    &::placeholder {
      color: $colors-text--secondary;
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

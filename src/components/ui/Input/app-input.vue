<template>
  <div class="app-form" :class="{ 'app-form--required': requiredField }">
    <label class="app-form__label" v-if="label">
      {{ label }}
    </label>

    <div class="app-form__control">
      <input
        class="app-form__input"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
        v-if="!mask"
      />
      <the-mask
        v-else
        class="app-form__input"
        :value="value"
        :mask="mask"
        :type="type"
        :placeholder="placeholder"
        masked
        @input="$emit('input', $event)"
      ></the-mask>

      <div class="app-form__line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  model: {
    prop: 'value',
  },
  props: {
    label: {
      type: String,
    },

    mask: {
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

  &__line {
    background-color: $colors-text--primary;
    position: absolute;
    left: auto;
    right: 0;
    bottom: 0;
    height: 1px;
    width: 0;
    transition: .3s ease-in-out;
  }

  &--required {
    .app-form__input {
      border-color: #FF1E3A;

      &::placeholder {
        color: #FF1E3A;
      }
    }
  }
}
</style>

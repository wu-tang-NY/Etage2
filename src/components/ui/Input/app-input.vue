<template>
  <div class="app-form">
    <label class="app-form__label" v-if="label">
      {{ label }}
    </label>

    <div class="app-form__control">
      <input
        :type="type"
        class="app-form__input"
        :placeholder="placeholder"
      />

      <div class="app-form__line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppInput',
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
  },
};
</script>

<style lang="scss">
.app-form {
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
    min-width: 300px;
  }

  &__input {
    border: none;
    border-bottom: 1px solid $colors-grey-200;
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
}
</style>

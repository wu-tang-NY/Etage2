<template>
  <div class="app-select">
    <label class="app-select__label" v-if="label">
      {{ label }}
    </label>

    <div class="app-select__control">
      <multiselect
        :value="value"
        :options="options"
        :placeholder="placeholder"
        :searchable="false"
        @select="$emit('input', $event)"
      ></multiselect>

      <div class="app-select__line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  model: {
    prop: 'value',
  },
  props: {
    options: Array,
    value: null,
    label: String,
    placeholder: String,
  },
};
</script>

<style lang="scss">
.app-select {
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
    width: 100%;
  }
  .multiselect {

    &:hover,
    &:active,
    &:focus {
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

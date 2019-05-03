<template functional>
  <div class="app-phones">
    <div class="app-phones__codes-wrapper">
      <ul class="app-phones__codes">
        <li class="app-phones__code">
          <span class="app-phones__code-icon">
            <svg-icon name="operator_1" original />
          </span>
          <span class="app-phones__code-text">093</span>
        </li>

        <li class="app-phones__code">
          <span class="app-phones__code-icon">
            <svg-icon name="operator_2" original />
          </span>
          <span class="app-phones__code-text">097</span>
        </li>

        <li class="app-phones__code">
          <span class="app-phones__code-icon">
            <svg-icon name="operator_3" original />
          </span>
          <span class="app-phones__code-text">095</span>
        </li>
      </ul>
    </div>

    <div class="app-phones__text">670 4320</div>
  </div>
</template>

<script>
export default {
  name: 'AppPhones',
};
</script>

<style lang="scss">
.app-phones {
  font-weight: 700;
  font-family: $font-family--secondary;
  display: flex;
  align-items: center;

  &__codes-wrapper {
    margin-right: 5px;
  }

  &__codes {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__code {
    font-size: rem(14);
  }

  &__code-icon {
    display: inline-block;
    @include size(12px);
    margin-right: 3px;
    vertical-align: middle;

    svg {
      @include size(100%);
      vertical-align: top;
      transform: translate(0, -1px);
    }
  }

  &__code-text {
    line-height: 1.29;
  }

  &__text {
    font-size: rem(18);
    color: $colors-accent;
    letter-spacing: .4px;
    padding-bottom: 1px;
  }
}
</style>

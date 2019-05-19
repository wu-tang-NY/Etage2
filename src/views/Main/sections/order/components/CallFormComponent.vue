<template>
  <div class="call-form">
    <div class="mobile-wrapper">
      <div class="call-form__close" v-if="isMobile" @click="$emit('closeModal')"></div>
      <div class="call-form__title" v-if="isMobile">
        <h2>Оставьте номер</h2>
        <div class="subtitle">чтобы узнать все и сразу</div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <app-input
            label="Как к вам обращаться"
            type="text"
            placeholder="Имя"
          />
        </div>

        <div class="col-lg-4">
          <app-input
            label="Номер телефона"
            type="text"
            placeholder="0ХХ ХХХ ХХХХ"
          />
        </div>
      </div>
      <div class="call-form__btn-wrapper">
        <button class="call-form__button">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CallFormComponent',
  computed: {
    isMobile() {
      return window.innerWidth < 993;
    },
  },
};
</script>

<style lang="scss">
.call-form {
  margin-top: 30px;

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 13px 20px;
    font-size: rem(14);
    font-weight: bold;
    line-height: 1;
    letter-spacing: 0.3px;
    color: $white;
    border: none;
    box-shadow: none;
    background-color: $colors-accent;

    &:hover,
    &:focus,
    &:active {
      outline: none;
    }
  }
}

@media screen and (max-width: 992px) {
  .call-form {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    max-height: 100vh;
    min-height: 100vh;
    overflow: auto;
    z-index: 999999;
    padding: 0 16px;
    background-color: #fff;
    margin-top: 0;

    &__close {
      @include size(16px);
      overflow: hidden;
      position: absolute;
      top: 16px;
      right: 0;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotateZ(-45deg);
        @include size(20px, 2px);
        background-color: $colors-text--primary;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotateZ(45deg);
        @include size(20px, 2px);
        background-color: $colors-text--primary;
      }
    }

    &__btn-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>

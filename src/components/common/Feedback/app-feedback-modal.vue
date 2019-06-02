<template>
  <app-modal :show="open" @input="$emit('input', $event)" title="Оставьте отзыв">
    <form>
      <div class="row">
        <div class="col-lg-12">
          <app-input
            label="Как Вас зовут"
            type="text"
            placeholder="Имя"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <app-input
            label="Откуда Вы"
            type="text"
            placeholder="Населенный пункт"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <app-input
            label="Номер телефона"
            type="text"
            placeholder="0ХХ ХХХ ХХХХ"
            mask="### - ### - ## - ##"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <app-textarea
            label="Оставьте Ваш отзыв"
            placeholder="Комментарий"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 text-center pb-1">
          <button type="button" class="btn">Отправить</button>
        </div>
      </div>
    </form>
  </app-modal>
</template>

<script>
export default {
  name: 'AppFeedbackModal',
  model: {
    prop: 'open',
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    internalModalState: {
      get() {
        return this.open;
      },
      set(v) {
        this.$emit('input', v);
      },
    },
  }),
};
</script>

<style lang="scss">
.btn {
  background-color: $colors-accent;
  border-radius: 0;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  color: $white;
  font-size: rem(14);
  line-height: 1;
  letter-spacing: 0.3px;
  transition: .3s ease-in-out;
  cursor: pointer;

  &:hover {
    color: $white;
    filter: brightness(1.1);
  }
}
</style>

<template>
  <app-modal :show="open" @input="$emit('input', $event)">
    <div class="welcome-block">
      <svg-icon name="icon_thanks" original/>
      <h4>Спасибо за запрос</h4>
      <p>Мы скоро свяжемся с Вами</p>

      <div class="row">
        <div class="col-lg-12 text-center pb-1">
          <button type="button" class="btn" @click="closeModal">Вернуться к сайту</button>
        </div>
      </div>
    </div>
  </app-modal>
</template>

<script>
export default {
  name: 'AppCallbackModal',
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
  methods: {
    closeModal() {
      this.open = false;
    },
  },
};
</script>

<style lang="scss">
</style>

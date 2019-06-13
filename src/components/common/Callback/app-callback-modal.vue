<template>
  <app-modal :show="open" @input="$emit('input', $event)" title="Перезвонить мне">
    <form v-if="unsend">
      <div class="row">
        <div class="col-lg-12">
          <app-input
            :requiredField="!name && name !== null"
            label="Как к вам обращаться"
            type="text"
            placeholder="Имя"
            v-model="name"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <app-input
            :requiredField="!phone && phone !== null"
            label="Номер телефона"
            type="text"
            placeholder="0ХХ ХХХ ХХХХ"
            mask="### - ### - ## - ##"
            v-model="phone"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 text-center pb-1">
          <button type="button" class="btn" :disabled="!name || !phone" @click.prevent="handleSendEmail">Отправить</button>
        </div>
      </div>
    </form>
    <div v-else>
      <strong>Спасибо, запрос отправлен</strong>
      <br>
      Мы свяжемся с вами в ближайшее время
    </div>
  </app-modal>
</template>

<script>
import axios from 'axios';

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

    name: null,
    phone: null,
    unsend: true,
    required: null,
  }),
  methods: {
    handleSendEmail() {
      if (this.phone && this.name) {
        axios({
          url: 'http://etage.com.ua/api/callback',
          method: 'post',
          data: {
            name: this.name,
            phone: this.phone,
          },
        });
        this.unsend = false;
      }
    },
  },
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

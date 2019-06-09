<template>
  <app-modal :show="open" @input="$emit('input', $event)" title="Перезвонить мне">
    <form>
      <div class="row">
        <div class="col-lg-12">
          <app-input
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
          <button type="button" class="btn" @click.prevent="handleSendEmail">Отправить</button>
        </div>
      </div>
    </form>
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

    name: '',
    phone: '',
  }),
  methods: {
    handleSendEmail() {
      const url = 'https://api.sendgrid.com/v3/mail/send';
      const token = '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';

      axios({
        url,
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        data: {
          'personalizations': [{
            'to': [{
              'email': 'stoleurbike@gmail.com',
              'name': 'Etage',
            }],
            'subject': 'Order Message!',
          }],
          'content': [{
            'type': 'text/html',
            'value': `
              <strong>Имя:</strong> ${this.name},
              Телефон: ${this.phone},
              Откуда: ${this.from},
              Куда: ${this.to},
              Грузчики: ${this.workers},
              Тип: ${this.type},
              Дата: ${this.date},
              Комментарий: ${this.comment},
            `,
          }],
          'from': {
            'email': 'stoleurbike@gmail.com',
            'name': 'Sam Smith',
          },
          'reply_to': {
            'email': 'stoleurbike@gmail.com',
            'name': 'Sam Smith',
          },
        },
      });
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

<template>
  <div class="call-form">
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

    <button class="order-form__button">Отправить</button>
  </div>
</template>

<script>
export default {
  name: 'CallFormComponent',
};
</script>

<style lang="scss">
.call-form {
  margin-top: 30px;
}
</style>

<template>
  <app-modal id="modalCallback" title="Обратный звонок">
    <form>
      <div class="row">
        <div class="col-lg-12">
          <app-input
            label="Как к вам обращаться"
            type="text"
            placeholder="Имя"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <app-input
            label="Номер телефона"
            type="text"
            placeholder="0ХХ ХХХ ХХХХ"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <button type="button">Отправить</button>
        </div>
      </div>
    </form>
  </app-modal>
</template>

<script>
export default {
  name: 'PageMainModalCallback',
};
</script>

<style lang="scss">
</style>

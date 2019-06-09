<template>
  <div>
    <h2>Контакты</h2>
    <h3>ТОВ «Этаж»</h3>
    <p>Украина, г. Одесса, ул. Колонтаевская 7</p>
    <p><a href="tel:+380970970110">+38 097 097 0110</a>
      <br>
      <a href="tel:+380930970110">+38 093 097 0110</a>
      <br>
      <a href="tel:+380950970110">+38 095 097 0110</a>
    </p>
    <p>почта: <a href="mailto:office@etage.com.ua">office@etage.com.ua</a></p>
    <p>Карта проезда</p>
    <!-- <p>Служба контроля качества</p>
    <ul>
      <li>(отзывы о проделанной работе, предложения по улучшению качества оказанных услуг)</li>
    </ul>
    <p>Руководитель отдела маркетинга</p>
    <ul>
      <li>Предложения по сотрудничеству, совместным маркетинговым мероприятиям</li>
    </ul>
    <p>Генеральный директор</p>
    <p>Реквизиты</p> -->
    <div class="modal-map">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2747.635342285657!2d30.719623415591563!3d46.4757305791259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c6318e938e782b%3A0xff287e6aa12db202!2z0LLRg9C70LjRhtGPINCa0L7Qu9C-0L3RgtCw0ZfQstGB0YzQutCwLCA3LCDQntC00LXRgdCwLCDQntC00LXRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgNjUwMDA!5e0!3m2!1sru!2sua!4v1560112076644!5m2!1sru!2sua" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupContentContacts',
};
</script>

<style lang="scss">
.modal-map {
  height: 300px;
  margin-top: 10px;
}
</style>

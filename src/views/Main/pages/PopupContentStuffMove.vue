<template>
  <div>
    <h2>{{ $t("stuffMove.title") }}</h2>
    <p>{{ $t("stuffMove.paragraph1") }}</p>
    <p>{{ $t("stuffMove.optionsTitle") }}</p>
    <ul>
      <li>{{ $t("stuffMove.option1") }}</li>
      <li>{{ $t("stuffMove.option2") }}</li>
      <li>
        {{ $t("stuffMove.option3") }}
        <p>{{ $t("stuffMove.option3Note") }}</p>
      </li>
      <li>{{ $t("stuffMove.option4") }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PopupContentStuffMove.vue',
};
</script>

<style lang="scss">
</style>

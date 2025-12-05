<template>
  <div>
    <h2>{{ $t('specialists.title') }}</h2>
    <p>{{ $t('specialists.paragraph1') }}</p>
    <p>{{ $t('specialists.question') }}</p>
    <ul>
      <li>{{ $t('specialists.who1') }}</li>
      <li>{{ $t('specialists.who2') }}</li>
      <li>{{ $t('specialists.who3') }}</li>
      <li>{{ $t('specialists.who4') }}</li>
      <li>{{ $t('specialists.who5') }}</li>
    </ul>
    <p>{{ $t('specialists.optionsTitle') }}</p>
    <ul>
      <li>{{ $t('specialists.option1') }}</li>
    </ul>
    <p>{{ $t('specialists.note') }}</p>
  </div>
</template>

<script>
export default {
  name: 'PopupContentSpecialists.vue',
};
</script>

<style lang="scss">

</style>

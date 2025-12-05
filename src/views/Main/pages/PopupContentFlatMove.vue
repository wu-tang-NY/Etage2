<template>
  <div>
    <h2>{{ $t('flatMove.title') }}</h2>
    <p>{{ $t('flatMove.paragraph1') }}</p>
    <p>{{ $t('flatMove.question') }}</p>
    <ol>
      <li>{{ $t('flatMove.step1') }}</li>
      <li>{{ $t('flatMove.step2Title') }}
        <p>{{ $t('flatMove.step2Desc') }}</p>
      </li>
      <li>{{ $t('flatMove.step3Title') }}
        <p>{{ $t('flatMove.step3Desc') }}</p>
      </li>
      <li>{{ $t('flatMove.step4Title') }}
        <p>{{ $t('flatMove.step4Desc') }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'PopupContentFlatMove.vue',
};
</script>

<style lang="scss">

</style>

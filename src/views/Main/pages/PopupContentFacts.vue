<template>
  <div>
    <h2>{{ $t("facts.title") }}</h2>
    <p>{{ $t("facts.intro") }}</p>
    <ul>
      <li>{{ $t("facts.fact1") }}</li>
      <li>{{ $t("facts.fact2") }}</li>
      <li>{{ $t("facts.fact3") }}</li>
      <li>{{ $t("facts.fact4") }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PopupContentFacts',
};
</script>

<style lang="scss" scoped>
</style>

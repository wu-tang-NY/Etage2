<template>
  <div>
    <h2>{{ $t("aboutUs.title") }}</h2>
    <p>{{ $t("aboutUs.paragraph1") }}</p>
    <p>{{ $t("aboutUs.paragraph2") }}</p>
    <p>{{ $t("aboutUs.paragraph3") }}</p>
    <p>{{ $t("aboutUs.paragraph4") }}</p>
    <p>{{ $t("aboutUs.paragraph5") }}</p>
    <ul>
      <li>{{ $t("aboutUs.services.transport") }}</li>
      <li>{{ $t("aboutUs.services.flatMove") }}</li>
      <li>{{ $t("aboutUs.services.officeMove") }}</li>
      <li>{{ $t("aboutUs.services.loading") }}</li>
      <li>{{ $t("aboutUs.services.disassembly") }}</li>
      <li>{{ $t("aboutUs.services.packing") }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PopupContentAboutUs"
};
</script>

<style lang="scss"></style>

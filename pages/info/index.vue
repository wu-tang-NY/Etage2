<script setup>
const { locale } = useI18n();
const localePrefix = locale.value || "ua";
await navigateTo(`/${localePrefix}/info/about_us`, {
  redirectCode: 301,
  replace: true,
});
</script>

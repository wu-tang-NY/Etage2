<template>
  <ClientOnly>
    <div class="flex items-center gap-2">
      <AppButton
        v-for="lang in availableLanguages"
        :key="lang.code"
        type="button"
        :class="{
          'app-language-switcher__button--active': currentLocale === lang.code,
        }"
        @click="switchLanguage(lang.code)"
      >
        {{ lang.label }}
      </AppButton>
    </div>
  </ClientOnly>
</template>

<script setup>
import AppButton from "@/components/ui/Button/app-button.vue";
import { computed } from "vue";

const { locale, setLocale } = useI18n();
const router = useRouter();
const route = useRoute();

const availableLanguages = [
  { code: "ua", label: "UA" },
  { code: "ru", label: "RU" },
];

const currentLocale = computed(() => locale.value);

async function switchLanguage(newLocale) {
  try {
    // With prefix strategy, all locales have prefixes: /ua and /ru
    // Replace the current locale prefix with the new one
    let newPath = route.path;

    // Replace any existing locale prefix with the new one
    newPath = newPath.replace(/^\/(ua|ru)(\/|$)/, `/${newLocale}$2`);

    // If no locale prefix exists (shouldn't happen with prefix strategy, but handle it anyway)
    if (!newPath.match(/^\/(ua|ru)(\/|$)/)) {
      newPath = `/${newLocale}${newPath === "/" ? "" : newPath}`;
    }

    // Navigate to the new locale path if it's different
    if (newPath !== route.path) {
      await router.push(newPath);
    }
  } catch (error) {
    console.error("Error switching language:", error);
  }
}
</script>

<style lang="scss" scoped>
.app-language-switcher {
  &__button {
    &--active {
      background-color: var(--colors-text-primary);
      color: var(--white);
    }
  }
}
</style>

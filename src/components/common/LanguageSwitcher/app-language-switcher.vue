<template>
  <ClientOnly>
    <div class="app-language-switcher">
      <button
        v-for="lang in availableLanguages"
        :key="lang.code"
        type="button"
        class="app-language-switcher__button"
        :class="{
          'app-language-switcher__button--active': currentLocale === lang.code
        }"
        @click="switchLanguage(lang.code)"
      >
        {{ lang.label }}
      </button>
    </div>
  </ClientOnly>
</template>

<script setup>
import { computed } from "vue";

const { locale, setLocale } = useI18n();
const router = useRouter();
const route = useRoute();

const availableLanguages = [
  { code: "ua", label: "UA" },
  { code: "ru", label: "RU" }
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
  display: flex;
  align-items: center;
  gap: 8px;

  &__button {
    background: transparent;
    border: 1px solid var(--colors-text-primary);
    color: var(--colors-text-primary);
    padding: 0 12px;
    font-size: rem(12);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    box-sizing: border-box;

    &:hover {
      background-color: var(--colors-text-primary);
      color: var(--white);
    }

    &--active {
      background-color: var(--colors-text-primary);
      color: var(--white);
    }

    &:focus {
      outline: none;
    }
  }
}
</style>

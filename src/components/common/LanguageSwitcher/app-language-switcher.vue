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

const availableLanguages = [
  { code: "ua", label: "UA" },
  { code: "ru", label: "RU" }
];

const currentLocale = computed(() => locale.value);

const localeToLang = {
  ua: "uk", // Ukrainian
  ru: "ru" // Russian
};

async function switchLanguage(newLocale) {
  try {
    // Use setLocale to properly load lazy-loaded locale messages
    // This ensures the locale file is loaded before switching
    await setLocale(newLocale);

    // Also update localStorage for persistence
    if (process.client) {
      localStorage.setItem("locale", newLocale);
    }

    // Update HTML lang attribute with valid BCP 47 code
    const langCode = localeToLang[newLocale] || "uk";
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", langCode);
    }
  } catch (error) {
    console.error("Error switching language:", error);
    // Fallback: try direct assignment if setLocale fails
    locale.value = newLocale;
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

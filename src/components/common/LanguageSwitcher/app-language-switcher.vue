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

<script>
export default {
  name: "AppLanguageSwitcher",
  data() {
    return {
      availableLanguages: [
        { code: "ua", label: "UA" },
        { code: "ru", label: "RU" }
      ]
    };
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    }
  },
  methods: {
    switchLanguage(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem("locale", locale);
    }
  }
};
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

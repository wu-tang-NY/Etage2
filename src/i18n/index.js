import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ru from './locales/ru';
import ua from './locales/ua';

Vue.use(VueI18n);

// Detect browser language or use stored preference
function getDefaultLocale() {
  const stored = localStorage.getItem('locale');
  if (stored) {
    return stored;
  }

  const browserLang = navigator.language || navigator.userLanguage;
  const lang = browserLang.split('-')[0];

  return ['ru', 'ua'].includes(lang) ? lang : 'ua';
}

export default new VueI18n({
  locale: getDefaultLocale(),
  fallbackLocale: 'ua',
  messages: {
    ru,
    ua,
  },
});


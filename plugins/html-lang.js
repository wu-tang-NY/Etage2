import { watchEffect } from "vue";

export default defineNuxtPlugin((nuxtApp) => {
  // Map locale codes to valid BCP 47 language codes
  const localeToLang = {
    ua: "uk", // Ukrainian
    ru: "ru", // Russian
  };

  // Function to update HTML lang attribute
  const updateHtmlLang = (locale) => {
    if (typeof document === "undefined") return;

    const langCode = localeToLang[locale] || "uk";
    document.documentElement.setAttribute("lang", langCode);
  };

  // Update on initial load and when locale changes
  if (process.client) {
    nuxtApp.hook("app:mounted", () => {
      // Update immediately
      if (nuxtApp.$i18n) {
        updateHtmlLang(nuxtApp.$i18n.locale);

        // Watch for locale changes reactively
        watchEffect(() => {
          if (nuxtApp.$i18n?.locale) {
            updateHtmlLang(nuxtApp.$i18n.locale);
          }
        });

        // Also listen for localStorage changes as a fallback
        // (when locale is changed in another tab or by direct localStorage manipulation)
        window.addEventListener("storage", (e) => {
          if (e.key === "locale" && e.newValue) {
            updateHtmlLang(e.newValue);
          }
        });
      }
    });
  }
});


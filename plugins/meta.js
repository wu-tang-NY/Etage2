export default defineNuxtPlugin((nuxtApp) => {
  // Map locale codes to valid BCP 47 language codes
  const localeToLang = {
    ua: "uk", // Ukrainian
    ru: "ru", // Russian
  };

  // Function to update meta tags
  const updateMeta = () => {
    // Access i18n via nuxtApp (not useI18n composable, which can't be used in plugins)
    const i18n = nuxtApp.$i18n;
    if (!i18n) return;

    // Get current locale (handle both ref and string)
    const currentLocale =
      i18n.locale?.value || i18n.locale || i18n.defaultLocale || "ua";

    // Get title and description from translations
    const title = i18n.t("meta.title");
    const description = i18n.t("meta.description");
    const langCode = localeToLang[currentLocale] || "uk";

    // Site URL and image URL (absolute URLs required for Open Graph)
    const siteUrl = "https://etage.com.ua";
    const ogImageUrl = `${siteUrl}/images/packages/img_1_1200w.jpg`;
    
    // Get current route for og:url
    let currentUrl = siteUrl;
    try {
      // Use router.currentRoute instead of useRoute() to avoid middleware warnings
      const route = nuxtApp.$router?.currentRoute?.value;
      if (route?.fullPath) {
        currentUrl = `${siteUrl}${route.fullPath}`;
      }
    } catch (e) {
      // Fallback to site URL if route is not available
      currentUrl = siteUrl;
    }

    // Update head with language-specific meta tags
    useHead({
      title,
      htmlAttrs: {
        lang: langCode,
      },
      meta: [
        {
          name: "description",
          content: description,
        },
        // Open Graph meta tags
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:locale",
          content: currentLocale === "ru" ? "ru_RU" : "uk_UA",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: currentUrl,
        },
        {
          property: "og:site_name",
          content: "Etage",
        },
        {
          property: "og:image",
          content: ogImageUrl,
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: "og:image:height",
          content: "630",
        },
        {
          property: "og:image:type",
          content: "image/jpeg",
        },
        // Twitter Card meta tags
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: description,
        },
        {
          name: "twitter:image",
          content: ogImageUrl,
        },
      ],
    });

    // Also update document element lang attribute for client-side
    if (process.client && typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", langCode);
    }
  };

  // Update meta tags after app is mounted to ensure i18n is available
  nuxtApp.hook("app:mounted", () => {
    if (nuxtApp.$i18n) {
      updateMeta();

      // Watch for locale changes and update meta tags
      watch(
        () => nuxtApp.$i18n?.locale?.value || nuxtApp.$i18n?.locale,
        () => {
          updateMeta();
        },
        { immediate: false }
      );
    }
  });

  // Also try to update immediately for SSR (if i18n is available)
  if (nuxtApp.$i18n) {
    updateMeta();
  }
});

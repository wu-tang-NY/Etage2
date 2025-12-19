// This middleware works in conjunction with i18n module's alwaysRedirect option
// It handles edge cases where i18n module might not catch redirects
export default defineNuxtRouteMiddleware((to) => {
  const validLocales = ["ua", "ru"];
  const defaultLocale = "ua";

  // Extract locale from path (first segment after /)
  const pathSegments = to.path.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];

  // Only handle root path redirect if i18n module hasn't already handled it
  // This is a fallback to ensure root always redirects to a locale
  if (!firstSegment && (to.path === "/" || to.path === "")) {
    // Get locale from cookie if available, otherwise use default
    const cookieLocale = useCookie("locale");
    const targetLocale =
      cookieLocale.value && validLocales.includes(cookieLocale.value)
        ? cookieLocale.value
        : defaultLocale;

    const redirectPath = `/${targetLocale}${to.search ? to.search : ""}`;
    // Only redirect if we're not already going to that path
    if (to.path !== redirectPath) {
      return navigateTo(redirectPath, { redirectCode: 301, external: false });
    }
  }

  // Handle invalid locale codes (not needed if i18n handles it, but kept as safety net)
  if (
    firstSegment &&
    /^[a-z]{2,3}$/.test(firstSegment) &&
    !validLocales.includes(firstSegment)
  ) {
    const cookieLocale = useCookie("locale");
    const targetLocale =
      cookieLocale.value && validLocales.includes(cookieLocale.value)
        ? cookieLocale.value
        : defaultLocale;

    const restOfPath = pathSegments.slice(1).join("/");
    const redirectPath = `/${targetLocale}${
      restOfPath ? "/" + restOfPath : ""
    }${to.search ? to.search : ""}`;

    return navigateTo(redirectPath, { redirectCode: 301, external: false });
  }
});

// Client-side redirect plugin for static hosting
// This runs immediately on page load to redirect root URL to locale-prefixed URL
export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client side
  if (process.server) return;

  // Only handle root path redirect
  const path = window.location.pathname;
  if (path !== "/" && path !== "") return;

  // Get locale from cookie or use default
  const validLocales = ["ua", "ru"];
  const defaultLocale = "ua";

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  const cookieLocale = getCookie("locale");
  const targetLocale =
    cookieLocale && validLocales.includes(cookieLocale)
      ? cookieLocale
      : defaultLocale;

  // Get query string and hash if present
  const search = window.location.search || "";
  const hash = window.location.hash || "";

  // Redirect immediately
  const redirectPath = `/${targetLocale}${search}${hash}`;
  
  // Use replace to avoid adding to history
  if (window.location.pathname !== redirectPath) {
    window.location.replace(redirectPath);
  }
});


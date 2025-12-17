export default defineNuxtRouteMiddleware((to) => {
  // List of valid locale codes (must match nuxt.config.js i18n.locales)
  const validLocales = ['ua', 'ru'];
  const defaultLocale = 'ua';
  
  // Extract locale from path (first segment after /)
  const pathSegments = to.path.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  
  // Check if first segment looks like a locale code (2-3 lowercase letters)
  // and if it's not a valid locale
  if (firstSegment && /^[a-z]{2,3}$/.test(firstSegment) && !validLocales.includes(firstSegment)) {
    // Invalid locale detected - try to use user's preferred locale from cookie, otherwise default
    let targetLocale = defaultLocale;
    
    // Try to get preferred locale from cookie (works on both server and client)
    try {
      const cookieLocale = useCookie('locale');
      if (cookieLocale.value && validLocales.includes(cookieLocale.value)) {
        targetLocale = cookieLocale.value;
      }
    } catch (e) {
      // Cookie might not be available, use default
    }
    
    // Redirect to valid locale with the rest of the path preserved
    const restOfPath = pathSegments.slice(1).join('/');
    const redirectPath = `/${targetLocale}${restOfPath ? '/' + restOfPath : ''}${to.search ? to.search : ''}`;
    
    return navigateTo(redirectPath, { redirectCode: 301 });
  }
});


/**
 * Router Error Handler
 * Handles navigation errors and chunk loading failures during route changes
 */
export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client side
  if (process.server) {
    return;
  }

  const router = useRouter();

  // Handle router errors
  router.onError((error) => {
    console.error("[Router Error]", error);

    // Check if it's a chunk loading error
    if (isChunkError(error)) {
      console.warn(
        "[Router Error] Chunk loading failed during navigation, reloading..."
      );

      // Store the current route to restore after reload
      const currentRoute = router.currentRoute.value.fullPath;
      sessionStorage.setItem("nuxt-route-restore", currentRoute);

      // Reload the page
      window.location.reload();
    }
  });

  // Try to restore route after reload
  const savedRoute = sessionStorage.getItem("nuxt-route-restore");
  if (savedRoute && savedRoute !== router.currentRoute.value.fullPath) {
    sessionStorage.removeItem("nuxt-route-restore");
    // Navigate to the saved route
    router.push(savedRoute).catch(() => {
      // If navigation fails, just stay on current page
      console.log("[Router Error] Could not restore route:", savedRoute);
    });
  }

  function isChunkError(error) {
    if (!error) return false;

    const message = error.message || error.toString();

    return (
      message.includes("Failed to fetch dynamically imported module") ||
      message.includes("Importing a module script failed") ||
      message.includes("error loading dynamically imported module") ||
      message.includes("Loading chunk") ||
      message.includes("ChunkLoadError")
    );
  }
});

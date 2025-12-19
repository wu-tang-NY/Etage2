/**
 * Chunk Load Error Handler
 * Automatically reloads the page when a dynamic import fails due to old cached chunks
 * This happens when a new deployment invalidates old chunk hashes
 */
export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client side
  if (process.server) {
    return;
  }

  // Track if we've already reloaded to prevent infinite loops
  const RELOAD_KEY = "nuxt-chunk-reload-timestamp";
  const RELOAD_COOLDOWN = 10000; // 10 seconds

  // Handle Vue errors
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error("[Error Handler]", error, info);

    // Check if it's a chunk loading error
    if (isChunkLoadError(error)) {
      handleChunkError(error);
    }
  };

  // Handle window errors
  window.addEventListener("error", (event) => {
    if (isChunkLoadError(event.error) || isChunkLoadError(event.message)) {
      event.preventDefault();
      handleChunkError(event.error || event.message);
    }
  });

  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    if (isChunkLoadError(event.reason)) {
      event.preventDefault();
      handleChunkError(event.reason);
    }
  });

  function isChunkLoadError(error) {
    if (!error) return false;

    const errorString = error.toString ? error.toString() : String(error);
    const message = error.message || errorString;

    // Check for various chunk loading error patterns
    return (
      message.includes("Failed to fetch dynamically imported module") ||
      message.includes("Importing a module script failed") ||
      message.includes("error loading dynamically imported module") ||
      message.includes("Failed to fetch") ||
      (message.includes("Loading chunk") && message.includes("failed")) ||
      message.includes("ChunkLoadError")
    );
  }

  function handleChunkError(error) {
    console.warn("[Chunk Error] Detected chunk loading failure:", error);

    // Check if we recently reloaded
    const lastReload = sessionStorage.getItem(RELOAD_KEY);
    const now = Date.now();

    if (lastReload && now - parseInt(lastReload) < RELOAD_COOLDOWN) {
      console.error(
        "[Chunk Error] Already reloaded recently, not reloading again to prevent loop"
      );
      // Show user-friendly error message
      showErrorMessage();
      return;
    }

    // Mark that we're reloading
    sessionStorage.setItem(RELOAD_KEY, now.toString());

    console.log("[Chunk Error] Reloading page to fetch new chunks...");

    // Show brief notification before reload
    showReloadNotification();

    // Reload after a brief delay to let the notification show
    setTimeout(() => {
      // Force reload from server, bypassing cache
      window.location.reload(true);
    }, 500);
  }

  function showReloadNotification() {
    // Create a temporary notification
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 20px 30px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 999999;
      font-size: 16px;
      text-align: center;
      backdrop-filter: blur(10px);
    `;
    notification.textContent =
      "Оновлення додатку... / Обновление приложения...";
    document.body.appendChild(notification);
  }

  function showErrorMessage() {
    // Show error message if reload didn't help
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(220, 53, 69, 0.95);
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 999999;
      font-size: 14px;
      text-align: center;
      max-width: 90%;
      backdrop-filter: blur(10px);
    `;
    notification.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 8px;">Помилка завантаження / Ошибка загрузки</div>
      <div style="font-size: 13px;">Будь ласка, очистіть кеш браузера та перезавантажте сторінку</div>
      <div style="font-size: 13px;">Пожалуйста, очистите кеш браузера и перезагрузите страницу</div>
      <button onclick="location.reload()" style="
        margin-top: 12px;
        background: white;
        color: #dc3545;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
      ">
        Перезавантажити / Перезагрузить
      </button>
    `;
    document.body.appendChild(notification);

    // Remove after 10 seconds
    setTimeout(() => {
      notification.remove();
    }, 10000);
  }

  // Clear old reload timestamps on successful load
  try {
    const lastReload = sessionStorage.getItem(RELOAD_KEY);
    if (lastReload && Date.now() - parseInt(lastReload) > 60000) {
      // Clear if more than 1 minute old
      sessionStorage.removeItem(RELOAD_KEY);
    }
  } catch (e) {
    // Ignore sessionStorage errors
  }
});

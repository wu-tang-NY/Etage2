/**
 * PWA Service Worker Update Handler
 * Handles service worker updates and notifies users when new versions are available
 * Works without usePwa composable by using service worker API directly
 */
export default defineNuxtPlugin(() => {
  // Only run on client side
  if (process.server) {
    return;
  }

  // Check if service workers are supported
  if (!("serviceWorker" in navigator)) {
    return;
  }

  // Try to access PWA composable, but don't fail if it's not available
  let pwa = null;
  
  // Check if usePwa is available (auto-imported by @vite-pwa/nuxt)
  if (typeof usePwa !== "undefined" && typeof usePwa === "function") {
    try {
      pwa = usePwa();
    } catch (error) {
      // Silently fail - we'll use service worker API directly
      console.debug("[PWA] usePwa not available, using service worker API directly");
    }
  }

  // If usePwa is available, use it for event handling
  if (pwa) {
    // Handle service worker update available
    pwa.addEventListener("sw-update", () => {
      console.log("[PWA] Service worker update available");
      handleUpdateAvailable(pwa);
    });

    // Handle service worker offline
    pwa.addEventListener("offline-ready", () => {
      console.log("[PWA] App is ready to work offline");
      showOfflineReadyNotification();
    });

    // Handle service worker error
    pwa.addEventListener("sw-error", (event) => {
      console.error("[PWA] Service worker error:", event);
    });

    // Check initial state
    if (pwa.needRefresh) {
      console.log("[PWA] Service worker update available on page load");
      handleUpdateAvailable(pwa);
    }

    if (pwa.offlineReady) {
      console.log("[PWA] App is ready to work offline");
      showOfflineReadyNotification();
    }
  } else {
    // Fallback: Use service worker registration API directly
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        // Listen for service worker updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                // New service worker is available
                console.log("[PWA] Service worker update available");
                handleUpdateAvailableDirect(registration);
              }
            });
          }
        });

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000); // Check every hour
      });
    }
  }

  // Helper function to handle update available (with usePwa)
  function handleUpdateAvailable(pwaInstance) {
    // Emit event for components to listen to
    if (window.$eventbus) {
      window.$eventbus.$emit("pwa-update-available");
    }

    showUpdateNotification(pwaInstance);
  }

  // Helper function to handle update available (direct API)
  function handleUpdateAvailableDirect(registration) {
    // Emit event for components to listen to
    if (window.$eventbus) {
      window.$eventbus.$emit("pwa-update-available");
    }

    showUpdateNotificationDirect(registration);
  }

  // Show update notification (with usePwa)
  function showUpdateNotification(pwaInstance) {
    // Check if user has dismissed update notification
    const dismissed = sessionStorage.getItem("pwa-update-dismissed");
    if (dismissed) {
      return;
    }

    // Check if notification already exists
    if (document.getElementById("pwa-update-notification")) {
      return;
    }

    // Create a simple update notification
    const notification = document.createElement("div");
    notification.id = "pwa-update-notification";
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 16px;
      max-width: 90%;
      font-size: 14px;
      backdrop-filter: blur(10px);
    `;

    notification.innerHTML = `
      <span>Нова версія доступна!</span>
      <button 
        id="pwa-update-reload" 
        style="
          background: #ffa511;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
        "
      >
        Оновити
      </button>
      <button 
        id="pwa-update-dismiss" 
        style="
          background: transparent;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        "
      >
        Пізніше
      </button>
    `;

    document.body.appendChild(notification);

    // Handle reload button
    const reloadBtn = notification.querySelector("#pwa-update-reload");
    reloadBtn?.addEventListener("click", async () => {
      try {
        if (pwaInstance && typeof pwaInstance.updateServiceWorker === "function") {
          await pwaInstance.updateServiceWorker();
        }
        // Reload the page after update
        window.location.reload();
      } catch (error) {
        console.error("[PWA] Error updating service worker:", error);
        notification.remove();
      }
    });

    // Handle dismiss button
    const dismissBtn = notification.querySelector("#pwa-update-dismiss");
    dismissBtn?.addEventListener("click", () => {
      sessionStorage.setItem("pwa-update-dismissed", "true");
      notification.remove();
      // Clear dismissal after 1 hour
      setTimeout(() => {
        sessionStorage.removeItem("pwa-update-dismissed");
      }, 60 * 60 * 1000);
    });
  }

  // Show update notification (direct API)
  function showUpdateNotificationDirect(registration) {
    // Check if user has dismissed update notification
    const dismissed = sessionStorage.getItem("pwa-update-dismissed");
    if (dismissed) {
      return;
    }

    // Check if notification already exists
    if (document.getElementById("pwa-update-notification")) {
      return;
    }

    // Create a simple update notification
    const notification = document.createElement("div");
    notification.id = "pwa-update-notification";
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 16px;
      max-width: 90%;
      font-size: 14px;
      backdrop-filter: blur(10px);
    `;

    notification.innerHTML = `
      <span>Нова версія доступна!</span>
      <button 
        id="pwa-update-reload" 
        style="
          background: #ffa511;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
        "
      >
        Оновити
      </button>
      <button 
        id="pwa-update-dismiss" 
        style="
          background: transparent;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        "
      >
        Пізніше
      </button>
    `;

    document.body.appendChild(notification);

    // Handle reload button
    const reloadBtn = notification.querySelector("#pwa-update-reload");
    reloadBtn?.addEventListener("click", async () => {
      try {
        // Skip waiting and reload
        if (registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }
        // Reload the page after update
        window.location.reload();
      } catch (error) {
        console.error("[PWA] Error updating service worker:", error);
        notification.remove();
      }
    });

    // Handle dismiss button
    const dismissBtn = notification.querySelector("#pwa-update-dismiss");
    dismissBtn?.addEventListener("click", () => {
      sessionStorage.setItem("pwa-update-dismissed", "true");
      notification.remove();
      // Clear dismissal after 1 hour
      setTimeout(() => {
        sessionStorage.removeItem("pwa-update-dismissed");
      }, 60 * 60 * 1000);
    });
  }

  // Show offline ready notification
  function showOfflineReadyNotification() {
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(76, 175, 80, 0.9);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 9999;
      font-size: 14px;
      backdrop-filter: blur(10px);
    `;
    notification.classList.add("animate-slideIn");
    notification.textContent = "Додаток готовий до роботи офлайн";
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove("animate-slideIn");
      notification.classList.add("animate-slideOut");
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

});

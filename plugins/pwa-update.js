/**
 * PWA Service Worker Update Handler
 * Handles service worker updates and notifies users when new versions are available
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

  // Access PWA composable from @vite-pwa/nuxt
  const pwa = usePwa();

  if (!pwa) {
    return;
  }

  // Handle service worker update available
  pwa.addEventListener("sw-update", () => {
    console.log("[PWA] Service worker update available");

    // Emit event for components to listen to
    if (window.$eventbus) {
      window.$eventbus.$emit("pwa-update-available");
    }

    // Show update notification
    // You can customize this notification UI
    const showUpdateNotification = () => {
      // Check if user has dismissed update notification
      const dismissed = sessionStorage.getItem("pwa-update-dismissed");
      if (dismissed) {
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
          await pwa.updateServiceWorker();
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
    };

    // Show notification after a short delay
    setTimeout(showUpdateNotification, 2000);
  });

  // Handle service worker offline
  pwa.addEventListener("offline-ready", () => {
    console.log("[PWA] App is ready to work offline");
    
    // Show a brief offline-ready notification
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
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = "Додаток готовий до роботи офлайн";
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease-out";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  });

  // Handle service worker error
  pwa.addEventListener("sw-error", (event) => {
    console.error("[PWA] Service worker error:", event);
  });

  // Log service worker registration
  if (pwa.needRefresh) {
    console.log("[PWA] Service worker update available on page load");
  }

  if (pwa.offlineReady) {
    console.log("[PWA] App is ready to work offline");
  }

  // Add CSS animations for notifications
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes slideOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(20px);
        }
      }
    `;
    document.head.appendChild(style);
  }
});


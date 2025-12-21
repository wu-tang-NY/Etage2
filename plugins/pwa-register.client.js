/**
 * PWA Service Worker Registration
 * Ensures service worker registers properly on mobile devices and static hosting
 */
export default defineNuxtPlugin(() => {
  // Only run on client side
  if (process.server) {
    return;
  }

  // Only register in production
  if (process.env.NODE_ENV !== "production") {
    console.log("[PWA Register] Skipping service worker registration in development");
    return;
  }

  // Check if service workers are supported
  if (!("serviceWorker" in navigator)) {
    console.log("[PWA Register] Service workers not supported");
    return;
  }

  // Wait for page to be fully loaded
  window.addEventListener("load", async () => {
    try {
      console.log("[PWA Register] Registering service worker...");
      
      // Register service worker with explicit scope
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        type: "module",
        updateViaCache: "none", // Always check for updates on mobile
      });

      console.log("[PWA Register] Service worker registered successfully", {
        scope: registration.scope,
        active: !!registration.active,
        waiting: !!registration.waiting,
        installing: !!registration.installing,
      });

      // Check for updates periodically (especially important on mobile)
      setInterval(() => {
        registration.update().then(() => {
          console.log("[PWA Register] Checked for service worker updates");
        });
      }, 60 * 60 * 1000); // Check every hour

      // Listen for updates
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        console.log("[PWA Register] Service worker update found");

        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            console.log("[PWA Register] Service worker state changed:", newWorker.state);
            
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              console.log("[PWA Register] New service worker installed and ready");
              // Emit event for update notification
              if (window.$eventbus) {
                window.$eventbus.$emit("pwa-update-available");
              }
            }
          });
        }
      });

      // Handle controller change (service worker activated)
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("[PWA Register] Service worker controller changed");
      });

      // Log any service worker messages
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("[PWA Register] Message from service worker:", event.data);
      });

    } catch (error) {
      console.error("[PWA Register] Service worker registration failed:", error);
      console.error("[PWA Register] Error details:", {
        name: error?.name,
        message: error?.message,
        stack: error?.stack,
      });
    }
  });

  // Add visibility change handler to check for updates when page becomes visible
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      navigator.serviceWorker.ready.then((registration) => {
        console.log("[PWA Register] Page visible, checking for updates");
        registration.update();
      });
    }
  });
});


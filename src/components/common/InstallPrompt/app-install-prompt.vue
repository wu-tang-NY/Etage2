<template>
  <div>
    <!-- Install Prompt Toast -->
    <Transition name="toast">
      <div v-if="showPrompt && !isAppInstalled" class="install-toast">
        <div class="install-toast__content">
          <p class="install-toast__message">
            {{ $t("installPrompt.message") }}
          </p>
          <div class="install-toast__actions">
            <button
              type="button"
              class="install-toast__button install-toast__button--yes"
              @click="handleInstall"
              aria-label="Install the app"
            >
              {{ $t("installPrompt.yes") }}
            </button>
            <button
              type="button"
              class="install-toast__button install-toast__button--no"
              @click="handleDismiss"
              aria-label="Dismiss the prompt"
            >
              {{ $t("installPrompt.no") }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Manual Install Instructions Modal -->
    <Transition name="modal-fade">
      <div
        v-if="showInstructions"
        class="install-modal-overlay"
        @click="closeInstructions"
      >
        <div class="install-modal" @click.stop>
          <div class="install-modal__header">
            <h3 class="install-modal__title">
              {{ $t("installPrompt.installButton") }}
            </h3>
            <button
              type="button"
              class="install-modal__close"
              @click="closeInstructions"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div class="install-modal__body">
            <p class="install-modal__text">
              {{ manualInstructionText }}
            </p>
          </div>
          <div class="install-modal__footer">
            <button
              type="button"
              class="install-toast__button install-toast__button--yes"
              @click="closeInstructions"
            >
              {{ $t("common.close") }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "AppInstallPrompt",
  data() {
    return {
      showPrompt: false,
      deferredPrompt: null,
      dismissedPrompt: false,
      showInstructions: false,
      manualInstructionText: "",
      installCheckInterval: null,
    };
  },
  computed: {
    isAppInstalled() {
      if (typeof window === "undefined") {
        return false;
      }
      return this.isInstalled();
    },
    canShowPrompt() {
      // Check all conditions for showing the install prompt
      return (
        !this.isAppInstalled &&
        !this.dismissedPrompt &&
        typeof window !== "undefined"
      );
    },
  },
  watch: {
    isAppInstalled(newValue) {
      // If app becomes installed, hide the prompt
      if (newValue && this.showPrompt) {
        console.log("[PWA Install] App is now installed, hiding prompt");
        this.showPrompt = false;
        this.deferredPrompt = null;
      }
    },
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener(
        "beforeinstallprompt",
        this.handleBeforeInstallPrompt
      );
      // Clear the install check interval
      if (this.installCheckInterval) {
        clearInterval(this.installCheckInterval);
        this.installCheckInterval = null;
      }
      // If we prevented default but haven't called prompt(), we must call it
      // to satisfy the browser requirement
      if (this.deferredPrompt) {
        console.log(
          "[PWA Install] Component unmounting with deferred prompt, calling prompt()"
        );
        this.deferredPrompt.prompt().catch((error) => {
          console.error(
            "[PWA Install] Error calling prompt on unmount:",
            error
          );
        });
        this.deferredPrompt = null;
      }
    }
  },
  mounted() {
    // Only run on client side
    if (typeof window === "undefined") {
      return;
    }

    console.log("[PWA Install] Component mounted");

    // Run diagnostics
    this.runPWADiagnostics();

    // Check if already installed
    if (this.isInstalled()) {
      console.log("[PWA Install] App is already installed");
      return;
    }

    // Check if user has dismissed the prompt before
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      const daysSinceDismissed =
        (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      // Show again after 7 days
      if (daysSinceDismissed < 7) {
        console.log(
          `[PWA Install] Dismissed ${daysSinceDismissed.toFixed(
            1
          )} days ago, waiting ${(7 - daysSinceDismissed).toFixed(1)} more days`
        );
        return;
      }
    }

    // Check for manual trigger (for testing)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("showInstall") === "true") {
      console.log("[PWA Install] Manual trigger detected via URL");
      setTimeout(() => {
        this.showPrompt = true;
      }, 1000);
      return;
    }

    // Add debug mode for testing (add ?pwaDebug=true to URL)
    if (urlParams.get("pwaDebug") === "true") {
      console.log(
        "[PWA Install] Debug mode enabled - Run window.$pwaTest() to test install"
      );
      window.$pwaTest = () => {
        this.showPrompt = true;
      };
      window.$pwaReset = () => {
        localStorage.removeItem("pwa-install-dismissed");
        sessionStorage.removeItem("pwa-update-dismissed");
        console.log("[PWA Install] Reset install state - reload page");
      };
      window.$pwaDiagnostics = () => {
        this.runPWADiagnostics();
      };
    }

    console.log("[PWA Install] Checking PWA installability...");
    // Use the PWA composable from @vite-pwa/nuxt
    // The module exposes $pwa which we can access
    this.checkPWAInstallability();

    // Periodically check if app becomes installed (useful if user installs while prompt is shown)
    this.installCheckInterval = setInterval(() => {
      if (this.isInstalled() && this.showPrompt) {
        console.log("[PWA Install] App is now installed, hiding prompt");
        this.showPrompt = false;
        this.deferredPrompt = null;
      }
    }, 10000);
  },
  methods: {
    runPWADiagnostics() {
      // Comprehensive PWA diagnostics to help debug installability issues
      console.group("🔍 PWA Diagnostics");

      // 1. Check environment
      console.log("📋 Environment Check:");
      console.log({
        isSecure:
          window.location.protocol === "https:" ||
          window.location.hostname === "localhost",
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        userAgent: navigator.userAgent,
      });

      // 2. Check service worker
      console.log("\n🔧 Service Worker:");
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          console.log({
            supported: true,
            registrationCount: registrations.length,
            registrations: registrations.map((reg) => ({
              scope: reg.scope,
              active: !!reg.active,
              waiting: !!reg.waiting,
              installing: !!reg.installing,
            })),
          });
        });
      } else {
        console.log({ supported: false });
      }

      // 3. Check manifest
      console.log("\n📄 Manifest:");
      const manifestLink = document.querySelector('link[rel="manifest"]');
      if (manifestLink) {
        console.log({
          found: true,
          href: manifestLink.href,
        });
        // Try to fetch and validate manifest
        fetch(manifestLink.href)
          .then((res) => res.json())
          .then((manifest) => {
            console.log("Manifest contents:", manifest);
            console.log("Manifest validation:", {
              hasName: !!(manifest.name || manifest.short_name),
              hasStartUrl: !!manifest.start_url,
              hasDisplay: !!manifest.display,
              hasIcons: manifest.icons && manifest.icons.length > 0,
              iconSizes: manifest.icons?.map((i) => i.sizes),
            });
          })
          .catch((err) => {
            console.error("Failed to fetch manifest:", err);
          });
      } else {
        console.log({ found: false });
      }

      // 4. Check display mode
      console.log("\n🖥️ Display Mode:");
      console.log({
        current: window.matchMedia("(display-mode: standalone)").matches
          ? "standalone"
          : window.matchMedia("(display-mode: minimal-ui)").matches
          ? "minimal-ui"
          : window.matchMedia("(display-mode: fullscreen)").matches
          ? "fullscreen"
          : "browser",
        isStandalone: window.matchMedia("(display-mode: standalone)").matches,
        iosStandalone: window.navigator.standalone,
      });

      // 5. Check browser support for beforeinstallprompt
      console.log("\n🌐 Browser Support:");
      const isChrome = /Chrome/.test(navigator.userAgent);
      const isEdge = /Edg/.test(navigator.userAgent);
      const isSafari =
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent);
      const isFirefox = /Firefox/.test(navigator.userAgent);
      const supportedBrowser = isChrome || isEdge;

      console.log({
        isChrome,
        isEdge,
        isSafari,
        isFirefox,
        supportsBeforeInstallPrompt: supportedBrowser,
        note: !supportedBrowser
          ? "This browser may not fire beforeinstallprompt event"
          : "Browser should support beforeinstallprompt",
      });

      // 6. Check install criteria
      console.log("\n✅ Install Criteria:");
      console.log({
        isHTTPS:
          window.location.protocol === "https:" ||
          window.location.hostname === "localhost",
        hasManifest: !!document.querySelector('link[rel="manifest"]'),
        hasServiceWorker: "serviceWorker" in navigator,
        notAlreadyInstalled: !this.isInstalled(),
        browserSupported: supportedBrowser,
      });

      // 7. Common issues
      console.log("\n⚠️ Common Issues to Check:");
      console.log(`
1. App already installed? ${
        this.isInstalled() ? "YES - This prevents the event" : "No"
      }
2. HTTPS required? ${
        window.location.protocol === "https:" ||
        window.location.hostname === "localhost"
          ? "✓ OK"
          : "✗ FAIL"
      }
3. Manifest linked? ${
        !!document.querySelector('link[rel="manifest"]') ? "✓ OK" : "✗ FAIL"
      }
4. Service Worker? ${"serviceWorker" in navigator ? "✓ OK" : "✗ FAIL"}
5. Supported browser? ${
        supportedBrowser ? "✓ OK" : "✗ Safari/Firefox don't fire the event"
      }
6. User dismissed before? ${
        localStorage.getItem("pwa-install-dismissed")
          ? "YES - wait 7 days"
          : "No"
      }
      `);

      console.groupEnd();
    },
    isInstalled() {
      // Check if running as standalone (installed)
      if (window.matchMedia("(display-mode: standalone)").matches) {
        return true;
      }
      // Check if running in standalone mode on iOS
      if (window.navigator.standalone === true) {
        return true;
      }
      // Check for PWA source parameter (launched from installed app)
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("source") === "pwa") {
        return true;
      }
      // Check for minimal-ui or fullscreen display modes
      if (
        window.matchMedia("(display-mode: minimal-ui)").matches ||
        window.matchMedia("(display-mode: fullscreen)").matches
      ) {
        return true;
      }
      return false;
    },
    async checkManifestInstallability() {
      // Enhanced manifest validation
      try {
        const manifestLink = document.querySelector('link[rel="manifest"]');
        if (!manifestLink) {
          console.warn("[PWA Install] No manifest link found");
          return false;
        }

        const manifestUrl = manifestLink.href;
        console.log("[PWA Install] Fetching manifest from:", manifestUrl);

        const response = await fetch(manifestUrl);
        if (!response.ok) {
          console.error(
            "[PWA Install] Manifest fetch failed:",
            response.status
          );
          return false;
        }

        const manifest = await response.json();
        console.log("[PWA Install] Manifest loaded:", {
          name: manifest.name,
          short_name: manifest.short_name,
          start_url: manifest.start_url,
          display: manifest.display,
          icons: manifest.icons?.length || 0,
        });

        // Validate manifest has required fields for installability
        const hasName = manifest.name || manifest.short_name;
        const hasStartUrl = manifest.start_url;
        const hasDisplay = manifest.display;
        const hasIcons =
          manifest.icons &&
          manifest.icons.length > 0 &&
          manifest.icons.some(
            (icon) =>
              icon.sizes &&
              (icon.sizes.includes("192x192") || icon.sizes.includes("512x512"))
          );

        console.log("[PWA Install] Manifest validation:", {
          hasName,
          hasStartUrl,
          hasDisplay,
          hasIcons,
          isValid: hasName && hasStartUrl && hasDisplay && hasIcons,
        });

        return hasName && hasStartUrl && hasDisplay && hasIcons;
      } catch (error) {
        console.error("[PWA Install] Manifest validation error:", error);
        return false;
      }
    },
    async checkPWAInstallability() {
      // Listen for the beforeinstallprompt event
      // The @vite-pwa/nuxt module with installPrompt: true should fire this
      console.log("[PWA Install] Adding beforeinstallprompt listener");
      window.addEventListener(
        "beforeinstallprompt",
        this.handleBeforeInstallPrompt
      );

      // Also check if service worker is ready (PWA might be installable)
      if ("serviceWorker" in navigator) {
        console.log(
          "[PWA Install] Service worker supported, waiting for ready..."
        );

        try {
          await navigator.serviceWorker.ready;
          console.log("[PWA Install] Service worker is ready");

          // Enhanced installability checks
          const isHTTPS =
            window.location.protocol === "https:" ||
            window.location.hostname === "localhost";
          const hasManifest = document.querySelector('link[rel="manifest"]');

          console.log("[PWA Install] Environment check:", {
            isHTTPS,
            hasManifest: !!hasManifest,
            manifestUrl: hasManifest?.href,
            userAgent: navigator.userAgent,
            platform: navigator.platform,
          });

          if (isHTTPS && hasManifest) {
            // Validate manifest contents
            const isManifestValid = await this.checkManifestInstallability();

            if (!isManifestValid) {
              console.warn(
                "[PWA Install] Manifest validation failed - app may not be installable"
              );
            }

            // Detect browser type for better diagnostics
            const isChrome = /Chrome/.test(navigator.userAgent);
            const isEdge = /Edg/.test(navigator.userAgent);
            const isSafari =
              /Safari/.test(navigator.userAgent) &&
              !/Chrome/.test(navigator.userAgent);
            const isFirefox = /Firefox/.test(navigator.userAgent);
            const isMobile = /Mobile|Android|iPhone|iPad/.test(
              navigator.userAgent
            );

            console.log("[PWA Install] Browser detection:", {
              isChrome,
              isEdge,
              isSafari,
              isFirefox,
              isMobile,
            });

            // Show prompt after a delay even if beforeinstallprompt hasn't fired yet
            // This is especially important for browsers that don't fire the event
            console.log(
              "[PWA Install] Will show fallback prompt in 8 seconds if no event fires"
            );

            setTimeout(() => {
              // Check if installed before showing fallback prompt
              if (
                !this.isInstalled() &&
                !this.dismissedPrompt &&
                !this.showPrompt &&
                !this.deferredPrompt
              ) {
                console.log(
                  "[PWA Install] Showing fallback prompt (no beforeinstallprompt event received)"
                );
                console.log(
                  "[PWA Install] This is normal for Safari and some other browsers"
                );
                this.showPrompt = true;
              } else {
                console.log("[PWA Install] Not showing fallback:", {
                  installed: this.isInstalled(),
                  dismissed: this.dismissedPrompt,
                  alreadyShowing: this.showPrompt,
                  hasDeferred: !!this.deferredPrompt,
                });
              }
            }, 8000);
          } else {
            console.log(
              "[PWA Install] Cannot show prompt - requirements not met:",
              { isHTTPS, hasManifest: !!hasManifest }
            );
          }
        } catch (error) {
          console.error(
            "[PWA Install] Error during installability check:",
            error
          );
        }
      } else {
        console.log("[PWA Install] Service worker not supported");
      }
    },
    handleBeforeInstallPrompt(e) {
      console.log("[PWA Install] beforeinstallprompt event fired!");

      // Check if app is already installed before preventing default
      if (this.isInstalled()) {
        console.log(
          "[PWA Install] App is already installed, not preventing default"
        );
        return;
      }

      // Prevent the default browser install prompt
      e.preventDefault();
      // Store the event for later use
      this.deferredPrompt = e;
      // Show the prompt after a short delay
      setTimeout(() => {
        // Check again if installed before showing
        if (!this.isInstalled() && !this.showPrompt && !this.dismissedPrompt) {
          console.log("[PWA Install] Showing prompt after beforeinstallprompt");
          this.showPrompt = true;
        } else if (this.isInstalled()) {
          console.log(
            "[PWA Install] App installed during delay, not showing prompt"
          );
          // Since we prevented default, we need to call prompt() to satisfy browser
          e.prompt().catch((error) => {
            console.error("[PWA Install] Error calling prompt:", error);
          });
        }
      }, 2000);
    },
    async handleInstall() {
      console.log("[PWA Install] Install button clicked");
      console.log("[PWA Install] Has deferred prompt:", !!this.deferredPrompt);

      // Diagnostic: Check service worker registration
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistration().then((registration) => {
          console.log("[PWA Install] Service worker registration:", {
            active: !!registration?.active,
            installing: !!registration?.installing,
            waiting: !!registration?.waiting,
            scope: registration?.scope,
          });
        });
      }

      // Diagnostic: Check manifest
      const manifestLink = document.querySelector('link[rel="manifest"]');
      console.log("[PWA Install] Manifest link:", manifestLink?.href);

      // Diagnostic: Check if running in standalone mode
      console.log("[PWA Install] Is standalone:", this.isInstalled());

      if (this.deferredPrompt) {
        // Validate that the deferredPrompt still has the prompt method
        if (typeof this.deferredPrompt.prompt !== "function") {
          console.error(
            "[PWA Install] Deferred prompt is invalid - missing prompt() method"
          );
          this.deferredPrompt = null;
          await this.tryFallbackInstall();
          return;
        }

        try {
          console.log("[PWA Install] Showing native install prompt");
          console.log(
            "[PWA Install] Deferred prompt type:",
            typeof this.deferredPrompt
          );
          console.log(
            "[PWA Install] Deferred prompt methods:",
            Object.keys(this.deferredPrompt)
          );

          // Verify userChoice exists before calling prompt()
          if (!this.deferredPrompt.userChoice) {
            throw new Error("Deferred prompt is missing userChoice property");
          }

          // Show the install prompt - this must be called in response to a user gesture
          // The prompt() method triggers the browser's native install prompt
          // Note: prompt() is synchronous and doesn't return a promise, but it can throw
          try {
            this.deferredPrompt.prompt();
            console.log(
              "[PWA Install] prompt() called successfully, waiting for user choice..."
            );
          } catch (promptError) {
            // If prompt() throws immediately, the event might be invalid
            console.error(
              "[PWA Install] prompt() threw an error:",
              promptError
            );
            throw new Error(
              `Failed to show install prompt: ${promptError.message}`
            );
          }

          // Wait for the user to respond to the prompt
          // userChoice is a Promise that resolves when the user interacts with the prompt
          // Add a timeout to detect if the prompt doesn't show (30 seconds should be enough)
          const userChoicePromise = this.deferredPrompt.userChoice;
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(
              () =>
                reject(
                  new Error(
                    "Prompt timeout - browser prompt may not have appeared. The prompt() method was called but the browser didn't show the install dialog."
                  )
                ),
              30000
            )
          );

          const { outcome } = await Promise.race([
            userChoicePromise,
            timeoutPromise,
          ]);
          console.log("[PWA Install] User choice:", outcome);

          if (outcome === "accepted") {
            console.log("[PWA Install] User accepted installation");
            this.$emit("installed");
          } else {
            console.log("[PWA Install] User dismissed installation");
            this.handleDismiss();
          }

          // Clear the deferred prompt after use (can only be used once)
          this.deferredPrompt = null;
          this.showPrompt = false;
        } catch (error) {
          console.error("[PWA Install] Error showing prompt:", error);
          console.error("[PWA Install] Error details:", {
            name: error?.name,
            message: error?.message,
            stack: error?.stack,
          });
          // If prompt() fails or userChoice rejects, the deferredPrompt might be invalid
          // Clear it and try fallback
          this.deferredPrompt = null;
          // Try fallback methods
          await this.tryFallbackInstall();
        }
      } else {
        console.log(
          "[PWA Install] No deferred prompt available, trying fallback"
        );
        await this.tryFallbackInstall();
      }
    },
    async tryFallbackInstall() {
      // Try to use PWA composable if available
      try {
        // Check for usePwa composable (from @vite-pwa/nuxt)
        if (typeof usePwa !== "undefined" && typeof usePwa === "function") {
          const pwa = usePwa();
          if (pwa && typeof pwa.install === "function") {
            console.log("[PWA Install] Trying usePwa().install()");
            await pwa.install();
            this.$emit("installed");
            this.showPrompt = false;
            return;
          }
        }

        // Try accessing $pwa from component instance
        const pwa = this.$pwa || (typeof window !== "undefined" && window.$pwa);
        if (pwa && typeof pwa.install === "function") {
          console.log("[PWA Install] Trying $pwa.install()");
          await pwa.install();
          this.$emit("installed");
          this.showPrompt = false;
          return;
        }

        // If no install method is available, show manual instructions
        console.log(
          "[PWA Install] No install method available, showing manual instructions"
        );
        this.showManualInstallInstructions();
      } catch (error) {
        console.error("[PWA Install] Fallback installation failed:", error);
        this.showManualInstallInstructions();
      }
    },
    async handleDismiss() {
      // Store dismissal timestamp
      localStorage.setItem("pwa-install-dismissed", Date.now().toString());
      this.dismissedPrompt = true;
      this.showPrompt = false;

      // If we prevented default, we must call prompt() to satisfy browser requirement
      // This ensures the browser's install prompt can still be shown (even if user dismissed ours)
      if (this.deferredPrompt) {
        console.log(
          "[PWA Install] User dismissed, calling prompt() to satisfy browser requirement"
        );
        try {
          // Call prompt() to satisfy browser requirement - this allows the browser's
          // native install prompt to be shown, giving user another opportunity
          await this.deferredPrompt.prompt();
          // Wait for user choice to properly complete the prompt lifecycle
          await this.deferredPrompt.userChoice;
        } catch (error) {
          console.error(
            "[PWA Install] Error calling prompt on dismiss:",
            error
          );
        } finally {
          this.deferredPrompt = null;
        }
      }
    },
    showManualInstallInstructions() {
      // Hide the install prompt
      this.showPrompt = false;

      // Enhanced browser and platform detection
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );
      const isChrome =
        /Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor);
      const isEdge = /Edg/.test(navigator.userAgent);
      const isFirefox = /Firefox/.test(navigator.userAgent);
      const isSamsung = /SamsungBrowser/.test(navigator.userAgent);

      let message = "";

      // Provide specific instructions based on browser/platform
      if (isIOS) {
        if (isSafari) {
          message = this.$t("installPrompt.iosSafariInstructions");
        } else {
          message =
            this.$t("installPrompt.iosOtherBrowserInstructions") ||
            "На iOS додаток можна встановити тільки через Safari. Відкрийте цей сайт у Safari та натисніть 'Поділитися' → 'На екран Домівка'";
        }
      } else if (isAndroid) {
        if (isChrome) {
          message =
            this.$t("installPrompt.androidChromeInstructions") ||
            this.$t("installPrompt.chromeInstructions");
        } else if (isFirefox) {
          message =
            this.$t("installPrompt.androidFirefoxInstructions") ||
            "У Firefox: Натисніть меню (три крапки) → 'Встановити' або 'Додати на головний екран'";
        } else if (isSamsung) {
          message =
            this.$t("installPrompt.androidSamsungInstructions") ||
            "У Samsung Internet: Натисніть меню → 'Додати сторінку до' → 'Головний екран'";
        } else {
          message =
            this.$t("installPrompt.androidGenericInstructions") ||
            "Натисніть меню браузера та оберіть 'Додати на головний екран' або 'Встановити'";
        }
      } else if (isChrome || isEdge) {
        message = this.$t("installPrompt.chromeInstructions");
      } else if (isFirefox) {
        message =
          this.$t("installPrompt.firefoxInstructions") ||
          "У Firefox Desktop PWA підтримується обмежено. Спробуйте Chrome або Edge для кращого досвіду.";
      } else {
        message = this.$t("installPrompt.genericInstructions");
      }

      // Show modal with instructions
      this.manualInstructionText = message;
      this.showInstructions = true;

      console.log("[PWA Install] Showed manual instructions:", {
        browser: {
          isIOS,
          isAndroid,
          isSafari,
          isChrome,
          isEdge,
          isFirefox,
          isSamsung,
        },
        message,
      });

      // Don't dismiss the prompt so it can be shown again later
      // this.handleDismiss();
    },
    closeInstructions() {
      this.showInstructions = false;
      this.manualInstructionText = "";
    },
  },
};
</script>

<style lang="scss">
.install-toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;

  &__content {
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    padding: 8px 12px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__message {
    margin: 0;
    font-size: rem(12);
    line-height: 1.4;
    color: #ffffff;
    flex: 1;
  }

  &__actions {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
  }

  &__button {
    padding: 5px 12px;
    border: none;
    border-radius: 4px;
    font-size: rem(12);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &--yes {
      background-color: var(--colors-accent);
      color: #ffffff;

      &:hover {
        background-color: #e6940f;
      }

      &:active {
        transform: scale(0.98);
      }
    }

    &--no {
      background-color: transparent;
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.3);

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
      }

      &:active {
        transform: scale(0.98);
      }
    }
  }
}

// Toast animation
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@include media-breakpoint-down(sm) {
  .install-toast {
    bottom: 16px;
    right: 16px;
    left: 16px;
    max-width: none;

    &__content {
      padding: 8px 12px;
      flex-wrap: wrap;
    }

    &__message {
      font-size: rem(12);
      width: 100%;
      margin-bottom: 4px;
    }

    &__actions {
      width: 100%;
      justify-content: flex-end;
    }

    &__button {
      padding: 5px 12px;
      font-size: rem(11);
    }
  }

  .toast-enter-from,
  .toast-leave-to {
    transform: translateX(20px);
  }
}

// Modal styles
.install-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.install-modal {
  background-color: var(--white);
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid var(--colors-grey-200);
  }

  &__title {
    margin: 0;
    font-size: rem(20);
    font-weight: 700;
    color: var(--colors-text-primary);
  }

  &__close {
    background: none;
    border: none;
    font-size: 32px;
    line-height: 1;
    color: var(--colors-text-secondary);
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--colors-grey-200);
      color: var(--colors-text-primary);
    }
  }

  &__body {
    padding: 24px;
  }

  &__text {
    margin: 0;
    font-size: rem(16);
    line-height: 1.6;
    color: var(--colors-text-primary);
  }

  &__footer {
    padding: 16px 24px;
    border-top: 1px solid var(--colors-grey-200);
    display: flex;
    justify-content: flex-end;
  }
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Modal animation
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;

  .install-modal {
    transition: transform 0.3s ease;
  }
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;

  .install-modal {
    transform: scale(0.95) translateY(-10px);
  }
}

@include media-breakpoint-down(sm) {
  .install-modal {
    max-width: 100%;
    margin: 0 16px;

    &__header {
      padding: 16px 20px;
    }

    &__title {
      font-size: rem(18);
    }

    &__body {
      padding: 20px;
    }

    &__text {
      font-size: rem(14);
    }

    &__footer {
      padding: 12px 20px;
    }
  }
}
</style>

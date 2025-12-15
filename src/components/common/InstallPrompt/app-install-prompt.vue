<template>
  <Transition name="toast">
    <div v-if="showPrompt" class="install-toast">
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
</template>

<script>
export default {
  name: "AppInstallPrompt",
  data() {
    return {
      showPrompt: false,
      deferredPrompt: null,
      dismissedPrompt: false,
    };
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener(
        "beforeinstallprompt",
        this.handleBeforeInstallPrompt
      );
    }
  },
  mounted() {
    // Only run on client side
    if (typeof window === "undefined") {
      return;
    }

    console.log("[PWA Install] Component mounted");

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

    console.log("[PWA Install] Checking PWA installability...");
    // Use the PWA composable from @vite-pwa/nuxt
    // The module exposes $pwa which we can access
    this.checkPWAInstallability();
  },
  methods: {
    isInstalled() {
      // Check if running as standalone (installed)
      if (window.matchMedia("(display-mode: standalone)").matches) {
        return true;
      }
      // Check if running in standalone mode on iOS
      if (window.navigator.standalone === true) {
        return true;
      }
      return false;
    },
    checkPWAInstallability() {
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
        navigator.serviceWorker.ready.then(() => {
          console.log("[PWA Install] Service worker is ready");
          // Check if PWA is installable
          const isHTTPS =
            window.location.protocol === "https:" ||
            window.location.hostname === "localhost";
          const hasManifest = document.querySelector('link[rel="manifest"]');
          console.log("[PWA Install] HTTPS/localhost:", isHTTPS);
          console.log(
            "[PWA Install] Has manifest:",
            !!hasManifest,
            hasManifest?.href
          );
          if (isHTTPS && hasManifest) {
            // Show prompt after a delay even if beforeinstallprompt hasn't fired yet
            console.log(
              "[PWA Install] Will show fallback prompt in 8 seconds if no event fires"
            );
            setTimeout(() => {
              if (
                !this.dismissedPrompt &&
                !this.showPrompt &&
                !this.deferredPrompt
              ) {
                console.log(
                  "[PWA Install] Showing fallback prompt (no beforeinstallprompt event received)"
                );
                this.showPrompt = true;
              } else {
                console.log("[PWA Install] Not showing fallback:", {
                  dismissed: this.dismissedPrompt,
                  alreadyShowing: this.showPrompt,
                  hasDeferred: !!this.deferredPrompt,
                });
              }
            }, 8000);
          } else {
            console.log(
              "[PWA Install] Cannot show prompt - requirements not met"
            );
          }
        });
      } else {
        console.log("[PWA Install] Service worker not supported");
      }
    },
    handleBeforeInstallPrompt(e) {
      console.log("[PWA Install] beforeinstallprompt event fired!");
      // Prevent the default browser install prompt
      e.preventDefault();
      // Store the event for later use
      this.deferredPrompt = e;
      // Show the prompt after a short delay
      setTimeout(() => {
        if (!this.showPrompt && !this.dismissedPrompt) {
          console.log("[PWA Install] Showing prompt after beforeinstallprompt");
          this.showPrompt = true;
        }
      }, 2000);
    },
    async handleInstall() {
      if (this.deferredPrompt) {
        // Show the install prompt
        this.deferredPrompt.prompt();

        // Wait for the user to respond
        const { outcome } = await this.deferredPrompt.userChoice;

        if (outcome === "accepted") {
          this.$emit("installed");
        } else {
          this.handleDismiss();
        }

        // Clear the deferred prompt
        this.deferredPrompt = null;
        this.showPrompt = false;
      } else {
        // Fallback: try to use PWA composable if available
        const pwa = this.$pwa || (typeof window !== "undefined" && window.$pwa);
        if (pwa && typeof pwa.install === "function") {
          try {
            await pwa.install();
            this.$emit("installed");
            this.showPrompt = false;
          } catch (error) {
            console.error("[PWA Install] Installation failed:", error);
            this.showManualInstallInstructions();
            this.handleDismiss();
          }
        } else {
          this.showManualInstallInstructions();
          this.handleDismiss();
        }
      }
    },
    handleDismiss() {
      // Store dismissal timestamp
      localStorage.setItem("pwa-install-dismissed", Date.now().toString());
      this.dismissedPrompt = true;
      this.showPrompt = false;
    },
    showManualInstallInstructions() {
      // This could show a modal with manual install instructions
      // For now, silently fail
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
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: var(--colors-text-primary);
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
</style>

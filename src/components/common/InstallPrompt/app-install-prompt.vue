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

      if (this.deferredPrompt) {
        try {
          console.log("[PWA Install] Showing native install prompt");
          // Show the install prompt
          this.deferredPrompt.prompt();

          // Wait for the user to respond
          const { outcome } = await this.deferredPrompt.userChoice;
          console.log("[PWA Install] User choice:", outcome);

          if (outcome === "accepted") {
            this.$emit("installed");
          } else {
            this.handleDismiss();
          }

          // Clear the deferred prompt
          this.deferredPrompt = null;
          this.showPrompt = false;
        } catch (error) {
          console.error("[PWA Install] Error showing prompt:", error);
          this.showManualInstallInstructions();
        }
      } else {
        console.log(
          "[PWA Install] No deferred prompt available, trying fallback"
        );
        // Fallback: try to use PWA composable if available
        const pwa = this.$pwa || (typeof window !== "undefined" && window.$pwa);
        if (pwa && typeof pwa.install === "function") {
          try {
            console.log("[PWA Install] Trying $pwa.install()");
            await pwa.install();
            this.$emit("installed");
            this.showPrompt = false;
          } catch (error) {
            console.error("[PWA Install] Installation failed:", error);
            this.showManualInstallInstructions();
          }
        } else {
          console.log(
            "[PWA Install] No PWA composable available, showing manual instructions"
          );
          this.showManualInstallInstructions();
        }
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

      // Detect browser and platform
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );
      const isChrome = /Chrome/.test(navigator.userAgent);

      let message = "";

      if (isIOS && isSafari) {
        message = this.$t("installPrompt.iosSafariInstructions");
      } else if (isChrome) {
        message = this.$t("installPrompt.chromeInstructions");
      } else {
        message = this.$t("installPrompt.genericInstructions");
      }

      // Show modal with instructions
      this.manualInstructionText = message;
      this.showInstructions = true;

      console.log("[PWA Install] Showed manual instructions:", message);

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

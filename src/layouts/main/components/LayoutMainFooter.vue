<template>
  <ClientOnly>
    <footer class="app-footer">
      <div class="container">
        <div class="app-footer__inner">
          <div class="app-copyright">
            {{ $t("footer.copyright") }}
          </div>
          <div class="app-footer__actions">
            <button
              v-if="showInstallButton"
              type="button"
              class="app-footer__install-button"
              @click="handleInstall"
              aria-label="Install the app"
            >
              <svg
                class="app-footer__install-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {{ $t("installPrompt.installButton") }}
            </button>
          </div>
          <div class="app-social">
            <a
              href="https://instagram.com/etage.com.ua/"
              class="app-social__link"
              target="_blank"
              aria-label="Visit our Instagram"
              rel="noopener noreferrer"
            >
              <svg-icon name="icon_in" original />
            </a>
            <a
              href="https://www.facebook.com/groups/2522732927949314/?ref=share_group_link"
              class="app-social__link"
              target="_blank"
              aria-label="Visit our Facebook page"
              rel="noopener noreferrer"
            >
              <svg-icon name="icon_fb" original />
            </a>
            <a
              href="https://t.me/+380953560005"
              class="app-social__link"
              target="_blank"
              aria-label="Contact us on Telegram"
              rel="noopener noreferrer"
            >
              <svg-icon name="icon_tg" original />
            </a>
            <a
              href="https://viber.click/380953560005"
              class="app-social__link"
              target="_blank"
              aria-label="Contact us on Viber"
              rel="noopener noreferrer"
            >
              <svg-icon name="icon_vb" original />
            </a>
            <a
              href="https://wa.me/380953560005"
              class="app-social__link"
              target="_blank"
              aria-label="Contact us on WhatsApp"
              rel="noopener noreferrer"
            >
              <svg-icon name="icon_wa" original />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </ClientOnly>
</template>

<script>
export default {
  name: "LayoutMainFooter",
  data() {
    return {
      showInstallButton: false,
      deferredPrompt: null,
    };
  },
  mounted() {
    if (typeof window === "undefined") {
      return;
    }

    // Don't show if already installed
    if (this.isInstalled()) {
      return;
    }

    // Listen for the beforeinstallprompt event
    window.addEventListener(
      "beforeinstallprompt",
      this.handleBeforeInstallPrompt
    );

    // Check if service worker is ready
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(() => {
        const isHTTPS =
          window.location.protocol === "https:" ||
          window.location.hostname === "localhost";
        const hasManifest = document.querySelector('link[rel="manifest"]');
        if (isHTTPS && hasManifest) {
          // Show button if PWA appears installable
          // Show the button even if beforeinstallprompt hasn't fired yet
          setTimeout(() => {
            if (!this.showInstallButton) {
              console.log(
                "[Footer] Showing install button (PWA requirements met)"
              );
              this.showInstallButton = true;
            }
          }, 1000);
        }
      });
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener(
        "beforeinstallprompt",
        this.handleBeforeInstallPrompt
      );
    }
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
    handleBeforeInstallPrompt(e) {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton = true;
    },
    async handleInstall() {
      if (this.deferredPrompt) {
        console.log("[Footer] Using deferred prompt to install");
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log("[Footer] Install outcome:", outcome);
        if (outcome === "accepted") {
          this.showInstallButton = false;
        }
        this.deferredPrompt = null;
      } else {
        console.log(
          "[Footer] No deferred prompt, trying alternative install methods"
        );
        const pwa = this.$pwa || (typeof window !== "undefined" && window.$pwa);
        if (pwa && typeof pwa.install === "function") {
          try {
            await pwa.install();
            this.showInstallButton = false;
          } catch (error) {
            console.error("[Footer] Installation failed:", error);
            // Show instructions for manual installation
            this.showManualInstallInstructions();
          }
        } else {
          console.log(
            "[Footer] No PWA install method available, showing manual instructions"
          );
          this.showManualInstallInstructions();
        }
      }
    },
    showManualInstallInstructions() {
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

      alert(message);

      console.log("[Footer] Showed manual install instructions:", {
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
    },
  },
};
</script>

<style lang="scss">
.app-footer__inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 15px;
}

.app-social {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &__link {
    // background-color: var(--colors-grey-100);

    & + & {
      margin-left: 15px;
    }

    svg {
      @include size(20px);
    }
  }
}

.app-footer__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.app-footer__install-button {
  color: var(--colors-accent);
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:focus {
    outline: 2px solid var(--colors-accent);
    outline-offset: 2px;
  }
}

.app-footer__install-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

@media screen and (max-width: 992px) {
  .app-footer__inner {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    justify-items: center;
  }

  .app-copyright {
    display: none;
  }

  .app-footer__actions {
    justify-content: center;
    flex-direction: column;
    gap: 12px;
  }

  .app-footer__install-button {
    font-size: rem(11);
    padding: 5px 12px;
  }

  .app-social {
    &__link {
      svg {
        @include size(30px);
      }
    }
  }
}
</style>

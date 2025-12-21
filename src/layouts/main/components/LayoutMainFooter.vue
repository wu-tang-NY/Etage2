<template>
  <ClientOnly>
    <footer
      class="lg:border-t lg:fixed bottom-0 left-0 w-full font-medium text-xs border-solid border-grey-200 bg-white dark:bg-dark"
    >
      <div class="container">
        <div
          class="lg:py-2 lg:h-[50px] grid lg:grid-cols-3 lg:items-center gap-4"
        >
          <div
            class="flex items-center justify-center gap-6 lg:gap-4 flex-wrap lg:justify-end lg:order-3"
          >
            <social-icon
              v-for="icon in socialIcons"
              :key="icon.href"
              :href="icon.href"
              :icon-name="icon.iconName"
              :original="icon.original"
              :aria-label="icon.ariaLabel"
            />
          </div>
          <div class="flex items-center justify-center gap-12 order-2">
            <button
              v-if="showInstallButton"
              type="button"
              class="inline-flex items-center gap-1.5 border-none cursor-pointer text-[var(--colors-accent)] focus:outline-2 focus:outline-[var(--colors-accent)] focus:outline-offset-2 text-[11px] py-[5px] px-3 lg:text-xs lg:py-0 lg:px-0"
              @click="handleInstall"
              aria-label="Install the app"
            >
              <svg
                class="w-4 h-4 shrink-0"
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
          <div class="text-center lg:text-left text-grey-600 lg:order-1">
            {{ $t("footer.copyright") }}
          </div>
        </div>
      </div>
    </footer>
  </ClientOnly>
</template>

<script>
import SocialIcon from "@/components/common/SocialIcon.vue";
export default {
  name: "LayoutMainFooter",
  components: {
    SocialIcon,
  },
  data() {
    return {
      showInstallButton: false,
      deferredPrompt: null,
      socialIcons: [
        {
          href: "https://instagram.com/etage.com.ua/",
          iconName: "icon_in",
          ariaLabel: "Visit our Instagram",
        },
        {
          href: "https://www.facebook.com/groups/2522732927949314/?ref=share_group_link",
          iconName: "icon_fb",
          ariaLabel: "Visit our Facebook",
        },
        {
          href: "https://viber.click/380953560005",
          iconName: "icon_vb",
          ariaLabel: "Contact us on Viber",
        },
        {
          href: "https://wa.me/380953560005",
          iconName: "icon_wa",
          ariaLabel: "Contact us on WhatsApp",
        },
        {
          href: "https://t.me/+380953560005",
          iconName: "icon_tg",
          ariaLabel: "Contact us on Telegram",
        },
      ],
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

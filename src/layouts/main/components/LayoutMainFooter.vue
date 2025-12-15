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
              {{ $t("installPrompt.installButton") }}
            </button>
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
            </div>
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
          setTimeout(() => {
            if (this.deferredPrompt) {
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
      if (window.matchMedia("(display-mode: standalone)").matches) {
        return true;
      }
      if (window.navigator.standalone === true) {
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
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === "accepted") {
          this.showInstallButton = false;
        }
        this.deferredPrompt = null;
      } else {
        const pwa = this.$pwa || (typeof window !== "undefined" && window.$pwa);
        if (pwa && typeof pwa.install === "function") {
          try {
            await pwa.install();
            this.showInstallButton = false;
          } catch (error) {
            console.error("[PWA Install] Installation failed:", error);
          }
        }
      }
    },
  },
};
</script>

<style lang="scss">
.app-footer__inner {
  justify-content: space-between;
}

.app-footer__actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.app-footer__install-button {
  padding: 6px 16px;
  background-color: var(--colors-accent);
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: rem(12);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #e6940f;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: 2px solid var(--colors-accent);
    outline-offset: 2px;
  }
}

.app-social {
  display: flex;
  align-items: center;

  &__link {
    & + & {
      margin-left: 15px;
    }

    svg {
      @include size(24px);
    }
  }
}

@media screen and (max-width: 992px) {
  .app-footer__actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .app-footer__install-button {
    font-size: rem(11);
    padding: 5px 12px;
  }

  .app-social {
    margin-left: 20px;
    margin-bottom: 20px;

    &__link {
      svg {
        @include size(30px);
      }
    }
  }
}
</style>

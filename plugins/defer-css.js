/**
 * Optimize CSS loading by deferring non-critical stylesheets
 * Only defers stylesheets for components that are not immediately visible
 * (e.g., modals, popups, below-the-fold content)
 */
export default defineNuxtPlugin(() => {
  if (process.client) {
    // List of component patterns that are non-critical (not above the fold)
    const nonCriticalPatterns = [
      "modal",
      "popup",
      "PopupCont",
      "callback-modal",
      "feedback-modal",
      "error-500",
      "order", // Order form might not be immediately visible
    ];

    const isNonCritical = (href) => {
      return nonCriticalPatterns.some((pattern) =>
        href.toLowerCase().includes(pattern.toLowerCase())
      );
    };

    const optimizeCSS = () => {
      // Only defer stylesheets for non-critical components
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');

      stylesheets.forEach((link) => {
        // Skip if already optimized, is critical, or is fonts
        if (
          link.dataset.optimized ||
          link.hasAttribute("data-critical") ||
          link.href.includes("fonts.googleapis.com")
        ) {
          return;
        }

        // Only defer non-critical component styles
        if (isNonCritical(link.href)) {
          // Mark as optimized
          link.dataset.optimized = "true";

          // Use print media trick for non-blocking load
          if (link.media === "" || link.media === "all") {
            link.media = "print";
            link.onload = function () {
              this.media = "all";
              this.onload = null;
            };

            // Fallback: ensure it loads after page is interactive
            if (document.readyState === "complete") {
              setTimeout(() => {
                if (link.media === "print") {
                  link.media = "all";
                }
              }, 100);
            } else {
              window.addEventListener("load", () => {
                setTimeout(() => {
                  if (link.media === "print") {
                    link.media = "all";
                  }
                }, 100);
              });
            }
          }
        }
      });
    };

    // Run after page is interactive
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        // Wait for critical rendering to complete
        requestIdleCallback
          ? requestIdleCallback(optimizeCSS)
          : setTimeout(optimizeCSS, 200);
      });
    } else {
      requestIdleCallback
        ? requestIdleCallback(optimizeCSS)
        : setTimeout(optimizeCSS, 200);
    }

    // Also optimize stylesheets loaded dynamically
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (
            node.nodeName === "LINK" &&
            node.rel === "stylesheet" &&
            isNonCritical(node.href)
          ) {
            requestIdleCallback
              ? requestIdleCallback(optimizeCSS)
              : setTimeout(optimizeCSS, 50);
          }
        });
      });
    });

    observer.observe(document.head, {
      childList: true,
      subtree: false,
    });
  }
});

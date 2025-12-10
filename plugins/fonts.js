export default defineNuxtPlugin(() => {
  if (process.client) {
    // Handle async font loading for print media trick
    // This makes Google Fonts non-blocking by loading them asynchronously
    const fontLink = document.querySelector(
      'link[media="print"][href*="fonts.googleapis.com"]'
    );
    if (fontLink) {
      fontLink.onload = function () {
        this.media = "all";
      };
      // Fallback: if the stylesheet loads before onload fires, swap immediately
      if (fontLink.sheet) {
        fontLink.media = "all";
      } else {
        // Fallback timeout in case onload doesn't fire
        setTimeout(() => {
          if (fontLink.media === "print") {
            fontLink.media = "all";
          }
        }, 100);
      }
    }
  }
});

// Responsive breakpoint management utility
class BreakpointManager {
  constructor() {
    // Use plain properties - they will be made reactive by the plugin
    this.mobile = false;
    this.tablet = false;
    this.desktop = false;
    this.device = "desktop";

    // Only initialize on client side (not during SSR)
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  init() {
    // Initial check
    this.updateBreakpoints();

    // Listen for resize events
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.handleResize.bind(this));
      // Also listen for visibility changes to update when tab becomes visible
      if (typeof document !== "undefined") {
        document.addEventListener(
          "visibilitychange",
          this.handleVisibilityChange.bind(this)
        );
      }
    }
  }

  isMobile() {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(max-width: 767px)").matches;
  }

  isTablet() {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(min-width: 768px) and (max-width: 992px)")
      .matches;
  }

  isDesktop() {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(min-width: 993px)").matches;
  }

  updateBreakpoints() {
    if (typeof document === "undefined" || document.hidden) {
      return;
    }

    const wasMobile = this.mobile;
    const wasTablet = this.tablet;
    const wasDesktop = this.desktop;

    this.mobile = false;
    this.tablet = false;
    this.desktop = false;

    if (this.isMobile()) {
      this.device = "mobile";
      this.mobile = true;
    } else if (this.isTablet()) {
      this.device = "tablet";
      this.tablet = true;
    } else if (this.isDesktop()) {
      this.device = "desktop";
      this.desktop = true;
    }

    // Dispatch custom event for breakpoint change
    if (typeof window !== "undefined") {
      const changed =
        wasMobile !== this.mobile ||
        wasTablet !== this.tablet ||
        wasDesktop !== this.desktop;
      if (changed) {
        window.dispatchEvent(
          new CustomEvent("breakpointchange", {
            detail: {
              mobile: this.mobile,
              tablet: this.tablet,
              desktop: this.desktop,
              device: this.device,
            },
          })
        );
      }
    }
  }

  handleResize() {
    this.updateBreakpoints();
  }

  handleVisibilityChange() {
    if (typeof document !== "undefined" && !document.hidden) {
      this.updateBreakpoints();
    }
  }

  // Computed property: target device (alias for device, or can be customized)
  get target() {
    return this.device;
  }

  // Cleanup method
  destroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.handleResize.bind(this));
    }
    if (typeof document !== "undefined") {
      document.removeEventListener(
        "visibilitychange",
        this.handleVisibilityChange.bind(this)
      );
    }
  }
}

// Create singleton instance
const breakpointManager = new BreakpointManager();

export default breakpointManager;

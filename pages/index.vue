<template>
  <div
    class="app-page app-page--main page-main relative lg:top-[200px] pt-[150px] lg:pt-0"
    ref="page"
  >
    <ClientOnly>
      <template #default>
        <div v-if="mobile || tablet">
          <img
            :src="bgImageSrc"
            :srcset="bgImageSrcset"
            :sizes="bgImageAttrs.sizes"
            loading="lazy"
            alt=""
            title="Background"
            class="w-full h-[160px] md:h-[300px] object-cover"
          />
        </div>
        <div class="page-main__inner">
          <div
            class="page-main__sections flex flex-col lg:flex-row gap-24 lg:gap-0"
            ref="sectionsWrapper"
            id="sections"
          >
            <section
              class="app-section"
              :class="{ 'app-section--scroll': hasScroll }"
              :style="{
                width: !mobile && !tablet ? `${windowWidth}px` : '100%',
              }"
              v-for="(section, index) in Object.keys(sectionsComponents)"
              :key="section"
              :id="`section-${index + 1}`"
            >
              <div class="container mx-auto">
                <component
                  :is="section"
                  :active="activeSectionIndex === index"
                  :mobile="mobile"
                  :tablet="tablet"
                  :desktop="desktop"
                />
              </div>
            </section>
          </div>

          <div v-if="mobile || tablet" class="mb-10">
            <img
              :src="bgImageSrc"
              :srcset="bgImageSrcset"
              :sizes="bgImageAttrs.sizes"
              loading="lazy"
              alt=""
              title="Background"
              class="w-full h-[160px] md:h-[300px] object-cover"
            />
          </div>
          <div v-else class="page-main__bg bg">
            <div class="page-main__bg-inner">
              <div
                class="page-main__bg-image"
                :style="{ width: `${totalWidth}px` }"
                ref="bg"
              >
                <div class="page-main__bg-home">
                  <svg-icon name="home" class="page-main" original />
                </div>

                <div class="bg__from" ref="home1">
                  <div class="bg__home">
                    <svg-icon name="home_1" original />
                  </div>
                  <div class="bg__workers" ref="workers1">
                    <svg-icon name="workers_1" original />
                  </div>
                </div>

                <div class="bg__to" ref="home2">
                  <div class="bg__home">
                    <svg-icon name="home_2" original />
                  </div>
                  <div class="bg__workers" ref="workers2">
                    <svg-icon name="workers_1" original />
                  </div>
                </div>
              </div>

              <div class="page-main__bg-car bg-car" ref="car">
                <div class="bg-car__cloud" ref="clouds">
                  <car-cloud
                    :title="$t('main.carCloud.appraiser')"
                    icon="cloud_small"
                    icon-width="270"
                  />

                  <car-cloud icon="cloud_large" icon-width="370">
                    <div class="mb-2">
                      {{ $t("main.carCloud.families", { count: "3067" }) }}
                    </div>
                    <div>
                      {{ $t("main.carCloud.tons", { count: "572" }) }}
                    </div>
                  </car-cloud>
                </div>

                <div class="bg-car__image">
                  <svg-icon name="car" original />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #fallback>
        <div class="page-main__inner"></div>
      </template>
    </ClientOnly>
  </div>
</template>

<script>
import { unref } from "vue";
import themeManager from "@/utils/theme";

import sectionsComponents from "~/src/views/Main/sections";
import CarCloud from "~/src/views/Main/components/PageMainCarCloud.vue";

export default {
  name: "AppPageMain",
  components: {
    CarCloud,
    ...sectionsComponents,
  },
  data: () => ({
    windowWidth: 0,
    totalWidth: 0,

    activeSectionIndex: 0,

    scrollTriggers: [],
    scrollbarWidth: 0,
    animationModule: null,
    ScrollTrigger: null,

    hasScroll: false,
    initRetryCount: 0,
    maxInitRetries: 3,
    scrollTimeout: null,
    isDark: themeManager.isDark(),
    theme: themeManager.currentTheme,
    themeChangeHandler: null,
    breakpointChangeHandler: null,
  }),
  computed: {
    sectionsComponents() {
      return sectionsComponents;
    },

    getCarPos() {
      return this.$refs.car?.getBoundingClientRect();
    },

    mobile() {
      return unref(this.$mobile);
    },

    tablet() {
      return unref(this.$tablet);
    },

    desktop() {
      return unref(this.$desktop);
    },

    bgImageSrc() {
      return this.theme === "dark"
        ? "/images/bg_dark_mobile-600.png"
        : "/images/bg_mobile-600.png";
    },

    bgImageSrcset() {
      return this.bgImageAttrs.srcset;
    },

    bgImageAttrs() {
      if (this.theme === "dark") {
        // Return srcset and sizes for dark theme with different mobile sizes
        // Only include mobile sizes since these images are only shown on mobile/tablet
        return {
          srcset:
            "/images/bg_dark_mobile-600.png 600w, /images/bg_dark_mobile-800.png 800w, /images/bg_dark_mobile-1000.png 1000w",
          sizes: "100vw",
        };
      }

      if (this.theme === "light") {
        // Only include mobile sizes since these images are only shown on mobile/tablet
        return {
          srcset:
            "/images/bg_mobile-600.png 600w, /images/bg_mobile-800.png 800w, /images/bg_mobile-1000.png 1000w",
          sizes: "100vw",
        };
      }

      return {
        srcset: "/images/bg.png 1920w",
        sizes: "100vw",
      };
    },
  },
  methods: {
    onScroll() {
      if (typeof document === "undefined" || typeof window === "undefined")
        return;

      // Throttle scroll events for better performance
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }

      this.scrollTimeout = setTimeout(() => {
        // For mobile/tablet, detect which section is in view
        if (this.mobile || this.tablet) {
          const sections = document.querySelector("#sections");
          if (!sections) return;

          const sectionsArray = Array.from(sections.children);
          const scrollPosition =
            window.pageYOffset || document.documentElement.scrollTop;
          const viewportHeight = window.innerHeight;

          let activeIndex = 0;
          let maxVisible = 0;

          sectionsArray.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollPosition;
            const sectionBottom = sectionTop + rect.height;

            // Calculate how much of the section is visible in viewport
            const visibleTop = Math.max(scrollPosition, sectionTop);
            const visibleBottom = Math.min(
              scrollPosition + viewportHeight,
              sectionBottom
            );
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const visibleRatio = visibleHeight / rect.height;

            if (visibleRatio > maxVisible) {
              maxVisible = visibleRatio;
              activeIndex = index;
            }
          });

          // Update active section
          sectionsArray.forEach((section, index) => {
            section.classList.toggle("active", index === activeIndex);
          });

          if (this.activeSectionIndex !== activeIndex) {
            this.activeSectionIndex = activeIndex;
            if (this.$eventbus) {
              this.$eventbus.$emit("section:scroll", activeIndex);
            }
          }
        } else {
          // For desktop, check for active class (set by ScrollTrigger)
          const sections = document.querySelector("#sections");
          const el = sections?.querySelector("section.active");

          if (el) {
            const newIndex = Array.from(sections.children).indexOf(el);
            if (this.activeSectionIndex !== newIndex) {
              this.activeSectionIndex = newIndex;
              if (this.$eventbus) {
                this.$eventbus.$emit("section:scroll", newIndex);
              }
            }
          }
        }
      }, 50); // Throttle to 50ms
    },

    onResize() {
      if (typeof window === "undefined" || typeof document === "undefined")
        return;
      this.windowWidth = window.innerWidth;
      this.totalWidth =
        Object.keys(sectionsComponents).length * this.windowWidth;

      // Clean up existing ScrollTriggers (only on desktop)
      if (this.ScrollTrigger) {
        this.scrollTriggers.forEach((trigger) => trigger.kill());
        this.scrollTriggers = [];
        this.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }

      // Reset document heights before reinitializing
      document.documentElement.style.height = "";
      document.body.style.height = "";
      document.body.classList.remove("modal-open");

      this.updateScrollbarWidth();

      // Use nextTick to ensure refs are available
      this.$nextTick(() => {
        this.initAnimations();
      });
    },

    onSpacePress(e) {
      if (typeof window === "undefined" || typeof document === "undefined")
        return;
      if (e.target.localName !== "input") {
        if (e.keyCode === 32) {
          e.preventDefault();
          const sections = document.querySelector("#sections");
          const el = sections?.querySelector("section.active");

          if (el) {
            this.activeSectionIndex = Array.from(sections.children).indexOf(el);

            if (this.activeSectionIndex < 4) {
              const top = window.innerWidth * (this.activeSectionIndex + 1);
              document.documentElement.scrollTo({ top, behavior: "smooth" });
            }
          }
        }
      }
    },

    onSectionChange(index, instant = false) {
      if (typeof window === "undefined" || typeof document === "undefined")
        return;
      document.body.classList.remove("modal-open");
      let top = window.innerWidth * index;

      if (this.mobile || this.tablet) {
        const section = document.getElementById(`section-${index + 1}`);

        if (section) {
          top = section.getBoundingClientRect().top + window.pageYOffset - 50;
        }
      }

      window.scrollTo({ top, behavior: instant ? "auto" : "smooth" });

      // Update active section immediately when programmatically scrolling
      // The scroll detection will keep it in sync if needed
      if (this.activeSectionIndex !== index) {
        this.activeSectionIndex = index;

        // Update active class on sections
        if (typeof document !== "undefined") {
          const sections = document.querySelector("#sections");
          if (sections) {
            const sectionsArray = Array.from(sections.children);
            sectionsArray.forEach((section, i) => {
              section.classList.toggle("active", i === index);
            });
          }
        }

        // Emit section:scroll event to update navigation
        if (this.$eventbus) {
          this.$eventbus.$emit("section:scroll", index);
        }
      }
    },

    async initAnimations() {
      // Reset document height for mobile/tablet
      if (this.mobile || this.tablet) {
        if (typeof document !== "undefined") {
          document.documentElement.style.height = "";
          document.body.style.height = "";
        }
        return;
      }

      // Only load animations on client side for desktop
      if (typeof window === "undefined") {
        return;
      }

      const {
        sectionsWrapper,
        bg,
        car,
        clouds,
        workers1,
        workers2,
        home1,
        home2,
        page,
      } = this.$refs;

      // Validate all required refs are available
      if (
        !page ||
        !sectionsWrapper ||
        !bg ||
        !car ||
        !clouds ||
        !workers1 ||
        !workers2 ||
        !home1 ||
        !home2
      ) {
        // Retry initialization if refs not available yet
        if (this.initRetryCount < this.maxInitRetries) {
          this.initRetryCount++;
          setTimeout(() => {
            this.$nextTick(() => {
              this.initAnimations();
            });
          }, 200);
        }
        return;
      }

      if (!clouds.children || clouds.children.length < 2) {
        // Retry initialization if children not ready yet
        if (this.initRetryCount < this.maxInitRetries) {
          this.initRetryCount++;
          setTimeout(() => {
            this.$nextTick(() => {
              this.initAnimations();
            });
          }, 200);
        }
        return;
      }

      this.initRetryCount = 0; // Reset retry count on success

      try {
        // Lazy load animation module (includes GSAP)
        const { initScrollAnimations } = await import(
          "~/src/utils/mainPageAnimations.js"
        );

        const result = await initScrollAnimations({
          refs: this.$refs,
          windowWidth: this.windowWidth,
          sectionsComponents,
          onSectionChange: this.onSectionChange,
          eventbus: this.$eventbus,
        });

        this.scrollTriggers = result.scrollTriggers;
        this.ScrollTrigger = result.ScrollTrigger;
        this.animationModule = result;

        // Refresh ScrollTrigger after DOM updates
        this.$nextTick(() => {
          this.ScrollTrigger.refresh();

          // Ensure first section is active on initial load
          const sections = sectionsWrapper.children;
          if (
            sections.length > 0 &&
            !sections[0].classList.contains("active")
          ) {
            sections[0].classList.add("active");
            this.activeSectionIndex = 0;
            if (this.$eventbus) {
              this.$eventbus.$emit("section:scroll", 0);
            }
          }
        });

        this.hasScroll = this.isScrollPresent();
      } catch (error) {
        console.error("Failed to initialize animations:", error);
        // Retry if error occurs
        if (this.initRetryCount < this.maxInitRetries) {
          this.initRetryCount++;
          setTimeout(() => {
            this.$nextTick(() => {
              this.initAnimations();
            });
          }, 200);
        }
      }
    },
    isScrollPresent() {
      if (typeof window === "undefined" || typeof document === "undefined")
        return false;
      return window.innerWidth > document.body.clientWidth;
    },
    getScrollbarWidth() {
      if (typeof document === "undefined") return 0;
      // Create a temporary div to measure scrollbar width
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.overflow = "scroll";
      outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
      outer.style.width = "100px";
      outer.style.position = "absolute";
      outer.style.top = "-9999px";
      document.body.appendChild(outer);

      const inner = document.createElement("div");
      inner.style.width = "100%";
      outer.appendChild(inner);

      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

      outer.parentNode.removeChild(outer);

      return scrollbarWidth;
    },
    updateScrollbarWidth() {
      if (typeof document === "undefined") return;
      this.scrollbarWidth = this.getScrollbarWidth();
      // Set CSS variable for dynamic padding (also updates global variable)
      document.documentElement.style.setProperty(
        "--scrollbar-width",
        `${this.scrollbarWidth}px`
      );
      // Update hasScroll state
      this.hasScroll = this.isScrollPresent();
    },
  },
  mounted() {
    this.updateScrollbarWidth();

    // Listen for theme changes
    this.themeChangeHandler = (event) => {
      this.isDark = event.detail.isDark;
      this.theme = event.detail.theme;
    };
    if (typeof window !== "undefined") {
      window.addEventListener("themechange", this.themeChangeHandler);
    }

    // Listen for breakpoint changes
    this.breakpointChangeHandler = () => {
      // Trigger scroll detection when breakpoint changes
      this.$nextTick(() => {
        this.onScroll();
        // Reinitialize animations if needed
        if (!this.mobile && !this.tablet) {
          this.onResize();
        }
      });
    };
    if (typeof window !== "undefined") {
      window.addEventListener("breakpointchange", this.breakpointChangeHandler);
    }

    // Wait for ClientOnly to render and refs to be available
    this.$nextTick(() => {
      // Double nextTick to ensure ClientOnly has fully rendered
      this.$nextTick(() => {
        this.onResize();
        this.hasScroll = this.isScrollPresent();

        // Add scroll listener for all devices
        window.addEventListener("scroll", this.onScroll, { passive: true });

        // Set initial active section
        if (typeof document !== "undefined") {
          const sections = document.querySelector("#sections");
          if (sections && sections.children.length > 0) {
            // For mobile/tablet, set first section as active
            if (this.mobile || this.tablet) {
              Array.from(sections.children).forEach((section, index) => {
                section.classList.toggle("active", index === 0);
              });
              this.activeSectionIndex = 0;
              if (this.$eventbus) {
                this.$eventbus.$emit("section:scroll", 0);
              }
            } else {
              // For desktop, trigger scroll detection which will check ScrollTrigger state
              this.onScroll();
            }
          }
        }

        // Check if we need to scroll to a specific section (from navigation)
        if (typeof window !== "undefined" && window.sessionStorage) {
          const scrollToSection =
            window.sessionStorage.getItem("scrollToSection");
          if (scrollToSection !== null) {
            const sectionIndex = parseInt(scrollToSection, 10);
            if (!isNaN(sectionIndex)) {
              // Scroll instantly without animation when coming from another page
              requestAnimationFrame(() => {
                this.onSectionChange(sectionIndex, true);
                // Clear the stored value
                window.sessionStorage.removeItem("scrollToSection");
              });
            }
          }
        }
      });
    });

    window.addEventListener("resize", this.onResize);
    document.addEventListener("keypress", this.onSpacePress);

    if (this.$eventbus) {
      this.$eventbus.$on("section:change", (index) => {
        this.onSectionChange(index, true);
      });
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
    document.removeEventListener("keypress", this.onSpacePress);

    if (this.themeChangeHandler && typeof window !== "undefined") {
      window.removeEventListener("themechange", this.themeChangeHandler);
    }

    if (this.breakpointChangeHandler && typeof window !== "undefined") {
      window.removeEventListener(
        "breakpointchange",
        this.breakpointChangeHandler
      );
    }

    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    if (this.$eventbus) {
      this.$eventbus.$off("section:change", this.onSectionChange);
    }

    // Reset document height on cleanup
    if (typeof document !== "undefined") {
      document.documentElement.style.height = "";
      document.body.style.height = "";
    }

    // Clean up ScrollTriggers (only if they exist - desktop only)
    if (this.animationModule && this.animationModule.cleanup) {
      this.animationModule.cleanup();
    }
    this.scrollTriggers = [];
    this.ScrollTrigger = null;
    this.animationModule = null;
  },
};
</script>

<style lang="scss">
// .app-page {
//   position: relative;
// }

.page-main {
  &__sections {
    display: flex;
    @include media-breakpoint-up(lg) {
      height: 100%;
    }
  }
}

.bg-car {
  &__cloud {
    position: absolute;
    left: 100%;
    bottom: 100%;
    margin-bottom: -10px;
    transform: translate(-35px, 0);

    .cloud {
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }

  &__image {
    svg {
      @include size(100%);
    }
  }
}

.bg {
  &__from,
  &__to {
    position: absolute;
    bottom: 22px;
  }

  &__to {
    overflow: hidden;
    width: 500px;
    height: 100px;
  }

  &__home {
    position: absolute;
    bottom: 0;
    @include size(90px);
    z-index: 1;

    svg {
      @include size(100%);
    }
  }

  &__workers {
    position: absolute;
    left: 0;
    bottom: 0;
    @include size(70px, 35px);

    svg {
      @include size(100%);
    }
  }
}

.app-section {
  height: 100%;
  flex: 0 0 auto;

  @include media-breakpoint-down(lg) {
    height: auto;
  }
}

#app ~ div {
  opacity: 0 !important;
}

@include media-breakpoint-up(lg) {
  .page-main {
    &__bg {
      z-index: -1;

      &-inner {
        overflow: hidden;
      }

      &-image {
        background: url("/static/images/bg.png") -100px 12px repeat-x;
        background-size: auto 150px;
        height: 150px;
        position: relative;
      }

      &-home {
        @include size(170px, 95px);
        @include absolute(null, 120px, 10px);

        svg {
          @include size(100%);
        }
      }

      &-car {
        position: absolute;
        bottom: 10px;
        left: 0;
        @include size(130px, 58px);
      }
    }
  }
  // Dark theme: switch to dark version background image
  .theme-dark {
    .page-main__bg-image {
      background-image: url("/static/images/bg_dark.png") !important;
      background-size: auto 163px;
    }
  }
  .page-main {
    &__bg {
      position: absolute;
      left: 0;
      bottom: 60px;
      width: 100%;

      &-image {
        height: 200px;
        background-size: auto 200px;
      }
    }
  }

  .modal-open {
    .app-section {
      padding-right: var(--scrollbar-width, 0px);
    }
  }

  .app-section {
    &--scroll {
      padding-right: var(--scrollbar-width, 0px);
    }
  }
}

@media screen and (min-width: 993px) and (max-height: 890px) {
  .page-main {
    &__bg {
      bottom: 40px;
    }
  }
}

@media screen and (min-width: 993px) and (max-height: 730px) {
  .page-main {
    // Compensate for reduced app-content offset (50px instead of 140px)
    margin-top: -50px;

    &__bg {
      bottom: -3px;
    }
  }
}

@include media-breakpoint-down(lg) {
  .page-main {
    // Reset negative margin for mobile/tablet
    margin-top: 0;

    .app-section {
      opacity: 1 !important;
    }
  }
}

@include media-breakpoint-down(lg) {
  .page-main {
    &__sections {
      flex-direction: column;
    }
  }
}
</style>

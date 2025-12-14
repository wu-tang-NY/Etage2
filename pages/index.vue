<template>
  <div class="app-page app-page--main page-main" ref="page">
    <ClientOnly>
      <template #default>
        <div class="page-main__inner">
          <div class="page-main__sections" ref="sectionsWrapper" id="sections">
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
              <svg-icon
                name="mobile_bg"
                original
                v-if="!index && (mobile || tablet)"
                class="services__bg"
              ></svg-icon>
              <div class="container">
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

          <div class="page-main__bg bg">
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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import sectionsComponents from "~/src/views/Main/sections";
import CarCloud from "~/src/views/Main/components/PageMainCarCloud";

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

    device: "desktop",
    mobile: false,
    tablet: false,
    desktop: false,
    hasScroll: false,
    initRetryCount: 0,
    maxInitRetries: 3,
    scrollTimeout: null,
  }),
  computed: {
    sectionsComponents() {
      return sectionsComponents;
    },

    getCarPos() {
      return this.$refs.car?.getBoundingClientRect();
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

      // Clean up existing ScrollTriggers
      this.scrollTriggers.forEach((trigger) => trigger.kill());
      this.scrollTriggers = [];
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Reset document heights before reinitializing
      document.documentElement.style.height = "";
      document.body.style.height = "";
      document.body.classList.remove("modal-open");

      this.updateScrollbarWidth();
      this.updateDeviceType();

      // Use nextTick to ensure refs are available
      this.$nextTick(() => {
        this.initAnimations();
      });
    },

    updateDeviceType() {
      if (typeof window === "undefined") {
        this.desktop = true;
        this.device = "desktop";
        return;
      }
      const wasMobile = this.mobile;
      const wasTablet = this.tablet;

      this.mobile = false;
      this.tablet = false;
      this.desktop = false;

      if (this.isMobile()) {
        this.device = "mobile";
        this.mobile = true;
      } else if (this.isTablet()) {
        this.device = "tablet";
        this.tablet = true;
      } else {
        this.desktop = true;
        this.device = "desktop";
      }

      // If device type changed, trigger scroll detection
      if (wasMobile !== this.mobile || wasTablet !== this.tablet) {
        this.$nextTick(() => {
          this.onScroll();
        });
      }
    },

    isMobile() {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(max-width: 767px)").matches;
    },

    isTablet() {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(min-width: 768px) and (max-width: 992px)")
        .matches;
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

    onSectionChange(index) {
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

      window.scrollTo({ top, behavior: "smooth" });
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

      // Only load ScrollTrigger on client side for desktop
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

      const [cloud1, cloud2] = clouds.children;
      const sections = sectionsWrapper.children;

      const pageWidth = window.innerWidth;

      // SECTION 1

      const tween1 = gsap
        .timeline()
        .set(sections[0], { opacity: 1, immediateRender: true })
        .add(
          gsap.to(sectionsWrapper, {
            duration: 1,
            x: -pageWidth,
            ease: "none",
          }),
          0
        )
        .add(gsap.to(sections[0], { duration: 0.5, opacity: 0 }), 0.1)
        .add(
          gsap.fromTo(
            sections[1],
            { opacity: 0 },
            { duration: 0.5, opacity: 1 }
          ),
          0.4
        )
        .add(
          gsap.fromTo(
            cloud1,
            { opacity: 0, y: -20 },
            { duration: 0.15, opacity: 1, y: 0 }
          ),
          0.7
        );

      // SECTION 2

      const tween2 = gsap
        .timeline()
        .add(
          gsap.to(sectionsWrapper, {
            duration: 1,
            x: -pageWidth * 2,
            ease: "none",
          })
        )
        .add(gsap.to(sections[1], { duration: 0.5, opacity: 0 }), 0.1)
        .add(
          gsap.fromTo(
            sections[2],
            { opacity: 0 },
            { duration: 0.5, opacity: 1 }
          ),
          0.4
        )
        .add(gsap.to(cloud1, { duration: 0.15, opacity: 0, y: -20 }), 0.7)
        .add(
          gsap.fromTo(
            cloud2,
            { opacity: 0, y: -20 },
            { duration: 0.15, opacity: 1, y: 0 }
          ),
          0.85
        );

      // SECTION 3
      const tween3 = gsap
        .timeline()
        .add(
          gsap.to(sectionsWrapper, {
            duration: 1,
            x: -pageWidth * 3,
            ease: "none",
          })
        )
        .add(gsap.to(sections[2], { duration: 0.5, opacity: 0 }), 0.1)
        .add(
          gsap.fromTo(
            sections[3],
            { opacity: 0 },
            { duration: 0.5, opacity: 1 }
          ),
          0.4
        )
        .add(gsap.to(cloud2, { duration: 0.15, opacity: 0, y: -20 }), 0.7);

      // SECTION 4

      const tween4 = gsap
        .timeline()
        .add(gsap.to(car, { duration: 0.4, x: 600, ease: "none" }))
        .add(gsap.to(car, { duration: 0.6, x: 600, ease: "none" }));

      // Background animation timeline
      const bgTween = gsap
        .timeline()
        .set(home1, { x: pageWidth + 700, immediateRender: true })
        .set(home2, { x: pageWidth * 3 + 720, immediateRender: true })
        .set(workers2, { opacity: 0, immediateRender: true })
        .set(bg, { x: 0, immediateRender: true })
        .to(bg, { duration: 1, ease: "none", x: -pageWidth }, 0)
        .to(workers1, { duration: 0.3, x: -350, ease: "none" }, 0.5)
        .set(workers1, { opacity: 0, immediateRender: true }, 0.8)
        .to(bg, { duration: 1, ease: "none", x: -pageWidth * 2 }, 1)
        .to(bg, { duration: 1, ease: "none", x: -pageWidth * 3 }, 2)
        .set(workers2, { opacity: 1, x: 200, immediateRender: true }, 2.5)
        .to(workers2, { duration: 0.3, x: -100, ease: "none" }, 2.5);

      // TIMELINE
      // In GSAP 3, sequence the tweens with proper timing
      // Each tween should play after the previous one with a 0.5s stagger
      const timeline = gsap
        .timeline({ paused: true })
        .set(car, { left: 320, x: 0, immediateRender: true })
        .set(cloud2, { opacity: 0, immediateRender: true })
        .set(sectionsWrapper, { x: 0, immediateRender: true })
        .add(tween1, 0)
        .add(tween2, ">") // Start 0.5s before tween1 ends (overlap)
        .add(tween3, ">") // Start 0.5s before tween2 ends (overlap)
        .add(tween4, ">") // Start 0.5s before tween3 ends (overlap)
        .add(bgTween, 0); // Add bgTween at the start, synchronized with main timeline

      // Calculate the available height for the page when it gets pinned
      // When pinned at "top top", page fills the full viewport
      // Footer (65px, z-index: 1) will overlay at bottom, which is acceptable
      const pageHeight = window.innerHeight - 200;

      gsap.set(page, {
        width: "100%",
        height: `${pageHeight}px`,
        overflow: "hidden",
      });

      // ScrollTrigger will create the scroll space automatically via pin-spacer
      const scrollDuration = pageWidth * 4;

      // Create main ScrollTrigger that pins the page and controls the timeline
      const mainTrigger = ScrollTrigger.create({
        trigger: page,
        start: "-200px top",
        end: `+=${scrollDuration}`,
        pin: true,
        pinSpacing: true,
        animation: timeline,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const sectionIndex = Math.floor(progress * sections.length);
          const clampedIndex = Math.min(sectionIndex, sections.length - 1);

          // Remove active from all sections
          Array.from(sections).forEach((s) => s.classList.remove("active"));

          // Add active to current section
          if (sections[clampedIndex]) {
            sections[clampedIndex].classList.add("active");
            this.activeSectionIndex = clampedIndex;
            if (this.$eventbus) {
              this.$eventbus.$emit("section:scroll", clampedIndex);
            }
          }
        },
      });
      this.scrollTriggers.push(mainTrigger);

      // Refresh ScrollTrigger after DOM updates
      this.$nextTick(() => {
        ScrollTrigger.refresh();

        // Ensure first section is active on initial load
        const sections = sectionsWrapper.children;
        if (sections.length > 0 && !sections[0].classList.contains("active")) {
          sections[0].classList.add("active");
          this.activeSectionIndex = 0;
          if (this.$eventbus) {
            this.$eventbus.$emit("section:scroll", 0);
          }
        }
      });

      this.hasScroll = this.isScrollPresent();
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
    this.updateDeviceType();

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
      });
    });

    window.addEventListener("resize", this.onResize);
    document.addEventListener("keypress", this.onSpacePress);

    if (this.$eventbus) {
      this.$eventbus.$on("section:change", this.onSectionChange);
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
    document.removeEventListener("keypress", this.onSpacePress);

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

    // Clean up ScrollTriggers
    this.scrollTriggers.forEach((trigger) => trigger.kill());
    this.scrollTriggers = [];
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  },
};
</script>

<style lang="scss">
.app-page {
  position: relative;
}

.page-main {
  &__sections {
    display: flex;
    @include media-breakpoint-up(lg) {
      height: 100%;
    }
  }

  &__bg {
    z-index: -1;

    &-inner {
      overflow: hidden;
    }

    &-image {
      background: url("/static/icons/bg.svg") -100px 12px repeat-x;
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
    min-height: 100vh;
    height: auto;
  }
}

#app ~ div {
  opacity: 0 !important;
}

// Dark theme: switch to dark version background image
.theme-dark {
  .page-main__bg-image {
    background-image: url("/static/icons/bg_dark.svg") !important;
    background-size: auto 163px;
  }
}

@include media-breakpoint-up(lg) {
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
      bottom: 30px;
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

@include media-breakpoint-down(md) {
  .page-main {
    &__sections {
      flex-direction: column;
    }

    &__bg {
      &-car {
        display: none;
      }

      &-home {
        display: none;
      }
    }
  }

  .bg {
    &__from,
    &__to {
      display: none;
    }
  }
}
</style>

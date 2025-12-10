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
              <div class="container">
                <!-- Only render section if it's active or adjacent (for preloading) -->
                <component
                  v-if="shouldLoadSection(index)"
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

    ScrollMagicController: null,
    scrollbarWidth: 0,

    device: "desktop",
    mobile: false,
    tablet: false,
    desktop: false,
    hasScroll: false,
    initRetryCount: 0,
    maxInitRetries: 3,
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
    // Only load sections that are active or adjacent (for preloading)
    shouldLoadSection(index) {
      // On mobile/tablet, load all sections since they use normal scrolling
      if (this.mobile || this.tablet) {
        return true;
      }
      // Always load first section (index 0)
      if (index === 0) return true;
      // Load if section is active or within 1 section of active (preload)
      const diff = Math.abs(index - this.activeSectionIndex);
      return diff <= 1;
    },
    
    onScroll() {
      if (typeof document === "undefined") return;
      setTimeout(() => {
        const sections = document.querySelector("#sections");
        const el = sections?.querySelector("section.active");

        if (el) {
          this.activeSectionIndex = Array.from(sections.children).indexOf(el);
          if (this.$eventbus) {
            this.$eventbus.$emit("section:scroll", this.activeSectionIndex);
          }
        }
      }, 0);
    },

    onResize() {
      if (typeof window === "undefined" || typeof document === "undefined")
        return;
      this.windowWidth = window.innerWidth;
      this.totalWidth =
        Object.keys(sectionsComponents).length * this.windowWidth;

      if (this.ScrollMagicController) {
        this.ScrollMagicController.destroy(true);
      }

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
      console.log("initAnimations called", {
        mobile: this.mobile,
        tablet: this.tablet,
        desktop: this.desktop,
        windowDefined: typeof window !== "undefined",
      });

      // Reset document height for mobile/tablet
      if (this.mobile || this.tablet) {
        console.log("Mobile/tablet detected, skipping ScrollMagic");
        if (typeof document !== "undefined") {
          document.documentElement.style.height = "";
          document.body.style.height = "";
        }
        return;
      }

      // Only load ScrollMagic on client side for desktop
      if (typeof window === "undefined") {
        console.log("Window is undefined, skipping animations");
        return;
      }

      console.log("Starting ScrollMagic initialization...");

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

      // Detailed ref checking
      const refStatus = {
        page: !!page,
        sectionsWrapper: !!sectionsWrapper,
        bg: !!bg,
        car: !!car,
        clouds: !!clouds,
        workers1: !!workers1,
        workers2: !!workers2,
        home1: !!home1,
        home2: !!home2,
      };

      console.log("Ref status:", refStatus);

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
        console.error("ScrollMagic: Missing required refs!", refStatus);

        // Retry initialization if refs not available yet
        if (this.initRetryCount < this.maxInitRetries) {
          this.initRetryCount++;
          console.log(
            `Retrying initialization (attempt ${this.initRetryCount}/${this.maxInitRetries})...`
          );
          setTimeout(() => {
            this.$nextTick(() => {
              this.initAnimations();
            });
          }, 200);
        } else {
          console.error(
            "❌ Failed to initialize ScrollMagic after",
            this.maxInitRetries,
            "attempts"
          );
        }
        return;
      }

      if (!clouds.children || clouds.children.length < 2) {
        console.error(
          "ScrollMagic: Cloud elements not ready. Children count:",
          clouds.children?.length
        );

        // Retry initialization if children not ready yet
        if (this.initRetryCount < this.maxInitRetries) {
          this.initRetryCount++;
          console.log(
            `Retrying initialization (attempt ${this.initRetryCount}/${this.maxInitRetries})...`
          );
          setTimeout(() => {
            this.$nextTick(() => {
              this.initAnimations();
            });
          }, 200);
        } else {
          console.error(
            "❌ Failed to initialize ScrollMagic after",
            this.maxInitRetries,
            "attempts"
          );
        }
        return;
      }

      console.log("✓ All refs validated successfully");
      this.initRetryCount = 0; // Reset retry count on success

      // Make GSAP available globally for ScrollMagic plugin BEFORE importing ScrollMagic
      // ScrollMagic's GSAP plugin expects TweenMax (GSAP 2), but we use GSAP 3
      // We need to provide GSAP 3's API in a way ScrollMagic can understand
      if (typeof window !== "undefined") {
        // Create a more complete compatibility layer that mimics GSAP 2's TweenMax
        // The plugin checks for TweenMax during initialization
        const TweenMaxCompat = function () {
          return gsap.to.apply(gsap, arguments);
        };

        // Copy all GSAP methods to the compatibility object
        Object.keys(gsap).forEach((key) => {
          if (typeof gsap[key] === "function") {
            TweenMaxCompat[key] = gsap[key].bind(gsap);
          } else {
            TweenMaxCompat[key] = gsap[key];
          }
        });

        // Ensure the main animation methods are available
        TweenMaxCompat.to = gsap.to.bind(gsap);
        TweenMaxCompat.from = gsap.from.bind(gsap);
        TweenMaxCompat.fromTo = gsap.fromTo.bind(gsap);
        TweenMaxCompat.set = gsap.set.bind(gsap);
        TweenMaxCompat.timeline = gsap.timeline.bind(gsap);
        TweenMaxCompat.killTweensOf = gsap.killTweensOf.bind(gsap);
        TweenMaxCompat.getTweensOf = gsap.getTweensOf.bind(gsap);

        // Set as both TweenMax and TweenLite (GSAP 2 had both)
        window.TweenMax = TweenMaxCompat;
        window.TweenLite = TweenMaxCompat;

        // Timeline constructors
        window.TimelineMax = function () {
          return gsap.timeline.apply(gsap, arguments);
        };
        window.TimelineLite = function () {
          return gsap.timeline.apply(gsap, arguments);
        };

        // Also set GSAP directly
        window.GSAP = gsap;
      }

      // Dynamically import ScrollMagic only on client
      // Import order matters: core first, then plugins
      console.log("Loading ScrollMagic module...");
      let ScrollMagic;
      try {
        const ScrollMagicModule = await import(
          "scrollmagic/scrollmagic/minified/ScrollMagic.min.js"
        );
        ScrollMagic = ScrollMagicModule.default || ScrollMagicModule;
        console.log("✓ ScrollMagic loaded:", !!ScrollMagic);
      } catch (error) {
        console.error("✗ Failed to load ScrollMagic:", error);
        return;
      }

      // Now import the GSAP plugin (it will detect GSAP from window)
      // The plugin must be imported after ScrollMagic core but before using setTween
      console.log("Loading GSAP plugin...");
      try {
        await import(
          "scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js"
        );
        console.log("✓ GSAP plugin loaded");
        console.log(
          "setTween method available:",
          !!ScrollMagic.Scene.prototype.setTween
        );
      } catch (error) {
        console.error("✗ Failed to load GSAP plugin:", error);
        return;
      }

      // Verify the plugin is loaded by checking if setTween method exists
      // If not, manually implement setTween for GSAP 3 compatibility
      if (!ScrollMagic.Scene.prototype.setTween) {
        console.warn(
          "ScrollMagic GSAP plugin did not auto-load. Implementing manual setTween for GSAP 3..."
        );

        // Manually implement setTween method for GSAP 3
        ScrollMagic.Scene.prototype.setTween = function (tween) {
          // Store the tween
          this._tween = tween;

          // Pause the tween initially to let ScrollMagic control it
          if (typeof tween.pause === "function") {
            tween.pause();
          }

          // Create progress update function that handles ScrollMagic event object
          const updateTween = (event) => {
            if (this._tween) {
              // ScrollMagic passes an event object with progress property
              const progress = event.progress || 0;

              // GSAP 3 timelines use progress() method
              if (typeof this._tween.progress === "function") {
                this._tween.progress(progress);
              } else if (typeof this._tween.seek === "function") {
                // Alternative: use seek with total duration
                const duration = this._tween.duration();
                this._tween.seek(duration * progress);
              }
            }
          };

          // Hook into scene progress event
          this.on("progress", updateTween);

          // Optional: handle enter/leave events
          this.on("enter", (event) => {
            console.log("Scene entered, direction:", event.scrollDirection);
          });

          this.on("leave", (event) => {
            console.log("Scene left, direction:", event.scrollDirection);
          });

          return this;
        };

        console.log("✓ Manual setTween implementation installed");
      }

      const [cloud1, cloud2] = clouds.children;
      const sections = sectionsWrapper.children;

      const pageWidth = window.innerWidth;
      console.log("Initializing ScrollMagic with:", {
        pageWidth,
        sectionsCount: sections.length,
        totalDuration: pageWidth * 4,
        scrollHeight: document.documentElement.scrollHeight,
        windowHeight: window.innerHeight,
      });

      try {
        this.ScrollMagicController = new ScrollMagic.Controller();
        console.log("✓ ScrollMagic Controller created successfully");
      } catch (error) {
        console.error("✗ Failed to create ScrollMagic Controller:", error);
        return;
      }

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
        .add(tween4, ">"); // Start 0.5s before tween3 ends (overlap)

      console.log(
        "Timeline created with duration:",
        timeline.duration(),
        "seconds"
      );

      // Test that timeline responds to progress changes
      console.log("Testing timeline progress...");
      timeline.progress(0);
      console.log("- Progress at 0%:", timeline.progress());
      timeline.progress(0.5);
      console.log("- Progress at 50%:", timeline.progress());
      timeline.progress(0);
      console.log("- Reset to 0%");

      // Ensure the page element has proper dimensions before pinning
      gsap.set(page, {
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      });

      // With pushFollowers: false, we need to manually create scroll space
      // Set document height to exactly the scroll distance needed
      // Subtract 1px to prevent extra scroll space at the very end
      const scrollDuration = pageWidth * 4;
      document.documentElement.style.height = `${
        scrollDuration + window.innerHeight - 1
      }px`;
      document.body.style.height = `${
        scrollDuration + window.innerHeight - 1
      }px`;

      try {
        const mainScene = new ScrollMagic.Scene({
          duration: scrollDuration,
          triggerHook: 0,
        })
          .setPin(page, { pushFollowers: false })
          .setTween(timeline)
          .addTo(this.ScrollMagicController);

        console.log("✓ Main scene created with duration:", pageWidth * 4);
        console.log("Scene info:", {
          duration: mainScene.duration(),
          offset: mainScene.offset(),
          state: mainScene.state(),
          triggerHook: mainScene.triggerHook(),
        });

        // Add debug listeners to track scene progress
        mainScene.on("progress", (event) => {
          // Only log every 10% to avoid console spam
          const progress = Math.floor(event.progress * 100);
          if (progress % 10 === 0) {
            console.log("Main scene progress:", progress + "%");
          }
        });

        mainScene.on("enter", (event) => {
          console.log(
            "Main scene ENTERED, scroll direction:",
            event.scrollDirection
          );
        });

        mainScene.on("leave", (event) => {
          console.log(
            "Main scene LEFT, scroll direction:",
            event.scrollDirection
          );
        });

        // Check if pinning worked
        setTimeout(() => {
          const pinSpacer = page.parentElement;
          const pinSpacerAdded = pinSpacer?.classList.contains(
            "scrollmagic-pin-spacer"
          );
          console.log("Pin spacer added:", pinSpacerAdded);

          if (pinSpacerAdded) {
            const spacerHeight = pinSpacer.offsetHeight;
            const spacerStyle = window.getComputedStyle(pinSpacer);
            console.log("Pin spacer details:", {
              height: spacerHeight,
              display: spacerStyle.display,
              position: spacerStyle.position,
              computed: spacerStyle.height,
            });
          } else {
            console.warn("⚠ Pin spacer was not added to page element!");
          }
        }, 100);
      } catch (error) {
        console.error("✗ Failed to create main scene:", error);
        return;
      }

      Array.from(sections).forEach((section, index) => {
        new ScrollMagic.Scene({
          duration: pageWidth,
          offset: pageWidth * index,
        })
          .setClassToggle(`#section-${index + 1}`, "active")
          .addTo(this.ScrollMagicController);
      });

      const bgTween = gsap
        .timeline()
        .set(home1, { x: pageWidth + 700, immediateRender: true })
        .set(home2, { x: pageWidth * 3 + 720, immediateRender: true })
        .set(workers2, { opacity: 0, immediateRender: true })
        .set(bg, { x: 0, immediateRender: true })
        .to(bg, { duration: 0.8, ease: "none", x: -pageWidth })
        .to(workers1, { duration: 0.3, x: -350, ease: "none" })
        .set(workers1, { opacity: 0, immediateRender: true })
        .to(bg, { duration: 0.8, ease: "none", x: -pageWidth * 2 })
        .to(bg, { duration: 0.8, ease: "none", x: -pageWidth * 3 })
        .set(workers2, { opacity: 1, x: 200, immediateRender: true })
        .to(workers2, { duration: 0.3, x: -100, ease: "none" });

      new ScrollMagic.Scene({
        duration: pageWidth * 4,
      })
        .setTween(bgTween)
        .addTo(this.ScrollMagicController);

      console.log("✓ All ScrollMagic scenes created successfully");
      console.log("Total scenes:", this.ScrollMagicController.info("size"));

      // Force ScrollMagic to recalculate scene positions and heights
      this.$nextTick(() => {
        if (this.ScrollMagicController) {
          this.ScrollMagicController.update(true);
          console.log("✓ ScrollMagic controller updated");
        }
      });

      // Add a one-time scroll listener to verify scroll events are firing
      let scrollCount = 0;
      const testScrollListener = () => {
        scrollCount++;
        if (scrollCount <= 3) {
          console.log(
            `Scroll event #${scrollCount} - scrollY:`,
            window.scrollY,
            "scrollTop:",
            document.documentElement.scrollTop
          );
        }
        if (scrollCount === 3) {
          window.removeEventListener("scroll", testScrollListener);
          console.log("Scroll events confirmed working");
        }
      };
      window.addEventListener("scroll", testScrollListener);

      // Verify scroll height was created (wait longer for manual fixes to apply)
      setTimeout(() => {
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollable = docHeight > winHeight;
        // With pushFollowers: false, the expected height is just the scroll duration
        const expectedHeight = pageWidth * 4;

        console.log("=== ScrollMagic Setup Complete ===");
        console.log("Document height:", docHeight);
        console.log("Window height:", winHeight);
        console.log("Expected scroll height:", expectedHeight);
        console.log("Scrollable:", scrollable);
        console.log("Height difference:", docHeight - winHeight);

        if (!scrollable) {
          console.error(
            "❌ WARNING: Document is not scrollable! ScrollMagic animations will not trigger."
          );
          console.error(
            "This usually means the pin spacer was not created properly."
          );
          console.error("Debugging info:");
          console.error(
            "- Check if .page-main__inner has position: fixed (this breaks pinning)"
          );
          console.error("- Check if parent containers have overflow: hidden");
          console.error(
            "- Try inspecting the .scrollmagic-pin-spacer element in DevTools"
          );
        } else {
          console.log("✓ Document is scrollable - animations should work!");
        }
      }, 600);

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
    console.log("Page mounted");
    this.updateScrollbarWidth();
    this.updateDeviceType();

    // Wait for ClientOnly to render and refs to be available
    this.$nextTick(() => {
      // Double nextTick to ensure ClientOnly has fully rendered
      this.$nextTick(() => {
        console.log("Initializing after ClientOnly render");
        console.log("Refs available:", {
          page: !!this.$refs.page,
          sectionsWrapper: !!this.$refs.sectionsWrapper,
          bg: !!this.$refs.bg,
          car: !!this.$refs.car,
        });

        this.onResize();
        this.hasScroll = this.isScrollPresent();

        // Add scroll listener after device type is determined
        if (!this.mobile && !this.tablet) {
          console.log("Adding scroll listener for desktop");
          window.addEventListener("scroll", this.onScroll);
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

    if (this.$eventbus) {
      this.$eventbus.$off("section:change", this.onSectionChange);
    }

    // Reset document height on cleanup
    if (typeof document !== "undefined") {
      document.documentElement.style.height = "";
      document.body.style.height = "";
    }

    if (this.ScrollMagicController) {
      this.ScrollMagicController.destroy(true);
    }
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

// ScrollMagic pin spacer styling
.scrollmagic-pin-spacer {
  // Let ScrollMagic control the height
  position: relative !important;
  width: 100% !important;

  // The pinned element inside
  > .page-main {
    width: 100% !important;
    height: 100vh !important;
  }
}

@include media-breakpoint-up(lg) {
  .page-main {
    &__inner {
      // Don't use position: fixed here - let ScrollMagic handle pinning
      // position: fixed;
    }

    &__bg {
      position: fixed;
      left: 0;
      bottom: 60px;

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
    &__bg {
      bottom: -3px;
    }
  }
}

@include media-breakpoint-down(lg) {
  .page-main {
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

  .app-section {
    height: auto;
    min-height: auto;
  }

  .bg {
    &__from,
    &__to {
      display: none;
    }
  }
}
</style>

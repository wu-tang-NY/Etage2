/**
 * Main Page Scroll Animations (Desktop only)
 * This module handles all GSAP-based scroll animations for the main page
 */

export async function initScrollAnimations({
  refs,
  windowWidth,
  sectionsComponents,
  onSectionChange,
  eventbus,
}) {
  // Dynamically import GSAP and ScrollTrigger only when needed
  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");

  gsap.registerPlugin(ScrollTrigger);

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
  } = refs;

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
    throw new Error("Required refs not available for animations");
  }

  if (!clouds.children || clouds.children.length < 2) {
    throw new Error("Cloud elements not ready");
  }

  const [cloud1, cloud2] = clouds.children;
  const sections = sectionsWrapper.children;
  const pageWidth = windowWidth;

  // SECTION 1 - Transition from first to second section
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
      gsap.fromTo(sections[1], { opacity: 0 }, { duration: 0.5, opacity: 1 }),
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

  // SECTION 2 - Transition from second to third section
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
      gsap.fromTo(sections[2], { opacity: 0 }, { duration: 0.5, opacity: 1 }),
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

  // SECTION 3 - Transition from third to fourth section
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
      gsap.fromTo(sections[3], { opacity: 0 }, { duration: 0.5, opacity: 1 }),
      0.4
    )
    .add(gsap.to(cloud2, { duration: 0.15, opacity: 0, y: -20 }), 0.7);

  // SECTION 4 - Final section with car animation
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

  // MAIN TIMELINE - Sequence all animations
  const timeline = gsap
    .timeline({ paused: true })
    .set(car, { left: 320, x: 0, immediateRender: true })
    .set(cloud2, { opacity: 0, immediateRender: true })
    .set(sectionsWrapper, { x: 0, immediateRender: true })
    .add(tween1, 0)
    .add(tween2, ">0.5")
    .add(tween3, ">0.5")
    .add(tween4, ">0.5")
    .add(bgTween, 0);

  // Calculate page height when pinned
  const pageHeight = window.innerHeight - 200;
  gsap.set(page, {
    width: "100%",
    height: `${pageHeight}px`,
    overflow: "hidden",
  });

  // Calculate scroll duration
  const scrollDuration = pageWidth * 4;

  // Create main ScrollTrigger
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
        if (eventbus) {
          eventbus.$emit("section:scroll", clampedIndex);
        }
      }
    },
  });

  return {
    scrollTriggers: [mainTrigger],
    ScrollTrigger,
    cleanup: () => {
      mainTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    },
  };
}


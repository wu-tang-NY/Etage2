"use client";

import SvgIcon from "@/components/common/SvgIcon";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";
import PageMainCarCloud from "./components/PageMainCarCloud";
import sectionsComponents from "./sections";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTheme } from "next-themes";
import { useRouter } from "@/i18n/navigation";
import { useNav } from "@/hooks/useNav";

gsap.registerPlugin(ScrollTrigger);

// Make ScrollTrigger available globally for navigation
if (typeof window !== "undefined") {
  (window as any).ScrollTrigger = ScrollTrigger;
}

// Map section keys to URL anchor names
const sectionAnchors: Record<string, string> = {
  PageSectionServices: "services",
  PageSectionPrice: "prices",
  PageSectionReviews: "reviews",
  PageSectionOrder: "order",
};

export default function DefaultPage() {
  const t = useTranslations();
  const { theme } = useTheme();
  const router = useRouter();
  const { setActiveNavId } = useNav();
  const isDark = theme === "theme-dark";

  const pageRef = useRef<HTMLDivElement>(null);
  const sectionsWrapperRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const workers1Ref = useRef<HTMLDivElement>(null);
  const workers2Ref = useRef<HTMLDivElement>(null);
  const home1Ref = useRef<HTMLDivElement>(null);
  const home2Ref = useRef<HTMLDivElement>(null);

  const windowWidth = window.innerWidth;

  // Initialize active nav id from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setActiveNavId(hash);
    } else {
      // Default to first section (services)
      setActiveNavId("services");
    }
  }, [setActiveNavId]);

  useGSAP(
    () => {
      const sectionsWrapper = sectionsWrapperRef.current;
      const car = carRef.current;
      const clouds = cloudsRef.current;
      const workers1 = workers1Ref.current;
      const workers2 = workers2Ref.current;
      const home1 = home1Ref.current;
      const home2 = home2Ref.current;
      const page = pageRef.current;
      const bg = bgRef.current;

      // Get cloud elements
      const cloudElements = clouds?.children ?? [];

      const [cloud1, cloud2] = cloudElements;

      const sections = sectionsWrapper?.children ?? [];
      const pageWidth = windowWidth;

      // SECTION TRANSITIONS
      // Section 1 → 2
      const tween1 = gsap
        .timeline()
        .set(sections[0], { opacity: 1 })
        .to(sectionsWrapper, { duration: 1, x: -pageWidth, ease: "none" }, 0)
        .to(sections[0], { duration: 0.5, opacity: 0 }, 0.1)
        .fromTo(sections[1], { opacity: 0 }, { duration: 0.5, opacity: 1 }, 0.4)
        .fromTo(
          cloud1,
          { opacity: 0, y: 0 },
          { duration: 0.15, opacity: 1, y: 40 },
          0.35
        );

      // Section 2 → 3
      const tween2 = gsap
        .timeline()
        .to(sectionsWrapper, { duration: 1, x: -pageWidth * 2, ease: "none" })
        .to(sections[1], { duration: 0.5, opacity: 0 }, 0.1)
        .fromTo(sections[2], { opacity: 0 }, { duration: 0.5, opacity: 1 }, 0.4)
        .to(cloud1, { duration: 0.15, opacity: 0, y: -20 }, 0.35)
        .fromTo(
          cloud2,
          { opacity: 0, y: 0 },
          { duration: 0.15, opacity: 1, y: 40 },
          0.35
        );

      // Section 3 → 4
      const tween3 = gsap
        .timeline()
        .to(sectionsWrapper, { duration: 1, x: -pageWidth * 3, ease: "none" })
        .to(sections[2], { duration: 0.5, opacity: 0 }, 0.1)
        .fromTo(sections[3], { opacity: 0 }, { duration: 0.5, opacity: 1 }, 0.4)
        .to(cloud2, { duration: 0.15, opacity: 0, y: -20 }, 0.35);

      // Car animation
      const tween4 = gsap.timeline();

      // Background animation

      const bgTween1 = gsap
        .timeline()
        .to(bg, { duration: 1, ease: "none", x: -pageWidth }, 0);

      const bgTween2 = gsap
        .timeline()
        .to(workers1, { duration: 0.3, x: -350, ease: "none" }, 0)
        .set(workers1, { opacity: 0, immediateRender: true });

      const bgTween3 = gsap
        .timeline()
        .to(bg, { duration: 1, ease: "none", x: -pageWidth * 2 }, 0);

      const bgTween4 = gsap
        .timeline()
        .to(bg, { duration: 1, ease: "none", x: -pageWidth * 3 }, 0)
        .fromTo(car, { x: 0 }, { duration: 0.4, x: 600, ease: "none" }, 0);

      const bgTween5 = gsap
        .timeline()
        .set(workers2, { opacity: 1, x: 200, immediateRender: true }, 0)
        .to(workers2, { duration: 0.3, x: 0, ease: "none" }, 0.5);

      // Background animation timeline
      const bgTween = gsap
        .timeline()
        .set(home1, { x: pageWidth + 700, immediateRender: true })
        .set(home2, { x: pageWidth * 3 + 720, immediateRender: true })
        .set(workers2, { opacity: 0, immediateRender: true })
        .set(bg, { x: 0, immediateRender: true })
        .add(bgTween1, 0)
        .add(bgTween2, ">0")
        .add(bgTween3, ">0")
        .add(bgTween4, ">0")
        .add(bgTween5, ">0");

      // MAIN TIMELINE - Sequence all animations
      const timeline = gsap
        .timeline({ paused: true })
        .set(car, { left: 320, x: 0, y: 10, immediateRender: true })
        .set(cloud2, { opacity: 0, immediateRender: true })
        .set(sectionsWrapper, { x: 0, immediateRender: true })
        .add(tween1, 0)
        .add(tween2, ">0.5")
        .add(tween3, ">0.5")
        .add(tween4, ">0.5")
        .add(bgTween, 0);

      const pageHeight = window.innerHeight - 200;

      gsap.set(page, {
        width: "100%",
        height: `${pageHeight}px`,
        overflow: "hidden",
      });

      const scrollDuration = pageWidth * 4;

      ScrollTrigger.create({
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

          Array.from(sections).forEach((s) => s.classList.remove("active"));

          if (sections[clampedIndex]) {
            sections[clampedIndex].classList.add("active");

            // Update URL hash with current section anchor
            const sectionId = sections[clampedIndex].id;
            const newHash = `#${sectionId}`;

            // Only update if hash has changed to avoid unnecessary history entries
            if (window.location.hash !== newHash) {
              window.history.replaceState(
                null,
                "",
                `${window.location.pathname}${window.location.search}${newHash}`
              );
            }

            // Update active nav item
            setActiveNavId(sectionId);
          }
        },
      });
    },
    {
      scope: pageRef,
      dependencies: [windowWidth, isDark],
      revertOnUpdate: true,
    }
  );

  return (
    <div
      ref={pageRef}
      className="relative top-[200px] overflow-x-hidden w-full"
    >
      <div
        ref={sectionsWrapperRef}
        className="relative flex h-full pb-[60px]"
        style={{
          width: `${windowWidth * Object.keys(sectionsComponents).length}px`,
        }}
      >
        {Object.keys(sectionsComponents).map((sectionKey, index) => {
          const SectionComponent =
            sectionsComponents[sectionKey as keyof typeof sectionsComponents];
          const anchor = sectionAnchors[sectionKey] || `section-${index + 1}`;
          return (
            <section
              key={sectionKey}
              id={anchor}
              className="flex-shrink-0 w-screen"
            >
              <div className="container mx-auto">
                <SectionComponent />
              </div>
            </section>
          );
        })}
      </div>
      <div className="page-main__bg bg absolute left-0 bottom-[65px] w-full -z-10">
        <div className="page-main__bg-inner">
          <div
            className="h-[200px]"
            style={{
              backgroundImage: `url(${
                isDark ? "/images/bg_dark.png" : "/images/bg.png"
              })`,
              backgroundSize: isDark ? "auto 163px" : "auto 150px",
              backgroundPosition: "bottom",
              backgroundRepeat: "repeat-x",
              width: `${
                windowWidth * Object.keys(sectionsComponents).length
              }px`,
            }}
            ref={bgRef}
          >
            <div className="page-main__bg-home absolute left-[140px] bottom-0 -translate-x-1/2 size-24">
              <SvgIcon name="home" className="h-full w-auto" original />
            </div>

            <div className="bg__from absolute bottom-[22px]" ref={home1Ref}>
              <div className="bg__home absolute bottom-0 size-20 z-[1]">
                <SvgIcon name="home_1" className="size-full" original />
              </div>
              <div
                className="bg__workers absolute left-0 bottom-0 size-8"
                ref={workers1Ref}
              >
                <SvgIcon name="workers_1" className="h-full w-auto" original />
              </div>
            </div>

            <div className="bg__to absolute bottom-0 h-20" ref={home2Ref}>
              <div className="bg__home absolute bottom-0 size-20 z-[1]">
                <SvgIcon name="home_2" className="size-full" original />
              </div>
              <div
                className="bg__workers absolute left-0 bottom-0 size-8"
                ref={workers2Ref}
              >
                <SvgIcon name="workers_1" className="w-auto h-full" original />
              </div>
            </div>
          </div>

          <div
            className="page-main__bg-car bg-car absolute bottom-0 left-0 h-14"
            ref={carRef}
          >
            <div
              className="bg-car__cloud relative left-full bottom-full -mb-[10px] -translate-x-[35px]"
              ref={cloudsRef}
            >
              <PageMainCarCloud
                title={t("main.carCloud.appraiser")}
                icon="cloud_small"
                iconWidth="270"
              />

              <PageMainCarCloud icon="cloud_large" iconWidth="370">
                <div className="mb-2">
                  {t("main.carCloud.families", { count: "3067" })}
                </div>
                <div>{t("main.carCloud.tons", { count: "572" })}</div>
              </PageMainCarCloud>
            </div>

            <div className="bg-car__image h-full">
              <SvgIcon name="car" className="size-full" original />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

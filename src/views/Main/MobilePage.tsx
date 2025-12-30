"use client";

import MobileBg from "@/components/common/MobileBg";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useNav } from "@/hooks/useNav";
import sectionsComponents from "./sections";

// Map section keys to URL anchor names (same as DefaultPage)
const sectionAnchors: Record<string, string> = {
  PageSectionServices: "services",
  PageSectionPrice: "prices",
  PageSectionReviews: "reviews",
  PageSectionOrder: "order",
};

export default function MobilePage() {
  const t = useTranslations();
  const { mobile, tablet, desktop } = useBreakpoints();
  const { setActiveNavId } = useNav();

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

  // Scroll detection for updating active nav
  useEffect(() => {
    const handleScroll = () => {
      // Detect which section is in view
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Check from top third of viewport

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const sectionId = section.id;
          setActiveNavId(sectionId);

          // Update URL hash
          const newHash = `#${sectionId}`;
          if (window.location.hash !== newHash) {
            window.history.replaceState(
              null,
              "",
              `${window.location.pathname}${window.location.search}${newHash}`
            );
          }
        }
      });
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setActiveNavId]);

  return (
    <div className="app-page app-page--main page-main relative lg:top-[200px] pt-[150px] lg:pt-0">
      <MobileBg />

      <div>
        <div className="page-main__sections flex flex-col gap-24">
          {Object.keys(sectionsComponents).map((sectionKey, index) => {
            const SectionComponent =
              sectionsComponents[sectionKey as keyof typeof sectionsComponents];
            const anchor = sectionAnchors[sectionKey] || `section-${index + 1}`;
            return (
              <section
                key={sectionKey}
                className="app-section h-auto lg:h-full flex-none"
                id={anchor}
              >
                <div className="container mx-auto">
                  <SectionComponent
                    mobile={mobile}
                    tablet={tablet}
                    desktop={desktop}
                  />
                </div>
              </section>
            );
          })}
        </div>

        <div className="mb-10">
          <MobileBg />
        </div>
      </div>
    </div>
  );
}

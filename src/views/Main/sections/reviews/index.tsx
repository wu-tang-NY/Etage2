"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button/button";
import SvgIcon from "@/components/common/SvgIcon";
import dynamic from "next/dynamic";

const FeedbackModal = dynamic(
  () => import("@/components/common/Feedback/feedback-modal"),
  { ssr: false }
);

interface PageSectionReviewsProps {
  active?: boolean;
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}

export default function PageSectionReviews({
  active,
  mobile,
  tablet,
  desktop,
}: PageSectionReviewsProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [modalFeedbackOpen, setModalFeedbackOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    {
      feature: t("reviews.individualApproach"),
      svg: "individual_feature",
      component: "PopupContentAboutUs",
    },
    {
      feature: t("reviews.teamSpecialists"),
      svg: "team_feature",
      component: "PopupContentSpecialists",
    },
    {
      feature: t("reviews.professionalMaterials"),
      svg: "pack_feature",
      component: "PopupContentPackage",
    },
    {
      feature: t("reviews.modernFleet"),
      svg: "auto_feature",
      component: "PopupContentAuto",
    },
    {
      feature: t("reviews.transparentPricing"),
      svg: "price_feature",
      component: "PopupContentPayment",
    },
  ];

  const slides = [
    {
      title: t("reviews.slides.slide1.title"),
      desc: t("reviews.slides.slide1.desc"),
    },
    {
      title: t("reviews.slides.slide2.title"),
      desc: t("reviews.slides.slide2.desc"),
    },
    {
      title: t("reviews.slides.slide3.title"),
      desc: t("reviews.slides.slide3.desc"),
    },
    {
      title: t("reviews.slides.slide4.title"),
      desc: t("reviews.slides.slide4.desc"),
    },
    {
      title: t("reviews.slides.slide5.title"),
      desc: t("reviews.slides.slide5.desc"),
    },
    {
      title: t("reviews.slides.slide6.title"),
      desc: t("reviews.slides.slide6.desc"),
    },
  ];

  const canScrollPrev = currentIndex > 0;
  const canScrollNext =
    mobile || tablet
      ? currentIndex < slides.length - 1
      : currentIndex < slides.length - 3;

  useEffect(() => {
    updateScrollButtons();
  }, [mobile, tablet]);

  const navigateToInfo = (route: string) => {
    router.push(`/${locale}/info/${route}`);
  };

  const openPopup = (component: string) => {
    const routeMap: { [key: string]: string } = {
      PopupContentAboutUs: "about_us",
      PopupContentSpecialists: "specialists",
      PopupContentPackage: "package",
      PopupContentAuto: "auto",
      PopupContentPayment: "payment",
      PopupContentFeedback: "reviews",
    };
    const route = routeMap[component] || "about_us";
    navigateToInfo(route);
  };

  const scrollCarousel = (direction: "prev" | "next") => {
    if (!carouselRef.current) return;

    const slideWidth = mobile || tablet ? 100 : 33.333;
    const container = carouselRef.current;
    const scrollAmount = (container.offsetWidth / 100) * slideWidth;

    if (direction === "next") {
      const newIndex = Math.min(
        currentIndex + 1,
        mobile || tablet ? slides.length - 1 : slides.length - 3
      );
      setCurrentIndex(newIndex);
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else {
      const newIndex = Math.max(currentIndex - 1, 0);
      setCurrentIndex(newIndex);
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      setCurrentIndex(0);
      carouselRef.current.scrollLeft = 0;
    }
  };

  return (
    <section>
      <div className="flex justify-between items-start flex-col items-center lg:flex-row mb-9 lg:mb-6">
        <h2>{t("reviews.title")}</h2>
        {!mobile && !tablet && (
          <Button
            id="feedback-btn"
            variant="primary"
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              setModalFeedbackOpen(true);
            }}
          >
            {t("reviews.leaveReview")}
          </Button>
        )}
      </div>

      <div className="flex items-start justify-between flex-wrap lg:flex-nowrap">
        {items.map((item, index) => (
          <div
            key={item.svg}
            className={`w-1/2 lg:w-1/5 flex-0 lg:flex-1 p-1 ${
              index === 1 ? "order-[-1] lg:order-none w-full lg:w-auto" : ""
            }`}
            onClick={() => openPopup(item.component)}
          >
            <div className="flex flex-col items-center justify-center cursor-pointer h-40 lg:h-auto bg-gray-100 dark:bg-gray-800 lg:!bg-transparent">
              <SvgIcon
                name={item.svg}
                original
                className="size-10 mb-4 lg:mb-3 flex-shrink-0"
              />
              <div
                className="text-center font-medium text-base lg:text-sm"
                dangerouslySetInnerHTML={{ __html: item.feature }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[70px] mb-10 relative max-lg:mt-[50px] max-lg:mb-[88px]">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth gap-[70px] [scrollbar-width:none] max-lg:gap-0 snap-x snap-mandatory [scroll-behavior:smooth]"
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="text-center w-[400px] min-w-[400px] cursor-pointer snap-center max-lg:w-full max-lg:min-w-full"
              onClick={() => navigateToInfo("reviews")}
            >
              <h3 className="text-primary leading-none font-bold mb-4">
                {slide.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-5 text-base lg:text-sm break-normal line-clamp-3">
                {slide.desc}
              </p>
            </div>
          ))}
        </div>

        <Button
          variant="primary"
          size="lg"
          className="!size-8 !p-0 bg-primary bg-no-repeat bg-center absolute top-1/2 -translate-y-1/2 -left-16 bg-[length:8px_14px] max-lg:top-auto max-lg:bottom-[-48px] max-lg:translate-y-0 max-lg:left-[20%] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%208%2014%27%3E%3Cpath%20fill=%27white%27%20d=%27M7%200l1%201-6%206%206%206-1%201-7-7z%27/%3E%3C/svg%3E')]"
          onClick={() => scrollCarousel("prev")}
          disabled={!canScrollPrev}
          ariaLabel="Previous review"
        />
        <Button
          variant="primary"
          size="lg"
          className="!size-8 !p-0 bg-primary bg-no-repeat bg-center absolute top-1/2 -translate-y-1/2 -right-16 bg-[length:8px_14px] max-lg:top-auto max-lg:bottom-[-48px] max-lg:translate-y-0 max-lg:right-[20%] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%208%2014%27%3E%3Cpath%20fill=%27white%27%20d=%27M1%200L0%201l6%206-6%206%201%201%207-7z%27/%3E%3C/svg%3E')]"
          onClick={() => scrollCarousel("next")}
          disabled={!canScrollNext}
          ariaLabel="Next review"
        />
      </div>

      <div className="flex justify-between lg:items-start flex-col lg:flex-row items-center">
        {(mobile || tablet) && (
          <Button
            id="feedback-btn-mobile"
            variant="primary"
            size="lg"
            className="!px-6"
            onClick={(e) => {
              e.preventDefault();
              setModalFeedbackOpen(true);
            }}
          >
            {t("reviews.leaveReview")}
          </Button>
        )}
      </div>

      <FeedbackModal
        modelValue={modalFeedbackOpen}
        onUpdateModelValue={setModalFeedbackOpen}
      />
    </section>
  );
}

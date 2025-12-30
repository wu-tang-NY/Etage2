"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button/button";
import SvgIcon from "@/components/common/SvgIcon";
import { eventbus } from "@/lib/eventbus";

interface PageSectionPriceProps {
  active?: boolean;
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}

export default function PageSectionPrice({
  active,
  mobile,
  tablet,
  desktop,
}: PageSectionPriceProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const categories2 = [
    {
      iconName: "icon_1",
      parts: [
        { type: "link", text: t("price.desktopSubtitle1"), route: "auto" },
        { type: "text", text: t("price.desktopSubtitle2") },
      ],
    },
    {
      iconName: "icon_2",
      parts: [
        { type: "text", text: t("price.desktopSubtitle3") },
        {
          type: "link",
          text: t("price.desktopSubtitle4"),
          route: "specialists",
        },
      ],
    },
    {
      iconName: "icon_3",
      parts: [
        { type: "text", text: t("price.desktopSubtitle5") },
        { type: "link", text: t("price.desktopSubtitle6"), route: "package" },
      ],
    },
  ];

  const categories = [
    {
      name: t("price.categoryTransport"),
      subtitle: t("price.categoryTransportSubtitle"),
      undertext: t("price.categoryTransportUndertext"),
      iconName: "price_transport",
      route: "auto",
      items: [
        {
          id: 1,
          time: t("price.categoryTransportItem1Time"),
          price: t("price.categoryTransportItem1Price"),
          description: t("price.categoryTransportItem1Desc"),
          info: t("price.categoryTransportItem1Info"),
        },
        {
          id: 2,
          time: t("price.categoryTransportItem2Time"),
          price: t("price.categoryTransportItem2Price"),
          description: t("price.categoryTransportItem2Desc"),
        },
      ],
    },
    {
      name: t("price.categoryMove"),
      subtitle: t("price.categoryMoveSubtitle"),
      undertext: t("price.categoryMoveUndertext"),
      iconName: "price_moving",
      route: "flat_move",
      items: [
        {
          id: 1,
          time: t("price.categoryMoveItem1Time"),
          price: t("price.categoryMoveItem1Price"),
          description: t("price.categoryMoveItem1Desc"),
          additional: t("price.categoryMoveItem1Additional"),
          info: t("price.categoryMoveItem1Info"),
        },
        {
          id: 2,
          time: t("price.categoryMoveItem2Time"),
          price: t("price.categoryMoveItem2Price"),
          description: t("price.categoryMoveItem2Desc"),
          additional: t("price.categoryMoveItem2Additional"),
        },
      ],
    },
    {
      name: t("price.categoryWorkers"),
      subtitle: t("price.categoryWorkersSubtitle"),
      undertext: t("price.categoryWorkersUndertext"),
      iconName: "price_workers",
      route: "specialists",
      items: [
        {
          id: 1,
          time: t("price.categoryWorkersItem1Time"),
          price: t("price.categoryWorkersItem1Price"),
          description: t("price.categoryWorkersItem1Desc"),
          info: t("price.categoryWorkersItem1Info"),
        },
        {
          id: 2,
          time: t("price.categoryWorkersItem2Time"),
          price: t("price.categoryWorkersItem2Price"),
        },
      ],
    },
  ];

  const getInfoRoute = (route: string) => {
    return `/${locale}/info/${route}`;
  };

  const navigateToInfo = (route: string) => {
    router.push(`/${locale}/info/${route}`);
  };

  const openForm = () => {
    eventbus.emit("openFormModal");
  };

  return (
    <div>
      <h2 className="mb-6">{t("price.title")}</h2>

      <div className="text-gray-800 dark:text-gray-300 flex items-center flex-wrap lg:flex-nowrap gap-3 mb-6">
        {categories2.map((category, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-lg lg:text-sm"
          >
            <div className="lg:bg-gray-100 lg:dark:bg-gray-800 lg:py-2 lg:px-4 flex items-center">
              {!mobile && !tablet && (
                <SvgIcon
                  name={category.iconName}
                  className="size-5 mr-3"
                  original
                />
              )}
              {category.parts.map((part, partIndex) => (
                <React.Fragment key={partIndex}>
                  {partIndex > 0 && <>&nbsp;</>}
                  {part.type === "link" && part.route ? (
                    <Link href={getInfoRoute(part.route)} className="link">
                      {part.text}
                    </Link>
                  ) : (
                    <span>{part.text}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            {index < categories2.length - 1 && (
              <div className="text-gray-300">+</div>
            )}
          </div>
        ))}
      </div>

      <div className="hidden lg:flex text-gray-500 dark:text-gray-400 font-bold text-sm text-center">
        <div className="w-2/3 flex justify-center">
          <div
            className="mb-3 relative cursor-pointer before:content-[''] before:block before:absolute before:top-1/2 before:right-[calc(100%+20px)] before:w-[84px] before:h-5 before:border-t-2 before:border-l-2 before:border-gray-200 dark:before:border-gray-600 after:content-[''] after:block after:absolute after:top-1/2 after:left-[calc(100%+20px)] after:w-[84px] after:h-5 after:border-t-2 after:border-r-2 after:border-gray-200 dark:after:border-gray-600"
            onClick={() => navigateToInfo("auto")}
          >
            {t("price.carRental")}
            <SvgIcon name="link" className="size-3 ml-1" original />
          </div>
        </div>

        <div className="w-1/3">
          <div
            className="mb-3 relative cursor-pointer"
            onClick={() => navigateToInfo("specialists")}
          >
            {t("price.specialistsServices")}
            <SvgIcon name="link" className="size-3 ml-1" original />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap gap-4">
        {categories.map((category) => (
          <div key={category.name} className="w-full lg:w-1/3">
            <div className="bg-gray-100 dark:bg-gray-800 h-full p-5 lg:py-2">
              <div className="flex items-center gap-4">
                <SvgIcon
                  name={category.iconName}
                  className="size-16 lg:size-12 lg:order-last flex-shrink-0"
                  original
                />
                <div>
                  <h3>{category.name}</h3>
                  <p className="text-base leading-1 lg:text-sm text-gray-500 dark:text-gray-400 lg:max-w-[90%]">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {category.items.map((item) => (
                <div key={item.id} className="flex items-center my-4">
                  {"additional" in item && item.additional && (
                    <div className="w-20 h-10 flex items-center justify-center pr-2 mr-3 bg-white dark:bg-gray-700 [clip-path:polygon(79%_0,100%_50%,80%_100%,0_100%,0_0)] text-base font-bold text-primary">
                      {item.additional}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center text-lg font-bold">
                      <span>{item.time}&nbsp;</span>
                      <span className="text-primary">{item.price}</span>

                      {item.info && (
                        <div className="relative ml-3 cursor-pointer group">
                          <SvgIcon name="info" className="size-5" />
                          <div className="absolute hidden z-[9999999] lg:text-sm group-hover:block bg-gray-900 text-white rounded w-80 px-4 py-2 text-base font-normal bottom-full mb-2 left-1/2 -translate-x-1/2 before:content-[''] before:absolute before:-bottom-[5px] before:size-3 before:bg-inherit before:left-1/2 before:-translate-x-1/2 before:rotate-45">
                            {item.info}
                          </div>
                        </div>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-gray-500 dark:text-gray-400 lg:text-sm">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <p className="lg:hidden my-5 text-gray-600 dark:text-gray-200">
                {category.undertext}
              </p>

              {(mobile || tablet) && (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={openForm}
                >
                  {t("price.orderButton")}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          variant="primary"
          size="lg"
          className="mt-12"
          onClick={() => navigateToInfo("flat_move")}
        >
          {t("price.examplesButton")}
          <SvgIcon name="arrow-next" className="size-4 ml-2" original />
        </Button>
      </div>
    </div>
  );
}

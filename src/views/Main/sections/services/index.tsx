"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const CallbackModal = dynamic(
  () => import("@/components/common/Callback/callback-modal"),
  { ssr: false }
);

interface PageSectionServicesProps {
  active?: boolean;
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}

export default function PageSectionServices({
  active,
  mobile,
  tablet,
  desktop,
}: PageSectionServicesProps) {
  const t = useTranslations();
  const [modalCallbackOpen, setModalCallbackOpen] = useState(false);

  return (
    <div>
      <h1 className="mt-5 lg:mt-10 mb-4 lg:mb-10">
        {t("services.title")}
        {!mobile && !tablet && <br />}
        &nbsp; <span className="text-primary">{t("services.titleSpan")}</span>
        &nbsp; {t("services.titleEnd")}
      </h1>

      <div className="text-gray-400 mb-4 lg:mb-8 font-medium text-lg leading-[1.75] max-w-full lg:max-w-[680px]">
        {t("services.subtitle1")}
        <span className="text-gray-900 dark:text-gray-100 font-extrabold">
          &nbsp; {t("services.subtitle1Span")}
        </span>
        {t("services.subtitle1Middle")}
        <span className="text-gray-900 dark:text-gray-100 font-extrabold">
          &nbsp; {t("services.subtitle1Span2")}
        </span>
        {t("services.subtitle1End")}
      </div>

      <div className="mb-4 lg:mb-8 font-medium text-lg leading-[1.75] max-w-full lg:max-w-[680px] text-gray-800 dark:text-gray-100">
        {t("services.subtitle2")} &nbsp;
        <a
          href="#"
          className="link"
          onClick={(e) => {
            e.preventDefault();
            setModalCallbackOpen(true);
          }}
        >
          {t("services.subtitle2Link")}
        </a>
        {t("services.subtitle2End")}
      </div>

      <CallbackModal
        modelValue={modalCallbackOpen}
        onUpdateModelValue={setModalCallbackOpen}
      />
    </div>
  );
}

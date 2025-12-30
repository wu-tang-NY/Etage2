"use client";

import React from "react";
import dynamic from "next/dynamic";
import SvgIcon from "@/components/common/SvgIcon";

interface PageMainCarCloudProps {
  title?: string;
  icon: string;
  iconWidth?: string | number;
  children?: React.ReactNode;
}

export default function PageMainCarCloud({
  title,
  icon,
  iconWidth,
  children,
}: PageMainCarCloudProps) {
  return (
    <div
      className="cloud absolute bottom-0 select-none"
      style={{ width: `${iconWidth}px` }}
    >
      <div className="cloud__title font-bold text-sm leading-normal absolute top-1/2 left-0 -mt-1 px-7 -translate-y-1/2">
        {children || <span className="font-extrabold">{title}</span>}
      </div>

      <div className="cloud__icon">
        <SvgIcon name={icon} original style={{ width: `${iconWidth}px` }} />
      </div>
    </div>
  );
}

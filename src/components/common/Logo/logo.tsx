"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SvgIcon from "../SvgIcon";

export default function Logo() {
  const t = useTranslations();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "theme-dark";

  const logoIconName = isDark ? "logo_white" : "logo_dark_ru";

  return (
    <div className="flex items-center">
      <Link href="/" aria-label="Home">
        <span
          className="flex w-[110px] h-[22px] md:w-[90px] md:h-[18px]"
          suppressHydrationWarning
        >
          <SvgIcon name={logoIconName} original className="size-full" />
        </span>
      </Link>
      <span className="hidden xl:block font-medium text-gray-500 whitespace-nowrap before:content-[''] before:bg-gray-300 dark:before:bg-gray-700 before:inline-block before:w-[2px] before:h-[28px] before:mx-4 before:align-middle">
        {t("logo.subtitle")}
      </span>
    </div>
  );
}

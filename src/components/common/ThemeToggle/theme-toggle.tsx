"use client";

import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button/button";
import SvgIcon from "../SvgIcon";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "theme-dark";

  return (
    <Button
      type="button"
      onClick={() => setTheme(isDark ? "theme-light" : "theme-dark")}
      icon={true}
      ariaLabel={t("common.themeToggle")}
      title={t("common.themeToggle")}
    >
      <SvgIcon
        name={isDark ? "theme_light" : "theme_dark"}
        className="size-4"
        original
      />
    </Button>
  );
}

"use client";

import React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button/button";

const availableLanguages = [
  { code: "ua", label: "UA" },
  { code: "ru", label: "RU" },
];

export default function AppLanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Replace the current locale prefix with the new one
    let newPath = pathname;
    newPath = newPath.replace(/^\/(ua|ru)(\/|$)/, `/${newLocale}$2`);

    // If no locale prefix exists, add it
    if (!newPath.match(/^\/(ua|ru)(\/|$)/)) {
      newPath = `/${newLocale}${newPath === "/" ? "" : newPath}`;
    }

    // Navigate to the new locale path if it's different
    if (newPath !== pathname) {
      router.push(newPath);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {availableLanguages.map((lang) => (
        <Button
          key={lang.code}
          active={locale === lang.code}
          type="button"
          onClick={() => switchLanguage(lang.code)}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
}

"use client";

import React, { useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/common/Nav/nav";
import NavItem from "@/components/common/Nav/nav-item";
import { useNav } from "@/hooks/useNav";

interface MainNavProps {
  onClose?: () => void;
}

interface NavPage {
  id: string;
  title: string;
  icon: string;
  children?: Array<{ title: string; path: string }>;
}

export default function MainNav({ onClose }: MainNavProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const { activeNavId } = useNav();

  const isInfoRoute = pathname?.includes("/info") ?? false;

  const pages: NavPage[] = useMemo(
    () => [
      {
        id: "services",
        title: t("nav.services"),
        icon: "icon_1_c",
        children: [
          { title: t("nav.flatMove"), path: "flat_move" },
          { title: t("nav.officeMove"), path: "office_move" },
          { title: t("nav.stuffMove"), path: "stuff_move" },
          { title: t("nav.specialists"), path: "specialists" },
          { title: t("nav.package"), path: "package" },
        ],
      },
      {
        id: "prices",
        title: t("nav.prices"),
        icon: "icon_2_c",
      },
      {
        id: "reviews",
        title: t("nav.reviews"),
        icon: "icon_3_c",
      },
      {
        id: "order",
        title: t("nav.order"),
        icon: "icon_4_c",
      },
    ],
    [t]
  );

  // Find active page index based on activeNavId
  const activePageIndex = useMemo(() => {
    if (isInfoRoute || !activeNavId) {
      return null;
    }
    return pages.findIndex((page) => page.id === activeNavId);
  }, [isInfoRoute, activeNavId, pages]);

  return (
    <Nav>
      {pages.map((page, index) => (
        <li
          key={page.title}
          className={`group relative ${index > 0 ? "lg:-ml-4" : ""}`}
        >
          <NavItem
            id={page.id}
            title={page.title}
            to={`/${locale}#${page.id}`}
            icon={page.icon}
            index={index}
            children={page.children}
            active={
              !isInfoRoute &&
              activePageIndex !== null &&
              index === activePageIndex
            }
            visited={
              !isInfoRoute &&
              activePageIndex !== null &&
              index < activePageIndex
            }
            onClose={onClose}
            locale={locale}
          />

          {page.children && page.children.length > 0 && (
            <ul
              className={`group-hover:flex flex-col gap-1 bg-gray-100 dark:bg-gray-800 p-3 absolute top-full z-10 left-0 w-60 hidden group-focus-within/item:block ${
                !isInfoRoute &&
                activePageIndex !== null &&
                index === activePageIndex
                  ? "!bg-primary"
                  : ""
              }`}
              role="menu"
            >
              {page.children.map((child) => (
                <li key={child.title} role="menuitem">
                  <Link
                    href={`/${locale}/info/${child.path}`}
                    className="block py-2.5 rounded px-4 font-medium transition-colors duration-150 ease-in-out hover:bg-black/5 dark:hover:bg-white/10 focus:bg-black/5 dark:focus:bg-white/20"
                    role="link"
                    tabIndex={0}
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}

      <li className="lg:ml-auto">
        <NavItem
          title={t("navInfo.information")}
          icon="icon_5_c"
          to={`/${locale}/info`}
          active={isInfoRoute}
          visited={isInfoRoute}
          className="[clip-path:polygon(0_0,calc(100%-20px)_0,100%_100%,0_100%)] lg:[clip-path:polygon(20px_0,100%_0,100%_100%,0%_100%)]"
          onClose={onClose}
          locale={locale}
        />
      </li>
    </Nav>
  );
}

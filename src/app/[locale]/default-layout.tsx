"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import Logo from "@/components/common/Logo/logo";
import ThemeToggle from "@/components/common/ThemeToggle/theme-toggle";
import LanguageSwitcher from "@/components/common/LanguageSwitcher/language-switcher";
import Phones from "@/components/common/Phones/phones";
import Schedule from "@/components/common/Schedule/schedule";
import Callback from "@/components/common/Callback/callback";
import MenuToggle from "@/components/common/MenuToggle/MenuToggle";
import MainNav from "./components/main-nav";
import MainFooter from "./components/main-footer";
import IconLoader from "@/components/common/IconLoader";
import { NavProvider } from "@/hooks/useNav";

// Dynamically import non-critical components
const WelcomeModal = dynamic(
  () => import("@/components/common/Welcome/welcome-modal"),
  { ssr: false }
);
const NewYearDecorations = dynamic(
  () => import("@/components/common/NewYearDecorations/new-year-decorations"),
  { ssr: false }
);
const MobileMenu = dynamic(
  () => import("@/components/common/MobileMenu/MobileMenu"),
  { ssr: false }
);

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function shouldShowDecorations(): boolean {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();

  if (currentMonth === 11) return currentDay >= 1;
  if (currentMonth === 0) return true;
  if (currentMonth === 1) return currentDay < 1;
  return false;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const t = useTranslations();
  const { mobile, tablet, desktop } = useBreakpoints();
  const [navOpen, setNavOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showDecorations, setShowDecorations] = useState(false);

  useEffect(() => {
    setShowDecorations(shouldShowDecorations());
    const hideTimer = setTimeout(() => {
      document.body.classList.add("loading-hidden");
    }, 100); // After fade transition completes (100ms + 300ms transition + buffer)

    return () => {
      clearTimeout(hideTimer);
    };
  }, []);

  const handleToggleMenu = () => {
    const newNavOpen = !navOpen;
    setNavOpen(newNavOpen);

    const navOpenClassName = "menu-open";

    if (newNavOpen) {
      const scrollPos =
        window.pageYOffset || document.documentElement.scrollTop;
      setScrollPosition(scrollPos);
      document.body.classList.add(navOpenClassName);
      document.body.style.top = `-${scrollPos}px`;
    } else {
      const scrollPos = scrollPosition;
      document.body.classList.remove(navOpenClassName);
      document.body.style.top = "";
      window.scrollTo(0, scrollPos);
    }
  };

  const handleCloseMenu = (targetSectionId?: string) => {
    setNavOpen(false);
    document.body.classList.remove("modal-open");
    document.body.classList.remove("menu-open");
    document.body.style.top = "";

    // If a target section is provided, scroll to it, otherwise restore previous position
    if (targetSectionId) {
      // Small delay to ensure menu animation completes
      setTimeout(() => {
        const sectionElement = document.getElementById(targetSectionId);
        if (sectionElement) {
          const headerOffset = 150;
          const elementPosition = sectionElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      // Restore the previous scroll position
      window.scrollTo(0, scrollPosition);
    }
  };

  return (
    <NavProvider>
      <div className="app-main">
        <IconLoader />
        <header
          className={`app-header bg-light fixed left-0 top-0 w-full pb-3 box-border overflow-visible z-[1000] dark:bg-dark ${
            showDecorations ? "pt-[40px]" : ""
          }`}
        >
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <Logo />

              <ul className="flex items-center gap-4">
                <li>
                  <ThemeToggle />
                </li>

                <li>
                  <LanguageSwitcher />
                </li>

                <li className="hidden lg:block">
                  <Callback />
                </li>

                <li className="hidden lg:block">
                  <Schedule />
                </li>

                <li className="hidden lg:block">
                  <Phones />
                </li>

                <li className="lg:hidden ml-8">
                  <MenuToggle open={navOpen} onClick={handleToggleMenu} />
                </li>
              </ul>
            </div>

            {(mobile || tablet) && (
              <h4 className="text-gray-400 text-center text-sm mt-2">
                {t("logo.subtitle")}
              </h4>
            )}
          </div>

          {!mobile && !tablet && (
            <div className="container mx-auto mt-8">
              <MainNav onClose={handleCloseMenu} />
            </div>
          )}
        </header>

        {(mobile || tablet) && (
          <MobileMenu
            navOpen={navOpen}
            showDecorations={showDecorations}
            onClose={handleCloseMenu}
          />
        )}

        <main className="relative">{children}</main>

        <div className="mt-2 lg:fixed bottom-0 left-0 w-full">
          <MainFooter />
        </div>

        {showDecorations && <NewYearDecorations />}
        <WelcomeModal />
        <div id="modal-portal" />
      </div>
    </NavProvider>
  );
}

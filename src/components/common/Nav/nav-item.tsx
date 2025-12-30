"use client";

import React from "react";
import Link from "next/link";
import SvgIcon from "../SvgIcon";

interface NavChild {
  title: string;
  path: string;
}

interface NavItemProps {
  id?: string;
  title?: string;
  index?: number;
  icon?: string;
  to?: string;
  active: boolean;
  visited: boolean;
  children?: NavChild[];
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  onClose?: (targetSectionId?: string) => void;
  locale?: string;
}

export default function NavItem({
  id,
  title,
  index,
  icon,
  to = "",
  active,
  visited,
  children = [],
  className = "",
  onClick,
  onClose,
  locale = "ua",
}: NavItemProps) {
  const handleClick = (event: React.MouseEvent) => {
    // If this is a hash link (internal section navigation)
    if (to && to.includes("#")) {
      event.preventDefault();

      const hash = to.split("#")[1];
      const sectionElement = document.getElementById(hash);

      if (sectionElement) {
        // Find the ScrollTrigger instance
        const scrollTriggers = (window as any).ScrollTrigger?.getAll();
        const mainScrollTrigger = scrollTriggers?.find(
          (st: any) => st.animation && st.vars.pin
        );

        if (mainScrollTrigger) {
          // Desktop: Use ScrollTrigger-based navigation
          const sectionIds = ["services", "prices", "reviews", "order"];
          const sectionIndex = sectionIds.indexOf(hash);

          if (sectionIndex !== -1) {
            const windowWidth = window.innerWidth;
            const scrollDuration = windowWidth * 4;
            const start = mainScrollTrigger.start;

            // Calculate the scroll position for this section
            // Each section takes up 1/4 of the total scroll distance
            const sectionScrollProgress = sectionIndex / 4;
            let targetScroll = 0;

            if (sectionIndex === 1) {
              targetScroll = start + scrollDuration * sectionScrollProgress;
            } else if (sectionIndex === 2) {
              targetScroll =
                start +
                scrollDuration * sectionScrollProgress +
                scrollDuration / 8;
            } else if (sectionIndex === 3) {
              targetScroll = scrollDuration + scrollDuration;
            }

            // Smooth scroll to the target position
            window.scrollTo({
              top: targetScroll,
              behavior: "smooth",
            });
          }
        } else {
          // Mobile/Tablet: Let the menu handler deal with scrolling
          // Just update the URL hash
          window.history.pushState(null, "", to);

          // If onClose is provided, pass the target section ID
          if (onClose) {
            onClose(hash);
            return; // Exit early, don't do additional scroll handling
          }

          // Fallback if no onClose handler (shouldn't happen in mobile menu)
          const headerOffset = 150;
          const elementPosition = sectionElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      } else {
        // Section not found, just update URL
        window.history.pushState(null, "", to);
      }
    }

    if (onClick) {
      onClick(event);
    }
  };

  const baseClasses =
    "block py-2.5 lg:py-1.5 px-3 lg:px-6 font-semibold text-sm relative !outline-none flex items-center gap-2 transition-background duration-300 ease-in-out";

  const stateClasses = active
    ? "bg-primary text-white cursor-default"
    : visited
    ? "bg-gray-100 dark:bg-gray-800"
    : "hover:bg-gray-100 dark:hover:bg-gray-800 group-hover:bg-gray-100 dark:group-hover:bg-gray-800";

  const clipPathClasses =
    index === 0
      ? "[clip-path:polygon(0_0,calc(100%-20px)_0,100%_100%,0%_100%)] lg:pl-3"
      : index !== undefined && index > 0
      ? "[clip-path:polygon(0_0,calc(100%-20px)_0,100%_100%,0_100%)] lg:[clip-path:polygon(0_0,calc(100%-20px)_0,100%_100%,20px_100%)]"
      : "";

  const classes =
    `${baseClasses} ${stateClasses} ${clipPathClasses} ${className}`
      .trim()
      .replace(/\s+/g, " ");

  const content = (
    <>
      {icon && <SvgIcon name={icon} original className="size-5 lg:size-6" />}
      {title && <span>{title}</span>}
      {children && children.length > 0 && (
        <span className="border-4 border-transparent border-t-inherit translate-y-0.5 hidden lg:block" />
      )}
    </>
  );

  if (to) {
    return (
      <Link
        href={to}
        id={id}
        className={classes}
        role="button"
        tabIndex={0}
        onClick={handleClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href="#"
      id={id}
      className={classes}
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        handleClick(e);
      }}
    >
      {content}
    </a>
  );
}

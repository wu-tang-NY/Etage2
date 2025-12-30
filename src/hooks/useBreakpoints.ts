"use client";

import { useEffect, useState } from "react";

export function useBreakpoints() {
  const [mobile, setMobile] = useState(false);
  const [tablet, setTablet] = useState(false);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const isMobile = () => {
      if (!window.matchMedia) return false;
      return window.matchMedia("(max-width: 767px)").matches;
    };

    const isTablet = () => {
      if (!window.matchMedia) return false;
      return window.matchMedia("(min-width: 768px) and (max-width: 992px)")
        .matches;
    };

    const resizeHandler = () => {
      if (document.hidden) return;

      const mobileMatch = isMobile();
      const tabletMatch = isTablet();

      setMobile(mobileMatch);
      setTablet(tabletMatch);
      setDesktop(!mobileMatch && !tabletMatch);
    };

    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return { mobile, tablet, desktop };
}

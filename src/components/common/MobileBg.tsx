"use client";

import { useTheme } from "next-themes";

export default function MobileBg() {
  const { theme } = useTheme();

  const isDark = theme === "theme-dark";
  const bgImageSrc = isDark
    ? "/images/bg_dark_mobile-600.png"
    : "/images/bg_mobile-600.png";
  const bgImageSrcset = isDark
    ? "/images/bg_dark_mobile-600.png 600w, /images/bg_dark_mobile-800.png 800w, /images/bg_dark_mobile-1000.png 1000w"
    : "/images/bg_mobile-600.png 600w, /images/bg_mobile-800.png 800w, /images/bg_mobile-1000.png 1000w";

  return (
    <img
      src={bgImageSrc}
      srcSet={bgImageSrcset}
      sizes="100vw"
      loading="lazy"
      alt=""
      title="Background"
      className="w-full h-[160px] md:h-[300px] object-cover"
    />
  );
}

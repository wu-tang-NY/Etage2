"use client";

import React, { useEffect } from "react";

export default function LoadingScreen() {
  useEffect(() => {
    // Hide the inline loading screen after a brief delay to ensure it's visible
    const timer = setTimeout(() => {
      if (typeof document !== "undefined") {
        document.body.classList.add("loading-complete");
      }
    }, 500); // Show for at least 500ms

    return () => clearTimeout(timer);
  }, []);

  // This component doesn't render anything - it just manages the timing
  // The inline loading screen in the layout handles the display
  return null;
}

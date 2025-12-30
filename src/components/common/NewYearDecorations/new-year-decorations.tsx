"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";

const SNOWFLAKE_COUNT = 50;
const SPARKLE_COUNT = 20;

export default function NewYearDecorations() {
  const [lightCount, setLightCount] = useState(0);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculateLightCount = () => {
    return Math.floor(window.innerWidth / 60) + 2;
  };

  // Memoize snowflake styles to prevent recalculation on every render
  const snowflakeStyles = useMemo(() => {
    return Array.from({ length: SNOWFLAKE_COUNT }, () => {
      const left = Math.random() * 100;
      const animationDelay = Math.random() * 5;
      const animationDuration = 3 + Math.random() * 4;
      const opacity = 0.5 + Math.random() * 0.5;
      const size = 10 + Math.random() * 10;
      const scale = 0.5 + Math.random() * 0.5;

      return {
        left: `${left}%`,
        animationDelay: `${animationDelay}s`,
        animationDuration: `${animationDuration}s`,
        opacity: opacity,
        fontSize: `${size}px`,
        transform: `scale(${scale})`,
      };
    });
  }, []);

  // Memoize sparkle styles to prevent recalculation on every render
  const sparkleStyles = useMemo(() => {
    return Array.from({ length: SPARKLE_COUNT }, () => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const animationDelay = Math.random() * 3;
      const animationDuration = 2 + Math.random() * 2;

      return {
        left: `${left}%`,
        top: `${top}%`,
        animationDelay: `${animationDelay}s`,
        animationDuration: `${animationDuration}s`,
      };
    });
  }, []);

  useEffect(() => {
    // Initialize light count
    setLightCount(calculateLightCount());

    // Add class to body when Christmas lights are present
    document.body.classList.add("has-christmas-lights");

    // Handle resize with debounce
    const resizeHandler = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        setLightCount(calculateLightCount());
      }, 100);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      // Remove class from body when component is destroyed
      document.body.classList.remove("has-christmas-lights");

      window.removeEventListener("resize", resizeHandler);

      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="app-new-year-decorations">
      {/* Snowflakes */}
      <div className="snowflakes" aria-hidden="true">
        {snowflakeStyles.map((style, n) => (
          <div
            key={n}
            className="snowflake animate-snowflakes-fall"
            style={style}
          >
            ❅
          </div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="sparkles" aria-hidden="true">
        {sparkleStyles.map((style, n) => (
          <div key={n} className="sparkle animate-sparkle" style={style}>
            ✨
          </div>
        ))}
      </div>

      {/* Christmas Lights */}
      <ul className="christmas-lights" data-position="top" aria-hidden="true">
        {Array.from({ length: lightCount }).map((_, n) => (
          <li key={n} />
        ))}
      </ul>
    </div>
  );
}

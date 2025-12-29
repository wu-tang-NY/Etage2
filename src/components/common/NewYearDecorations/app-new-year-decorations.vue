<template>
  <ClientOnly>
    <div class="app-new-year-decorations">
      <!-- Snowflakes -->
      <div class="snowflakes" aria-hidden="true">
        <div
          class="snowflake animate-snowflakes-fall"
          v-for="n in snowflakeCount"
          :key="n"
          :style="getSnowflakeStyle(n)"
        >
          ❅
        </div>
      </div>

      <!-- Sparkles -->
      <div class="sparkles" aria-hidden="true">
        <div
          class="sparkle animate-sparkle"
          v-for="n in sparkleCount"
          :key="n"
          :style="getSparkleStyle(n)"
        >
          ✨
        </div>
      </div>

      <!-- Christmas Lights -->
      <ul class="christmas-lights" data-position="top" aria-hidden="true">
        <li
          v-for="n in lightCount"
          :key="n"
          :class="['animate-flash-1', getLightClass(n)]"
          :style="getLightStyle(n)"
        ></li>
      </ul>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: "AppNewYearDecorations",
  data() {
    return {
      snowflakeCount: 50,
      sparkleCount: 20,
      confettiCount: 30,
      lightCount: 0,
      resizeHandler: null,
    };
  },
  methods: {
    getSnowflakeStyle(index) {
      const left = Math.random() * 100;
      const animationDelay = Math.random() * 5;
      const animationDuration = 3 + Math.random() * 4;
      const opacity = 0.5 + Math.random() * 0.5;
      const size = 10 + Math.random() * 10;

      return {
        left: `${left}%`,
        animationDelay: `${animationDelay}s`,
        animationDuration: `${animationDuration}s`,
        opacity: opacity,
        fontSize: `${size}px`,
        transform: `scale(${0.5 + Math.random() * 0.5})`,
      };
    },
    getSparkleStyle(index) {
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
    },
    getConfettiStyle(index) {
      const left = Math.random() * 100;
      const colors = [
        "#FFD700",
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#FFA07A",
        "#98D8C8",
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const animationDelay = Math.random() * 5;
      const animationDuration = 4 + Math.random() * 3;
      const rotation = Math.random() * 360;

      return {
        left: `${left}%`,
        backgroundColor: color,
        animationDelay: `${animationDelay}s`,
        animationDuration: `${animationDuration}s`,
        transform: `rotate(${rotation}deg)`,
        width: `${5 + Math.random() * 5}px`,
        height: `${5 + Math.random() * 5}px`,
      };
    },
    calculateLightCount() {
      if (typeof window === "undefined") return 0;
      return Math.floor(window.innerWidth / 60) + 2;
    },
    getLightClass(index) {
      // Return empty string or specific classes if needed
      // The CSS handles styling based on nth-child selectors
      return "";
    },
    getLightStyle(index) {
      // Return style object if needed for dynamic styling
      // Most styling is handled by CSS nth-child selectors
      return {};
    },
  },
  mounted() {
    // Initialize light count
    this.lightCount = this.calculateLightCount();

    // Add class to body when Christmas lights are present
    if (typeof document !== "undefined") {
      document.body.classList.add("has-christmas-lights");
    }

    // Handle resize with debounce
    let resizeTimeout = null;
    this.resizeHandler = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = setTimeout(() => {
        this.lightCount = this.calculateLightCount();
      }, 100);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.resizeHandler);
    }
  },
  beforeUnmount() {
    // Remove class from body when component is destroyed
    if (typeof document !== "undefined") {
      document.body.classList.remove("has-christmas-lights");
    }

    if (this.resizeHandler && typeof window !== "undefined") {
      window.removeEventListener("resize", this.resizeHandler);
    }
  },
};
</script>

<style lang="scss">
.app-new-year-decorations {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999999;
  overflow: hidden;
}

.snowflakes {
  position: absolute;
  top: -100px;
  width: 100%;
  height: 100%;
}

.snowflake {
  position: absolute;
  top: -10px;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
  user-select: none;
  cursor: default;
}

.sparkles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.sparkle {
  position: absolute;
  font-size: 20px;
  opacity: 0;
}

.confetti-container {
  position: absolute;
  top: -100px;
  width: 100%;
  height: 100%;
}

.confetti {
  position: absolute;
  border-radius: 50%;
}


// Reduce animations on mobile for better performance
@media (max-width: 768px) {
  .app-new-year-decorations {
    .snowflake {
      font-size: 8px !important;
    }

    .sparkle {
      font-size: 16px;
    }
  }
}

// Reduce motion for users who prefer it
@media (prefers-reduced-motion: reduce) {
  .app-new-year-decorations {
    * {
      animation: none !important;
    }
  }
}

:root {
  --christmas-lights-1: #057d70; /*color - 1*/
  --christmas-lights-2: #d41a21; /*color - 2*/
  --christmas-lights-3: #ffd27c; /*color - 3*/
}

.christmas-lights li {
  animation-duration: 2s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  border-radius: 50%;
  display: inline-block;
  height: 20px;
  margin: 25px 20px;
  position: relative;
  width: 20px;
}

.christmas-lights {
  left: 0;
  margin: 0;
  pointer-events: none;
  position: fixed;
  right: 0;
  top: -15px;
  white-space: nowrap;
  width: 100%;
  z-index: 10000;
}

.christmas-lights[data-position="bottom"] {
  top: auto;
  bottom: -15px;
  transform: scale(-1);
}

.christmas-lights[data-position="right"],
.christmas-lights[data-position="left"] {
  transform: rotate(-90deg);
  left: -10px;
  top: 0;
  right: auto;
  bottom: 0;
  width: 100vh;
}

.christmas-lights[data-position="right"] {
  transform: rotate(90deg);
  left: auto;
  right: -15px;
}

.christmas-lights li:before {
  content: "";
  position: absolute;
  background: #505050;
  width: 10px;
  height: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  top: -9px;
  left: 5px;
}

.christmas-lights li:after {
  content: "";
  top: -23px;
  left: 10px;
  position: absolute;
  width: 60px;
  height: 20px;
  border-bottom: solid #505050 2px;
  border-radius: 50%;
}

.christmas-lights li:last-child:after {
  content: none;
}

.christmas-lights li:first-child {
  margin-left: -40px;
}

.christmas-lights li:nth-child(2n + 1) {
  background: var(--christmas-lights-1);
  box-shadow: 0px 5px 24px 3px rgb(249, 212, 129);
  animation-name: flash-2;
  animation-duration: 0.4s;
}

.christmas-lights li:nth-child(4n + 2) {
  background: var(--christmas-lights-2);
  box-shadow: 0px 5px 24px 3px var(--christmas-lights-2);
  animation-name: flash-3;
  animation-duration: 1.1s;
}

.christmas-lights li:nth-child(odd) {
  animation-duration: 1.8s;
}

.christmas-lights li:nth-child(3n + 1) {
  animation-duration: 1.4s;
}


@media (max-width: 1024px) {
  .christmas-lights[data-position="left"] {
    left: -14px;
  }

  .christmas-lights[data-position="right"] {
    right: -14px;
  }

  .christmas-lights[data-position="left"],
  .christmas-lights[data-position="right"] {
    height: 100vh;
  }
}
</style>

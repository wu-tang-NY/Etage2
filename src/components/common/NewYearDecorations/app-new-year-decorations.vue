<template>
  <ClientOnly>
    <div class="app-new-year-decorations" v-if="showDecorations">
      <!-- Snowflakes -->
      <div class="snowflakes" aria-hidden="true">
        <div
          class="snowflake"
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
          class="sparkle"
          v-for="n in sparkleCount"
          :key="n"
          :style="getSparkleStyle(n)"
        >
          ✨
        </div>
      </div>
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
      christmas: null,
      resizeHandler: null
    };
  },
  computed: {
    showDecorations() {
      return this.shouldShowDecorations();
    }
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
        transform: `scale(${0.5 + Math.random() * 0.5})`
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
        animationDuration: `${animationDuration}s`
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
        "#98D8C8"
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
        height: `${5 + Math.random() * 5}px`
      };
    },
    shouldShowDecorations() {
      // Show decorations from December 1st to February 1st
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth(); // 0-11, where 11 is December, 0 is January
      const currentDay = now.getDate();

      // December (month 11): from December 1st onwards
      if (currentMonth === 11) {
        return currentDay >= 1;
      }

      // January (month 0): all of January
      if (currentMonth === 0) {
        return true;
      }

      // February (month 1): only until February 1st
      if (currentMonth === 1) {
        return currentDay < 1;
      }

      return false;
    },
    createChristmasLights() {
      if (!this.showDecorations) return;
      if (typeof window === "undefined" || typeof document === "undefined")
        return;

      const h = Math.floor(window.innerWidth / 60) + 2;

      const ul = document.createElement("ul");
      ul.className = "christmas-lights";
      ul.dataset.position = "top";
      for (let i = 0; i <= h; i++) {
        ul.appendChild(document.createElement("li"));
      }
      document.body.appendChild(ul);
    },
    deleteChristmasLights() {
      if (typeof document === "undefined") return;
      document.body.querySelectorAll(".christmas-lights").forEach(function(ul) {
        ul.remove();
      });
    }
  },
  mounted() {
    if (this.showDecorations) {
      // Initialize christmas lights object
      this.christmas = {
        delay: null
      };

      // Create lights immediately
      this.createChristmasLights();

      // Add class to body when Christmas lights are present
      document.body.classList.add("has-christmas-lights");

      // Handle resize with debounce
      this.resizeHandler = () => {
        clearTimeout(this.christmas.delay);
        this.christmas.delay = setTimeout(() => {
          this.deleteChristmasLights();
          this.createChristmasLights();
        }, 100);
      };

      window.addEventListener("resize", this.resizeHandler);
    }
  },
  beforeUnmount() {
    // Cleanup: remove lights and event listeners
    if (this.christmas) {
      if (this.christmas.delay) {
        clearTimeout(this.christmas.delay);
      }
      this.deleteChristmasLights();
    }

    // Remove class from body when component is destroyed
    if (typeof document !== "undefined") {
      document.body.classList.remove("has-christmas-lights");
    }

    if (this.resizeHandler && typeof window !== "undefined") {
      window.removeEventListener("resize", this.resizeHandler);
    }
  }
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
  z-index: 9999;
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
  animation-name: snowflakes-fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
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
  animation-name: sparkle;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
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
  animation-name: confetti-fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes snowflakes-fall {
  to {
    transform: translateY(100vh) rotate(360deg);
  }
}

@keyframes sparkle {
  0%,
  100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes confetti-fall {
  to {
    transform: translateY(calc(100vh + 100px)) rotate(720deg);
  }
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
  animation-name: flash-1;
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

@keyframes flash-1 {
  0%,
  100% {
    background: var(--christmas-lights-1);
    box-shadow: 0px 5px 24px 3px var(--christmas-lights-1);
  }
  50% {
    background: var(--christmas-lights-2);
    box-shadow: 0px 5px 24px 3px var(--christmas-lights-2);
  }
}

@keyframes flash-2 {
  0%,
  100% {
    background: var(--christmas-lights-2);
    box-shadow: 0px 5px 24px 3px var(--christmas-lights-2);
  }
  50% {
    background: var(--christmas-lights-3);
    box-shadow: 0px 5px 24px 3px var(--christmas-lights-3);
  }
}

@keyframes flash-3 {
  0%,
  100% {
    background: var(--christmas-lights-3);
    box-shadow: 0px 5px 24px 3px var(--christmas-lights-3);
  }
  50% {
    background: var(--christmas-lights-1);
    box-shadow: 0px 5px 24px 3px var(--christmas-lights-1);
  }
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

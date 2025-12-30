/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector", ".theme-dark"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffa511",
        secondary: "#1f2a3a",
        surface: "var(--colors-surface)",
      },
      fontFamily: {
        // Add your custom fonts here if needed
        // Example:
        // sans: ['Fira Sans', 'sans-serif'],
        // roboto: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        animloader: {
          "0%": {
            boxShadow:
              "0 24px rgba(255, 255, 255, 0), 24px 24px rgba(255, 255, 255, 0), 24px 48px rgba(255, 255, 255, 0), 0px 48px rgba(255, 255, 255, 0)",
          },
          "12%": {
            boxShadow:
              "0 24px white, 24px 24px rgba(255, 255, 255, 0), 24px 48px rgba(255, 255, 255, 0), 0px 48px rgba(255, 255, 255, 0)",
          },
          "25%": {
            boxShadow:
              "0 24px white, 24px 24px white, 24px 48px rgba(255, 255, 255, 0), 0px 48px rgba(255, 255, 255, 0)",
          },
          "37%": {
            boxShadow:
              "0 24px white, 24px 24px white, 24px 48px white, 0px 48px rgba(255, 255, 255, 0)",
          },
          "50%": {
            boxShadow:
              "0 24px white, 24px 24px white, 24px 48px white, 0px 48px white",
          },
          "62%": {
            boxShadow:
              "0 24px rgba(255, 255, 255, 0), 24px 24px white, 24px 48px white, 0px 48px white",
          },
          "75%": {
            boxShadow:
              "0 24px rgba(255, 255, 255, 0), 24px 24px rgba(255, 255, 255, 0), 24px 48px white, 0px 48px white",
          },
          "87%": {
            boxShadow:
              "0 24px rgba(255, 255, 255, 0), 24px 24px rgba(255, 255, 255, 0), 24px 48px rgba(255, 255, 255, 0), 0px 48px white",
          },
          "100%": {
            boxShadow:
              "0 24px rgba(255, 255, 255, 0), 24px 24px rgba(255, 255, 255, 0), 24px 48px rgba(255, 255, 255, 0), 0px 48px rgba(255, 255, 255, 0)",
          },
        },
        animloader2: {
          "0%": {
            transform: "translate(0, 0) rotateX(0) rotateY(0)",
          },
          "25%": {
            transform: "translate(100%, 0) rotateX(0) rotateY(180deg)",
          },
          "50%": {
            transform: "translate(100%, 100%) rotateX(-180deg) rotateY(180deg)",
          },
          "75%": {
            transform: "translate(0, 100%) rotateX(-180deg) rotateY(360deg)",
          },
          "100%": {
            transform: "translate(0, 0) rotateX(0) rotateY(360deg)",
          },
        },
        "snowflakes-fall": {
          to: {
            transform: "translateY(100vh) rotate(360deg)",
          },
        },
        sparkle: {
          "0%, 100%": {
            opacity: "0",
            transform: "scale(0)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "confetti-fall": {
          to: {
            transform: "translateY(calc(100vh + 100px)) rotate(720deg)",
          },
        },
        "flash-1": {
          "0%, 100%": {
            background: "var(--christmas-lights-1)",
            boxShadow: "0px 5px 24px 3px var(--christmas-lights-1)",
          },
          "50%": {
            background: "var(--christmas-lights-2)",
            boxShadow: "0px 5px 24px 3px var(--christmas-lights-2)",
          },
        },
        "flash-2": {
          "0%, 100%": {
            background: "var(--christmas-lights-2)",
            boxShadow: "0px 5px 24px 3px var(--christmas-lights-2)",
          },
          "50%": {
            background: "var(--christmas-lights-3)",
            boxShadow: "0px 5px 24px 3px var(--christmas-lights-3)",
          },
        },
        "flash-3": {
          "0%, 100%": {
            background: "var(--christmas-lights-3)",
            boxShadow: "0px 5px 24px 3px var(--christmas-lights-3)",
          },
          "50%": {
            background: "var(--christmas-lights-1)",
            boxShadow: "0px 5px 24px 3px var(--christmas-lights-1)",
          },
        },
        slideIn: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideOut: {
          from: {
            opacity: "1",
            transform: "translateY(0)",
          },
          to: {
            opacity: "0",
            transform: "translateY(20px)",
          },
        },
        pulse: {
          "0%": {
            fill: "var(--colors-grey-200)",
            transform: "none",
          },
          "50%": {
            fill: "var(--colors-accent)",
            transform: "scale(1.2)",
          },
          "100%": {
            fill: "var(--colors-grey-200)",
            transform: "none",
          },
        },
      },
      animation: {
        animloader: "animloader 4s ease infinite",
        animloader2: "animloader2 2s ease infinite",
        "snowflakes-fall": "snowflakes-fall linear infinite",
        sparkle: "sparkle ease-in-out infinite",
        "confetti-fall": "confetti-fall linear infinite",
        "flash-1": "flash-1 2s both infinite",
        "flash-2": "flash-2 0.4s both infinite",
        "flash-3": "flash-3 1.1s both infinite",
        slideIn: "slideIn 0.3s ease-out",
        slideOut: "slideOut 0.3s ease-out",
        pulse: "pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
  // Preserve existing SCSS styles by not applying global resets everywhere
  corePlugins: {
    // You can disable specific Tailwind features here if needed
  },
};

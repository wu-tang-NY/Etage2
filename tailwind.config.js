/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", ".theme-dark"],
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./src/**/*.{js,vue,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here if needed
        // Example:
        // primary: '#ffa511',
      },
      fontFamily: {
        // Add your custom fonts here if needed
        // Example:
        // sans: ['Fira Sans', 'sans-serif'],
        // roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
  // Preserve existing SCSS styles by not applying global resets everywhere
  corePlugins: {
    // You can disable specific Tailwind features here if needed
  },
};

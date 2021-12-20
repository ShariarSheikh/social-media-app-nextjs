module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./Layouts/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {},
    screens: {
      // => @media (min-width: px) { ... }
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1366px",
      "3xl": "1440px",
      "4xl": "1536px",
      "5xl": "1920px",
    },
  },
  variants: {
    extend: {},
    // ...
    transitionDuration: ["hover", "focus"],
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

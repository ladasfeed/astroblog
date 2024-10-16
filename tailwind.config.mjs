/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: {
        max: "1024px",
      },

      md: {
        max: "1440px",
      },

      lg: {
        max: "1920px",
      },

      xl: {
        min: "1920px",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "rgb(237 237 237)",
      accent: {
        DEFAULT: "#B8336A",
        light: "#c16e90",
        dark: "#B8336A",
      },
      black: "#000000",
      dark: "#272727",
      dark_darker: "#1a1a1a",
      "blue-light": "#ABDAFC",
      "blue-dark": "#375164",
      gray: "rgb(96, 115, 159)",
    },
    fontFamily: {
      primary: ['"Rajdhani"'],
      secondary: ['"Inter"'],
    },
  },
  plugins: [],
};
